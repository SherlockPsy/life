# Life — A Continuous Text-Only Reality System

This repository implements **Life**, a deployed, text-only, continuous reality system.

This is **not** a chatbot.  
This is **not** a simulation toy.  
This is **not** a narrative engine.  
This is **not** a product demo.

This repository exists to enforce **ontological integrity under deployment**.

---

## Authority and Governance (READ THIS FIRST)

This repository is governed by a strict authority hierarchy.

The following files are **binding law**, in descending order of authority:

1. **NON_NEGOTIABLE_SYSTEM_DECISIONS.md**  
   This is the constitutional superset.  
   It overrides every other document, file, comment, and assumption.

2. **EXECUTION PLAN — HARDENED, CONTRACT-FIRST, UI-DRIVEN**  
   Defines the phased construction process and scope boundaries.

3. **ENGINE_INVENTORY.md**  
   Defines which engines exist and what they are allowed to do.

4. **TRACEABILITY_MATRIX.md**  
   Defines which behaviors trace to which laws and phases.

5. **Engine Interface Pack** (`/engines/ENGINE_*/interface.md`)  
   Defines strict engine contracts.

6. **Contracts** (`/contracts/`)  
   Formalizes allowed data shapes and interactions.

If any file, comment, test, or implementation conflicts with the above, **the higher authority wins**.

This README has **zero authority**.  
It is informational only.

---

## What This System Is

Life is a **continuous, irreversible, text-only reality system**.

- Time advances forward only.
- The ledger records facts and does not rewind.
- Agents act within law-defined constraints.
- Silence is allowed.
- Refusal is allowed.
- Absence is allowed.

The system is designed so that:
- Reality does not pause to wait for the user.
- Agents are not puppets.
- Output is not guaranteed.
- “Nothing happens” can be a correct result.

---

## What This System Is Not

Do **not** treat this repository as:

- A chatbot framework
- A role-play engine
- A branching story generator
- A turn-based game
- A productivity assistant
- A UX-driven conversational interface

Any attempt to “improve responsiveness,” “add helpfulness,” or “smooth interaction” without explicit authorization from the governing documents is **incorrect**.

---

## Repository Structure (High-Level)

This is a **law-first** repository.  
Code exists to obey documents, not the other way around.

Key directories:

- `/engines/`  
  Discrete engines with strictly limited responsibilities.  
  Engines must obey their interfaces.  
  Engines must not coordinate outside their mandate.

- `/contracts/`  
  Formal data contracts.  
  These are binding.

- `/characters/`  
  Character payloads and semantic substrates.

  - `/characters/rebecca/`  
    Hand-authored, read-only character constraint text for Rebecca.  
    These files shape expression only and have no mechanical authority.

  - `/characters/archetypes/`  
    Semantic archetype templates.  
    These are **not agents**.  
    They do not act.  
    They do not inject behavior automatically.

- `/utils/`  
  Narrow, defensive utilities.  
  No hidden logic.  
  No orchestration.

---

## Character Payloads (Important Clarification)

Character payloads are **textual constraints**, not engines.

They:
- Are read-only
- Are injected as opaque text
- Cannot write to state
- Cannot alter time
- Cannot alter knowledge
- Cannot alter ledger rules

They may influence **how** an agent expresses itself **only when expression is already lawful**.

If a character payload is removed, the system **must continue to function**.

---

## Deployment Reality

This system is deployed on Railway.

- There is no local runtime.
- There is no local database.
- There are no unit tests.
- There is no mock environment.

If behavior cannot be observed via **curl against the deployed URL**, it does not exist yet.

---

## Contribution Rules (Hard)

Do **not**:

- Add engines without an explicit phase authorization.
- Add tests unless explicitly required.
- Add migrations, seed scripts, or setup scripts.
- Introduce CI/CD tooling.
- Refactor “for cleanliness.”
- Improve style without mandate.
- Infer missing behavior.
- “Help” the system by filling gaps.

If something is ambiguous:
- Stop.
- Ask.
- Do not guess.

Failure is preferable to fabrication.

---

## Design Philosophy (Non-Authoritative)

This system prioritizes:

- Structural correctness over convenience
- Law over behavior
- Constraint over optimization
- Emergence over scripting
- Autonomy over compliance

The goal is not productivity.  
The goal is **a world that does not lie**.

---

## Final Note

If you are reading this file to understand “how it works,”  
you are already in the wrong place.

Read the governing documents.  
They are the system.

Everything else exists to obey them.