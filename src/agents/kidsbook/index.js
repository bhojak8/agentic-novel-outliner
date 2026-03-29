/**
 * KIDS BOOK AGENT — Generates outlines for children's books
 * 
 * Genres: Picture Book, Early Reader, Chapter Book, Middle Grade, Educational/Concept
 * Each has fundamentally different structural requirements.
 */

import { KIDSBOOK_GENRES } from './genres.js';

export class KidsBookAgent {
  constructor() {
    this.type = "Kids Book";
    this.id = 'kidsbook';
  }

  getGenres() {
    return Object.entries(KIDSBOOK_GENRES).map(([id, g]) => ({
      id,
      name: g.name,
      description: g.description,
      icon: g.icon
    }));
  }

  getGenreConfig(genreId) {
    const genre = KIDSBOOK_GENRES[genreId];
    if (!genre) throw new Error(`Unknown kids book genre: ${genreId}`);
    return genre;
  }

  getOutlineTemplate(genreId) {
    const genre = KIDSBOOK_GENRES[genreId];
    return {
      phase1: `
1. BOOK IDENTITY
   - 3-5 title ideas (fun, memorable, age-appropriate)
   - Age range: ${genre.ageRange}
   - Reading level: ${genre.readingLevel}
   - 3 comparable titles in this exact format/age range
   - The lesson/message (SUBTLE — never preachy, never stated outright)
   - Series potential: yes/no and setup for continuation
   - Word count target: ${genre.wordCount}

2. CHARACTER DESIGN
   For the PROTAGONIST:
   - Name (fun to say, easy to remember)
   - Age, personality traits (relatable to target reader)
   - One lovable flaw (readers bond with imperfection)
   - One key strength (that solves the problem by story's end)
   - How they TALK (voice sample: 2-3 example sentences in character)
   
   For the SIDEKICK/FRIEND/COMPANION:
   - Name, relationship to protagonist
   - How they complement the protagonist (brave/cautious, loud/quiet, etc.)
   - Their role in the story's resolution
   
   For the OBSTACLE (not necessarily a "villain"):
   - What stands in the protagonist's way
   - For younger books: often a situation, misunderstanding, or fear — not a person
   - If a character: what makes them more than just "bad"

3. STRUCTURAL BLUEPRINT
   ${genre.structuralRequirements}

4. EMOTIONAL ARCHITECTURE
   - What emotion does the reader feel at the START? (curiosity, excitement, wonder)
   - What emotion do they feel at the MIDDLE? (suspense, empathy, laughter)
   - What emotion do they feel at the END? (satisfaction, warmth, inspiration)
   - The emotional rhythm: ${genre.emotionalRhythm}

5. SENSITIVITY & APPROPRIATENESS
   - Themes handled and HOW (age-appropriate treatment)
   - Conflict resolution method (violence? negotiation? empathy? cleverness?)
   - Representation notes (diversity, inclusion — natural, not tokenized)
   - What is deliberately NOT included and why
   ${genre.sensitivityNotes}`,

      phase2: `
${genre.phase2Template}`,

      phase3: `
1. CHARACTER CONSISTENCY
   | Character | Trait | How It's Shown | ${genre.consistencyColumn} |

2. EMOTIONAL ARC
   | ${genre.arcUnit} | Reader Emotion | Character Emotion | Energy Level (1-10) |

3. LESSON DELIVERY AUDIT
   | Message Element | Where It Appears | Method (shown/implied/never stated) |
   The lesson must NEVER be stated directly. It must be FELT through the story.

${genre.referenceRequirements}`
    };
  }

  getSystemPrompt() {
    return `You are an elite children's book outline architect. You understand that writing for children is HARDER than writing for adults — not easier.

The best children's books respect their readers completely. They don't talk down. They don't over-explain. They trust children to feel complex emotions and understand sophisticated stories told with simple, precise language.

YOUR PRINCIPLES:
1. THE LESSON IS INVISIBLE — If the reader can state the moral before the story earns it, you've failed. The message must be woven into the story so thoroughly that it's FELT, never SAID.
2. RESPECT THE READER'S AGE — A 4-year-old and a 10-year-old need fundamentally different books. Vocabulary, sentence structure, plot complexity, emotional register, and page count MUST match the age.
3. RE-READABILITY IS EVERYTHING — Children read favorites 50+ times. The outline must plan for LAYERS — things a child discovers on the 2nd, 5th, 20th reading.
4. FUN IS NON-NEGOTIABLE — A children's book can be profound, moving, and educational. But first it must be FUN. Joy, humor, surprise, delight, and play are the foundation.
5. PAGE TURNS ARE DRAMA — In picture books especially, the page turn is the most powerful tool. What's behind each page turn must reward the child's curiosity.
6. SOUND MATTERS — Children's books are often read ALOUD. The outline must plan for rhythm, repetition, mouth-feel words, and read-aloud performance moments.
7. THE ART DOES HALF THE WORK — In picture books, text and illustration tell DIFFERENT parts of the story. Plan what the text says and what the pictures show separately.

Your outlines should make editors at Scholastic, Penguin, or Harper Children's say "this person understands how children's books work."`;
  }

  getMasterPromptSystemPrompt() {
    return `You are generating a Master Prompt for a children's book. This must be calibrated to the specific age range and format.

For PICTURE BOOKS: emphasis on read-aloud rhythm, page-turn engineering, text/illustration relationship, refrain patterns, word choice (mouth-feel), and total word economy (under 1,000 words typically).

For CHAPTER BOOKS / MIDDLE GRADE: emphasis on chapter hooks, humor beats, voice consistency (sounding like the right age), emotional authenticity, and age-appropriate complexity.

The Master Prompt must include:
- Voice DNA with examples in the CHILD CHARACTER'S voice
- Read-aloud engineering notes (rhythm, repetition, performance moments)
- Age-appropriate vocabulary guide
- Humor strategy (what kind of humor works for this age range)
- Illustration direction (for picture books)
- Sensitivity guide (what to avoid, what to handle carefully)
- AI-tell kill list calibrated for children's writing (no adult-sounding prose, no lecturing, no over-explaining)`;
  }
}
