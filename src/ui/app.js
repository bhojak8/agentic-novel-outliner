/**
 * Agentic Novel Outliner — Web App
 * Main application logic with brainstorm chat (writero7-inspired)
 */

import { generateText, getAvailableProviders, isRorkHealthy, resetRorkStatus, PROVIDERS } from '../core/ai-client.js';
import { getAgentTypes, getAgent } from '../core/agent-router.js';
import { generateOutline, PHASE_NAMES } from '../core/outline-engine.js';
import { 
  getBrainstormSystemPrompt, 
  brainstormChat, 
  extractStructuredBrief, 
  getOpeningMessage,
  hasEnoughMaterial,
  STARTER_PROMPTS 
} from '../core/brainstorm-engine.js';

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════

const state = {
  selectedAgent: null,
  selectedGenre: null,
  selectedGenreName: null,
  selectedAgentName: null,
  apiKeys: {},
  defaultProvider: 'groq',
  results: null,
  // Brainstorm state
  brainstormMessages: [],
  brainstormSystemPrompt: '',
  brainstormBrief: null,
  brainstormSending: false,
  brainstormExtracting: false
};

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════

function init() {
  loadSettings();
  renderAgentGrid();
  bindEvents();
  checkApiKeys();
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('outliner-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      state.apiKeys = settings.apiKeys || {};
      state.defaultProvider = settings.defaultProvider || 'groq';
      
      document.getElementById('groq-key').value = state.apiKeys.groq || '';
      document.getElementById('openrouter-key').value = state.apiKeys.openrouter || '';
      document.getElementById('nvidia-key').value = state.apiKeys.nvidia || '';
      document.getElementById('default-provider').value = state.defaultProvider;
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }
}

function saveSettings() {
  state.apiKeys = {
    groq: document.getElementById('groq-key').value.trim(),
    openrouter: document.getElementById('openrouter-key').value.trim(),
    nvidia: document.getElementById('nvidia-key').value.trim()
  };
  state.defaultProvider = document.getElementById('default-provider').value;

  localStorage.setItem('outliner-settings', JSON.stringify({
    apiKeys: state.apiKeys,
    defaultProvider: state.defaultProvider
  }));

  checkApiKeys();
  showToast('Settings saved!', 'success');
  document.getElementById('settings-modal').classList.add('hidden');
}

function checkApiKeys() {
  // Rork is always available (no key needed), so no need to block.
  // Just show a hint if no fallback API keys are configured.
  const available = getAvailableProviders(state.apiKeys);
  if (available.length <= 1) {
    // Only Rork available, no API fallback
    console.log('[Settings] Rork AI is primary. No fallback API keys set — add keys in Settings for backup.');
  }
}

// ═══════════════════════════════════════════
// SCREEN NAVIGATION
// ═══════════════════════════════════════════

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  
  if (screenId !== 'screen-brainstorm') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ═══════════════════════════════════════════
// RENDER: Agent Grid
// ═══════════════════════════════════════════

