# OnboardMe — Development Progress

> Track all tasks, their status, and links to detailed plans.

**Legend:**
- ⬜ Not started
- 🟡 In progress
- ✅ Complete
- 🚫 Blocked
- 📋 Has detailed plan

---

## Phase 0: Foundation

### 0.1 Project Setup
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Initialize Node.js/TypeScript project | [→ plan](#plan-01-project-setup) | package.json, tsconfig, eslint |
| ⬜ | Set up CLI framework (Commander.js or Oclif) | | |
| ⬜ | Set up terminal UI library (Ink or Blessed) | | |
| ⬜ | Configure build system (tsup) | | |
| ⬜ | Set up testing framework (Vitest) | | |
| ⬜ | Create basic folder structure | | |
| ⬜ | Add development scripts (dev, build, test) | | |

### 0.2 Core Architecture
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Design game template interface | [→ plan](#plan-02-game-template-architecture) | Base class/interface for all games |
| ⬜ | Design state management system | | Progress, history, knowledge |
| ⬜ | Design agent adapter interface | | Abstract agent communication |
| ⬜ | Implement file system utilities | | Read/write .onboarding/ |
| ⬜ | Implement config management | | |

---

## Phase 1: CLI Shell

### 1.1 Basic Commands
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Implement `onboardme init` (skeleton) | [→ plan](#plan-11-init-command) | |
| ⬜ | Implement `onboardme start` (skeleton) | | |
| ⬜ | Implement `onboardme status` | | |
| ⬜ | Implement `onboardme reset` | | |
| ⬜ | Implement `onboardme config` | | |
| ⬜ | Implement `onboardme knowledge` | | |

### 1.2 Agent Integration
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Implement Claude Code adapter | [→ plan](#plan-12-claude-code-adapter) | |
| ⬜ | Agent detection and validation | | |
| ⬜ | Prompt construction utilities | | |
| ⬜ | Response parsing utilities | | |
| ⬜ | Error handling for agent failures | | |

### 1.3 Terminal UI Components
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Set up Ink framework | | React-based terminal UI |
| ⬜ | Define color theme/palette | | See PRD 5.5 |
| ⬜ | Game frame/border component | | ASCII box drawing (╔═╗║╚╝) |
| ⬜ | Progress bar component | | Animated, colored |
| ⬜ | Timer component | | With tension colors |
| ⬜ | Multiple choice selector | | Arrow key navigation |
| ⬜ | Text input with validation | | |
| ⬜ | Health/shield display | | Guardian + player |
| ⬜ | XP/score display | | Rolling number animation |
| ⬜ | Streak indicator | | Escalating visuals |

### 1.4 Visual Effects & Polish
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Set up figlet for ASCII titles | | Big text headers |
| ⬜ | Set up gradient-string | | Rainbow/gradient text |
| ⬜ | Set up chalk-animation | | Glitch, pulse, neon effects |
| ⬜ | Title screen design | | With animation |
| ⬜ | Level transition animation | | Fade/dissolve effect |
| ⬜ | Victory screen design | | Celebration visuals |
| ⬜ | Guardian reveal animation | | Dramatic entrance |
| ⬜ | Damage flash effect | | Screen shake/invert |
| ⬜ | Typewriter text effect | | For dialogue/briefs |
| ⬜ | Sound effects (beeper) | | Optional, off by default |

---

## Phase 2: Bootstrap System

### 2.1 Context Gathering
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Design context schema | [→ plan](#plan-21-context-schema) | TypeScript interfaces |
| ⬜ | Structural scan (files, folders) | | |
| ⬜ | Language/framework detection | | |
| ⬜ | Service identification | | |
| ⬜ | Function extraction | | |
| ⬜ | Data flow tracing | | |
| ⬜ | Domain term extraction | | |
| ⬜ | Git history analysis | | |

### 2.2 Guardian Generation
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Complexity scoring algorithm | | |
| ⬜ | Guardian name generation | [→ plan](#plan-22-guardian-naming) | Based on project/domain |
| ⬜ | Guardian description generation | | |
| ⬜ | Guardian ASCII art variants | [→ resources](#guardian-art-resources) | Use REXPaint or ascii.co.uk for reference |
| ⬜ | Guardian personality system | | Based on domain type |
| ⬜ | Inter-level dialogue generator | | AI generates contextual taunts |
| ⬜ | Performance-based reactions | | Adapts to player score |
| ⬜ | Boss phase dialogue system | | Damage-triggered lines |
| ⬜ | "Guardian watching" indicator | | Subtle presence during games |

### 2.3 Question Generation
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Design question schema | | |
| ⬜ | Level 1 question generation prompts | | |
| ⬜ | Level 2 question generation prompts | | |
| ⬜ | Level 3 question generation prompts | | |
| ⬜ | Level 4 question generation prompts | | |
| ⬜ | Level 5 question generation prompts | | |
| ⬜ | Boss question generation prompts | | |
| ⬜ | Question verification (paths exist, etc.) | | |

---

## Phase 3: Game Engine

### 3.1 Core Game Loop
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Game state machine | | |
| ⬜ | Level progression logic | | |
| ⬜ | Score/XP calculation | | |
| ⬜ | Streak tracking | | |
| ⬜ | Lives/shields system | | |
| ⬜ | Hint system | | |
| ⬜ | Checkpoint/resume system | | |

### 3.2 Answer Evaluation
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Multiple choice validation | | Deterministic |
| ⬜ | Exact match validation | | File paths, function names |
| ⬜ | Free-form answer evaluation | | AI-powered |
| ⬜ | Partial credit system | | |

### 3.3 Knowledge System
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Knowledge entry schema | | |
| ⬜ | Brief generation prompts | | |
| ⬜ | Knowledge persistence | | |
| ⬜ | Knowledge browsing UI | | |

---

## Phase 4: Mini-Games

> Each game is an isolated, testable module. See [Game Template Architecture](#plan-02-game-template-architecture).

### 4.1 Level 1: `./init`

#### Game: `tree --discover`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-tree-discover) | |
| ⬜ | Implement game class | | `npm run game:test tree-discover` |
| ⬜ | Create question templates | | |
| ⬜ | Implement UI components | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

#### Game: `ps aux | grep`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-ps-aux-grep) | |
| ⬜ | Implement game class | | `npm run game:test ps-aux-grep` |
| ⬜ | Create question templates | | |
| ⬜ | Implement UI components | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

### 4.2 Level 2: `cd ./deeper`

#### Game: `grep --hunt`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-grep-hunt) | |
| ⬜ | Implement game class | | `npm run game:test grep-hunt` |
| ⬜ | Create question templates | | |
| ⬜ | Implement UI components | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

#### Game: `import { puzzle }`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-import-puzzle) | |
| ⬜ | Implement game class | | `npm run game:test import-puzzle` |
| ⬜ | Create question templates | | |
| ⬜ | Implement UI components | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

### 4.3 Level 3: `cat ./deep-dive`

#### Game: `traceroute --function`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-traceroute-function) | |
| ⬜ | Implement game class | | `npm run game:test traceroute-function` |
| ⬜ | Create question templates | | |
| ⬜ | Implement UI components | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

#### Game: `debug --inject`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-debug-inject) | |
| ⬜ | Implement game class | | `npm run game:test debug-inject` |
| ⬜ | Create bug injection system | | |
| ⬜ | Implement sandbox environment | | |
| ⬜ | Create question templates | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

### 4.4 Level 4: `man domain-logic`

#### Game: `whois --system`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-whois-system) | |
| ⬜ | Implement game class | | `npm run game:test whois-system` |
| ⬜ | Create clue generation system | | |
| ⬜ | Implement progressive reveal | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

#### Game: `man --explain 20q`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-man-explain-20q) | |
| ⬜ | Implement game class | | `npm run game:test man-explain-20q` |
| ⬜ | Create yes/no evaluation system | | |
| ⬜ | Implement question counter | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

### 4.5 Level 5: `sudo ./execute`

#### Game: `tail -f incident.log`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-tail-incident) | |
| ⬜ | Implement game class | | `npm run game:test tail-incident` |
| ⬜ | Create incident scenario generator | | |
| ⬜ | Implement live log simulation | | |
| ⬜ | Implement decision tree | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

#### Game: `chmod +x deploy.sh`
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design game mechanics | [→ plan](#game-chmod-deploy) | |
| ⬜ | Implement game class | | `npm run game:test chmod-deploy` |
| ⬜ | Create sandboxed task system | | |
| ⬜ | Implement checklist UI | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

### 4.6 Boss: `./guardian --final`

#### Boss: The Guardian Gauntlet
| Status | Task | Plan | Test Command |
|--------|------|------|--------------|
| ⬜ | Design boss mechanics | [→ plan](#boss-guardian-gauntlet) | |
| ⬜ | Implement boss class | | `npm run game:test guardian-gauntlet` |
| ⬜ | Phase 1: Rapid Fire | | |
| ⬜ | Phase 2: Trace the Breach | | |
| ⬜ | Phase 3: The Final Fix | | |
| ⬜ | Question regeneration system | | |
| ⬜ | Health/damage calculation | | |
| ⬜ | Victory sequence | | |
| ⬜ | Write unit tests | | |
| ⬜ | Manual playtesting | | |

---

## Phase 5: Polish & Testing

### 5.1 End-to-End Testing
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Create test codebase fixture | | Small but realistic |
| ⬜ | E2E test: init flow | | |
| ⬜ | E2E test: full game playthrough | | |
| ⬜ | E2E test: resume from checkpoint | | |

### 5.2 Documentation
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | README.md | | |
| ⬜ | Installation guide | | |
| ⬜ | Contributing guide | | |
| ⬜ | Game template documentation | | For contributors |

### 5.3 Distribution
| Status | Task | Plan | Notes |
|--------|------|------|-------|
| ⬜ | Publish to npm | | |
| ⬜ | Create GitHub releases | | |
| ⬜ | Add to Homebrew (future) | | |

---

## Plans

### Plan: 0.1 Project Setup

```
Folder Structure:
─────────────────
onboardme/
├── src/
│   ├── cli/              # CLI command handlers
│   ├── core/             # Core game engine
│   ├── games/            # Mini-game implementations
│   │   ├── base/         # Base classes & interfaces
│   │   ├── level1/
│   │   ├── level2/
│   │   ├── level3/
│   │   ├── level4/
│   │   ├── level5/
│   │   └── boss/
│   ├── agent/            # Agent framework adapters
│   ├── bootstrap/        # Context gathering
│   ├── state/            # State management
│   ├── ui/               # Terminal UI components
│   └── utils/            # Shared utilities
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/         # Test codebases
├── package.json
├── tsconfig.json
├── PRD.md
└── PROGRESS.md

Key Dependencies:
─────────────────
- commander: CLI framework
- ink: React for CLI (terminal UI)
- chalk: Terminal colors
- ora: Spinners
- vitest: Testing
- tsup: Build
- typescript: Type safety
```

---

### Plan: 0.2 Game Template Architecture

```typescript
/**
 * Base interface for all mini-games.
 * Each game is a self-contained module that can be:
 * - Run in isolation for testing
 * - Loaded dynamically at runtime
 * - Extended for new game types
 */

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
  hints: number;
  streak: number;
  startTime: Date;
  answers: AnswerRecord[];
}

interface GameQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'multi-step' | 'timed';
  prompt: string;
  context?: string;              // Additional info shown
  hints: string[];
  timeLimit?: number;            // seconds
  validation: ValidationRule;
  knowledgeReward: string[];     // Knowledge IDs to unlock
  xpReward: number;
}

abstract class BaseGame {
  abstract config: GameConfig;
  abstract state: GameState;
  
  // Lifecycle
  abstract initialize(context: CodebaseContext): Promise<void>;
  abstract start(): Promise<void>;
  abstract pause(): void;
  abstract resume(): void;
  abstract end(): GameResult;
  
  // Question flow
  abstract getCurrentQuestion(): GameQuestion;
  abstract submitAnswer(answer: string): Promise<AnswerResult>;
  abstract useHint(): string | null;
  abstract skip(): void;
  
  // For isolated testing
  abstract runTestMode(mockContext?: Partial<CodebaseContext>): Promise<void>;
}

// Example implementation
class TreeDiscoverGame extends BaseGame {
  config = {
    id: 'tree-discover',
    name: 'tree --discover',
    level: 1,
    description: 'Explore and map the project structure',
    estimatedTime: 10,
    maxQuestions: 8,
  };
  
  // ... implementation
}
```

**Key Principles:**
1. Each game is a class extending `BaseGame`
2. Games are registered in a central registry
3. Games can be run standalone via `npm run game:test <game-id>`
4. Games receive context but don't know about other games
5. Games produce knowledge entries and XP, consumed by core engine

---

### Plan: 1.1 Init Command

```
Flow:
─────
1. Check for existing .onboarding/
   - If exists, prompt: "Reinitialize? This will reset progress."
   
2. Agent setup
   - Detect available agents
   - If none found, show installation instructions
   - If multiple, let user choose
   - Verify auth works (simple test prompt)
   
3. Bootstrap (calls agent)
   - Phase 1: Structural scan
   - Phase 2: Deep analysis
   - Phase 3: Knowledge extraction
   - Phase 4: Validation
   
4. Generate guardian
   - Identify most complex component
   - Generate name and description
   
5. Generate game content
   - For each level, for each game:
     - Generate questions using prompts
     - Verify all references exist
     - Save to .onboarding/games/
     
6. Save config
   - Write config.json with agent choice
   - Create empty state files
   
7. Display summary
   - Guardian identified
   - Levels ready
   - "Run 'onboardme start' to begin"
```

---

### Plan: 1.2 Claude Code Adapter

```typescript
interface AgentAdapter {
  name: string;
  detect(): Promise<boolean>;
  validateAuth(): Promise<boolean>;
  ask(prompt: string): Promise<string>;
  askJson<T>(prompt: string, schema: JsonSchema): Promise<T>;
}

class ClaudeCodeAdapter implements AgentAdapter {
  name = 'claude-code';
  
  async detect(): Promise<boolean> {
    // Check if 'claude' command exists
    return commandExists('claude');
  }
  
  async validateAuth(): Promise<boolean> {
    // Try a simple prompt
    try {
      await this.ask('Say "ok" if you can hear me.');
      return true;
    } catch {
      return false;
    }
  }
  
  async ask(prompt: string): Promise<string> {
    const result = await exec(`claude -p "${escape(prompt)}"`);
    return result.stdout;
  }
  
  async askJson<T>(prompt: string, schema: JsonSchema): Promise<T> {
    const fullPrompt = `${prompt}\n\nRespond with valid JSON matching this schema:\n${JSON.stringify(schema)}`;
    const result = await exec(`claude -p "${escape(fullPrompt)}" --output-format json`);
    return JSON.parse(result.stdout);
  }
}
```

---

### Plan: 2.1 Context Schema

See PRD Section 9 for full schema.

Key points:
- Everything must be **verified** (paths exist, lines exist)
- Uncertain data is flagged, not used in questions
- Schema is versioned for future migrations

---

### Plan: 2.2 Guardian Naming

```typescript
interface GuardianNameParts {
  adjective: string;   // "Ancient", "Distributed", "Encrypted"
  noun: string;        // "Ledger", "Sentinel", "Nexus"
  location: string;    // "of Acme Corp", "of the Payments Realm"
}

function generateGuardianName(
  context: CodebaseContext
): GuardianNameParts {
  // 1. Identify domain from dependencies and terms
  const domain = detectDomain(context);
  // payments, auth, data, api, infra, etc.
  
  // 2. Pick adjective based on complexity characteristics
  const adjective = pickAdjective(domain, context.guardian.complexityScore);
  
  // 3. Pick noun based on what the component does
  const noun = pickNoun(domain, context.guardian.path);
  
  // 4. Generate location from project/company name
  const location = generateLocation(context.meta.projectName);
  
  return { adjective, noun, location };
}

// Display: "The {adjective} {noun} {location}"
// Example: "The Ancient Ledger of Acme Corp"
```

---

### Game Plans

Each game has its own detailed plan. Created as development proceeds.

#### Game: `tree-discover`
```
Mechanic: Progressive structure reveal
─────────────────────────────────────
- Start with foggy/hidden directory tree
- Each correct answer reveals a portion
- Questions about:
  - Language/framework identification
  - Directory purposes
  - Configuration files
  - Entry points

Question Types:
- "What package manager does this use?" (look at lockfile)
- "What framework is the API built with?" (look at deps)
- "Where are the database models defined?" (directory purpose)

UI Elements:
- ASCII tree with revealed/hidden sections
- Progress percentage
- Reveal animation

Test Mode:
- Provide mock file tree
- Run through all questions
- Verify reveal logic
```

#### Game: `grep-hunt`
```
Mechanic: Timed code search
───────────────────────────
- Given a symptom/description
- Must find the relevant code
- Time pressure, hints available

Question Types:
- "Bug report: X happens. Find where Y is validated."
- "Feature request mentions Z. Find the implementation."
- "Error message says W. Find where it's thrown."

UI Elements:
- Timer countdown
- Search command log
- Hint button with penalty

Test Mode:
- Provide mock codebase
- Inject known "needles"
- Verify correct finding
```

*(Additional game plans created as each game is developed)*

---

### Guardian Art Resources

**Tools:**
- REXPaint (gridsagegames.com/rexpaint) — Professional ASCII art editor
- terminal-kit (npm) — Sprites, animations, screen buffers

**Reference Collections:**
- asciiart.eu/mythology/monsters — Monster designs
- ascii.co.uk/art/dragon — Detailed dragon/boss art
- emojicombos.com/demon-ascii-art — Demon designs

**Inspiration Games:**
- Dwarf Fortress — Classic roguelike creature design
- NetHack — ASCII monster vocabulary
- Caves of Qud — Modern ASCII aesthetic

---

## Changelog

| Date | Changes |
|------|---------|
| 2025-02-02 | Initial PROGRESS.md created |

---

## Quick Stats

```
Total Tasks:     ~120
Completed:       0
In Progress:     0
Completion:      0%

Priority Focus:  Phase 0 (Foundation)
Next Milestone:  Basic CLI shell working
```
