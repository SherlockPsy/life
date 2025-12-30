import pg from "pg";
import { randomUUID } from "crypto";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Railway usually sets DATABASE_URL with SSL required in production.
  // If your env already handles SSL, this won't hurt.
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// ---------- Basic DB health ----------

export async function pingDb() {
  await pool.query("SELECT 1");
}

// ---------- Blocks ledger (authoritative) ----------

export async function insertBlock({ id, source, text, visibility, request_id }) {
  // NOTE: assumes table "blocks" already exists with these columns.
  // If your schema differs, Copilot must align it to match existing schema.
  await pool.query(
    `
    INSERT INTO blocks (id, source, text, visibility, request_id)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [id, source, text, visibility, request_id ?? null]
  );
}

export async function getBlocksByIds(ids) {
  if (!ids || ids.length === 0) return [];
  const res = await pool.query(
    `
    SELECT id, source, text, visibility, ts
    FROM blocks
    WHERE id = ANY($1::uuid[])
    ORDER BY ts ASC
    `,
    [ids]
  );
  return res.rows;
}

export async function getRecentBlocks(limit = 8) {
  const res = await pool.query(
    `
    SELECT id, source, text, visibility, ts
    FROM blocks
    ORDER BY ts DESC
    LIMIT $1
    `,
    [limit]
  );

  // Return oldest->newest for prompt readability
  return res.rows.reverse();
}

// ---------- Request log (idempotency) ----------

export async function getRequestLog(requestId) {
  const res = await pool.query(
    `
    SELECT response
    FROM request_log
    WHERE request_id = $1
    LIMIT 1
    `,
    [requestId]
  );

  if (res.rowCount === 0) return null;

  // response is expected to be JSON/JSONB in Postgres
  return res.rows[0].response;
}

export async function insertRequestLog(requestId, responseObj) {
  await pool.query(
    `
    INSERT INTO request_log (request_id, response)
    VALUES ($1, $2)
    ON CONFLICT (request_id) DO UPDATE SET response = EXCLUDED.response
    `,
    [requestId, responseObj]
  );
}

// ---------- Scene package (cache demoted) ----------
//
// RULE:
// - scene_cache is NOT authoritative.
// - the authoritative record is the blocks ledger.
// - scene_cache can be deleted and rebuilt at any time.
//

const SCENE_PREFIX = "SCENE_PACKAGE:\n";

async function getScenePackageFromCache() {
  // This table may or may not exist in your schema; if it exists, it's convenience only.
  const res = await pool.query(
    `SELECT scene_package FROM scene_cache WHERE id = 1`
  );
  if (res.rowCount === 0) return null;
  return res.rows[0].scene_package || null;
}

async function setScenePackageCache(sceneText) {
  // Upsert cache row (convenience only)
  await pool.query(
    `
    INSERT INTO scene_cache (id, scene_package, updated_at)
    VALUES (1, $1, now())
    ON CONFLICT (id) DO UPDATE SET scene_package = EXCLUDED.scene_package, updated_at = now()
    `,
    [sceneText]
  );
}

async function rebuildScenePackageFromLedger() {
  // Find the latest authoritative SCENE_PACKAGE block
  const res = await pool.query(
    `
    SELECT text
    FROM blocks
    WHERE source = 'SYSTEM'
      AND visibility = 'private'
      AND text LIKE 'SCENE_PACKAGE:%'
    ORDER BY ts DESC
    LIMIT 1
    `
  );

  if (res.rowCount === 0) return null;

  const fullText = res.rows[0].text || "";
  if (!fullText.startsWith(SCENE_PREFIX)) return null;

  return fullText.slice(SCENE_PREFIX.length);
}

export async function getScenePackage() {
  // 1) Try cache (convenience)
  try {
    const cached = await getScenePackageFromCache();
    if (cached && String(cached).trim()) return cached;
  } catch (e) {
    // Cache failure must NOT break reality.
    // We rebuild from ledger instead.
  }

  // 2) Rebuild from authoritative ledger
  const rebuilt = await rebuildScenePackageFromLedger();
  if (rebuilt && String(rebuilt).trim()) {
    // Repopulate cache as convenience
    try {
      await setScenePackageCache(rebuilt);
    } catch (e) {
      // ignore cache write errors
    }
    return rebuilt;
  }

  return null;
}

export async function updateScenePackage(sceneText) {
  // Authoritative write: append to blocks ledger
  const id = randomUUID();
  const authoritativeText = `${SCENE_PREFIX}${sceneText ?? ""}`;

  await insertBlock({
    id,
    source: "SYSTEM",
    text: authoritativeText,
    visibility: "private",
    request_id: "scene_update",
  });

  // Convenience write: update cache (not authoritative)
  try {
    await setScenePackageCache(sceneText ?? "");
  } catch (e) {
    // ignore cache write errors
  }
}