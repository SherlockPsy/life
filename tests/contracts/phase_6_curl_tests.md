# Phase 6 Authoritative Curl Tests: Knowledge & Tools (Pocket Verification)

## Purpose
Verify that the system exposes the required Knowledge Surface (Pocket) structure as defined in Phase 6 (Knowledge) and Phase 4 (Projection) contracts.
*Note: Dynamic tool execution (Engine 7) cannot be deterministically verified without a controlled LLM, so we verify the static Knowledge Surface structure which is the output channel for retrieved knowledge.*

## Authority
- **Source:** `/contracts/projection_output.md` (Pocket Structure)
- **Source:** `/engines/ENGINE_6_CAPSULE_ENGINE/interface.md` (Capsule Structure)
- **Clause:** "Pocket... MUST be derived from written reality."

## Preconditions
- System is running.

---

### 1. Capsule/Pocket Shape Present
**Purpose:** Verify that the response contains the mandatory `pocket` object with `clock`, `calendar`, and `messages`.
**Clause:** "response JSON contains pocket object... pocket.calendar/items exists"

```bash
curl -i -X POST "$BASE_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_phase6_pocket_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Check pocket." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": null, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expectations:**
- **Status:** 200 OK
- **Body:** `pocket` object exists.
- **Body:** `pocket.calendar.items` is an array.
- **Body:** `pocket.messages.items` is an array.
- **Body:** `pocket.is_available` is boolean.

---

### 2. Capsule Stable Under Idempotency
**Purpose:** Verify that the pocket structure is stable when replaying the same request.
**Clause:** "Replay must return identical output."

```bash
curl -i -X POST "$BASE_URL/invocations" \
  -H "Content-Type: application/json" \
  -d '{
  "request_id": "req_phase6_pocket_001",
  "invoker": { "invoker_id": "user_1", "invoker_role": "INVOKER", "notes": null },
  "operator": { "operator_id": "GEORGE", "input_text": "Check pocket." },
  "mode": { "kind": "BEAT", "client_intent": null },
  "declared_overrides": { "time": null, "pause_time": null },
  "ui": { "stream_cursor": null, "client_timestamp_utc": null }
}'
```

**Expectations:**
- **Status:** 200 OK
- **Body:** Identical to Test 1.
