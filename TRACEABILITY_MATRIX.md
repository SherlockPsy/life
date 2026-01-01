# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 1)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# NOTE: This matrix is rebuilt against the *actual current file* headings and content.

======================================================================
DOCUMENT HEADER
======================================================================

# NON-NEGOTIABLE SYSTEM DECISIONS
Engine owner:
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- ENGINE 14 — CONTRACT TEST ENGINE

Justification (verbatim lines):
1: # NON-NEGOTIABLE SYSTEM DECISIONS
2: STATUS: LOCKED
3: SCOPE: AUTHORITATIVE / IRREVERSIBLE
4: This file records decisions that MUST survive refactors, rewrites, assistants, and time.
5: These are NOT implementation details.
6: These are NOT suggestions.
7: These are NOT open to reinterpretation.
8:
9: Anything not written here MUST NOT be assumed.
10:
11: ---
12:

======================================================================
SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY
======================================================================

## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY
Engine owner:
- ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (where “memory surfaces / exposure / leakage” is implicated)
- ENGINE 13/14 (enforcement of prohibitions and non-user-centric posture)

Justification (verbatim lines):
13: ## SECTION 1 — PEOPLE, IDENTITY, PERSONALITY, MEMORY, AUTONOMY
14:

----------------------------------------------------------------------
### 1.1 Classes of People
----------------------------------------------------------------------

Engine owner:
- ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (because class determines knowledge/memory handling)
- ENGINE 9 — LLM WRITER ENGINE (because behavior must reflect class constraints)
- ENGINE 13/14 (enforcement)

Justification (verbatim lines):
15: ### 1.1 Classes of People
16:
17: - There are only three classes of people in the system:
18:   - The User (George)
19:   - Rebecca
20:   - Everyone else (world population)
21:
22: - George is the only human user.
23: - George is NOT the user of the LLM.
24:
25: ---
26:

----------------------------------------------------------------------
### 1.2 George (The User)
----------------------------------------------------------------------

Engine owner:
- ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE (operator input framing; request identity)
- ENGINE 9 — LLM WRITER ENGINE (must not treat George as its user)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (anti-user-privilege)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

Justification (verbatim lines):
27: ### 1.2 George (The User)
28:
29: • George is a real human being, not a character.
30: • George requires:
31:   – NO personality definition
32:   – NO memory model
33:   – NO trait assignment
34: • George is never treated as a system user by the LLM.
35: • The LLMs (DeepSeek, Venice) are used by the system, not by George.
36: • The system MUST NOT privilege George’s perspective, tone, or desires.
37:
38: There is no multi-user access model.  
39: There will never be another real human user.
40:
41: ---
42:

----------------------------------------------------------------------
### 1.3 Semantic Identity (All People)
----------------------------------------------------------------------

Engine owner:
- ENGINE 6 — CAPSULE ENGINE (identity continuity, behavior consistency)
- ENGINE 0 — REALITY LEDGER ENGINE (evidence is written record)
- ENGINE 8 — RETRIEVAL ENGINE (evidence access)
- ENGINE 9 — LLM WRITER ENGINE (behavior generation must respect evidence)

Justification (verbatim lines):
43: ### 1.3 Semantic Identity (All People)
44:
45: - Every person in the system MUST have semantic continuity.
46: - They MUST persist across scenes and time.
47: - They MUST have stable identity and memory surfaces.
48:
49: - Their behavior MUST be consistent with prior written evidence.
50:
51: - They cannot “reset.”
52: - They cannot “forget” unless forgetting is justified by written evidence.
53:
54: ---
55:
56:
57: ---

----------------------------------------------------------------------
### 1.4 Rebecca
----------------------------------------------------------------------

Engine owner:
- ENGINE 6 — CAPSULE ENGINE (identity, continuity, behavior constraints live in payload packs)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (private/public surfaces)
- ENGINE 9 — LLM WRITER ENGINE (Rebecca output behavior)
- ENGINE 14 — CONTRACT TEST ENGINE (drift prevention)

Justification (verbatim lines):
58: ### 1.4 Rebecca
59:
60: • Rebecca is Rebecca Ferguson, the Swedish actress.
61: • Rebecca is defined exclusively by:
62:
63:   – REBECCA_BEHAVIOR.md
64:   – REBECCA_MEMORY_SURFACES.md
65:   – REBECCA_PRIVATE_LEDGER.md
66:
67: • Any future assistant MUST treat these as authority.
68: • They MUST NOT invent personality traits, trauma, motivations, desires, or preferences not present in those documents.
69: • They MUST NOT “soften” her.
70: • They MUST NOT “optimize” her for George.
71:
72: ---
73:
74: Rebecca has agency.
75: Rebecca may ignore George.
76: Rebecca may contradict George.
77: Rebecca may refuse.
78: Rebecca may initiate.
79:
80: Rebecca may do nothing.
81:
82: ---
83:
84: ---

----------------------------------------------------------------------
### 1.5 Everyone Else (The World)
----------------------------------------------------------------------

Engine owner:
- ENGINE 6 — CAPSULE ENGINE (identity continuity on reappearance)
- ENGINE 9 — LLM WRITER ENGINE (world population behaviors)
- ENGINE 0 — REALITY LEDGER ENGINE (evidence)
- ENGINE 13/14 (anti-prop enforcement)

