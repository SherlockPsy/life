# CONTRACT TEST SPECIFICATION: Tool Request
**Contract:** `/contracts/tool_request.md`
**Context:** Internal LLM -> System Communication.
**Verification:** Internal logs or debug traces (if available). Not directly exposed via public API.

## 1. Valid Tool Request (Definition)
**Scenario:** LLM requests a ledger search.

**Valid Payload (Internal):**
```json
{
  "tool_request_id": "tr_1",
  "request_id": "req_1",
  "requested_by": {
    "engine": "ENGINE_9_LLM_WRITER",
    "actor": "REBECCA",
    "knowledge_view": "REBECCA"
  },
  "tool": {
    "name": "LEDGER_SEARCH",
    "query_text": "What happened?",
    "constraints": {
      "time_window": {"from":null,"to":null},
      "limit": 10,
      "person_id": null
    }
  }
}
```

## 2. Invalid Tool Request (Definition)
**Scenario:** Requesting an unknown tool.

**Invalid Payload (Internal):**
```json
{
  "tool_request_id": "tr_1",
  "request_id": "req_1",
  "requested_by": { "engine": "ENGINE_9", "actor": "REBECCA", "knowledge_view": "REBECCA" },
  "tool": {
    "name": "INVALID_TOOL_NAME",
    "query_text": "...",
    "constraints": {}
  }
}
```

**Expected Behavior:**
- Engine 7 (Tool Request) MUST reject this request.
