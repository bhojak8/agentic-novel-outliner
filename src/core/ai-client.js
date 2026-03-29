/**
 * Multi-Provider AI Client
 * 
 * PRIMARY: Rork AI Toolkit (free, no key needed)
 *   - POST https://toolkit.rork.com/llm/text
 *   - POST https://toolkit.rork.com/llm/object
 * 
 * FALLBACK: API providers when Rork fails
 *   - Groq (OpenAI-compatible)
 *   - OpenRouter (OpenAI-compatible)
 *   - NVIDIA (OpenAI-compatible)
 * 
 * Strategy: Rork first → if it fails, fall through to API providers
 */

// ═══════════════════════════════════════════
// RORK TOOLKIT CONFIG
// ═══════════════════════════════════════════

const RORK_BASE_URL = 'https://toolkit.rork.com';
const RORK_TEXT_URL = `${RORK_BASE_URL}/llm/text`;
const RORK_OBJECT_URL = `${RORK_BASE_URL}/llm/object`;

// ═══════════════════════════════════════════
// API PROVIDER CONFIG
// ═══════════════════════════════════════════

const PROVIDERS = {
  groq: {
    name: 'Groq',
    baseURL: 'https://api.groq.com/openai/v1',
    models: {
      fast: 'llama-3.3-70b-versatile',
      large: 'llama-3.3-70b-versatile',
      small: 'llama-3.1-8b-instant'
    },
    maxOutputTokens: 32768,
    envKey: 'GROQ_API_KEY'
  },
  openrouter: {
    name: 'OpenRouter',
    baseURL: 'https://openrouter.ai/api/v1',
    models: {
      fast: 'anthropic/claude-sonnet-4',
      large: 'anthropic/claude-sonnet-4',
      small: 'meta-llama/llama-3.3-70b-instruct'
    },
    maxOutputTokens: 64000,
    envKey: 'OPENROUTER_API_KEY'
  },
  nvidia: {
    name: 'NVIDIA',
    baseURL: 'https://integrate.api.nvidia.com/v1',
    models: {
      fast: 'meta/llama-3.3-70b-instruct',
      large: 'meta/llama-3.3-70b-instruct',
      small: 'meta/llama-3.1-8b-instruct'
    },
    maxOutputTokens: 16384,
    envKey: 'NVIDIA_API_KEY'
  }
};

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY = 3000;
const RATE_LIMIT_COOLDOWN = 30000;

let _rateLimitCooldownUntil = 0;
let _consecutiveRateLimits = 0;
let _requestCount = 0;
let _rorkConsecutiveFailures = 0;

// ═══════════════════════════════════════════
// RORK TOOLKIT — Primary Provider
// ═══════════════════════════════════════════

/**
 * Generate text via Rork Toolkit (free, no API key)
 * POST /llm/text { messages } → { completion }
 */
async function rorkGenerateText(messages, label = 'rork') {
  _requestCount++;
  console.log(`[Rork] [${label}] Request #${_requestCount} → Rork Toolkit`);
  
  const response = await fetch(RORK_TEXT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Rork API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.completion) {
    throw new Error('Rork returned empty completion');
  }

  _rorkConsecutiveFailures = 0;
  console.log(`[Rork] [${label}] Success (${data.completion.length} chars)`);
  
  return {
    text: data.completion.trim(),
    model: 'rork-toolkit',
    provider: 'rork',
    usage: null
  };
}

// ═══════════════════════════════════════════
// API PROVIDERS — Fallback
// ═══════════════════════════════════════════

function isRateLimitError(status, message) {
  return status === 429 || 
    (message && (message.includes('429') || message.toLowerCase().includes('rate limit') || message.toLowerCase().includes('too many')));
}

function isRetryableError(status, message) {
  return status >= 500 || status === 429 || 
    (message && (message.includes('fetch') || message.includes('network') || message.includes('timeout')));
}

/**
 * Send a chat completion request to an OpenAI-compatible API provider
 */