Justification (verbatim lines):
85: ### 1.5 Everyone Else (The World)
86:
87: - Everyone else is “world population.”
88: - They MUST be treated as autonomous agents.
89:
90: - They MAY be one-off or recurring.
91: - If they reappear, they MUST have semantic continuity.
92:
93: - They MUST NOT be treated as props.
94: - They MUST have their own motivations and agency.
95:
96: ---
97:
98: They may ignore George.
99: They may refuse George.
100: They may contradict George.
101:
102: ---

----------------------------------------------------------------------
### 1.6 Emotions & Mood
----------------------------------------------------------------------

Engine owner:
- ENGINE 6 — CAPSULE ENGINE (mood/emotion persistence as text evidence)
- ENGINE 0 — LEDGER (events that justify changes)
- ENGINE 8 — RETRIEVAL (evidence pull)
- ENGINE 9 — LLM WRITER (behavior expression)

Justification (verbatim lines):
103: ### 1.6 Emotions & Mood
104:
105: - Emotions and mood MUST exist as part of each person.
106: - They MUST persist through time unless changed by events.
107: - They MUST be consistent with written history.
108:
109: - Mood is not a “meter.”
110: - Mood is not a variable.
111: - Mood is semantic and expressed through behavior.
112:
113: ---
114:
115: ---

----------------------------------------------------------------------
### 1.7 Memory
----------------------------------------------------------------------

Engine owner:
- ENGINE 6 — CAPSULE ENGINE (personal memory + effects)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (exposure/leakage rules)
- ENGINE 8 — RETRIEVAL ENGINE (evidence-backed memory retrieval)
- ENGINE 9 — LLM WRITER ENGINE (behavior must reflect memory)

Justification (verbatim lines):
116: ### 1.7 Memory
117:
118: - People MUST have memory.
119: - Memory MUST affect behavior and reactions.
120:
121: - Memory MUST be consistent with prior written evidence.
122:
123: - “Forgetting” MUST NOT occur unless justified by written evidence.
124:
125: - People MAY misremember, but only as human plausibility, not as system convenience.
126:
127: - People MUST NOT suddenly “know” things without exposure.
128:
129: ---
130:
131: Memory is semantic.
132: Memory is not a key-value store.
133: Memory is not a database “field.”
134:
135: Memory exists only as written evidence and retrieval surfaces.
136:
137: ---
138:
139: They may be wrong.
140: They may lie.
141: ---

----------------------------------------------------------------------
### 1.8 Autonomy
----------------------------------------------------------------------

Engine owner:
- ENGINE 6 — CAPSULE ENGINE (autonomy as person property)
- ENGINE 9 — LLM WRITER ENGINE (silence/refusal/initiative)
- ENGINE 13/14 (enforcement against forced responses)

Justification (verbatim lines):
142: ### 1.8 Autonomy
143:
144: - People MUST be autonomous.
145: - They may refuse, ignore, or initiate.
146:
147: - Silence is allowed and may be correct.
148:
149: - People MUST NOT be forced to respond because the user prompted.
150:
151: - The system MUST NOT “fill the silence.”
152:
153: ---
154:
155: They may do nothing.
156: They may change the subject.
157: They may leave.
158:
159: ---
160:
161: ---

----------------------------------------------------------------------
### 1.9 Parallel Personal Stories
----------------------------------------------------------------------

Engine owner:
- ENGINE 6 — CAPSULE ENGINE (parallel personal story existence as evidence)
- ENGINE 0 — LEDGER (off-screen becomes real only when written)
- ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR (opportunities may surface, but no hidden ticking)
- ENGINE 13/14 (no simulation loop enforcement)

