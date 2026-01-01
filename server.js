const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ENGINE 0: REALITY LEDGER & ENGINE 1: INVOCATION
app.post('/invocations', async (req, res) => {
  const envelope = req.body;
  const requestId = envelope.request_id;

  if (!requestId) {
    return res.status(400).json({ error: "Missing request_id" });
  }

  const client = await pool.connect();

  try {
    // 1. IDEMPOTENCY CHECK
    const existingInv = await client.query('SELECT * FROM invocations WHERE request_id = $1', [requestId]);
    
    if (existingInv.rows.length > 0) {
      // Replay: Fetch committed bundle and entries
      const bundleRes = await client.query('SELECT * FROM bundles WHERE request_id = $1', [requestId]);
      const bundle = bundleRes.rows[0];
      
      let entries = [];
      if (bundle && bundle.wrote) {
        const entriesRes = await client.query('SELECT * FROM entries WHERE bundle_id = $1 ORDER BY sequence_id ASC', [bundle.bundle_id]);
        entries = entriesRes.rows;
      }

      return res.json(constructProjection(requestId, bundle, entries));
    }

    // 2. NEW WRITE (ATOMIC TRANSACTION)
    await client.query('BEGIN');

    // A. Record Invocation
    await client.query('INSERT INTO invocations (request_id, envelope) VALUES ($1, $2)', [requestId, envelope]);

    // B. Construct Write Bundle (Phase 4: Echo Operator Input)
    const bundleId = uuidv4();
    const entryId = uuidv4();
    const now = new Date().toISOString(); 
    const inputText = envelope.operator?.input_text || "";
    
    const shouldWrite = inputText.length > 0; 

    const bundle = {
      bundle_id: shouldWrite ? bundleId : null,
      request_id: requestId,
      proposed_by: { engine: "ENGINE_1_INVOCATION", actor: "SYSTEM_INVOKER" },
      wrote: shouldWrite,
      rejection: { rejected: false, reason: null }
    };

    await client.query(
      'INSERT INTO bundles (request_id, bundle_id, proposed_by, wrote, rejection) VALUES ($1, $2, $3, $4, $5)',
      [bundle.request_id, bundle.bundle_id, bundle.proposed_by, bundle.wrote, bundle.rejection]
    );

    let entries = [];
    if (shouldWrite) {
      const entry = {
        entry_id: entryId,
        bundle_id: bundleId,
        request_id: requestId,
        created_at_world: now,
        author: { author_id: "GEORGE", author_class: "OPERATOR" },
        visibility: { scope: "PUBLIC", visible_to: [] },
        channel: "USER",
        text: inputText
      };

      await client.query(
        'INSERT INTO entries (entry_id, bundle_id, request_id, created_at_world, author, visibility, channel, text) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [entry.entry_id, entry.bundle_id, entry.request_id, entry.created_at_world, entry.author, entry.visibility, entry.channel, entry.text]
      );
      entries.push(entry);
    }

    await client.query('COMMIT');

    // 3. RETURN PROJECTION
    res.json(constructProjection(requestId, bundle, entries));

  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    res.status(500).json({ error: "Internal Server Error", details: e.message });
  } finally {
    client.release();
  }
});

function constructProjection(requestId, bundle, entries) {
  return {
    request_id: requestId,
    stream: {
      cursor_before: null,
      cursor_after: null,
      entries: entries.map(e => ({
        entry_id: e.entry_id,
        created_at_world: e.created_at_world,
        channel: e.channel,
        author_label: e.channel === 'PEOPLE' ? e.author.author_id : null,
        text: e.text
      }))
    },
    pocket: {
      is_available: false,
      clock: { world_time: null, timezone: null },
      calendar: { items: [] },
      messages: { items: [] }
    },
    debug: {
      wrote: bundle ? bundle.wrote : false,
      bundle_id: bundle ? bundle.bundle_id : null
    }
  };
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
