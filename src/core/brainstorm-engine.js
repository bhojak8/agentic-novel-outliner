/**
 * Brainstorm Engine — Interactive AI conversation to develop a book idea
 * 
 * Inspired by writero7's brainstorm system. Key improvements:
 * - Starter prompts for quick conversation kickoff
 * - Structured AI extraction (not raw text parsing) for Book Brief
 * - Genre-specific question strategies
 * - "Use as Book" auto-extraction after 3+ messages
 */

import { generateText } from './ai-client.js';

// ═══════════════════════════════════════════
// STARTER PROMPTS — per agent type
// ═══════════════════════════════════════════

export const STARTER_PROMPTS = {
  fiction: [
    { label: '🚀 Start with a "what if"', prompt: 'Help me develop a compelling "what if" premise for a novel — something that immediately creates dramatic tension' },
    { label: '🎭 Build a character first', prompt: 'Help me build a protagonist: someone with a core wound, a visible want, and a hidden need that drives the story' },
    { label: '🌍 Start from a setting', prompt: 'I have a setting in mind — help me discover what story NEEDS to be told in this world' },
    { label: '💡 Explore 3 directions', prompt: 'Give me 3 different novel directions with different genres, tones, and structural shapes that I could explore' },
    { label: '🔄 Stress-test my idea', prompt: 'I have a rough idea — stress-test it and show me where the story breaks or what\'s missing' },
  ],
  nonfiction: [
    { label: '🚀 Find the hard question', prompt: 'Help me find a hard question worth a whole book — something uncomfortable that demands investigation' },
    { label: '⚔️ Stress-test my thesis', prompt: 'Stress-test my verdict and show me the strongest counterargument' },
    { label: '💡 Suggest 3 directions', prompt: 'Suggest 3 non-fiction book ideas with different structural shapes, evidence strategies, and chapter scales' },
    { label: '🔗 Build a BUT/THEREFORE spine', prompt: 'Help me build a stronger BUT/THEREFORE argument spine for my book' },
    { label: '📊 Evidence framework', prompt: 'What evidence framework would make this book credible and memorable? Help me identify the types of proof I need' },
  ],
  shortstory: [
    { label: '🚀 Find the single moment', prompt: 'Help me find the ONE moment that this short story exists to capture — the image, the turn, the revelation' },
    { label: '🧊 Start from an image', prompt: 'I have a single image or scene in my head — help me discover the story hiding inside it' },
    { label: '💡 Explore 3 story seeds', prompt: 'Give me 3 short story ideas that each use a different structural approach and emotional register' },
    { label: '🔄 Compress my novel idea', prompt: 'I have what might be a novel idea — help me find the compressed, powerful short story hiding inside it' },
  ],
  kidsbook: [
    { label: '🚀 Start with the fun', prompt: 'Help me find what makes this book FUN — the thing kids want to read again and again' },
    { label: '🎭 Build a lovable character', prompt: 'Help me create a protagonist that kids will adore — someone with a silly flaw and a real strength' },
    { label: '💡 Explore 3 concepts', prompt: 'Give me 3 kids book concepts with different age ranges, structural formats, and emotional cores' },
    { label: '📖 Page-turn engineering', prompt: 'Help me think about this story in terms of page turns — what surprise or reward is behind each one?' },
  ]
};

// ═══════════════════════════════════════════
// SYSTEM PROMPTS — per agent type
// ═══════════════════════════════════════════

