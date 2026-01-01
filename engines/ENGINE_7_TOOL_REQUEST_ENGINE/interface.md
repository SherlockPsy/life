# /engines/ENGINE_7_TOOL_REQUEST_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 7
ENGINE NAME: TOOL REQUEST ENGINE (LLM QUESTION GATE)

This file defines the ONLY permitted boundary for Engine 7.
Engine 7 governs how LLMs ask questions of the system.
It exists to prevent tools from becoming decision-makers.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 7 exists to ensure that:
- tools are used as **questions**, not helpers,
- tools never write, decide, infer, or summarize reality,
- tool usage is bounded, auditable, and knowledge-safe.

Engine 7 does not answer questions.
It validates and routes them.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 7 exclusively owns:

1. Tool request validation
- Enforces `/contracts/tool_request.md`.
- Ensures every tool request is explicit, bounded, and attributable.

2. Tool invocation gating
- Determines whether a tool request is permitted.
- Rejects malformed, unbounded, or policy-violating tool requests.

3. Tool loop bounding
- Prevents infinite or runaway tool invocation loops.
- Enforces per-beat and per-request limits.

Engine 7 is the ONLY engine allowed to accept ToolRequest objects.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 7 does NOT own:

- Tool implementation logic (Engine 8 or infrastructure).
- Knowledge boundary rules (Engine 4).
- Content generation (Engine 9).
- Capsule assembly (Engine 6).
- Scene anchoring (Engine 5).
- Rendering (Engine 12).
- Reality storage (Engine 0).

Engine 7 validates questions; it does not answer them.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 7 accepts ONLY:

A) `/contracts/tool_request.md`
- ToolRequest object produced by LLM Writer.

Any other input MUST be rejected.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 7 emits ONLY:

A) Routed ToolRequest (unchanged)
- Forwarded to the appropriate tool executor (Engine 8 or infrastructure).

B) Explicit rejection (internal error object)
- Returned to LLM Writer as a failure signal.
- MUST NOT be turned into narrative content.

Engine 7 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- RetrievalResultPack

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `validate_and_route_tool_request(tool_request) -> ROUTED|REJECTED`
Inputs:
- tool_request (ToolRequest contract)

Validation steps:
- tool_request_id present and unique within request scope.
- request_id matches active beat.
- requested_by.actor explicit.
- knowledge_view explicit.
- tool.name is recognized.
- constraints are bounded (limit present, time window explicit or null).
- request does not include semantic directives (“decide relevance”, “summarize truth”).

Behavior:
- If valid: route to tool executor.
- If invalid: reject explicitly.

### 5.2 `enforce_tool_limits(request_id, beat_id) -> OK|BLOCK`
- Ensures per-beat and per-request limits are respected.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 7 MAY call:
- ENGINE 4 (Knowledge Surface) to:
  - validate requested knowledge_view.
- ENGINE 8 (Retrieval Engine) to:
  - execute approved tool requests.

Engine 7 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 6 (Capsules)
- ENGINE 5 (Rehydration)
- ENGINE 12 (Projection)
- ENGINE 0 (Ledger)
- ENGINE 3 (Time)

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 7 MAY read:
- tool_request payload
- tool usage counters (mechanical)

Engine 7 MAY write:
- tool invocation audit logs (non-world)

Engine 7 MUST NOT write:
- ledger entries
- capsule data
- retrieval results
- summaries

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 7 MUST NEVER:
- Modify the content of a tool request.
- Decide what the LLM “really wants”.
- Add implicit constraints.
- Allow tools to write reality.
- Allow unbounded loops.
- Turn tool errors into narrative events.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If a tool request is invalid:
- MUST reject explicitly.
- MUST return control to LLM Writer with failure signal.

If tool limits are exceeded:
- MUST block further tool requests for this beat.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 7 SUBJECT)

Engine 7 MUST pass:

T1. Reject unbounded tool requests.
T2. Reject missing knowledge_view.
T3. Reject unknown tool names.
T4. Enforce per-beat tool call limits.
T5. Never modify tool request payloads.
T6. Never produce narrative output.

----------------------------------------------------------------------

END OF ENGINE 7 INTERFACE