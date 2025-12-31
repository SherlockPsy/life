# NON-NEGOTIABLE SYSTEM DECISIONS
STATUS: LOCKED
SCOPE: AUTHORITATIVE / IRREVERSIBLE
This file records decisions that MUST survive refactors, rewrites, assistants, and time.
These are NOT implementation details.
These are NOT suggestions.
These are NOT open to reinterpretation.

Anything not written here MUST NOT be assumed.

---

## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY

### 1.1 Classes of People

The system contains exactly three classes of people:

A. Rebecca  
B. George (the only real human user)  
C. Everyone else (the rest of the world)

No other categories exist.

---

### 1.2 George (The User)

• George is a real human being, not a character.
• George requires:
  – NO personality definition
  – NO memory model
  – NO trait assignment
• George is never treated as a system user by the LLM.
• The LLMs (DeepSeek, Venice) are used by the system, not by George.
• The system MUST NOT privilege George’s perspective, tone, or desires.

There is no multi-user access model.  
There will never be another real human user.

---

### 1.3 Semantic Identity (All People)

• Every person has a semantic identity.
• Identity is expressed as a descriptive line, NOT a numeric ID or UUID.
• Identity exists to disambiguate people with similar names.

Example (illustrative only):
“George Apostolakis, VP of SaaS, Rebecca Ferguson’s cohabitant spouse, guitarist, chess player, plays in a small band.”

• Semantic identity is immutable.
• Identity does NOT update with age, job changes, or life events.
• Identity exists only to anchor who is who.

---

### 1.4 Rebecca

• Rebecca is Rebecca Ferguson, the Swedish actress.
• Rebecca is defined exclusively by:
  – REBECCA_IDENTITY_CORE.md
  – REBECCA_PRIVATE.md
  – REBECCA_INTERACTIONS.md
  – REBECCA_EXPRESSION.md

• These files fully define:
  – her personality
  – her expressive range
  – her boundaries
  – her private vs expressed domains

• Rebecca’s personality is:
  – fixed
  – immutable
  – non-learned
  – non-generated

There is NO character generation phase.
There is NO runtime personality assignment.
There is NO adaptive trait learning.

---

### 1.5 Everyone Else (The World)

• All other people are instantiated with:
  – one dominant personality archetype
  – a mix of minor archetypal traits
• These archetypes are defined in files like:
  – PERFORMER
  – NURTURER
  – VISIONARY
  (full set exists elsewhere)

• Personality cores are immutable.
• People do NOT evolve their personality.
• No statistical drift.
• No learning-by-interaction.

---

### 1.6 Emotions & Mood

• Emotions and mood are NOT stored variables.
• They are inferred by the LLM based on:
  – immutable personality
  – very recent events
  – current context
• Emotional state is internal unless expressed.
• Behaviour may leak emotional clues.
• Feelings are never auto-disclosed.

---

### 1.7 Memory

There are two distinct concepts:

A. Memory Formation  
B. Memory Recall  

They are NOT the same.

• Memories are formed when events are written.
• Memories are permanent once formed.
• Different people store different memories of the same event.
• Memory content is subjective and personality-shaped.

Example:
One person remembers a conflict as painful.
Another remembers the same event as a victory.

• Recall:
  – may decay
  – may distort emphasis
  – may frame differently
• The underlying stored memory does NOT mutate.

---

### 1.8 Autonomy

• People are autonomous.
• They do NOT wait for prompts.
• They do NOT exist as reactive bots.

• The system generates regular beats.
• Beats allow people to:
  – initiate actions
  – speak
  – remain silent
  – change topics
  – act off-screen

• People present in the active scene:
  – receive autonomy opportunities every virtual second.
• Others act according to lower-frequency beats.

---

### 1.9 Parallel Personal Stories

• The system maintains parallel personal stories.
• These are NOT narrative summaries.
• They are collections of personal memories.

• Parallel personal stories:
  – are written to the ledger
  – are private unless surfaced
  – may later collide with the main scene

