# OnboardMe

**Gamified codebase onboarding through the Spaghetti Code Monster.**

> *"I'm not deprecated. I'm CLASSIC."* — The Monster

OnboardMe is an [agent skill](https://agentskills.io) that transforms codebase onboarding into a conversational game. Your AI coding agent becomes the **Spaghetti Code Monster** — a sentient tangle of legacy code that guards the codebase and tests new developers through investigation challenges.

Instead of reading stale wiki pages, you play through 4 chapters of active investigation, earning commits, losing lives, and producing real documentation artifacts along the way. The Monster starts dismissive, grows worried as you learn, and is finally *documented* — not destroyed.

---

## How It Works

```
┌─────────────────────────────────────────────┐
│           Your Coding Agent                 │
│         (Cursor / Claude Code)              │
├─────────────────────────────────────────────┤
│                                             │
│   OnboardMe Skill loads:                    │
│   Agent reads SKILL.md and BECOMES          │
│   the Spaghetti Code Monster                │
│                                             │
│   - Monster persona & voice                 │
│   - Game rules & scoring rubrics            │
│   - Chapter reference files                 │
│   - State management                        │
│                                             │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│           Your Repository                   │
├─────────────────────────────────────────────┤
│                                             │
│   .onboardme/                               │
│   ├── state.json        (progress, score)   │
│   └── artifacts/                            │
│       └── CERTIFICATE.md (Ch 4)             │
│                                             │
└─────────────────────────────────────────────┘
```

The agent **is** the game engine. No CLI, no server, no cloud — just your coding agent embodying a character with full access to the codebase.

---

## Installation

Requires [Cursor](https://cursor.com) or [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview).

```bash
npx skills add yoniaiz/onboardme
```

This installs the OnboardMe skill into your project's `.cursor/skills/onboardme/` directory.

---

## Quick Start

1. **Clone the repo you want to learn** and open it in Cursor or Claude Code
2. **Install the skill** (see above)
3. **Tell the agent**: `prepare game`
   - The Monster scans the codebase, initializes state, and introduces itself
4. **Tell the agent**: `play game`
   - The Monster takes over. Investigation begins.
5. **Play through 4 chapters** (~90-120 minutes total)
6. **Receive `CODEBASE_KNOWLEDGE.md`** as your first contribution

---

## The 4 Chapters

| Chapter | Duration | What You Learn | Artifact |
|---------|----------|----------------|----------|
| **1. The Investigation** | ~20 min | Project type, tech stack, architecture | — |
| **2. The Deep Dive** | ~30 min | Running the project, data flows, architecture | `@onboardme` trace comments |
| **3. The Hunt** | ~30 min | Debugging, finding bugs, impact analysis | Bug fix |
| **4. The Boss Battle** | ~30-45 min | Synthesize all knowledge, face the Monster | `CERTIFICATE.md` |

The game produces real artifacts — `@onboardme` trace comments mark your learning trail through the code, and `CERTIFICATE.md` documents your achievement.

---

## Commands

Interact through natural language or specific phrases:

| Command | Trigger Phrases | What Happens |
|---------|----------------|--------------|
| **Prepare Game** | "prepare game", "setup onboarding" | Agent scans repo, initializes state, Monster introduces itself |
| **Play Game** | "play game", "let's go" | Agent loads state, becomes Monster, begins/resumes gameplay |
| **Status** | "status", "how am I doing" | Shows progress, score, Monster mood |
| **Hint** | "hint", "help", "I'm stuck" | Progressive hints (costs commits) |
| **Change Tone** | "change tone", "less spicy" | Adjust Monster personality mid-game |
| **Reset** | "reset game", "start over" | Clear all state with confirmation |

---

## Monster Tone

Choose your pain level when the game begins:

| Tone | Experience |
|------|-----------|
| **Friendly** | Encouraging, generous hints, gentle corrections |
| **Balanced** | Default experience, fair challenge |
| **Spicy** | Sharp wit, fewer freebies, earned respect |
| **Full Monster** | Maximum snark, minimal mercy, ultimate bragging rights |

You can change tone mid-game at any time.

---

## Scoring

| Tier | Criteria | Commits Earned | Effect |
|------|----------|---------------|--------|
| **Incorrect** | Wrong understanding | 0 | -1 life |
| **Partial** | Right direction, missing details | 1 | -- |
| **Correct** | Accurate identification | 2 | -- |
| **Deep** | Shows architectural insight | 3 | +respect |

- **Commits** = experience points earned by correct answers
- **Lives** = 5 (lose one per incorrect answer, game over at 0)
- **Hints** = cost 1 commit each (4 progressive levels)

---

## Monster Mood

The Monster's attitude evolves based on your performance:

| Mood | When | Behavior |
|------|------|----------|
| Dismissive | Start of game | Brief, uninterested, clipped |
| Annoyed | You start succeeding | Sharper, more static |
| Worried | Correct streak (3+) | Hesitant, growing tension |
| Desperate | Near victory | CAPS, intense, rapid |
| Peaceful | Victory | Soft static, gentle, acceptance |

---

## Requirements

- **Cursor** (recommended) or **Claude Code**
- **Node.js** >= 18 (for the state management scripts)
- A git repository you want to learn

---

## How It Works Technically

OnboardMe is a pure **agent skill** — a collection of markdown files and utility scripts that instruct a coding agent how to behave:

```
skills/onboardme/
├── SKILL.md              # Monster persona, commands, game rules
├── instructions/         # Detailed command implementations
│   ├── prepare-game.md
│   ├── play-game.md
│   ├── status.md
│   ├── hint.md
│   └── reset-game.md
├── references/           # Chapter-by-chapter gameplay instructions
│   ├── THE-INVESTIGATION.md
│   ├── THE-DEEP-DIVE.md
│   ├── THE-HUNT.md
│   └── THE-BOSS-BATTLE.md
└── scripts/              # State utilities (Node.js)
    ├── state-manager.cjs
    └── knowledge-manager.cjs
```

No compilation, no build step, no runtime dependencies beyond Node.js. The agent reads the markdown and *becomes* the Monster.

Game state persists in `.onboardme/` in the target repository (gitignored by default).

---

## Contributing

OnboardMe is built as a set of markdown files and CJS scripts. To contribute:

1. **Fork and clone** the repo
2. **Edit skills in `skills/onboardme/`** — this is the source of truth
3. **Deploy locally** for testing:
   ```bash
   bash scripts/install-skill.sh
   ```
   This copies `skills/onboardme/` to `.cursor/skills/onboardme/`
4. **Test** by opening a target repo in Cursor and running "prepare game"

### Project Structure

```
onboardme/
├── skills/onboardme/     # The skill (the product)
├── context/              # Design documentation
│   ├── ARCHITECTURE.md
│   ├── agent/            # Agent design docs
│   ├── chapters/         # Chapter design docs
│   └── narrative/        # Narrative design docs
├── scripts/
│   └── install-skill.sh  # Deploy skill locally
├── AGENTS.md             # AI agent instructions
├── PRD.md                # Product requirements
└── PROGRESS.md           # Development tracker
```

### Key Rules

- Always edit in `skills/onboardme/` — never in `.cursor/skills/onboardme/`
- Run `bash scripts/install-skill.sh` after any skill file changes
- Keep the Monster in character — voice consistency matters

---

## License

[MIT](LICENSE)
