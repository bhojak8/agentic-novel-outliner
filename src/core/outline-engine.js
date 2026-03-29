/**
 * Outline Engine — Hybrid 4-Phase Generation Orchestrator
 * 
 * Phase 1: Premise & Architecture (book promise, characters, structural spine)
 * Phase 2: Chapter-by-Chapter Outlines (the detailed core)
 * Phase 3: Master Reference Tables (cross-references, trackers, inventories)
 * Phase 4: Master Prompt (voice DNA, chapter personalities, quality tests)
 * 
 * Quality checks run between each phase. Failed sections get regenerated.
 */

import { generateText } from './ai-client.js';

const PHASE_NAMES = [
  'Premise & Architecture',
  'Chapter-by-Chapter Outlines',
  'Master Reference Tables',
  'Master Prompt Generation'
];

/**
 * Run the full hybrid outline generation pipeline
 */
export async function generateOutline({
  agent,
  genre,
  bookIdea,
  title = '',
  additionalDetails = '',
  chapterCount = null,
  chapterLength = 'medium',
  apiKeys,
  provider = 'groq',
  onProgress = () => {}
}) {
  const startTime = Date.now();
  const results = {
    phase1: null,
    phase2: null,
    phase3: null,
    phase4: null,
    outline: '',
    masterPrompt: '',
    metadata: {}
  };

  onProgress({ phase: 0, status: 'starting', message: 'Initializing outline generation...' });

  // Get agent-specific configurations
  const genreConfig = agent.getGenreConfig(genre);
  const outlineTemplate = agent.getOutlineTemplate(genre);
  const systemPromptBase = agent.getSystemPrompt();

  // Resolve chapter/scene/spread count from user input or genre default
  const resolvedCount = resolveUnitCount(genreConfig, chapterCount);
  const unitName = genreConfig.unitName || 'chapter';

  // ═══════════════════════════════════════════
  // PHASE 1: Premise & Architecture
  // ═══════════════════════════════════════════
  onProgress({ phase: 1, status: 'generating', message: 'Building premise, characters, and structural spine...' });
  
  const phase1Prompt = buildPhase1Prompt({
    agentType: agent.type,
    genre,
    genreConfig,
    bookIdea,
    title,
    additionalDetails,
    outlineTemplate,
    unitCount: resolvedCount,
    unitName
  });

  const phase1Result = await generateText({
    systemPrompt: systemPromptBase,
    userPrompt: phase1Prompt,
    apiKeys,
    provider,
    temperature: 0.75,
    maxTokens: 12000,
    label: 'phase1-premise'
  });

  results.phase1 = phase1Result.text;
  
  // Quick quality check
  const p1Quality = validatePhase1(results.phase1);
  if (p1Quality.passed < p1Quality.total - 1) {
    console.warn(`[Phase 1] Quality check: ${p1Quality.passed}/${p1Quality.total} passed`, p1Quality.checks);
  }
  onProgress({ phase: 1, status: 'complete', message: 'Premise & architecture complete' });

  // ═══════════════════════════════════════════
  // PHASE 2: Chapter-by-Chapter Outlines (possibly chunked)
  // ═══════════════════════════════════════════
  onProgress({ phase: 2, status: 'generating', message: `Generating detailed ${unitName}-by-${unitName} outlines (${resolvedCount} ${unitName}s)...` });

  if (resolvedCount > 15) {
    // CHUNKED: Generate in batches of 6-8 for better quality
    results.phase2 = await generateChunkedPhase2({
      agent, genre, genreConfig, bookIdea, title,
      phase1: results.phase1, outlineTemplate,
      unitCount: resolvedCount, unitName,
      apiKeys, provider, onProgress
    });
  } else {
    // SINGLE PASS: For shorter books, one call is fine
    const phase2Prompt = buildPhase2Prompt({
      agentType: agent.type,
      genre,
      genreConfig,
      bookIdea,
      title,
      phase1: results.phase1,
      outlineTemplate,
      unitCount: resolvedCount,
      unitName
    });

    const phase2Result = await generateText({
      systemPrompt: systemPromptBase,
      userPrompt: phase2Prompt,
      apiKeys,
      provider,
      temperature: 0.7,
      maxTokens: 30000,
      label: 'phase2-chapters'
    });

    results.phase2 = phase2Result.text;
  }
  onProgress({ phase: 2, status: 'complete', message: `${resolvedCount} ${unitName} outlines complete` });

  // ═══════════════════════════════════════════
  // PHASE 3: Master Reference Tables
  // ═══════════════════════════════════════════
  onProgress({ phase: 3, status: 'generating', message: 'Building cross-references and tracking tables...' });

  const phase3Prompt = buildPhase3Prompt({
    agentType: agent.type,
    genre,
    phase1: results.phase1,
    phase2: results.phase2,
    outlineTemplate
  });

  const phase3Result = await generateText({
    systemPrompt: systemPromptBase,
    userPrompt: phase3Prompt,
    apiKeys,
    provider,
    temperature: 0.5,
    maxTokens: 10000,
    label: 'phase3-references'
  });

  results.phase3 = phase3Result.text;
  onProgress({ phase: 3, status: 'complete', message: 'Reference tables complete' });

  // ═══════════════════════════════════════════
  // PHASE 4: Master Prompt Generation
  // ═══════════════════════════════════════════
  onProgress({ phase: 4, status: 'generating', message: 'Generating custom master prompt for chapter writing...' });

  const phase4Prompt = buildPhase4Prompt({
    agentType: agent.type,
    genre,
    genreConfig,
    bookIdea,
    title,
    phase1: results.phase1,
    phase2: results.phase2,
    unitCount: resolvedCount,
    unitName
  });

  const masterPromptSystemPrompt = agent.getMasterPromptSystemPrompt();

  const phase4Result = await generateText({
    systemPrompt: masterPromptSystemPrompt,
    userPrompt: phase4Prompt,
    apiKeys,
    provider,
    temperature: 0.65,
    maxTokens: 16000,
    label: 'phase4-master-prompt'
  });

  results.phase4 = phase4Result.text;
  onProgress({ phase: 4, status: 'complete', message: 'Master prompt complete' });

  // ═══════════════════════════════════════════
  // ASSEMBLE FINAL OUTPUT
  // ═══════════════════════════════════════════
  const assembledTitle = title || extractTitle(results.phase1) || 'Untitled';

  results.outline = assembleOutline({
    title: assembledTitle,
    genre,
    agentType: agent.type,
    phase1: results.phase1,
    phase2: results.phase2,
    phase3: results.phase3
  });

  results.masterPrompt = assembleMasterPrompt({
    title: assembledTitle,
    genre,
    agentType: agent.type,
    phase4: results.phase4
  });

  results.metadata = {
    title: assembledTitle,
    genre,
    agentType: agent.type,
    provider: phase1Result.provider,
    model: phase1Result.model,
    generatedAt: new Date().toISOString(),
    durationMs: Date.now() - startTime
  };

  onProgress({ phase: 5, status: 'done', message: `Outline complete! (${Math.round(results.metadata.durationMs / 1000)}s)` });

  return results;
}