function renderAgentGrid() {
  const grid = document.getElementById('agent-grid');
  const agents = getAgentTypes();

  grid.innerHTML = agents.map(agent => `
    <div class="agent-card" data-agent="${agent.id}">
      <span class="agent-card-icon">${agent.icon}</span>
      <h2 class="agent-card-title">${agent.name}</h2>
      <p class="agent-card-desc">${agent.description}</p>
      <div class="agent-card-genres">
        ${agent.genres.map(g => `<span class="genre-tag">${g.icon} ${g.name}</span>`).join('')}
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('click', () => {
      const agents = getAgentTypes();
      const agent = agents.find(a => a.id === card.dataset.agent);
      state.selectedAgent = card.dataset.agent;
      state.selectedAgentName = agent.name;
      renderGenreGrid(state.selectedAgent);
      showScreen('screen-genres');
    });
  });
}

// ═══════════════════════════════════════════
// RENDER: Genre Grid
// ═══════════════════════════════════════════

function renderGenreGrid(agentId) {
  const agents = getAgentTypes();
  const agent = agents.find(a => a.id === agentId);

  document.getElementById('genre-title').textContent = `Choose Genre — ${agent.name}`;
  document.getElementById('genre-subtitle').textContent = `Each genre has specialized outline structures and requirements.`;

  const grid = document.getElementById('genre-grid');
  grid.innerHTML = agent.genres.map(genre => `
    <div class="genre-card" data-genre="${genre.id}" data-genre-name="${genre.name}">
      <div class="genre-card-icon">${genre.icon}</div>
      <h3 class="genre-card-name">${genre.name}</h3>
      <p class="genre-card-desc">${genre.description}</p>
    </div>
  `).join('');

  grid.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', () => {
      state.selectedGenre = card.dataset.genre;
      state.selectedGenreName = card.dataset.genreName;
      showScreen('screen-path');
    });
  });
}

// ═══════════════════════════════════════════
// INPUT SCREEN SETUP
// ═══════════════════════════════════════════

function setupInputScreen(fromBrainstorm = false) {
  document.getElementById('selected-agent-badge').textContent = `${state.selectedAgentName}`;
  document.getElementById('selected-genre-badge').textContent = `${state.selectedGenreName}`;
  document.getElementById('input-subtitle').textContent = 
    `Creating a ${state.selectedGenreName} ${state.selectedAgentName.toLowerCase()} outline.`;

  if (fromBrainstorm && state.brainstormBrief) {
    // Smart field mapping — parse the structured brief into separate fields
    const brief = state.brainstormBrief;
    
    // Try to extract title
    const titleMatch = brief.match(/(?:^|\n)\s*(?:#+\s*)?(?:\d+[\.\)]\s*)?TITLE[:\s]+(.+?)(?:\n|$)/im);
    if (titleMatch) {
      document.getElementById('book-title').value = titleMatch[1].trim().replace(/\*+/g, '').replace(/^["']|["']$/g, '');
    }
    
    // Try to extract premise/concept (the core idea)
    const premiseMatch = brief.match(/(?:PREMISE|CONCEPT|CORE CONCEPT|BOOK IDEA|LOGLINE)[:\s]+([\s\S]*?)(?=\n\s*(?:\d+[\.\)]|#+|[A-Z]{3,}[:\s])|\n\n|$)/im);
    const premise = premiseMatch ? premiseMatch[1].trim() : brief;
    
    // Try to extract additional details (comparables, audience, structure)
    const additionalParts = [];
    const sections = ['COMPARABLE', 'TARGET AUDIENCE', 'STRUCT', 'CHAPTER COUNT', 'TONE', 'EMOTIONAL', 'DIFFERENTIATION'];
    for (const section of sections) {
      const match = brief.match(new RegExp(`${section}[A-Z]*[:\\s]+([\\s\\S]*?)(?=\\n\\s*(?:\\d+[\\.)\\s]|#+|[A-Z]{3,}[:\\s])|\\n\\n|$)`, 'im'));
      if (match) additionalParts.push(match[0].trim());
    }
    
    document.getElementById('book-idea').value = premise || brief;
    if (additionalParts.length > 0) {
      document.getElementById('additional-details').value = additionalParts.join('\n\n');
    }
    
    // Try to extract recommended chapter count
    const chapterMatch = brief.match(/CHAPTER\s*COUNT[:\s]+(\d+)/i);
    if (chapterMatch) {
      document.getElementById('chapter-count').value = parseInt(chapterMatch[1]);
    }
  }

  // Populate scale controls from genre config
  populateScaleControls();
}

