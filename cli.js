#!/usr/bin/env node

/**
 * Agentic Novel Outliner — CLI
 * 
 * Usage:
 *   node cli.js                          # Interactive mode
 *   node cli.js --type fiction --genre thriller --idea "A tech CEO discovers..."
 */

import 'dotenv/config';
import { createInterface } from 'readline';
import { getAgentTypes, getAgent } from './src/core/agent-router.js';
import { generateOutline } from './src/core/outline-engine.js';
import { loadApiKeys, getDefaultProvider, getAvailableProviders } from './src/core/ai-client.js';
import { saveOutline } from './src/utils/file-output.js';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║             🖋️  AGENTIC NOVEL OUTLINER  🖋️                  ║
║         4-Agent System for Publication-Quality Outlines      ║
╚══════════════════════════════════════════════════════════════╝
`);

  // Load API keys
  const apiKeys = loadApiKeys(process.env);
  const defaultProvider = getDefaultProvider(process.env);
  const available = getAvailableProviders(apiKeys);
  
  if (available.length === 0) {
    console.error('❌ No API keys configured. Set at least one in .env:');
    console.error('   GROQ_API_KEY, OPENROUTER_API_KEY, or NVIDIA_API_KEY');
    process.exit(1);
  }

  console.log(`✓ AI Providers: ${available.map(p => p.name).join(', ')}`);
  console.log(`✓ Default: ${available.find(p => p.id === defaultProvider)?.name || available[0].name}\n`);

  // Parse CLI args for non-interactive mode
  const args = parseArgs(process.argv.slice(2));
  
  let agentType, genre, bookIdea, title, additionalDetails;

  if (args.type && args.genre && args.idea) {
    // Non-interactive mode
    agentType = args.type;
    genre = args.genre;
    bookIdea = args.idea;
    title = args.title || '';
    additionalDetails = args.details || '';
  } else {
    // Interactive mode
    const agentTypes = getAgentTypes();
    
    // Step 1: Choose category
    console.log('━━━ STEP 1: Choose Book Category ━━━\n');
    agentTypes.forEach((a, i) => {
      console.log(`  ${i + 1}. ${a.icon} ${a.name} — ${a.description}`);
    });
    
    const categoryChoice = await ask('\nSelect category (1-4): ');
    const selectedAgent = agentTypes[parseInt(categoryChoice) - 1];
    if (!selectedAgent) { console.error('Invalid choice'); process.exit(1); }
    agentType = selectedAgent.id;
    
    // Step 2: Choose genre
    console.log(`\n━━━ STEP 2: Choose Genre (${selectedAgent.name}) ━━━\n`);
    selectedAgent.genres.forEach((g, i) => {
      console.log(`  ${i + 1}. ${g.icon} ${g.name} — ${g.description}`);
    });
    
    const genreChoice = await ask('\nSelect genre: ');
    const selectedGenre = selectedAgent.genres[parseInt(genreChoice) - 1];
    if (!selectedGenre) { console.error('Invalid choice'); process.exit(1); }
    genre = selectedGenre.id;
    
    // Step 3: Book idea
    console.log('\n━━━ STEP 3: Describe Your Book ━━━\n');
    title = await ask('Working title (or press Enter to skip): ');
    console.log('\nDescribe your book idea. Be as detailed as possible —');
    console.log('premise, main characters, setting, what makes it unique.');
    console.log('(End input with an empty line)\n');
    
    const ideaLines = [];
    let line;
    while ((line = await ask('> ')) !== '') {
      ideaLines.push(line);
    }
    bookIdea = ideaLines.join('\n');
    
    if (!bookIdea.trim()) {
      console.error('Book idea cannot be empty');
      process.exit(1);
    }
    
    console.log('\nAny additional details? (comparable titles, target audience, specific requests)');
    console.log('(Press Enter to skip)\n');
    additionalDetails = await ask('> ');
  }

  // Confirm
  const agent = getAgent(agentType);
  console.log(`\n${'━'.repeat(60)}`);
  console.log(`📚 Category: ${agent.type}`);
  console.log(`🎭 Genre: ${genre}`);
  console.log(`📖 Title: ${title || '(will be generated)'}`);
  console.log(`💡 Idea: ${bookIdea.substring(0, 100)}...`);
  console.log(`${'━'.repeat(60)}\n`);

  const confirm = await ask('Generate outline? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('Cancelled.');
    process.exit(0);
  }

  // Generate!
  console.log('\n🚀 Starting outline generation...\n');
  
  const startTime = Date.now();
  
  try {
    const results = await generateOutline({
      agent,
      genre,
      bookIdea,
      title,
      additionalDetails,
      apiKeys,
      provider: defaultProvider,
      onProgress: ({ phase, status, message }) => {
        const icons = ['🔄', '📐', '📝', '📊', '🎨', '✅'];
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        console.log(`  ${icons[phase] || '🔄'} [${elapsed}s] Phase ${phase}: ${message}`);
      }
    });

    // Save to disk
    const saved = await saveOutline({
      outline: results.outline,
      masterPrompt: results.masterPrompt,
      metadata: results.metadata
    });

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`✅ OUTLINE COMPLETE!`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`📄 Outline: ${results.outline.split('\n').length} lines`);
    console.log(`📄 Master Prompt: ${results.masterPrompt.split('\n').length} lines`);
    console.log(`⏱️  Duration: ${Math.round(results.metadata.durationMs / 1000)}s`);
    console.log(`🤖 Provider: ${results.metadata.provider} / ${results.metadata.model}`);
    console.log(`📁 Saved to: ${saved.directory}`);
    console.log(`${'═'.repeat(60)}\n`);

  } catch (err) {
    console.error('\n❌ Generation failed:', err.message);
    if (err.message.includes('API')) {
      console.error('   Check your API key in .env and try again.');
    }
    process.exit(1);
  }

  rl.close();
}

function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
      result[key] = val;
      if (val !== true) i++;
    }
  }
  return result;
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