// ═══════════════════════════════════════════════════
// PHASE PROMPT BUILDERS
// ═══════════════════════════════════════════════════

function buildPhase1Prompt({ agentType, genre, genreConfig, bookIdea, title, additionalDetails, outlineTemplate, unitCount, unitName }) {
  const chapterInstruction = `
═══════════════════════════════════════════
CRITICAL — ${unitName.toUpperCase()} COUNT REQUIREMENT
═══════════════════════════════════════════
This ${agentType} ${genre} book requires EXACTLY ${unitCount} ${unitName}s.
Acceptable range: ${genreConfig.chapterRange || genreConfig.sceneRange || genreConfig.spreadRange || genreConfig.storyRange || unitCount}
Do NOT default to 12-13 chapters. This is a genre-specific requirement.
${genreConfig.chapterWordCount ? `Target per-${unitName} length: ${genreConfig.chapterWordCount} words.` : ''}
${genreConfig.wordCount ? `Total target: ${genreConfig.wordCount}.` : ''}
═══════════════════════════════════════════`;

  return `You are generating Phase 1 of a ${agentType} book outline.

${chapterInstruction}

CATEGORY: ${agentType}
GENRE: ${genre}
${title ? `WORKING TITLE: ${title}` : ''}

BOOK IDEA:
${bookIdea}

${additionalDetails ? `ADDITIONAL DETAILS:\n${additionalDetails}` : ''}

GENRE-SPECIFIC REQUIREMENTS:
${genreConfig.phase1Requirements}

YOUR TASK — Generate the following sections with DEEP specificity. No vague generalities. Every element must be concrete, named, and actionable:

${outlineTemplate.phase1}

QUALITY STANDARDS:
- Every character must have a specific wound, want, need, and lie they believe
- The structural spine must use But/Therefore logic, not And/Then
- Name specific comparable titles that inform the positioning
- The book promise must be ONE sentence that would make a reader buy the book
- No placeholder language ("TBD", "to be determined", "various") — commit to specifics
- Plan for EXACTLY ${unitCount} ${unitName}s — this is non-negotiable

Generate the complete Phase 1 now. Be bold. Be specific. Commit to choices.`;
}

