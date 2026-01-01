# /engines/ENGINE_9_LLM_WRITER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 9
ENGINE NAME: LLM WRITER ENGINE (PROPOSAL-ONLY)

This file defines the ONLY permitted boundary for Engine 9.
Engine 9 is allowed to *propose* text.
It is never allowed to *decide* reality.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 9 exists to generate **proposals**, not facts.

In this system:
- the LLM does not own truth,
- the LLM does not own time,
- the LLM does not own continuity,
- the LLM does not own knowledge boundaries.

Engine 9 may:
- propose write bundles,
- propose silence,
- ask questions via tools.

Engine 9 may NOT:
- commit reality,
- bypass constraints,
- act without supervision.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 9 exclusively owns:

1. Proposal generation
- Proposing zero or more WriteEntry objects bundled as a WriteBundle.
- Proposing explicit no-write outcomes.

2. Natural language generation
- Producing candidate VOICE and PEOPLE text.
- Producing no USER text (USER text comes verbatim from operator).

3. Tool question formulation
- Emitting ToolRequest objects when evidence is required.

Engine 9 is the ONLY engine allowed to generate natural language content beyond anchoring.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 9 does NOT own:

- Reality commits (Engine 0).
- Write acceptance or rejection (Engine 10).
- Time advancement (Engine 3).
- Beat boundaries (Engine 2).
- Knowledge boundaries (Engine 4).
- Retrieval execution (Engine 8).
- Tool validation (Engine 7).
- Scene anchoring or rehydration (Engine 5).
- Rendering or UI layout (Engine 12).

Engine 9 writes drafts. Others decide.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 9 accepts ONLY:

A) Beat context
- From Engine 2.
- Includes invocation envelope and beat_id.

B) Scene anchor pack (optional)
- `/contracts/scene_anchor_pack.md`

C) Rehydration pack (optional)
- `/contracts/rehydration_pack.md`

D) Capsule packs (optional)
- `/contracts/capsule_pack.md`

E) Retrieval result packs (optional)
- `/contracts/retrieval_result_pack.md`

Engine 9 MUST NOT receive raw ledger access.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 9 emits ONLY:

A) `/contracts/write_bundle.md`
- Proposed write bundle (wrote=true or wrote=false).

B) `/contracts/tool_request.md`
- Tool requests when evidence is required.

Engine 9 MUST NOT emit:
- WriteEntry alone (must be bundled)
- ProjectionOutput
- RetrievalResultPack
- CapsulePack
- SceneAnchorPack

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `propose(beat_context, context_materials) -> proposal`
Inputs:
- beat_context
- context_materials (anchors, capsules, retrieval results)

Behavior:
- Generate ONE of:
  - a proposed WriteBundle (wrote=true),
  - an explicit no-write bundle (wrote=false),
  - one or more ToolRequest objects (if more evidence is required).
- Must respect all known constraints.
- Must not assume missing facts.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 9 MAY call:
- ENGINE 7 (Tool Request Engine) to submit ToolRequest objects.

Engine 9 MUST NOT call:
- ENGINE 8 (Retrieval) directly
- ENGINE 6 (Capsules)
- ENGINE 5 (Rehydration)
- ENGINE 12 (Projection)
- ENGINE 3 (Time)
- ENGINE 0 (Ledger)

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 9 MAY read:
- provided context materials only (anchors, capsules, retrieval packs)

Engine 9 MAY write:
- nothing persistent
- proposals only

Engine 9 MUST NOT read:
- ledger storage
- caches
- private entries outside provided packs

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 9 MUST NEVER:
- Commit reality directly.
- Invent past events.
- Skip time (“later that day”).
- Resolve contradictions.
- Force responses.
- Assume consent or intention.
- Bypass tool usage to hallucinate knowledge.
- Leak private knowledge into public text.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If Engine 9 cannot propose safely:
- MUST propose a no-write outcome.
- MUST NOT fabricate content.

If tool limits are exceeded:
- MUST stop proposing tool requests.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 9 SUBJECT)

Engine 9 MUST pass:

T1. No ledger access.
T2. Proposals only, no commits.
T3. Can return explicit silence.
T4. Tool requests routed through Engine 7.
T5. No knowledge leakage.
T6. No narrative shortcuts.

----------------------------------------------------------------------

END OF ENGINE 9 INTERFACE