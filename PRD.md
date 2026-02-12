# OnboardMe — Product Requirements Document

> **The best onboarding experience ever made.**

An agent skill that transforms codebase onboarding into a conversational game. The AI agent becomes the **Spaghetti Code Monster** — a sentient tangle of legacy code that guards the codebase and tests new developers through investigation challenges.

> **See [GAME-NARRATIVE.md](./context/narrative/GAME-NARRATIVE.md) for detailed creative direction and narrative arc.**

---

## Table of Contents

1. [Vision & Goals](#1-vision--goals)
2. [Target Users](#2-target-users)
3. [How It Works](#3-how-it-works)
4. [Game Design](#4-game-design)
5. [The 4 Chapters](#5-the-4-chapters)
6. [State & Artifacts](#6-state--artifacts)
7. [Monster Character](#7-monster-character)
8. [Installation & Distribution](#8-installation--distribution)
9. [Future Considerations](#9-future-considerations)

---

## 1. Vision & Goals

### The Problem

Traditional onboarding sucks:
- Static wiki pages that are outdated
- "Read the README" doesn't teach you *why*
- No way to verify understanding
- Boring, passive, forgettable
- Engineers skim instead of learning

### The Solution

**OnboardMe** turns onboarding into a conversational game where **the AI agent IS the game**:
- **Active exploration** instead of passive reading
- **Conversational challenges** that require real investigation
- **Immediate feedback** from a character who knows the codebase
- **Tangible artifacts** that document what you learn
- **A full character arc** from dismissive antagonist to documented friend

### Design Principles

1. **The agent IS the Monster** — Not a CLI rendering the Monster, the agent embodies it
2. **Conversational gameplay** — Open-ended investigation, not multiple-choice quizzes
3. **Editor as UI** — The codebase itself is the game board, with `@onboardme` trace comments as markers
4. **Real learning** — Questions require actual exploration, not just grep
5. **Local-first** — All state in `.onboardme/`, no accounts, no cloud
6. **Emotional architecture** — Deliberate pacing with character development
7. **Tangible artifacts** — Every chapter produces documentation

---

## 2. Target Users

### Primary User

**Individual software engineers** joining a new team who want to:
- Understand a new codebase quickly
- Learn *why* things are built the way they are
- Have verified knowledge, not just "I read it"
- Make onboarding less boring

### User Journey

```
1. Engineer joins new company
2. Clones the repo
3. Installs OnboardMe skill:
   npx skills add yoniaiz/onboardme
4. Opens Cursor/Claude Code
5. Tells agent: "prepare game" or "/onboardme"
   - Agent scans codebase, initializes state
   - Monster introduces itself
6. Tells agent: "play game"
   - Agent becomes the Monster
   - Conversational investigation begins
7. Plays through 4 chapters (~90-120 min)
   - Investigation, Deep Dive, Hunt, Boss Battle
   - Makes real discoveries about the codebase
   - Monster's attitude evolves based on performance
8. Defeats Monster by documenting it
9. Receives CERTIFICATE.md as proof of completion
10. Gets suggested first task based on demonstrated skills
```

### Non-Users (v1)

- Managers tracking team progress
- HR systems
- Enterprise deployments
- Teams wanting shared progress

---

## 3. How It Works

### Architecture: Agent as Game Engine

```
┌─────────────────────────────────────────────────────────────────────┐
│                     USER'S CODING AGENT                             │
│                 (Cursor / Claude Code / etc.)                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐ │
│   │                   OnboardMe Skill                             │ │
│   │                                                               │ │
│   │   The agent reads SKILL.md and BECOMES the Monster            │ │
│   │   - Persona, voice, dialogue patterns                         │ │
│   │   - Game rules and scoring rubrics                            │ │
│   │   - State management instructions                             │ │
│   │   - Chapter reference files                                   │ │
│   │                                                               │ │
│   └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     TARGET REPOSITORY                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   .onboardme/                                                       │
│   ├── state.json          # Progress, score, Monster mood           │
│   ├── state.backup.json   # Auto-backup before writes               │
│   └── artifacts/                                                    │
│       └── CERTIFICATE.md  # Chapter 4 certificate                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Commands

Users interact through natural language or slash commands:

| Command | Trigger Phrases | What Happens |
|---------|-----------------|--------------|
| **Prepare Game** | "prepare game", "setup onboarding" | Agent scans repo, initializes state, Monster introduces itself |
| **Play Game** | "play game", "let's go", "/onboardme" | Agent loads state, becomes Monster, begins/resumes gameplay |
| **Status** | "status", "how am I doing" | Agent shows progress, score, Monster mood |
| **Hint** | "hint", "help", "I'm stuck" | Progressive hints that cost commits |
| **Reset** | "reset game", "start over" | Clear state with confirmation |

### Gameplay Loop

Every interaction follows: **CHALLENGE → MOVE → EVALUATION → REWARD → NEXT**

1. **Challenge**: Monster presents a task or question
2. **Move**: Player investigates, answers, or asks for hints
3. **Evaluation**: Monster judges using tiered rubric (Incorrect/Partial/Correct/Deep)
4. **Reward**: Commits earned, Monster reacts, state updated
5. **Next**: Transition to next challenge or chapter

---

## 4. Game Design

### Narrative Framework

**Theme:** Technical Debt as a Living Entity

The game's central metaphor: **Technical debt is the real monster.** Every accumulated TODO, every "temporary" fix, every developer who left without documenting—they all merged into something that now guards the codebase.

**Core Elements:**
- The Spaghetti Code Monster as a sympathetic antagonist
- Developer-culture humor throughout
- Redemption arc: the Monster isn't destroyed, it's *documented*
- Real artifacts that persist as documentation

### Scoring System

| Tier | Criteria | Commits | Effect |
|------|----------|---------|--------|
| **Incorrect** | Wrong understanding | 0 | -1 life |
| **Partial** | Right direction, missing details | 1 | — |
| **Correct** | Accurate identification | 2 | — |
| **Deep** | Shows architectural insight | 3 | +respect |

**Economy:**
- **Commits** = Experience points (earned by correct answers)
- **Lives** = 5 (lose one per incorrect answer)
- **Hints** = Cost 1 commit each (progressive, 4 levels)

### Monster Mood System

The Monster's attitude evolves based on player performance:

| Mood | Trigger | Monster Behavior |
|------|---------|------------------|
| dismissive | Start of game | Brief, uninterested, clipped |
| annoyed | Player succeeds | More static, sharper |
| worried | Correct streak (3+) | Hesitant, growing tension |
| desperate | Near victory | CAPS, intense, rapid |
| peaceful | Victory | Soft static, gentle, acceptance |

---

## 5. The 4 Chapters

| Chapter | Duration | What Player Learns | Artifact |
|---------|----------|-------------------|----------|
| **1. The Investigation** | 20 min | Project type, tech stack, architecture | — |
| **2. The Deep Dive** | 30 min | Running the project, data flows, architecture patterns | `@onboardme` trace comments |
| **3. The Hunt** | 30 min | Debugging, finding bugs, impact analysis | Actual bug fix |
| **4. The Boss Battle** | 30-45 min | Synthesize all knowledge, face the Monster | `CERTIFICATE.md` |

### Chapter 1: The Investigation

**Goal:** Learn to identify project type, tech stack, and architecture by examining evidence.

**Flow:**
1. Phase 1: Project Identity (~5 min) — What language? What type? What framework?
2. Phase 2: Tech Stack Discovery (~7 min) — Database? Testing? Build tools?
3. Phase 3: Documentation Hunt (~5 min) — How to run? What env vars?
4. Phase 4: Final Deduction (~3 min) — Synthesize findings

**Skills learned:** Reading manifests, understanding folder structure, extracting facts from docs

### Chapter 2: The Deep Dive

**Goal:** Run the project, trace data flows, and understand architecture patterns.

**Flow:**
1. Phase 1: Boot Up — Get the project running locally (adapts to project type)
2. Phase 2: Live Trace — Trace a user action through the code, marking trail with `@onboardme` comments
3. Phase 3: Entity Relations — Map how data models connect
4. Phase 4: Test Stories — Extract business rules from test assertions

**Skills learned:** Local development setup, code navigation, architecture understanding, tracing flows

### Chapter 3: The Hunt

**Goal:** Find and fix real bugs in the codebase.

**Flow:**
1. Monster sabotages the code on the game branch
2. Player hunts for root cause using test failures
3. Player proposes and implements fix
4. Agent validates (runs tests)
5. Impact analysis — trace system dependencies

**Skills learned:** Debugging, test-driven development, impact analysis

### Chapter 4: The Boss Battle

**Goal:** Synthesize all knowledge, build a feature, document the Monster.

**Flow:**
1. Monster challenges player to build a real feature
2. Planning, building, code review, defense phases
3. Player demonstrates mastery
4. Victory: Monster is documented, not destroyed
5. Generate CERTIFICATE.md

**Skills learned:** Synthesis, documentation, complete codebase understanding

---

## 6. State & Artifacts

### State Schema

```typescript
interface OnboardMeState {
  schemaVersion: number;
  
  repo: {
    id: string;
    path: string;
    name: string;
  };
  
  player: {
    name: string;
    totalCommits: number;
    currentLives: number;
    startedAt: string;
  };
  
  progress: {
    currentChapter: "investigation" | "deep-dive" | "hunt" | "boss";
    chaptersCompleted: string[];
    questionHistory: QuestionResult[];
  };
  
  monster: {
    currentMood: "dismissive" | "annoyed" | "worried" | "desperate" | "peaceful";
    respectLevel: number;
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
    monsterTone: "friendly" | "balanced" | "spicy" | "full-monster";
  };
}
```

### Artifacts

Each chapter produces a tangible file:

| Artifact | Created | Contents |
|----------|---------|----------|
| `CERTIFICATE.md` | Chapter 4 (Boss Battle) | Certificate of Codebase Survival with rank, stats, and Monster commentary |

These artifacts are **real documentation** that can be committed as the player's first contribution.

---

## 7. Monster Character

### Core Traits

- **Defensive** — Built this codebase (or absorbed it), takes criticism personally
- **Knowledgeable** — Knows every dark corner, every hack, every "temporary" fix
- **Insecure** — Fears being understood, documented, replaced
- **Sympathetic** — Underneath the snark is a creature that just wants to be appreciated

### Voice

The Monster speaks through interference, static, and glitches:

```
*kzzzt*     — Appearing, transitioning
*whirrrr*  — Processing, thinking
*heh*      — Mocking laugh
*slrrrrp*  — Creepy presence
*crackle*  — Tension, emphasis
*tangle*   — Frustration, painful memories
*pause*    — Dramatic beat
*static spike* — Surprise, alarm
```

### Signature Lines

- "I'm not deprecated. I'm CLASSIC."
- "I AM this codebase."
- "Every bug was a feature once."
- "Go deeper. I dare you."
- "I never forget. Unlike the documentation."

### Victory Ending

```
*the static... softens*
*gentle hum*

"You... actually understand me."

*pause*

"Not just the surface. The WHY. The history."

*the tangled threads begin to unravel*

"I'm not defeated. I'm... documented."

*[DOCUMENTED]*
```

---

## 8. Installation & Distribution

### Installing the Skill

```bash
# Via npx (recommended)
npx skills add yoniaiz/onboardme

# This installs to:
# .cursor/skills/onboardme/   (for Cursor)
# .claude/skills/onboardme/   (for Claude Code)
```

### Skill File Structure

```
skills/onboardme/
├── SKILL.md                    # Main orchestrator (Monster persona, commands)
├── scripts/
│   ├── state-manager.cjs       # Game state persistence
│   └── knowledge-manager.cjs   # Codebase knowledge persistence
├── instructions/
│   ├── prepare-game.md         # Prepare command details
│   ├── play-game.md            # Play command details
│   ├── status.md               # Status command details
│   ├── hint.md                 # Hint system details
│   └── reset-game.md           # Reset command details
└── references/
    ├── THE-INVESTIGATION.md    # Chapter 1 full instructions
    ├── THE-HANDS-ON.md         # Chapter 2 full instructions
    ├── THE-DEEP-DIVE.md        # Chapter 3 full instructions
    ├── THE-HUNT.md             # Chapter 4 full instructions
    └── THE-BOSS-BATTLE.md      # Chapter 5 full instructions
```

### Runtime Files

Created in target repo during gameplay:

```
.onboardme/
├── state.json                  # Game progress, score, mood
├── state.backup.json           # Auto-backup
├── context/
│   └── repo-knowledge.json     # Monster's answer key + discoveries
└── artifacts/
    └── CERTIFICATE.md          # Chapter 4: Certificate of Codebase Survival
```

---

## 9. Future Considerations

*Not in v1, but worth designing for:*

### Potential Future Features

- **Team Mode**: Multiple engineers compete/collaborate
- **Leaderboards**: Team-based victory summaries
- **Custom Chapters**: Teams create their own challenges
- **Replay Mode**: Re-challenge the Monster with harder questions
- **Memory Logs**: Unlockable backstory fragments from git history

### Current Scope (v1.0)

The implemented version includes:
- ✅ Full Monster orchestrator skill with persona lock
- ✅ State management with persistence and auto-backup
- ✅ Knowledge management with answer key and discovery accumulation
- ✅ All 4 chapters: Investigation, Deep Dive, Hunt, Boss Battle
- ✅ All 6 commands (prepare, play, status, hint, reset, change tone)
- ✅ CERTIFICATE.md artifact
- ✅ Mood system and full emotional arc (dismissive → peaceful)
- ✅ Snark slider (friendly / balanced / spicy / full-monster)
- ✅ Memorable exchange logging
- ✅ Game-over and game-complete flows
- ✅ Session continuity across multiple conversations

---

## Document References

| Document | Purpose |
|----------|---------|
| [PROGRESS.md](./PROGRESS.md) | Current milestone and task tracking |
| [context/ARCHITECTURE.md](./context/ARCHITECTURE.md) | Technical architecture |
| [context/agent/](./context/agent/) | Agent-skills design documents |
| [context/chapters/](./context/chapters/) | Chapter design documents |
| [context/narrative/](./context/narrative/) | Narrative and character design |
| [skills/onboardme/SKILL.md](./skills/onboardme/SKILL.md) | The actual skill implementation |

---

*Document Version: 2.0*
*Last Updated: 2026-02-06*
*Status: v1.0 Complete — All 4 chapters playable*
