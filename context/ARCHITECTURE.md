# OnboardMe — Architecture Document

> **Architectural decisions, system design, and technical specifications for OnboardMe.**

This document covers the high-level architecture, technical stack, file system structure, agent integration, and context gathering mechanisms.

---

## Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Key Architectural Decisions](#2-key-architectural-decisions)
3. [CLI vs Agent Responsibilities](#3-cli-vs-agent-responsibilities)
4. [Tech Stack](#4-tech-stack)
5. [Game Template Architecture](#5-game-template-architecture)
6. [Project Structure](#6-project-structure)
7. [File System Structure](#7-file-system-structure)
8. [Agent Framework Integration](#8-agent-framework-integration)
9. [Bootstrap: Context Gathering](#9-bootstrap-context-gathering)
10. [Installation & System Requirements](#10-installation--system-requirements)

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S TERMINAL                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐         ┌─────────────────────────────────┐  │
│   │  OnboardMe  │ ◄─────► │  Agent Framework                │  │
│   │    CLI      │         │  (Cursor/Claude Code/OpenCode)  │  │
│   └──────┬──────┘         └─────────────────────────────────┘  │
│          │                                                      │
│          ▼                                                      │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                  .onboarding/                            │  │
│   │  ├── context/     (gathered codebase knowledge)         │  │
│   │  ├── games/       (generated questions & challenges)    │  │
│   │  ├── state/       (user progress & history)             │  │
│   │  └── config.json  (settings & agent config)             │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Delivery | Standalone CLI | Maximum interactivity, works in any terminal |
| AI Backend | User's existing agent | No API key management, leverages existing tools |
| State | Local filesystem | Simple, portable, no accounts needed |
| Game Logic | Deterministic | Predictable, testable, doesn't require AI for core loop |
| AI Role | Content generation + dynamic responses | Init generates content; runtime AI for briefs, boss, Q&A |

---

## 3. CLI vs Agent Responsibilities

| Component | CLI Responsibility | Agent Responsibility |
|-----------|-------------------|---------------------|
| **Init** | Orchestrate scanning | Analyze code, generate questions |
| **Game Loop** | Display UI, track state | — |
| **Question Display** | Render question, timer, UI | — |
| **Answer Validation** | Check against expected answer | Evaluate free-form answers |
| **Knowledge Briefs** | Display template | Generate contextual explanation |
| **Boss Battle** | Manage phases, health, lives | Regenerate questions each attempt |
| **User Q&A** | Detect when user asks question | Answer based on context |

---

## 4. Tech Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Language | TypeScript | Type safety, good CLI tooling |
| CLI Framework | Commander.js or Oclif | Mature, well-documented |
| Terminal UI | Ink (React for CLI) or Blessed | Rich terminal UI |
| Testing | Vitest | Fast, modern |
| Build | tsup or esbuild | Fast builds |
| Package | npm | Standard distribution |

---

## 5. Game Template Architecture

Games are **modular, isolated, and extensible**. Each game is a self-contained unit that can be:
- Developed independently
- Tested in isolation
- Added/removed without affecting others
- Run standalone for debugging

### Base Game Interface

```typescript
interface GameConfig {
  id: string;                    // e.g., "tree-discover"
  name: string;                  // e.g., "tree --discover"  
  level: number;                 // 1-5 or 0 for boss
  description: string;
  estimatedTime: number;         // minutes
  maxQuestions: number;
}

interface GameState {
  currentQuestion: number;
  score: number;
  maxScore: number;
  lives: number;
  hintsRemaining: number;
  streak: number;
  startTime: Date;
  answers: AnswerRecord[];
}

interface GameQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'multi-step' | 'timed';
  prompt: string;
  context?: string;
  hints: string[];
  timeLimit?: number;            // seconds, optional
  validation: ValidationRule;
  knowledgeReward: string[];     // Knowledge IDs unlocked on correct
  xpReward: number;
}

interface GameResult {
  completed: boolean;
  score: number;
  maxScore: number;
  timeSpent: number;
  knowledgeUnlocked: string[];
  totalXP: number;
}

abstract class BaseGame {
  abstract config: GameConfig;
  protected state: GameState;
  protected context: CodebaseContext;
  protected questions: GameQuestion[];

  // Lifecycle
  abstract initialize(context: CodebaseContext): Promise<void>;
  abstract generateQuestions(): Promise<GameQuestion[]>;
  abstract start(): Promise<void>;
  abstract pause(): void;
  abstract resume(): void;
  abstract end(): GameResult;

  // Question flow
  abstract getCurrentQuestion(): GameQuestion;
  abstract submitAnswer(answer: string): Promise<AnswerResult>;
  abstract useHint(): string | null;
  abstract skip(): void;

  // Teaching
  abstract generateBrief(question: GameQuestion, wasCorrect: boolean): Promise<string>;

  // For isolated testing/debugging
  abstract runTestMode(mockContext?: Partial<CodebaseContext>): Promise<void>;
}
```

### Game Registry

Games are registered centrally and loaded dynamically:

```typescript
// src/games/registry.ts
const gameRegistry = new Map<string, typeof BaseGame>();

function registerGame(gameClass: typeof BaseGame) {
  const instance = new gameClass();
  gameRegistry.set(instance.config.id, gameClass);
}

function getGame(id: string): BaseGame {
  const GameClass = gameRegistry.get(id);
  if (!GameClass) throw new Error(`Game '${id}' not found`);
  return new GameClass();
}

// Auto-register all games
registerGame(TreeDiscoverGame);
registerGame(PsAuxGrepGame);
registerGame(GrepHuntGame);
// ... etc
```

### Isolated Game Testing

Each game can be run standalone:

```bash
# Run a specific game in test mode with mock context
npm run game:test tree-discover

# Run with verbose output
npm run game:test tree-discover -- --verbose

# Run with a specific test fixture
npm run game:test grep-hunt -- --fixture=./tests/fixtures/small-ts-app
```

The test runner:
1. Loads the game class
2. Provides mock or real context
3. Runs through all questions
4. Reports results and any errors

### Adding New Games

To add a new game:

1. Create `src/games/levelN/my-new-game.ts`
2. Extend `BaseGame`
3. Implement all abstract methods
4. Register in `src/games/registry.ts`
5. Add to level configuration
6. Create question generation prompts

```typescript
// Example: Adding a new game
export class MyNewGame extends BaseGame {
  config = {
    id: 'my-new-game',
    name: 'my --newgame',
    level: 2,
    description: 'Description of what this game teaches',
    estimatedTime: 8,
    maxQuestions: 6,
  };

  async initialize(context: CodebaseContext): Promise<void> {
    this.context = context;
    this.questions = await this.generateQuestions();
  }

  async generateQuestions(): Promise<GameQuestion[]> {
    // Use agent to generate context-specific questions
    // or use predefined templates filled with context data
  }

  // ... implement other methods
}
```

### Boss as a Special Game

The boss battle is also a game, but with special mechanics:

```typescript
class SpaghettiCodeMonsterBoss extends BaseGame {
  config = {
    id: 'spaghetti-monster',
    name: 'FIXME: // the monster',
    level: 0,  // Special level for boss (FIXME)
    description: 'Final confrontation with the Spaghetti Code Monster',
    estimatedTime: 15,
    maxQuestions: 0,  // Dynamic
  };

  // Boss-specific properties
  monsterIntegrity: number = 100;
  shields: number = 5;
  currentPhase: 1 | 2 | 3 = 1;

  // Override to regenerate questions each attempt
  async generateQuestions(): Promise<GameQuestion[]> {
    // Questions are regenerated each attempt to prevent memorization
  }
}
```

---

## 6. Project Structure

```
onboardme/
├── src/
│   ├── cli/                    # CLI command handlers
│   │   ├── init.ts
│   │   ├── start.ts
│   │   ├── status.ts
│   │   └── ...
│   ├── core/                   # Core game engine
│   │   ├── engine.ts           # Main game loop
│   │   ├── state.ts            # State management
│   │   ├── scoring.ts          # Commits/streak calculation
│   │   └── documentation.ts    # Documentation unlock system
│   ├── challenges/             # Sub-task implementations
│   │   ├── base/               # Base classes & interfaces
│   │   │   ├── BaseChallenge.ts
│   │   │   ├── types.ts
│   │   │   └── registry.ts
│   │   ├── todo-1/
│   │   │   ├── tree-discover.ts
│   │   │   └── ps-aux-grep.ts
│   │   ├── todo-2/
│   │   │   ├── grep-hunt.ts
│   │   │   └── import-puzzle.ts
│   │   ├── todo-3/
│   │   │   ├── traceroute-function.ts
│   │   │   └── debug-inject.ts
│   │   ├── todo-4/
│   │   │   ├── whois-system.ts
│   │   │   └── man-explain-20q.ts
│   │   ├── todo-5/
│   │   │   ├── tail-incident.ts
│   │   │   └── chmod-deploy.ts
│   │   └── fixme/
│   │       └── spaghetti-monster.ts
│   ├── agent/                  # Agent framework adapters
│   │   ├── adapter.ts          # Base adapter interface
│   │   ├── claude-code.ts      # Claude Code implementation
│   │   └── index.ts            # Agent detection & factory
│   ├── bootstrap/              # Context gathering
│   │   ├── scanner.ts          # File system scanning
│   │   ├── analyzer.ts         # Code analysis
│   │   ├── monster.ts          # Monster generation
│   │   └── questions.ts        # Question generation
│   ├── state/                  # State persistence
│   │   ├── progress.ts
│   │   ├── history.ts
│   │   └── documentation.ts
│   ├── ui/                     # Terminal UI components
│   │   ├── components/         # Reusable UI elements
│   │   ├── screens/            # Full-screen layouts
│   │   └── theme.ts            # Colors, borders, etc.
│   └── utils/                  # Shared utilities
│       ├── fs.ts
│       ├── git.ts
│       └── prompt.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── games/                  # Game-specific tests
│   └── fixtures/               # Test codebases
├── package.json
├── tsconfig.json
├── PRD.md
├── PROGRESS.md
└── README.md
```

---

## 7. File System Structure

All game data stored in `.onboarding/` at repository root.

```
.onboarding/
├── config.json                    # Settings & agent configuration
├── context/
│   ├── codebase.json             # Full gathered context
│   ├── monster.json              # Generated monster info
│   ├── services.json             # Service map with verified data
│   ├── functions.json            # Key functions extracted
│   ├── flows.json                # Data flow traces
│   └── domain.json               # Business terms & acronyms
├── todos/
│   ├── todo-1/
│   │   ├── tree-discover.json    # Challenges for this sub-task
│   │   └── ps-aux-grep.json
│   ├── todo-2/
│   │   ├── grep-hunt.json
│   │   └── import-puzzle.json
│   ├── todo-3/
│   │   ├── traceroute-function.json
│   │   └── debug-inject.json
│   ├── todo-4/
│   │   ├── whois-system.json
│   │   └── man-explain-20q.json
│   ├── todo-5/
│   │   ├── incident-simulator.json
│   │   └── chmod-deploy.json
│   └── fixme/
│       └── spaghetti-monster.json
├── state/
│   ├── progress.json             # Current TODO, sub-task, challenge
│   ├── history.json              # All answers with timestamps
│   ├── knowledge.json            # Unlocked knowledge entries
│   └── achievements.json         # Badges & milestones
└── .gitignore                    # Ignore state/ (keep context/ & games/)
```

### What to Gitignore

```gitignore
# .onboarding/.gitignore

# User-specific state (don't commit)
state/

# Keep these (can be shared/regenerated)
# context/
# games/
# config.json
```

---

## 8. Agent Framework Integration

### Strategy

The CLI delegates AI tasks to the user's existing agent framework. The user:
1. Already has an agent installed and authenticated (e.g., Claude Code)
2. Selects which agent to use during `onboardme init`
3. OnboardMe calls the agent's CLI under the hood

### Supported Agents

| Agent | Status | Detection | Invocation |
|-------|--------|-----------|------------|
| **Claude Code** | ✅ v1 | Check for `claude` command | `claude -p "..." --output-format json` |
| **Cursor CLI** | 🔜 v2 | Check for `cursor` command | TBD |
| **OpenCode** | 🔜 v2 | Check for `opencode` command | TBD |
| **Aider** | 🔜 Future | Check for `aider` command | TBD |

### v1: Claude Code Integration

For v1, we support Claude Code only. This simplifies:
- Single CLI interface to learn
- Single output format to parse
- Smaller surface area for bugs

**Claude Code CLI Usage:**
```bash
# Basic invocation
claude -p "Your prompt here"

# With JSON output (easier to parse)
claude -p "Your prompt here" --output-format json

# With specific model
claude -p "Your prompt here" --model claude-sonnet-4-20250514
```

### Agent Invocation Wrapper

```typescript
interface AgentResponse {
  content: string;
  success: boolean;
  error?: string;
}

async function askAgent(prompt: string): Promise<AgentResponse> {
  const config = loadConfig();
  
  if (config.agent !== 'claude-code') {
    throw new Error(`Agent '${config.agent}' not yet supported. Use 'claude-code'.`);
  }
  
  try {
    const result = await execAsync(
      `claude -p "${escapeShell(prompt)}" --output-format json`
    );
    return { content: result.stdout, success: true };
  } catch (error) {
    return { content: '', success: false, error: error.message };
  }
}
```

### Agent Setup Flow

```
$ onboardme init

🔧 AGENT SETUP

Which AI agent do you use?

  ● Claude Code (recommended)
  ○ Cursor CLI (coming soon)
  ○ OpenCode (coming soon)

Checking Claude Code installation...
  ✓ Found: claude v1.0.3
  ✓ Authenticated: yes

Agent configured! Proceeding with scan...
```

### When Agent is Invoked

| Action | Agent Needed? | Purpose |
|--------|---------------|---------|
| Init: Scan codebase | Yes | Analyze and understand code |
| Init: Generate questions | Yes | Create contextual challenges |
| Game: Display question | No | Static content |
| Game: Check multiple choice | No | Deterministic comparison |
| Game: Evaluate free-form | Yes | Understand user's answer |
| Game: Generate brief | Yes | Contextual explanation |
| Boss: Regenerate questions | Yes | Dynamic difficulty |
| User asks question | Yes | Answer based on context |

---

## 9. Bootstrap: Context Gathering

### What Gets Gathered

```typescript
interface CodebaseContext {
  // Project metadata
  meta: {
    projectName: string;
    language: string;
    framework: string;
    packageManager: string;
    totalFiles: number;
    totalLines: number;
  };
  
  // Services/modules
  services: Array<{
    name: string;
    path: string;                  // Verified to exist
    description: string;
    entryPoint: string;
    dependencies: string[];        // Other services
    externalDeps: string[];        // npm packages, APIs
    keyFunctions: FunctionInfo[];
  }>;
  
  // Data flows
  flows: Array<{
    name: string;
    trigger: string;               // e.g., "POST /api/checkout"
    steps: FlowStep[];
  }>;
  
  // Domain knowledge
  domain: {
    terms: Record<string, string>;
    acronyms: Record<string, string>;
    configs: ConfigEntry[];
  };
  
  // Monster origin (technical debt analysis)
  monster: {
    birthYear: number;             // Oldest file creation date
    todoCount: number;             // Actual TODO count
    oldestTodo: string;            // Most ancient TODO still in code
    longestFunction: {
      name: string;
      lines: number;
      file: string;
    };
    complexityScore: number;
    mostComplexPath: string;
  };
  
  // Verification
  _verified: {
    timestamp: string;
    filesChecked: number;
    allPathsExist: boolean;
  };
}
```

### Verification Requirements

**Every piece of information must be verifiable:**

| Data | Verification |
|------|--------------|
| Service path | `fs.existsSync(path)` |
| Function location | Parse file, confirm line number |
| Config value | Read actual config file |
| Data flow step | Trace imports and calls |

If something can't be verified, it's marked as `uncertain` and not used in questions.

---

## 10. Installation & System Requirements

### Installation

```bash
# Via npm
npm install -g onboardme

# Via npx (no install)
npx onboardme init

# Via brew (future)
brew install onboardme
```

### System Requirements

- Node.js 18+
- Git (for history analysis)
- One of: Cursor CLI, Claude Code, OpenCode (for AI features)

---

*Document Version: 0.1*
*Last Updated: 2025-02-02*
*Status: Draft*
