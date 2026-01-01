# CONTRACT TEST SPECIFICATION: Invocation Envelope
**Contract:** `/contracts/invocation_envelope.md`
**Endpoint:** `POST /invocations` (Implied by Engine 1 Interface)

## 1. Valid Invocation (BEAT)
**Scenario:** Standard operator input triggering a beat.

```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_valid_beat_001",
  "invoker": {
    "invoker_id": "user_external_1",
    "invoker_role": "INVOKER",
    "notes": "Standard beat test"
  },
  "operator": {
    "operator_id": "GEORGE",
    "input_text": "Hello world."
  },
  "mode": {
    "kind": "BEAT",
    "client_intent": null
  },
  "declared_overrides": {
    "time": { "declared_world_time": null, "timezone": null },
    "pause_time": false
  },
  "ui": { "stream_cursor": null, "client_timestamp_utc": "2026-01-01T12:00:00Z" }
}'
```

**Expected Result:**
- **HTTP Status:** 200 OK
- **Response Body:** Matches `/contracts/projection_output.md`

---

## 2. Invalid: Missing request_id
**Scenario:** Payload missing mandatory `request_id`.

```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "invoker": {
    "invoker_id": "user_external_1",
    "invoker_role": "INVOKER",
    "notes": null
  },
  "operator": {
    "operator_id": "GEORGE",
    "input_text": "Fail me."
  },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expected Result:**
- **HTTP Status:** 400 Bad Request
- **Response Body:** Error details (structure undefined, but must be error).

---

## 3. Invalid: Wrong Operator ID
**Scenario:** `operator_id` is not "GEORGE".

```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_invalid_op_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": {
    "operator_id": "NOT_GEORGE",
    "input_text": "I am an imposter."
  },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expected Result:**
- **HTTP Status:** 400 Bad Request

---

## 4. Invalid: Invoker is GEORGE
**Scenario:** `invoker_id` is "GEORGE" (Forbidden).

```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_invalid_invoker_001",
  "invoker": {
    "invoker_id": "GEORGE",
    "invoker_role": "INVOKER",
    "notes": null
  },
  "operator": { "operator_id": "GEORGE", "input_text": "Self-invocation." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": { "declared_world_time": null, "timezone": null }, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expected Result:**
- **HTTP Status:** 400 Bad Request
