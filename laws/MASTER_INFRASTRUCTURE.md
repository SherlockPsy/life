# MASTER_INFRASTRUCTURE
## Storage, Deployment, and System Plumbing

Version: 6.0 (Constitutional Lock)
Status: AUTHORITATIVE

---

## PREAMBLE

This document defines the **technical substrate** of the system.

It does NOT define:
- cognition
- agency
- psychology
- behaviour
- realism
- pacing
- outcomes
- “what should happen”

Those are constitutional concerns handled elsewhere.

Infrastructure exists to **support**, not to decide.

---

## ARTICLE I — PRINCIPLES

### I.1 Infrastructure Is Dumb

Infrastructure:
- stores text
- retrieves text
- forwards text
- persists text

Infrastructure does not:
- interpret
- infer
- optimise
- simulate
- decide

If infrastructure begins to “understand”, the system is broken.

---

### I.2 Text Fidelity

All authoritative text:
- is stored verbatim
- is retrieved verbatim
- is forwarded verbatim

There is no rewriting layer.
There is no compression layer.
There is no semantic normalisation.

---

### I.3 Append-Only Reality

The authoritative record is append-only.

Infrastructure MUST NOT:
- mutate prior rows,
- “clean up” text,
- rewrite for readability,
- merge entries,
- replace history with summaries.

Corrections exist only as new rows.

---

## ARTICLE II — DATA STORES

### II.1 Authoritative Store (PostgreSQL)

PostgreSQL is the **authoritative ledger**.

It stores:
- Public Evidence (Recorder)
- Private / Unrendered Reality (private text)
- World Fact Seeds / World Facts (as text)
- Identity Documents
- System Configuration (non-behavioural)
- Invocation Events (as operational audit, not narrative)

It does NOT store:
- inferred state
- scores
- counters
- metrics
- derived psychology
- pacing variables
- “importance” labels

---

### II.2 Recorder Table (Conceptual)

The Recorder table is append-only.

Each row contains:
- sequential index (monotonic ordering key)
- timestamp (anchored to system time for ordering/audit; not a simulation engine)
- raw text content
- authorship attribution (participant / agent / world)
- visibility classification (renderable vs unrendered)
- invocation reference (linking a row to the invocation that permitted it)

No row is ever updated.
No row is ever deleted.

---

### II.3 System Time (Independent, Continuous)

Infrastructure maintains a system time coordinate that:
- advances continuously and monotonically,
- is independent of writing activity,
- is not aligned to OS wall-clock by default,
- is initialised explicitly at system start (or run start),
- is irreversible.

System time exists regardless of whether anything is written.

Infrastructure MUST NOT:
- pause time because nothing is written,
- advance time by narration,
- treat time advancement as an outcome engine.

System time is an independent number used for:
- timestamps,
- ordering,
- contextual reference when loaded into an invocation.

---

### II.4 “Last Written” Pointer (Operational Only)

Infrastructure may maintain a pointer referencing the last written Recorder row.

This pointer:
- exists for efficient streaming and polling,
- advances only when a new row is written,
- has no special narrative meaning.

This pointer MUST NOT be defined as “the present” in a way that overrides:
- the independent system time coordinate,
- the Constitution’s time rules,
- lived perception requirements.

---

### II.5 Atomic Bundles (Write Integrity)

A single invocation may produce multiple writes (public and/or private).

Infrastructure MUST support committing these writes as an atomic bundle:
- either all rows in the bundle are written, or none are,
- bundle ordering is preserved exactly as produced,
- each row is linked to the invocation reference.

Infrastructure MUST NOT:
- partially commit a bundle,
- reorder within a bundle,
- duplicate rows via retries.

Idempotency and bundling are integrity constraints, not behaviour logic.

---

## ARTICLE III — VECTOR STORE (QDRANT)

### III.1 Purpose

Qdrant exists solely to support **selective rereading**.

It is used for:
- retrieving relevant past text
- based on semantic similarity

It is NOT used for:
- memory compression
- summarisation into authority
- state inference
- behaviour shaping
- salience ranking as “importance”

---

### III.2 Indexing Rules

Only raw authoritative text blocks may be indexed.

No metadata labels that encode:
- emotion
- intent
- priority
- importance
- decay
- truth
- “thread IDs”

Text in equals text out.

---

### III.3 Retrieval Discipline

Retrieval:
- is mechanical
- is relevance-based
- asserts no correctness

Failure to retrieve is meaningful.
The system does not compensate by inventing missing context.

---

## ARTICLE IV — MODEL INVOCATION

### IV.1 Models Used

The system uses models as stateless services (names may change by implementation), including:
- a renderer model
- a reasoning/agent-writing model (if separated)

Models are invoked as:
- stateless services
- with explicit input
- producing explicit output

---

### IV.2 No Persistent Model State

Models:
- do not retain memory
- do not maintain continuity
- do not store state

All continuity lives in stored text.

---

### IV.3 Prompt Discipline (Critical)

Infrastructure MUST ensure that prompts contain:
- only text that is permitted to be loaded for that invocation,
- only text that exists in the authoritative record (or is being proposed to be written in that invocation),
- no injected labels that behave like hidden state,
- no inferred facts presented as if they were written.

Infrastructure MUST NOT enforce the false rule “if it wouldn’t appear on screen, it must not appear in the prompt”.

Written ≠ rendered.

Unrendered/private text is real and may be included in prompts when:
- it is authorised for that agent’s context,
- it is required for continuity of that agent,
- it is loaded as text, not as variables.

Infrastructure MUST NOT:
- leak another agent’s private text into a different agent’s prompt,
- collapse private text into behavioural meters,
- add “helpful” commentary about what should happen.

---

## ARTICLE V — STREAMING AND DEVICES

### V.1 Live Observation

Clients connect via:
- streaming (SSE or WebSocket)

They receive:
- newly written Recorder rows
- in order
- without buffering future content

---

### V.2 Cross-Device Continuity

Because:
- Recorder is authoritative,
- ordering keys are global,
- system time is global per active run,

Any device may disconnect and reconnect and see:
- the same accumulated reality
- the same ordering
- the same authoritative text

No session state exists on the client.

---

### V.3 Observation Is Passive

Client connection:
- does not trigger invocation
- does not advance time
- does not generate output
- does not cause writes

Watching is passive.

---

## ARTICLE VI — SECURITY AND ACCESS

### VI.1 Administrative Access

Administrative access may allow:
- inspection of Recorder
- inspection of Identity Documents
- inspection of World Fact Seeds / World Facts
- inspection of invocation logs (operational)

Administrative access MUST NOT:
- alter past evidence
- inject hidden state
- manipulate outcomes
- rewrite or “fix” contradictions

---

### VI.2 Separation of Concerns

Infrastructure enforces:
- access control
- rate limiting
- API boundaries
- integrity constraints (append-only, idempotency, atomic bundles)

It does NOT enforce:
- realism
- behaviour
- pacing
- narrative quality
- “correctness” of beliefs

---

## ARTICLE VII — FAILURE MODES (GUARDS)

Infrastructure MUST actively avoid:

- background jobs that simulate life
- cron-based advancement of reality
- implicit state creation
- caching that alters order
- retries that duplicate authoritative writes
- auto-healing that invents data

If infrastructure starts “helping”, it is wrong.

---

## FINAL RULE

Infrastructure exists to move text safely and preserve integrity.

Anything beyond that belongs elsewhere and is forbidden here.

---

END OF INFRASTRUCTURE SPEC