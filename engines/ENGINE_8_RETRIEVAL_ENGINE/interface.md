# /engines/ENGINE_8_RETRIEVAL_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 8
ENGINE NAME: RETRIEVAL ENGINE (EVIDENCE ACCESS)

This file defines the ONLY permitted boundary for Engine 8.
Engine 8 retrieves evidence from storage.
It does not decide meaning, relevance, or truth.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 8 exists to retrieve **ledger-backed evidence** in response to approved tool requests.

Retrieval in this system:
- returns verbatim text,
- preserves provenance,
- respects knowledge boundaries,
- does not summarize or interpret.

Engine 8 answers “what exists that matches this query,” not “what matters.”

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 8 exclusively owns:

1. Evidence retrieval mechanics
- Executing searches against ledger storage.
- Executing direct gets by entry_id or bundle_id.

2. Verbatim excerpt construction
- Returning exact substrings or full texts from ledger entries.
- Preserving original wording and ordering.

3. Provenance attachment
- Attaching entry_id, bundle_id, and created_at_world to every excerpt.

4. Mechanical ranking (if any)
- Ordering results by simple, non-semantic rules:
  - recency,
  - explicit query match,
  - deterministic index ordering.
- No “importance” or narrative ranking.

Engine 8 is the ONLY engine allowed to produce Retrieval Result Packs.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 8 does NOT own:

- Knowledge boundaries (Engine 4).
- Tool request validation (Engine 7).
- Content generation (Engine 9).
- Capsule assembly (Engine 6).
- Scene anchoring or rehydration (Engine 5).
- Rendering (Engine 12).
- Ledger authority (Engine 0).

Engine 8 fetches evidence; others decide how it is used.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 8 accepts ONLY:

A) Approved `/contracts/tool_request.md`
- Forwarded by Engine 7 after validation.

B) Knowledge surface constraints
- Provided by Engine 4 (explicit list or filter).

Engine 8 MUST reject any retrieval request not approved by Engine 7.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 8 emits ONLY:

A) `/contracts/retrieval_result_pack.md`
- With verbatim excerpts and provenance.

Engine 8 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- CapsulePack
- ToolRequest

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `execute_retrieval(tool_request, knowledge_surface) -> retrieval_result_pack`
Inputs:
- tool_request (validated)
- knowledge_surface (from Engine 4)

Behavior:
- Restrict search to entries visible in knowledge_surface.
- Apply mechanical constraints:
  - time_window
  - limit
  - person_id (if present)
- Retrieve matching ledger entries.
- Extract verbatim excerpts.
- Attach provenance.
- Set empty=true if no results.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 8 MAY call:
- ENGINE 0 (Reality Ledger) to:
  - fetch entries
  - enumerate candidate entry_ids
- ENGINE 11 (Infrastructure) for:
  - database queries
  - vector search (Qdrant), if used
  - cache access (Redis), if used

Engine 8 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 6 (Capsules)
- ENGINE 5 (Rehydration)
- ENGINE 12 (Projection)
- ENGINE 3 (Time)
- ENGINE 2 (Beat)

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 8 MAY read:
- ledger entries
- vector indexes (if present)
- cache layers (as acceleration only)

Engine 8 MAY write:
- retrieval caches (non-authoritative)

Engine 8 MUST NOT write:
- ledger entries
- summaries
- derived semantic state
- capsule content

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 8 MUST NEVER:
- Paraphrase or rewrite evidence.
- Summarize multiple entries into “what happened”.
- Infer motives, intent, or causality.
- Return entries outside knowledge surface.
- Hide provenance.
- Decide relevance beyond mechanical constraints.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If no matching entries:
- MUST return retrieval_result_pack with empty=true.

If ledger access fails:
- MUST fail explicitly.
- MUST NOT fabricate results.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 8 SUBJECT)

Engine 8 MUST pass:

T1. Verbatim excerpts match ledger text exactly.
T2. Provenance always attached.
T3. Knowledge boundary enforced.
T4. Empty result handled explicitly.
T5. Deterministic ordering for identical queries.
T6. No summarization occurs.

----------------------------------------------------------------------

END OF ENGINE 8 INTERFACE