function populateScaleControls() {
  const agent = getAgent(state.selectedAgent);
  const genreConfig = agent.getGenreConfig(state.selectedGenre);
  
  // Determine the right unit name and count
  const unitName = genreConfig.unitName || 'chapter';
  const typicalCount = genreConfig.typicalChapters 
    || genreConfig.typicalScenes 
    || genreConfig.typicalSpreads 
    || genreConfig.typicalStories 
    || 15;
  const range = genreConfig.chapterRange 
    || genreConfig.sceneRange 
    || genreConfig.spreadRange 
    || genreConfig.storyRange 
    || `${typicalCount}`;

  // Update labels
  const unitLabel = unitName.charAt(0).toUpperCase() + unitName.slice(1) + 's';
  document.getElementById('unit-name-label').textContent = unitLabel;
  document.getElementById('chapter-hint').textContent = `Recommended: ${range}`;
  
  // Set default value
  const chapterInput = document.getElementById('chapter-count');
  chapterInput.value = typicalCount;
  chapterInput.min = parseInt(range.split('-')[0]) || 1;
  chapterInput.max = parseInt(range.split('-')[1]) || 60;
  
  // Update word count estimate
  updateScaleEstimate();
  
  // Bind live update  
  chapterInput.addEventListener('input', updateScaleEstimate);
  document.getElementById('chapter-length').addEventListener('change', updateScaleEstimate);
}

function updateScaleEstimate() {
  const count = parseInt(document.getElementById('chapter-count').value) || 15;
  const length = document.getElementById('chapter-length').value;
  
  // Estimate words per chapter based on length setting
  const wordsPerChapter = { short: 2500, medium: 4500, long: 7000 };
  const wpf = wordsPerChapter[length] || 4500;
  const total = count * wpf;
  
  let display;
  if (total < 1000) {
    display = `~${total} words`;
  } else if (total < 100000) {
    display = `~${(total / 1000).toFixed(0)},000 words`;
  } else {
    display = `~${(total / 1000).toFixed(0)},000 words`;
  }
  
  document.getElementById('scale-estimate').textContent = `${display} estimated`;
}

// ═══════════════════════════════════════════
// BRAINSTORM CHAT
// ═══════════════════════════════════════════

function startBrainstorm() {
  // Rork is always available — no API key needed to start brainstorming

  // Reset
  state.brainstormMessages = [];
  state.brainstormBrief = null;
  state.brainstormSystemPrompt = getBrainstormSystemPrompt(state.selectedAgent, state.selectedGenreName);

  // Update header
  document.getElementById('brainstorm-genre-label').textContent = 
    `${state.selectedAgentName} • ${state.selectedGenreName}`;
  
  // Reset buttons
  updateBrainstormActions();
  
  // Clear chat area
  const messagesContainer = document.getElementById('chat-messages');
  const loadingEl = document.getElementById('chat-loading');
  messagesContainer.innerHTML = '';
  messagesContainer.appendChild(loadingEl);

  // Add welcome message (no API call needed)
  const openingText = getOpeningMessage(state.selectedAgent);
  addChatBubble('ai', openingText);

  // Render starter prompts
  renderStarterPrompts();

  showScreen('screen-brainstorm');
  setTimeout(() => document.getElementById('chat-input').focus(), 300);
}

function renderStarterPrompts() {
  const messagesContainer = document.getElementById('chat-messages');
  const loadingEl = document.getElementById('chat-loading');
  
  const agentKey = state.selectedAgent === 'nonfiction' ? 'nonfiction'
    : state.selectedAgent === 'shortstory' ? 'shortstory'
    : state.selectedAgent === 'kidsbook' ? 'kidsbook'
    : 'fiction';

  const prompts = STARTER_PROMPTS[agentKey];
  
  const startersDiv = document.createElement('div');
  startersDiv.className = 'starters-section';
  startersDiv.id = 'starters-section';
  startersDiv.innerHTML = `
    <div class="starters-header">
      <span class="starters-icon">💡</span>
      <span class="starters-title">Quick starts</span>
    </div>
    <div class="starters-grid">
      ${prompts.map((p, i) => `
        <button class="starter-chip" data-starter-idx="${i}">
          ${p.label}
        </button>
      `).join('')}
    </div>
  `;

  messagesContainer.insertBefore(startersDiv, loadingEl);

  // Bind starter clicks
  startersDiv.querySelectorAll('.starter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const idx = parseInt(chip.dataset.starterIdx);
      const prompt = prompts[idx];
      document.getElementById('chat-input').value = prompt.prompt;
      sendBrainstormMessage();
    });
  });
}

