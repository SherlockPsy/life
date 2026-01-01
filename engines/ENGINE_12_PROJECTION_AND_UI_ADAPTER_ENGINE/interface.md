# /engines/ENGINE_12_PROJECTION_AND_UI_ADAPTER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 12
ENGINE NAME: PROJECTION & UI ADAPTER ENGINE

This file defines the ONLY permitted boundary for Engine 12.
Engine 12 is responsible for translating committed reality into something a human can see.
It renders. It does not invent.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 12 exists to produce **Projection Output** for the UI.

Projection:
- is a view, not reality,
- is derived strictly from committed ledger entries,
- respects visibility boundaries,
- does not repair gaps or invent continuity.

Engine 12 makes reality visible without altering it.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 12 exclusively owns:

1. Projection assembly
- Building `/contracts/projection_output.md` objects.
- Assembling stream entries and pocket content.

2. Display-channel enforcement
- USER / VOICE / PEOPLE channel handling.
- Author label inclusion rules.

3. Cursor handling
- Managing stream cursors for incremental updates.
- Ensuring stable replay ordering.

4. UI-facing adaptation
- Adapting internal representations to UI-safe payloads.
- Nothing UI-facing bypasses this engine.

Engine 12 is the ONLY engine allowed to emit ProjectionOutput.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 12 does NOT own:

- Reality creation or storage (Engine 0).
- Time advancement (Engine 3).
- Beat logic (Engine 2).
- Knowledge boundary definitions (Engine 4).
- Retrieval (Engine 8).
- Capsule generation (Engine 6).
- Content generation (Engine 9).
- Scene anchoring or rehydration (Engine 5).

Engine 12 shows what is written. Nothing more.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 12 accepts ONLY:

A) Committed WriteEntries
- `/contracts/write_entry.md`
- Retrieved from Engine 0, already committed.

B) Visibility constraints
- From Engine 4.

C) Time and calendar views
- From Engine 3 (for pocket clock/calendar).

D) Cursor hints
- Opaque cursor tokens from UI.

Engine 12 MUST NOT accept uncommitted proposals.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 12 emits ONLY:

A) `/contracts/projection_output.md`
- Fully assembled projection payload.

Engine 12 MUST NOT emit:
- WriteEntry
- WriteBundle
- ToolRequest
- RetrievalResultPack
- CapsulePack

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `build_projection(request_id, cursor_before) -> projection_output`
Inputs:
- request_id (for idempotency linkage)
- cursor_before (optional)

Behavior:
- Fetch committed entries visible to operator (via Engine 4).
- Apply ordering rules.
- Assemble stream entries:
  - channel
  - author_label (only for PEOPLE)
  - text verbatim
- Assemble pocket:
  - clock from Engine 3
  - calendar from Engine 3
  - messages/calendar items only if explicitly present as written facts
- Produce cursor_after.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 12 MAY call:
- ENGINE 0 (Reality Ledger) to fetch committed entries.
- ENGINE 4 (Knowledge Surface) to filter visibility.
- ENGINE 3 (Time & Calendar) for pocket data.
- ENGINE 11 (Infrastructure) for transport/logging.

Engine 12 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 8 (Retrieval)
- ENGINE 7 (Tool Requests)
- ENGINE 6 (Capsules)
- ENGINE 5 (Rehydration)

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 12 MAY read:
- ledger entries
- visibility rules
- time/calendar views
- cursor metadata

Engine 12 MAY write:
- nothing persistent (projection is ephemeral)

Engine 12 MUST NOT write:
- ledger entries
- caches treated as authority
- UI state beyond cursors

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 12 MUST NEVER:
- Invent text.
- Insert connective narration.
- Collapse or summarize entries.
- Expose private entries.
- Modify wording.
- Infer actions or emotions.
- Display system/meta information.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If projection cannot be built:
- MUST fail explicitly.
- MUST NOT return partial projection.

If cursor is invalid:
- MUST reset to safe default or fail explicitly (policy-defined).

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 12 SUBJECT)

Engine 12 MUST pass:

T1. Projection text matches ledger exactly.
T2. Visibility enforced.
T3. Cursor-based incremental fetch works.
T4. Silence renders as empty stream.
T5. Pocket does not leak knowledge.
T6. No invented content.

----------------------------------------------------------------------

END OF ENGINE 12 INTERFACE