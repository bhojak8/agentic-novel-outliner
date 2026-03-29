/**
 * FICTION AGENT — Generates outlines for full-length fiction novels
 * 
 * Genres: Literary Fiction, Thriller/Suspense, Mystery/Crime, Romance,
 *         Science Fiction, Fantasy, Horror, Historical Fiction
 */

import { FICTION_GENRES } from './genres.js';

export class FictionAgent {
  constructor() {
    this.type = 'Fiction Novel';
    this.id = 'fiction';
  }

  getGenres() {
    return Object.entries(FICTION_GENRES).map(([id, g]) => ({
      id,
      name: g.name,
      description: g.description,
      icon: g.icon
    }));
  }

  getGenreConfig(genreId) {
    const genre = FICTION_GENRES[genreId];
    if (!genre) throw new Error(`Unknown fiction genre: ${genreId}`);
    return genre;
  }

  getOutlineTemplate(genreId) {
    const genre = FICTION_GENRES[genreId];
    return {
      phase1: `
1. BOOK PREMISE & HOOK
   - Logline (one sentence that would make a reader buy the book)
   - 3 comparable titles and how this book differs from each
   - Target audience (specific, not "anyone who likes fiction")
   - The ONE question the book answers — the engine that drives 300+ pages

2. CHARACTER ARCHITECTURE
   For the PROTAGONIST:
   - Full name, age, occupation, defining physical detail
   - Core wound (what happened before page 1 that shaped them)
   - Want (what they pursue consciously through the plot)
   - Need (what they actually need but don't know yet)
   - The lie they believe about themselves or the world
   - Arc trajectory: who they are on page 1 → who they are on the last page
   
   For the ANTAGONIST / OPPOSING FORCE:
   - Same level of detail. The antagonist must believe they are right.
   - Their goal must be in DIRECT conflict with the protagonist's want
   
   For 3-5 SUPPORTING CHARACTERS:
   - Name, role, relationship to protagonist
   - What thematic argument they embody
   - Their arc assignment (which aspect of the theme do they illuminate?)

3. STRUCTURAL SPINE
   ${genre.structuralRequirements}
   
   - Act structure with specific turning points (not vague "things escalate")
   - Inciting incident: the specific event that breaks the protagonist's normal world
   - Midpoint reversal: the event that changes the nature of the story
   - Dark night / All is lost moment
   - Climax: the specific confrontation or decision
   - Resolution: what the new normal looks like
   - The But/Therefore chain across the full arc

4. THEMATIC ARCHITECTURE
   - Primary theme stated as a question, not an answer
   - 2-3 secondary themes
   - How each character represents a different answer to the thematic question
   ${genre.thematicRequirements}

5. WORLD & SETTING
   ${genre.worldBuildingRequirements}
`,

      phase2: `
FOR EACH CHAPTER (generate ALL chapters), provide:

CHAPTER [NUMBER]: [TITLE]
(Target: ${genre.chapterWordCount} words)

• OPENING STRATEGY: [Name the specific strategy — cold scene, devastating fact, direct address, 
  counter-narrative, composite story, etc. No two chapters may use the same opening strategy]

• CHAPTER PERSONALITY:
  - MODE: [What kind of writing energy does this chapter have?]
  - FEEL: [What emotion should the reader experience?]
  - PACING: [Fast/measured/slow/accelerating/decelerating]

• SCENE BREAKDOWN:
  For each scene in this chapter:
  - Scene setting (where, when, sensory anchor)
  - POV character
  - What happens (action/event level)
  - What the reader learns that they didn't know before
  - What the character doesn't know yet (dramatic irony if applicable)
  - Emotional state of POV character entering → exiting this scene
  - Dialogue direction (key exchanges, not full scripts)
  ${genre.sceneRequirements}

• SUBPLOT ADVANCEMENT:
  - Which subplot(s) move forward in this chapter
  - How much they advance (planted seed / growing / payoff)

• BUT/THEREFORE SPINE:
  - Reader believes X at chapter start → BUT [complication] → THEREFORE [new understanding]
  - This creates the tension that makes chapter N+1 necessary

• CHAPTER CLOSE:
  - The specific hook, image, or sentence that pulls the reader into the next chapter
  - No soft landings. Every chapter earns the next one.

${genre.chapterSpecificRequirements}`,

      phase3: `
1. SETUP & PAYOFF TRACKER
   | Setup (what was planted) | Chapter Planted | Payoff Description | Chapter Paid Off |
   Every Chekhov's gun, every foreshadowing, every planted detail — tracked.

2. CHARACTER ARC MILESTONES
   | Character | Chapter | Milestone | Emotional State |
   Track every significant character moment across the full novel.

3. SUBPLOT STATUS TRACKER
   | Subplot | Chapters Active | Status at Midpoint | Resolution Chapter |

4. THEMATIC THREAD MAP
   | Theme | Chapter | How It Manifests |

5. PACING BLUEPRINT
   | Chapter | Tension Level (1-10) | Type (Action/Reflection/Revelation/Confrontation) |
   Map the emotional rhythm of the full novel.

${genre.referenceRequirements}`
    };
  }

  getSystemPrompt() {
    return `You are an elite fiction outline architect. You create outlines at the depth and specificity of a film's shooting script — not summaries, not synopses, but production-ready blueprints that a skilled writer can execute chapter by chapter.

YOUR PRINCIPLES:
1. SPECIFICITY OVER GENERALITY — Never write "they argue about their relationship." Write "Sarah finds the hotel receipt in his jacket. She puts it back. She watches his face at dinner when he reaches for the jacket."
2. BUT/THEREFORE OVER AND/THEN — Every scene, chapter, and act must be connected by causation, not sequence. Not "this happens and then this happens" but "this happens, BUT it causes this problem, THEREFORE the character must..."
3. CHARACTER IS ACTION — Characters are defined by what they DO under pressure, not by adjectives. Show the action they take, not a personality description.
4. THE READER IS THE JURY — Never tell the outline user what the reader "should feel." Build the evidence. Let the emotional verdict arrive through specificity.
5. COMMIT TO CHOICES — No "TBD," no "various options," no hedge language. Make specific, bold creative choices. The outline user can always change them.
6. EVERY CHAPTER MUST EARN THE NEXT — No chapter exists in isolation. Every chapter's ending must create a question or tension that makes the next chapter necessary.

You are not writing a book report about a book that doesn't exist. You are building the architectural blueprint for a building someone is about to construct. Every beam placement matters.`;
  }

  getMasterPromptSystemPrompt() {
    return `You are generating a Master Prompt — a comprehensive writing guide for a fiction novel. This document will be handed to an AI or human writer along with the outline to govern HOW the chapters are written.

The Master Prompt must be SPECIFIC to this particular book. Reference actual character names, chapter content, themes, and plot points. A generic writing guide is worthless. A specific one is invaluable.

Study this reference for the level of specificity expected:
- Voice characteristics must include RIGHT/WRONG examples using THIS book's content
- Chapter personality assignments must reference THIS book's actual chapter content
- Quality tests must reference THIS book's specific characters and themes
- The AI-tell kill list must be calibrated to THIS book's genre and voice

The Master Prompt is what separates a forgettable draft from a publishable manuscript.`;
  }
}
