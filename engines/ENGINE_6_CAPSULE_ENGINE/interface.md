# /engines/ENGINE_6_CAPSULE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 6
ENGINE NAME: CAPSULE ENGINE (PER-PERSON CONTINUITY)

This file defines the ONLY permitted boundary for Engine 6.
Engine 6 exists to provide *per-person continuity views* without becoming an authority.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 6 exists to assemble **Capsule Packs**.

A capsule:
- is a regeneratable view,
- is NOT authoritative reality,
- is derived strictly from ledger-backed evidence,
- exists to help other engines maintain continuity and behavioral grounding.

Capsules support consistency.
They do not define truth.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 6 exclusively owns:

1. Capsule pack construction
- Creation of `/contracts/capsule_pack.md` objects.
- Sectioned, natural-language views per person.

2. Capsule provenance enforcement
- Every section MUST declare which ledger entries it was derived from.
- SOURCE_EXCERPTS must be verbatim.

3. Capsule regeneration logic
- Capsules may be rebuilt at any time from ledger evidence.
- Capsules are disposable and replaceable.

Engine 6 is the ONLY engine allowed to produce capsule packs.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 6 does NOT own:

- Reality storage (Engine 0).
- Knowledge boundaries (Engine 4).
- Retrieval mechanics (Engine 8).
- Tool invocation logic (Engine 7).
- Scene anchoring or rehydration (Engine 5).
- Content generation beyond capsule assembly (Engine 9).
- Rendering or UI formatting (Engine 12).
- Personality or behavior rules as law (those live in documents, not capsules).

Engine 6 assembles views. It does not decide behavior.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 6 accepts ONLY:

A) Person identity
- person_id (e.g., "REBECCA", "GEORGE")

B) Retrieval result packs
- `/contracts/retrieval_result_pack.md`
- Already filtered by Engine 4 knowledge surface.

C) Capsule build request (internal)
- Mechanical signal specifying:
  - person_id
  - purpose (e.g., CONTINUITY, REHYDRATION_SUPPORT)

Engine 6 MUST reject any request without explicit person_id.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 6 emits ONLY:

A) `/contracts/capsule_pack.md`
- Complete capsule pack for the specified person.

Engine 6 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- ToolRequest

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `build_capsule(person_id, purpose) -> capsule_pack`
Inputs:
- person_id
- purpose (non-semantic label; affects section inclusion rules only)

Behavior:
- Fetch eligible ledger excerpts via Engine 8 (already filtered).
- Construct SOURCE_EXCERPTS section using verbatim excerpts.
- Optionally construct OPTIONAL_DERIVED section:
  - clearly labeled non-authoritative,
  - derived strictly from cited excerpts,
  - no new facts introduced.
- Attach provenance to every section.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 6 MAY call:
- ENGINE 8 (Retrieval) to obtain ledger excerpts.
- ENGINE 4 (Knowledge Surface) indirectly through Engine 8 constraints.

Engine 6 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 7 (Tool Requests) directly
- ENGINE 0 (Ledger)
- ENGINE 12 (Projection)
- ENGINE 5 (Rehydration)
- ENGINE 3 (Time)
- ENGINE 2 (Beat)

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 6 MAY read:
- retrieval result packs
- static personality documents (as reference, not authority)
- capsule cache (if present)

Engine 6 MAY write:
- capsule cache entries (non-authoritative, replaceable)

Engine 6 MUST NOT write:
- ledger entries
- authoritative state
- hidden semantic state

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 6 MUST NEVER:
- Invent memories, motives, feelings, or facts.
- Resolve contradictions.
- Store numeric stats, meters, or labels as “state”.
- Override ledger evidence.
- Treat capsules as truth.
- Leak private knowledge across boundaries.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If no eligible excerpts exist:
- MUST still return a capsule with empty SOURCE_EXCERPTS.
- MUST NOT fabricate content.

If provenance cannot be attached:
- MUST fail explicitly.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 6 SUBJECT)

Engine 6 MUST pass:

T1. SOURCE_EXCERPTS are verbatim ledger text.
T2. OPTIONAL_DERIVED is clearly non-authoritative.
T3. No new facts introduced.
T4. Capsule regeneration produces consistent output for same inputs.
T5. Capsule never leaks private entries.
T6. Capsule removal does not break system operation.

----------------------------------------------------------------------

END OF ENGINE 6 INTERFACE