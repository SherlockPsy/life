import Fastify from "fastify";
import { v4 as uuidv4 } from "uuid";
import {
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
import { renderText } from "./renderer.js";
import { loadConstraints } from "./constraints.js";

const app = Fastify({ logger: true });

let CONSTRAINTS = "";

// Build system prompt for DeepSeek cognition
function buildSystemPrompt(scenePackage, retrievedBlocks, constraints) {
  const blockContext = retrievedBlocks
    .map((b) => `[${b.ts}] ${b.source}: ${b.text} (${b.visibility})`)
    .join("\n");

  return `You are REBECCA, an autonomous cognitive agent. You process inputs and produce structured JSON responses.

CURRENT SCENE:
${scenePackage || "(no scene set)"}

RETRIEVED MEMORY CONTEXT:
${blockContext || "(no memories retrieved)"}

${
  constraints
    ? `PROHIBITIONS AND CONSTRAINTS:\n${constraints}\n\nYou MUST follow these constraints. If retrieved context indicates irritants or ownership violations, react with first-order protective responses.`
    : ""
}

You MUST respond with STRICT JSON in this exact format:
{
  "outward_text": "text to speak externally, or empty string if silent",
  "blocks_to_write": [
    { "source": "REBECCA", "text": "memory or thought to record", "visibility": "public" }
  ],
  "scene_update": "new scene description or null if no change",
  "wrote": true
}

Rules:
- source must be one of: REBECCA, SYSTEM, OTHER
- visibility must be one of: public, private
- blocks_to_write can be empty array if nothing to record
- wrote must be true if blocks_to_write is non-empty, false otherwise
- scene_update should be null unless the scene context changes significantly`;
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

    // Merge and dedupe by id
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
    // Fallback to just recent blocks
    return getRecentBlocks(8);
  }
}

// Write blocks to Postgres and Qdrant
async function writeBlocks(blocks, requestId) {
  for (const block of blocks) {
    const id = uuidv4();

    // Write to Postgres
    await insertBlock({
      id,
      source: block.source,
      text: block.text,
      visibility: block.visibility,
      request_id: requestId,
    });

    // Generate embedding and upsert to Qdrant
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
  try {
    const { text, request_id } = request.body || {};
    const requestId = request_id || uuidv4();

    // Idempotency check
    const existingResponse = await getRequestLog(requestId);
    if (existingResponse) {
      return existingResponse;
    }

    // Retrieve context using user text
    const retrievedBlocks = await retrieveContext(text);
    const scenePackage = await getScenePackage();

    // Run cognition
    const systemPrompt = buildSystemPrompt(
      scenePackage,
      retrievedBlocks,
      CONSTRAINTS
    );
    const userPrompt = `User says: ${text}`;

    const cognitionResult = await runCognition(systemPrompt, userPrompt);

    // Write blocks if any
    if (
      cognitionResult.blocks_to_write &&
      cognitionResult.blocks_to_write.length > 0
    ) {
      await writeBlocks(cognitionResult.blocks_to_write, requestId);
    }

    // Update scene if changed
    let sceneRefreshed = false;
    if (cognitionResult.scene_update) {
      await updateScenePackage(cognitionResult.scene_update);
      sceneRefreshed = true;
    }

    // Render output
    const renderedText = await renderText(cognitionResult.outward_text);

    // Build response
    const response = {
      request_id: requestId,
      wrote: cognitionResult.wrote || false,
      text: renderedText,
      scene_refreshed: sceneRefreshed,
    };

    // Log for idempotency
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
  try {
    const { request_id } = request.body || {};
    const requestId = request_id || uuidv4();

    // Idempotency check
    const existingResponse = await getRequestLog(requestId);
    if (existingResponse) {
      return existingResponse;
    }

    // Get current scene
    const scenePackage = await getScenePackage();

    // Retrieve context using "BEAT " + scene
    const queryText = `BEAT ${scenePackage || "idle state"}`;
    const retrievedBlocks = await retrieveContext(queryText);

    // Run cognition
    const systemPrompt = buildSystemPrompt(
      scenePackage,
      retrievedBlocks,
      CONSTRAINTS
    );
    const userPrompt = `Autonomous beat tick. Current scene: ${
      scenePackage || "none"
    }. Process any pending thoughts or observations.`;

    const cognitionResult = await runCognition(systemPrompt, userPrompt);

    // Write blocks if any
    if (
      cognitionResult.blocks_to_write &&
      cognitionResult.blocks_to_write.length > 0
    ) {
      await writeBlocks(cognitionResult.blocks_to_write, requestId);
    }

    // Update scene if changed
    let sceneRefreshed = false;
    if (cognitionResult.scene_update) {
      await updateScenePackage(cognitionResult.scene_update);
      sceneRefreshed = true;
    }

    // Render output
    const renderedText = await renderText(cognitionResult.outward_text);

    // Build response
    const response = {
      request_id: requestId,
      wrote: cognitionResult.wrote || false,
      text: renderedText,
      scene_refreshed: sceneRefreshed,
    };

    // Log for idempotency
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
    // Load constraints
    CONSTRAINTS = loadConstraints();

    // Ensure Qdrant collection exists
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