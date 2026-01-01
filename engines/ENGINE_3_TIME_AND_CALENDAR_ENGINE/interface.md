# /engines/ENGINE_3_TIME_AND_CALENDAR_ENGINE/interface.md
STATUS: BINDING (ENGINE INTERFACE)
ENGINE ID: 3
ENGINE NAME: TIME & CALENDAR ENGINE

This file defines the ONLY permitted boundary for Engine 3.
Engine 3 defines what time *is* in the system, and nothing else.

----------------------------------------------------------------------

## 0) PURPOSE

Engine 3 exists to define, advance, and expose **objective world time**.

Time in the system:
- is singular,
- is monotonic,
- is mechanically advanced,
- is not narrative,
- does not imply events.

Engine 3 enforces the rule:
**time passing does not cause things to happen**.

----------------------------------------------------------------------

## 1) OWNS (EXCLUSIVE)

Engine 3 exclusively owns:

1. World clock definition
- Canonical world time representation.
- Timezone handling rules.
- Formatting rules for created_at_world.

2. Time advancement mechanics
- When time advances.
- By how much time advances.
- Explicit pauses and resumes.

3. Calendar mapping
- Mapping world time to calendar representations (day/date/hour/minute).
- Mechanical calendar objects (days, dates), not narrative meaning.

4. Explicit operator time declarations
- Accepting declared world time overrides from invocation envelopes.
- Recording them as binding constraints (not “corrections”).

Engine 3 is the ONLY engine allowed to change world time.

----------------------------------------------------------------------

## 2) DOES NOT OWN (EXPLICIT NON-RESPONSIBILITIES)

Engine 3 does NOT own:

- Reality creation (Engine 0).
- Beat boundaries (Engine 2).
- Narrative pacing or “later that day” shortcuts.
- Scene transitions (Engine 5).
- Event causality.
- Knowledge, memory, or recall.
- Rendering or UI formatting.
- Interpretation of “what time feels like.”

Engine 3 knows time, not story.

----------------------------------------------------------------------

## 3) INPUT CONTRACTS (ACCEPTED SHAPES)

Engine 3 accepts ONLY:

A) Beat boundary notifications
- Internal mechanical signal from Engine 2 indicating a beat boundary.

B) Explicit time declarations
- From `/contracts/invocation_envelope.md`
- Specifically: declared_overrides.time.*

No other inputs are permitted.

----------------------------------------------------------------------

## 4) OUTPUT CONTRACTS (EMITTED SHAPES)

Engine 3 emits ONLY:

A) Canonical world time string
- Used as created_at_world in WriteEntry.

B) Calendar view objects (mechanical)
- Used by Projection Engine for pocket display.
- Not authoritative world facts by themselves.

Engine 3 MUST NOT emit:
- WriteEntry
- WriteBundle
- Narrative text
- ProjectionOutput

----------------------------------------------------------------------

## 5) EXPORTED OPERATIONS (THE ONLY LEGAL API)

### 5.1 `get_current_world_time() -> string`
- Returns the current canonical world time.

### 5.2 `advance_time_at_beat(beat_context) -> string`
Inputs:
- beat_context (from Engine 2)

Behavior:
- If time is paused:
  - return current time unchanged.
- If invocation declared explicit world time:
  - adopt declared time as new canonical time.
- Otherwise:
  - advance time mechanically according to system policy
    (policy defined in configuration, not narrative logic).

Returns:
- new canonical world time string.

### 5.3 `pause_time()`
- Enters paused-time mode.

### 5.4 `resume_time()`
- Exits paused-time mode.

### 5.5 `get_calendar_view() -> calendar_object`
- Returns mechanical calendar representation for UI pocket.
- Does not advance time.

No other operations are permitted.

----------------------------------------------------------------------

## 6) ALLOWED CALLS (OUTBOUND DEPENDENCIES)

Engine 3 MAY call:
- ENGINE 11 (Infrastructure) for:
  - time libraries
  - timezone conversion
  - persistence of time state

Engine 3 MUST NOT call:
- ENGINE 9 (LLM Writer)
- ENGINE 8 (Retrieval)
- ENGINE 7 (Tools)
- ENGINE 6 (Capsules)
- ENGINE 5 (Rehydration)
- ENGINE 12 (Projection)
- ENGINE 0 (Ledger)

Engine 3 is authoritative, not consultative.

----------------------------------------------------------------------

## 7) ALLOWED READS / WRITES (DATA BOUNDARY)

Engine 3 MAY read/write:
- its own time state store (single canonical record)
- pause/resume flags
- timezone configuration

Engine 3 MUST NOT read:
- ledger entries
- capsule data
- retrieval results
- prompt packs
- UI state

Engine 3 MUST NOT write:
- ledger entries
- scene anchors
- capsule content
- derived narrative time statements

----------------------------------------------------------------------

## 8) MUST NEVER DO (FORBIDDEN BEHAVIOR)

Engine 3 MUST NEVER:
- Infer elapsed time from narrative content.
- Insert “later”, “after a while”, or similar shortcuts.
- Advance time because “something happened”.
- Skip time to make events line up.
- Rewrite historical created_at_world values.
- Resolve contradictions in time declarations.

----------------------------------------------------------------------

## 9) FAILURE MODES (EXPLICIT)

If time cannot be advanced:
- MUST fail explicitly.
- MUST NOT invent a fallback time.

If explicit time declaration conflicts with system state:
- MUST accept the declaration as binding.
- MUST NOT “smooth” or reinterpret it.

----------------------------------------------------------------------

## 10) CONTRACT TEST REQUIREMENTS (ENGINE 14 OWNERSHIP; ENGINE 3 SUBJECT)

Engine 3 MUST pass:

T1. Time monotonicity (unless explicit override).
T2. Paused time does not advance across beats.
T3. Explicit operator time declaration is adopted verbatim.
T4. Time advancement does not create ledger entries.
T5. Time advancement does not imply events.
T6. Calendar view reflects canonical time exactly.

----------------------------------------------------------------------

END OF ENGINE 3 INTERFACE