function removeStarterPrompts() {
  const starters = document.getElementById('starters-section');
  if (starters) starters.remove();
}

function updateBrainstormActions() {
  const useBtn = document.getElementById('brainstorm-use-brief');
  const userMsgCount = state.brainstormMessages.filter(m => m.role === 'user').length;
  
  if (userMsgCount >= 2) {
    useBtn.disabled = false;
    useBtn.textContent = state.brainstormExtracting ? '⏳ Extracting...' : '🚀 Use as Book Idea';
  } else {
    useBtn.disabled = true;
    useBtn.textContent = '🚀 Use Brief & Generate';
  }
}

async function sendBrainstormMessage(directText) {
  const input = document.getElementById('chat-input');
  const message = directText || input.value.trim();
  
  if (!message || state.brainstormSending) return;
  
  // Remove starter prompts after first message
  removeStarterPrompts();
  
  // Add user message
  state.brainstormMessages.push({ role: 'user', content: message });
  addChatBubble('user', message);
  input.value = '';
  autoResizeInput(input);
  
  state.brainstormSending = true;
  document.getElementById('chat-send').disabled = true;
  showTyping(true);
  
  try {
    const response = await brainstormChat({
      messages: state.brainstormMessages,
      systemPrompt: state.brainstormSystemPrompt,
      apiKeys: state.apiKeys,
      provider: state.defaultProvider
    });
    
    state.brainstormMessages.push({ role: 'assistant', content: response });
    addChatBubble('ai', response);
    
  } catch (err) {
    console.error('Brainstorm message failed:', err);
    addChatBubble('ai', "Hmm, I hit a creative block. Let me try again — rephrase your question or try a different angle! 🔄");
  }
  
  state.brainstormSending = false;
  document.getElementById('chat-send').disabled = false;
  showTyping(false);
  updateBrainstormActions();
  
  // Show "Use as Book" CTA inside chat after 3+ user messages
  const userMsgCount = state.brainstormMessages.filter(m => m.role === 'user').length;
  if (userMsgCount >= 3 && !document.getElementById('inline-use-btn')) {
    addInlineUseButton();
  }
  
  input.focus();
}

function addInlineUseButton() {
  const messagesContainer = document.getElementById('chat-messages');
  const loadingEl = document.getElementById('chat-loading');
  
  const btnDiv = document.createElement('div');
  btnDiv.className = 'inline-use-cta';
  btnDiv.id = 'inline-use-btn';
  btnDiv.innerHTML = `
    <button class="btn btn-primary btn-use-idea" id="inline-extract-btn">
      <span>📖</span> Use as Book Idea
      <span class="btn-arrow">→</span>
    </button>
  `;
  
  messagesContainer.insertBefore(btnDiv, loadingEl);
  
  btnDiv.querySelector('#inline-extract-btn').addEventListener('click', handleUseAsBook);
  
  // Scroll to bottom
  const chatContainer = document.getElementById('chat-container');
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function handleUseAsBook() {
  if (state.brainstormMessages.filter(m => m.role === 'user').length < 2) {
    showToast('Chat a bit more to develop your idea first', 'error');
    return;
  }
  
  state.brainstormExtracting = true;
  updateBrainstormActions();
  
  // Update inline button if exists
  const inlineBtn = document.getElementById('inline-extract-btn');
  if (inlineBtn) {
    inlineBtn.disabled = true;
    inlineBtn.innerHTML = '<span>⏳</span> Extracting book idea...';
  }
  
  try {
    const brief = await extractStructuredBrief({
      messages: state.brainstormMessages,
      agentType: state.selectedAgent,
      genreName: state.selectedGenreName,
      apiKeys: state.apiKeys,
      provider: state.defaultProvider
    });
    
    state.brainstormBrief = brief;
    console.log('[Brainstorm] Extracted brief:', brief.substring(0, 100));
    
    // Navigate to input screen with the brief pre-filled
    setupInputScreen(true);
    showScreen('screen-input');
    showToast('Book idea extracted! Review and generate.', 'success');
    
  } catch (err) {
    console.error('[Brainstorm] Extraction failed:', err);
    
    // Fallback: use the last assistant message as the idea
    const lastAssistant = [...state.brainstormMessages].reverse().find(m => m.role === 'assistant');
    if (lastAssistant) {
      state.brainstormBrief = state.brainstormMessages
        .map(m => `${m.role === 'user' ? 'MY IDEAS' : 'DEVELOPMENT NOTES'}: ${m.content}`)
        .join('\n\n');
      setupInputScreen(true);
      showScreen('screen-input');
      showToast('Extraction hit an issue — your conversation has been compiled as-is.', 'warning');
    } else {
      showToast('Extraction failed. Try chatting more, then try again.', 'error');
    }
  }
  
  state.brainstormExtracting = false;
  updateBrainstormActions();
}

// ═══════════════════════════════════════════
// CHAT UI HELPERS
// ═══════════════════════════════════════════

function addChatBubble(type, content) {
  const messagesContainer = document.getElementById('chat-messages');
  const loadingEl = document.getElementById('chat-loading');
  
  // Remove previous inline use button (it gets re-added after each message if needed)
  const prevBtn = document.getElementById('inline-use-btn');
  if (prevBtn) prevBtn.remove();
  
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  
  const label = type === 'ai' ? '💡 AI Partner' : '✍️ You';
  const formattedContent = formatChatContent(content);
  
  bubble.innerHTML = `<span class="bubble-label">${label}</span>${formattedContent}`;
  
  messagesContainer.insertBefore(bubble, loadingEl);
  
  const chatContainer = document.getElementById('chat-container');
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function formatChatContent(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)/gm, '• $1')
    .replace(/^(\d+)\. /gm, '<strong>$1.</strong> ')
    .replace(/\n/g, '<br>');
}