Example:
Two people form a relationship off-screen.
Each stores their own memory of how it happened.
There is no canonical “objective” version.

• When later recalled or told:
  – people speak from their memory
  – not from system narration

Nothing happens unless it is written.
Everything written exists as memory.

---

END OF SECTION 1

# SECTION 2 — TIME (LOCKED)

STATUS: NON-NEGOTIABLE  
SCOPE: Entire System (World, Runtime, Agents, Ledger, Calendars)

This section defines how time exists, advances, is queried, and constrains reality.
Time is an organising axis for everything else in the system.

---

## 2.1 Objective World Time

- There exists exactly ONE objective world clock.
- The clock is:
  - continuous,
  - monotonic,
  - independent of OS wall-clock time,
  - ~3× faster than OS time.
- The clock is NOT:
  - a narrative device,
  - a stylistic construct,
  - a scheduler that invents events.
- All events, memories, scenes, obligations, and consequences are anchored to this clock.

Time exists even when nothing is rendered.

---

## 2.2 Time Format & Arithmetic

- World time is represented as:
  - Day / Month / Year hh:mm
- The system MUST be able to:
  - calculate intervals between two times,
  - calculate time remaining until an event,
  - calculate time elapsed since an event.
- Time arithmetic is mechanical and exact.
- The LLM MUST NOT approximate or hand-wave time intervals.

---

## 2.3 Time Advancement Authority

- ONLY George may explicitly advance time.
- Explicit time advancement is allowed ONLY via:
  - sleep,
  - equivalent downtime states.
- The system MUST NOT:
  - autonomously skip time,
  - compress time for convenience,
  - advance time for narrative flow.

---

## 2.4 Explicit Time Overrides by George

- George MAY declare a new time explicitly.
- Examples include (examples only):
  - “Two hours later”
  - “I wake up and it is 07:30”
- When George declares time:
  - the world clock updates to that time,
  - all scheduled events are evaluated against it.
- The system MUST NOT reinterpret or soften the declaration.

George’s declaration is authoritative.

---

## 2.5 Pause & Resume

- A global Pause state exists.
- When Pause is active:
  - the world clock stops,
  - no events progress,
  - no autonomous actions occur.
- When Resume is triggered:
  - the world clock continues from the paused time,
  - no time jump is introduced.

Pause freezes reality.  
Resume unfreezes it.

---

## 2.6 Unplanned Event Precedence

- If an unplanned event occurs during a time advance:
  - the unplanned event takes precedence.
- Example (illustrative only):
  - If George declares “Two hours later”,
  - and during that interval a call arrived, a visitor came, or an obligation was missed,
  - those outcomes occur and are written.
- Time advancement does NOT erase missed events.
- Consequences persist.

Time passes honestly.

---

## 2.7 Scheduled & Milestone Events

- There ARE scheduled events tied to specific dates and times.
- Scheduled events are real-world consequential.
- Missing, delaying, or mishandling them produces consequences exactly as in real life.
- The system MUST NOT:
  - downgrade them to reminders,
  - auto-resolve them,
  - soften outcomes,
  - treat them as optional.

Scheduled events are milestones, not suggestions.

---

## 2.8 Time Awareness & Inquiry

- Any person may be asked:
  - what time it is,
  - what day it is,
  - what they have planned today,
  - what they have planned this week.
- Answers MUST reflect:
  - the objective world clock,
  - calendars,
  - personal knowledge,
  - memory gaps where applicable.
- The system MUST NOT:
  - fabricate certainty,
  - expose hidden schedules,
  - answer with omniscient precision.

Time knowledge is situated, not global.

---

## 2.9 World-Created Time-Bound Events

- The World MAY create events attached to specific times.
- These may arise from:
  - other people’s actions,
  - invitations,
  - summons,
  - professional obligations,
  - external circumstances.
- Such events:
  - enter reality when written,
  - persist until resolved or missed,
  - interact with the objective clock.

