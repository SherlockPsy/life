const { v4: uuidv4 } = require('uuid');

// CONSTANTS
const CONTEXT_CHAR_LIMIT = 10000; // Mechanical character limit
const REHYDRATION_TRIGGER_THRESHOLD = "NEAR_EXHAUSTION";

/**
 * Engine 5: Scene Anchor & Rehydration Engine
 */
const Engine5 = {

  /**
   * Main entry point for Beat Boundary check.
   * Called by Server/Engine 2 at the end of a beat.
   */
  async handleBeatBoundary(client, requestId, worldTime) {
    // 1. Get latest anchor
    const lastAnchor = await this.getLatestAnchor(client);
    
    // 2. Get entries since last anchor
    const entries = await this.getEntriesSince(client, lastAnchor ? lastAnchor.created_at_world : 0);
    
    // 3. Calculate Context Load (Mechanical)
    const load = this.calculateContextLoad(lastAnchor, entries);
    
    // 4. Check Threshold
    if (load >= CONTEXT_CHAR_LIMIT) {
      // 5. Trigger Rehydration
      return await this.performRehydration(client, requestId, worldTime, lastAnchor, entries);
    }
    
    return null; // No rehydration needed
  },

  /**
   * Retrieves the most recent Scene Anchor.
   */
  async getLatestAnchor(client) {
    const res = await client.query(
      'SELECT * FROM scene_anchors ORDER BY created_at_world DESC LIMIT 1'
    );
    return res.rows[0] || null;
  },

  /**
   * Retrieves ledger entries since a given world time.
   */
  async getEntriesSince(client, worldTime) {
    const res = await client.query(
      `SELECT e.* FROM entries e
       JOIN bundles b ON e.bundle_id = b.bundle_id
       WHERE e.created_at_world > $1
       AND b.wrote = true
       ORDER BY e.created_at_world ASC, e.sequence_id ASC`,
      [worldTime]
    );
    return res.rows;
  },

  /**
   * Mechanical load counting (Character Count).
   * Purely deterministic.
   */
  calculateContextLoad(anchor, entries) {
    let len = 0;
    if (anchor) len += anchor.anchor_text.length;
    entries.forEach(e => len += e.text.length);
    return len;
  },

  /**
   * Generates and stores a Rehydration Pack.
   * ATOMIC operation.
   */
  async performRehydration(client, requestId, worldTime, lastAnchor, entries) {
    const rehydrationId = "rh:" + uuidv4();
    
    // GENERATION LOGIC (Phase 7 Correction: Verbatim Only)
    // We must NOT invent text. We must NOT use placeholders.
    // We use the last entry as the physical continuity anchor.
    
    const lastEntry = entries[entries.length - 1];
    // If no entries, we default to empty string (silence).
    const physicalContinuity = lastEntry ? lastEntry.text : "";

    // The text of the rehydration pack is the re-introduction of context.
    // Since we cannot summarize (no LLM), we simply restate the physical continuity.
    const text = physicalContinuity;

    const provenance = {
      used_entry_ids: entries.map(e => e.entry_id),
      used_capsule_ids: []
    };

    const trigger = {
      kind: "TOKEN_BUDGET",
      threshold: REHYDRATION_TRIGGER_THRESHOLD
    };

    const pack = {
      rehydration_id: rehydrationId,
      request_id: requestId,
      created_at_world: worldTime,
      text: text,
      physical_continuity_replay: physicalContinuity,
      provenance: provenance,
      trigger: trigger
    };

    // Store it
    await client.query(
      `INSERT INTO rehydration_events 
       (rehydration_id, request_id, created_at_world, rehydration_text, physical_continuity_replay, provenance, trigger_info)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        pack.rehydration_id,
        pack.request_id,
        pack.created_at_world,
        pack.text,
        pack.physical_continuity_replay,
        JSON.stringify(pack.provenance),
        JSON.stringify(pack.trigger)
      ]
    );

    // Create a new Scene Anchor to reset the budget.
    // We use the same text (physical continuity) as the anchor.
    await this.createSceneAnchor(client, requestId, worldTime, entries, text);

    return pack;
  },

  /**
   * Creates a Scene Anchor.
   */
  async createSceneAnchor(client, requestId, worldTime, entries, summaryText) {
    const anchorId = "sa:" + uuidv4();
    
    const provenance = {
      used_entry_ids: entries.map(e => e.entry_id)
    };

    const anchorPack = {
      scene_anchor_id: anchorId,
      request_id: requestId,
      created_at_world: worldTime,
      text: summaryText || "", // No placeholders
      provenance: provenance
    };

    await client.query(
      `INSERT INTO scene_anchors
       (scene_anchor_id, request_id, created_at_world, anchor_text, provenance)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        anchorPack.scene_anchor_id,
        anchorPack.request_id,
        anchorPack.created_at_world,
        anchorPack.text,
        JSON.stringify(anchorPack.provenance)
      ]
    );

    return anchorPack;
  }
};

module.exports = Engine5;
