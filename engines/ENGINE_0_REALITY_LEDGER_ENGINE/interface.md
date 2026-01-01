# /engines/ENGINE_0_REALITY_LEDGER_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 0
ENGINE NAME: REALITY LEDGER ENGINE (ONTOLOGICAL AUTHORITY)

This file defines the ONLY permitted boundary for Engine 0.
Any runtime component that reads/writes reality outside this interface is invalid.

----------------------------------------------------------------------

## 0) PURPOSE

Define what exists and what changes, and nothing else.

Engine 0 is the ontological authority:
- Reality exists only as written text committed to the ledger.
- Reality changes only via atomic bundle commits.
- Past reality is never edited.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 0 exclusively owns:

1. Ontology enforcement
- Only written text exists as reality.
- If it is not written into the ledger, it does not exist.

2. Append-only invariant
- No updates, no deletes, no in-place edits.

3. Atomic bundle commits
- Reality changes only through an all-or-nothing bundle.

4. Idempotency outcome persistence (storage side)
- Same invocation (same request_id) must not create duplicate reality.
- Replay returns the identical committed outcome.

5. Attribution metadata (non-semantic)
- Who authored an entry (explicit author identity + class).

6. Ordering / timestamps (non-semantic ordering metadata)
- Stores created_at_world and ledger order.

7. Visibility metadata (non-semantic boundary data)
- Public vs private classification and any visibility scoping metadata required.

Engine 0 is the ONLY owner of these properties. No other engine may re-implement them.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 0 does NOT own:

- Semantic interpretation of text.
- Narrative smoothing or contradiction resolution.
- Relevance or ranking decisions.
- Knowledge gating decisions (it stores visibility metadata but does not decide “who knows”).
- Rendering rules or formatting.
- Capsule generation or summaries.
- Tool request logic.
- Time logic (it stores created_at_world, but Engine 3 defines time).

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 0 accepts inputs ONLY in these contract shapes:

A) `/contracts/write_bundle.md`
- A proposed bundle of WriteEntry objects, to be committed atomically.

B) `/contracts/invocation_envelope.md`
- ONLY for idempotency linkage and audit correlation (request_id + invoker/operator identity).
- Engine 0 MUST NOT interpret any operator text content here as “world state” unless it arrives inside a WriteEntry to be committed.

Engine 0 MUST reject any input that is not contract-valid.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 0 emits outputs ONLY in these contract shapes:

A) Commit result (bundle + entries) expressed as:
- `/contracts/write_bundle.md` (with assigned bundle_id, entry_id for all entries)
- `/contracts/write_entry.md` (for each committed entry, with assigned IDs)

B) Read results for other engines:
- When returning entries, Engine 0 returns canonical WriteEntry shapes (write_entry.md).
- When returning bundles, Engine 0 returns canonical WriteBundle shapes (write_bundle.md).

Engine 0 MUST NOT emit derived summaries, paraphrases, or fabricated excerpts.

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `commit_bundle(bundle, invocation_envelope) -> committed_bundle_or_idempotent_replay`
Inputs:
- bundle: WriteBundle (contract-valid)
- invocation_envelope: InvocationEnvelope (contract-valid)

Required behavior:
- Atomic commit: all-or-nothing.
- If request_id already committed:
  - return the previously committed bundle + entries EXACTLY (idempotent replay).
  - do not create new rows.
- Assign bundle_id and entry_id values on first commit only.
- Persist linkage: request_id → committed outcome identity.

Rejection:
- Engine 0 itself MUST NOT perform semantic validation.
- Engine 0 may reject only for structural reasons or storage constraints, such as:
  - contract invalid
  - missing request_id
  - bundle wrote=true but entries empty (structural violation)
  - any entry missing required structural fields
  - storage failure

### 5.2 `get_entries_by_ids(entry_ids[]) -> WriteEntry[]`
- Returns the exact stored entries.
- No transformation.
- Preserves ordering as requested or returns in ledger order (must be explicit in implementation docs; default ledger order).

### 5.3 `get_entries_by_time_range(from, to, visibility_filter) -> WriteEntry[]`
- Mechanical filtering by time ordering metadata.
- visibility_filter is metadata-based only (PUBLIC/PRIVATE and visibility scope), not “who knows”.
- No relevance ranking.

### 5.4 `get_bundle_by_id(bundle_id) -> WriteBundle`
- Returns stored bundle with entries.

### 5.5 `get_committed_outcome_by_request_id(request_id) -> WriteBundle|null`
- Returns previously committed outcome for idempotency replay.
- Returns null if never committed.

No other operations are permitted. Any additional access path is invalid.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 0 is intentionally minimal.

Engine 0 MAY call:
- Storage infrastructure primitives (Engine 11) only:
  - persistent database access
  - transaction boundaries
  - connection handling
  - backups are infrastructure-level, not engine-level logic

Engine 0 MUST NOT call:
- Engine 9 (LLM Writer)
- Engine 8 (Retrieval)
- Engine 7 (Tool Requests)
- Engine 6 (Capsules)
- Engine 12 (Projection/Rendering)
- Engine 5 (Rehydration)
- Engine 3 (Time logic)
- Any “orchestrator intelligence” component

Engine 0 does not “ask questions.” It records and returns.

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 0 MAY read/write ONLY its own ledger storage:
- request table (request_id, invoker_id, outcome hash/id)
- bundle table
- entry table
- any strictly mechanical indexes

Engine 0 MUST NOT read:
- derived summaries store (if separate)
- capsule cache (Redis)
- vector index (Qdrant)
- prompt packs
- UI state
- any “world state” store (because there is no hidden world state)

Engine 0 MUST NOT write:
- anything outside the ledger tables
- cache entries that are treated as authority

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 0 MUST NEVER:
- Infer facts.
- Resolve contradictions.
- Merge entries into summaries.
- Reorder reality for narrative coherence.
- Edit or delete prior entries.
- Perform “repair” writes to fix continuity.
- Add time skips (“later…”) as implicit mechanism.
- Create hidden state (meters, counters, stats) representing world state.
- Treat storage as knowledge (it stores, it does not decide who knows).

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If Engine 0 cannot commit:
- It MUST fail explicitly (error) rather than fabricate success.
- It MUST not partially commit.
- It MUST not proceed to subsequent engines as if committed.

If Engine 0 cannot read:
- It MUST fail explicitly (error).
- It MUST not return invented placeholders.

Idempotency conflict:
- If request_id exists but stored outcome cannot be loaded:
  - explicit failure is required (do not “recompute”).

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 0 SUBJECT)

Engine 0 MUST pass these black-box contract tests:

T0. Append-only
- Attempt update/delete → rejected.

T1. Atomicity
- Simulate storage failure mid-bundle → no entries committed.

T2. Idempotency exact replay
- Commit bundle with request_id X, then invoke again with X → identical output; no new rows.

T3. No inference
- Provide incomplete/contradictory entries → stored as-is; no “fix-up” writes.

T4. Visibility metadata preserved
- PUBLIC/PRIVATE fields stored and returned exactly.

T5. Ordering preserved
- created_at_world + ledger ordering stable and reproducible.

----------------------------------------------------------------------

END OF ENGINE 0 INTERFACE