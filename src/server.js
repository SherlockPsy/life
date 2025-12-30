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

// -------------------- SIMPLE UI (NO EXTRA PACKAGES) --------------------

const UI_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Life</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#111; color:#eee; margin:0; padding:18px; }
    h1 { font-size: 18px; margin: 0 0 12px 0; font-weight: 600; }
    #log { white-space: pre-wrap; background:#181818; border:1px solid #2a2a2a; padding:12px; border-radius:10px; min-height: 260px; }
    textarea { width:100%; height:90px; margin-top:12px; padding:10px; border-radius:10px; border:1px solid #2a2a2a; background:#141414; color:#eee; font-size:14px; }
    button { margin-top:10px; padding:10px 14px; border-radius:10px; border:1px solid #2a2a2a; background:#1f1f1f; color:#eee; cursor:pointer; }
    button:disabled { opacity:0.6; cursor:not-allowed; }
    .row { display:flex; gap:10px; align-items:center; margin-top:10px; }
    .hint { font-size:12px; opacity:0.75; margin-top:8px; }
    .pill { display:inline-block; font-size:12px; opacity:0.8; border:1px solid #2a2a2a; padding:2px 8px; border-radius:999px; }
  </style>
</head>
<body>
  <h1>Life <span class="pill">UI</span></h1>
  <div id="log"></div>
  <textarea id="input" placeholder="Type here. Press Ctrl+Enter to send."></textarea>
  <div class="row">
    <button id="sendBtn" onclick="send()">Send</button>
    <button onclick="beat()">Beat</button>
  </div>
  <div class="hint">This is a minimal interface. It calls <code>/say</code> and <code>/beat</code> on the same server.</div>

<script>
const logEl = document.getElementById("log");
const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");

function append(text) {
  if (!text) return;
  logEl.textContent += (logEl.textContent ? "\\n\\n" : "") + text;
  logEl.scrollTop = logEl.scrollHeight;
}

async function post(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify(body || {})
  });
  const json = await res.json();
  return { res, json };
}

async function send() {
  const text = (inputEl.value || "").trim();
  if (!text) return;

  sendBtn.disabled = true;
  inputEl.value = "";

  try {
    const request_id = "ui-say-" + crypto.randomUUID();
    const { json } = await post("/say", { request_id, text });

    if (json && json.wrote && json.text) {
      append(json.text);
    }
  } catch (e) {
    append("[UI ERROR] " + String(e));
  } finally {
    sendBtn.disabled = false;
    inputEl.focus();
  }
}

async function beat() {
  try {
    const request_id = "ui-beat-" + crypto.randomUUID();
    const { json } = await post("/beat", { request_id });

    if (json && json.wrote && json.text) {
      append(json.text);
    }
  } catch (e) {
    append("[UI ERROR] " + String(e));
  }
}

inputEl.addEventListener("keydown", (ev) => {
  if (ev.ctrlKey && ev.key === "Enter") send();
});
</script>
</body>
</html>`;

// UI route
app.get("/", async (request, reply) => {
  reply.type("text/html; charset=utf-8");
  return UI_HTML;
});

// -------------------- COGNITION PROMPT --------------------

// Build system prompt for DeepSeek cognition
function buildSystemPrompt(scenePackage, retrievedBlocks, constraints) {
  const blockContext = retrievedBlocks
    .map((b) => `[${b.ts}] ${b.source}: ${b.text} (${b.visibility})`)
    .join("\n");

  const parts = [];

  // Base control rules from constraints (identity comes from retrieval/scene)
  if (constraints) {
    parts.push(constraints);
  }

  // Scene context
  if (scenePackage) {
    parts.push(`SCENE:\n${scenePackage}`);
  }

  // Retrieved memory
  if (blockContext) {
    parts.push(`MEMORY:\n${blockContext}`);
  }

  // JSON output format
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
  if (!dbAvailable) {
    reply.code(503);
    return { error: "db_unavailable" };
  }

  try {
    const { text, request_id } = request.body || {};
    const requestId = request_id || uuidv4();

    // Idempotency check
    const existingResponse = await getRequestLog(requestId);
    if (existingResponse) {
      return existingResponse;
    }

    // Retrieve context using user text
    const retrievedBlocks = await retrieveContext(text || "");
    const scenePackage = await getScenePackage();

    // Run cognition
    const systemPrompt = buildSystemPrompt(
      scenePackage,
      retrievedBlocks,
      CONSTRAINTS
    );
    const userPrompt = `User says: ${text}`;

    const cognitionResult = await runCognition(systemPrompt, userPrompt);

    // Validate cognition result
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

    // Write blocks if any
    if (blocksToWrite.length > 0) {
      await writeBlocks(blocksToWrite, requestId);
    }

    // Update scene if changed
    let sceneRefreshed = false;
    if (cognitionResult.scene_update) {
      await updateScenePackage(cognitionResult.scene_update);
      sceneRefreshed = true;
    }

    // Render output
    const renderedText = cognitionResult.wrote
      ? await renderText(cognitionResult.outward_text)
      : "";

    // Build response
    const response = {
      request_id: requestId,
      wrote: cognitionResult.wrote || false,
      speaker: cognitionResult.wrote ? cognitionResult.speaker : "",
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
  if (!dbAvailable) {
    reply.code(503);
    return { error: "db_unavailable" };
  }

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

    // Validate cognition result
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

    // Write blocks if any
    if (blocksToWrite.length > 0) {
      await writeBlocks(blocksToWrite, requestId);
    }

    // Update scene if changed
    let sceneRefreshed = false;
    if (cognitionResult.scene_update) {
      await updateScenePackage(cognitionResult.scene_update);
      sceneRefreshed = true;
    }

    // Render output
    const renderedText = cognitionResult.wrote
      ? await renderText(cognitionResult.outward_text)
      : "";

    // Build response
    const response = {
      request_id: requestId,
      wrote: cognitionResult.wrote || false,
      speaker: cognitionResult.wrote ? cognitionResult.speaker : "",
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
    setRendererConstraints(CONSTRAINTS);

    // Ping database
    try {
      await pingDb();
      dbAvailable = true;
      console.log("Database connected");
    } catch (error) {
      console.error("Database unavailable:", error.message);
      dbAvailable = false;
    }

    // Ensure Qdrant collection exists (handles its own errors)
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