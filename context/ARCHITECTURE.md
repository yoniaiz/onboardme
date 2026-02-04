# OnboardMe — Architecture Document

> **Architectural decisions, system design, and technical specifications for OnboardMe.**

This document covers the high-level architecture, skill-based workflow, plugin system, technical stack, file system structure, and post-game flow including victory artifacts and task suggestions.

---

## Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Key Architectural Decisions](#2-key-architectural-decisions)
3. [Skill-Based Workflow](#3-skill-based-workflow)
4. [Game Architecture](#4-game-architecture-react-based)
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
│  ├── config.ts          (game selection + options - committed)       │
│  ├── context/           (gathered codebase knowledge)               │
│  ├── prepared/          (game-ready structured data)                │
│  ├── state/             (progress, history - managed by CLI)        │
│  └── template/          (legacy - unused)                           │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     OnboardMe CLI                                   │
│  • onboardme init     → Sets up .onboardme folder structure         │
│  • onboardme game:new → Scaffolds a new game                        │
│  • onboardme start    → Loads config, runs games                    │
│  • onboardme status   → Shows progress                              │
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
| Games | React component-based | Games are Ink/React components with local state (e.g. `useReducer`) |
| Game selection | TypeScript config file | `.onboardme/config.ts` via `defineConfig()` enables type-safe composition |

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
1. Reads `.onboardme/config.ts` (or default config)
2. For each game in config:
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
CLI loads config.ts → runs games (interactive)
```

---

## 4. Game Architecture (React-Based)

Games are React components (Ink UI) exported via typed factories. This keeps state visible, testable, and aligned with the UI.

### Game component contract

Every game component receives `GameProps<TConfig>` (from `src/types/game.ts`):

- `config`: typed game config
- `onAnswerResult(result)`: report answer correctness + commits earned
- `onGameComplete(result)`: report completion

`AnswerResult.isNavigation = true` marks UI navigation events (e.g., selecting an evidence category) that should not affect scoring.

### Game definition (`defineGame`) and config (`defineConfig`)

Games are defined with `defineGame()` and returned as factory functions:

```typescript
// src/games/file-detective/index.ts
export const FileDetective = defineGame<FileDetectiveConfig>({
  id: "file-detective",
  component: FileDetectiveComponent,
  defaultConfig,
  metadata: {
    id: "file-detective",
    name: "file --detective",
    description: "Investigate a codebase to identify its project type and stack",
    estimatedMinutes: 10,
  },
  getAIContext,
});
```

Users configure which games run (and in what order) via `.onboardme/config.ts`:

```typescript
// .onboardme/config.ts
import { defineConfig, FileDetective } from "onboardme/games";

export default defineConfig({
  games: [FileDetective()],
});
```

The CLI loads this file via `loadConfig(rootDir)` in `src/core/config.ts` and falls back to the built-in default config when absent or invalid.

### Orchestration (`GameOrchestrator`)

`src/ui/orchestrator/game-orchestrator.tsx`:

- Renders the current game from `config.games[index]` (no registry lookup)
- Aggregates session stats (commits, accuracy, streak)
- Advances to the next game on `onGameComplete`

### Custom games

Because `.onboardme/config.ts` is TypeScript, teams can import local games directly (relative path) and mix them with built-ins without string IDs or registration steps.

### Scaffolding (`onboardme game:new`)

`onboardme game:new <id>` scaffolds the standard game folder with:

- `index.ts` (defineGame export)
- `component.tsx` (React component stub)
- `types.ts` (config schema/types stub)
- `ai-context.ts` (AI context stub)

---

## 5. Tech Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Runtime | Bun | Fast TypeScript/JS runtime and bundler |
| Language | TypeScript (strict) | Type safety and refactor confidence |
| CLI Framework | Commander.js | Mature CLI ergonomics |
| Terminal UI | Ink + React | Declarative UI with good composability |
| Validation | Zod | Runtime schema validation for prepared data |
| Lint/Format | Biome | Fast, consistent code style |
| Tests | Bun test | Simple, fast test runner |
| Dependency checking | Knip | Keep exports/files clean |

---

## 6. Project Structure

```
onboardme/
├── src/
│   ├── commands/                 # CLI commands
│   │   ├── game-new.ts
│   │   ├── init.tsx
│   │   ├── start.tsx
│   │   ├── status.tsx
│   │   └── validate.ts
│   ├── core/                     # Core helpers (config, scoring, prepared paths)
│   │   ├── config.ts
│   │   ├── constants.ts
│   │   ├── loader.ts
│   │   └── scoring.ts
│   ├── games/                    # Built-in games
│   │   ├── file-detective/
│   │   └── index.ts
│   ├── lib/                      # fs/paths/errors
│   ├── services/                 # state + manifest validation
│   ├── types/                    # shared types
│   │   └── game.ts
│   └── ui/                       # Ink UI components + orchestrator
│       ├── components/
│       ├── orchestrator/
│       ├── screens/
│       ├── render.tsx
│       └── theme.tsx
├── context/                      # Product/design docs
└── tests/
    ├── e2e/
    ├── integration/
    └── unit/
```

---

## 7. File System Structure

All runtime data lives in `.onboardme/` at the repository root.

```
.onboardme/
├── config.ts                 # committed: game order + options (TypeScript)
├── context/                  # gitignored: raw gathered context (from skill)
├── prepared/                 # gitignored: prepared game data (from skill)
│   └── games/
│       └── file-detective/
│           └── data.json
├── state/                    # gitignored: progress/state managed by CLI
│   └── progress.json
├── template/                 # legacy (currently unused)
└── .gitignore
```

### What to Gitignore

```gitignore
# Generated by skills (regenerate with skills)
context/
prepared/

# User-specific state (don't commit)
state/
```

**Rationale:**

- `context/` and `prepared/` are regenerated by skills
- `state/` is user-specific and should not be committed
- `config.ts` is committed so teams share a common game lineup and configuration

---

## 8. CLI Commands

The CLI is a **runner**—it loads config and runs games. Validation and AI work happen through skills.

### Core Commands

| Command | Purpose |
|---------|---------|
| `onboardme init` | Create `.onboardme/` folder structure and starter state |
| `onboardme game:new <id>` | Scaffold a new game in `src/games/<id>/` |
| `onboardme start` | Load `.onboardme/config.ts` and run games (interactive terminal) |
| `onboardme status` | Show current progress |
| `onboardme validate` | Validate prepared data and output JSON errors for AI to fix |

### Error Output for AI

When validation fails, the CLI outputs structured errors that can be shown to AI:

```json
{
  "valid": false,
  "errors": [
    {
      "game": "file-detective",
      "field": "config.evidence",
      "error": "evidence must include all 5 category IDs"
    }
  ],
  "suggestion": "Re-run 'prepare game' skill to regenerate file-detective data"
}
```

**Workflow for fixing:**

1. User runs `onboardme validate`
2. CLI outputs validation error
3. User shows error to AI
4. AI re-runs the prepare skill to fix
5. User re-runs `onboardme validate`

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

## 13. E2E Testing Framework

OnboardMe includes a lightweight E2E framework for testing Ink game UIs with simulated keyboard input.

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        E2E Test                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   withGameE2E({ GameComponent, config }, async (e2e) => {           │
│     e2e.debug("Screen");                                            │
│     await e2e.press("enter");                                       │
│     await e2e.type("answer");                                       │
│   });                                                                │
│                                                                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Ink Render (Local)                               │
│  • MockStdout → Captures rendered frames                            │
│  • MockStdin → Emits keyboard events                                │
│  • No external dependencies                                         │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Game Component                                   │
│  • Receives GameProps<TConfig>                                      │
│  • Calls onAnswerResult / onGameComplete                            │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `withGameE2E` | `tests/e2e/framework/harness.ts` | Main entry point for E2E tests |
| `ink-render.ts` | `tests/e2e/framework/ink-render.ts` | Local Ink render utilities (mock stdin/stdout) |
| `keys.ts` | `tests/e2e/framework/keys.ts` | Keyboard key codes |
| `types.ts` | `tests/e2e/framework/types.ts` | TypeScript interfaces for the harness |
| Configs | `tests/e2e/configs/` | Test configurations |
| Sandbox | `tests/e2e/sandbox/` | Experimentation scripts |

### File Structure

```
tests/e2e/
├── framework/
│   ├── index.ts      # Public API
│   ├── harness.ts    # withGameE2E implementation
│   ├── ink-render.ts # Local Ink testing utilities
│   ├── types.ts      # TypeScript interfaces
│   └── keys.ts       # Keyboard key codes
├── configs/
│   └── file-detective.ts
├── sandbox/
│   └── file-detective.sandbox.ts
└── file-detective.e2e.test.ts
```

### Adding Support for New Games

1. **Create config** (`tests/e2e/configs/{game}.ts`):
   - Export a config object matching the game’s config type

2. **Create tests** (`tests/e2e/{game}.e2e.test.ts`):
   - Import the game component and use `withGameE2E`

---

## 14. Enhanced Experience Features

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
