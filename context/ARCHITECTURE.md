# OnboardMe — Architecture Document

> **Technical architecture for OnboardMe as an Agent Skill.**

OnboardMe is implemented as an **agent skill** that transforms coding agents (Cursor, Claude Code) into the Spaghetti Code Monster for gamified codebase onboarding.

---

## Table of Contents

1. [High-Level Architecture](#1-high-level-architecture)
2. [Key Architectural Decisions](#2-key-architectural-decisions)
3. [Skill File Structure](#3-skill-file-structure)
4. [State Management](#4-state-management)
5. [Gameplay Flow](#5-gameplay-flow)
6. [Runtime Files](#6-runtime-files)
7. [Installation & Distribution](#7-installation--distribution)
8. [Design Documents](#8-design-documents)

---

## 1. High-Level Architecture

OnboardMe uses an **agent-as-game-engine** architecture where the AI agent reads skill files to embody the Monster character and execute gameplay logic.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CODING AGENT PLATFORM                           │
│                 (Cursor / Claude Code / Codex)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Agent reads skill files and BECOMES the Spaghetti Code Monster    │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  SKILL.md                                                    │  │
│   │  - Monster persona and voice                                 │  │
│   │  - Command handlers (prepare, play, status, hint, reset)     │  │
│   │  - Gameplay loop and scoring rubric                          │  │
│   │  - Recovery patterns                                         │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                            │                                        │
│                            ▼                                        │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  references/THE-INVESTIGATION.md                             │  │
│   │  - Chapter-specific gameplay instructions                    │  │
│   │  - Phase-by-phase flow                                       │  │
│   │  - Dialogue examples                                         │  │
│   │  - Artifact templates                                        │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                            │                                        │
│                            ▼                                        │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  scripts/state-manager.cjs                                   │  │
│   │  - Agent executes to read/write game state                   │  │
│   │  - Persists to .onboardme/state.json                         │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                            │                                        │
│                            ▼                                        │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  scripts/knowledge-manager.cjs                               │  │
│   │  - Agent executes to read/write codebase knowledge           │  │
│   │  - Persists to .onboardme/context/repo-knowledge.json        │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ Agent creates/updates files
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     TARGET REPOSITORY                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   .onboardme/                                                       │
│   ├── state.json           # Game progress and Monster mood         │
│   ├── state.backup.json    # Auto-backup before writes              │
│   ├── context/                                                      │
│   │   └── repo-knowledge.json  # Monster's codebase answer key      │
│   └── artifacts/                                                    │
│       ├── CASE_FILE.md     # Investigation evidence log             │
│       ├── FLOW_MAP.md      # Architecture diagram (Chapter 3)       │
│       └── ...              # One artifact per chapter               │
│                                                                     │
│   [Rest of codebase - read by agent during gameplay]                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Game Engine** | Agent-as-Monster | Agent embodies character; no separate runtime needed |
| **State Persistence** | JSON files | Simple, portable, human-readable |
| **Skill Distribution** | npx add-skill | Standard agent-skills ecosystem |
| **Scripts** | Plain JavaScript (.cjs) | No build step; agents execute directly |
| **Artifacts** | Markdown files | Readable, committable, useful documentation |
| **Game Logic** | In skill instructions | Agent interprets rules; deterministic scoring |

### Why Agent-as-Monster?

The original design had a CLI that rendered the Monster. This required:
- Complex terminal UI (Ink/React)
- State synchronization between CLI and agent
- Multiple touchpoints for users

The agent-skills approach eliminates this complexity:
- **One interface**: User talks to agent, agent IS the Monster
- **No CLI at runtime**: Just conversational gameplay
- **Portable**: Works with any skill-supporting agent
- **Simpler state**: JSON files managed by simple scripts

---

## 3. Skill File Structure

### Distribution Repository

```
skills/onboardme/
├── SKILL.md                    # Main skill file
├── scripts/
│   ├── state-manager.cjs       # Game state persistence
│   └── knowledge-manager.cjs   # Codebase knowledge persistence
├── instructions/
│   ├── prepare-game.md         # Repo analysis + knowledge building
│   ├── play-game.md            # Knowledge loading + discovery accumulation
│   ├── status.md               # Status display instructions
│   ├── hint.md                 # Hint system instructions
│   └── reset-game.md           # Reset instructions
└── references/
    └── THE-INVESTIGATION.md    # Chapter 1 full flow
```

### SKILL.md Structure

The main skill file contains:

```yaml
---
name: onboardme
description: >
  Gamified codebase onboarding through the Spaghetti Code Monster.
license: MIT
metadata:
  author: yonatanai
  version: "1.0.0"
---
```

**Sections:**
1. **Character Definition** — Monster traits, voice patterns, signature lines
2. **State Management** — How to read/write game state via scripts
3. **Knowledge Management** — How to read/write codebase knowledge (answer key)
4. **Commands** — Triggers that load instruction files (prepare, play, status, hint, reset)
5. **Gameplay Loop** — Challenge → Move → Evaluation → Reward → Next
6. **Mood System** — How Monster's attitude evolves
7. **Recovery Patterns** — Handling stuck players, disputes, derails
8. **Safety Rules** — Boundaries (stay helpful, accurate, never cruel)
9. **File Artifacts** — CASE_FILE.md template and update instructions

### Reference Files

Chapter-specific instructions that the agent reads when entering a chapter:

```markdown
# Chapter 1: The Investigation

## Overview
[What player learns]

## Resources You Can Access
[Files agent should examine]

## State Management
[What to read/write in state.json]

## Scoring Rubric
[How to evaluate answers]

## Chapter Flow
[Phase-by-phase instructions with dialogue examples]

## Recovery Patterns
[Hints, disputes, timing]
```

---

## 4. State Management

### State Schema

```typescript
interface OnboardMeState {
  schemaVersion: number;        // For migrations
  
  repo: {
    id: string;                 // Unique repo identifier
    path: string;               // Absolute path
    name: string;               // Project name
  };
  
  player: {
    name: string;               // Player's name
    totalCommits: number;       // Score (XP equivalent)
    currentLives: number;       // 5 max, lose on incorrect
    startedAt: string;          // ISO timestamp
  };
  
  progress: {
    currentChapter: ChapterName;
    chaptersCompleted: string[];
    questionHistory: QuestionResult[];
  };
  
  monster: {
    currentMood: MoodType;      // dismissive → peaceful
    respectLevel: number;       // 0-100
    memorableExchanges: string[];
  };
  
  session: {
    conversationSummary: string;
    lastEmotionalBeat: string;
  };
  
  context: {
    prepared: boolean;
    preparedAt: string;
  };
  
  preferences: {
    monsterTone: ToneType;      // friendly → full-monster
  };
}
```

### State Manager Script

The agent executes `scripts/state-manager.cjs` for game state operations:

```bash
# Read current state
node <skill-path>/scripts/state-manager.cjs read

# Initialize new game
node <skill-path>/scripts/state-manager.cjs init '{"name":"project","path":"/path"}'

# Update state (deep merge)
node <skill-path>/scripts/state-manager.cjs write '{"player":{"totalCommits":5}}'

# Add question result (auto-increments commits and deducts lives on incorrect)
node <skill-path>/scripts/state-manager.cjs add-question '{"question":"...","answer":"...","tier":"deep","commits":3}'

# Update Monster mood based on answer tier
node <skill-path>/scripts/state-manager.cjs update-mood "correct"

# Reset all state
node <skill-path>/scripts/state-manager.cjs reset
```

### Knowledge Manager Script

The agent executes `scripts/knowledge-manager.cjs` for codebase knowledge:

```bash
# Read knowledge (returns null if not prepared)
node <skill-path>/scripts/knowledge-manager.cjs read

# Write knowledge (created during prepare)
node <skill-path>/scripts/knowledge-manager.cjs write '<repo-knowledge-json>'

# Append a player-validated discovery
node <skill-path>/scripts/knowledge-manager.cjs add-discovery '{"chapter":"investigation","fact":"...","tier":"deep","evidence":"..."}'
```

The knowledge file (`repo-knowledge.json`) is the Monster's private answer key — it contains codebase facts for validation and accumulates player-validated discoveries. See `context/agent/CONTEXT-GATHERING.md` for the full schema and strategy.

### State Behaviors

- **Auto-backup**: Before every write, copies state.json to state.backup.json
- **Auto-scoring**: `add-question` automatically increments `totalCommits` and deducts lives on incorrect answers
- **Schema versioning**: Tracks schemaVersion for future migrations
- **Deep merge**: Updates preserve existing fields
- **Graceful fallback**: Returns default state if file missing/corrupted

---

## 5. Gameplay Flow

### Command Flow: Prepare Game

```
User: "prepare game" / "setup onboarding"
                │
                ▼
┌───────────────────────────────────────┐
│ 1. Check if already prepared          │
│    - Read state.json                  │
│    - If prepared, ask: reset or cont? │
└───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│ 2. Analyze repository (8-12 files)    │
│    - Read manifest, README, configs   │
│    - Scan directory structure          │
│    - Extract identity, tech stack,    │
│      commands, env vars               │
└───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│ 3. Build knowledge file               │
│    - Construct repo-knowledge.json    │
│    - Save via knowledge-manager.cjs   │
│    - This is the Monster's answer key │
└───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│ 4. Initialize state                   │
│    - Run state-manager.cjs init       │
│    - Set context.prepared = true      │
└───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│ 5. Monster introduction               │
│    - Tease that it knows the codebase │
│    - DO NOT reveal specific findings  │
│    - Player discovers during gameplay │
└───────────────────────────────────────┘
```

### Command Flow: Play Game

```
User: "play game" / "let's go" / "/onboardme"
                │
                ▼
┌───────────────────────────────────────┐
│ 1. Load state                         │
│    - Run state-manager.cjs read       │
│    - Check context.prepared           │
└───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│ 2. Load knowledge (answer key)        │
│    - Run knowledge-manager.cjs read   │
│    - Review discoveries from prior    │
│      sessions for continuity          │
└───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│ 3. Load chapter reference             │
│    - Read current chapter file        │
│    - e.g., THE-INVESTIGATION.md       │
└───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│ 4. Activate Monster persona           │
│    - Voice patterns from SKILL.md     │
│    - Mood from state.monster          │
└───────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────┐
│ 5. Begin gameplay loop                │
│    - Challenge → Move → Eval → Next   │
│    - Validate against knowledge       │
│    - Save discoveries after answers   │
│    - Read live files for Ch 3-5       │
│    - Create/update artifacts          │
└───────────────────────────────────────┘
```

### Gameplay Loop

```
┌─────────────────────────────────────────────────────────────┐
│                      CHALLENGE                               │
│  Monster presents task/question in character                 │
│  "What type of project is this?"                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                         MOVE                                 │
│  Player responds with:                                       │
│  - Answer to question                                        │
│  - Request for hint                                          │
│  - Clarifying question                                       │
│  - Evidence they found                                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      EVALUATION                              │
│  Monster evaluates using rubric:                             │
│  - Incorrect: Wrong understanding                            │
│  - Partial: Right direction, missing details                 │
│  - Correct: Accurate identification                          │
│  - Deep: Shows architectural insight                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        REWARD                                │
│  - Award commits based on tier                               │
│  - Update Monster mood                                       │
│  - Update state.json                                         │
│  - Update artifact file                                      │
│  - Emotional beat (Monster reaction)                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                         NEXT                                 │
│  - Next challenge in current phase                           │
│  - OR transition to next phase                               │
│  - OR transition to next chapter                             │
│  - OR victory ending                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Runtime Files

### Directory Structure

Created in target repo during gameplay:

```
.onboardme/
├── state.json              # Game progress, score, mood
├── state.backup.json       # Auto-backup
├── context/
│   └── repo-knowledge.json # Monster's answer key + discoveries
└── artifacts/
    ├── CASE_FILE.md        # Chapter 1: Investigation log
    ├── FLOW_MAP.md         # Chapter 3: Architecture diagram
    ├── IMPACT_ANALYSIS.md  # Chapter 4: Bug fix analysis
    └── CODEBASE_KNOWLEDGE.md # Chapter 5: Final documentation
```

### state.json Example

```json
{
  "schemaVersion": 1,
  "repo": {
    "id": "onboardme-abc123",
    "path": "/Users/dev/project",
    "name": "my-api"
  },
  "player": {
    "name": "Developer",
    "totalCommits": 12,
    "currentLives": 4,
    "startedAt": "2026-02-05T10:30:00Z"
  },
  "progress": {
    "currentChapter": "investigation",
    "chaptersCompleted": [],
    "questionHistory": [
      {
        "question": "What type of project is this?",
        "answer": "Express API with PostgreSQL",
        "tier": "correct",
        "commits": 2,
        "timestamp": "2026-02-05T10:35:00Z"
      }
    ]
  },
  "monster": {
    "currentMood": "dismissive",
    "respectLevel": 15,
    "memorableExchanges": ["Correctly identified Prisma ORM"]
  },
  "session": {
    "conversationSummary": "Player completed Phase 1 of Investigation",
    "lastEmotionalBeat": "Grudging acceptance"
  },
  "context": {
    "prepared": true,
    "preparedAt": "2026-02-05T10:30:00Z"
  },
  "preferences": {
    "monsterTone": "balanced"
  }
}
```

### CASE_FILE.md Example

```markdown
# Case File: my-api

_Investigation by: Developer_
_Date opened: 2026-02-05T10:30:00Z_

---

## Evidence Log

### Finding #1: Project Type

**Question:** What type of project is this?
**Evidence:** package.json shows "express" dependency, src/routes/ folder
**Verdict:** ✅ CONFIRMED — Node.js Express API

_Monster Note: "They can read a package.json. Revolutionary."_

### Finding #2: Database

**Question:** What database does it use?
**Evidence:** prisma/schema.prisma shows PostgreSQL
**Verdict:** ✅ CONFIRMED — PostgreSQL with Prisma ORM

_Monster Note: "Finally, someone who looks beyond the README."_

---

## Case Status: 🔍 IN PROGRESS
```

---

## 7. Installation & Distribution

### User Installation

```bash
# Install OnboardMe skill
npx skills add yonatanai/onboardme

# This copies skills/onboardme/ to:
# .cursor/skills/onboardme/    (for Cursor)
# .claude/skills/onboardme/    (for Claude Code)
```

### Installed Location

```
.cursor/skills/onboardme/       # Or .claude/skills/
├── SKILL.md
├── scripts/
│   ├── state-manager.cjs
│   └── knowledge-manager.cjs
├── instructions/
│   └── *.md
└── references/
    └── THE-INVESTIGATION.md
```

### Agent Discovery

When user says "onboardme", "prepare game", or "/onboardme":
1. Agent searches skills directory for matching skill
2. Reads SKILL.md to understand character and commands
3. Activates Monster persona
4. Follows instructions for the invoked command

---

## 8. Design Documents

### Agent-Skills Design

| Document | Purpose |
|----------|---------|
| [context/agent/SKILL-CONTRACT.md](./agent/SKILL-CONTRACT.md) | Skill template with Goal/Inputs/Rubric/Recovery |
| [context/agent/STATE-SCHEMA.md](./agent/STATE-SCHEMA.md) | State schema with versioning and migrations |
| [context/agent/AGENT-AS-MONSTER.md](./agent/AGENT-AS-MONSTER.md) | Monster character embodiment |
| [context/agent/CONVERSATIONAL-GAMEPLAY.md](./agent/CONVERSATIONAL-GAMEPLAY.md) | Multi-turn investigation design |
| [context/agent/EDITOR-AS-UI.md](./agent/EDITOR-AS-UI.md) | Files as game boards |
| [context/agent/DYNAMIC-EXPERIENCE.md](./agent/DYNAMIC-EXPERIENCE.md) | Adaptive difficulty |
| [context/agent/SAFETY-RULES.md](./agent/SAFETY-RULES.md) | Agent behavioral boundaries |
| [context/agent/CONTEXT-GATHERING.md](./agent/CONTEXT-GATHERING.md) | Repo analysis strategy and knowledge schema |

### Chapter Design

| Document | Purpose |
|----------|---------|
| [context/chapters/01-THE-INVESTIGATION.md](./chapters/01-THE-INVESTIGATION.md) | Chapter 1 design |
| [context/chapters/02-THE-HANDS-ON.md](./chapters/02-THE-HANDS-ON.md) | Chapter 2 design |
| [context/chapters/03-THE-DEEP-DIVE.md](./chapters/03-THE-DEEP-DIVE.md) | Chapter 3 design |
| [context/chapters/04-THE-HUNT.md](./chapters/04-THE-HUNT.md) | Chapter 4 design |
| [context/chapters/05-THE-BOSS-BATTLE.md](./chapters/05-THE-BOSS-BATTLE.md) | Chapter 5 design |

### Narrative Design

| Document | Purpose |
|----------|---------|
| [context/narrative/MONSTER-VOICE.md](./narrative/MONSTER-VOICE.md) | Sound vocabulary, emotional states |
| [context/narrative/GAME-NARRATIVE.md](./narrative/GAME-NARRATIVE.md) | Story arc and themes |
| [context/narrative/COLD-OPEN.md](./narrative/COLD-OPEN.md) | Opening monologue |
| [context/narrative/PACING-GUIDE.md](./narrative/PACING-GUIDE.md) | Conversational rhythm |

---

---

*Document Version: 1.2*
*Last Updated: 2026-02-06*
*Status: All 5 chapters implemented, full game integration complete*
