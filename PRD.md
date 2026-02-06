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
5. [The 5 Chapters](#5-the-5-chapters)
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
3. **Editor as UI** — Files serve as game boards (CASE_FILE.md, FLOW_MAP.md)
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
   npx skills add yonatanai/onboardme
4. Opens Cursor/Claude Code
5. Tells agent: "prepare game" or "/onboardme"
   - Agent scans codebase, initializes state
   - Monster introduces itself
6. Tells agent: "play game"
   - Agent becomes the Monster
   - Conversational investigation begins
7. Plays through 5 chapters (~90-120 min)
   - Investigation, Hands-On, Deep Dive, Hunt, Boss Battle
   - Makes real discoveries about the codebase
   - Monster's attitude evolves based on performance
8. Defeats Monster by documenting it
9. Receives CODEBASE_KNOWLEDGE.md as first contribution
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
│       ├── CASE_FILE.md    # Chapter 1 investigation log             │
│       ├── FLOW_MAP.md     # Chapter 3 architecture diagram          │
│       └── ...             # One artifact per chapter                │
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

## 5. The 5 Chapters

| Chapter | Duration | What Player Learns | Artifact |
|---------|----------|-------------------|----------|
| **1. The Investigation** | 20 min | Project type, tech stack, architecture | `CASE_FILE.md` |
| **2. The Hands-On** | 15 min | How to run project, setup, env | Running project |
| **3. The Deep Dive** | 25 min | Data flows, architecture patterns | `FLOW_MAP.md` |
| **4. The Hunt** | 30 min | Debugging, finding bugs, impact analysis | `IMPACT_ANALYSIS.md` + actual bug fix |
| **5. The Boss Battle** | 15 min | Synthesize all knowledge, face the Monster | `CODEBASE_KNOWLEDGE.md` |

### Chapter 1: The Investigation

**Goal:** Learn to identify project type, tech stack, and architecture by examining evidence.

**Flow:**
1. Monster creates CASE_FILE.md artifact
2. Phase 1: Project Identity (~5 min) — What language? What type? What framework?
3. Phase 2: Tech Stack Discovery (~7 min) — Database? Testing? Build tools?
4. Phase 3: Documentation Hunt (~5 min) — How to run? What env vars?
5. Phase 4: Final Deduction (~3 min) — Synthesize findings

**Skills learned:** Reading manifests, understanding folder structure, extracting facts from docs

### Chapter 2: The Hands-On

**Goal:** Actually run the project, understand setup requirements.

**Flow:**
1. Monster guides through setup
2. Player runs actual commands
3. Monster reacts to errors (in character)
4. Success = project running locally

**Skills learned:** Local development setup, debugging environment issues

### Chapter 3: The Deep Dive

**Goal:** Trace data flows and understand architecture patterns.

**Flow:**
1. Monster presents a user journey to trace
2. Player follows code path through layers
3. Build FLOW_MAP.md collaboratively
4. Identify patterns (MVC, repository, etc.)

**Skills learned:** Code navigation, understanding architecture, tracing flows

### Chapter 4: The Hunt

**Goal:** Find and fix real bugs in the codebase.

**Flow:**
1. Monster reveals failing tests or bugs
2. Player hunts for root cause
3. Player proposes fix
4. Agent validates (runs tests)
5. Create IMPACT_ANALYSIS.md

**Skills learned:** Debugging, test-driven development, impact analysis

### Chapter 5: The Boss Battle

**Goal:** Synthesize all knowledge, document the Monster.

**Flow:**
1. Monster challenges player's complete understanding
2. Three phases of increasing difficulty
3. Player demonstrates mastery
4. Victory: Monster is documented, not destroyed
5. Generate CODEBASE_KNOWLEDGE.md

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
    currentChapter: "investigation" | "hands-on" | "deep-dive" | "hunt" | "boss";
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
| `CASE_FILE.md` | Chapter 1 | Investigation evidence log with Monster stamps |
| `FLOW_MAP.md` | Chapter 3 | Mermaid diagrams of data flows |
| `IMPACT_ANALYSIS.md` | Chapter 4 | Bug fix impact assessment |
| `CODEBASE_KNOWLEDGE.md` | Chapter 5 | Complete documentation of the codebase |

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
npx skills add yonatanai/onboardme

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
    ├── CASE_FILE.md            # Chapter 1 artifact
    ├── FLOW_MAP.md             # Chapter 3 artifact
    ├── IMPACT_ANALYSIS.md      # Chapter 4 artifact
    └── CODEBASE_KNOWLEDGE.md   # Chapter 5 artifact
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
- ✅ All 5 chapters: Investigation, Hands-On, Deep Dive, Hunt, Boss Battle
- ✅ All 6 commands (prepare, play, status, hint, reset, change tone)
- ✅ All artifacts: CASE_FILE.md, FLOW_MAP.md, IMPACT_ANALYSIS.md, CODEBASE_KNOWLEDGE.md
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
*Status: v1.0 Complete — All 5 chapters playable*
