# OnboardMe — Architecture Document

> **Architectural decisions, system design, and technical specifications for OnboardMe.**

This document covers the high-level architecture, skill-based workflow, plugin system, technical stack, file system structure, and post-game flow including victory artifacts and task suggestions.

---

## Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Key Architectural Decisions](#2-key-architectural-decisions)
3. [Skill-Based Workflow](#3-skill-based-workflow)
4. [Plugin Architecture](#4-plugin-architecture)
5. [Tech Stack](#5-tech-stack)
6. [Project Structure](#6-project-structure)
7. [File System Structure](#7-file-system-structure)
8. [CLI Commands](#8-cli-commands)
9. [Context Schema](#9-context-schema)
10. [Installation & System Requirements](#10-installation--system-requirements)
11. [Post-Game Flow: Bridging to Real Work](#11-post-game-flow-bridging-to-real-work)
12. [Victory Artifact: CODEBASE_KNOWLEDGE.md](#12-victory-artifact-codebase_knowledgemd)
13. [Enhanced Experience Features](#13-enhanced-experience-features)

---

## 1. High-Level Architecture

OnboardMe uses a **skill-based architecture** where AI-powered context gathering and game preparation happen through user-invoked skills in their AI platform (Cursor, Claude, etc.), while the CLI handles game execution, state management, and user interactions.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     USER'S AI PLATFORM                              │
│                 (Cursor / Claude / etc.)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────────────────┐    ┌──────────────────────────────┐ │
│   │   Skill: Initialize      │    │   Skill: Prepare Game        │ │
│   │   Context                │ ─► │                              │ │
│   │   (scans repo, gathers   │    │   (reads template, structures│ │
│   │    context to files)     │    │    output for CLI)           │ │
│   └──────────────────────────┘    └──────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        .onboardme/                                  │
│  ├── context/           (gathered codebase knowledge)               │
│  ├── prepared/          (game-ready structured data)                │
│  ├── template/          (user's game template - optional)           │
│  └── state/             (progress, history - managed by CLI)        │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     OnboardMe CLI                                   │
│  • onboardme init     → Sets up .onboardme, installs skill          │
│  • onboardme start    → Validates prepared/, runs games             │
│  • onboardme status   → Shows progress                              │
│  • onboardme template → Creates/builds user template                │
│  • onboardme validate → Checks prepared/ structure                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AI Workflow | Skill-based | User controls when AI runs; no complex CLI-agent integration |
| Delivery | Standalone CLI | Maximum interactivity, works in any terminal |
| AI Backend | User's AI platform | Platform agnostic—works with Cursor, Claude, any skill-supporting tool |
| State | Local filesystem | Simple, portable, no accounts needed |
| Game Logic | Deterministic | Predictable, testable, doesn't require AI for core loop |
| Games | Plugin-based | Composable, extensible, users can customize or create games |
| Templates | User-configurable | Users define which games to include and their order |

---

## 3. Skill-Based Workflow

OnboardMe uses two AI skills that users run from their AI platform:

### Skill 1: Initialize Context

**Purpose:** Scan the repository and gather all context needed for games.

**When to run:** After `onboardme init`, or when you want to refresh context.

**What it gathers:**

| Category | Data | Stored In |
|----------|------|-----------|
| Project Meta | name, language, framework, package manager, file count | `meta.json` |
| Structure | key directories, entry points, folder patterns | `structure.json` |
| Services | services map, dependencies, key functions | `services.json` |
| Data Flows | user journeys, request paths, architecture layers | `flows.json` |
| Domain | terms, acronyms, configs, business concepts | `domain.json` |
| Features | feature areas, modules, what the app does | `features.json` |
| Technical Debt | TODOs, oldest TODO, longest functions, complexity | `debt.json` |
| Tests | test files, test frameworks, failing test candidates | `tests.json` |
| Documentation | README content, doc files, inline docs | `docs.json` |
| Git History | old commits, authors, monster birth year | `history.json` |

**Output:** Files saved to `.onboardme/context/`

### Skill 2: Prepare Game

**Purpose:** Transform raw context into game-ready structure based on template.

**When to run:** After context initialization, or after template changes.

**What it does:**
1. Reads template (user's custom or default)
2. For each game in template:
   - Reads game's required context schema
   - Transforms raw context into game-specific structure
   - Generates questions/challenges
3. Writes to `.onboardme/prepared/`

**Output:** Files saved to `.onboardme/prepared/`

### Workflow Diagram

```
User runs: onboardme init
       │
       ▼
CLI creates .onboardme/, installs skill, updates .gitignore
       │
       ▼
User tells AI: "Run initialize context"
       │
       ▼
Skill scans repo → writes to .onboardme/context/
       │
       ▼
User tells AI: "Run prepare game"
       │
       ▼
Skill reads template + context → writes to .onboardme/prepared/
       │
       ▼
User runs: onboardme start
       │
       ▼
CLI validates prepared/ → runs games → saves state
```

---

## 4. Plugin Architecture

Games are **plugins**—modular, composable units that can be mixed, matched, and customized.

### Plugin Schema

Each game plugin defines its schema:

```typescript
interface GamePluginSchema {
  id: string;                     // e.g., "file-detective"
  name: string;                   // e.g., "file --detective"
  description: string;
  estimatedTime: number;          // minutes
  
  // What context this game needs (for skill to generate)
  requiredContext: ContextRequirement[];
}

interface ContextRequirement {
  key: string;                    // e.g., "projectType", "techStack"
  source: string;                 // Which context file to read from
  schema: JSONSchema;             // Expected output schema
}
```

### Game Plugin Interface

```typescript
abstract class GamePlugin {
  abstract schema: GamePluginSchema;
  
  // Lifecycle (called by CLI)
  abstract initialize(preparedData: GamePreparedData): Promise<void>;
  abstract start(): Promise<void>;
  abstract getCurrentQuestion(): GameQuestion;
  abstract submitAnswer(answer: string): Promise<AnswerResult>;
  abstract end(): GameResult;
  
  // Optional hooks
  onCorrectAnswer?(question: GameQuestion): void;
  onWrongAnswer?(question: GameQuestion): void;
  onHintUsed?(question: GameQuestion): void;
}
```

### Template System

Templates define which games to include and their order. **Position in array = TODO level.**

**Default template (bundled):**

```typescript
// Built into onboardme package
export const defaultTemplate = [
  FileDetective,        // Position 0 → TODO #0
  FlowTrace,            // Position 1 → TODO #1
  GrepHunt,             // Position 2 → TODO #2
  SpaghettiMonster,     // Last → FIXME (boss)
];
```

**User's custom template:**

```typescript
// .onboardme/template/template.ts
import { FileDetective, FlowTrace, GrepHunt, SpaghettiMonster } from 'onboardme';

export const template = [
  FileDetective,
  FlowTrace,
  // GrepHunt removed - team doesn't want this game
  SpaghettiMonster,
];
```

**Or JSON format:**

```json
{
  "games": [
    { "id": "file-detective" },
    { "id": "flow-trace" },
    { "id": "spaghetti-monster" }
  ]
}
```

### Adding Custom Games

Users can create their own games:

1. Create game class extending `GamePlugin`
2. Define schema with required context
3. Add to template
4. Run `onboardme template build` (if TypeScript)

```typescript
// .onboardme/template/games/my-custom-game.ts
import { GamePlugin } from 'onboardme';

export class MyCustomGame extends GamePlugin {
  schema = {
    id: 'my-custom-game',
    name: 'custom --game',
    description: 'My team-specific onboarding game',
    estimatedTime: 10,
    requiredContext: [
      {
        key: 'customData',
        source: 'features.json',
        schema: { type: 'array', items: { type: 'object' } }
      }
    ]
  };
  
  // ... implement methods
}

// Add to template
import { FileDetective, SpaghettiMonster } from 'onboardme';
import { MyCustomGame } from './games/my-custom-game';

export const template = [
  FileDetective,
  MyCustomGame,      // Custom game at position 1
  SpaghettiMonster,
];
```

---

## 5. Tech Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Language | TypeScript | Type safety, good CLI tooling |
| CLI Framework | Commander.js or Oclif | Mature, well-documented |
| Terminal UI | Ink (React for CLI) | Rich terminal UI, React patterns |
| Testing | Vitest | Fast, modern |
| Build | tsup or esbuild | Fast builds |
| Package | npm | Standard distribution |

---

## 6. Project Structure

```
onboardme/
├── src/
│   ├── cli/                    # CLI command handlers
│   │   ├── init.ts             # Setup .onboardme, install skill
│   │   ├── start.ts            # Validate & run games
│   │   ├── status.ts           # Show progress
│   │   ├── template.ts         # Template management
│   │   └── validate.ts         # Validate prepared/ structure
│   ├── core/                   # Core game engine
│   │   ├── engine.ts           # Main game loop
│   │   ├── state.ts            # State management
│   │   ├── scoring.ts          # Commits/streak calculation
│   │   ├── documentation.ts    # Documentation unlock system
│   │   ├── pacing.ts           # Emotional pacing & valleys
│   │   ├── behavioral.ts       # Player behavior tracking
│   │   └── rendering.ts        # Text animation & typing speeds
│   ├── games/                  # Game plugin implementations
│   │   ├── base/               # Base classes & interfaces
│   │   │   ├── GamePlugin.ts   # Abstract plugin class
│   │   │   ├── types.ts        # Shared types
│   │   │   └── schemas.ts      # JSON schemas for validation
│   │   ├── file-detective/
│   │   │   ├── index.ts
│   │   │   └── schema.json
│   │   ├── flow-trace/
│   │   │   ├── index.ts
│   │   │   └── schema.json
│   │   ├── grep-hunt/
│   │   │   ├── index.ts
│   │   │   └── schema.json
│   │   └── spaghetti-monster/
│   │       ├── index.ts
│   │       └── schema.json
│   ├── template/               # Template handling
│   │   ├── loader.ts           # Load user/default template
│   │   ├── builder.ts          # Build TypeScript templates
│   │   └── default.ts          # Default game template
│   ├── validation/             # Prepared data validation
│   │   ├── validator.ts        # Validate against schemas
│   │   └── errors.ts           # Structured error output
│   ├── state/                  # State persistence
│   │   ├── progress.ts
│   │   ├── history.ts
│   │   └── documentation.ts
│   ├── ui/                     # Terminal UI components
│   │   ├── components/         # Reusable UI elements
│   │   │   ├── dialogue-choice.tsx
│   │   │   └── memory-log.tsx
│   │   ├── screens/            # Full-screen layouts
│   │   │   ├── cold-open.tsx
│   │   │   ├── loading.tsx
│   │   │   └── victory.tsx
│   │   ├── animations/         # Animation helpers
│   │   │   ├── glitch.ts
│   │   │   └── typewriter.ts
│   │   └── theme.ts
│   └── utils/
│       ├── fs.ts
│       ├── git.ts
│       └── prompt.ts
├── skill/                      # OnboardMe skill (installed to user's project)
│   ├── SKILL.md                # Main skill instructions
│   └── references/
│       ├── context-schema.md   # What to gather
│       └── game-schemas/       # Per-game requirements
│           ├── file-detective.md
│           ├── flow-trace.md
│           └── ...
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── games/
│   └── fixtures/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 7. File System Structure

All game data stored in `.onboardme/` at repository root.

```
.onboardme/
├── context/                      # Raw gathered context (from skill)
│   ├── meta.json                 # Project metadata
│   ├── structure.json            # Directory structure, entry points
│   ├── services.json             # Service map
│   ├── flows.json                # Data flows and user journeys
│   ├── domain.json               # Terms, acronyms, business logic
│   ├── features.json             # Feature areas
│   ├── debt.json                 # Technical debt analysis
│   ├── tests.json                # Test framework, test files
│   ├── docs.json                 # Documentation summary
│   └── history.json              # Git history analysis
├── prepared/                     # Game-ready data (from skill)
│   ├── manifest.json             # Which games, in what order
│   ├── games/
│   │   ├── file-detective/
│   │   │   ├── config.json
│   │   │   └── questions.json
│   │   ├── flow-trace/
│   │   │   ├── config.json
│   │   │   └── journeys.json
│   │   └── spaghetti-monster/
│   │       ├── config.json
│   │       └── phases.json
│   └── narrative/
│       ├── monster.json          # Generated monster personality
│       └── memory-logs.json      # Backstory fragments
├── template/                     # User's custom template (optional)
│   ├── template.ts               # or template.json
│   └── games/                    # Custom game implementations
│       └── my-custom-game.ts
├── state/                        # Game state (managed by CLI)
│   ├── progress.json             # Current game, question
│   ├── history.json              # All answers with timestamps
│   ├── knowledge.json            # Unlocked knowledge entries
│   └── achievements.json         # Badges & milestones
└── .gitignore
```

### What to Gitignore

```gitignore
# .onboardme/.gitignore

# Generated by skills (regenerate with skills)
context/
prepared/

# User-specific state (don't commit)
state/

# Keep these (commit to share with team)
# template/   - Custom game templates
```

**Rationale:**
- `context/` — Regenerated by "initialize context" skill, can be large
- `prepared/` — Regenerated by "prepare game" skill
- `state/` — User-specific progress, never commit
- `template/` — Custom templates should be committed so team shares same games

---

## 8. CLI Commands

The CLI is a **runner**—it validates prepared data and runs games. AI work happens through skills.

### Core Commands

| Command | Purpose |
|---------|---------|
| `onboardme init` | Setup `.onboardme/`, install skill, update `.gitignore` |
| `onboardme start` | Validate `prepared/`, run games, save state |
| `onboardme status` | Show current progress |
| `onboardme validate` | Check if `prepared/` is valid, output errors for AI to fix |
| `onboardme template` | Create starter template for customization |
| `onboardme template build` | Compile TypeScript template |

### Error Output for AI

When validation fails, CLI outputs structured errors that can be shown to AI:

```json
{
  "valid": false,
  "errors": [
    {
      "game": "flow-trace",
      "field": "journeys[0].entryPoint",
      "error": "Missing required field",
      "expected": "string",
      "received": "undefined"
    }
  ],
  "suggestion": "Re-run 'prepare game' skill to regenerate flow-trace data"
}
```

**Workflow for fixing:**
1. User runs `onboardme start`
2. CLI outputs validation error
3. User shows error to AI
4. AI re-runs prepare skill to fix
5. User runs `onboardme start` again

---

## 9. Context Schema

Context files have defined schemas that skills must follow.

### meta.json

```typescript
interface MetaContext {
  projectName: string;
  language: string;           // "TypeScript", "JavaScript", "Python", etc.
  framework: string;          // "Express", "Next.js", "Django", etc.
  packageManager: string;     // "npm", "yarn", "pnpm", "pip", etc.
  totalFiles: number;
  totalLines: number;
  entryPoints: string[];      // Main entry files
}
```

### structure.json

```typescript
interface StructureContext {
  keyDirectories: Array<{
    path: string;
    purpose: string;
    contents: string[];       // Key files in this directory
  }>;
  patterns: {
    hasTests: boolean;
    testPattern: string;      // e.g., "**/*.test.ts"
    hasConfig: boolean;
    configFiles: string[];
  };
}
```

### services.json

```typescript
interface ServicesContext {
  services: Array<{
    name: string;
    path: string;             // Verified to exist
    description: string;
    entryPoint: string;
    dependencies: string[];   // Other services
    externalDeps: string[];   // npm packages, APIs
    keyFunctions: Array<{
      name: string;
      file: string;
      line: number;
      description: string;
    }>;
  }>;
}
```

### debt.json

```typescript
interface DebtContext {
  monster: {
    birthYear: number;        // Oldest file creation date
    todoCount: number;        // Actual TODO count in codebase
    oldestTodo: {
      text: string;
      file: string;
      line: number;
      age: string;            // "3 years", etc.
    };
    longestFunction: {
      name: string;
      lines: number;
      file: string;
    };
    complexityScore: number;  // 1-100
  };
}
```

> **Complete schema definitions:** See [PLUGIN-ARCHITECTURE.md](./technical/PLUGIN-ARCHITECTURE.md) for all context schemas and game-specific requirements.

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
- AI platform with skill support (Cursor, Claude Desktop, etc.)

### Setup Flow

```bash
# 1. Install CLI
npm install -g onboardme

# 2. Initialize in your repo
cd your-project
onboardme init

# This creates:
# - .onboardme/ folder structure
# - .onboardme/.gitignore
# - Installs skill to your AI platform

# 3. Run skills from your AI platform
# Tell AI: "Run initialize context"
# Tell AI: "Run prepare game"

# 4. Start playing
onboardme start
```

### What `onboardme init` Does

1. Creates `.onboardme/` directory structure (`context/`, `prepared/`, `template/`, `state/`)
2. Creates `.onboardme/.gitignore` (ignores `context/`, `prepared/`, `state/`)
3. Installs the OnboardMe skill to user's AI platform
4. Outputs next steps for user

---

## 11. Post-Game Flow: Bridging to Real Work

### The "Now What?" Problem

After victory, players have learned the codebase but need guidance on how to apply that knowledge. The post-game flow bridges from game completion to actual contribution.

### Post-Game Sequence

```
[Victory ending]
  ↓
[Victory summary card]
  ↓
[Sharing options]
  ↓
[POST-GAME TASK SUGGESTION] ← New
  ↓
[Game complete]
```

### Task Suggestion Logic

```typescript
interface PostGameSuggestion {
  task: {
    type: 'TODO' | 'FIXME' | 'Bug' | 'Documentation';
    location: string;              // File and line number
    description: string;
    addedDate?: string;            // When TODO was created
    relatedTODO: number;           // Which game TODO covered this area
  };
  
  reasoning: {
    knowledgeAreas: string[];      // What player learned
    confidence: 'high' | 'medium' | 'low';
    explanation: string;           // Why this is a good first task
  };
  
  actions: {
    createIssue: boolean;          // Offer to create GitHub issue
    assignToPlayer: boolean;       // Auto-assign if created
  };
}
```

### Suggestion Algorithm

1. **Analyze player's knowledge**
   - Which TODOs completed?
   - Which areas explored most?
   - What questions answered correctly?

2. **Match to codebase TODOs**
   - Find TODOs in areas player understands
   - Prioritize by:
     - Age (older = more impactful)
     - Simplicity (achievable first task)
     - Relevance (matches learned areas)

3. **Present suggestion**
   - Show 1-3 options
   - Explain why each is appropriate
   - Offer to create issue

### Example Suggestions

**Player excelled in TODO #3 (Data Flows):**
```
Based on your exploration, here's a good first issue:

  📝 TODO in src/services/auth.js:47
     "// TODO: add rate limiting - added 2021"
  
  You discovered this during TODO #3.
  You now know the auth flow.
  This is your chance to prove you understand.
```

**Player excelled in TODO #2 (Search/Navigation):**
```
Based on your exploration, here's a good first issue:

  📝 TODO in src/utils/validator.js:23
     "// TODO: extract to separate module - added 2022"
  
  You've shown strong code navigation skills.
  This refactoring task matches your strengths.
```

**Player struggled but completed:**
```
Based on your exploration, here's a good first issue:

  📝 Documentation gap in README.md
     Missing: Setup instructions for local development
  
  You just went through onboarding.
  You know what's missing better than anyone.
```

### GitHub Integration

**If player chooses to create issue:**

```bash
gh issue create \
  --title "TODO: add rate limiting to auth service" \
  --body "Discovered during onboarding (OnboardMe game).

Location: src/services/auth.js:47
Added: 2021
Priority: Medium

Context: Auth service currently has no rate limiting, making it vulnerable to brute force attacks. Player demonstrated understanding of auth flow during onboarding.

Suggested by: OnboardMe post-game analysis
Assigned to: @new_dev" \
  --label "good-first-issue,onboarding,technical-debt" \
  --assignee @new_dev
```

### Opt-Out Option

```
Would you like a suggested first task? (y/n)
  [y] Show me what I can work on
  [n] I'll find something myself

*crackle*

"Fair enough. You know where to find me."

*[GAME COMPLETE]*
```

### Benefits

1. **Smooth transition** — From learning to doing
2. **Confidence building** — Suggested tasks match demonstrated skills
3. **Immediate impact** — First contribution on Day 1
4. **Technical debt reduction** — Turns game insights into real fixes
5. **Onboarding completion** — Clear endpoint with next steps

---

## 12. Victory Artifact: CODEBASE_KNOWLEDGE.md

### Concept

Upon defeating the Monster, the game generates a **real artifact**—a `CODEBASE_KNOWLEDGE.md` file that serves as:
1. **Documentation** — Everything the player learned
2. **Trophy** — Proof of completion
3. **First contribution** — Real commit on Day 1
4. **Living document** — Can be updated by future players

### File Generation

```typescript
interface CodebaseKnowledge {
  meta: {
    documentedBy: string;        // Player's name
    completionDate: Date;
    monsterAge: number;          // Years
    gameVersion: string;
  };
  
  structure: {
    overview: string;
    keyDirectories: DirectoryInfo[];
    entryPoints: string[];
  };
  
  services: {
    name: string;
    purpose: string;
    location: string;
    dependencies: string[];
  }[];
  
  flows: {
    name: string;
    description: string;
    steps: string[];
  }[];
  
  gotchas: {
    item: string;
    explanation: string;
    discoveredIn: string;        // Which TODO
  }[];
  
  todos: {
    location: string;
    priority: 'high' | 'medium' | 'low';
    context: string;
  }[];
}
```

### Generated File Template

```markdown
# Codebase Knowledge

> **Documentation generated by OnboardMe**  
> Documented by: @new_dev  
> Completion Date: 2025-02-02  
> Monster Age: 7 years  
> Status: The Spaghetti Code Monster has been documented.

---

## Overview

[Generated from player's exploration]

This codebase is a [Node.js/Python/etc] project that handles [primary purpose]. 
It was created in [year] and has evolved over [X] years.

---

## Project Structure

### Key Directories

- `src/services/` — Core business logic services
- `src/controllers/` — API endpoint handlers
- `src/utils/` — Shared utilities (⚠️ contains legacy code)
- `src/config/` — Configuration management

### Entry Points

- `src/index.js` — Main application entry
- `src/server.js` — HTTP server setup

---

## Services

### UserService
**Location:** `src/services/UserService.js`  
**Purpose:** User authentication and management  
**Dependencies:** DatabaseService, CacheService, EmailService

[More details from player's exploration...]

---

## Data Flows

### Authentication Flow
1. Request arrives at AuthController
2. Middleware validates JWT token
3. UserService verifies credentials
4. Session created in CacheService
5. Response returned

---

## Important Gotchas

### The Sacred Timeout
**Location:** `src/config/timeouts.js:15`  
**Value:** 3847ms  
**Why:** Nobody knows. Comment says "DO NOT CHANGE - breaks prod."  
**Discovered:** TODO #4

### The Legacy Bridge Table
**Location:** Database schema  
**Name:** `UserOrganizationProjectTaskLegacyBridge`  
**Why:** Migration from old system never completed  
**Discovered:** TODO #0

---

## Outstanding TODOs

High-priority TODOs that need attention:

1. **Add rate limiting to auth** — `src/services/auth.js:47` (Added 2021)
2. **Refactor validator function** — `src/utils/validator.js:23` (Added 2020)
3. **Extract legacy bridge logic** — `src/services/bridge.js:89` (Added 2019)

---

## Notes from The Monster

*"I'm not defeated. I'm documented."*

*"Everything you learned. Everything I knew."*

*"Don't forget me. Update the documentation."*

*"I never got the chance."*

---

**Slayer of the Spaghetti Monster (v1.0):** @new_dev  
**Date Documented:** 2025-02-02  
**Game Version:** OnboardMe v1.0

*This document was generated by the OnboardMe onboarding game. Update it as you learn more.*
```

### Pull Request Generation

**Automatic PR creation** (optional):

```bash
# After victory, offer to create PR
Would you like to commit this documentation? (y/n)
  [y] Create CODEBASE_KNOWLEDGE.md and open PR
  [n] Save locally only

# If yes:
git checkout -b docs/onboarding-knowledge
git add CODEBASE_KNOWLEDGE.md
git commit -m "docs: add codebase knowledge from OnboardMe

Generated by OnboardMe onboarding game.
Documented by: @new_dev
Monster Age: 7 years
Completion: 2025-02-02

This document captures key codebase knowledge including:
- Project structure and entry points
- Service architecture and dependencies
- Data flows and important gotchas
- Outstanding TODOs that need attention

The Spaghetti Code Monster has been documented."

git push origin docs/onboarding-knowledge

gh pr create \
  --title "docs: Add codebase knowledge from onboarding" \
  --body "## Summary

This PR adds comprehensive codebase documentation generated during the OnboardMe onboarding game.

## Contents

- Project structure overview
- Service architecture
- Data flow documentation
- Important gotchas and warnings
- Outstanding TODOs

## Context

Completed by: @new_dev
Date: 2025-02-02
Game completion: 97 minutes, 87% accuracy

The Spaghetti Code Monster has been documented.

---

*Generated by OnboardMe v1.0*" \
  --label "documentation,onboarding" \
  --assignee @new_dev
```

### Benefits

1. **Real contribution** — First PR on Day 1
2. **Living documentation** — Can be updated by future players
3. **Team value** — Useful reference for all developers
4. **Proof of completion** — Tangible artifact in git history
5. **Culture building** — "I documented the Monster" becomes team lore

---

## 13. Enhanced Experience Features

The architecture supports several enhanced features that transform the experience from "quiz" to "interactive thriller":

### Emotional Architecture
- **Cold open system** — Atmospheric introduction before gameplay (see section on init flow)
- **Pacing engine** — Manages valleys between peaks with configurable silence durations
- **Ambient presence** — Continuous subtle Monster sounds during active play
- **Loading screens** — Worldbuilding sequences with Monster commentary

### Player Agency
- **Dialogue choice system** — 4 key moments where players respond to Monster
- **Command-based questions** — Players run actual dev tools (grep, git blame) as weapons
- **Behavioral tracking** — Monster reacts to hint usage, speed, exploration patterns

### Discovery & Learning
- **Memory log system** — 8 unlockable backstory fragments from git history
- **Spaced repetition** — Concepts revisited across TODOs for retention
- **Learning spiral** — Each TODO builds on previous knowledge

### Visual & Rendering
- **Variable typing speeds** — Text speed reflects Monster's emotional state (5-100ms/char)
- **Glitch system** — Progressive visual corruption during boss battle
- **Rendering engine** — Sophisticated text animation with pauses and effects

### Real-World Impact
- **Victory artifact** — Generates CODEBASE_KNOWLEDGE.md documenting everything learned
- **Task suggestion** — Post-game recommendation for first contribution
- **PR generation** — Option to create PR with documentation on Day 1
- **Shareable victory** — Victory card with stats for team channels

> **Complete feature specifications:** See [IMPROVEMENTS-SUMMARY.md](../IMPROVEMENTS-SUMMARY.md)

### Related Design Documents

**Narrative:**
- [COLD-OPEN.md](./narrative/COLD-OPEN.md)
- [PACING-GUIDE.md](./narrative/PACING-GUIDE.md)
- [PLAYER-CHOICES.md](./narrative/PLAYER-CHOICES.md)
- [MEMORY-LOGS.md](./narrative/MEMORY-LOGS.md)

**Visual:**
- [LOADING-SCREENS.md](./visuals/LOADING-SCREENS.md)
- [VICTORY-SUMMARY.md](./visuals/VICTORY-SUMMARY.md)
- [GLITCH-SYSTEM.md](./visuals/GLITCH-SYSTEM.md)

**Technical:**
- [RENDERING-ENGINE.md](./technical/RENDERING-ENGINE.md)
- [BEHAVIORAL-TRACKING.md](./technical/BEHAVIORAL-TRACKING.md)

---

*Document Version: 0.2*
*Last Updated: 2025-02-02*
*Status: Design Complete - Ready for Implementation*
