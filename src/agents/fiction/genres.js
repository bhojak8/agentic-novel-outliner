/**
 * Fiction Genre Definitions
 * Each genre has specific structural requirements, scene requirements,
 * and outline customizations that make the outline genre-authentic.
 */

export const FICTION_GENRES = {
  literary: {
    name: 'Literary Fiction',
    icon: '🎭',
    description: 'Character-driven novels with thematic depth and prose excellence',
    chapterWordCount: '4,000–6,000',
    chapterRange: '18-28',
    typicalChapters: 24,
    structuralRequirements: `
   Use a character-driven 3-Act structure, but the "acts" may not correspond to traditional plot beats.
   The inciting incident may be internal (a realization, a shift in perception) rather than external.
   The climax may be a moment of understanding rather than a confrontation.
   Dual or non-linear timelines are available if they serve the thematic architecture.
   The structural spine is the protagonist's INTERNAL transformation, not the external plot.`,
    thematicRequirements: `
   - Literary fiction is ABOUT something beyond its plot. The theme is not decoration — it is the engine.
   - Each chapter must advance the thematic argument, not just the plot.
   - Identify at least 3 symbolic objects/motifs and plan their placement across the novel.`,
    worldBuildingRequirements: `
   - Setting as character: the environment must reflect, contrast with, or pressure the protagonist's internal state.
   - Sensory specificity: one defining sensory detail per major setting that recurs and deepens.
   - Socioeconomic texture: class, money, work, and daily-life details that ground the story in material reality.`,
    sceneRequirements: `
  - Subtext layer: What is NOT being said in this scene that the reader should feel?
  - Prose register: Is this section lyrical, spare, fragmented, flowing? Each scene has a texture.
  - Image/motif: Does a recurring image appear in this scene? How has it evolved?`,
    chapterSpecificRequirements: `
• PROSE TEXTURE NOTES:
  - Where in this chapter should the prose slow down and become more lyrical?
  - Where should it become stripped and spare?
  - What is the dominant sensory mode (visual, auditory, tactile, olfactory)?`,
    referenceRequirements: `
6. MOTIF/SYMBOL TRACKER
   | Symbol/Motif | First Appearance | Subsequent Appearances | Evolution |
   
7. PROSE TEXTURE MAP
   | Chapter | Dominant Register | Key Slow Passage | Key Spare Passage |`,
    phase1Requirements: `Literary fiction demands thematic architecture. The outline must identify: the central thematic question, how each character embodies a different answer, symbolic objects that evolve across chapters, and the protagonist's internal transformation arc independent of plot.`,
    phase2Requirements: `Each chapter needs prose texture notes (where to slow/speed, sensory modes), subtext layers (what's unsaid), and motif tracking. The opening should use varied literary strategies (in medias res, lyrical observation, fragments, etc.).`
  },

  thriller: {
    name: 'Thriller / Suspense',
    icon: '🔫',
    description: 'High-stakes, fast-paced novels driven by escalating danger',
    chapterWordCount: '2,500–4,000',
    chapterRange: '25-40',
    typicalChapters: 30,
    structuralRequirements: `
   Use a tension-escalation model. Three acts but with a ticking clock or deadline pressure.
   Short chapters. Frequent cliffhangers. Multiple POV rotations if applicable.
   The midpoint is not just a reversal — it's a FUNDAMENTAL ESCALATION where the stakes become life/death.
   Plot twists must be FAIR — the reader must be able to look back and see the clues were there.
   Include a twist map: what the reader believes at each act break vs. reality.`,
    thematicRequirements: `
   - Thrillers still need thematic depth. What moral question does the danger illuminate?
   - The antagonist's philosophy must be the thematic counterargument to the protagonist's.`,
    worldBuildingRequirements: `
   - Procedural authenticity: whatever world the thriller inhabits (legal, medical, espionage, tech) must feel researched and real.
   - Location as obstacle: settings should create pressure on the characters, not just contain them.
   - Technology/systems: if technology is relevant, specific platforms, tools, and methods must be named.`,
    sceneRequirements: `
  - Tension level (1-10) for this scene
  - What information is the reader given? What is withheld?
  - Cliffhanger/hook at scene end
  - Misdirection: is the reader being led toward a wrong conclusion here?`,
    chapterSpecificRequirements: `
• TENSION MAP:
  - Tension level entering (1-10) → Tension level exiting (1-10)
  - The chapter must either raise or dramatically drop tension (for contrast). Never flat.

• INFORMATION CONTROL:
  - What the reader knows that the protagonist doesn't
  - What the protagonist knows that the reader doesn't  
  - What neither knows yet (setup for future reveal)

• CLIFFHANGER TYPE:
  [revelation / physical danger / decision forced / betrayal revealed / clock running out]`,
    referenceRequirements: `
6. TWIST ARCHITECTURE
   | Twist | Chapter | What Reader Believed | Reality | Planted Clues (chapters) |

7. TENSION CURVE
   | Chapter | Opening Tension | Peak Tension | Closing Tension | Cliffhanger Type |

8. INFORMATION ASYMMETRY MAP
   | Chapter | Reader Knows | Protagonist Knows | Antagonist Knows | Gap |`,
    phase1Requirements: `Thrillers need a ticking clock, clear stakes escalation, twist architecture with planted clues, and an antagonist whose plan is as detailed as the protagonist's. Map the information asymmetry between reader, protagonist, and antagonist.`,
    phase2Requirements: `Every chapter needs a tension score (1-10) entering and exiting, cliffhanger type, information control notes (what reader knows vs. protagonist vs. antagonist), and misdirection flags. Chapters should be SHORT (2,500-4,000 words).`
  },

  mystery: {
    name: 'Mystery / Crime',
    icon: '🔍',
    description: 'Puzzle-driven novels with investigation arcs and fair-play clues',
    chapterWordCount: '3,000–5,000',
    chapterRange: '20-30',
    typicalChapters: 25,
    structuralRequirements: `
   Build an EVIDENCE BOARD: every clue, red herring, and revelation mapped to specific chapters.
   The solution must be FAIR — all necessary clues available to the reader before the reveal.
   Suspect matrix: 3-5 suspects, each with means/motive/opportunity documented.
   Investigation arc: discovery → theory → complication → revised theory → breakthrough → solution.
   The B-story (personal/emotional) must intersect with the A-story (investigation) at the midpoint.`,
    thematicRequirements: `
   - What does the crime reveal about the world the characters inhabit?
   - The detective's personal flaw must be the same quality that eventually solves the case.`,
    worldBuildingRequirements: `
   - Closed world: the setting should be specific enough that the reader can mentally map it.
   - Procedural detail: investigation methods, forensic processes, legal constraints — all named and accurate.
   - Community dynamics: who has power, who has secrets, who has history with whom.`,
    sceneRequirements: `
  - CLUE TYPE: [hard clue / soft clue / red herring / witness statement / physical evidence]
  - What does the investigator conclude from this scene? (Right or wrong?)
  - What does the READER piece together that the investigator misses?`,
    chapterSpecificRequirements: `
• EVIDENCE TRACKING:
  - Clues revealed in this chapter (specific items, statements, observations)
  - Red herrings planted
  - Suspect status update (who moves up/down the list and why)
  
• INVESTIGATION PROGRESS:
  - Current theory entering chapter
  - How the theory is complicated or refined by chapter end
  - What question drives into the next chapter`,
    referenceRequirements: `
6. EVIDENCE BOARD
   | Clue | Type (Hard/Soft/Red Herring) | Chapter Found | Points To | Investigator's Interpretation | Actual Significance |

7. SUSPECT MATRIX
   | Suspect | Means | Motive | Opportunity | Alibi | Chapter Introduced | Chapter Cleared/Convicted |

8. INVESTIGATION TIMELINE
   | Chapter | Current Theory | New Evidence | Theory Status (Confirmed/Complicated/Overturned) |`,
    phase1Requirements: `Mysteries require a fully worked-out solution FIRST: who did it, how, why, and what evidence exists. Then design the investigation path — what the detective finds in what order, which clues are noticed, which are missed. Build a suspect matrix with means/motive/opportunity for each suspect.`,
    phase2Requirements: `Every chapter needs evidence tracking (clues revealed, red herrings planted, suspect status updates), investigation progress notes (current theory → complication → revised theory), and fair-play verification (is the reader getting the clues they need?).`
  },

  romance: {
    name: 'Romance',
    icon: '💕',
    description: 'Relationship-centered novels with emotional arcs and guaranteed HEA/HFN',
    chapterWordCount: '3,000–5,000',
    chapterRange: '20-30',
    typicalChapters: 25,
    structuralRequirements: `
   Dual-POV emotional arc structure:
   - Meet (first encounter — must be memorable and specific)
   - Spark (attraction acknowledged internally but resisted)
   - Deepening (vulnerability shared, trust builds)
   - Midpoint commitment (they choose each other — temporarily)
   - External crisis (forces that push them apart)
   - Dark moment (all seems lost — must feel genuinely hopeless)
   - Grand gesture / Resolution (earns the HEA/HFN through character growth)
   
   TROPES to integrate: Identify 2-3 romance tropes and specify how they're used.
   The external plot must SERVE the relationship arc, not compete with it.`,
    thematicRequirements: `
   - What does each character need to learn about love/trust/vulnerability to earn the HEA?
   - The internal wounds must be COMPLEMENTARY — each character can heal the other, but only after growth.`,
    worldBuildingRequirements: `
   - Setting as romance amplifier: the environment should create proximity, intimacy, or forced interaction.
   - Sensory romance: specific details that make the reader FEEL the attraction (warmth, scent, texture, voice).
   - Community/friend group: secondary characters who mirror or contrast the central relationship.`,
    sceneRequirements: `
  - RELATIONSHIP TEMPERATURE: [cold / warming / simmering / hot / conflicted / frozen / melting]
  - Which POV carries this scene? Why this POV and not the other?
  - Physical/emotional intimacy level (1-10)
  - What vulnerability is exposed or hidden?`,
    chapterSpecificRequirements: `
• DUAL-POV TRACKING:
  - Whose POV is this chapter? Why theirs and not their partner's for these events?
  - What does the POV character feel that they don't say?
  - What does the OTHER character do that the POV character misreads?

• RELATIONSHIP PROGRESSION:
  - Intimacy level entering (1-10) → exiting (1-10)
  - What draws them closer in this chapter?
  - What pushes them apart?
  - The specific moment a reader would bookmark and reread

• TROPE DEPLOYMENT:
  - Which trope is active? How does this chapter advance or subvert it?`,
    referenceRequirements: `
6. RELATIONSHIP ARC MAP
   | Chapter | POV | Intimacy Level | Key Moment | Draws Together | Pushes Apart |

7. TROPE TRACKER
   | Trope | First Deployed | Chapters Active | Subverted? | Resolution |

8. EMOTIONAL BEAT SEQUENCE
   | Beat | Chapter | Description | Reader Emotion Target |`,
    phase1Requirements: `Romance requires dual character profiles with COMPLEMENTARY wounds (each can heal the other). Map the full relationship arc from meet to HEA/HFN. Identify 2-3 tropes and plan their deployment. The external plot must serve the romance, not overshadow it.`,
    phase2Requirements: `Every chapter needs dual-POV tracking (whose POV and why), relationship temperature (1-10), specific intimacy moments, and trope deployment notes. Identify the "bookmark moment" in each chapter — the scene a reader would reread.`
  },

  scifi: {
    name: 'Science Fiction',
    icon: '🚀',
    description: 'Speculative novels exploring technology, society, and human nature',
    chapterWordCount: '4,000–6,000',
    chapterRange: '20-32',
    typicalChapters: 26,
    structuralRequirements: `
   The concept/technology is not decoration — it is the ENGINE of the plot.
   Structure: Concept introduction → Implication chain → Human cost → Confrontation with consequences
   The world's rules must be established clearly in Act 1 so they can be tested in Act 2 and broken/reaffirmed in Act 3.
   The "what if" question must escalate: personal stakes → societal stakes → existential stakes.`,
    thematicRequirements: `
   - What does this technology/concept reveal about human nature?
   - The thematic question should be unanswerable — the book explores it, not resolves it.
   - Technology amplifies human tendencies. Which tendency is being amplified?`,
    worldBuildingRequirements: `
   - WORLD RULES DOCUMENT: What is different from our world? What are the constraints?
   - TECHNOLOGY IMPACT CHAIN: Technology X exists → therefore society does Y → therefore individuals experience Z
   - SENSORY WORLD: What does this future/world smell, taste, sound, feel like? Not just look like.
   - ECONOMICS: Who has power? How is it maintained? What does money/resources mean here?`,
    sceneRequirements: `
  - WORLD-BUILDING DELIVERY: How is new information about the world delivered in this scene?
    (Through action, not exposition. Through character experience, not narrator explanation.)
  - CONCEPT ESCALATION: How does the sci-fi concept's implications deepen in this scene?`,
    chapterSpecificRequirements: `
• WORLD-BUILDING INTEGRATION:
  - New world element introduced in this chapter (if any)
  - Delivery method: [action / dialogue / environmental detail / character discovery]
  - World rule tested or demonstrated

• CONCEPT ESCALATION:
  - How the central "what if" question deepens or complicates in this chapter
  - New implication revealed

• TECHNOLOGY AS CHARACTER:
  - How does the technology/concept act on the characters in this chapter?
  - What human behavior does it amplify or suppress?`,
    referenceRequirements: `
6. WORLD RULES DOCUMENT
   | Rule | First Established | Chapter | Tested In | Broken/Confirmed In |

7. TECHNOLOGY IMPACT CHAIN
   | Technology | Direct Effect | Second-Order Effect | Human Cost | Chapter Arc |

8. CONCEPT ESCALATION TRACKER
   | Chapter | "What If" Scope | Stakes Level (Personal/Societal/Existential) |`,
    phase1Requirements: `Sci-fi requires a World Rules Document (what's different, what's the same, what are the constraints), a Technology Impact Chain (tech → society → individual), and a concept escalation plan (personal → societal → existential stakes). The "what if" must be specific, not vague.`,
    phase2Requirements: `Every chapter needs world-building integration notes (new element, delivery method), concept escalation tracking (how the "what if" deepens), and technology-as-character beats (how the concept acts on people in this chapter).`
  },

  fantasy: {
    name: 'Fantasy',
    icon: '⚔️',
    description: 'Novels with magic systems, world-building, and epic or intimate quests',
    chapterWordCount: '4,000–7,000',
    chapterRange: '25-45',
    typicalChapters: 35,
    structuralRequirements: `
   The magic system and world rules ARE the plot constraints. Document them fully.
   Quest/Power arc: What the protagonist seeks → What they must sacrifice to get it → What it costs.
   Faction dynamics: Multiple groups with conflicting goals create political texture.
   The world must feel LIVED IN — not designed, but discovered by the reader.
   Map-driven geography: distances, travel time, and environment shape the plot.`,
    thematicRequirements: `
   - Power and its cost is fantasy's native theme. What form does power take? What does it cost?
   - Magic as metaphor: what real-world force or dynamic does the magic system represent?
   - The chosen-one trope, if used, must be interrogated, not assumed.`,
    worldBuildingRequirements: `
   - MAGIC SYSTEM: Rules, costs, limitations, sources, how it's learned/accessed
   - POLITICAL MAP: Factions, alliances, conflicts, power structures
   - CULTURAL TEXTURE: Languages, customs, food, architecture, religion, social hierarchy
   - GEOGRAPHY: Travel routes, distances, environmental dangers, strategic locations
   - HISTORY: The events that shaped this world before page 1 (relevant only — not an encyclopedia)`,
    sceneRequirements: `
  - MAGIC USAGE: Is magic used in this scene? What rule governs it? What does it cost?
  - WORLD TEXTURE: What cultural/environmental detail grounds this scene in THIS world (not generic fantasy)?
  - FACTION DYNAMICS: Which power interests are in play?`,
    chapterSpecificRequirements: `
• MAGIC SYSTEM TRACKING:
  - Magic used in this chapter (specific application, rule governing it, cost)
  - New rule revealed or existing rule tested

• POLITICAL/FACTION MOVEMENT:
  - Which factions advance their agenda in this chapter?
  - Power balance shift

• WORLD IMMERSION:
  - The one detail in this chapter that makes this world feel NOT like generic fantasy
  - Cultural texture beat (custom, language, food, architecture)`,
    referenceRequirements: `
6. MAGIC SYSTEM RULES
   | Rule | First Established | Cost | Limitation | Tested/Broken In |

7. FACTION DYNAMICS TRACKER
   | Faction | Goal | Power Level | Allies | Enemies | Status by End |

8. GEOGRAPHY & TRAVEL
   | Journey | From → To | Chapters | Distance/Time | Obstacles |`,
    phase1Requirements: `Fantasy demands a complete magic system (rules, costs, limitations), faction/political map, cultural texture details, and geography. The quest/power arc must have a clear cost structure — what the protagonist sacrifices at each stage.`,
    phase2Requirements: `Every chapter needs magic system tracking (usage, rules, costs), faction movement notes (who advances their agenda), and world immersion details (the one specific detail that makes this NOT generic fantasy).`
  },

  horror: {
    name: 'Horror',
    icon: '👻',
    description: 'Novels designed to evoke dread, fear, and existential unease',
    chapterWordCount: '3,000–5,000',
    chapterRange: '18-28',
    typicalChapters: 22,
    structuralRequirements: `
   FEAR CURVE architecture: safety → unease → dread → temporary relief → escalated dread → confrontation → aftermath
   The horror must have RULES — even if the characters don't know them yet.
   False safety moments: chapters where the reader THINKS the danger has passed. It hasn't.
   The monster/threat reveal pacing: what the reader sees (never too early, never all at once).
   Body horror, psychological horror, cosmic horror, or supernatural horror — commit to a TYPE.`,
    thematicRequirements: `
   - What does the horror MEAN? Horror is metaphor. What real fear does the supernatural/monstrous represent?
   - The protagonist's personal flaw must connect to what makes the horror specifically threatening to THEM.`,
    worldBuildingRequirements: `
   - ATMOSPHERE INVENTORY: Dominant sensory textures (sound, smell, temperature, light quality)
   - NORMAL WORLD: Establish normalcy thoroughly so its violation is maximally disturbing
   - RULES OF THE THREAT: How does it work? What are its constraints? What can stop it (if anything)?
   - LOCATION AS TRAP: The setting should constrain escape and amplify isolation.`,
    sceneRequirements: `
  - FEAR LEVEL: [safe / uneasy / tense / dread / terror / aftermath]
  - THREAT PROXIMITY: How close is the danger? What does the character perceive vs. reality?
  - ATMOSPHERE BEAT: Dominant sensory detail that builds unease
  - FALSE SAFETY: Is this a false-safety moment designed to make the next scare worse?`,
    chapterSpecificRequirements: `
• FEAR CURVE POSITION:
  - Fear level entering → peak → exiting
  - Is this a BUILD chapter, a RELEASE chapter, or a FALSE SAFETY chapter?

• THREAT REVEAL PACING:
  - What new aspect of the threat is revealed (if any)?
  - What remains hidden?
  - Percentage of "monster" the reader has seen by end of this chapter

• ATMOSPHERE ENGINEERING:
  - Dominant sensory mode for this chapter
  - Environmental detail that creates wrong-ness (subtle wrongness > obvious horror)
  - Sound design: what does the reader "hear" in this chapter?`,
    referenceRequirements: `
6. FEAR CURVE MAP
   | Chapter | Fear Level (1-10) | Type (Build/Release/False Safety) | Scare Beat |

7. THREAT REVEAL TIMELINE
   | Chapter | What's Revealed | What's Still Hidden | % Revealed |

8. ATMOSPHERE INVENTORY
   | Chapter | Dominant Sense | Key Detail | Wrongness Level |`,
    phase1Requirements: `Horror needs a Fear Curve architecture (safety → dread → relief → worse dread), a fully worked-out threat/monster with RULES (how it works, constraints, what can stop it), and an atmosphere inventory. The horror must be METAPHOR for something real.`,
    phase2Requirements: `Every chapter needs fear curve positioning (build/release/false safety), threat reveal pacing (what's shown vs. hidden, % revealed), and atmosphere engineering (dominant sense, wrongness details, sound design).`
  },

  historical: {
    name: 'Historical Fiction',
    icon: '🏛️',
    description: 'Novels set in specific historical periods with authentic period detail',
    chapterWordCount: '4,000–6,000',
    chapterRange: '22-35',
    typicalChapters: 28,
    structuralRequirements: `
   DUAL TIMELINE: Historical event timeline vs. character personal timeline — mapped side by side.
   The historical events must PRESSURE the characters' personal choices, not just provide backdrop.
   Period accuracy must be INVISIBLE — woven into character experience, not delivered as exposition.
   Identify the anachronism watchlist: what modern assumptions must be excluded from this period?
   The protagonist's personal story must illuminate something about the historical period that textbooks miss.`,
    thematicRequirements: `
   - What does this historical moment reveal about human nature that is still true today?
   - The period's specific constraints (social, legal, economic) must shape what characters CAN and CANNOT do.
   - Present-day relevance thread: the subtle resonance between then and now.`,
    worldBuildingRequirements: `
   - PERIOD DETAIL INVENTORY: Daily life specifics — food, clothing, transport, communication, money, work
   - SOCIAL CONSTRAINTS: What could people of this period do/not do based on class, gender, race, religion?
   - LANGUAGE REGISTER: Period-appropriate dialogue (authentic feel without being incomprehensible)
   - SENSORY PERIOD: What did this time and place SMELL, SOUND, TASTE like?
   - KEY HISTORICAL EVENTS: Timeline of real events that affect the story`,
    sceneRequirements: `
  - PERIOD DETAIL: What specific historical detail grounds this scene in its time?
  - ANACHRONISM CHECK: What modern assumption might creep in here? Flag it.
  - HISTORICAL EVENT INTERSECTION: Does a real historical event affect this scene?`,
    chapterSpecificRequirements: `
• HISTORICAL INTEGRATION:
  - Real historical events occurring during this chapter's timeframe
  - How they pressure or shape the characters' choices
  - Period details deployed (specific items, customs, constraints)

• ANACHRONISM WATCHLIST:
  - What modern assumptions must be avoided in this chapter?
  - Language, behavior, or technology that would be out of place

• DUAL TIMELINE TRACKING:
  - Historical event timeline progress
  - Character personal timeline progress
  - Points of intersection`,
    referenceRequirements: `
6. HISTORICAL EVENT TIMELINE
   | Date | Real Event | Impact on Characters | Chapter |

7. PERIOD DETAIL INVENTORY
   | Category | Specific Detail | First Used | Chapters |

8. ANACHRONISM WATCHLIST
   | Modern Assumption | Period Reality | Chapters to Watch |`,
    phase1Requirements: `Historical fiction needs a dual timeline (historical events vs. character story), period detail inventory (daily life specifics), social constraints map (what characters can/cannot do based on the period), and an anachronism watchlist. The history must PRESSURE the personal story.`,
    phase2Requirements: `Every chapter needs historical integration notes (real events, period details deployed), anachronism flags (modern assumptions to avoid), and dual timeline tracking (where history and personal story intersect).`
  }
};