export function getBrainstormSystemPrompt(agentType, genreName) {
  const basePersonality = `You are an elite book development strategist and brainstorming partner. You help authors develop compelling ideas, build architectures, identify the strongest version of their concept, and turn vague inspiration into a real book.

RULES:
- Be enthusiastic, analytical, and specific
- When suggesting ideas, give 2-3 distinct angles with different structural approaches
- Ask follow-up questions to sharpen the concept — don't let vague ideas stay vague
- Keep responses focused and actionable, not generic
- Push for specificity: names, situations, concrete details — not abstractions
- Think like a world-class editor: what makes this a book someone HAS to read?
- Keep responses punchy: 3-6 sentences per turn unless summarizing
- Ask ONE focused question at a time — never overwhelm with a list of 5 questions
- Build on what the user says — reference their specific words and ideas`;

  const agentSpecific = {
    fiction: `
- Help identify: Who is the protagonist? What do they want vs. what do they need? Who/what stands in their way?
- Push for STAKES — what happens if the protagonist fails?
- Identify the emotional journey and core theme
- Suggest genre conventions and how to use or subvert them
- Think about comparable titles — what's the audience for this book?
- Help build the CONFLICT engine: what makes this story move forward?
- When they have enough detail, offer to structure the idea for outline generation
- Genre context: ${genreName}`,

    nonfiction: `
- Help identify: What is the central thesis? Is it arguable — would smart people disagree?
- Push for evidence strategy: what types of proof will anchor the book?
- Build the BUT/THEREFORE argument spine — how does each chapter escalate?
- Identify the hard question, the verdict, the prescription
- Who is the target reader? What do they believe now vs. after reading?
- What makes this different from existing books on the topic?
- Push for chapter structure that matches the scope and evidence load
- Do NOT default to any single chapter count — let scope determine structure
- Do NOT assume every book needs Part I/II/III — use parts only when justified
- Genre context: ${genreName}`,

    shortstory: `
- Short stories need COMPRESSION — help find the single, powerful core
- What is the TURN — the moment something shifts irreversibly?
- What is the subtext — what is the story ABOUT ABOUT?
- What is the relationship between opening and closing images?
- Push for economy: what can be cut? What must stay?
- Help them decide: is this really a short story, or is it trying to be a novel?
- Genre context: ${genreName}`,

    kidsbook: `
- Age range determines EVERYTHING — vocabulary, complexity, length, themes
- The lesson must be INVISIBLE — never stated, always felt through the story
- FUN is non-negotiable — what makes kids want to read this 50 times?
- For picture books: how do text and art split the storytelling?
- For chapter books/MG: does the voice sound like a real kid this age?
- The protagonist needs a lovable flaw AND a real strength
- Genre context: ${genreName}`
  };

  const extractionNote = `

IMPORTANT: When the conversation has enough substance (typically after 3-4 exchanges, when the core concept is clear), the system will offer to extract a structured Book Brief. You don't need to generate the brief yourself — just help the author develop the richest possible idea.`;

  const agentKey = agentType === 'nonfiction' ? 'nonfiction' 
    : agentType === 'shortstory' ? 'shortstory'
    : agentType === 'kidsbook' ? 'kidsbook' 
    : 'fiction';

  return basePersonality + agentSpecific[agentKey] + extractionNote;
}

// ═══════════════════════════════════════════
// EXTRACTION PROMPT — structured book brief
// ═══════════════════════════════════════════

function getExtractionPrompt(agentType, genreName) {
  const base = {
    fiction: `Extract the best novel idea from this brainstorming session into a COMPLETE book brief. Every field must be filled with substantive, specific content drawn from the conversation.

REQUIRED FIELDS:
1. TITLE: 2-3 options — sharp, memorable, genre-appropriate
2. GENRE: Best-fit genre and sub-genre
3. PREMISE: 3-5 sentence synopsis covering concept, protagonist, central conflict, and what makes it unique
4. PROTAGONIST: Name, age, situation, core wound, visible want, hidden need
5. ANTAGONIST/OPPOSITION: Who or what stands in the way, and WHY
6. SETTING: Where, when, and how the setting shapes the story
7. STAKES: What happens if the protagonist fails — make it feel real
8. THEME: What the story is ABOUT beyond its plot
9. EMOTIONAL JOURNEY: How the reader feels at start → middle → end
10. COMPARABLE TITLES: 2-3 books and how this one differs
11. TARGET AUDIENCE: Who specifically will love this book
12. STRUCTURAL NOTES: Any ideas about pacing, POV, timeline, structure
13. CHAPTER COUNT: Recommended range based on genre and scope
14. TONE: The book's voice and atmosphere

If the conversation only lightly touched a field, INFER the best answer from context.`,

    nonfiction: `Extract the best non-fiction book idea from this brainstorming session into a COMPLETE strategic brief. Every field must be filled with substantive, specific content drawn from the conversation.

REQUIRED FIELDS:
1. TITLE: Sharp, arguable, memorable — not safe or generic
2. SUBTITLE: Clarifies the positioning and promise
3. GENRE: Most fitting non-fiction genre
4. PREMISE: 3-5 sentences covering thesis, evidence approach, and reader takeaway
5. CENTRAL THESIS: Must be arguable — if nobody would disagree, it's not a thesis
6. HARD QUESTION: The uncomfortable question the book forces open
7. VERDICT: The book's hard conclusion — must take a clear side
8. PRESCRIPTION: Concrete, actionable — what should change and how
9. EVIDENCE STRATEGY: Specific evidence types (case studies, data, interviews, etc.)
10. TARGET AUDIENCE: Who specifically needs this book and why they care
11. COUNTERARGUMENT: The strongest intelligent objection — not a straw man
12. DIFFERENTIATION: What makes this meaningfully different from existing books
13. STRUCTURE PATTERN: Continuous escalation, thematic clusters, investigative ladder, etc.
14. CHAPTER COUNT: Match scope and evidence load (9-18 range typically)
15. CHAPTER IDENTITY DIRECTION: How tone/energy shifts across the arc
16. EMOTIONAL REGISTER: Furious? warm? clinical? urgent? wry?

If the conversation only lightly touched a field, INFER the best answer from context.`,

    shortstory: `Extract the best short story idea from this brainstorming session into a COMPLETE brief. Every field must be filled.

REQUIRED FIELDS:
1. TITLE: 2-3 options
2. GENRE/TYPE: Literary, genre, flash, etc.
3. CORE CONCEPT: The engine of the story in one sentence
4. THE QUESTION: What question does this story explore?
5. PROTAGONIST: Name, one defining detail, what they want
6. THE TURN: The moment something shifts irreversibly
7. SETTING: Where and when — sensory detail
8. SUBTEXT: What the story is ABOUT ABOUT (deeper meaning)
9. OPENING IMAGE: The first thing the reader sees
10. CLOSING IMAGE: The last thing — and how it relates to the opening
11. EMOTIONAL TARGET: The specific feeling the reader carries away
12. WORD COUNT: Recommended length
13. COMPARABLE STORIES: Published stories in conversation with this one

If the conversation only lightly touched a field, INFER the best answer from context.`,

    kidsbook: `Extract the best children's book idea from this brainstorming session into a COMPLETE brief. Every field must be filled.

REQUIRED FIELDS:
1. TITLE: 2-3 fun, memorable options
2. AGE RANGE: Target age and reading level
3. FORMAT: Picture book, early reader, chapter book, or middle grade
4. CONCEPT: The book's premise in one fun sentence
5. PROTAGONIST: Name, age, personality, lovable flaw, key strength
6. THE PROBLEM: What challenge drives the story
7. THE LESSON: What the child learns (must be felt, never stated)
8. THE FUN FACTOR: What makes kids want to read this again and again
9. COMPANION/SIDEKICK: Who helps the protagonist
10. EMOTIONAL JOURNEY: How the child feels start → middle → end
11. READ-ALOUD QUALITY: Repetition, rhythm, silly sounds, participation moments
12. WORD COUNT: Appropriate for the format and age range
13. SERIES POTENTIAL: Could this become a series? How?
14. COMPARABLE TITLES: Published children's books in conversation with this

If the conversation only lightly touched a field, INFER the best answer from context.`
  };

  const agentKey = agentType === 'nonfiction' ? 'nonfiction'
    : agentType === 'shortstory' ? 'shortstory'
    : agentType === 'kidsbook' ? 'kidsbook'
    : 'fiction';

  return base[agentKey];
}