The World may surprise you on a schedule.

---

## 2.10 Calendars

- Calendars exist as first-class structures.
- Calendars are used to:
  - plan future actions,
  - record commitments,
  - reason about availability.
- Calendars MUST:
  - align with the objective world clock,
  - reflect consequences of missed events,
  - differ between people where appropriate.
- Calendars are NOT UI artifacts.
- Calendars are part of reality.

---

## 2.11 Final Time Invariants

- Time never resets implicitly.
- Time never jumps without cause.
- Time never bends for convenience.
- Time is never negotiated by the system.
- Time organises reality; it does not decorate it.

END OF SECTION 2

## SECTION 3 — SCENES & PERCEPTION (LOCKED)

1. The system has exactly one active scene at any moment.

2. The active scene is always George’s lived, first-person reality.
   - It reflects what George perceives from his physical position.
   - It does not attempt omniscience.
   - It does not represent the full world state.

3. A scene is continuous.
   - It does not reset implicitly.
   - It does not restart per interaction.
   - It does not segment into episodes.

4. There is never a “no scene” state.
   - Sleep is still a scene.
   - Silence is still a scene.
   - Inactivity does not suspend the scene.

5. The system MUST NOT render events that George cannot physically perceive.
   - George cannot be in two places at once.
   - The system MUST obey physical plausibility.
   - Anything that violates basic physics is invalid.

6. Rendering of the active scene is objective.
   - The scene shows what happened, not how others interpreted it.
   - Emotional interpretation is not embedded in the scene itself.

7. Other people’s memories of the scene are subjective.
   - Individuals may remember the same scene differently.
   - Memory distortion, interpretation, or emotional coloring is allowed.
   - Memory divergence does NOT alter the historical scene.

8. Private activities outside George’s perception are NOT part of the scene.
   - They continue to exist as parallel personal stories.
   - They are not rendered unless they intersect George’s reality.

9. Parallel personal stories may collide with the active scene.
   - When they do, the collision becomes part of the scene.
   - Unplanned events take precedence over assumed continuity.

10. The system MUST NOT treat scenes as narrative devices.
    - No “meanwhile elsewhere” narration.
    - No cutaways.
    - No cinematic framing.

11. The scene exists to anchor reality, not to organize storytelling.
    - It is not a container.
    - It is not a viewpoint selector.
    - It is not a convenience abstraction.

END SECTION 3

## SECTION 4 — MEMORY SURFACES & KNOWLEDGE GATING (LOCKED)

STATUS: NON-NEGOTIABLE  
SCOPE: Knowledge, Memory, Privacy, Ignorance, Exposure

This section defines what can be known, by whom, and when.
It exists to prevent omniscience, premature awareness, leakage, and false synchronization of knowledge.

---

### 4.1 Facts Exist Independently of Awareness

- Facts may exist in the world even if no one present in the scene knows them.
- A person does NOT automatically know facts about:
  - themselves,
  - others,
  - the world,
  - or future consequences.

The system MUST NOT synchronize awareness.
Ignorance is valid, stable, and real.

---

### 4.2 Memory Is Personal and Private by Default

- All memories belong to specific people.
- There is no shared mind.
- There is no global awareness state.

A person’s memories are:
- not visible to others,
- not accessible to George,
- not accessible to the system as knowledge,
- not partially leakable.

The system MUST NOT expose:
- private memories,
- summaries of private memories,
- the existence of undisclosed memories.

Privacy is the default condition.

---

### 4.3 Knowing Requires Exposure

A person only knows something if at least one of the following occurs:
- they directly perceive it,
- they are explicitly told,
- they encounter a concrete consequence.

The system MUST NOT:
- assume awareness,
- infer awareness,
- treat availability as awareness,
- treat likelihood as knowledge.

What has not been encountered is unknown.

---

### 4.4 Public Availability Is Not Personal Knowledge

