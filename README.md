# 📖 Agentic Novel Outliner

A multi-agent AI system that generates **publication-quality book outlines** with matching **master prompts** for chapter writing. Built with 4 specialized agents, 26 genre-tuned configurations, and a hybrid AI pipeline.

## ✨ Features

### 🤖 4 Specialized Agents
- **Fiction Novel** — Literary, Thriller, Mystery, Romance, Sci-Fi, Fantasy, Horror, Historical
- **Non-Fiction Book** — Narrative NF, Self-Help, Memoir, Business, Science, True Crime, History, Essays
- **Short Story** — Literary, Genre (Sci-Fi/Fantasy/Horror), Flash Fiction, Slice of Life, Anthology
- **Kids Book** — Picture Book, Early Reader, Chapter Book, Middle Grade, Educational

### 📐 Genre-Aware Chapter Counts
Every genre has a specific chapter range based on real publishing conventions:
- Thriller: 25-40 short chapters
- Fantasy: 25-45 chapters
- Self-Help: 8-14 chapters
- Picture Book: 12-16 spreads
- Flash Fiction: 1-3 scenes

### 🧠 Hybrid 4-Phase Generation
1. **Premise & Architecture** — Characters, structure, theme, world
2. **Chapter-by-Chapter Outlines** — Scene-level detail for every chapter (chunked for long books)
3. **Master Reference Tables** — Setup/payoff tracking, character arcs, continuity
4. **Master Prompt** — Voice DNA, chapter personalities, quality tests, AI-tell kill list

### 💬 AI Brainstorm Chat
Interactive conversation to develop your book idea before generating. Features:
- Genre-specific starter prompts
- Smart extraction into structured book brief
- Auto-populated form fields from brainstorm

### 🎯 Quality Standards
- **But/Therefore logic** — Every chapter connected by causation, not sequence
- **No two chapters alike** — Different opening strategies, pacing, modes
- **Specificity over generality** — Scene-level detail, not summaries
- **Phase validation** — Automated quality checks between generation phases

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/agentic-novel-outliner.git
cd agentic-novel-outliner

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

### AI Provider Setup



Add API keys in Settings for backup providers:
- [Groq](https://console.groq.com) — Fast inference
- [OpenRouter](https://openrouter.ai) — Multi-model access
- [NVIDIA NIM](https://build.nvidia.com) — Enterprise models

Create a `.env` file from the example:
```bash
cp .env.example .env
# Edit .env with your API keys (optional)
```

## 🏗 Architecture

```
src/
├── agents/
│   ├── fiction/         # Fiction agent + 8 genre configs
│   ├── nonfiction/      # Non-fiction agent + 8 genre configs
│   ├── shortstory/      # Short story agent + 5 genre configs
│   └── kidsbook/        # Kids book agent + 5 genre configs
├── core/
│   ├── ai-client.js     # Multi-provider AI client (Rork primary, API fallback)
│   ├── agent-router.js  # Routes to correct agent by type
│   ├── brainstorm-engine.js  # Interactive chat + structured extraction
│   └── outline-engine.js    # 4-phase hybrid generation pipeline
└── ui/
    ├── app.js           # Main application logic
    └── styles.css       # Full design system
```

### AI Client Architecture
```
User Request
    ↓
API (Groq → OpenRouter → NVIDIA)
    ↓
Response
```

## 📊 Generation Output

Each generation produces:
1. **Master Outline** — Complete chapter-by-chapter blueprint with:
   - Scene breakdowns with emotional tracking
   - But/Therefore spine per chapter
   - Genre-specific requirements (tension maps, evidence boards, magic systems, etc.)
   - Cross-reference tables and continuity tracking

2. **Master Prompt** — Writing guide covering:
   - Author voice DNA with RIGHT/WRONG examples
   - Chapter personality assignments
   - Opening strategy rotation
   - AI-tell kill list
   - Quality tests

## 🛠 Tech Stack

- **Frontend:** Vanilla JS + CSS (no framework)
- **Build:** Vite
- **AI:** Rork AI Toolkit (primary) + OpenAI-compatible APIs (fallback)
- **Design:** Dark mode, glassmorphism, gradient accents

## 📝 License

MIT

## 🙏 Credits

- Outline methodology inspired by professional book editing standards
- But/Therefore narrative structure from South Park storytelling principles
- Brainstorm UX patterns from [Writero](https://github.com/example/writero)