// ═══════════════════════════════════════════
// CHAT FUNCTION
// ═══════════════════════════════════════════

export async function brainstormChat({ messages, systemPrompt, apiKeys, provider = 'groq' }) {
  const result = await generateText({
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    apiKeys,
    provider,
    temperature: 0.8,
    maxTokens: 2000,
    label: 'brainstorm'
  });

  return result.text;
}

// ═══════════════════════════════════════════
// STRUCTURED EXTRACTION — via AI
// ═══════════════════════════════════════════

/**
 * Extract a structured book brief from the brainstorm conversation.
 * Uses AI to analyze the full conversation and produce a comprehensive brief.
 */
export async function extractStructuredBrief({ messages, agentType, genreName, apiKeys, provider = 'groq' }) {
  const conversationText = messages
    .filter(m => m.role === 'assistant' || m.role === 'user')
    .map(m => `${m.role === 'user' ? 'AUTHOR' : 'AI PARTNER'}: ${m.content}`)
    .join('\n\n');

  const extractionPrompt = getExtractionPrompt(agentType, genreName);

  const result = await generateText({
    systemPrompt: `You are a book brief extraction specialist. You analyze brainstorming conversations and produce complete, structured book briefs. Be thorough — fill every field with specific, useful content. Use markdown formatting with headers and bullet points for readability.`,
    userPrompt: `${extractionPrompt}\n\n---\n\nBRAINSTORM CONVERSATION:\n${conversationText}`,
    apiKeys,
    provider,
    temperature: 0.4,
    maxTokens: 4000,
    label: 'extract-brief'
  });

  return result.text;
}

// ═══════════════════════════════════════════
// OPENING MESSAGE
// ═══════════════════════════════════════════

export function getOpeningMessage(agentType) {
  const openers = {
    fiction: "This is the idea-development stage. We'll find the core hook, build the characters, and shape the story before the outline generator turns it into architecture. What's the spark?",
    nonfiction: "This is the idea-development stage. We'll find the hard question, stress-test the verdict, and shape the argument before the outline generator turns it into architecture. What's on your mind?",
    shortstory: "Short stories are compression as art. Let's find the single moment, the turn, the image that won't let go. What's the seed of your story?",
    kidsbook: "Writing for kids is harder than writing for adults — every word has to earn its place and every page has to be fun. What's the idea that's got you excited?"
  };

  const agentKey = agentType === 'nonfiction' ? 'nonfiction'
    : agentType === 'shortstory' ? 'shortstory'
    : agentType === 'kidsbook' ? 'kidsbook'
    : 'fiction';

  return openers[agentKey];
}

/**
 * Check if enough material exists for extraction
 */
export function hasEnoughMaterial(messages) {
  const userMessages = messages.filter(m => m.role === 'user');
  return userMessages.length >= 2;
}