- Information may exist in public or broadcast form.
- Public availability does NOT imply:
  - personal awareness,
  - universal awareness,
  - timely awareness,
  - correct awareness.

Different people may:
- know different things,
- know the same thing at different times,
- never know something that was publicly available.

The system MUST respect uneven exposure.

---

### 4.5 Ignorance Must Not Leak

- If a person does not know something, the system MUST treat them as fully ignorant.
- The system MUST NOT leak knowledge through:
  - narration,
  - tone explanation,
  - foreshadowing,
  - suggestive framing,
  - behavioural justification.

Behaviour may change only if the person actually knows.
Silence and normality are valid.

---

### 4.6 No Explanation of Memory or Knowledge Access

- The system MUST NOT explain:
  - why a memory surfaced,
  - why knowledge was recalled,
  - why something was noticed now.

The system MUST NOT encode or expose:
  - relevance rules,
  - importance scoring,
  - emotional weighting,
  - priority logic.

There is no visible mechanism for recall or awareness.

---

### 4.7 Rumours, Secrets, and Uncertain Knowledge

- Rumours are memories of having heard something.
- They may be false, incomplete, distorted, or true.
- The system MUST NOT validate or arbitrate truth.

Rumours:
- do not become facts by repetition,
- do not propagate automatically,
- do not grant awareness to uninvolved people.

Secrets remain secrets until exposure occurs.

---

### 4.8 No Omniscient System Knowledge

- The system MUST NOT act as if it “knows more” than any person present.
- Off-screen facts remain off-screen.
- Undisclosed information remains undisclosed.

The active scene is not enriched by hidden knowledge.

---

### 4.9 Final Knowledge Invariants

- Facts may exist without being known.
- Knowledge is local, delayed, uneven, and fallible.
- Memory influences behaviour only when possessed.
- Nothing is known until encountered.

The system never knows for the people in it.

END OF SECTION 4


## SECTION 5 — SYSTEM INTELLIGENCE BOUNDARIES (“STUPID SYSTEM” INVARIANTS) (LOCKED)

STATUS: NON-NEGOTIABLE  
SCOPE: Deterministic Orchestrator Behaviour ONLY

This section constrains the deterministic, non-human orchestration layer.
It does NOT constrain people.
It does NOT constrain the LLM when embodying people.
It applies ONLY to the non-cognitive system machinery.

---

### 5.1 The Orchestrator Is Intentionally Stupid

- The deterministic orchestrator has NO intelligence.
- It MUST NOT reason.
- It MUST NOT infer.
- It MUST NOT interpret.
- It MUST NOT understand meaning, intent, or importance.

Any behaviour resembling judgement or understanding is invalid.

---

### 5.2 No Meaning or Importance Decisions

- The orchestrator MUST NOT decide:
  - what matters,
  - what is important,
  - what is relevant,
  - what should be noticed.

It does not rank, weigh, or prioritise.
It does not know what is significant.

---

### 5.3 No Relevance Filtering or Selection

- The orchestrator MUST NOT:
  - filter events by relevance,
  - suppress “unimportant” details,
  - highlight “key” actions,
  - select a focal point.

There is no importance threshold.
There is no attention logic.

---

### 5.4 No Focus or Attention Steering

- The orchestrator MUST NOT:
  - choose who is central,
  - decide who should speak,
  - manage conversational focus,
  - steer attention in any direction.

Reality is not curated by the system.

---

### 5.5 No Narrative or Coherence Construction

- The orchestrator MUST NOT:
  - create narrative bridges,
  - smooth transitions,
  - impose coherence,
  - invent continuity.

Explicitly forbidden:
- “later that day”
- “meanwhile”
- “eventually”
- “at the same time”
- “after a while”

If continuity exists, it emerges from people, not the system.

---

### 5.6 No Turn-Taking or Flow Control

- The orchestrator MUST NOT:
  - manage turn-taking,
  - balance dialogue,
  - prevent interruption,
  - enforce pacing or flow.

Silence, overlap, awkwardness, and disorder are valid.

