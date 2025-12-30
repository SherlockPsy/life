import Fastify from "fastify";
import { v4 as uuidv4 } from "uuid";
import {
  pingDb,
  insertBlock,
  getBlocksByIds,
  getRecentBlocks,
  getRequestLog,
  insertRequestLog,
  getScenePackage,
  updateScenePackage
} from "./db.js";
import { ensureCollection, upsertPoint, searchSimilar } from "./qdrant.js";
import { generateEmbedding } from "./embeddings.js";
import { runCognition } from "./cognition.js";
import { renderText, setRendererConstraints } from "./renderer.js";
import { loadConstraints } from "./constraints.js";
import { lawGateValidateTextParts } from "./law/law_gate.js";

const app = Fastify({ logger: true });

let CONSTRAINTS = "";
let dbAvailable = false;

// Build system prompt for DeepSeek cognition
function buildSystemPrompt(scenePackage, retrievedBlocks, constraints) {
  const blockContext = retrievedBlocks
    .map((b) => `[${b.ts}] ${b.source}: ${b.text} (${b.visibility})`)
    .join("\n");

  const parts = [];

  if (constraints) {
    parts.push(constraints);
  }

  if (scenePackage) {
    parts.push(`SCENE:\n${scenePackage}`);
  }

  if (blockContext) {
    parts.push(`MEMORY:\n${blockContext}`);
  }

  parts.push(`OUTPUT FORMAT (strict JSON):
{
  "speaker": "REBECCA",
  "outward_text": "string",
  "public_blocks": [{ "source": "REBECCA|SYSTEM|OTHER", "text": "...", "visibility": "public" }],
  "scene_update": "string|null",
  "wrote": true|false,
  "scene_refreshed": false
}`);

  return parts.join("\n\n");
}

// Retrieve context: Qdrant semantic + recent blocks
async function retrieveContext(queryText) {
  try {
    const queryEmbedding = await generateEmbedding(queryText);
    const qdrantResults = await searchSimilar(queryEmbedding, 12);
    const semanticIds = qdrantResults.map((r) => r.id);

    const [semanticBlocks, recentBlocks] = await Promise.all([
      getBlocksByIds(semanticIds),
      getRecentBlocks(8),
    ]);

    const seen = new Set();
    const merged = [];

    for (const block of [...semanticBlocks, ...recentBlocks]) {
      if (!seen.has(block.id)) {
        seen.add(block.id);
        merged.push(block);
      }
    }

    return merged;
  } catch (error) {
    console.error("Context retrieval error:", error.message);
    return getRecentBlocks(8);
  }
}

