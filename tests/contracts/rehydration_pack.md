# CONTRACT TEST SPECIFICATION: Rehydration Pack
**Contract:** `/contracts/rehydration_pack.md`
**Context:** Internal System -> LLM Communication (Context Recovery).

## 1. Valid Rehydration (Definition)
**Scenario:** Context limit reached, rehydration triggered.

**Valid Payload (Internal):**
```json
{
  "rehydration_id": "rh_1",
  "request_id": "req_1",
  "created_at_world": "2026-01-01T12:00:00Z",
  "text": "Summary of previous events.",
  "physical_continuity_replay": "Standing in the kitchen.",
  "provenance": {
    "used_entry_ids": ["e_1"],
    "used_capsule_ids": []
  },
  "trigger": {
    "kind": "TOKEN_BUDGET",
    "threshold": "80%"
  }
}
```

## 2. Invalid Rehydration (Definition)
**Scenario:** Missing physical continuity replay.

**Invalid Payload (Internal):**
```json
{
  "rehydration_id": "rh_1",
  "request_id": "req_1",
  "created_at_world": "2026-01-01T12:00:00Z",
  "text": "Summary.",
  "provenance": { "used_entry_ids": [] },
  "trigger": { "kind": "TOKEN_BUDGET", "threshold": "80%" }
  // MISSING physical_continuity_replay
}
```

**Expected Behavior:**
- Engine 5 (Scene Anchor) MUST NOT emit this.
