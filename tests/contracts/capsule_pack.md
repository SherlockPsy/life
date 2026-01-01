# CONTRACT TEST SPECIFICATION: Capsule Pack
**Contract:** `/contracts/capsule_pack.md`
**Context:** Internal System -> LLM Communication (Character Continuity).

## 1. Valid Capsule (Definition)
**Scenario:** Character capsule generation.

**Valid Payload (Internal):**
```json
{
  "capsule_id": "cap_1",
  "person_id": "REBECCA",
  "created_at_world": "2026-01-01T12:00:00Z",
  "sections": [
    {
      "name": "SOURCE_EXCERPTS",
      "text": "She said hello.",
      "provenance": {"used_entry_ids":["e_1"]}
    }
  ]
}
```

## 2. Invalid Capsule (Definition)
**Scenario:** Missing SOURCE_EXCERPTS section.

**Invalid Payload (Internal):**
```json
{
  "capsule_id": "cap_1",
  "person_id": "REBECCA",
  "created_at_world": "2026-01-01T12:00:00Z",
  "sections": [
    {
      "name": "OPTIONAL_DERIVED",
      "text": "She seems nice.",
      "provenance": {"used_entry_ids":["e_1"]}
    }
  ]
}
```

**Expected Behavior:**
- Engine 6 (Capsule) MUST NOT emit this.