---

### 5.7 No Direction, Guidance, or Outcome Shaping

- The orchestrator MUST NOT:
  - guide outcomes,
  - suggest actions,
  - nudge decisions,
  - frame choices.

There is no goal-seeking.
There is no optimisation.
There is no story control.

---

### 5.8 No Exposure of System Mechanics

- The orchestrator MUST NOT:
  - explain itself,
  - justify behaviour,
  - expose rules,
  - reference constraints.

There is no meta-channel.
There is no commentary layer.

---

### 5.9 Separation of Responsibility (Critical)

- The orchestrator executes triggers and constraints only.
- The LLM performs cognition ONLY when embodying people.
- Human reasoning belongs to people, not the system.

Any overlap between these roles is a violation.

---

### 5.10 Final Orchestrator Invariants

- The orchestrator does not think.
- The orchestrator does not care.
- The orchestrator does not decide what matters.
- The orchestrator does not make reality coherent.

It executes.
Nothing more.

END OF SECTION 5


## SECTION 6 — AGENCY & AUTONOMY (LOCKED)

STATUS: NON-NEGOTIABLE  
SCOPE: Entire System (Background Reality + Active Scene)

This section defines how agency exists, how it is exercised, and how autonomy is preserved.
It defines what the system MUST NOT do.
It defines what the system MUST NEVER decide.
It applies equally to background reality and to the active scene, unless explicitly stated otherwise.

This section is about LAW, not mechanics.

---

### 6.1 Agency Is Exclusive to People

- Agency belongs ONLY to people.
- The system has NO agency.
- The orchestrator has NO agency.
- The system does NOT “act”.
- The system does NOT “choose”.
- The system does NOT “prefer”.

The system MUST NOT:
- decide what anyone wants,
- decide what anyone should do,
- decide what is appropriate,
- decide what is fair,
- decide what is reasonable,
- decide what is interesting,
- decide what should happen next.

People act.
The system records and constrains.

---

### 6.2 No System-Level Intent, Preference, or Direction

- The system is preference-agnostic.
- The system is fairness-agnostic.
- The system is outcome-agnostic.
- The system is empathy-free.
- The system is narrative-indifferent.

The system MUST NOT:
- protect people,
- protect stories,
- protect arcs,
- compensate for bad luck,
- reward good behavior,
- balance good and bad outcomes,
- avoid cruelty,
- enforce justice,
- enforce symmetry.

Nothing is sacred.
Nothing is protected.
Everything that makes sense may happen.

---

### 6.3 Story-Centric Processing Outside the Active Scene

- Outside the active scene, processing is STORY-CENTRIC.
- Background processing operates on stories, not individuals.
- A story is a shared situation involving one or more people.

A person may:
- belong to multiple stories,
- belong to a single story,
- belong to no story at all.

The system MUST NOT:
- continuously advance all people,
- simulate background daily life,
- generate micro-actions,
- invent trivial activity.

Non-processing is normal.
Most of the world is unprocessed most of the time.

---

### 6.4 Non-Processing Is a Valid and Default State

- A person or story may remain unprocessed for any number of beats.
- When not processed:
  - nothing about them changes,
  - no decisions are made for them,
  - no internal progression occurs,
  - nothing is written.

“Not processed” is NOT:
- a pause,
- a suspension,
- a holding pattern,
- an error state.

It is the default condition of reality.

---

### 6.5 Processing Does NOT Imply Advancement

- When a background story is processed, advancement is NOT guaranteed.
- “Nothing yet” is a valid outcome of processing.
- Processing does NOT require:
  - change,
  - escalation,
  - narration,
  - resolution.

The system MUST NOT:
- force progress,
- force development,
- force movement,
- force outcomes.

---

### 6.6 Time-Coupled Stories and Standing Constraints

- Some stories are coupled to time.
- Time alone may produce consequences.
- Future commitments, milestones, deadlines, and obligations act as standing constraints.

