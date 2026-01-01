# CONTRACT TEST SPECIFICATION: Write Entry
**Contract:** `/contracts/write_entry.md`
**Context:** Internal Ledger Artifact.
**Verification:** Verified via `ProjectionOutput` (stream entries) or internal consistency checks.

## 1. Valid Write Entry (Implicit)
**Scenario:** An invocation that causes a write (e.g., operator input) produces a `WriteEntry` in the ledger, which is then rendered in the Projection.

```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_write_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "This is a write." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expected Result:**
- **HTTP Status:** 200 OK
- **Response Body:** `stream.entries` contains an entry where:
    - `text` == "This is a write."
    - `channel` == "USER"
    - `author_label` is null (for USER channel).

## 2. Invalid Write Entry (Definition)
**Scenario:** System MUST NOT produce a Write Entry with missing text.

**Invalid Payload (Internal):**
```json
{
  "entry_id": "e_1",
  "bundle_id": "b_1",
  "request_id": "req_1",
  "created_at_world": "2026-01-01T12:00:00Z",
  "author": { "author_id": "GEORGE", "author_class": "OPERATOR" },
  "visibility": { "scope": "PUBLIC", "visible_to": [] },
  "channel": "USER"
  // MISSING "text"
}
```

**Expected Behavior:**
- If the system attempts to commit this, Engine 0 (Ledger) MUST reject it.
- The invocation should fail or return a non-write outcome.
