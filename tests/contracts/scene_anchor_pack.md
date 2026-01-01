# CONTRACT TEST SPECIFICATION: Scene Anchor Pack
**Contract:** `/contracts/scene_anchor_pack.md`
**Context:** Internal System -> LLM Communication (Context Management).

## 1. Valid Scene Anchor (Definition)
**Scenario:** Scene setup with provenance.

**Valid Payload (Internal):**
```json
{
  "scene_anchor_id": "sa_1",
  "request_id": "req_1",
  "created_at_world": "2026-01-01T12:00:00Z",
  "text": "The room is quiet.",
  "provenance": {
    "used_entry_ids": ["e_1", "e_2"]
  }
}
```

## 2. Invalid Scene Anchor (Definition)
**Scenario:** Missing provenance.

**Invalid Payload (Internal):**
```json
{
  "scene_anchor_id": "sa_1",
  "request_id": "req_1",
  "created_at_world": "2026-01-01T12:00:00Z",
  "text": "The room is quiet."
  // MISSING provenance
}
```

**Expected Behavior:**
- Engine 5 (Scene Anchor) MUST NOT emit this.
