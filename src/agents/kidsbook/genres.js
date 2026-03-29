/**
 * Kids Book Genre Definitions
 */

export const KIDSBOOK_GENRES = {
  picturebook: {
    name: 'Picture Book',
    icon: '🎨',
    ageRange: '2–6 years',
    readingLevel: 'Read-aloud by parent/caregiver',
    wordCount: '200–800 words (32 pages typical)',
    description: 'Spread-by-spread stories where text and art work together',
    spreadRange: '12-16',
    typicalSpreads: 14,
    unitName: 'spread',
    emotionalRhythm: 'Build → Build → Build → Climax → Resolution → Warm Close',
    consistencyColumn: 'Spread #',
    arcUnit: 'Spread',
    structuralRequirements: `
   32-PAGE FORMAT (industry standard):
   - Pages 1-3: Front matter (title, copyright — not story pages)
   - Pages 4-5: Story begins (FIRST SPREAD)
   - Pages 6-29: Story body (12-13 spreads)
   - Pages 30-31: Story climax/resolution (FINAL SPREAD)
   - Page 32: Back matter
   
   14-15 SPREADS of story — plan EACH ONE.
   PAGE-TURN REVEALS: What is surprising or rewarding behind each page turn?
   REFRAIN/REPETITION: A repeated phrase the child anticipates and joins in on.
   CLIMAX SPREAD: The biggest, most dramatic moment — usually spread 11-12.
   The text is MINIMAL. The art carries at least 50% of the story.`,
    sensitivityNotes: `
   - No scary content without resolution/comfort
   - Separation anxiety: handle carefully — reunions must happen
   - Diversity in characters should be NATURAL, not highlighted
   - Bodily functions humor: fine for 3-6, calibrate to publisher expectations`,
    phase2Template: `
SPREAD-BY-SPREAD PLAN (14-15 spreads):

For EACH SPREAD:

SPREAD [NUMBER] (Pages [X]-[X+1]):

• TEXT (what the words say):
  - Exact text direction (not full text, but close — word count, key phrases, rhythm)
  - Read-aloud notes: emphasis words, pause points, voice changes
  - Refrain usage: does the repeated phrase appear here?

• ART DIRECTION (what the pictures show):
  - What the illustration SHOWS that the text does NOT say
  - Character expression and body language
  - Background details / Easter eggs / visual humor
  - Color/mood (warm palette → cool palette → warm = emotional arc visible in color)
  - Visual gag (if applicable)

• PAGE-TURN ENGINEERING:
  - What question or anticipation exists at the RIGHT edge of this spread?
  - What surprise or payoff appears on the LEFT of the NEXT spread?
  - This is the most important element. Page turns are where picture books live.

• EMOTIONAL BEAT:
  - What the child FEELS on this spread
  - Energy level (1-10): building toward climax or cooling toward resolution?

• READ-ALOUD PERFORMANCE:
  - Voice/sound effects opportunity
  - Words that are FUN to say (onomatopoeia, alliteration, silly sounds)
  - Participation moment (child joins in, points, answers a question)`,
    referenceRequirements: `
4. PAGE-TURN MAP
   | Spread | Right-Edge Question | Next-Spread Payoff |

5. REFRAIN TRACKER
   | Refrain Text | Spreads Used | Variation/Evolution |

6. TEXT vs. ART RESPONSIBILITY
   | Story Element | Told by Text | Told by Art | Both |

7. COLOR/MOOD PROGRESSION
   | Spread | Palette | Mood | Energy Level |`,
    sidebarRequirements: `N/A for picture books`,
    chapterSpecificRequirements: ``
  },

  earlyreader: {
    name: 'Early Reader',
    icon: '📗',
    ageRange: '5–8 years',
    readingLevel: 'Child reads independently (controlled vocabulary)',
    wordCount: '1,000–5,000 words (48-64 pages, 5-8 chapters)',
    description: 'Short chapters with controlled vocabulary for emerging independent readers',
    chapterRange: '5-8',
    typicalChapters: 6,
    unitName: 'chapter',
    emotionalRhythm: 'Quick wins → Small setback → Try again → Success → Celebration',
    consistencyColumn: 'Chapter',
    arcUnit: 'Chapter',
    structuralRequirements: `
   5-8 SHORT CHAPTERS (each 200-600 words)
   CONTROLLED VOCABULARY: Simple words, short sentences, high readability
   VISUAL SUPPORT: Illustrations on every spread supporting the text
   CHAPTER CLIFFHANGERS: Simple but effective — "What would happen next?"
   HUMOR: Essential. Physical comedy, wordplay, silly situations.
   REPETITIVE STRUCTURE: Each chapter follows a recognizable pattern (COMFORT for new readers)
   ACHIEVEMENT: The child must feel CAPABLE. Success at reading THIS book = confidence for next book.`,
    sensitivityNotes: `
   - Failure must always lead to trying again (growth mindset modeling)
   - Problems should be solvable by the child character (not rescued by adults)
   - Vocabulary challenges: introduce ONE new word per chapter, made clear by context`,
    phase2Template: `
FOR EACH CHAPTER (5-8 chapters):

CHAPTER [NUMBER]: [SHORT FUN TITLE]
(Target: 200-600 words | Vocabulary level: ${this?.readingLevel || 'early reader'})

• CHAPTER SUMMARY:
  - What happens (one clear event per chapter — no complexity overload)
  - The problem or challenge in this chapter
  - How it connects to the overall story

• VOCABULARY NOTES:
  - Reading level for this chapter
  - ONE new/challenging word introduced (with context clues for meaning)
  - Sentence length: mostly [X] words

• HUMOR BEAT:
  - Where's the funny moment? (Physical comedy? Wordplay? Surprising twist?)
  - Kids this age laugh at: repetition, exaggeration, unexpected outcomes, silly sounds

• ILLUSTRATION DIRECTION:
  - What the illustration on each spread should show
  - Visual humor/gag separate from text humor

• CHAPTER ENDING:
  - Simple cliffhanger or question that propels to next chapter
  - For the FINAL chapter: satisfying resolution + sense of accomplishment

• READING CONFIDENCE:
  - What makes this chapter feel ACHIEVABLE for a new reader?
  - Repeated sentence patterns they can predict and read confidently`,
    referenceRequirements: `
4. VOCABULARY LADDER
   | Chapter | New Word | Context Clue | Sentence |

5. HUMOR MAP
   | Chapter | Humor Type | Setup | Payoff |

6. READING CONFIDENCE TRACKER
   | Chapter | Repeated Pattern | Predictable Element | Achievement Moment |`,
    sidebarRequirements: `N/A for early readers`,
    chapterSpecificRequirements: ``
  },

  chapterbook: {
    name: 'Chapter Book',
    icon: '📘',
    ageRange: '7–10 years',
    readingLevel: 'Confident independent reader',
    wordCount: '8,000–20,000 words (10-15 chapters)',
    description: 'Episodic adventure with humor, friendship, and relatable conflicts',
    chapterRange: '10-15',
    typicalChapters: 12,
    unitName: 'chapter',
    emotionalRhythm: 'Fun setup → Adventure escalates → Things go wrong → Resourceful solution → Satisfying wrap',
    consistencyColumn: 'Chapter',
    arcUnit: 'Chapter',
    structuralRequirements: `
   10-15 CHAPTERS (each 800-1,500 words)
   EPISODIC STRUCTURE: Each chapter is a mini-adventure with its own problem/solution
   SERIES THREAD: Setup for continuation (friend group, setting, recurring challenges)
   HUMOR IS ESSENTIAL: At least ONE laugh-out-loud moment per chapter
   CHARACTER VOICE: The narrator should sound like a kid this age thinks/talks
   RELATABLE CONFLICTS: School, friendships, family, fairness, being different, growing up
   CLIFFHANGERS: End every chapter with a hook — short enough that "one more chapter" always wins`,
    sensitivityNotes: `
   - Bullying: address it but with empowerment solutions, not just adult rescue
   - Friendship complexity: kids this age understand loyalty, jealousy, forgiveness
   - Family diversity: all family structures represented naturally
   - Competition: winning isn't everything — process, sportsmanship, personal growth`,
    phase2Template: `
FOR EACH CHAPTER (10-15 chapters):

CHAPTER [NUMBER]: [CATCHY TITLE]
(Target: 800-1,500 words)

• WHAT HAPPENS:
  - The chapter's main event/adventure/problem
  - How it advances the overall story
  - The mini-resolution within this chapter (if episodic)

• CHARACTER VOICE:
  - How does the protagonist SOUND in this chapter?
  - Internal thoughts that a 7-10 year old would genuinely think
  - Dialogue that sounds like real kids talking

• HUMOR BEAT:
  - The laugh-out-loud moment (specific — describe the gag)
  - Running joke advancement (if applicable)
  - Situational comedy setup/payoff

• EMOTIONAL BEAT:
  - The genuine emotional moment (friendship, fear, pride, disappointment)
  - Handled with respect — not dismissed or over-explained

• FRIENDSHIP/RELATIONSHIP DYNAMICS:
  - How does the friend group dynamic shift in this chapter?
  - Any conflict between friends (realistic, resolvable)
  - Teamwork/collaboration moment

• CHAPTER CLIFFHANGER:
  - The hook that makes the reader turn to the next chapter
  - Type: [discovery / danger / mystery / dare / challenge / surprise arrival]

• SERIES SETUP (if applicable):
  - What element in this chapter builds the world for future books?`,
    referenceRequirements: `
4. HUMOR INVENTORY
   | Chapter | Joke Type | Setup | Payoff | Running Gag? |

5. FRIENDSHIP DYNAMICS MAP
   | Chapter | Friends Status | Conflict | Resolution |

6. SERIES THREAD TRACKER
   | Element | Introduced In | Developed In | Future Potential |`,
    sidebarRequirements: `N/A for chapter books`,
    chapterSpecificRequirements: ``
  },

  middlegrade: {
    name: 'Middle Grade',
    icon: '📙',
    ageRange: '8–12 years',
    readingLevel: 'Advanced independent reader',
    wordCount: '25,000–55,000 words (20-30 chapters)',
    description: 'Full novel structure with coming-of-age themes and age-appropriate complexity',
    chapterRange: '20-30',
    typicalChapters: 25,
    unitName: 'chapter',
    emotionalRhythm: 'Identity question → World expands → Loyalties tested → Crisis of self → Growth → New identity',
    consistencyColumn: 'Chapter',
    arcUnit: 'Chapter',
    structuralRequirements: `
   20-30 CHAPTERS (each 1,500-3,000 words)
   FULL NOVEL STRUCTURE: Three acts, proper character arcs, subplot management
   COMING-OF-AGE ARC: The protagonist discovers something about who they are or who they want to be
   PEER DYNAMICS: Friend group politics, loyalty, betrayal, acceptance — the social world IS the world
   STAKES: Real enough to feel scary, but NOT traumatic. The world threatens what the protagonist VALUES most.
   ADULT CHARACTERS: Present but NOT the solution. Kids solve their own problems with their own resources.
   HUMOR + HEART: Both. Always both. Never sacrifice one for the other.`,
    sensitivityNotes: `
   - Death: can be addressed but with extraordinary care and never gratuitously
   - Romance: crushes yes, relationships handled with lightness and awkwardness
   - Violence: consequences always shown, never glorified
   - Identity: gender, race, neurodivergence — portrayed with authenticity and respect
   - Mental health: increasingly important for this age group — normalize seeking help
   - Social media/technology: realistic portrayal without moralizing`,
    phase2Template: `
FOR EACH CHAPTER (20-30 chapters):

CHAPTER [NUMBER]: [TITLE]
(Target: 1,500-3,000 words)

• OPENING:
  - How does this chapter begin? (action / dialogue / internal thought / setting)
  - Hook sentence direction

• SCENE BREAKDOWN:
  - Scene-by-scene plan (typically 1-3 scenes per chapter)
  - For each: setting, characters present, key action, emotional beat

• COMING-OF-AGE THREAD:
  - What does the protagonist learn or question about themselves in this chapter?
  - Where are they on the identity journey?
  - What adult assumption or rule do they bump up against?

• PEER DYNAMICS:
  - Friend group status (alliances, tensions, new connections)
  - Social stakes (fitting in, standing out, being honest vs. being accepted)
  - Dialogue that sounds like THIS age group (not younger, not older)

• EMOTIONAL TRUTH:
  - The one authentic emotional moment in this chapter
  - Written from the kid's perspective, not an adult remembering being a kid

• B-PLOT ADVANCEMENT:
  - Family subplot: where is it in this chapter?
  - Friendship subplot: where is it?
  - How do they intersect with the main plot?

• CHAPTER ENDING:
  - Hook to next chapter
  - But also: emotional landing that gives the chapter its own complete feeling

• HUMOR & HEART BALANCE:
  - Humor moment: [specific gag or situational comedy]
  - Heart moment: [specific emotional truth]
  - Neither undermines the other`,
    referenceRequirements: `
4. COMING-OF-AGE ARC
   | Chapter | Identity Question | Discovery | Growth Moment |

5. PEER DYNAMICS MAP
   | Chapter | Friend Group Status | Social Stakes | Power Shift |

6. HUMOR/HEART BALANCE
   | Chapter | Humor Beat | Heart Beat | Balance Rating |

7. ADULT ROLE TRACKER
   | Adult Character | Chapter | Role | Does NOT Solve the Problem |`,
    sidebarRequirements: `N/A for middle grade`,
    chapterSpecificRequirements: ``
  },

  educational: {
    name: 'Educational / Concept Book',
    icon: '🧩',
    ageRange: '3–8 years',
    readingLevel: 'Parent-guided or early independent',
    wordCount: '300–2,000 words',
    description: 'Teaching concepts (numbers, emotions, nature, etc.) through engaging stories',
    spreadRange: '10-16',
    typicalSpreads: 12,
    unitName: 'page/spread',
    emotionalRhythm: 'Curiosity → Exploration → Discovery → "I get it!" → Want to learn more',
    consistencyColumn: 'Spread/Page',
    arcUnit: 'Spread/Page',
    structuralRequirements: `
   CONCEPT-FIRST DESIGN: What is the child learning? (numbers, letters, emotions, science, social skills)
   STORY AS VEHICLE: The story exists to deliver the concept naturally — never the other way around
   REPETITION WITH VARIATION: The concept appears in multiple forms (visual + verbal + interactive)
   CALL-AND-RESPONSE: Opportunities for the child to participate (guess, count, point, answer)
   BACK MATTER: Parent/teacher guide with extension activities
   SPIRAL LEARNING: Each page builds on the previous concept level`,
    sensitivityNotes: `
   - Accuracy: factual content must be correct and current
   - Inclusivity: examples and characters should represent diverse experiences
   - No shaming: learning difficulties are normal — never make a child feel "dumb"
   - Parent guide: suggest how adults can extend the learning beyond the book`,
    phase2Template: `
PAGE/SPREAD-BY-PAGE/SPREAD PLAN:

For EACH PAGE or SPREAD:

PAGE/SPREAD [NUMBER]:

• CONCEPT DELIVERY:
  - What specific concept or concept-level is taught on this page?
  - How does it build on the previous page?
  - Delivery method: [visual / verbal / interactive / all three]

• STORY ELEMENT:
  - What happens in the STORY on this page?
  - How does the story naturally lead to the concept?

• INTERACTION OPPORTUNITY:
  - What can the child DO with this page?
  - [Count / point / guess / answer / find / match / predict]

• TEXT:
  - Word count for this page
  - Key vocabulary (age-appropriate, concept-relevant)
  - Rhythm/rhyme if used

• ART DIRECTION:
  - What the illustration teaches (separate from text)
  - Visual representation of the concept
  - Hidden details that deepen understanding on re-reads

• BACK MATTER NOTES:
  - Extension activity idea connected to this page's concept
  - Discussion question for parent/teacher`,
    referenceRequirements: `
4. CONCEPT PROGRESSION
   | Page/Spread | Concept Level | Builds On | Leads To |

5. INTERACTION MAP
   | Page/Spread | Interaction Type | What Child Does | Learning Outcome |

6. ACCURACY CHECKLIST
   | Fact/Concept | Source | Verified | Age-Appropriate Presentation |`,
    sidebarRequirements: `N/A for educational books`,
    chapterSpecificRequirements: ``
  }
};
