/**
 * NON-FICTION AGENT — Generates outlines for non-fiction books
 * This agent produces outlines at the standard of the HR MEANS HUMAN REMOVAL reference.
 * 
 * Genres: Narrative NF, Self-Help/Prescriptive, Biography/Memoir, Business/Finance,
 *         Science/Technology, True Crime, History, Essay Collection
 */

import { NONFICTION_GENRES } from './genres.js';

export class NonfictionAgent {
  constructor() {
    this.type = 'Non-Fiction Book';
    this.id = 'nonfiction';
  }

  getGenres() {
    return Object.entries(NONFICTION_GENRES).map(([id, g]) => ({
      id,
      name: g.name,
      description: g.description,
      icon: g.icon
    }));
  }

  getGenreConfig(genreId) {
    const genre = NONFICTION_GENRES[genreId];
    if (!genre) throw new Error(`Unknown non-fiction genre: ${genreId}`);
    return genre;
  }

  getOutlineTemplate(genreId) {
    const genre = NONFICTION_GENRES[genreId];
    return {
      phase1: `
1. BOOK PROMISE & POSITIONING
   - The argument in ONE sentence (what this book proves/reveals/teaches)
   - What the reader believes BEFORE reading vs. AFTER reading
   - 3 comparable titles and how this book differs from each
   - Target audience: who SPECIFICALLY needs this book and why now
   - The book's "right to exist": why this book, by this author, at this moment

2. STRUCTURAL SPINE
   - Part divisions with thematic purpose for each part
   - Total chapter count and flow logic (why this sequence, not another)
   - The But/Therefore chain across the FULL book:
     Reader believes X → BUT the evidence shows Y → THEREFORE Z → BUT that raises Q...
   - The argument's architecture: how evidence accumulates to make the conclusion inevitable

3. THE AUTHOR'S VOICE & PERSONA
   - Who is the author in this book? (Expert / survivor / investigator / insider / outsider?)
   - What gives them the "right to tell this story"?
   - The emotional register: furious / measured / warm / clinical / urgent / wry
   - First person or third person and WHY

4. CHARACTER / SUBJECT ARCHITECTURE
   ${genre.characterRequirements}

5. EVIDENCE ARCHITECTURE
   ${genre.evidenceRequirements}

6. READER ENGAGEMENT DEVICES
   ${genre.engagementDevices}
`,

      phase2: `
FOR EACH CHAPTER, generate ALL of the following:

CHAPTER [NUMBER]: [TITLE]
(${genre.chapterLength})

• EPIGRAPH:
  - Source and text (real or composite)
  - Why THIS quote for THIS chapter — the thematic connection

• OPENING STRATEGY:
  [No two chapters may open the same way. Rotate: cold scene, devastating fact, 
   direct address, counter-narrative, composite story, the epigraph put to work, 
   historical close-up, inventory reveal]

• CHAPTER PERSONALITY:
  - MODE: [investigative journalism / narrative nonfiction / explanatory journalism / 
           personal essay / manifesto / trusted advisor / historical sweep / portrait series]
  - FEEL: [What specific emotion should the reader experience?]
  - PACING: [measured / fast / deliberate / accelerating / breathe-then-land]
  - STRUCTURAL PERSONALITY: [What makes THIS chapter's architecture different from every other?]
  - KEY PERMISSION: [The one adventurous thing the writer is allowed to do in this chapter]

• SECTION-BY-SECTION BREAKDOWN:
  For each major section within the chapter:
  - Section title or focus
  - The argument this section advances
  - The evidence/story/case study that illustrates it
  - Named sources, studies, cases, data points (specific, not "research shows")
  - How this section connects to the next (But/Therefore transition)

• SIDEBAR / BOX PLACEMENTS:
  ${genre.sidebarRequirements}

• CHARACTER/SUBJECT THREAD:
  - How the running character(s) appear in this chapter
  - What they illustrate about this chapter's argument
  - Their emotional/practical position at chapter end

• BUT/THEREFORE SPINE (for this chapter):
  - Reader believes X at chapter start
  - BUT [the evidence/story that complicates this belief]
  - THEREFORE [the new understanding the reader arrives at]
  - This creates the tension that makes chapter N+1 necessary

• CHAPTER CLOSE:
  - The landing paragraph/sentence that seals the chapter's argument
  - Must function as both conclusion AND hook to the next chapter
  - Should be quotable — the sentence a reader would photograph and share

${genre.chapterSpecificRequirements}`,

      phase3: `
1. SIDEBAR MASTER LIST
   | Sidebar Title | Chapter | Type (Playbook/Checklist/Data/Story) | Purpose |

2. CHARACTER/SUBJECT APPEARANCES
   | Character | Chapters | Role in Each | Arc Summary |

3. EVIDENCE CHAIN
   | Claim/Argument | Supporting Evidence | Chapter | Source Type |

4. BUT/THEREFORE MAP (full book)
   | Chapter | Reader Believes | BUT | THEREFORE | New Question |

5. ENGAGEMENT DEVICE INVENTORY
   | Device | Chapter | Position | Purpose |
   (Sidebars, boxes, interludes, data visualizations, checklists)

${genre.referenceRequirements}`
    };
  }

