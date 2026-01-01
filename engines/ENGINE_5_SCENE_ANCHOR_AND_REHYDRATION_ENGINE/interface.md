# /engines/ENGINE_5_SCENE_ANCHOR_AND_REHYDRATION_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 5
ENGINE NAME: SCENE ANCHOR & REHYDRATION ENGINE

This file defines the ONLY permitted boundary for Engine 5.
Engine 5 is responsible for scene continuity and context survival.
It preserves lived experience without becoming a narrator or director.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 5 exists to solve one problem only:
**how the system survives context limits without breaking reality.**

It does this by:
- caching scene anchors,
- regenerating them mechanically when required,
- performing rehydration invisibly and atomically.

Engine 5 does NOT decide what happens in a scene.
It preserves *where things already are*.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 5 exclusively owns:

1. Scene anchor generation
- Natural-language scene setup summaries.
- Generated from ledger-backed evidence only.
- Treated as cached context, not world authority.

2. Rehydration triggering (mechanical)
- Triggered ONLY by token budget thresholds.
- NEVER triggered semantically (“this feels long”).

3. Rehydration execution
- Natural-language reintroduction of context.
- Includes physical continuity replay.
- Happens ONLY at beat boundaries.
- Atomic: completes fully or not at all.

4. Scene cache lifecycle
- Determines when anchors are reused, replaced, or regenerated.
- Cache invalidation is mechanical, not narrative.

Engine 5 is the ONLY engine allowed to produce scene_anchor_pack and rehydration_pack.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 5 does NOT own:

- Reality creation or modification (Engine 0).
- Time advancement (Engine 3).
- Beat boundaries (Engine 2).
- Knowledge boundaries (Engine 4).
- Retrieval mechanics (Engine 8).
- Tool invocation logic (Engine 7).
- Content generation beyond anchoring (Engine 9).
- Rendering/UI decisions (Engine 12).

Engine 5 preserves continuity; it does not invent events.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 5 accepts ONLY:

A) Beat boundary notification
- Mechanical signal from Engine 2.

B) Token budget signal
- Mechanical signal indicating proximity to context exhaustion.

C) Ledger excerpts (via Engine 8)
- Only entries permitted by Engine 4 knowledge surface.

D) Capsule packs (optional)
- `/contracts/capsule_pack.md`
- Only as supporting continuity material.

Engine 5 MUST reject any semantic “please rehydrate now” request.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 5 emits ONLY:

A) `/contracts/scene_anchor_pack.md`
- For initial scene setup or scene change.

B) `/contracts/rehydration_pack.md`
- For context regeneration near limits.

Engine 5 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- Narrative continuation text

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `ensure_scene_anchor(beat_context) -> scene_anchor_pack|null`
Inputs:
- beat_context

Behavior:
- If no anchor exists for current scene:
  - generate a scene_anchor_pack using ledger evidence.
- If anchor exists and is valid:
  - return null (no action).
- Scene anchors are sent once and cached.

### 5.2 `check_and_rehydrate(beat_context, token_budget_state) -> rehydration_pack|null`
Inputs:
- beat_context
- token_budget_state (mechanical indicator)

Behavior:
- If token budget below threshold AND at beat boundary:
  - generate rehydration_pack.
- If not at beat boundary:
  - MUST NOT rehydrate.
- If generation fails:
  - MUST retry until successful.
- Rehydration must be atomic.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 5 MAY call:
- ENGINE 8 (Retrieval) to fetch:
  - ledger excerpts for anchor construction.
- ENGINE 6 (Capsules) to fetch:
  - relevant capsule packs.
- ENGINE 4 (Knowledge Surface) indirectly via Engine 8 constraints.

Engine 5 MUST NOT call:
- ENGINE 9 (LLM Writer) for narrative generation.
- ENGINE 12 (Projection)
- ENGINE 0 (Ledger) directly
- ENGINE 3 (Time)
- ENGINE 2 (Beat) except via boundary signals.

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 5 MAY read:
- cached scene anchors
- token budget state
- capsule packs
- retrieval result packs

Engine 5 MAY write:
- scene anchor cache
- rehydration cache

Engine 5 MUST NOT write:
- ledger entries
- time state
- capsule authority data
- any data treated as world truth

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 5 MUST NEVER:
- Mention rehydration, context limits, or memory in text.
- Introduce new events or facts.
- Advance time.
- Change physical configuration.
- Smooth contradictions.
- Insert narrative direction (“later”, “suddenly”, “meanwhile”).

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If rehydration fails:
- MUST retry.
- MUST NOT proceed with beat.

If anchor generation fails:
- MUST fail explicitly.
- MUST NOT produce partial anchors.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 5 SUBJECT)

Engine 5 MUST pass:

T1. Rehydration only at beat boundaries.
T2. Rehydration invisible in projection.
T3. Anchor generated only once per scene unless invalidated.
T4. No new facts introduced.
T5. Physical continuity replay always present.
T6. Failure blocks progression.

----------------------------------------------------------------------

END OF ENGINE 5 INTERFACE