async function apiChatCompletion({ provider, apiKey, messages, model, temperature = 0.7, maxTokens = 8192 }) {
  const config = PROVIDERS[provider];
  if (!config) throw new Error(`Unknown provider: ${provider}`);
  
  const resolvedModel = model || config.models.large;
  const resolvedMaxTokens = Math.min(maxTokens, config.maxOutputTokens);
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
  
  if (provider === 'openrouter') {
    headers['HTTP-Referer'] = 'https://agentic-outliner.app';
    headers['X-Title'] = 'Agentic Novel Outliner';
  }
  
  const body = {
    model: resolvedModel,
    messages,
    temperature,
    max_tokens: resolvedMaxTokens
  };
  
  const response = await fetch(`${config.baseURL}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error?.message || response.statusText || `HTTP ${response.status}`;
    
    if (isRateLimitError(response.status, errorMsg)) {
      throw { status: 429, message: `Rate limited by ${config.name}: ${errorMsg}`, provider };
    }
    
    throw { status: response.status, message: `${config.name} error: ${errorMsg}`, provider };
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) throw new Error(`${config.name} returned empty response`);
  
  return {
    text: content.trim(),
    model: data.model || resolvedModel,
    provider: provider,
    usage: data.usage || null
  };
}

// ═══════════════════════════════════════════
// MAIN: generateText — Rork → API fallback
// ═══════════════════════════════════════════

/**
 * Generate text with Rork as primary and API providers as fallback.
 * 
 * Strategy:
 * 1. Try Rork first (free, no key needed)
 * 2. If Rork fails, fall through to API providers
 * 3. API providers use retry + failover logic
 */
export async function generateText({
  messages,
  systemPrompt,
  userPrompt,
  provider = null,
  model = null,
  temperature = 0.7,
  maxTokens = 8192,
  apiKeys = {},
  label = 'default'
}) {
  // Build messages array from convenience params
  if (!messages) {
    messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    if (userPrompt) messages.push({ role: 'user', content: userPrompt });
  }
  
  if (messages.length === 0) throw new Error('No messages provided');

  // ── STEP 1: Try Rork (unless it's been failing too much) ──
  if (_rorkConsecutiveFailures < 5) {
    try {
      const result = await rorkGenerateText(messages, label);
      return result;
    } catch (err) {
      _rorkConsecutiveFailures++;
      console.warn(`[AI] [${label}] Rork failed (failure #${_rorkConsecutiveFailures}):`, err.message || err);
      // Fall through to API providers
    }
  } else {
    console.log(`[AI] [${label}] Skipping Rork (${_rorkConsecutiveFailures} consecutive failures), using API`);
    // Reset after 2 minutes to retry Rork
    setTimeout(() => { _rorkConsecutiveFailures = 0; }, 120000);
  }

  // ── STEP 2: Fall back to API providers ──
  const providerOrder = getProviderOrder(provider, apiKeys);
  
  if (providerOrder.length === 0) {
    throw new Error('Rork AI failed and no API keys configured. Either wait for Rork to recover or set at least one API key in Settings.');
  }
  
  let lastError = null;
  
  for (const currentProvider of providerOrder) {
    const currentKey = apiKeys[currentProvider];
    
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Rate limit cooldown
        const now = Date.now();
        if (now < _rateLimitCooldownUntil) {
          const waitMs = _rateLimitCooldownUntil - now;
          console.log(`[AI] [${label}] Rate limit cooldown, waiting ${Math.round(waitMs / 1000)}s`);
          await sleep(waitMs);
        }
        
        // Retry delay with exponential backoff
        if (attempt > 0) {
          const delay = BASE_RETRY_DELAY * Math.pow(2, attempt - 1) + Math.random() * 2000;
          console.log(`[AI] [${label}] Retry ${attempt}/${MAX_RETRIES} on ${PROVIDERS[currentProvider].name} after ${Math.round(delay / 1000)}s`);
          await sleep(delay);
        }
        
        _requestCount++;
        console.log(`[AI] [${label}] Request #${_requestCount} → ${PROVIDERS[currentProvider].name} (attempt ${attempt + 1})`);
        
        const result = await apiChatCompletion({
          provider: currentProvider,
          apiKey: currentKey,
          messages,
          model: model || undefined,
          temperature,
          maxTokens
        });
        
        console.log(`[AI] [${label}] ✓ Success via ${PROVIDERS[currentProvider].name} (${result.text.length} chars)`);
        
        if (_consecutiveRateLimits > 0) _consecutiveRateLimits--;
        
        return result;
        
      } catch (err) {
        lastError = err;
        const errMsg = err.message || String(err);
        
        if (isRateLimitError(err.status, errMsg)) {
          _consecutiveRateLimits++;
          _rateLimitCooldownUntil = Date.now() + (RATE_LIMIT_COOLDOWN * Math.min(_consecutiveRateLimits, 3));
          console.warn(`[AI] [${label}] Rate limited by ${currentProvider}, cooldown ${_consecutiveRateLimits * 30}s`);
          break; // Try next provider
        }
        
        if (!isRetryableError(err.status, errMsg)) {
          console.error(`[AI] [${label}] Non-retryable error from ${currentProvider}:`, errMsg);
          break; // Try next provider, don't retry
        }
      }
    }
  }
  
  throw new Error(lastError?.message || `All providers failed for [${label}]`);
}

// ═══════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════

function getProviderOrder(preferred, apiKeys) {
  const allProviders = Object.keys(PROVIDERS);
  const order = [];
  
  if (preferred && apiKeys[preferred]) {
    order.push(preferred);
  }
  
  for (const p of allProviders) {
    if (!order.includes(p) && apiKeys[p]) {
      order.push(p);
    }
  }
  
  return order;
}

export function loadApiKeys(env = {}) {
  return {
    groq: env.GROQ_API_KEY || '',
    openrouter: env.OPENROUTER_API_KEY || '',
    nvidia: env.NVIDIA_API_KEY || ''
  };
}

export function getDefaultProvider(env = {}) {
  return env.DEFAULT_PROVIDER || 'groq';
}

/**
 * Get available providers (API keys + Rork always available)
 */
export function getAvailableProviders(apiKeys) {
  const providers = [
    { id: 'rork', name: 'Rork AI (Free)', models: { fast: 'auto', large: 'auto' } }
  ];
  
  for (const [id, key] of Object.entries(apiKeys)) {
    if (key && key.length > 0 && PROVIDERS[id]) {
      providers.push({
        id,
        name: PROVIDERS[id].name,
        models: PROVIDERS[id].models
      });
    }
  }
  
  return providers;
}

/**
 * Check if Rork is currently healthy
 */
export function isRorkHealthy() {
  return _rorkConsecutiveFailures < 5;
}

/**
 * Reset Rork failure counter (e.g., after user action)
 */
export function resetRorkStatus() {
  _rorkConsecutiveFailures = 0;
}

export { PROVIDERS };

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
