# /engines/ENGINE_1_INVOCATION_AND_IDEMPOTENCY_ENVELOPE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 1
ENGINE NAME: INVOCATION & IDEMPOTENCY ENVELOPE ENGINE

This file defines the ONLY permitted boundary for Engine 1.
Engine 1 is the front-door contract enforcer for invocations and idempotency behavior.
It does not create meaning. It enforces shape and replay.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 1 exists to ensure:
- every runtime call is contract-valid,
- the system treats an invoker (non-George) as the LLM “user,”
- idempotency is enforced as a mechanical invariant:
  - same request_id returns identical outcome,
  - duplicates do not create new reality.

Engine 1 does not decide what happens in the world.
It decides whether an invocation is valid and whether it is a replay.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 1 exclusively owns:

1. Invocation validation gate
- Validate `/contracts/invocation_envelope.md` and reject invalid invocations.

2. Idempotency front-door behavior (decision side)
- Determine if request_id is:
  - new (needs processing)
  - replay (must return stored identical outcome)

3. Invocation audit capture (mechanical)
- Persist invoker/operator identity as metadata for traceability (not world facts).

4. “George is not the LLM user” enforcement at boundary
- Ensure invoker identity is distinct from operator identity.

Engine 1 is the ONLY owner of invocation acceptance/rejection logic.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 1 does NOT own:

- Ledger persistence semantics (Engine 0).
- Time advancement decisions (Engine 3).
- Scene/rehydration logic (Engine 5).
- Knowledge gating (Engine 4).
- Retrieval ranking or excerpts (Engine 8).
- Tool request loop logic (Engine 7).
- Any content generation (Engine 9).
- Rendering/projection (Engine 12).
- Any semantic interpretation of operator text.

Engine 1 is a gate and router, not an intelligence.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 1 accepts ONLY:
- `/contracts/invocation_envelope.md` (InvocationEnvelope)

Any other input shape must be rejected.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 1 outputs one of:

A) Replay outcome (if request_id already processed):
- `/contracts/projection_output.md` (ProjectionOutput), loaded from stored outcome
- and MAY include the committed bundle_id in debug for traceability (as allowed by projection_output contract)

B) “Proceed” directive (internal mechanical routing output; not a world fact):
- A structured internal signal to Engine 2 indicating:
  - request_id is new,
  - invocation is valid,
  - invoker/operator identities are validated.

Note:
Engine 1 MUST NOT output any content that appears in the perceptual stream.

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `validate_and_route(invocation_envelope) -> {kind: REPLAY|PROCEED, payload}`
Inputs:
- invocation_envelope: InvocationEnvelope

Behavior:
1) Validate contract shape:
   - required fields present
   - invoker_role == "INVOKER"
   - operator_id == "GEORGE"
   - request_id non-empty
2) Enforce posture constraint:
   - invoker_id MUST NOT be "GEORGE"
3) Idempotency check:
   - ask Engine 0 (or an idempotency store owned by Engine 0) whether request_id already has a committed outcome
   - if yes: return REPLAY + the previously stored ProjectionOutput exactly
   - if no: return PROCEED + invocation_envelope (unchanged)

### 5.2 `get_invocation_audit(request_id) -> invocation_audit|null`
- Returns stored audit metadata for debugging/audit only.
- Must not be treated as world state.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 1 MAY call:
- ENGINE 0 (Reality Ledger) for:
  - `get_committed_outcome_by_request_id(request_id)`
  - optionally: store invocation audit metadata linked to request_id (mechanical)

Engine 1 MAY call:
- ENGINE 11 (Infrastructure) for logging/metrics only (non-authoritative).

Engine 1 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 12 (Projection) to generate new content
- ENGINE 5 (Rehydration)
- ENGINE 8 (Retrieval)
- ENGINE 7 (Tools)
- ENGINE 6 (Capsules)
- ENGINE 3 (Time)
- Any engine for “help me decide what to do”

Engine 1 does not “think.” It checks and routes.

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 1 MAY read:
- invocation_envelope fields only
- idempotency outcome pointer (from Engine 0)

Engine 1 MAY write:
- invocation audit record (request_id, invoker_id, operator_id, received_at) as mechanical metadata
- ONLY if stored in a non-world, audit-only store or in Engine 0’s request table metadata.

Engine 1 MUST NOT write:
- any WriteEntry
- any narrative content
- any time changes
- any knowledge/capsule content

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 1 MUST NEVER:
- Treat the operator (George) as LLM user.
- Modify operator input text.
- Invent a request_id.
- Auto-fill missing fields.
- “Fix” malformed invocations.
- Decide outcomes, pacing, or narrative direction.
- Create ledger entries.
- Bypass idempotency by “recomputing because it’s easier.”

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If invocation is invalid:
- MUST return explicit error (HTTP 400 or equivalent).
- MUST NOT proceed to beat processing.

If replay outcome exists but cannot be loaded:
- MUST return explicit failure (HTTP 500 or equivalent).
- MUST NOT regenerate a “similar” response.

If Engine 0 is unavailable for idempotency lookup:
- MUST fail explicitly.
- MUST NOT proceed as if new request.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 1 SUBJECT)

Engine 1 MUST pass:

T1. Reject missing request_id
T2. Reject invoker_role != INVOKER
T3. Reject invoker_id == GEORGE
T4. Accept valid invocation and route PROCEED
T5. Replay returns identical ProjectionOutput and blocks new writes
T6. Replay does not call LLM Writer
T7. Operator input is preserved verbatim (no mutation)

----------------------------------------------------------------------

END OF ENGINE 1 INTERFACE