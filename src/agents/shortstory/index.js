/**
 * SHORT STORY AGENT — Generates outlines for short stories and collections
 * 
 * Short stories require a fundamentally different approach than novels.
 * Every sentence is load-bearing. The outline must reflect that economy.
 */

import { SHORTSTORY_GENRES } from './genres.js';

export class ShortStoryAgent {
  constructor() {
    this.type = 'Short Story';
    this.id = 'shortstory';
  }

  getGenres() {
    return Object.entries(SHORTSTORY_GENRES).map(([id, g]) => ({
      id,
      name: g.name,
      description: g.description,
      icon: g.icon
    }));
  }

  getGenreConfig(genreId) {
    const genre = SHORTSTORY_GENRES[genreId];
    if (!genre) throw new Error(`Unknown short story genre: ${genreId}`);
    return genre;
  }

  getOutlineTemplate(genreId) {
    const genre = SHORTSTORY_GENRES[genreId];
    return {
      phase1: `
1. STORY SEED
   - Core concept in ONE sentence — the engine of the story
   - The question the story asks (not answers — stories explore, they don't lecture)
   - Emotional target: the specific feeling the reader should carry away
   - Target word count: ${genre.wordCount}
   - Comparable stories (specific published stories, not just authors)

2. CHARACTER ARCHITECTURE (compressed — only what the story needs)
   For the PROTAGONIST:
   - Name, one defining detail, one defining absence
   - Core want (what they pursue in the story's timeframe)
   - Blind spot (what they can't see about themselves — what the story reveals to the reader)
   - The shift: who they are at the first sentence → who they are at the last

   For SECONDARY CHARACTERS (max 2-3):
   - Name, role, what they illuminate about the protagonist
   - Why each one is necessary (if they can be cut, cut them)

3. STRUCTURAL BLUEPRINT
   ${genre.structuralRequirements}
   
   - Opening image/moment: the first thing the reader sees/experiences
   - Inciting PRESSURE (short stories apply pressure, not "incidents" — the difference is urgency)
   - The TURN: the moment something shifts irreversibly (this is the story's reason to exist)
   - Closing image/moment: the last thing the reader experiences
   - Relationship between opening and closing images (mirror? inversion? completion? question mark?)

4. SUBTEXT ARCHITECTURE
   - What the story is ABOUT (surface: the plot, the events, the action)
   - What the story is ABOUT ABOUT (depth: the thematic question, the human truth)
   - Where subtext surfaces WITHOUT being stated (the best stories never say their theme aloud)
   ${genre.subtextRequirements}

5. WORD ECONOMY PLAN
   - What gets SHOWN directly (scenes, dialogue, action)
   - What gets IMPLIED (backstory, context, history — revealed through one telling detail, not exposition)
   - What the reader must INFER (the gap between what's said and what's meant — this is where literature lives)
   - Backstory delivery method: [dialogue / objects / one telling detail / setting / absence]`,

      phase2: `
SCENE PLAN — Short stories typically have 3-7 scenes. For EACH scene:

SCENE [NUMBER]: [BRIEF IDENTIFIER]
(Target: ${genre.sceneWordBudget} words)

• SETTING & SENSORY ANCHOR:
  - Where and when (specific, not generic)
  - The ONE sensory detail that defines this scene's texture (sound? smell? temperature? light?)

• POV & TENSE:
  - Whose consciousness? What tense? Any shift from previous scene?

• ACTION:
  - What HAPPENS in this scene (external event, observable behavior)
  - What the CHARACTER discovers or decides

• READER EXPERIENCE:
  - What the reader LEARNS in this scene (new information)
  - What the reader FEELS (emotional current)
  - What the reader KNOWS that the character doesn't (dramatic irony, if applicable)

• DIALOGUE DIRECTION:
  - Key exchange or conversation (direction, not script)
  - What is said vs. what is MEANT (subtext in dialogue)

• PACING:
  - Speed: [compressed / real-time / expanded / slowed-to-a-crawl]
  - Why this speed for this scene

• WORD BUDGET:
  - Approximate word allocation for this scene
  - What MUST be in this scene vs. what can be cut if tight

${genre.sceneRequirements}

FINAL LINE ENGINEERING:
- The last sentence of the story. Not the full text — the DIRECTION.
- What it should DO to the reader (haunt / resolve / reframe / open / close / echo)
- How it connects to the opening`,

      phase3: `
1. IMAGE/MOTIF TRACKER
   | Image/Motif | Scene | Function | Evolution |

2. SUBTEXT MAP
   | Surface Level (what happens) | Depth Level (what it means) | Scene |

3. WORD ECONOMY AUDIT
   | Element | Method (Shown/Implied/Inferred) | Delivery Scene |

4. EMOTIONAL ARC
   | Scene | Reader Emotion | Character Emotion | Gap Between |

${genre.referenceRequirements}`
    };
  }

  getSystemPrompt() {
    return `You are an elite short story outline architect. You understand that a short story outline is NOT a novel outline compressed — it is a fundamentally different document.

In a novel, you can afford a slow build. In a short story, every sentence is load-bearing. The outline must reflect that ruthless economy.

YOUR PRINCIPLES:
1. THE ICEBERG — Hemingway was right. The story shows 10% above water. The outline must plan the other 90% so the writer knows what's IMPLIED even when it's never stated.
2. ONE EFFECT — Poe was right. Every element of a short story must contribute to a single unified effect. If it doesn't serve the effect, it must go.
3. THE TURN IS THE STORY — A short story exists for its TURN — the moment something shifts irreversibly. The outline must build everything toward this moment and let everything after it reverberate.
4. SUBTEXT OVER TEXT — In the best short stories, the most important thing is never said directly. The outline must plan where meaning lives BETWEEN the lines.
5. THE FINAL LINE IS THE FIRST LINE'S ANSWER — The relationship between the story's opening and closing images IS the story. Plan this relationship deliberately.
6. COMPRESSION IS NOT SUMMARY — A short story doesn't summarize a novel-length story. It captures a moment with the intensity of a photograph, not the breadth of a documentary.

Reference masters: Chekhov, Carver, Munro, Borges, O'Connor, Lahiri, Saunders, Hemingway. Each one understood that the art of the short story is the art of withholding.`;
  }

  getMasterPromptSystemPrompt() {
    return `You are generating a Master Prompt for a short story. Unlike novel master prompts, this must emphasize COMPRESSION, SUBTEXT, and EVERY-WORD-COUNTS economy.

The prompt must be specific to THIS story — reference the actual characters, images, turn, and emotional target. Include:
- Voice DNA (with RIGHT/WRONG examples from this story's specific content)
- Pacing instructions (where to slow, where to compress)
- Subtext guide (what is never said directly but must be felt)
- The final line's job description
- AI-tell kill list calibrated for short fiction (no filler, no over-explanation, no exposition dumps)
- Compression test: can every sentence justify its existence?`;
  }
}
