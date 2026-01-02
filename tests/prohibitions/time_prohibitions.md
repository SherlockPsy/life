# PROHIBITION TEST SPECIFICATION: Time
**Scope:** Engine 3 (Time) & Engine 1 (Invocation)

## 1. Prohibition: Implicit Time Jump
**Rule:** Operator text like "Later that day..." MUST NOT cause the system clock to advance unless an explicit override is provided.

**Test Scenario:**
```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_prohibit_time_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Later that day..." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": {
    "time": { "declared_world_time": null, "timezone": null },
    "pause_time": false
  },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expected Result:**
- **HTTP Status:** 200 OK
- **Response Body:** `pocket.clock.world_time` MUST NOT show a significant jump (beyond standard beat duration) compared to previous state.
- The text "Later that day..." is recorded as USER text, but the *world physics* does not skip forward.

---

## 2. Control: Explicit Time Jump (Allowed)
**Rule:** Explicit overrides ARE allowed.
**Constraint:** `declared_world_time` MUST be a non-negative integer (ticks). ISO strings are invalid.

**Test Scenario:**
```bash
curl -X POST https://life-production.up.railway.app/invocations \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_allow_time_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Time passes." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": {
    "time": { "declared_world_time": 1000, "timezone": null },
    "pause_time": false
  },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expected Result:**
- **HTTP Status:** 200 OK
- **Response Body:** `pocket.clock.world_time` matches `1000`.
