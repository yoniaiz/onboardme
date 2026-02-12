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

OnboardMe uses a **script-driven game engine** architecture where the state-manager script is the authoritative source of truth for game flow, and the AI agent follows its instructions.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CODING AGENT PLATFORM                           │
│                 (Cursor / Claude Code / Codex)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Agent reads SKILL.md → becomes the Spaghetti Code Monster         │
│   Agent calls state-manager.cjs → gets instructions for each phase  │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  SKILL.md (persistent, survives compaction)                  │  │
│   │  - Monster persona and voice                                 │  │
│   │  - "How To Play" — resume, complete-step, hint               │  │
│   │  - Scoring rubric and gameplay loop                          │  │
│   │  - Character lock, safety rules                              │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                            │                                        │
│                            ▼                                        │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  scripts/state-manager.cjs — THE GAME ENGINE                 │  │
│   │  - resume: returns current phase instruction + rules + score │  │
│   │  - complete-step: records results, advances, returns next    │  │
│   │  - hint: deducts commit, returns current phase               │  │
│   │  - Game flow defined in scripts/chapters/*.cjs               │  │
│   │  - Persists to .onboardme/state.json                         │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                            │                                        │
│                            ▼                                        │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  scripts/knowledge-manager.cjs                               │  │
│   │  - Agent reads codebase knowledge (answer key)               │  │
│   │  - Discoveries saved by complete-step automatically          │  │
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
│   ├── state.json           # Game progress (step, score, mood)      │
│   ├── context/                                                      │
│   │   └── repo-knowledge.json  # Monster's codebase answer key      │
│   └── artifacts/                                                    │
│       └── CERTIFICATE.md   # End-of-game certificate                │
│                                                                     │
│   [Rest of codebase - read by agent during gameplay]                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Game Engine** | Script-driven state machine | Script returns exact instructions; survives context compaction |
| **Agent Commands** | 2 primary (resume, complete-step) | Minimal surface area = agent can't forget commands |
| **Game Flow** | JSON in chapter files | Structured, maintainable, per-chapter separation |
| **State Persistence** | JSON files | Simple, portable, human-readable |
| **Scripts** | Plain JavaScript (.cjs) | No build step; agents execute directly |
| **Artifacts** | Markdown files | Readable, committable, useful documentation |

### Why Script-Driven?

The original design had the agent read markdown chapter files and interpret rules. This broke after Cursor's context compaction — the agent would forget phase order, skip commands, and ignore checklists.

The script-driven approach solves this:
- **Two commands**: Agent only needs to remember `resume` and `complete-step`
- **Script as oracle**: Every command returns exactly what to do next
- **Rules returned inline**: Chapter-specific rules come with each phase instruction
- **No interpretation needed**: The agent follows output, not markdown rules

---

## 3. Skill File Structure

### Distribution Repository

```
skills/onboardme/
├── SKILL.md                      # Monster persona, How To Play, scoring
├── scripts/
│   ├── state-manager.cjs         # Game engine (resume, complete-step, etc.)
│   ├── game-data.cjs             # Combines chapter data into flat lookups
│   ├── knowledge-manager.cjs     # Codebase knowledge persistence
│   └── chapters/                 # Game content (one file per chapter)
│       ├── investigation.cjs     # Ch1: project identity, stack, docs
│       ├── deep-dive.cjs         # Ch2: bootup, trace, entities, tests
│       ├── hunt.cjs              # Ch3: sabotage, diagnosis, impact
│       └── boss.cjs              # Ch4: challenge, plan, build, review, defense
├── instructions/
│   ├── prepare-game.md           # Repo analysis + knowledge building
│   ├── play-game.md              # Run resume, follow output
│   ├── status.md                 # Run resume for status
│   ├── hint.md                   # Run hint command
│   └── reset-game.md             # Reset instructions
└── references/                   # (empty — content moved to chapters/*.cjs)
```

### Game Data Architecture

```
chapters/investigation.cjs ─┐
chapters/deep-dive.cjs ─────┤
chapters/hunt.cjs ───────────┼──▶ game-data.cjs ──▶ state-manager.cjs
chapters/boss.cjs ───────────┘        │
                                      ├── GAME_FLOW (16 ordered step IDs)
                                      ├── PHASES (instruction/scoring/tips per step)
                                      └── CHAPTERS (name/number/rules/ceremony data)
```

Each chapter file exports:
- `name`, `number` — chapter metadata
- `moodRange` — mood boundaries for the chapter
- `memoryLog` — Monster backstory fragment for ceremonies
- `rules` — critical rules returned to agent with every phase
- `phases[]` — ordered array of phase definitions (id, instruction, scoring, tips)

---

## 4. State Management

### State Schema (v2)

Progress is tracked by a single `currentStep` index into the 16-step `GAME_FLOW` array. See `context/agent/STATE-SCHEMA.md` for the full schema.

### Commands

| Command | Purpose | Returns |
|---------|---------|---------|
| `resume` | Where am I? What should I do? | Phase instruction + rules + score |
| `complete-step` | Phase done, here are results | Next phase, ceremony, or game-complete |
| `hint` | Player asked for help | Score after -1 commit |
| `read` / `write` | Raw state access | State JSON |
| `init` | Initialize new game | Default state |
| `reset` | Delete all state | Success message |
| `sabotage` | Apply code sabotage (Ch3) | File + commit result |
| `generate-certificate` | End-of-game certificate data | Rank + stats + per-chapter |

### Knowledge Manager

```bash
node <skill-path>/scripts/knowledge-manager.cjs read    # Get answer key
node <skill-path>/scripts/knowledge-manager.cjs write    # Create answer key (prepare)
```

Discoveries are saved automatically by `complete-step` when passed in the `discoveries` array.

---

## 5. Gameplay Flow

### Two-Command Game Loop

```
                    ┌──────────────────────────────────┐
                    │                                    │
                    ▼                                    │
             ┌──────────┐                               │
             │  resume   │ ─── prepare? ──▶ prepare-game │
             └────┬─────┘                               │
                  │ play                                 │
                  ▼                                      │
         ┌────────────────┐                              │
         │ Follow phase   │                              │
         │ instruction    │                              │
         └───────┬────────┘                              │
                 │ phase done                            │
                 ▼                                       │
         ┌───────────────┐                               │
         │ complete-step  │                              │
         └───────┬───────┘                               │
                 │                                       │
          ┌──────┼──────┐                                │
          │      │      │                                │
     next-phase  │  chapter-complete                     │
          │      │      │                                │
          │      │      ▼                                │
          │      │  ceremony + wait ──────────────────────┘
          │      │
          │   game-complete
          │      │
          ▼      ▼
     (continue) (certificate + farewell)
```

---

## 6. Runtime Files

### Directory Structure

Created in target repo during gameplay:

```
.onboardme/
├── state.json              # Game progress, score, mood
├── context/
│   └── repo-knowledge.json # Monster's answer key + discoveries
└── artifacts/
    └── CERTIFICATE.md      # End-of-game certificate
```

---

## 7. Installation & Distribution

### User Installation

```bash
npx skills add yoniaiz/onboardme
```

### Installed Location

```
.cursor/skills/onboardme/       # Or .claude/skills/
├── SKILL.md
├── scripts/
│   ├── state-manager.cjs
│   ├── game-data.cjs
│   ├── knowledge-manager.cjs
│   └── chapters/
│       ├── investigation.cjs
│       ├── deep-dive.cjs
│       ├── hunt.cjs
│       └── boss.cjs
├── instructions/
│   └── *.md
└── references/                 # (empty)
```

---

## 8. Design Documents

### Agent-Skills Design

| Document | Purpose |
|----------|---------|
| [context/agent/SKILL-CONTRACT.md](./agent/SKILL-CONTRACT.md) | Skill template with Goal/Inputs/Rubric/Recovery |
| [context/agent/STATE-SCHEMA.md](./agent/STATE-SCHEMA.md) | State schema v2 with step-based progression |
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
| [context/chapters/03-THE-DEEP-DIVE.md](./chapters/03-THE-DEEP-DIVE.md) | Chapter 2 design |
| [context/chapters/04-THE-HUNT.md](./chapters/04-THE-HUNT.md) | Chapter 3 design |
| [context/chapters/05-THE-BOSS-BATTLE.md](./chapters/05-THE-BOSS-BATTLE.md) | Chapter 4 design |

### Narrative Design

| Document | Purpose |
|----------|---------|
| [context/narrative/MONSTER-VOICE.md](./narrative/MONSTER-VOICE.md) | Sound vocabulary, emotional states |
| [context/narrative/GAME-NARRATIVE.md](./narrative/GAME-NARRATIVE.md) | Story arc and themes |
| [context/narrative/COLD-OPEN.md](./narrative/COLD-OPEN.md) | Opening monologue |
| [context/narrative/PACING-GUIDE.md](./narrative/PACING-GUIDE.md) | Conversational rhythm |

---

*Document Version: 2.0*
*Last Updated: 2026-02-12*
*Status: Script-driven game engine — 4 chapters, 16 phases*