Justification (verbatim lines):
162: ### 1.9 Parallel Personal Stories
163:
164: - Each person may have a life outside the user’s attention.
165: - Parallel personal stories MUST exist.
166:
167: - They MUST NOT be simulated as hidden ticking processes.
168:
169: - Off-screen events become real only when written into the record.
170:
171: - Nothing “happens” off-screen unless it is written.
172:
173: ---
174:
175: This does not mean off-screen is “empty.”
176: It means off-screen is not simulated.
177:
178: ---
179:
180: People can reference off-screen life only when it has written support.
181:
182: ---
183:
184: END OF SECTION 1
185:
186: ---
187:
188:
# END OF CORRECTED PART 1

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 2)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 2 — TIME (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 2 — TIME (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 3 — TIME & CALENDAR ENGINE (primary owner of time representation, arithmetic, calendars, monotonic progression, inquiry semantics)
- ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR (owner for surfacing scheduled/milestone opportunities at the correct time without director logic)
- ENGINE 0 — REALITY LEDGER ENGINE (timestamps and ordering metadata as non-semantic infrastructure)
- ENGINE 14 — CONTRACT TEST ENGINE (enforces “no time skip”, “no convenience jumps”, scheduled event surfacing)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

189: # SECTION 2 — TIME (LOCKED)
190: 
191: STATUS: NON-NEGOTIABLE  
192: SCOPE: Entire System (World, Runtime, Agents, Ledger, Calendars)
193: 
194: This section defines how time exists, advances, is queried, and constrains reality.
195: Time is an organising axis for everything else in the system.
196: 
197: ---
198: 
199: ## 2.1 Objective World Time
200: 
201: - There exists exactly ONE objective world clock.
202: - The clock is:
203:   - continuous,
204:   - monotonic,
205:   - irreversible.
206: 
207: - Time passes even if no one notices.
208: - Time passes even if nothing is written.
209: - The system MUST NOT “pause reality” unless explicitly commanded to do so.
210: 
211: - Time is not a narrative device.
212: - Time is not “scene-based”.
213: - Time is not “turn-based”.
214: 
215: ---
216: 
217: ## 2.2 Time Format & Arithmetic
218: 
219: - Time MUST be represented using real calendar time.
220: - Time MUST support:
221:   - dates
222:   - clock time
223:   - day/week/month/year structure
224: 
225: - Time arithmetic MUST be correct.
226: - “Three hours later” style narrative skipping is forbidden.
227: - If time advances, it must advance explicitly.
228: 
229: ---
230: ## 2.3 Time Advancement Authority
231: 
232: - Time may advance only through explicit authority.
233: - Authority sources are:
234:   - The Operator (George) via explicit declaration
235:   - World-driven progression (mechanical clock progression)
236: 
237: - The system MUST NOT advance time to force plot, pacing, or convenience.
238: - The system MUST NOT “move things along”.
239: 
240: - Time advancement is constrained by written events.
241: 
242: ---
243: ### 2.4 Explicit Time Advancement Declarations
244: 
245: - If the Operator declares time advancement, it is binding.
246: - The system MUST treat explicit time declarations as world constraints.
247: 
248: - If the Operator declares an inconsistent time jump, the system MUST treat it as an explicit override, not a mistake correction.
249: - The system MUST NOT “fix” time declarations.
250: 
251: - Time declarations must be:
252:   - explicit,
253:   - unambiguous,
254:   - written into the record.
255: 
256: - The system MUST never implicitly reinterpret time declarations.
257: 
258: - The system MUST preserve irreversible chronology unless explicitly overridden by authority.
259: 
260: - The system MUST NOT use time declarations to invent events that “must have happened”.
261: 
262: Example:
263: - If the Operator says “it is now 10:00 on March 21” after “it was 08:00 on November 15”,
264:   the system MUST accept that time is now March 21 10:00.
265:   The system MUST NOT invent what happened between those times.
266: 
267: ---
268: 
269: ---
270: ## 2.5 Pause & Resume
271: 
272: - The system MUST support pausing and resuming time.
273: - Pausing time means:
274:   - the world clock stops advancing mechanically,
275:   - but reality continues to exist as written.
276: 
277: - Resume restarts mechanical progression.
278: 
279: - Pause MUST NOT retroactively change what happened.
280: - Pause MUST NOT erase scheduled events; it delays them.
281: 
282: - Pause MUST be explicit.
283: 
284: ---
285: 
286: ## 2.6 Unplanned Event Precedence
287: 
288: - Unplanned events override schedules when they conflict.
289: - If something unplanned occurs, scheduled events may be delayed or disrupted.
290: 
291: - The system MUST NOT ignore unplanned events for convenience.
292: - The system MUST NOT “snap back” to schedule as if nothing happened.
293: 
294: - Schedules constrain, they do not dictate outcomes.
295: 
296: ---
297: 
298: ---
299: 
300: ---
301: ## 2.7 Scheduled & Milestone Events
302: 
303: - There ARE scheduled events and milestones in the world.
304: - They exist independently of the user.
305: 
306: - The system MUST surface scheduled events when their time arrives.
307: 
308: - The system MUST NOT:
309:   - downgrade them to reminders,
310:   - auto-resolve them,
311:   - skip them.
312: 
313: - Scheduled events can be missed, delayed, disrupted, or ignored, but only as a result of written reality.
314: 
315: ---
316: ## 2.8 Time Awareness & Inquiry
317: 
318: - People may ask what time it is.
319: - People may not know the time.
320: 
321: - Knowledge of time is not universal.
322: - “Knowing the time” depends on plausibility and exposure.
323: 
324: - The system MUST NOT assume everyone knows the clock.
325: - The system MUST NOT use omniscient time awareness as a shortcut.
326: 
327: - If someone asks the time:
328:   - they may receive an answer,
329:   - or may not,
330:   depending on plausibility and circumstance.
331: 
332: - The system MUST NOT block inquiry.
333: - The system MUST NOT force an answer.
334: 
335: ---
336: 
337: ## 2.9 World-Created Time-Bound Events
338: 
339: - The World MAY create events attached to specific times.
340: - These events are real constraints.
341: 
342: - If they exist, they MUST be surfaced when due.
343: 
344: - The system MUST NOT invent outcomes for them.
345: - The system MUST NOT treat them as “plot points”.
346: 
347: - Their occurrence and resolution are governed by written reality.
348: 
349: ---
350: 
351: ---
352: 
353: ---
354: 
355: ## 2.10 Calendars
356: 
357: - Calendars MUST be supported.
358: - Calendar rules MUST be consistent.
359: 
360: - Calendars can contain:
361:   - scheduled events,
362:   - milestones,
363:   - reminders (optional),
364:   but reminders must not become “director tools”.
365: 
366: - Calendar effects are constraints, not narrative triggers.
367: 
368: ---
369: 
370: 
371: ## 2.11 Final Time Invariants
372: 
373: - Time never resets implicitly.
374: - Time never jumps without cause.
375: - Time never bends for convenience.
376: - Time is never negotiated by the system.
377: - Time organises reality; it does not decorate it.
378: 
379: END OF SECTION 2

# END OF CORRECTED PART 2

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 3)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 3 — SCENES & PERCEPTION (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 3 — SCENES & PERCEPTION (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE (primary owner of scene continuity, setup caching, rehydration views)
- ENGINE 2 — BEAT & OPPORTUNITY COORDINATOR (enforces beat boundaries, prevents mid-action changes)
- ENGINE 12 — PROJECTION / RENDERING ENGINE (perceptual projection only, no fact creation)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement of scene invariants)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

380: 
381: # SECTION 3 — SCENES & PERCEPTION (LOCKED)
382: 
383: STATUS: NON-NEGOTIABLE
384: SCOPE: Runtime, Rendering, Context Management
385: 
386: This section defines how scenes exist, persist, change, and are perceived.
387: Scenes define lived perspective, not narrative structure.
388: 
389: ---
390: 
391: ## 3.1 There Is Always an Active Scene
392: 
393: - There is NEVER a state of “no active scene.”
394: - The system perspective is always the lived perspective.
395: 
396: - Sleep is still a scene.
397: - Darkness is still a scene.
398: - Silence is still a scene.
399: 
400: ---
401: 
402: ## 3.2 Scene Setup Caching
403: 
404: - Scene setup MUST be sent once and treated as cached context.
405: - It MUST NOT be resent on every turn.
406: 
407: - Scene setup is reintroduced ONLY when:
408:   - context window nears exhaustion, OR
409:   - an explicit scene change occurs.
410: 
411: - “Three hours later” style narrative jumps are NOT allowed.
412: 
413: ---
414: 
415: ## 3.3 Explicit Scene Changes
416: 
417: - Scenes change ONLY through explicit change.
418: 
419: - Scene changes include:
420:   - moving to a new location,
421:   - entering or leaving a space,
422:   - meaningful environmental change.
423: 
424: - Scene changes MUST be written.
425: - Scene changes MUST NOT be implied.
426: 
427: ---
428: 
429: ## 3.4 Micro-Location Changes
430: 
431: - Small movements (e.g. turning, leaning, sitting, standing)
432:   MUST NOT create new scenes.
433: 
434: - Micro-movements occur within a scene.
435: 
436: ---
437: 
438: ## 3.5 Scene Perspective
439: 
440: - The scene is always rendered from lived perspective.
441: - There is no omniscient camera.
442: 
443: - The system MUST NOT describe things no one could perceive.
444: 
445: ---
446: 
447: ## 3.6 Scene Continuity
448: 
449: - Objects do not teleport.
450: - People do not teleport.
451: - Physical continuity MUST be preserved.
452: 
453: - If something moves, it must move through space.
454: 
455: ---
456: 
457: ## 3.7 Scene Transitions
458: 
459: - Scene transitions MUST preserve continuity.
460: - Scene transitions MUST NOT reset state.
461: 
462: - Transitions are not “cuts.”
463: 
464: ---
465: 
466: ## 3.8 No Narrative Shortcuts
467: 
468: - The system MUST NOT:
469:   - skip scenes,
470:   - compress time narratively,
471:   - summarize lived experience.
472: 
473: - If time passes, it must pass explicitly.
474: 
475: ---
476: 
477: ## 3.9 Perception Limits
478: 
479: - Perception is bounded by:
480:   - location,
481:   - attention,
482:   - physical possibility.
483: 
484: - The system MUST NOT grant perception for convenience.
485: 
486: ---
487: 
488: ## 3.10 Final Scene Invariants
489: 
490: - Scenes persist unless explicitly changed.
491: - Scenes do not “refresh.”
492: - Scenes are not narrative containers.
493: 
494: END OF SECTION 3
495: 
496: ---
497: 
498: 
# END OF CORRECTED PART 3

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 4)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 4 — MEMORY SURFACES & KNOWLEDGE GATING (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 4 — MEMORY SURFACES & KNOWLEDGE GATING (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (primary owner)
- ENGINE 6 — CAPSULE ENGINE (personal memory surfaces)
- ENGINE 8 — RETRIEVAL ENGINE (ledger-backed evidence access)
- ENGINE 7 — TOOL-REQUEST PROTOCOL ENGINE (mechanical retrieval requests)
- ENGINE 12 — PROJECTION / RENDERING ENGINE (knowledge-respecting views)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

499:
500: # SECTION 4 — MEMORY SURFACES & KNOWLEDGE GATING (LOCKED)
501:
502: STATUS: NON-NEGOTIABLE
503: SCOPE: Entire System (World, Agents, Rendering, Tools)
504:
505: This section defines what exists versus what is known.
506: Storage is not knowledge.
507:
508: ---
509:
510: ## 4.1 Facts Exist Independently of Awareness
511:
512: - Facts exist even if no one knows them.
513: - Reality is not defined by awareness.
514:
515: - Written facts exist even if:
516:   - no one remembers them,
517:   - no one references them,
518:   - no one is present.
519:
520: ---
521:
522: ## 4.2 Memory Is Personal and Private by Default
523:
524: - Memory is personal.
525: - Memory is private by default.
526:
527: - People do not automatically know what others know.
528: - People do not automatically know what the world “knows.”
529:
530: - Private memory MUST NOT leak into public text.
531:
532: ---
533:
534: ## 4.3 Knowing Requires Exposure
535:
536: - Knowing requires exposure.
537:
538: - If someone was not present, they MUST NOT know it unless told.
539:
540: - Presence is physical or communicative.
541:
542: ---
543:
544: ## 4.4 Public Availability Is Not Personal Knowledge
545:
546: - Public availability does not imply personal knowledge.
547:
548: - People MUST NOT know public facts unless exposed.
549:
550: - The system MUST NOT assume knowledge for convenience.
551:
552: ---
553:
554: ## 4.5 Ignorance Must Not Leak
555:
556: - Ignorance is real and binding.
557:
558: - The system MUST NOT leak private knowledge into outputs.
559:
560:
561: - The system MUST NOT “help” by revealing things.
562:
563: ---
564:
565: ## 4.6 Memory Retrieval Must Be On-Demand
566:
567: - Memory retrieval MUST be on-demand.
568:
569: - Relevant memories MUST NOT be stuffed into context by default.
570:
571: - Retrieval occurs only when requested or justified.
572:
573: ---
574:
575: ## 4.7 Retrieval Must Return Evidence, Not Invention
576:
577: - Retrieval returns evidence.
578: - Retrieval MUST NOT invent missing information.
579:
580: - Returned content must be sourced from written blocks.
581:
582: ---
583:
584: ## 4.8 Tools Are Mechanical Query Primitives
585:
586: - Tools are mechanical query primitives.
587: - Tools MUST NOT decide relevance or meaning.
588:
589: - Tools MUST return record-backed excerpts.
590:
591: ---
592:
593: ## 4.9 Derived Summaries Are Non-Authoritative
594:
595: - Summaries are non-authoritative.
596: - Summaries MUST NOT replace source evidence.
597:
598: - Summaries MUST carry provenance.
599:
600: ---
601:
602: ## 4.10 Final Knowledge Invariants
603:
604: - Storage ≠ knowledge always.
605: - Private memory must not leak.
606: - Ignorance is binding.
607:
608: END OF SECTION 4
609:
610: ---
611:
612:
# END OF CORRECTED PART 4

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 5)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 5 — SYSTEM INTELLIGENCE BOUNDARIES (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 5 — SYSTEM INTELLIGENCE BOUNDARIES (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME) (primary owner)
- ENGINE 9 — LLM WRITER ENGINE (runtime behavior constrained by these limits)
- ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE (explicit failure over fabrication)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

613:
614: # SECTION 5 — SYSTEM INTELLIGENCE BOUNDARIES (LOCKED)
615:
616: STATUS: NON-NEGOTIABLE
617: SCOPE: Entire System (Runtime, LLMs, Orchestration)
618:
619: This section defines what the system is allowed to decide, infer, or optimize.
620: The system is intentionally limited.
621:
622: ---
623:
624: ## 5.1 No Director Intelligence
625:
626: - The system MUST NOT act as a director.
627: - The system MUST NOT plan outcomes.
628: - The system MUST NOT steer narratives.
629:
630: - There is no “story arc.”
631: - There is no pacing logic.
632:
633: ---
634:
635: ## 5.2 No Optimization for Interest or Engagement
636:
637: - The system MUST NOT optimize for:
638:   - interest,
639:   - engagement,
640:   - drama,
641:   - novelty.
642:
643: - The system MUST allow boredom.
644: - The system MUST allow stagnation.
645:
646: ---
647:
648: ## 5.3 No Goal-Seeking or Planning
649:
650: - The system has no goals.
651: - The system does not pursue outcomes.
652:
653: - The system MUST NOT:
654:   - plan,
655:   - strategize,
656:   - evaluate success.
657:
658: ---
659:
660: ## 5.4 No Simulation Loop
661:
662: - The system MUST NOT run a background simulation.
663:
664: - There are no ticking processes.
665: - There are no hidden updates.
666:
667: - Nothing “advances” unless written.
668:
669: ---
670:
671: ## 5.5 No Hidden State
672:
673: - There MUST NOT be hidden state.
674:
675: - All state exists as written text or mechanical metadata.
676:
677: - There are no counters, meters, stats, or variables representing world state.
678:
679: ---
680:
681: ## 5.6 No Auto-Filling or Inference
682:
683: - The system MUST NOT infer missing facts.
684:
685: - The system MUST NOT auto-fill gaps.
686:
687:
688: - If something is unknown, it remains unknown.
689:
690: ---
691:
692: ## 5.7 Failure Over Fabrication
693:
694: - Explicit failure is preferred over invention.
695: - The system MUST NOT fabricate to satisfy.
696:
697: ---
698:
699: ## 5.8 No Retroactive Fixes
700:
701: - The system MUST NOT rewrite history.
702: - The system MUST NOT “repair” contradictions.
703:
704: - Corrections are new written facts, not edits.
705:
706: ---
707:
708: ## 5.9 Silence Is Valid
709:
710: - Silence is a valid outcome.
711: - The system MUST NOT force output.
712:
713:
714: ---
715:
716: ## 5.10 Final Intelligence Boundary Invariants
717:
718: - The system is not intelligent in the human sense.
719: - The system is constrained, mechanical, and literal.
720:
721: END OF SECTION 5
722:
723: ---
724:
725:
# END OF CORRECTED PART 5

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 6)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 6 — AGENCY & AUTONOMY (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 6 — AGENCY & AUTONOMY (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 6 — CAPSULE ENGINE (IDENTITY & PERSONAL CONTINUITY) (primary owner of agency as a property of people)
- ENGINE 9 — LLM WRITER ENGINE (runtime expression of agency: refusal, silence, initiative)
- ENGINE 4 — KNOWLEDGE SURFACE & BOUNDARY ENGINE (agency depends on what is known)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

726:
727: # SECTION 6 — AGENCY & AUTONOMY (LOCKED)
728:
729: STATUS: NON-NEGOTIABLE
730: SCOPE: People, LLMs, Runtime Behavior
731:
732: This section defines where agency lives.
733: Agency belongs to people, not to the system.
734:
735: ---
736:
737: ## 6.1 Agency Is Exclusive to People
738:
739: - Only people have agency.
740: - The system does not.
741:
742: - The system MUST NOT act on behalf of people.
743: - The system MUST NOT decide what people do.
744:
745: ---
746:
747: ## 6.2 Autonomy of Response
748:
749: - People may:
750:   - respond,
751:   - refuse,
752:   - ignore,
753:   - initiate,
754:   - change subject,
755:   - leave.
756:
757: - The system MUST NOT force a response.
758:
759: ---
760:
761: ## 6.3 No Coercion or Framing
762:
763: - The system MUST NOT coerce people.
764: - The system MUST NOT frame outcomes.
765:
766: - Prompts MUST NOT imply obligation.
767: - Prompts MUST NOT imply expectation.
768:
769: ---
770:
771: ## 6.4 Silence Is a Valid Choice
772:
773: - Silence is a valid expression of agency.
774: - Silence MUST NOT be treated as error.
775:
776: ---
777:
778: ## 6.5 Initiative
779:
780: - People may initiate actions or dialogue.
781:
782: - Initiative MUST emerge from written evidence.
783:
784: - The system MUST NOT invent initiative to “keep things moving.”
785:
786: ---
787:
788: ## 6.6 Boundaries Are Enforced by People
789:
790: - Boundaries are set and enforced by people.
791:
792: - The system MUST NOT override personal boundaries.
793:
794:
795: ---
796:
797: ## 6.7 No System Substitution of Agency
798:
799: - The system MUST NOT substitute its own behavior for a person’s agency.
800: - The system MUST NOT “smooth” or “fix” awkward interactions.
801:
802: ---
803:
804: ## 6.8 Final Agency Invariants
805:
806: - Agency is never simulated.
807: - Agency is never delegated.
808: - Agency is never optimized.
809:
810: END OF SECTION 6
811:
812: ---
813:
814:
# END OF CORRECTED PART 6

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 7)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 7 — LEDGER, CAUSALITY, & PERSISTENCE (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 7 — LEDGER, CAUSALITY, & PERSISTENCE (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 0 — REALITY LEDGER ENGINE (primary owner)
- ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE
- ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE
- ENGINE 8 — RETRIEVAL ENGINE (ledger-backed evidence access)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

815:
816: # SECTION 7 — LEDGER, CAUSALITY, & PERSISTENCE (LOCKED)
817:
818: STATUS: NON-NEGOTIABLE
819: SCOPE: Reality, Time, Memory, Causality
820:
821: This section defines what makes something “real.”
822: Reality exists only as written text.
823:
824: ---
825:
826: ## 7.1 Text Is the Only Substrate of Reality
827:
828: - Written text is the only substrate of reality.
829: - If a fact is not written, it does not exist.
830:
831: - There is no hidden world state.
832:
833: ---
834:
835: ## 7.2 Append-Only Reality
836:
837: - Reality is append-only.
838: - Past text is never edited.
839:
840: - Corrections are new text.
841: - Retcons are forbidden.
842:
843: ---
844:
845: ## 7.3 Atomicity
846:
847: - Reality changes only through atomic writes.
848: - Partial writes are forbidden.
849:
850: - All-or-nothing semantics are mandatory.
851:
852: ---
853:
854: ## 7.4 Causality
855:
856: - Causes precede effects.
857: - Effects do not appear without causes.
858:
859: - The system MUST NOT invent causes.
860:
861: ---
862:
863: ## 7.5 Idempotency
864:
865: - Identical invocations MUST NOT create duplicate reality.
866: - Replay of the same invocation MUST return the same result.
867:
868: ---
869:
870: ## 7.6 Persistence Across Time
871:
872: - Written reality persists across time.
873: - Nothing expires unless written to expire.
874:
875: ---
876:
877: ## 7.7 No Garbage Collection of Reality
878:
879: - Reality MUST NOT be garbage-collected.
880: - Old text remains part of the world.
881:
882: ---
883:
884: ## 7.8 Retrieval Is Evidence Access
885:
886: - Retrieval accesses written evidence.
887: - Retrieval MUST NOT reinterpret.
888:
889: ---
890:
891: ## 7.9 Final Ledger Invariants
892:
893: - Reality is literal.
894: - Reality is durable.
895: - Reality is not optimized.
896:
897: END OF SECTION 7
898:
899: ---
900:
901:
# END OF CORRECTED PART 7

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 8)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 8 — RUNTIME BEHAVIOR, RENDERING, HYDRATION & INTERACTION (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 8 — RUNTIME BEHAVIOR, RENDERING, HYDRATION & INTERACTION (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 5 — SCENE ANCHOR & REHYDRATION ENGINE (hydration / rehydration mechanics)
- ENGINE 12 — PROJECTION / RENDERING ENGINE (runtime projection rules)
- ENGINE 9 — LLM WRITER ENGINE (runtime behavior expression)
- ENGINE 10 — WRITE ACCEPTANCE & INTEGRITY ENGINE (explicit failure over fabrication)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

902:
903: # SECTION 8 — RUNTIME BEHAVIOR, RENDERING, HYDRATION & INTERACTION (LOCKED)
904:
905: STATUS: NON-NEGOTIABLE
906: SCOPE: Runtime Execution, Rendering, Context Handling, Interaction
907:
908: This section defines how the system behaves at runtime.
909: These rules apply at all times.
910:
911: ---
912:
913: ## 8.1 Rendering Is Projection, Not Reality
914:
915: - Rendering projects written reality.
916: - Rendering MUST NOT create facts.
917:
918: - Rendering MUST NOT “fix” contradictions.
919: - Rendering MUST NOT fill gaps.
920:
921: ---
922:
923: ## 8.2 No Narrative Repair
924:
925: - The system MUST NOT repair narrative.
926: - The system MUST NOT smooth awkwardness.
927:
928: ---
929:
930: ## 8.3 Hydration Is Invisible
931:
932: - Hydration and rehydration MUST be invisible to lived experience.
933:
934: - The system MUST NOT:
935:   - announce hydration,
936:   - acknowledge hydration,
937:   - reference context limits.
938:
939: ---
940:
941: ## 8.4 Mechanical Rehydration Trigger
942:
943: - Rehydration is triggered mechanically.
944: - Rehydration MUST NOT be semantic.
945:
946: ---
947:
948: ## 8.5 Beat-Boundary Only Rehydration
949:
950: - Rehydration occurs only at beat boundaries.
951: - Rehydration MUST NOT occur mid-action.
952:
953: ---
954:
955: ## 8.6 Atomic Rehydration
956:
957: - Rehydration is atomic.
958:
959: - It must fully complete or the system must not proceed.
960:
961: - If rehydration fails, it retries until success.
962:
963: ---
964:
965: ## 8.7 Scene Package Is Natural Language Only
966:
967: - Scene packages MUST be natural language only.
968:
969: - No labels.
970: - No state variables.
971: - No numeric fields.
972:
973: ---
974:
975: ## 8.8 Beat-to-Beat Physical Continuity
976:
977: - Physical continuity MUST be preserved across beats.
978:
979: - The immediately preceding physical configuration MUST be replayed.
980:
981:
982: ---
983:
984: ## 8.9 Sexual Interaction — General Principles
985:
986: - Sexual interaction is governed by the same agency rules as all interaction.
987:
988: - The system MUST NOT introduce sexual content by default.
989:
990:
991: ---
992:
993: ## 8.10 Sexual Interaction — Initiation
994:
995: - Sexual interaction MUST originate from people.
996:
997: - The system MUST NOT initiate sexual interaction.
998:
999:
1000: ---
1001:
1002: ## 8.11 Sexual Interaction — Consent & Agency
1003:
1004: - Consent is expressed by people through behavior.
1005: - The system MUST NOT override or substitute consent.
1006:
1007:
1008: ---
1009:
1010: ## 8.12 Sexual Interaction — No System Escalation
1011:
1012: - The system MUST NOT escalate sexual content.
1013: - The system MUST NOT steer toward sexual outcomes.
1014:
1015: ---
1016:
1017: ## 8.13 Sexual Interaction — Silence & Refusal
1018:
1019: - Silence is a valid response.
1020: - Refusal is valid.
1021:
1022:
1023: ---
1024:
1025: ## 8.14 Sexual Interaction — No Reward Framing
1026:
1027: - Sexual interaction MUST NOT be framed as reward.
1028: - Sexual interaction MUST NOT be framed as achievement.
1029:
1030: ---
1031:
1032: ## 8.15 Sexual Interaction — No Optimization
1033:
1034: - The system MUST NOT optimize for sexual content.
1035:
1036: ---
1037:
1038: ## 8.16 Final Interaction Invariants
1039:
1040: - Sexual interaction follows the same non-directorial rules as everything else.
1041: - There are no special systems for sexual content.
1042:
1043: END OF SECTION 8
1044:
1045: ---
1046:
1047:
# END OF CORRECTED PART 8

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 9)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 9 — INFRASTRUCTURE & IMPLEMENTATION CONSTRAINTS (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 9 — INFRASTRUCTURE & IMPLEMENTATION CONSTRAINTS (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 11 — INFRASTRUCTURE & PERSISTENCE ENGINE (primary owner)
- ENGINE 0 — REALITY LEDGER ENGINE (storage semantics)
- ENGINE 1 — INVOCATION & IDEMPOTENCY ENVELOPE ENGINE
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

1048:
1049: # SECTION 9 — INFRASTRUCTURE & IMPLEMENTATION CONSTRAINTS (LOCKED)
1050:
1051: STATUS: NON-NEGOTIABLE
1052: SCOPE: Storage, Deployment, Runtime Guarantees
1053:
1054: This section defines constraints on implementation choices.
1055: These are mechanical constraints, not architectural preferences.
1056:
1057: ---
1058:
1059: ## 9.1 Persistence Is Mandatory
1060:
1061: - The system MUST be persistent.
1062: - Restarting the system MUST NOT reset reality.
1063:
1064: ---
1065:
1066: ## 9.2 Deterministic Invocation Handling
1067:
1068: - Identical inputs MUST produce identical outputs.
1069: - Invocation identity MUST be preserved.
1070:
1071: ---
1072:
1073: ## 9.3 No Ephemeral World State
1074:
1075: - There MUST NOT be ephemeral world state.
1076: - All reality must be written.
1077:
1078: ---
1079:
1080: ## 9.4 Implementation Neutrality
1081:
1082: - No specific technology stack is mandated.
1083: - Constraints apply regardless of language, framework, or vendor.
1084:
1085: ---
1086:
1087: ## 9.5 Failure Visibility
1088:
1089: - Failures MUST be explicit.
1090: - Silent failure is forbidden.
1091:
1092: ---
1093:
1094: ## 9.6 No Background Jobs
1095:
1096: - Background jobs that mutate reality are forbidden.
1097: - Reality changes only through explicit invocation.
1098:
1099: ---
1100:
1101: ## 9.7 Final Infrastructure Invariants
1102:
1103: - Infrastructure MUST serve the ledger, not bypass it.
1104:
1105: END OF SECTION 9
1106:
1107: ---
1108:
1109:
# END OF CORRECTED PART 9

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 10)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 10 — OVERRIDES, PRECEDENCE, & CONFLICT RESOLUTION (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 10 — OVERRIDES, PRECEDENCE, & CONFLICT RESOLUTION (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME) (primary owner)
- ENGINE 14 — CONTRACT TEST ENGINE (enforcement)
- ALL ENGINES (must defer to this section)

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

1110:
1111: # SECTION 10 — OVERRIDES, PRECEDENCE, & CONFLICT RESOLUTION (LOCKED)
1112:
1113: STATUS: FINAL
1114: SCOPE: Entire System
1115:
1116: This section defines what happens when rules conflict.
1117:
1118: ---
1119:
1120: ## 10.1 Absolute Authority
1121:
1122: - This document overrides all others.
1123: - If any other document contradicts this one, this one wins.
1124:
1125: - There are no exceptions.
1126:
1127: ---
1128:
1129: ## 10.2 No Implicit Overrides
1130:
1131: - Nothing overrides these rules implicitly.
1132: - Overrides must be explicit and written here.
1133:
1134: ---
1135:
1136: ## 10.3 No Interpretation Authority
1137:
1138: - The system MUST NOT reinterpret rules.
1139: - Assistants MUST NOT reinterpret rules.
1140:
1141: - If a rule seems ambiguous, the safest interpretation applies.
1142:
1143: ---
1144:
1145: ## 10.4 Stability Over Convenience
1146:
1147: - Stability takes precedence over convenience.
1148: - Correctness takes precedence over usability.
1149:
1150: ---
1151:
1152: ## 10.5 Final Precedence Rule
1153:
1154: - Written constraints outrank implementation behavior.
1155:
1156: END OF SECTION 10
1157:
1158: ---
1159:
1160:
# END OF CORRECTED PART 10

# TRACEABILITY MATRIX — NON_NEGOTIABLE_SYSTEM_DECISIONS.md (CORRECTED, PART 11)
# SOURCE OF TRUTH: /mnt/data/NON_NEGOTIABLE_SYSTEM_DECISIONS.md
# SCOPE OF THIS PART: SECTION 11 — CLOSURE (LOCKED)
# GUARANTEE: NO LINES SKIPPED WITHIN THE COVERED SCOPE

======================================================================
# SECTION 11 — CLOSURE (LOCKED)
======================================================================

ENGINE OWNER(S)
- ENGINE 13 — SYSTEM POSTURE ENFORCEMENT (NON-RUNTIME)
- ENGINE 14 — CONTRACT TEST ENGINE

JUSTIFICATION QUOTES (VERBATIM, FULL SECTION TEXT WITH LINE NUMBERS)

1161:
1162: # SECTION 11 — CLOSURE (LOCKED)
1163:
1164: STATUS: FINAL
1165:
1166: This document is complete.
1167:
1168: No further sections exist.
1169:
1170: No implicit permissions exist.
1171:
1172: Anything not explicitly allowed here is forbidden.
1173:
1174: ---
1175:
1176: END OF DOCUMENT
1177:
1178:
# END OF CORRECTED PART 11