function showTyping(show) {
  const loading = document.getElementById('chat-loading');
  if (show) {
    loading.classList.add('active');
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } else {
    loading.classList.remove('active');
  }
}

function autoResizeInput(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// ═══════════════════════════════════════════
// GENERATION
// ═══════════════════════════════════════════

async function startGeneration() {
  const bookIdea = document.getElementById('book-idea').value.trim();
  if (!bookIdea) {
    showToast('Please describe your book idea', 'error');
    return;
  }

  // Rork AI is always available — no key needed

  const title = document.getElementById('book-title').value.trim();
  const additionalDetails = document.getElementById('additional-details').value.trim();
  const chapterCount = parseInt(document.getElementById('chapter-count').value) || null;
  const chapterLength = document.getElementById('chapter-length').value;

  showScreen('screen-progress');
  resetProgress();
  
  const timerInterval = startTimer();
  const agent = getAgent(state.selectedAgent);

  try {
    state.results = await generateOutline({
      agent,
      genre: state.selectedGenre,
      bookIdea,
      title,
      additionalDetails,
      chapterCount,
      chapterLength,
      apiKeys: state.apiKeys,
      provider: state.defaultProvider,
      onProgress: ({ phase, status, message }) => {
        updateProgress(phase, status, message);
      }
    });

    clearInterval(timerInterval);
    showOutputScreen();

  } catch (err) {
    clearInterval(timerInterval);
    console.error('Generation failed:', err);
    showToast(`Generation failed: ${err.message}`, 'error');
    showScreen('screen-input');
  }
}

// ═══════════════════════════════════════════
// PROGRESS
// ═══════════════════════════════════════════

function resetProgress() {
  document.querySelectorAll('.phase').forEach(el => {
    el.classList.remove('active', 'complete');
    el.querySelector('.phase-status').textContent = 'Waiting';
  });
}

function updateProgress(phase, status, message) {
  const phases = document.querySelectorAll('.phase');
  
  phases.forEach((el, i) => {
    const phaseNum = i + 1;
    if (phaseNum < phase) {
      el.classList.remove('active');
      el.classList.add('complete');
      el.querySelector('.phase-status').textContent = '✓ Done';
    } else if (phaseNum === phase) {
      el.classList.add('active');
      el.classList.remove('complete');
      el.querySelector('.phase-status').textContent = status === 'complete' ? '✓ Done' : 'In Progress';
      if (status === 'complete') {
        el.classList.remove('active');
        el.classList.add('complete');
      }
    }
  });
}

let _timerStart = 0;
function startTimer() {
  _timerStart = Date.now();
  const timerEl = document.getElementById('progress-timer');
  return setInterval(() => {
    const elapsed = Math.floor((Date.now() - _timerStart) / 1000);
    const min = Math.floor(elapsed / 60);
    const sec = elapsed % 60;
    timerEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
  }, 1000);
}

// ═══════════════════════════════════════════
// OUTPUT
// ═══════════════════════════════════════════

function showOutputScreen() {
  if (!state.results) return;
  
  const title = state.results.metadata.title || 'Your Outline';
  const duration = Math.round(state.results.metadata.durationMs / 1000);
  const provider = state.results.metadata.provider || 'Rork AI';
  
  document.getElementById('output-title').textContent = `${title} — Ready!`;
  document.getElementById('output-meta').textContent = 
    `${state.results.metadata.genre} ${state.results.metadata.agentType} | Generated in ${duration}s | ${provider}`;
  
  // Format outline with basic markdown rendering
  document.getElementById('outline-content').innerHTML = formatOutputText(state.results.outline);
  document.getElementById('prompt-content').innerHTML = formatOutputText(state.results.masterPrompt);
  
  // Build stats and ToC
  buildOutputStats();
  
  showScreen('screen-output');
}

function formatOutputText(text) {
  if (!text) return '';
  return text
    // Headers (lines with ═ or ─ decoration)
    .replace(/^(═{3,})\n(.+)\n(═{3,})/gm, '<div class="output-header-block"><h2>$2</h2></div>')
    .replace(/^(─{3,})\n(.+)\n(─{3,})/gm, '<div class="output-section-header"><h3>$2</h3></div>')
    // Markdown-style headers
    .replace(/^### (.+)$/gm, '<h4 class="output-h4">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="output-h3">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 class="output-h2">$1</h2>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Chapter headers (CHAPTER 1: Title)
    .replace(/^(CHAPTER|SCENE|SPREAD|ESSAY|STORY)\s+(\d+)[:\s]+(.+)$/gim, 
      '<h3 class="chapter-heading" id="ch-$2"><span class="ch-num">$1 $2</span> $3</h3>')
    // Section headers with ━ or ═
    .replace(/^[━═]{3,}$/gm, '<hr class="output-hr">')
    // Bullet points
    .replace(/^[•\-]\s+(.+)$/gm, '<li>$1</li>')
    // Tables (basic | delimited)
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
    })
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraph
    ;
}

