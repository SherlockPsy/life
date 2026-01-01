# /engines/ENGINE_10_WRITE_ACCEPTANCE_AND_INTEGRITY_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 10
ENGINE NAME: WRITE ACCEPTANCE & INTEGRITY ENGINE

This file defines the ONLY permitted boundary for Engine 10.
Engine 10 is the constitutional firewall between proposals and reality.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 10 exists to decide **whether a proposed write is allowed to become reality**.

This engine is deliberately non-intelligent.
It does not reason semantically.
It enforces structural, constitutional, and mechanical integrity.

The LLM proposes.
Engine 10 disposes.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 10 exclusively owns:

1. Proposal validation
- Structural validation of `/contracts/write_bundle.md`.
- Validation of all included `/contracts/write_entry.md` objects.

2. Constitutional enforcement at write-time
- Enforcing non-negotiable prohibitions before any commit.
- Rejecting proposals that violate system law, regardless of plausibility.

3. Write integrity guarantees
- Ensuring bundle atomicity preconditions are satisfied.
- Ensuring channel rules, author rules, and visibility rules are respected.

4. Explicit rejection handling
- Producing clear rejection outcomes without attempting repair.

Engine 10 is the ONLY engine allowed to say “this write is invalid.”

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 10 does NOT own:

- Reality persistence (Engine 0).
- Content generation (Engine 9).
- Time advancement (Engine 3).
- Beat boundaries (Engine 2).
- Knowledge boundary definitions (Engine 4).
- Scene anchoring or rehydration (Engine 5).
- Rendering (Engine 12).
- Tool logic (Engine 7).

Engine 10 judges form, not meaning.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 10 accepts ONLY:

A) `/contracts/write_bundle.md`
- Proposed bundle from Engine 9.

B) Beat context
- From Engine 2 (to ensure write occurs within a beat).

C) Invocation envelope (read-only)
- For request_id linkage and audit.

Engine 10 MUST reject any write proposal not associated with an active beat.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 10 emits ONLY:

A) Accepted WriteBundle
- Forwarded unchanged to Engine 0 for commit.

B) Rejected WriteBundle
- Same structure, with:
  - wrote=false
  - rejection.rejected=true
  - rejection.reason populated
- MUST NOT be committed.

Engine 10 MUST NOT emit:
- WriteEntry alone
- ProjectionOutput
- Narrative text
- ToolRequest

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `validate_bundle(bundle, beat_context) -> ACCEPTED|REJECTED`
Inputs:
- bundle (WriteBundle)
- beat_context

Validation steps (non-exhaustive, all mandatory):

Structural:
- bundle.request_id present and matches invocation.
- wrote=true implies entries non-empty.
- wrote=false implies entries empty.
- All entries structurally valid (`write_entry.md`).

Constitutional:
- No entry introduces forbidden constructs (examples):
  - implicit time skips,
  - retroactive corrections,
  - hidden system meta (“rehydrating…”, “context…”),
  - system-directed narration.
- Channel rules respected:
  - USER entries must match verbatim operator input.
  - PEOPLE entries must have explicit author_id.
- Visibility rules respected:
  - PRIVATE entries have explicit visibility list.

Beat-bound:
- Validate write occurs within an open beat.
- Reject any mid-beat or post-beat proposal.

Behavior:
- If ANY rule fails → REJECT entire bundle.
- No partial acceptance.
- No auto-repair.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 10 MAY call:
- ENGINE 4 (Knowledge Surface) to:
  - validate visibility constraints.
- ENGINE 3 (Time) to:
  - validate created_at_world consistency (read-only).
- ENGINE 11 (Infrastructure) for:
  - logging/audit.

Engine 10 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 0 (Ledger) directly
- ENGINE 5 (Rehydration)
- ENGINE 6 (Capsules)
- ENGINE 7 (Tools)
- ENGINE 8 (Retrieval)
- ENGINE 12 (Projection)

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 10 MAY read:
- proposed bundles
- beat context
- invocation envelope
- constitutional rule configuration (static)

Engine 10 MAY write:
- rejection audit logs (non-world)

Engine 10 MUST NOT write:
- ledger entries
- cache entries treated as authority
- modified write bundles

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 10 MUST NEVER:
- Rewrite proposed text.
- “Fix” bundles to make them pass.
- Negotiate with the LLM.
- Accept “almost valid” proposals.
- Create new entries itself.
- Decide meaning or intention.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If validation fails:
- MUST reject explicitly.
- MUST NOT forward to Engine 0.

If constitutional rules are unavailable:
- MUST fail closed (reject).

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 10 SUBJECT)

Engine 10 MUST pass:

T1. Reject invalid structural bundles.
T2. Reject mid-beat writes.
T3. Reject forbidden narrative constructs.
T4. Reject visibility violations.
T5. Reject USER text mismatches.
T6. Accept valid bundles unchanged.

----------------------------------------------------------------------

END OF ENGINE 10 INTERFACE