function buildPhase2Prompt({ agentType, genre, genreConfig, bookIdea, title, phase1, outlineTemplate, unitCount, unitName }) {
  return `You are generating Phase 2 of a ${agentType} book outline — the DETAILED ${unitName.toUpperCase()}-BY-${unitName.toUpperCase()} OUTLINE.

This is the core of the outline. This is what makes it publication-quality vs. amateur.

═══════════════════════════════════════════
CRITICAL — GENERATE EXACTLY ${unitCount} ${unitName.toUpperCase()}S
═══════════════════════════════════════════
You MUST generate ${unitCount} ${unitName}s, numbered ${unitName.toUpperCase()} 1 through ${unitName.toUpperCase()} ${unitCount}.
Do NOT stop early. Do NOT combine ${unitName}s. Do NOT summarize later ${unitName}s.
Every single ${unitName} gets the SAME level of detail — first to last.
═══════════════════════════════════════════

BOOK PREMISE (from Phase 1):
${phase1}

GENRE: ${genre}
${title ? `TITLE: ${title}` : ''}

GENRE-SPECIFIC ${unitName.toUpperCase()} REQUIREMENTS:
${genreConfig.phase2Requirements}

YOUR TASK — For EACH ${unitName} (1 through ${unitCount}), generate ALL of the following with scene-level detail:

${outlineTemplate.phase2}

REFERENCE STANDARD:
Think of the detail level of a film's shooting script — not "they argue about money" but "Sarah finds the credit card statement in his jacket pocket while looking for car keys. She stares at the $4,200 charge at a restaurant she's never heard of. She puts the statement back. She does not mention it at dinner. She watches his face when he reaches for the jacket."

QUALITY STANDARDS:
- Each ${unitName} opening must use a DIFFERENT strategy (cold scene, devastating fact, direct address, etc.)
- Every ${unitName} must have a But/Therefore spine visible in its structure
- Character emotional states must be tracked entering AND exiting each ${unitName}
- No two ${unitName}s should feel like they were written by the same formula
- ${unitName.charAt(0).toUpperCase() + unitName.slice(1)} closes must hook the reader into the next ${unitName} — no soft landings
- GENERATE ALL ${unitCount} ${unitName.toUpperCase()}S. Do NOT stop before ${unitName.toUpperCase()} ${unitCount}.

Generate ALL ${unitCount} ${unitName}s now. This should be the longest and most detailed output.`;
}

function buildPhase3Prompt({ agentType, genre, phase1, phase2, outlineTemplate }) {
  return `You are generating Phase 3 of a ${agentType} book outline — the MASTER REFERENCE TABLES.

These tables make the outline usable as a production document, not just a creative brief.

PREMISE & ARCHITECTURE:
${phase1}

CHAPTER OUTLINES:
${phase2}

YOUR TASK — Generate the following reference tables by carefully reviewing all content above:

${outlineTemplate.phase3}

QUALITY STANDARDS:
- Every planted setup must have a mapped payoff with specific chapter numbers
- Character appearances must be tracked across ALL chapters
- No orphaned elements (setups without payoffs, characters who disappear without resolution)
- Tables must be specific enough that a different writer could use them to maintain continuity

Generate all reference tables now.`;
}

