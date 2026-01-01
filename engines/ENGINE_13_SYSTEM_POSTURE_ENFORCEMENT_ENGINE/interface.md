# /engines/ENGINE_13_SYSTEM_POSTURE_ENFORCEMENT_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 13
ENGINE NAME: SYSTEM POSTURE ENFORCEMENT ENGINE (NON-RUNTIME)

This file defines the ONLY permitted boundary for Engine 13.
Engine 13 does NOT run in production.
It exists to prevent philosophical and architectural drift over time.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 13 exists to enforce **system posture** across development, testing, and evolution.

System posture means:
- the system remains non-directive,
- the system remains non-user-centric,
- the system remains non-narrative,
- the system remains constitution-first.

Engine 13 ensures the system does not slowly become a game, a chatbot, or a storyteller.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 13 exclusively owns:

1. Posture rules
- “The system must not want anything.”
- “The system must not steer.”
- “The system must not optimize for engagement.”
- “The system must not privilege the operator.”

2. Drift detection
- Detecting reintroduction of:
  - director logic,
  - narrative pacing logic,
  - engagement heuristics,
  - user-pleasing defaults.

3. Development-time enforcement
- Preventing merges that violate posture constraints.
- Preventing “temporary hacks” from becoming permanent.

Engine 13 is the ONLY owner of posture enforcement.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 13 does NOT own:

- Runtime logic.
- Content generation.
- Reality storage.
- Test execution (Engine 14).
- CI mechanics (Engine 11).

Engine 13 defines *what must never be allowed to creep in*.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 13 accepts ONLY:

A) Source code
B) Engine interface definitions
C) Contract files
D) Prompt packs
E) Configuration files

Engine 13 does NOT accept runtime data.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 13 emits ONLY:

A) Posture violations
- Explicit, blocking findings.
- Human-readable but non-negotiable.

B) Posture compliance confirmations
- For audit purposes.

Engine 13 MUST NOT emit:
- Runtime artifacts
- Code modifications
- Suggested “improvements”

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `audit_posture(artifact_set) -> PASS|FAIL`
Inputs:
- artifact_set (contracts, engines, code, prompts)

Behavior:
- Scan for forbidden patterns:
  - narrative helpers,
  - engagement metrics,
  - implicit goal functions,
  - user-centric defaults,
  - silent auto-corrections.
- Fail if any posture rule is violated.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 13 MAY call:
- ENGINE 11 (Infrastructure) for:
  - file access
  - CI integration

Engine 13 MUST NOT call:
- Runtime engines
- LLMs
- UI components

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 13 MAY read:
- source files
- config files
- contracts
- engine interfaces

Engine 13 MAY write:
- audit reports
- CI failure signals

Engine 13 MUST NOT write:
- runtime data
- ledger entries
- caches

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 13 MUST NEVER:
- Allow “temporary” posture violations.
- Weigh trade-offs (“it’s probably fine”).
- Auto-fix violations.
- Defer enforcement.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If posture audit fails:
- MUST block merge.
- MUST require explicit human intervention.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 13 SUBJECT)

Engine 13 MUST pass:

T1. Detect narrative pacing logic.
T2. Detect engagement optimization.
T3. Detect user-privileging logic.
T4. Fail builds on posture violation.
T5. No runtime coupling.

----------------------------------------------------------------------

END OF ENGINE 13 INTERFACE