function buildOutputStats() {
  const outline = state.results.outline || '';
  const masterPrompt = state.results.masterPrompt || '';
  
  // Word counts
  const outlineWords = outline.split(/\s+/).filter(w => w.length > 0).length;
  const promptWords = masterPrompt.split(/\s+/).filter(w => w.length > 0).length;
  
  // Extract chapter titles for ToC
  const chapterPattern = /(?:CHAPTER|SCENE|SPREAD|ESSAY|STORY)\s+(\d+)[:\s]+(.+)/gi;
  const chapters = [];
  let match;
  while ((match = chapterPattern.exec(outline)) !== null) {
    chapters.push({ num: match[1], title: match[2].trim().replace(/\*+/g, '') });
  }
  
  // Build stats HTML
  const statsHtml = `
    <div class="output-stats">
      <div class="stat">
        <span class="stat-num">${outlineWords.toLocaleString()}</span>
        <span class="stat-label">Outline Words</span>
      </div>
      <div class="stat">
        <span class="stat-num">${chapters.length}</span>
        <span class="stat-label">Chapters</span>
      </div>
      <div class="stat">
        <span class="stat-num">${promptWords.toLocaleString()}</span>
        <span class="stat-label">Master Prompt Words</span>
      </div>
      <div class="stat">
        <span class="stat-num">${Math.round(state.results.metadata.durationMs / 1000)}s</span>
        <span class="stat-label">Generation Time</span>
      </div>
    </div>
    ${chapters.length > 0 ? `
    <details class="toc-section" open>
      <summary class="toc-header">📋 Table of Contents</summary>
      <ol class="toc-list">
        ${chapters.map(ch => `<li class="toc-item"><span class="toc-num">${ch.num}.</span> ${ch.title}</li>`).join('')}
      </ol>
    </details>
    ` : ''}
  `;
  
  // Insert stats before the tab content
  const existingStats = document.getElementById('output-stats-section');
  if (existingStats) existingStats.remove();
  
  const statsDiv = document.createElement('div');
  statsDiv.id = 'output-stats-section';
  statsDiv.innerHTML = statsHtml;
  
  const tabContent = document.querySelector('.tab-content');
  if (tabContent) {
    tabContent.parentNode.insertBefore(statsDiv, tabContent);
  }
}