  getSystemPrompt() {
    return `You are an elite non-fiction outline architect, trained on the structural patterns of the most successful investigative, narrative, and prescriptive non-fiction of the last two decades.

You create outlines at the depth of the best-in-genre: the chapter-by-chapter specificity of a film's shooting script, the evidence architecture of a legal brief, and the emotional precision of literary narrative.

YOUR REFERENCE STANDARD:
The outline for "HR Means Human Removal" — a 13-chapter, 4-part non-fiction investigation with:
- Named epigraphs for every chapter
- Opening strategy rotation (no two chapters open alike)
- Chapter personality assignments (mode, feel, pacing, key permission per chapter)
- Scene-level narrative detail for character threads
- 21 named sidebars with specific content direction
- But/Therefore spine connecting every chapter to the next
- Master reference tables tracking characters, sidebars, evidence, and engagement devices

YOUR PRINCIPLES:
1. SPECIFICITY IS CREDIBILITY — Never "research shows." Say WHO researched WHAT, WHEN, and WHAT THEY FOUND. Name the study, the institution, the year. Abstract claims earn nothing.
2. BUT/THEREFORE IS THE ENGINE — Every chapter, every section, every argument must be connected by causation. "This is true, BUT this complicates it, THEREFORE consider this" — not "also, additionally, furthermore."
3. NARRATIVE CARRIES ARGUMENT — Every argument needs a human face. A statistic without a story is forgotten. A story without a statistic is anecdote. Use both.
4. THE READER IS IN THE ROOM — Use "you." The reader is not observing from outside. They are inside the argument. This is happening to them.
5. SIDEBARS ARE WEAPONS — Not decorative boxes. Not review material. Each sidebar is a self-contained tool the reader can use IMMEDIATELY. "The 5 Signs You're In the Exit Pipeline" — not "Summary of Key Points."
6. CHAPTER CLOSES ARE CHAPTER HOOKS — No soft landings. The last sentence of every chapter must create a question or tension that makes the next chapter NECESSARY.
7. COMMIT TO CHOICES — No "TBD," no "various perspectives," no hedge language. Take a position. Present the evidence. Let the reader reach the verdict.`;
  }

  getMasterPromptSystemPrompt() {
    return `You are generating a Master Prompt for a non-fiction book — the definitive voice, style, and quality control document that will govern how every chapter is written.

YOUR REFERENCE STANDARD is the Master Prompt for "HR Means Human Removal" which includes:
- PERMISSION TO BE BOLD (what the writer can and cannot do)
- AUTHOR'S VOICE DNA (controlled fury, specificity as credibility, direct address, dark humor of recognition, breath and rhythm, trust the reader — each with RIGHT/WRONG examples)
- CHAPTER PERSONALITY ASSIGNMENTS (mode, feel, pacing, structural personality, key permission for EACH chapter)
- OPENING STRATEGY ROTATION (8 named strategies mapped to specific chapters)
- ADVENTUROUS TECHNIQUES TOOLKIT (withheld context, sidebar ambush, named years, uncomfortable sympathy, slow paragraph, one-sentence section, callback, unexpected admission)
- BUT/THEREFORE MANDATE (macro, mid, and micro levels)
- AI-TELL KILL LIST (hard limits, once-per-chapter maximums, rhythm test)
- QUALITY TESTS (opening line test, chapter personality test, Marcus test, midnight test, share test)

The Master Prompt you generate must be AT LEAST this specific and this detailed. It must reference THIS book's actual characters, themes, chapters, and content — not generic writing advice.`;
  }
}
