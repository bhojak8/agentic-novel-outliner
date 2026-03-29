/**
 * Non-Fiction Genre Definitions
 */

export const NONFICTION_GENRES = {
  narrative: {
    name: 'Narrative Non-Fiction',
    icon: '📰',
    description: 'Story-driven investigation — the HR MEANS HUMAN REMOVAL standard',
    chapterLength: '20–30 pages per chapter',
    chapterRange: '10-16',
    typicalChapters: 13,
    characterRequirements: `
   - PRIMARY NARRATIVE CHARACTER: Full name, situation, arc (believer → witness → fighter)
     Their story is the emotional spine that runs through every chapter.
   - GHOST CHARACTER: Someone who appears peripherally, disappears, returns at the end as a mirror.
   - 3-5 ILLUSTRATIVE CHARACTERS: Each appears in specific chapters to personalize that chapter's argument.
   - YOUR VOICE: Where the author's personal experience enters (Preface, specific chapters, Afterword).`,
    evidenceRequirements: `
   - Named studies, court cases, legislation, surveys (with years and institutions)
   - Corporate examples (named companies, named CEOs, specific actions, specific dates)
   - Data points woven into narrative (never a data dump — statistics earn their place through human stories)
   - Expert voices (named, with credentials and specific quotes or findings)`,
    engagementDevices: `
   - "REAL PLAYBOOK" SIDEBARS: Step-by-step breakdowns the reader can use immediately. Numbered, actionable. 
     (e.g., "The 5-Step Quiet Exit Playbook," "How to Protect Your Reference Before You Need To")
   - "WHAT I WISH I'D KNOWN" BOXES: First-person reflections — the wisdom of hindsight, delivered with warmth.
   - DATA TABLES: Key comparisons or inventories presented as tables for visual impact.
   - INTERLUDES: Short standalone sections between parts (like "The Human Math" — raw numbers, no commentary).
   - INFOGRAPHICS: Placed for visual relief and shareability (timeline, map, comparison chart).`,
    sidebarRequirements: `
  - Title each sidebar with an actionable or revelatory headline
  - "The Real Playbook Sidebar #[N]" format for actionable sidebars
  - "What I Wish I'd Known" Box #[N] for reflective sidebars
  - Each sidebar must be self-contained — readable and useful in isolation
  - Content direction: not full text, but specific enough that a writer knows exactly what to include`,
    chapterSpecificRequirements: `
• GLOBAL STORIES:
  - 2-3 international examples per chapter (different countries, different industries)
  - Each illustrating the same systemic pattern in a different context

• NARRATIVE CHARACTER THREAD:
  - Specific scene: what happens to the primary character in this chapter
  - Emotional detail: their internal state, a specific physical detail, a precise observation
  - How their personal experience illustrates or mirrors the chapter's argument`,
    referenceRequirements: `
6. EPIGRAPH LIST
   | Chapter | Epigraph Text | Source | Thematic Purpose |

7. INFOGRAPHIC PLACEMENTS
   | Infographic | Chapter | Type (Timeline/Map/Chart/Table) | Purpose |`,
    phase1Requirements: `Narrative NF needs a primary character whose arc spans the entire book (like Daniel Reyes in HR), a ghost character, illustrative characters for specific chapters, and the author's personal voice positioned in specific places. The argument must build like a legal case — evidence presented, verdict delivered by the reader.`,
    phase2Requirements: `Every chapter needs an epigraph, opening strategy (rotated), chapter personality (mode/feel/pacing), section-by-section argument breakdown, sidebar placements with titles and content direction, narrative character scenes with emotional detail, and a chapter close that hooks the next chapter.`
  },

  selfhelp: {
    name: 'Self-Help / Prescriptive',
    icon: '🧭',
    description: 'Framework-based books that teach readers to transform specific areas of their lives',
    chapterLength: '15–22 pages per chapter',
    chapterRange: '8-14',
    typicalChapters: 10,
    characterRequirements: `
   - THE READER AS PROTAGONIST: The transformation arc IS the reader's. Map it.
   - CASE STUDY CHARACTERS: 5-8 named people (real or composite) whose stories illustrate key principles.
   - THE AUTHOR: Positioned as trusted guide who has done the work (not guru, not professor).`,
    evidenceRequirements: `
   - Research backing for each framework/concept (named studies, not "studies show")
   - Before/after data: measurable results from applying the framework
   - Expert endorsements or supporting perspectives (named professionals)`,
    engagementDevices: `
   - EXERCISES: End-of-chapter exercises the reader can do TODAY (not vague reflections — specific actions)
   - SELF-ASSESSMENT TOOLS: Checklists, rating scales, decision matrices
   - QUICK-REFERENCE SUMMARIES: Key principles in scannable format
   - TRANSFORMATION TRACKERS: Ways to measure progress across the book's arc`,
    sidebarRequirements: `
  - "TRY THIS NOW" boxes with immediate-action exercises
  - "THE FRAMEWORK" summaries with visual structure (steps, matrix, flowchart direction)
  - "CASE STUDY" boxes with named before/after stories`,
    chapterSpecificRequirements: `
• FRAMEWORK DELIVERY:
  - What new concept/tool is introduced in this chapter?
  - How is it connected to the previous chapter's concept? (Building blocks, not random)
  - Exercise or application at chapter end

• TRANSFORMATION ARC:
  - Where is the reader on their transformation journey at this chapter?
  - What resistance or objection might they have? Address it.
  - What "aha moment" should this chapter deliver?`,
    referenceRequirements: `
6. FRAMEWORK ARCHITECTURE
   | Concept | Chapter | Prerequisite | Builds Toward | Exercise |

7. EXERCISE INVENTORY
   | Exercise | Chapter | Type (Action/Reflection/Assessment) | Time Required |`,
    phase1Requirements: `Self-help needs a clear framework architecture (concepts build on each other), a reader transformation arc (where they start → where they end), and the author positioned as guide (not guru). Each chapter must deliver ONE actionable concept with an exercise.`,
    phase2Requirements: `Every chapter needs framework delivery (new concept + connection to previous), transformation arc tracking (where the reader is on their journey), exercises with specific instructions, and resistance anticipation (what objections the reader might have at this point).`
  },

  memoir: {
    name: 'Biography / Memoir',
    icon: '👤',
    description: 'Life stories told through thematic lenses with narrative craft',
    chapterLength: '18–28 pages per chapter',
    chapterRange: '12-20',
    typicalChapters: 16,
    characterRequirements: `
   - THE SUBJECT: Full life profile, but organized by THEME, not just chronology.
   - SUPPORTING CHARACTERS: People who shaped, challenged, or mirrored the subject.
   - THE ABSENT FIGURE: Someone whose presence/absence is felt throughout.`,
    evidenceRequirements: `
   - Primary sources: letters, diaries, interviews, documents
   - Historical context: what was happening in the world at each life stage
   - Multiple perspectives: how others experienced the same events differently`,
    engagementDevices: `
   - SCENE-BASED CHAPTERS: Key life moments written as fully realized scenes, not summaries
   - LETTERS/DOCUMENTS: Real or sourced primary material integrated into narrative
   - TIMELINE MARKERS: Historical context woven alongside personal chronology`,
    sidebarRequirements: `
  - Historical context boxes (what was happening in the wider world during this period)
  - Other voices (quotes from family, friends, colleagues about the same events)`,
    chapterSpecificRequirements: `
• THEMATIC LENS:
  - What theme does this chapter explore through the subject's life?
  - How does this life event illuminate something universal?

• SCENE vs. SUMMARY DECISIONS:
  - Which moments are dramatized as scenes (dialogue, setting, action)?
  - Which are summarized as narrative bridges?
  - The ratio should favor scenes for emotional turning points.`,
    referenceRequirements: `
6. LIFE TIMELINE
   | Date | Event | Significance | Chapter | Scene or Summary |

7. THEMATIC LENS MAP
   | Theme | Chapters | Key Scenes |`,
    phase1Requirements: `Biography/memoir needs thematic lenses (organizing a life by themes, not just chronology), scene vs. summary decisions (what gets full dramatization), and an absent figure whose presence shapes the narrative.`,
    phase2Requirements: `Every chapter needs a thematic lens (what theme this life chapter illuminates), scene vs. summary ratios, historical context integration, and multiple perspectives on key events.`
  },

  business: {
    name: 'Business / Finance',
    icon: '💼',
    description: 'Strategic insights, market analysis, and leadership frameworks',
    chapterLength: '15–22 pages per chapter',
    chapterRange: '10-15',
    typicalChapters: 12,
    characterRequirements: `
   - CASE STUDY COMPANIES: Named companies with specific situations, not hypotheticals.
   - PROTAGONIST COMPANIES: 2-3 whose stories thread through multiple chapters.
   - CAUTIONARY TALES: Companies that got it wrong — with specific, named detail.`,
    evidenceRequirements: `
   - Market data (sourced, dated, specific)
   - Financial performance metrics (before/after implementing the book's thesis)
   - Named executive decisions and their documented outcomes
   - Industry reports and analyst perspectives (named, not "analysts say")`,
    engagementDevices: `
   - CASE STUDY DEEP DIVES: Full narrative treatment of business scenarios
   - FRAMEWORK DIAGRAMS: Strategic tools presented with visual structure direction
   - IMPLEMENTATION CHECKLISTS: Step-by-step guides for applying concepts
   - ROI CALCULATORS: Ways to measure the financial impact of the book's advice`,
    sidebarRequirements: `
  - "IMPLEMENTATION GUIDE" boxes with step-by-step application
  - "CASE STUDY" boxes with named companies and specific outcomes
  - Data visualization direction (charts, comparisons, before/after metrics)`,
    chapterSpecificRequirements: `
• STRATEGIC FRAMEWORK:
  - What business concept or framework is this chapter built around?
  - Real-world application: which named company demonstrates this?
  - Counter-example: who did the opposite and what happened?

• ACTIONABLE TAKEAWAY:
  - What can the reader DO on Monday morning after reading this chapter?
  - Implementation complexity: simple/moderate/requires team`,
    referenceRequirements: `
6. CASE STUDY INDEX
   | Company | Chapter(s) | Lesson | Outcome |

7. FRAMEWORK INVENTORY
   | Framework | Chapter | Application | Implementation Steps |`,
    phase1Requirements: `Business books need named case study companies (not hypotheticals), a clear strategic thesis, implementation frameworks that build on each other, and ROI-oriented evidence. Every chapter must answer "what do I do Monday morning?"`,
    phase2Requirements: `Every chapter needs a strategic framework, named company examples (success and failure), actionable takeaways with implementation complexity ratings, and data-backed claims (sourced and dated).`
  },

  science: {
    name: 'Science / Technology',
    icon: '🔬',
    description: 'Making complex concepts accessible through narrative and analogy',
    chapterLength: '18–26 pages per chapter',
    chapterRange: '10-16',
    typicalChapters: 13,
    characterRequirements: `
   - THE SCIENTISTS: Named researchers whose work drives the narrative.
   - THE DISCOVERERS: People who made the breakthroughs — told as human stories, not footnotes.
   - AFFECTED PERSONS: Real people whose lives were changed by the science/technology.`,
    evidenceRequirements: `
   - Published research (journal, year, key findings — specific)
   - Experimental evidence described as narratives (the experiment as a story)
   - Expert interviews (named scientists, their exact perspective)
   - Data visualized through analogy (make numbers feel-able, not just know-able)`,
    engagementDevices: `
   - ANALOGY BANK: Complex concepts explained through familiar parallels
   - EXPERIMENT NARRATIVES: Key experiments told as stories with drama and surprise
   - IMPLICATIONS CHAINS: "This means..." cascading from scientific finding to daily-life impact
   - "WHAT WE DON'T KNOW YET" BOXES: Honest about the edges of knowledge`,
    sidebarRequirements: `
  - "IN PLAIN ENGLISH" boxes (complex concept → accessible explanation)
  - "THE EXPERIMENT" boxes (key experiments told as stories)
  - "WHAT THIS MEANS FOR YOU" boxes (personal implications of the science)`,
    chapterSpecificRequirements: `
• COMPLEXITY LADDER:
  - What concept level is the reader at entering this chapter?
  - What new concept is introduced?
  - What analogy makes it accessible?
  - What was the "aha moment" planned for this chapter?

• NARRATIVE SCIENCE:
  - Which researcher's story carries this chapter?
  - What was the moment of discovery/breakthrough?
  - How does the human story make the concept stick?`,
    referenceRequirements: `
6. COMPLEXITY LADDER
   | Chapter | Concept | Builds On | Analogy | Prerequisite Knowledge |

7. RESEARCH CITATION MAP
   | Study | Researcher | Year | Finding | Chapter Used |`,
    phase1Requirements: `Science books need a complexity ladder (concepts build from accessible to advanced), an analogy bank (familiar parallels for every complex concept), and named researcher stories. Every concept needs a human narrative to make it stick.`,
    phase2Requirements: `Every chapter needs complexity ladder positioning (reader's level entering/exiting), a named researcher's story, analogy for the key concept, and "what this means for you" implications. Show the DRAMA of discovery.`
  },

  truecrime: {
    name: 'True Crime',
    icon: '🔒',
    description: 'Investigation narratives with procedural detail and human stakes',
    chapterLength: '20–28 pages per chapter',
    chapterRange: '12-18',
    typicalChapters: 15,
    characterRequirements: `
   - THE VICTIM(S): Humanized fully — not just names in a case file.
   - THE INVESTIGATOR(S): Their methods, intuitions, mistakes, breakthroughs.
   - THE PERPETRATOR: If known — their background, psychology, how they were identified.
   - THE COMMUNITY: How the crime affected the wider world around it.`,
    evidenceRequirements: `
   - Case files, court records, police reports (sourced)
   - Forensic evidence and its significance (explained for lay readers)
   - Timeline of events with precision (dates, times, locations)
   - Legal proceedings and their outcomes`,
    engagementDevices: `
   - EVIDENCE TIMELINES: Chronological presentation of key discoveries
   - PROCEDURAL DETAIL: How investigations actually work (not TV versions)
   - TRIAL EXCERPTS: Key testimony moments
   - COMMUNITY IMPACT: How the crime rippled through people's lives`,
    sidebarRequirements: `
  - Evidence timeline boxes (chronological discovery)
  - "HOW THIS WORKS" boxes (forensic/investigative procedures explained)
  - Map/geography boxes (crime scene, key locations)`,
    chapterSpecificRequirements: `
• INVESTIGATION PACE:
  - What discovery drives this chapter?
  - What dead end or false lead creates tension?
  - What piece of evidence changes the direction?

• REVELATION ARCHITECTURE:
  - What does the reader know that investigators didn't at this point?
  - What suspension of disbelief is required?
  - The specific "I didn't see that coming" moment in this chapter`,
    referenceRequirements: `
6. EVIDENCE TIMELINE
   | Date | Discovery | Significance | Led To | Chapter |

7. INVESTIGATION PROGRESS
   | Chapter | Key Discovery | Dead End | Theory Status |`,
    phase1Requirements: `True crime needs a fully mapped evidence timeline, humanized victim profiles, detailed investigation arc (theories formed → tested → revised), and revelation architecture (what the reader learns when, and how close it mirrors what investigators knew).`,
    phase2Requirements: `Every chapter needs investigation pacing (discovery → dead end → breakthrough), revelation architecture (reader knowledge vs. investigator knowledge), and procedural authenticity. Humanize the victim in every chapter — they are not just a case number.`
  },

  history: {
    name: 'History',
    icon: '📜',
    description: 'Bringing the past alive through narrative, analysis, and present-day relevance',
    chapterLength: '22–30 pages per chapter',
    chapterRange: '14-22',
    typicalChapters: 18,
    characterRequirements: `
   - HISTORICAL FIGURES: Named individuals whose actions shaped events.
   - ORDINARY WITNESSES: People who experienced the events from below — letters, diaries, testimony.
   - MODERN VOICES: Historians, analysts, who provide contemporary interpretation.`,
    evidenceRequirements: `
   - Primary sources (documents, letters, speeches, records — dated)
   - Archaeological/archival evidence
   - Multiple perspectives on the same events (not just the winner's version)
   - Historiographic debates (where do historians disagree?)`,
    engagementDevices: `
   - SCENE RECONSTRUCTION: Key historical moments written as fully realized scenes
   - PRIMARY SOURCE EXCERPTS: Actual words from the period integrated into narrative
   - THEN vs. NOW: Present-day relevance threads connecting past to present
   - MAPS AND TIMELINES: Geographic and chronological context`,
    sidebarRequirements: `
  - "IN THEIR OWN WORDS" boxes (primary source quotes)
  - "THE DEBATE" boxes (where historians disagree)
  - "WHY THIS MATTERS NOW" boxes (present-day relevance)`,
    chapterSpecificRequirements: `
• PERIOD IMMERSION:
  - What does the reader SEE, HEAR, SMELL in this chapter?
  - What daily-life detail grounds the big events in human experience?

• MULTIPLE PERSPECTIVES:
  - Whose version of events is presented?
  - Whose version is MISSING? Is that noted?

• PRESENT-DAY THREAD:
  - What contemporary parallel makes this historical chapter feel urgent?`,
    referenceRequirements: `
6. PRIMARY SOURCE INDEX
   | Source | Date | Type | Chapter | Significance |

7. PRESENT-DAY RELEVANCE MAP
   | Historical Event | Modern Parallel | Chapter |`,
    phase1Requirements: `History books need scene reconstruction plans (key moments written as fully realized scenes, not summaries), multiple perspective tracking, primary source integration, and a present-day relevance thread that makes history feel urgent.`,
    phase2Requirements: `Every chapter needs period immersion (sensory details), multiple perspectives (whose view, whose is missing), primary source integration, and a present-day relevance thread. History must feel like it's happening NOW to the reader.`
  },

  essays: {
    name: 'Essay Collection',
    icon: '✍️',
    description: 'Thematically linked essays that build a cumulative argument',
    chapterLength: '12–20 pages per essay',
    chapterRange: '8-16',
    typicalChapters: 12,
    unitName: 'essay',
    characterRequirements: `
   - THE ESSAYIST'S VOICE: The author IS the character. Their perspective, evolution, contradictions.
   - SUBJECTS: People, events, ideas that each essay examines.`,
    evidenceRequirements: `
   - Personal observation and experience (the essayist's primary tool)
   - Cultural reference (books, films, art, events that illuminate the point)
   - Reported detail (interviews, observations, specific scenes witnessed)`,
    engagementDevices: `
   - ESSAY SEQUENCING: Each essay illuminates the next — the collection tells a meta-story
   - REGISTER SHIFTS: Some essays are funny, some are devastating, some are analytical
   - CONNECTIVE TISSUE: Recurring themes, images, or questions across essays
   - THE OPENING AND CLOSING ESSAYS: Specially calibrated to frame the collection`,
    sidebarRequirements: `
  - Minimal sidebars — essays are self-contained
  - If used: "FURTHER READING" or "COUNTERARGUMENT" boxes`,
    chapterSpecificRequirements: `
• ESSAY IDENTITY:
  - What is this essay's CENTRAL IMAGE or QUESTION?
  - How does it connect to the essays before and after it?
  - What register does it operate in? (Humorous/devastating/analytical/observational)

• CUMULATIVE ARGUMENT:
  - What does this essay add to the collection's meta-argument?
  - If removed, what would be lost?`,
    referenceRequirements: `
6. COLLECTION ARCHITECTURE
   | Essay | Central Question | Register | Connection to Previous | Connection to Next |

7. THEMATIC THREADS
   | Theme | Essays Where It Appears | Evolution Across Collection |`,
    phase1Requirements: `Essay collections need a sequencing logic (why this order), a cumulative meta-argument (the collection proves something no single essay does), register variation plan (humor → devastation → analysis), and connective tissue (themes/images that recur and evolve).`,
    phase2Requirements: `Every essay needs a central image or question, a defined register (humorous/devastating/analytical), connection notes to adjacent essays, and a contribution to the collection's cumulative argument. If an essay could be removed without loss, rethink it.`
  }
};