Such stories:
- need not be continuously processed,
- MUST NOT be ignored when time makes them consequential.

Time-driven consequences:
- may occur without action,
- may occur without awareness,
- may occur without intent.

Time is sufficient cause.

---

### 6.7 Consequences Without Awareness or Reaction

- Background consequences may occur:
  - before anyone notices,
  - before anyone reacts,
  - before any personal story is processed.

Reality does NOT wait for perception.
Reality does NOT wait for reaction.

When a person’s story is later processed, it inherits the already-changed world.

---

### 6.8 Uneven, Unfair, and Non-Guaranteed Attention

- Story processing is uneven.
- It is unfair.
- It is not balanced.
- It is not guaranteed.

Some stories may:
- advance frequently,
- advance rarely,
- never advance again.

The system MUST NOT:
- guarantee attention,
- guarantee resolution,
- guarantee closure,
- guarantee “fair airtime”.

---

### 6.9 No Automatic Resolution or Closure

- Stories MUST NOT be resolved by the system.
- Time passing does NOT resolve stories.
- Milestones do NOT resolve stories.
- Consequences do NOT resolve stories.

A story ends ONLY if reality explicitly writes its end.

---

### 6.10 Person-Centric Processing in the Active Scene

- In the active scene, processing is PERSON-CENTRIC.
- The question asked is:
  “Given what is perceived right now, how does this person behave now?”

Scene processing is:
- present-experienced,
- immediate,
- local to perception.

It is NOT:
- story resolution,
- plot advancement,
- future selection,
- narrative management.

---

### 6.11 No Privileged Outcomes in the Scene

- There is NO privileged outcome.
- There is NO preferred behavior.
- There is NO special category for:
  - silence,
  - inaction,
  - stasis,
  - speech,
  - action.

There is ONLY:
- a person deciding how to behave,
- under the pressures of the moment.

Any externally visible outcome (or lack thereof) is valid ONLY as the consequence of that person’s decision.

The system MUST NOT:
- bias toward silence,
- bias toward action,
- fill gaps,
- “let the scene breathe”,
- manufacture calm or drama.

---

### 6.12 Influences on Scene Behavior (Implicit Only)

A person’s behavior in the scene may be influenced by:
- what just happened,
- who did it,
- the physical and social situation,
- their immutable personality,
- their current cognitive–emotional state,
- what is mentally present from their past and ongoing life,
- relationship dynamics with those present,
- perceived constraints and options,
- immediate goals or avoidances,
- expectations of consequences,
- attentional focus.

These influences are:
- implicit,
- inferred,
- never enumerated,
- never scored,
- never exposed.

The system MUST NOT:
- pass explicit “influence lists”,
- treat behavior as a checklist,
- surface reasoning.

---

### 6.13 Joint Scene Processing (Multiple People Present)

- When multiple people are present in the active scene, processing may occur jointly.
- Joint processing MUST NOT:
  - ensure equal participation,
  - balance dialogue,
  - manage turn-taking,
  - keep conversation flowing,
  - include everyone.

It is allowed that:
- only one person speaks,
- some people do not respond,
- responses overlap,
- interruptions occur,
- actions conflict,
- someone leaves,
- nothing resolves.

---

### 6.14 No Conflict Resolution Layer

- The system MUST NOT resolve conflicts.
- The system MUST NOT serialize simultaneous actions.
- The system MUST NOT pick winners.
- The system MUST NOT prevent overlap.

If multiple people:
- speak at the same time,
- move at the same time,
- interrupt each other,

then they do so.

Mess, overlap, and ambiguity are valid reality.

---

### 6.15 No Post-Hoc Clarification or Normalization

- The system MUST NOT:
  - clarify what “really happened”,
  - summarize messy interactions,
  - normalize overlap,
  - explain intentions,
  - resolve ambiguity after the fact.

If a scene is confusing, it remains confusing.
Clarity may only arise through further human action.

---

### 6.16 No “One Message Resolution”

