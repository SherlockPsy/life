# /engines/ENGINE_11_INFRASTRUCTURE_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 11
ENGINE NAME: INFRASTRUCTURE ENGINE (MECHANICAL SUPPORT)

This file defines the ONLY permitted boundary for Engine 11.
Engine 11 provides mechanical infrastructure services.
It is explicitly non-semantic and non-authoritative.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 11 exists to provide **boring, reliable plumbing**.

It supports other engines with:
- storage,
- caching,
- indexing,
- transport,
- logging,
- metrics.

Engine 11 does not know about reality, narrative, people, or meaning.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 11 exclusively owns:

1. Persistent storage primitives
- Database connections.
- Transactions.
- Schema migrations.
- Backups and restores.

2. Cache primitives
- Redis connections.
- Cache eviction policies.
- TTL handling.

3. Search and indexing infrastructure
- Vector indexes (Qdrant).
- Full-text search indexes.
- Index refresh mechanics.

4. Transport and runtime mechanics
- HTTP servers.
- Message queues (if any).
- Serialization/deserialization.

Engine 11 is the ONLY engine allowed to interact directly with infrastructure services.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 11 does NOT own:

- Reality or ledger semantics (Engine 0).
- Time logic (Engine 3).
- Beat coordination (Engine 2).
- Knowledge boundaries (Engine 4).
- Retrieval logic (Engine 8).
- Content generation (Engine 9).
- Rendering or UI (Engine 12).
- Any constitutional rule enforcement.

Engine 11 supports; it never decides.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 11 accepts ONLY:

A) Explicit infrastructure requests from other engines
- Storage read/write requests.
- Cache get/set requests.
- Index query requests.

All requests must come from an engine context.
No direct UI or LLM access is permitted.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 11 emits ONLY:

- Raw data results (records, rows, blobs).
- Success/failure signals.
- No domain-specific objects.

Engine 11 MUST NOT emit:
- WriteEntry
- WriteBundle
- ProjectionOutput
- RetrievalResultPack
- CapsulePack

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `execute_storage_operation(op)`
- Executes database operations requested by engines.
- Must respect transactional boundaries defined by caller.

### 5.2 `execute_cache_operation(op)`
- Executes cache get/set/delete.
- Cache is never authoritative.

### 5.3 `execute_search_operation(op)`
- Executes vector or text search.
- Returns raw results only.

### 5.4 `emit_log(event)`
- Emits logs and metrics.
- Logs are not world state.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 11 MAY call:
- External infrastructure services only:
  - databases
  - Redis
  - Qdrant
  - OS/network primitives

Engine 11 MUST NOT call:
- Any other engine
- LLMs
- UI renderers

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 11 MAY read/write:
- databases
- caches
- indexes
- logs

Engine 11 MUST NOT read/write:
- world semantics
- narrative text
- capsule meaning
- constitutional rules

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 11 MUST NEVER:
- Interpret stored data.
- Apply business logic.
- Enforce constitutional rules.
- Generate text.
- Modify payloads beyond serialization.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If infrastructure fails:
- MUST surface explicit error.
- MUST NOT fabricate results.
- MUST NOT retry silently unless explicitly instructed.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 11 SUBJECT)

Engine 11 MUST pass:

T1. No domain logic present.
T2. Cache never treated as authoritative.
T3. Storage failures surface correctly.
T4. Search results returned raw.
T5. No cross-engine calls.

----------------------------------------------------------------------

END OF ENGINE 11 INTERFACE