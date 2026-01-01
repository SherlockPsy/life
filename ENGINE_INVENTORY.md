# ENGINE INVENTORY v4 — FORENSICALLY CORRECTED & SPEC-FAITHFUL
# STATUS: CANDIDATE FOR LOCKING
# AUTHORITATIVE BASIS:
# - NON_NEGOTIABLE_SYSTEM_DECISIONS.md (PRIMARY AUTHORITY)
# - MASTER_CONSTITUTION.md
# - MASTER_RUNTIME.md
# - MASTER_INFRASTRUCTURE.md
# - MASTER_WORLD.md
# - SYSTEM_PROHIBITIONS.md (SECONDARY; NEVER OVERRIDES PRIMARY)
#
# DESIGN GOAL:
# This inventory MUST be traceable back to the locked documents.
# Every major constraint, mechanic, and invariant MUST have:
#   - a clear owner
#   - a clear boundary
#   - no duplication
#   - no silent “handled elsewhere”
#
# PHILOSOPHY:
# - Text-only reality
# - Mechanically stupid system
# - Semantic work lives in LLMs, constrained by context and contracts
# - No labels, meters, state machines, planners, or directors


⸻

DEFINITIONS (LOCKED TERMS USED CONSISTENTLY)

Operator:
  The external real human operating the system (George).
  The operator is NOT the LLM’s user.

Invoker:
  A non-person system identity presented to the LLM as its “user” to avoid user-favoritism.

Participant:
  A person inside the world (George-in-world, Rebecca, others).

Invocation:
  A single opportunity to attempt writing.
  Invocation grants permission, not obligation.

Beat:
  A purely mechanical processing boundary.
  Beats are NOT turns and NOT narrative units.

Ledger:
  The append-only authoritative record of written reality.

Bundle:
  One or more write entries committed atomically.

Scene Anchor:
  A text-only grounding description of the currently lived scene.

Rehydration Pack:
  A text-only regenerated view used near context exhaustion.

Capsule:
  A per-person text bundle supporting identity continuity and recall.


⸻

ENGINE 0 — REALITY LEDGER ENGINE (ONTOLOGICAL AUTHORITY)

PURPOSE

Define what exists and what changes, and nothing else.

OWNS (EXCLUSIVE)
	•	Ontology: only written text exists
	•	Append-only invariant
	•	Atomic bundle commits
	•	Idempotency (same invocation → same reality)
	•	Attribution metadata
	•	Ordering / timestamps
	•	Visibility metadata (non-semantic boundary data)

EXPLICITLY COVERS LOCKED FILE SECTIONS
	•	NON_NEGOTIABLE_SYSTEM_DECISIONS: ontology, record, irreversibility
	•	MASTER_CONSTITUTION: authoritative record, no retroactive change

MUST NEVER DO
	•	Infer facts
	•	Resolve contradictions
	•	Summarise into authority
	•	Delete or mutate past text
	•	Reorder events
	•	Convert text into hidden state

INPUTS
	•	Accepted write bundles
	•	Invocation identity
	•	Visibility metadata

OUTPUTS
	•	Committed ledger entries
	•	Explicit failure on integrity violation
	•	Verbatim excerpts for retrieval

⸻

ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE

PURPOSE

Bind each invocation to a stable, replay-safe execution frame.

OWNS
	•	Invocation envelope
	•	Request identity
	•	Idempotency keying
	•	Replay detection
	•	Invocation lifecycle start/end

COVERS
	•	NON_NEGOTIABLE_SYSTEM_DECISIONS: invocation ≠ obligation
	•	MASTER_RUNTIME: idempotency guarantees

MUST NEVER DO
	•	Interpret operator intent
	•	Decide outcomes
	•	Generate narrative

⸻

ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR

PURPOSE

Provide mechanical opportunity surfacing without director logic.

OWNS
	•	Beat boundaries
	•	Scheduled opportunity surfacing (calendar/milestones)
	•	Ensuring:
	•	rehydration only at beat boundaries
	•	no mid-action context surgery

CRITICAL CORRECTION (FROM AUDIT)

This engine explicitly owns:
	•	Scheduled events / milestones
	•	Calendar-aligned opportunities

These were locked in NON_NEGOTIABLE_SYSTEM_DECISIONS and were previously under-specified.

MUST NEVER DO
	•	Decide what happens at an opportunity
	•	Create events for pacing
	•	Interpret meaning of schedules

⸻

ENGINE 3 — TIME & CALENDAR ENGINE

PURPOSE

Maintain objective time representation, not story time.

OWNS
	•	Time format
	•	Date arithmetic
	•	Calendars
	•	Clock progression
	•	Time stamping
	•	Explicit time-advance declarations

