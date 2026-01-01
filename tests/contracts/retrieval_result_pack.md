# CONTRACT TEST SPECIFICATION: Retrieval Result Pack
**Contract:** `/contracts/retrieval_result_pack.md`
**Context:** Internal System -> LLM Communication.

## 1. Valid Retrieval Result (Definition)
**Scenario:** Successful search returns excerpts.

**Valid Payload (Internal):**
```json
{
  "tool_request_id": "tr_1",
  "request_id": "req_1",
  "results": [
    {
      "entry_id": "e_1",
      "bundle_id": "b_1",
      "created_at_world": "2026-01-01T10:00:00Z",
      "visibility_scope": "PUBLIC",
      "verbatim_excerpt": "Hello world"
    }
  ],
  "empty": false,
  "notes": null
}
```

## 2. Invalid Retrieval Result (Definition)
**Scenario:** `empty` flag contradicts `results` array.

**Invalid Payload (Internal):**
```json
{
  "tool_request_id": "tr_1",
  "request_id": "req_1",
  "results": [],
  "empty": false, 
  "notes": null
}
```

**Expected Behavior:**
- Engine 8 (Retrieval) MUST NOT emit this.
- Engine 9 (LLM) MUST reject/fail if received.