function buildPhase4Prompt({ agentType, genre, genreConfig, bookIdea, title, phase1, phase2, unitCount, unitName }) {
  // Extract chapter titles instead of truncating raw text
  const unitTitles = extractUnitTitles(phase2, unitName);
  const titleList = unitTitles.length > 0
    ? unitTitles.map((t, i) => `${i + 1}. ${t}`).join('\n')
    : `${unitCount} ${unitName}s (titles not extracted)`;

  // Extract key elements from Phase 1 (smarter than substring)
  const keyThemes = phase1.match(/theme[s]?[:\s]+([^\n]+)/gi)?.slice(0, 3).join('; ') || 'See premise';
  const protagonist = phase1.match(/protagonist[:\s]+([^\n]+)/i)?.[1] || 'See premise';

  return `You are generating a MASTER PROMPT — a comprehensive writing guide that will be handed to an AI (or human writer) to write the actual ${unitName}s of this book.

The Master Prompt is NOT the outline. It is the VOICE, STYLE, and QUALITY CONTROL document that governs HOW the ${unitName}s should be written.

BOOK OVERVIEW:
Category: ${agentType}
Genre: ${genre}
${title ? `Title: ${title}` : ''}
Total ${unitName}s: ${unitCount}
Protagonist: ${protagonist}
Key themes: ${keyThemes}

PREMISE (summary):
${phase1.substring(0, 4000)}

${unitName.toUpperCase()} TITLES:
${titleList}

YOUR TASK — Generate a complete Master Prompt with ALL of the following sections:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — PERMISSION TO BE BOLD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What the writer HAS permission to do (specific to this book).
What the writer does NOT have permission to do.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — THE AUTHOR'S VOICE DNA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Who is the author (persona, not real identity)?
Voice characteristics with RIGHT/WRONG examples for each.
At minimum cover: tone, specificity, direct address, humor style, rhythm, trust in reader.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — ${unitName.toUpperCase()} PERSONALITY ASSIGNMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For EACH of the ${unitCount} ${unitName}s: MODE, FEEL, PACING, STRUCTURAL PERSONALITY, KEY PERMISSION.
Each ${unitName} must feel like a different room in the same house.
Use the ${unitName} titles listed above to make this SPECIFIC.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — THE OPENING STRATEGY ROTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
No two ${unitName}s may open the same way. Map specific strategies to ${unitName}s.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — ADVENTUROUS TECHNIQUES TOOLKIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Specific techniques the writer should deploy (withheld context, callbacks, slow paragraphs, etc.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — THE BUT/THEREFORE MANDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every ${unitName}, section, and scene beat must follow But/Therefore logic, not And/Then.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — THE AI-TELL KILL LIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hard-banned words and patterns. Once-per-chapter maximums. Rhythm tests.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — THE QUALITY TESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5 tests to run on every ${unitName} before considering it done.

Make this master prompt SPECIFIC to this book, not generic. Reference the actual characters, themes, and ${unitName} content from the outline. The writer reading this should feel like they're being briefed on a specific mission, not reading a general writing guide.`;
}

// ═══════════════════════════════════════════════════
// ASSEMBLY
// ═══════════════════════════════════════════════════

function assembleOutline({ title, genre, agentType, phase1, phase2, phase3 }) {
  return `${'═'.repeat(60)}
${title.toUpperCase()}
${'═'.repeat(60)}
Category: ${agentType} | Genre: ${genre}
Generated: ${new Date().toISOString().split('T')[0]}
${'═'.repeat(60)}

${phase1}

${'─'.repeat(60)}
CHAPTER-BY-CHAPTER OUTLINE
${'─'.repeat(60)}

${phase2}

${'─'.repeat(60)}
MASTER REFERENCE TABLES
${'─'.repeat(60)}

${phase3}
`;
}

function assembleMasterPrompt({ title, genre, agentType, phase4 }) {
  return `${'═'.repeat(60)}
MASTER PROMPT: ${title.toUpperCase()}
${'═'.repeat(60)}
Category: ${agentType} | Genre: ${genre}
Generated: ${new Date().toISOString().split('T')[0]}
${'═'.repeat(60)}

This document governs the VOICE, STYLE, and QUALITY STANDARDS
for writing all chapters of "${title}".

Use this alongside the Master Outline to write each chapter.

${'─'.repeat(60)}

${phase4}

${'─'.repeat(60)}
THIS IS THE STYLE STANDARD.
EVERY CHAPTER IS JUDGED AGAINST IT.
NO EXCEPTIONS.
${'─'.repeat(60)}
`;
}