COVERS
	•	NON_NEGOTIABLE_SYSTEM_DECISIONS: time format, calendar, arithmetic
	•	MASTER_CONSTITUTION: time exists independently

MUST NEVER DO
	•	Force outcomes
	•	Skip time narratively
	•	Use time as plot device

⸻

ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE

PURPOSE

Enforce the separation between:
	•	what exists,
	•	what is stored,
	•	what is knowable,
	•	what is known by whom.

OWNS
	•	Knowledge surface model
	•	Visibility boundaries
	•	Ignorance preservation
	•	Storage ≠ knowledge invariant

COVERS (EXPLICITLY)
	•	NON_NEGOTIABLE_SYSTEM_DECISIONS Section 4 (Knowledge & memory)
	•	MASTER_CONSTITUTION knowledge rules

MUST NEVER DO
	•	Leak private text
	•	Assume availability implies knowledge
	•	Fill gaps with inference

⸻

ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE

PURPOSE

Maintain continuous lived context without resets or meta.

OWNS
	•	Scene anchor packs
	•	Rehydration packs
	•	Beat-boundary-only rehydration
	•	Atomic rehydration
	•	Physical continuity replay

COVERS
	•	Scene continuity
	•	Hydration invisibility
	•	Context exhaustion handling

MUST NEVER DO
	•	Invent scene facts
	•	Reset scenes
	•	Insert “later…” shortcuts

⸻

ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)

PURPOSE

Support identity, personality, mood, autonomy, and personal history as text evidence.

CRITICAL CORRECTION

This engine explicitly owns:
	•	personality continuity
	•	mood/emotion persistence
	•	parallel personal stories

All as textual evidence, not meters or hidden state.

OWNS
	•	Capsule structure (text-only)
	•	Capsule derivation rules
	•	Capsule retrieval
	•	Capsule caching (non-authoritative)

COVERS
	•	NON_NEGOTIABLE_SYSTEM_DECISIONS Section 1 (people, identity, autonomy)

MUST NEVER DO
	•	Invent biography
	•	Drift identity
	•	Collapse people into archetypes
	•	Introduce numeric mood/state variables

⸻

ENGINE 7 — TOOL-REQUEST PROTOCOL ENGINE (LLM → SYSTEM)

PURPOSE

Allow LLMs to ask questions without granting authority.

OWNS
	•	Tool request schemas
	•	Allowed request classes
	•	Routing to retrieval

MUST NEVER DO
	•	Write reality
	•	Decide relevance
	•	Allow unrestricted browsing

⸻

ENGINE 8 — RETRIEVAL ENGINE (LEDGER-BACKED)

PURPOSE

Return verbatim excerpts from the ledger.

OWNS
	•	Semantic candidate selection (Qdrant)
	•	Authoritative excerpt extraction
	•	Visibility enforcement

MUST NEVER DO
	•	Return paraphrases as truth
	•	Fabricate missing data
	•	Reorder timelines

⸻

ENGINE 9 — LLM WRITER ENGINE

PURPOSE

Produce proposed writes or silence.

OWNS
	•	Writing under constraints
	•	Emitting tool requests
	•	Choosing silence

MUST NEVER DO
	•	Treat operator as user
	•	Invent facts
	•	Smooth contradictions
	•	Direct narrative

⸻

ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE

PURPOSE

Gate reality changes structurally, not semantically.

OWNS
	•	Structural validation
	•	Atomicity enforcement
	•	Idempotency enforcement
	•	Explicit rejection

⸻

ENGINE 11 — DERIVED TEXT ENGINE (NON-AUTHORITATIVE)

PURPOSE

Generate summaries, indexes, and rehydration aids without ontological power.

OWNS
	•	Derived summaries
	•	Provenance tracking
	•	Non-authoritative marking

⸻

ENGINE 12 — PROJECTION / RENDERING ENGINE

PURPOSE

Display reality without changing it.

OWNS
	•	View selection
	•	Knowledge-bound projection

⸻

ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)

PURPOSE

Enforce anti-director, anti-user-centric posture via tests and CI.

CRITICAL CORRECTION

This is explicitly NOT a runtime engine.
It is enforcement infrastructure only.

⸻

ENGINE 14 — CONTRACT TEST ENGINE

PURPOSE

Guarantee swappability and prevent regression.

OWNS
	•	Black-box contract tests
	•	Invariant enforcement
	•	Failure surfacing

⸻

COMPLETENESS CHECK

✔ Ontology
✔ Time & calendar
✔ Scheduled events
✔ Knowledge surfaces
✔ Identity & mood continuity
✔ Scene & rehydration
✔ Tool-based retrieval
✔ Capsules
✔ Non-directorial posture
✔ No hidden state
✔ No user-centrism
✔ No simulation
✔ Explicit failure over invention

⸻

END — ENGINE INVENTORY v4