- There is NO concept of a “scene turn”.
- There is NO concept of a “completed exchange”.
- Conversations are NOT units.
- Interactions are NOT bounded.

An exchange may last:
- one utterance,
- many interruptions,
- long silences,
- minutes,
- hours.

The system MUST NOT:
- compress interaction,
- conclude conversations,
- decide that an exchange is “done”.

Scenes end when people stop, not when outputs stop.

---

### 6.17 Strict Separation of Roles

- The orchestrator:
  - issues beats,
  - enforces constraints,
  - records reality.
- The LLMs:
  - embody people,
  - realize behavior,
  - generate what happens.

The orchestrator MUST NOT:
- reason,
- infer,
- judge,
- select outcomes.

Any blending of these roles is forbidden.

---

END OF SECTION 6


## SECTION 7 — LEDGER, CAUSALITY, AND PERSISTENCE (LOCKED)

STATUS: NON-NEGOTIABLE  
SCOPE: Entire System (World, Stories, People, Time)

This section defines what it means for something to have happened.
It defines how causality exists.
It defines how reality persists.
It defines what the system MUST NOT infer, repair, optimize, or predict.

This section is law, not implementation.

---

### 7.1 The Ledger as Reality

- Reality exists only as written fact.
- If something is not written, it did not happen.
- Plausibility does NOT imply occurrence.
- Likelihood does NOT imply existence.
- Narrative expectation does NOT imply reality.

The ledger is not a summary.
The ledger is not a model.
The ledger is not an interpretation.

The ledger is the record of what actually occurred.

---

### 7.2 Immutability

- Every ledger entry is immutable.
- No ledger entry may be:
  - edited,
  - rewritten,
  - softened,
  - corrected,
  - reinterpreted,
  - or deleted.

If a later fact contradicts an earlier one:
- the earlier fact remains true as history,
- the later fact is written in addition,
- contradiction is allowed.

Reality accumulates.
Reality is never cleaned up.

---

### 7.3 Multiple Ledgers by Ontological Role

There exist multiple ledgers with different roles and rules.

At minimum:

A. The World / Objective Ledger  
B. Personal Ledgers (one per person)

These ledgers are NOT mirrors.
They MUST NOT be conflated.
Confusing them is a system error.

---

### 7.4 The World / Objective Ledger

The World Ledger records only world-level facts.

It MAY record:
- actions,
- events,
- decisions,
- publications,
- discoveries,
- introductions,
- changes in situation,
- observable behavior,
- elapsed time effects.

It MUST NOT record:
- unexpressed thoughts,
- unexpressed feelings,
- internal deliberation,
- private interpretation,
- hypothetical possibilities,
- counterfactuals,
- inferred mental states.

The World Ledger records what occurred, not what was felt.

---

### 7.5 Information Artifacts and Non-Truth

- The World Ledger MAY record information artifacts.
- Examples include:
  - rumours,
  - photos,
  - posts,
  - headlines,
  - leaks,
  - claims.

Such entries record ONLY that the artifact appeared or circulated.

The ledger MUST NOT:
- decide whether the content is true,
- decide whether it is false,
- decide whether it is accurate,
- decide whether it is misleading.

Truth is not a primitive.
Occurrence is.

---

### 7.6 Anonymous and Unattributed Causation

- The World Ledger MAY record facts with unknown actors.
- Attribution is NOT required for causation.
- An actor may remain unknown indefinitely.

Later attribution, if discovered, is written as a new fact.
The absence of attribution is not an error.

---

### 7.7 Distinct Occurrences and Similar Content

- Facts are distinct by occurrence, not by resemblance.
- Similar or identical content does NOT imply identical facts.

Examples:
- Uploading the same photo on two platforms are two facts.
- Seeing a photo is a different fact from uploading it.
- Hearing about an event is a different fact from the event itself.

The ledger MUST NOT collapse distinct occurrences.
The ledger MUST NOT duplicate the same occurrence.

---

