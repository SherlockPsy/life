# /engines/ENGINE_4_KNOWLEDGE_SURFACE_AND_BOUNDARY_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 4
ENGINE NAME: KNOWLEDGE SURFACE & BOUNDARY ENGINE

This file defines the ONLY permitted boundary for Engine 4.
Engine 4 defines what information is *visible* to whom.
It does not create knowledge, it enforces boundaries.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 4 exists to enforce **epistemic integrity**.

In this system:
- Storage is not knowledge.
- Retrieval is not permission.
- Visibility is explicit, mechanical, and enforced.

Engine 4 ensures that:
- no engine sees more than it is allowed to see,
- no private knowledge leaks into public projection,
- no agent gains omniscience by accident or convenience.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 4 exclusively owns:

1. Knowledge boundary definitions
- What each actor (George, Rebecca, WORLD, SYSTEM) is allowed to know.
- Mapping identities to knowledge views.

2. Visibility enforcement
- Enforcing PUBLIC vs PRIVATE visibility metadata on reads.
- Ensuring private entries are never exposed outside allowed views.

3. Knowledge surface construction
- Defining which ledger entries are eligible for retrieval per actor.
- Filtering is mechanical, not semantic.

4. Prevention of omniscience
- Ensuring no engine (including LLM Writer) has access to “everything”.

Engine 4 is the ONLY engine allowed to decide “who can see what”.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 4 does NOT own:

- Storage of reality (Engine 0).
- Retrieval mechanics or ranking (Engine 8).
- Tool invocation logic (Engine 7).
- Content generation (Engine 9).
- Time or beats (Engines 2, 3).
- Rendering or UI formatting (Engine 12).
- Capsule construction (Engine 6).

Engine 4 enforces boundaries; others operate within them.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 4 accepts ONLY:

A) Knowledge view requests
- Internal mechanical requests specifying:
  - actor_id
  - intended purpose (retrieval, capsule build, projection)
- Actor identity MUST be explicit.

B) Visibility metadata from ledger entries
- Supplied by Engine 0 as part of WriteEntry.

Engine 4 MUST reject any request without explicit actor identity.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 4 emits ONLY:

A) Knowledge surface descriptors (internal)
- Lists of entry_ids that are visible to the specified actor.
- These are mechanical filters, not content.

B) Visibility-approved read instructions
- Passed to Engine 8 (Retrieval) as constraints.

Engine 4 MUST NOT emit:
- Text excerpts
- Summaries
- Narrative content
- ProjectionOutput

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `get_knowledge_surface(actor_id, purpose) -> knowledge_surface`
Inputs:
- actor_id (e.g., "GEORGE", "REBECCA", "WORLD")
- purpose (e.g., "RETRIEVAL", "CAPSULE", "PROJECTION")

Behavior:
- Determine which ledger entries are visible to actor_id.
- Apply visibility rules:
  - PUBLIC entries always included.
  - PRIVATE entries included only if actor_id is explicitly permitted.
- Return a mechanical descriptor of allowed entry_ids.

### 5.2 `assert_visibility(actor_id, entry_id) -> boolean`
- Returns true if actor_id is allowed to see entry_id.
- Used as a guard by other engines.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 4 MAY call:
- ENGINE 0 (Reality Ledger) to:
  - fetch visibility metadata for entries
  - enumerate candidate entries

Engine 4 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 7 (Tool Requests)
- ENGINE 8 (Retrieval) directly for content
- ENGINE 6 (Capsules)
- ENGINE 12 (Projection)
- ENGINE 5 (Rehydration)

Engine 4 filters. It does not fetch or interpret.

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 4 MAY read:
- visibility metadata from ledger entries
- knowledge boundary configuration (static rules)

Engine 4 MAY write:
- nothing that persists as world state

Engine 4 MUST NOT write:
- ledger entries
- cache entries treated as authority
- capsule content
- summaries

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 4 MUST NEVER:
- Grant access because it is “convenient”.
- Infer that an actor “should know” something.
- Leak private entries into public projection.
- Allow the LLM Writer to bypass boundaries.
- Merge private and public knowledge views.
- Create implicit knowledge through omission or aggregation.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If actor_id is missing or unknown:
- MUST fail explicitly.
- MUST NOT default to full access.

If visibility metadata is inconsistent:
- MUST fail explicitly.
- MUST NOT guess.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 4 SUBJECT)

Engine 4 MUST pass:

T1. Public entries visible to all actors.
T2. Private entries visible only to permitted actors.
T3. LLM Writer cannot access entries outside its knowledge view.
T4. Projection does not leak private entries.
T5. Knowledge surface is stable and reproducible.
T6. No “global omniscience” path exists.

----------------------------------------------------------------------

END OF ENGINE 4 INTERFACE