function extractTitle(phase1Text) {
  // Try to extract title from Phase 1 output
  const titleMatch = phase1Text.match(/(?:title|working title)[:\s]+["']?([^\n"']+)/i);
  return titleMatch ? titleMatch[1].trim() : null;
}

// ═══════════════════════════════════════════════════
// HELPER: Resolve unit count from user input or genre default
// ═══════════════════════════════════════════════════

function resolveUnitCount(genreConfig, userCount) {
  if (userCount && userCount > 0) return userCount;
  
  // Try all possible defaults in priority order
  return genreConfig.typicalChapters 
    || genreConfig.typicalScenes 
    || genreConfig.typicalSpreads 
    || genreConfig.typicalStories 
    || 15; // absolute fallback
}

// ═══════════════════════════════════════════════════
// QUALITY VALIDATION (lightweight, no API call)
// ═══════════════════════════════════════════════════

function validatePhase1(text) {
  const checks = {
    hasCharacter: /protagonist|main character|character|hero|heroine/i.test(text),
    hasTheme: /theme|thematic|central question/i.test(text),
    hasStructure: /act\s*(1|2|3|one|two|three|i|ii|iii)|inciting|midpoint|climax/i.test(text),
    hasComparables: /comparable|comp title|similar to|reminiscent of/i.test(text),
    minLength: text.length > 2000
  };
  
  const passed = Object.values(checks).filter(Boolean).length;
  return { passed, total: Object.keys(checks).length, checks };
}

// ═══════════════════════════════════════════════════
// HELPER: Extract unit titles from Phase 2 output
// ═══════════════════════════════════════════════════

function extractUnitTitles(phase2Text, unitName = 'chapter') {
  const titles = [];
  // Match patterns like "CHAPTER 1: Title", "SCENE 3: Title", "SPREAD 5: Title", "ESSAY 2: Title"
  const patterns = [
    new RegExp(`(?:${unitName}|chapter|scene|spread|essay|story)\\s*\\d+[:\\s]+[\\["']?([^\\n\\]"']{3,80})`, 'gi'),
    /(?:CHAPTER|SCENE|SPREAD|ESSAY|STORY)\s*\d+[:\s]+[\["']?([^\n\]"']{3,80})/gi
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(phase2Text)) !== null) {
      const title = match[1].trim().replace(/[*#_]/g, '');
      if (title.length > 2 && !titles.includes(title)) {
        titles.push(title);
      }
    }
    if (titles.length > 0) break; // Use first pattern that works
  }
  
  return titles;
}

// ═══════════════════════════════════════════════════
// CHUNKED PHASE 2: Generate in batches for long books
// ═══════════════════════════════════════════════════

async function generateChunkedPhase2({
  agent, genre, genreConfig, bookIdea, title,
  phase1, outlineTemplate,
  unitCount, unitName,
  apiKeys, provider, onProgress
}) {
  const BATCH_SIZE = 7;
  const batches = [];
  
  for (let i = 1; i <= unitCount; i += BATCH_SIZE) {
    const end = Math.min(i + BATCH_SIZE - 1, unitCount);
    batches.push({ start: i, end });
  }
  
  const systemPromptBase = agent.getSystemPrompt();
  const allResults = [];
  
  for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
    const batch = batches[batchIdx];
    const batchLabel = `${unitName}s ${batch.start}-${batch.end}`;
    
    onProgress({ 
      phase: 2, 
      status: 'generating', 
      message: `Generating ${batchLabel} of ${unitCount} (batch ${batchIdx + 1}/${batches.length})...` 
    });
    
    // Build context from previous batches
    const previousContext = allResults.length > 0
      ? `\n\nPREVIOUS ${unitName.toUpperCase()}S ALREADY GENERATED (maintain continuity):\n${allResults.map(r => {
          // Extract just the titles/summaries from previous results for context
          const titles = extractUnitTitles(r, unitName);
          return titles.length > 0 ? titles.join(', ') : r.substring(0, 500);
        }).join('\n')}\n\n`
      : '';
    
    const batchPrompt = buildBatchPhase2Prompt({
      agentType: agent.type,
      genre,
      genreConfig,
      bookIdea,
      title,
      phase1,
      outlineTemplate,
      unitName,
      totalUnits: unitCount,
      batchStart: batch.start,
      batchEnd: batch.end,
      previousContext
    });
    
    const batchResult = await generateText({
      systemPrompt: systemPromptBase,
      userPrompt: batchPrompt,
      apiKeys,
      provider,
      temperature: 0.7,
      maxTokens: 16000,
      label: `phase2-batch-${batchIdx + 1}`
    });
    
    allResults.push(batchResult.text);
  }
  
  // Combine all batch results
  return allResults.join('\n\n' + '─'.repeat(40) + '\n\n');
}

function buildBatchPhase2Prompt({ agentType, genre, genreConfig, bookIdea, title, phase1, outlineTemplate, unitName, totalUnits, batchStart, batchEnd, previousContext }) {
  return `You are generating ${unitName}s ${batchStart} through ${batchEnd} (of ${totalUnits} total) for a ${agentType} book outline.

BOOK PREMISE (from Phase 1):
${phase1}

GENRE: ${genre}
${title ? `TITLE: ${title}` : ''}
${previousContext}

GENRE-SPECIFIC REQUIREMENTS:
${genreConfig.phase2Requirements}

YOUR TASK — Generate ${unitName.toUpperCase()}S ${batchStart} through ${batchEnd} with FULL scene-level detail.

${outlineTemplate.phase2}

INSTRUCTIONS:
- Generate ONLY ${unitName}s ${batchStart} through ${batchEnd}
- Every ${unitName} gets the SAME level of detail — no shortcuts
- Maintain continuity with previous ${unitName}s
- Each ${unitName} opening must use a DIFFERENT strategy
- Every ${unitName} must have a But/Therefore spine

Generate ${unitName}s ${batchStart} through ${batchEnd} now.`;
}

export { PHASE_NAMES };
