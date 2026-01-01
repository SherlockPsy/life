# CONTRACT TEST SPECIFICATION: Write Bundle
**Contract:** `/contracts/write_bundle.md`
**Context:** Internal Atomic Commit Unit.
**Verification:** Verified via `ProjectionOutput` debug section (`debug.wrote`, `debug.bundle_id`).

## 1. Valid Write Bundle (Implicit)
**Scenario:** Successful write invocation.

```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_bundle_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Commit this." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expected Result:**
- **HTTP Status:** 200 OK
- **Response Body:**
    - `debug.wrote` == `true`
    - `debug.bundle_id` is non-null.

## 2. Invalid Write Bundle (Definition)
**Scenario:** Bundle with `wrote: true` but empty entries.

**Invalid Payload (Internal):**
```json
{
  "bundle_id": null,
  "request_id": "req_1",
  "proposed_by": { "engine": "ENGINE_9", "actor": "SYSTEM" },
  "entries": [],
  "wrote": true,
  "rejection": { "rejected": false, "reason": null }
}
```

**Expected Behavior:**
- Engine 10 (Integrity) MUST reject this proposal.
- Engine 0 (Ledger) MUST NOT commit it.
