/**
 * Short Story Genre Definitions
 */

export const SHORTSTORY_GENRES = {
  literary: {
    name: 'Literary Short Fiction',
    icon: '🎭',
    description: 'Character-driven stories with thematic depth centred on a moment of revelation',
    wordCount: '3,000–8,000 words',
    sceneWordBudget: '500–2,000',
    sceneRange: '3-7',
    typicalScenes: 5,
    unitName: 'scene',
    structuralRequirements: `
   The literary short story is built around an EPIPHANY — a moment of realization.
   Structure: Pressure builds → Surface cracks → Something beneath is revealed → Nothing is the same.
   The epiphany may belong to the character, the reader, or both (but differently).
   Non-linear structures are available if they serve the emotional architecture.`,
    subtextRequirements: `
   - Identify the GAP between what characters say and what they mean
   - Identify the GAP between what the narrator reports and what the reader understands
   - These gaps ARE the story. The outline must map them deliberately.`,
    sceneRequirements: `
• EPIPHANY ARCHITECTURE:
  - How close is this scene to the epiphany moment?
  - What pressure is this scene applying toward the crack?
  - What detail in this scene will be reread differently after the turn?`,
    referenceRequirements: `
5. EPIPHANY ARCHITECTURE
   | Setup Element | Scene | Reread Value (what changes after the turn) |`,
    phase1Requirements: `Literary short fiction needs an epiphany architecture — the moment of revelation must be planned with the precision of a magic trick. Map the setup elements that will be reread differently after the turn.`,
    phase2Requirements: `Every scene needs epiphany distance tracking (how close to the crack), pressure notes (what's building), and reread-value flags (what the reader will notice differently on a second pass).`
  },

  genre: {
    name: 'Genre Short (Sci-Fi, Fantasy, Horror)',
    icon: '🌌',
    description: 'Speculative fiction with concept payoff and twist architecture',
    wordCount: '3,000–10,000 words',
    sceneWordBudget: '600–2,500',
    sceneRange: '4-8',
    typicalScenes: 6,
    unitName: 'scene',
    structuralRequirements: `
   The genre short story is built around a CONCEPT and its PAYOFF.
   Structure: World rule established → Implications explored → Concept pushed to breaking point → Payoff/twist.
   The twist must be EARNED — all clues available to the reader in retrospect.
   World-building must be ECONOMICAL — establish rules through action, not exposition.`,
    subtextRequirements: `
   - The concept is metaphor for something real. What human truth does the speculative element illuminate?
   - The twist reframes the concept's meaning. Plan the before-twist and after-twist readings.`,
    sceneRequirements: `
• CONCEPT TRACKING:
  - What world rule or concept element is established or tested in this scene?
  - Delivery method: [action / environment / dialogue / discovery] (NOT exposition)
  
• TWIST ARCHITECTURE:
  - What clue for the twist is planted in this scene?
  - What misdirection guides the reader away from the truth?`,
    referenceRequirements: `
5. TWIST ARCHITECTURE
   | Clue | Scene | Surface Reading | Post-Twist Reading |
   
6. WORLD-RULE ECONOMY
   | Rule | Established In Scene | Tested In Scene | Words Used |`,
    phase1Requirements: `Genre shorts need a concept with a clear payoff, a twist architecture with planted clues, and economical world-building (establish rules through action, never exposition). The concept must be metaphor for something psychologically real.`,
    phase2Requirements: `Every scene needs concept tracking (rule established/tested), twist clue placement, misdirection flags, and word-economy for world-building (deliver rules through action, not explanation).`
  },

  flash: {
    name: 'Flash Fiction',
    icon: '⚡',
    description: 'Ultra-compressed stories under 1,500 words where every word is structural',
    wordCount: '250–1,500 words',
    sceneWordBudget: '100–500',
    sceneRange: '1-3',
    typicalScenes: 2,
    unitName: 'scene',
    structuralRequirements: `
   Flash fiction is COMPRESSION as art form. No wasted syllables.
   Structure: A single moment, a single pressure, a single shift.
   The entire story often happens in one scene or one consciousness.
   The title does work — it sets context the story body doesn't have room for.
   The final sentence IS the story — everything before it is the setup.`,
    subtextRequirements: `
   - In flash, EVERYTHING is subtext. The story says one thing and means another.
   - The entire backstory must be implied in a single detail or sentence.
   - What the story leaves OUT is more important than what it includes.`,
    sceneRequirements: `
• WORD BUDGET — STRICT:
  - This scene gets exactly [N] words. Not approximately. Exactly.
  - Every sentence must justify its existence: what does it DO that no other sentence does?
  - The cut list: what was considered and deliberately excluded
  
• TITLE WORK:
  - What context does the title provide that frees the story body from exposition?`,
    referenceRequirements: `
5. WORD JUSTIFICATION
   | Sentence Function | Scene | Essential or Cuttable |
   
6. IMPLIED BACKSTORY
   | Backstory Element | Delivery Method | Words Used |`,
    phase1Requirements: `Flash fiction needs a title that does heavy lifting, a single-moment focus, and a word justification plan. Every sentence must earn its place — the outline should identify what each sentence DOES for the story.`,
    phase2Requirements: `Every scene (often just 1-2) needs strict word budgets, sentence justification notes, a cut list (what was considered and excluded), and title-work planning (what context the title carries).`
  },

  sliceoflife: {
    name: 'Slice of Life',
    icon: '☕',
    description: 'Quiet stories where emotional texture is the event',
    wordCount: '2,000–6,000 words',
    sceneWordBudget: '400–1,500',
    sceneRange: '2-5',
    typicalScenes: 3,
    unitName: 'scene',
    structuralRequirements: `
   Slice of life stories have no external plot event — the "event" is emotional, perceptual, relational.
   Structure: Ordinary moment → Attention deepens → Something shifts (often subtly) → The ordinary is forever changed.
   The story's power comes from NOTICING — the attention to detail that reveals what rushing past misses.
   Conflict is micro — not a confrontation, but a tension, a wish, a small difference that matters.`,
    subtextRequirements: `
   - What is the character NOT doing or NOT saying that tells the real story?
   - The mood is the meaning. The sensory texture IS the argument.
   - Restraint is the technique — the less the story reaches for significance, the more significant it becomes.`,
    sceneRequirements: `
• SENSORY TEXTURE:
  - What is the dominant sensory experience of this scene?
  - What one detail a reader would remember a week later?
  
• MICRO-TENSION:
  - What small, human tension is alive in this scene?
  - It should be recognizable — the reader has felt this exact thing.`,
    referenceRequirements: `
5. SENSORY INVENTORY
   | Sense | Detail | Scene | Mood Contribution |
   
6. MICRO-TENSION MAP
   | Tension | Scene | Resolution (if any) |`,
    phase1Requirements: `Slice of life stories need a mood architecture (not a plot architecture), a sensory inventory (the details that create atmosphere), and micro-tensions (small human frictions that the reader recognizes from their own life).`,
    phase2Requirements: `Every scene needs sensory texture planning (dominant sense, memorable detail), micro-tension identification, and mood progression notes. The power is in NOTICING — help the writer know what to pay attention to.`
  },

  anthology: {
    name: 'Anthology / Collection',
    icon: '📚',
    description: 'Planning a thematically linked story collection',
    wordCount: '30,000–80,000 words total (8-15 stories)',
    sceneWordBudget: 'Varies per story',
    storyRange: '8-15',
    typicalStories: 12,
    unitName: 'story',
    structuralRequirements: `
   A collection is NOT just stories in a row. It is an architecture.
   SEQUENCING: The order creates a reading experience — emotional rhythm, thematic deepening, variety of mode.
   OPENING STORY: Sets the collection's voice and signals what kind of reading this will be.
   CLOSING STORY: The most resonant or ambitious — the note the reader carries away.
   CONNECTIVE TISSUE: Recurring images, themes, settings, or questions that make it feel like one book.`,
    subtextRequirements: `
   - The collection's meta-argument: what does the collection SAY that no single story says?
   - Recurring images build meaning across stories — plan these deliberately.`,
    sceneRequirements: `
FOR EACH STORY in the collection:
• STORY IDENTITY:
  - Title, word count, genre, central image/question
  - Position in the collection and WHY (what comes before, what comes after)
  - Register: [humorous / devastating / quiet / intense / surreal / realistic]
  
• COLLECTION FUNCTION:
  - What this story adds to the collection that no other story provides
  - Thematic thread(s) it picks up
  - How it differs from adjacent stories (variety of mode, tone, perspective)`,
    referenceRequirements: `
5. COLLECTION ARCHITECTURE
   | Position | Title | Word Count | Register | Central Question | Connection to Adjacent |

6. THEMATIC THREADS
   | Thread | Stories Where It Appears | How It Evolves |

7. VARIETY MAP
   | Element | Story 1 | Story 2 | Story 3... | (ensuring variety across: POV, tense, length, register, setting) |`,
    phase1Requirements: `Anthology outlines need collection-level architecture (sequencing logic, opening/closing story selection, connective tissue), a variety map (ensuring diversity of mode, POV, setting, register), and a meta-argument (what the collection proves that no single story does).`,
    phase2Requirements: `Each story gets a compressed outline (seed, character, structure, turn), but also collection-specific notes: position justification (why HERE in the sequence), register assignment, thematic thread contribution, and contrast with adjacent stories.`
  }
};