// Write blocks to Postgres and Qdrant
async function writeBlocks(blocks, requestId) {
  for (const block of blocks) {
    const id = uuidv4();

    await insertBlock({
      id,
      source: block.source,
      text: block.text,
      visibility: block.visibility,
      request_id: requestId,
    });

    try {
      const embedding = await generateEmbedding(block.text);
      await upsertPoint(id, embedding, {
        source: block.source,
        visibility: block.visibility,
        ts: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Qdrant upsert error:", error.message);
    }
  }
}

// Health check
app.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// POST /say - Handle user input
app.post("/say", async (request, reply) => {
  if (!dbAvailable) {
    reply.code(503);
    return { error: "db_unavailable" };
  }

  try {
    const { text, request_id } = request.body || {};
    const requestId = request_id || uuidv4();

    const existingResponse = await getRequestLog(requestId);
    if (existingResponse) {
      return existingResponse;
    }

    const retrievedBlocks = await retrieveContext(text || "");
    const scenePackage = await getScenePackage();

    const systemPrompt = buildSystemPrompt(
      scenePackage,
      retrievedBlocks,
      CONSTRAINTS
    );
    const userPrompt = `User says: ${text}`;

    const cognitionResult = await runCognition(systemPrompt, userPrompt);

    if (cognitionResult.wrote) {
      if (!cognitionResult.speaker || !cognitionResult.outward_text) {
        reply.code(500);
        return { error: "invalid_cognition_json" };
      }
    }

    // LAW GATE (must run before writes, before scene update, before render)
    const blocksToWrite = cognitionResult.public_blocks || cognitionResult.blocks_to_write || [];
    const gate = lawGateValidateTextParts([
      cognitionResult.outward_text || "",
      // Include block text (public/private if you add later)
      ...blocksToWrite.map((b) => b.text || ""),
      cognitionResult.scene_update || ""
    ]);

    if (!gate.ok) {
      const response = {
        request_id: requestId,
        wrote: false,
        speaker: "",
        text: "",
        scene_refreshed: false,
        // optional: keep reasons out of outward response (silence)
      };
      await insertRequestLog(requestId, response);
      return response;
    }

    // Write blocks if any (only after gate passes)
    if (blocksToWrite.length > 0) {
      await writeBlocks(blocksToWrite, requestId);
    }

    // Update scene if changed (only after gate passes)
    let sceneRefreshed = false;
    if (cognitionResult.scene_update) {
      await updateScenePackage(cognitionResult.scene_update);
      sceneRefreshed = true;
    }

    const renderedText = cognitionResult.wrote
      ? await renderText(cognitionResult.outward_text)
      : "";

    const response = {
      request_id: requestId,
      wrote: cognitionResult.wrote || false,
      speaker: cognitionResult.wrote ? cognitionResult.speaker : "",
      text: renderedText,
      scene_refreshed: sceneRefreshed,
    };

    await insertRequestLog(requestId, response);

    return response;
  } catch (error) {
    console.error("/say error:", error);
    reply.code(500);
    return { error: error.message };
  }
});

// POST /beat - Autonomous tick
app.post("/beat", async (request, reply) => {
  if (!dbAvailable) {
    reply.code(503);
    return { error: "db_unavailable" };
  }

  try {
    const { request_id } = request.body || {};
    const requestId = request_id || uuidv4();

    const existingResponse = await getRequestLog(requestId);
    if (existingResponse) {
      return existingResponse;
    }

    const scenePackage = await getScenePackage();

    const queryText = `BEAT ${scenePackage || "idle state"}`;
    const retrievedBlocks = await retrieveContext(queryText);

    const systemPrompt = buildSystemPrompt(
      scenePackage,
      retrievedBlocks,
      CONSTRAINTS
    );
    const userPrompt = `Autonomous beat tick. Current scene: ${
      scenePackage || "none"
    }. Process any pending thoughts or observations.`;

    const cognitionResult = await runCognition(systemPrompt, userPrompt);

    if (cognitionResult.wrote) {
      if (!cognitionResult.speaker || !cognitionResult.outward_text) {
        reply.code(500);
        return { error: "invalid_cognition_json" };
      }
    }

    // LAW GATE (must run before writes, before scene update, before render)
    const blocksToWrite = cognitionResult.public_blocks || cognitionResult.blocks_to_write || [];
    const gate = lawGateValidateTextParts([
      cognitionResult.outward_text || "",
      ...blocksToWrite.map((b) => b.text || ""),
      cognitionResult.scene_update || ""
    ]);

    if (!gate.ok) {
      const response = {
        request_id: requestId,
        wrote: false,
        speaker: "",
        text: "",
        scene_refreshed: false,
      };
      await insertRequestLog(requestId, response);
      return response;
    }

    if (blocksToWrite.length > 0) {
      await writeBlocks(blocksToWrite, requestId);
    }

    let sceneRefreshed = false;
    if (cognitionResult.scene_update) {
      await updateScenePackage(cognitionResult.scene_update);
      sceneRefreshed = true;
    }

    const renderedText = cognitionResult.wrote
      ? await renderText(cognitionResult.outward_text)
      : "";

    const response = {
      request_id: requestId,
      wrote: cognitionResult.wrote || false,
      speaker: cognitionResult.wrote ? cognitionResult.speaker : "",
      text: renderedText,
      scene_refreshed: sceneRefreshed,
    };

    await insertRequestLog(requestId, response);

    return response;
  } catch (error) {
    console.error("/beat error:", error);
    reply.code(500);
    return { error: error.message };
  }
});

// Startup
async function start() {
  try {
    // Load constraints (NOW includes ALL authoritative law documents)
    CONSTRAINTS = loadConstraints();
    setRendererConstraints(CONSTRAINTS);

    try {
      await pingDb();
      dbAvailable = true;
      console.log("Database connected");
    } catch (error) {
      console.error("Database unavailable:", error.message);
      dbAvailable = false;
    }

    await ensureCollection();

    const port = Number(process.env.PORT || 3000);
    const host = "0.0.0.0";

    await app.listen({ port, host });
    console.log(`Life server running on port ${port}`);
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
}

start();