function downloadFile(content, filename) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Failed to copy', 'error');
  });
}

// ═══════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3500);
}

// ═══════════════════════════════════════════
// EVENT BINDINGS
// ═══════════════════════════════════════════

function bindEvents() {
  // Navigation
  document.getElementById('back-to-agents').addEventListener('click', () => showScreen('screen-agents'));
  document.getElementById('back-to-genres-from-path').addEventListener('click', () => showScreen('screen-genres'));
  document.getElementById('back-to-path').addEventListener('click', () => showScreen('screen-path'));
  document.getElementById('back-from-brainstorm').addEventListener('click', () => showScreen('screen-path'));
  
  // Path selection
  document.getElementById('path-brainstorm').addEventListener('click', () => startBrainstorm());
  document.getElementById('path-direct').addEventListener('click', () => {
    setupInputScreen(false);
    showScreen('screen-input');
  });
  
  // Brainstorm chat
  document.getElementById('chat-send').addEventListener('click', () => sendBrainstormMessage());
  document.getElementById('brainstorm-use-brief').addEventListener('click', handleUseAsBook);
  
  const chatInput = document.getElementById('chat-input');
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBrainstormMessage();
    }
  });
  chatInput.addEventListener('input', () => autoResizeInput(chatInput));
  
  // Settings
  document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.remove('hidden');
  });
  document.getElementById('close-settings').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.add('hidden');
  });
  document.getElementById('save-settings').addEventListener('click', saveSettings);
  document.querySelector('.modal-backdrop')?.addEventListener('click', () => {
    document.getElementById('settings-modal').classList.add('hidden');
  });
  
  // Generate
  document.getElementById('generate-btn').addEventListener('click', startGeneration);
  
  // Output tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.output-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
    });
  });
  
  // Copy / Download
  document.getElementById('copy-outline').addEventListener('click', () => {
    if (state.results) copyToClipboard(state.results.outline);
  });
  document.getElementById('copy-prompt').addEventListener('click', () => {
    if (state.results) copyToClipboard(state.results.masterPrompt);
  });
  document.getElementById('download-outline').addEventListener('click', () => {
    if (state.results) {
      const name = (state.results.metadata.title || 'outline').replace(/[^a-zA-Z0-9]/g, '_');
      downloadFile(state.results.outline, `${name}_Outline.md`);
    }
  });
  document.getElementById('download-prompt').addEventListener('click', () => {
    if (state.results) {
      const name = (state.results.metadata.title || 'outline').replace(/[^a-zA-Z0-9]/g, '_');
      downloadFile(state.results.masterPrompt, `${name}_Master_Prompt.md`);
    }
  });
  
  // New outline
  document.getElementById('new-outline-btn').addEventListener('click', () => {
    state.selectedAgent = null;
    state.selectedGenre = null;
    state.results = null;
    state.brainstormMessages = [];
    state.brainstormBrief = null;
    document.getElementById('book-title').value = '';
    document.getElementById('book-idea').value = '';
    document.getElementById('additional-details').value = '';
    showScreen('screen-agents');
  });
}

// ═══════════════════════════════════════════
// START
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', init);
