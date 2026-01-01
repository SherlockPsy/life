# /engines/ENGINE_2_BEAT_AND_OPPORTUNITY_COORDINATOR/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 2
ENGINE NAME: BEAT & OPPORTUNITY COORDINATOR

This file defines the ONLY permitted boundary for Engine 2.
Engine 2 coordinates *when* the system is allowed to attempt actions.
It does not decide *what* happens.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 2 exists to enforce **beat-based progression**.

A beat is a mechanical opportunity boundary where:
- time may advance,
- the world may respond,
- or nothing may happen at all.

Engine 2 ensures:
- the system does not react continuously,
- silence is allowed,
- no engine acts outside a beat boundary.

Engine 2 is explicitly **non-intelligent**.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 2 exclusively owns:

1. Beat boundary enforcement
- All world-affecting activity MUST occur inside a beat.
- No mid-beat writes are permitted.

2. Opportunity surfacing (mechanical)
- Determines whether a beat allows:
  - possible write attempt,
  - explicit no-write,
  - projection-only refresh.

3. Silence legitimacy
- A beat may legally produce no write bundle.
- Silence is a first-class valid outcome.

4. Beat sequencing
- Maintains the mechanical notion of “next beat” after invocation acceptance.

Engine 2 is the ONLY engine allowed to say “this is a beat boundary.”

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 2 does NOT own:

- Time semantics or clock math (Engine 3).
- Reality commits (Engine 0).
- Scene anchoring or rehydration (Engine 5).
- Knowledge visibility or memory retrieval (Engine 4 / 8).
- Content generation (Engine 9).
- Rendering or UI decisions (Engine 12).
- Interpretation of operator intent or meaning.

Engine 2 does not know *why* something should happen.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 2 accepts ONLY:

A) Validated invocation envelope (from Engine 1)
- `/contracts/invocation_envelope.md`

B) Optional replay directive (from Engine 1)
- If invocation is REPLAY, Engine 2 MUST NOT be called.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 2 emits ONLY mechanical routing outputs:

A) Beat Context (internal mechanical object)
- Contains:
  - request_id
  - beat_id (monotonic, mechanical)
  - beat_kind (NORMAL | NO_OP)
  - invocation_envelope (unchanged)
- This context is NOT a world fact and MUST NOT be written to ledger.

Engine 2 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `open_beat(invocation_envelope) -> beat_context`
Inputs:
- invocation_envelope (validated)

Behavior:
- Assign a new beat_id.
- Determine beat_kind:
  - NORMAL if invocation.mode.kind == "BEAT"
  - NO_OP if invocation.mode.kind == "NO_OP"
- Attach invocation_envelope unchanged.
- Return beat_context.

### 5.2 `close_beat(beat_context, outcome)`
Inputs:
- beat_context
- outcome (one of):
  - committed write bundle
  - explicit no-write
  - error

Behavior:
- Ensure exactly one outcome occurs.
- Mark beat as closed.
- Prevent reuse of beat_context.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 2 MAY call:
- ENGINE 3 (Time & Calendar) to ask:
  - whether time should advance mechanically at beat boundary.
- ENGINE 5 (Scene Anchor & Rehydration) to ask:
  - whether rehydration is required at this boundary.

Engine 2 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 8 (Retrieval)
- ENGINE 7 (Tools)
- ENGINE 6 (Capsules)
- ENGINE 12 (Projection)
- ENGINE 0 (Ledger) directly

Engine 2 coordinates, it does not act.

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 2 MAY read:
- invocation envelope
- beat sequence metadata (mechanical)

Engine 2 MAY write:
- beat sequence metadata (non-world, mechanical only)

Engine 2 MUST NOT write:
- ledger entries
- time state
- scene state
- cache state

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 2 MUST NEVER:
- Decide that something “should happen.”
- Force a response when silence is valid.
- Advance time implicitly.
- Allow mid-beat writes.
- Re-open a closed beat.
- Skip beats to “catch up.”

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If beat cannot be opened:
- MUST fail explicitly.
- MUST NOT proceed to any downstream engine.

If close_beat is called more than once:
- MUST reject.
- MUST NOT allow partial outcomes.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 2 SUBJECT)

Engine 2 MUST pass:

T1. Every invocation opens exactly one beat.
T2. No writes occur outside a beat.
T3. Beat allows no-write outcome.
T4. NO_OP beat produces no write attempts.
T5. Beat cannot be reused after close.
T6. Beat ordering is monotonic.

----------------------------------------------------------------------

END OF ENGINE 2 INTERFACE