# CONTRACT TEST SPECIFICATION: Projection Output
**Contract:** `/contracts/projection_output.md`
**Endpoint:** `POST /invocations` (Response Payload)

## 1. Valid Projection Response
**Scenario:** Successful invocation returns a valid projection.

```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_proj_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Show me the world." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expected Result:**
- **HTTP Status:** 200 OK
- **Response Body:** MUST match `ProjectionOutput` shape.

**Validation Criteria:**
- `request_id` matches input (`req_proj_001`).
- `stream` object exists.
- `stream.entries` is an array.
- `pocket` object exists.
- `debug` object exists.
- `debug.wrote` is boolean.

---

## 2. Idempotency Replay
**Scenario:** Sending the same `request_id` twice returns identical projection.

```bash
# First Call
curl -X POST https://life-production.up.railway.app/invocations \
  -d '{ "request_id": "req_replay_001", ... }'

# Second Call (Identical Payload)
curl -X POST https://life-production.up.railway.app/invocations \
  -d '{ "request_id": "req_replay_001", ... }'
```

**Expected Result:**
- Both return 200 OK.
- Response bodies are byte-for-byte identical (or semantically identical).