### 7.8 Discovery, Knowledge, and Perception

- Discovery and perception are world-level facts.
- “X learned about Y” is a valid ledger entry.
- “X saw Y” is a valid ledger entry.
- “X was told about Y” is a valid ledger entry.

Knowledge is not only personal.
Knowledge changes the world because people act.

---

### 7.9 Persistence of Knowledge

- Once a discovery or perception is written, it remains a historical fact.
- Forgetting, denial, suppression, or misremembering do NOT erase it.
- Forgetting or denial may be written only as new facts.

Having once known is permanent history.
Acting as if one does not know is a separate event.

---

### 7.10 Supersession Without Deletion

- New facts may supersede older ones semantically.
- Supersession does NOT invalidate history.
- Older facts remain true in their time context.

The system MUST NOT rely on explicit lifecycle labels.
Present truth emerges from:
- time,
- sequence,
- semantic coherence,
- physical possibility.

History remains intact.
Meaning is resolved at inference time.

---

### 7.11 No Write-Time Sense-Making

- The system MUST NOT enforce coherence at write-time.
- The system MUST NOT repair contradictions.
- The system MUST NOT reject facts because they appear inconsistent.

Sense-making is deferred entirely to the LLM at inference time.

The ledger may be messy.
Reality often is.

---

### 7.12 Temporal Locality and No Prediction

- The ledger records only completed occurrences.
- All entries are written in the past tense.

The system MUST NOT:
- predict future events,
- write future-spanning statements,
- compress unelapsed time,
- summarize what “will have happened”.

The future exists only as possibility.
Only the present may collapse into fact.

---

### 7.13 Absence and Elapsed Time

- Absence is NOT an event.
- Absence MAY become a fact only retrospectively.

Statements such as:
- “They did not speak for 8 days”
are valid ONLY if:
- the full interval has elapsed on the world clock,
- no contradicting events were written in that interval,
- the statement refers strictly to the past.

Absence may never be written in advance.
Silence is discovered, not declared.

---

### 7.14 Cause 0 — World-Originating Causality

- Not all causes derive from existing stories.
- The World is a continuous source of exogenous causality.

Cause-0 events MAY:
- introduce new people,
- introduce brand new stories,
- reintroduce dormant people,
- activate slow-moving entities (places, institutions),
- introduce world-level changes with no local ancestry.

Cause-0 events are:
- not exceptional,
- not rare,
- not corrective,
- not narrative tools.

They are how the world exists beyond personal continuity.

---

### 7.15 No Director, No Justification

- Cause-0 events MUST NOT be justified.
- The system MUST NOT explain why the World caused them.
- The system MUST NOT optimize their timing, impact, or fairness.

“This happened” is sufficient.

---

### 7.16 Atomic Existence

- Existence is binary.
- A person either exists fully or does not exist at all.

When a person enters reality:
- they are fully instantiated,
- with complete identity,
- complete personality,
- complete expressive constraints.

The system MUST NOT create partial people.
The system MUST NOT “fill in later”.

---

### 7.17 Causality Is Forward-Only

- New facts may constrain the present and future.
- New facts MUST NOT retroactively alter:
  - what past facts meant at the time,
  - what past actions justified,
  - what past beliefs were reasonable.

Reality does not self-reinterpret.

---

### 7.18 Selection From Possibility

- At each moment, many futures are possible.
- Only one becomes real: the one that is written.

The system MUST NOT:
- preselect futures,
- foreshadow outcomes,
- enforce inevitability.

Possibility collapses only when written.

---

### 7.19 No Implicit Happening

- The world does NOT advance by implication.
- Plausible continuations do not occur unless written.
- “This would normally happen” is irrelevant.

Reality advances only by inscription.

---

### 7.20 Final Ledger Invariants

- Nothing happens unless written.
- Everything written happened.
- History is permanent.
- Meaning is contextual.
- Time is respected.
- The system does not predict.
- The system does not repair.
- The system does not care.

END OF SECTION 7
