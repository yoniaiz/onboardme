# OnboardMe — Product Requirements Document

> **The best onboarding experience ever made.**

A gamified CLI tool that transforms codebase onboarding from reading static wikis into an interactive adventure. New engineers work through accumulated TODOs, solve challenges, and ultimately face "The Spaghetti Code Monster" — a boss born from the codebase's technical debt that can only be defeated through understanding.

> **See [GAME-NARRATIVE.md](./context/narrative/GAME-NARRATIVE.md) for detailed creative direction, boss design, dialogue, and narrative arc.**

---

## Table of Contents

1. [Vision & Goals](#1-vision--goals)
2. [Target Users](#2-target-users)
3. [Architecture](#3-architecture)
4. [Game Design](#4-game-design)
5. [Technical Specification](#5-technical-specification)
6. [CLI Commands](#6-cli-commands)
7. [File System Structure](#7-file-system-structure)
8. [Agent Framework Integration](#8-agent-framework-integration)
9. [Bootstrap: Context Gathering](#9-bootstrap-context-gathering)
10. [TODO & Challenge Specifications](#10-todo--challenge-specifications)
11. [FIXME Boss Battle Specification](#11-fixme-boss-battle-specification)
12. [State Management](#12-state-management)
13. [Question Design Principles](#13-question-design-principles)
14. [Open Questions](#14-open-questions)
15. [Future Considerations](#15-future-considerations)

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

**OnboardMe** turns onboarding into a text-based adventure game:
- **Active exploration** instead of passive reading
- **Progressive difficulty** that builds real understanding
- **Immediate feedback** on what you know vs. don't know
- **Knowledge unlocks** that persist as documentation
- **A final boss** that proves mastery

### Design Principles

1. **Fun but not childish** — Terminal aesthetic, computer-themed, professional tone
2. **Real learning** — Questions require actual exploration, not just grep
3. **AI-powered, not AI-dependent** — AI generates content, but game logic is deterministic
4. **Zero external dependencies** — Works with user's existing agent framework
5. **Local-first** — All state in filesystem, no accounts, no cloud
6. **Emotional architecture** — Deliberate pacing with valleys between peaks
7. **Player agency** — Two-way relationship through dialogue choices
8. **Discovery over exposition** — Backstory revealed through gameplay

---

## 2. Target Users

### Primary User

**Individual software engineers** joining a new team/company who want to:
- Understand a new codebase quickly
- Learn *why* things are built the way they are
- Have actual verified knowledge, not just "I read it"
- Make onboarding less boring

### User Journey

```
1. Engineer joins new company
2. Clones the repo
3. Runs: onboardme init
4. AI scans codebase, generates game content
5. Runs: onboardme start
6. Experiences cold open (Monster's first appearance)
7. Plays through 5 TODOs (~90-120 min)
   - Unlocks memory logs revealing Monster's backstory
   - Makes dialogue choices that shape relationship
   - Uses actual dev tools (grep, git blame) as weapons
8. Faces "The Spaghetti Code Monster" (FIXME boss battle)
9. Documents the Monster (victory = understanding, not destruction)
10. Receives shareable victory summary
11. Gets suggested first contribution based on learned areas
12. Commits CODEBASE_KNOWLEDGE.md as first real contribution
```

### Non-Users (v1)

- Managers tracking team progress
- HR systems
- Enterprise deployments
- Teams wanting shared progress

---

## 3. Architecture

> **See [ARCHITECTURE.md](./context/ARCHITECTURE.md) for complete architectural documentation.**

The OnboardMe system follows a modular architecture with clear separation between:
- **CLI Layer**: Terminal UI, game loop, state management
- **Agent Layer**: AI-powered code analysis and content generation
- **Storage Layer**: Local filesystem-based state and context

Key architectural principles:
- **Standalone CLI** for maximum portability
- **User's existing agent** for AI capabilities (no API keys needed)
- **Local-first** state management (no cloud, no accounts)
- **Deterministic game logic** with AI-powered content generation

---

## 4. Game Design

### Narrative Framework

**Theme:** Technical Debt as a Living Entity

The game's central metaphor: **Technical debt is the real monster.** Every accumulated TODO, every "temporary" fix, every developer who left without documenting—they all merged into something that now guards the codebase.

> **Full narrative details in [GAME-NARRATIVE.md](./context/narrative/GAME-NARRATIVE.md)**

**Core Elements:**
- TODOs instead of levels (completing the debt the Monster was born from)
- The Spaghetti Code Monster as a sympathetic antagonist
- Developer-culture humor throughout
- Redemption arc: the Monster isn't destroyed, it's *documented*

### Game Structure

The game consists of 5 TODOs (levels) followed by a final FIXME boss battle. Each TODO contains 2-3 sub-tasks (mini-games), and each sub-task has 5-10 challenges. The FIXME boss battle has 3 phases.

**Total: 8 games + boss battle (~90-120 minutes)**

> **See [Game Progression Diagram](./context/visuals/EXAMPLES.md#game-progression-diagram) for visual overview.**

### Key Experience Features

**Emotional Pacing:**
- **Cold open** — Atmospheric 17-second Monster introduction before gameplay
- **Quiet moments** — 2-5 second valleys after each TODO completion for emotional processing
- **Ambient presence** — Continuous subtle Monster sounds during active play
- **Loading as worldbuilding** — Atmospheric loading screens with Monster commentary

**Player Agency:**
- **Dialogue choices** — 4 key moments where players respond to Monster
- **Command-based questions** — Use actual dev tools (grep, git blame) as weapons
- **Personality tracking** — Monster reacts to player's behavior patterns

**Discovery & Learning:**
- **Memory logs** — 8 unlockable backstory fragments revealing Monster's origin
- **Spaced repetition** — Concepts revisited across TODOs for better retention
- **Behavioral reactions** — Monster comments on hint usage, speed, exploration depth

**Real-World Impact:**
- **Victory artifact** — Generate CODEBASE_KNOWLEDGE.md documenting everything learned
- **First contribution** — Option to create PR with documentation on Day 1
- **Task suggestion** — Post-game recommendation for first real task based on demonstrated skills
- **Shareable victory** — Victory card with stats for team channels

> **Complete feature specifications:** See [IMPROVEMENTS-SUMMARY.md](./IMPROVEMENTS-SUMMARY.md) for all implemented enhancements.

### Game Terminology

> **See [TERMINOLOGY.md](./context/narrative/TERMINOLOGY.md) for complete game terminology mapping.**

All game elements use code-themed naming (TODOs instead of levels, FIXME instead of boss, Commits instead of XP, etc.). The Monster appears after each TODO with evolving dialogue and reacts to player performance.

**Key Terminology Changes:**
- "Damage" → "Understanding" or "Documentation" (you're healing, not killing)
- "HP/Health" → "Technical Debt" (reduce to 0%, not deplete)
- "Kill the boss" → "Document the Monster" (aligns with sympathetic villain)

> **For complete Monster personality, dialogue, and appearance details, see [fixme-spaghetti-monster/GAME.md](./context/games/fixme-spaghetti-monster/GAME.md).**

---

## 5. Technical Specification

> **For technical architecture details, see [ARCHITECTURE.md](./context/ARCHITECTURE.md).**

### Tech Stack

- **Language**: TypeScript
- **CLI Framework**: Commander.js or Oclif
- **Terminal UI**: Ink (React for CLI)
- **Testing**: Vitest
- **Build**: tsup or esbuild

### Game Architecture

Games are modular, isolated, and extensible. Each game extends `BaseGame` and can be developed, tested, and run independently. See [ARCHITECTURE.md](./context/ARCHITECTURE.md) for the complete game template architecture, registry system, and testing approach.

---

## 5.5 Visual & Aesthetic Direction

> **The game should feel FUN. Not a training module with emojis—an actual game you'd want to play.**  
> **Game-specific visuals:** See individual `GAME-VISUALS.md` files in `context/games/` for visual design notes for each game.

The visual design follows four aesthetic pillars: **Retro-Futuristic**, **Juicy Feedback**, **Atmospheric**, and **Professional Fun**. The game uses terminal-based UI with ASCII art, animations, and a carefully designed color palette.

**Enhanced Visual Systems:**
- **Variable typing speeds** — Text speed reflects Monster's emotional state (5-100ms/char)
- **Glitch system** — Progressive visual corruption during boss battle
- **Loading screens** — Atmospheric worldbuilding with Monster commentary
- **Pacing valleys** — Visual quiet moments between intense challenges

> **Complete visual design documentation:** See [context/visuals/](./context/visuals/) for:
> - [Design Philosophy](./context/visuals/DESIGN-PHILOSOPHY.md) - Aesthetic pillars and design principles
> - [Typography](./context/visuals/TYPOGRAPHY.md) - Text art libraries and ASCII resources
> - [UI Components](./context/visuals/UI-COMPONENTS.md) - Boxes, progress bars, health bars, timers
> - [Animations](./context/visuals/ANIMATIONS.md) - Transitions, effects, damage flash
> - [Colors](./context/visuals/COLORS.md) - Color palette and theme
> - [Examples](./context/visuals/EXAMPLES.md) - Visual examples and sound effects
> - **[Loading Screens](./context/visuals/LOADING-SCREENS.md)** - Worldbuilding loading sequences
> - **[Victory Summary](./context/visuals/VICTORY-SUMMARY.md)** - Shareable victory card
> - **[Glitch System](./context/visuals/GLITCH-SYSTEM.md)** - Visual corruption effects

> **Technical specifications:**
> - **[Rendering Engine](./context/technical/RENDERING-ENGINE.md)** - Text animation and typing speeds
> - **[Behavioral Tracking](./context/technical/BEHAVIORAL-TRACKING.md)** - Player pattern detection

> **Library stack and implementation priority:** See [LIBRARIES.md](./context/technical/LIBRARIES.md).

---

## 6. CLI Commands

### Core Commands

```bash
onboardme init [--agent=cursor|claude|opencode]  # Initialize OnboardMe
onboardme start                                   # Start or resume the game
onboardme status                                  # Show current progress
onboardme knowledge [topic]                      # View unlocked knowledge
onboardme memories                                # View unlocked memory logs
onboardme reset [--hard]                         # Reset progress
onboardme config [key] [value]                    # Configuration
```

### Development/Debug Commands

```bash
onboardme game:test <game-id> [--verbose] [--fixture=<path>]  # Test a specific game
onboardme game:list                                            # List all registered games
onboardme game:preview <game-id>                              # Preview generated questions
onboardme regenerate [--level=<n>] [--game=<id>]              # Regenerate questions
onboardme debug:context                                        # Dump gathered context
onboardme debug:validate                                       # Validate all questions
```

> **Complete CLI command documentation:** See [CLI-COMMANDS.md](./context/technical/CLI-COMMANDS.md) for full command details, examples, and output formats.

---

## 7. File System Structure

> **See [ARCHITECTURE.md](./context/ARCHITECTURE.md#7-file-system-structure) for complete file system structure documentation.**

All game data is stored in `.onboarding/` at the repository root, organized into:
- **`context/`**: Gathered codebase knowledge (services, functions, flows, domain terms)
- **`todos/`**: Generated questions and challenges for each TODO level
- **`state/`**: User progress, history, and unlocked knowledge (gitignored)

---

## 8. Agent Framework Integration

> **See [ARCHITECTURE.md](./context/ARCHITECTURE.md#8-agent-framework-integration) for complete agent integration documentation.**

The CLI delegates AI tasks to the user's existing agent framework (Claude Code, Cursor CLI, or OpenCode). Users select their agent during `onboardme init`, and OnboardMe calls the agent's CLI under the hood.

**Supported Agents:**
- ✅ **Claude Code** (v1) - Primary support
- 🔜 **Cursor CLI** (v2) - Coming soon
- 🔜 **OpenCode** (v2) - Coming soon

The agent is used for:
- Codebase analysis during init
- Question generation
- Free-form answer evaluation
- Knowledge brief generation
- Boss battle question regeneration

---

## 9. Bootstrap: Context Gathering

> **See [ARCHITECTURE.md](./context/ARCHITECTURE.md#9-bootstrap-context-gathering) for complete context gathering documentation.**

During `onboardme init`, the system gathers comprehensive codebase context including:
- **Project metadata**: Language, framework, package manager
- **Services/modules**: Identified services with verified paths and dependencies
- **Data flows**: Traced request/response flows through the system
- **Domain knowledge**: Business terms, acronyms, configuration patterns
- **Monster origin**: Technical debt analysis (TODOs, complexity, legacy code)

All gathered information is **verified** against the actual codebase—paths must exist, functions must be locatable, and configs must be readable. Unverifiable data is marked as `uncertain` and excluded from questions.

---

## 10. TODO & Challenge Specifications

> **Note:** "Levels" are called "TODOs" and mini-games are called "sub-tasks" — see [Game Terminology](#game-terminology).

> **Detailed game specifications:** Each game has its own folder in `context/games/` with `GAME.md` (game details) and `GAME-VISUALS.md` (visual design).

### Game Flow Overview

```
TODO #0: // understand what we're building (~20 min)
├── docs --speedread       → Timed document fact hunt
├── file --detective       → Project investigation & deduction
└── connect --relations    → Relationship mapping puzzle

TODO #1: // experience what it does (~40 min)
├── npm start --challenge  → Run project, complete hands-on tasks
├── flow --trace           → Trace user journey through code layers
└── test --stories         → Learn behaviors from test documentation

TODO #2: // navigate and mark (~22 min)
├── grep --hunt            → Run failing tests, find & mark bugs
└── feature --locate       → Plan features, mark where code should go

FIXME: // the monster itself (~15 min)
└── The Spaghetti Monster  → [context/games/fixme-spaghetti-monster/](context/games/fixme-spaghetti-monster/)
```

> **Detailed game specifications:** Each game has its own folder in `context/games/` with `GAME.md` (game details) and `GAME-VISUALS.md` (visual design).

### TODO #0: `// understand what we're building`

**Goal:** Build mental map of the project - structure, tech stack, how pieces connect

**Sub-tasks:**
- `docs --speedread` - Timed hunt for facts in docs (README, package.json, etc.)
- `file --detective` - Investigate codebase to deduce project type and tech stack
- `connect --relations` - Map relationships between key building blocks

**Flow:** Players explore documentation and file structure, building foundational knowledge of what the project IS.

**See:** [context/games/todo-0-docs-speedread/](context/games/todo-0-docs-speedread/) | [context/games/todo-0-file-detective/](context/games/todo-0-file-detective/) | [context/games/todo-0-connect-relations/](context/games/todo-0-connect-relations/)

---

### TODO #1: `// experience what it does`

**Goal:** Learn what the product DOES - run it, trace flows, understand behaviors

**Sub-tasks:**
- `npm start --challenge` - Actually run the project and complete hands-on tasks
- `flow --trace` - Trace a user journey through code layers (breadcrumb trail)
- `test --stories` - Learn expected behaviors from test files (tests as documentation)

**Flow:** Players get hands-on experience running the project, tracing user flows, and discovering behaviors through tests.

**See:** [context/games/todo-1-npm-start-challenge/](context/games/todo-1-npm-start-challenge/) | [context/games/todo-1-flow-trace/](context/games/todo-1-flow-trace/) | [context/games/todo-1-test-stories/](context/games/todo-1-test-stories/)

---

### TODO #2: `// navigate and mark`

**Goal:** Learn to navigate, find bugs, and plan features using "mark in code" mechanics

**Sub-tasks:**
- `grep --hunt` - Run failing tests, hunt for bugs, mark location with `// ONBOARD:BUG`
- `feature --locate` - Given a feature request, mark where new code should go with `// ONBOARD:FEATURE`

**Flow:** Players learn practical debugging workflows and architectural thinking by marking actual locations in the codebase.

**See:** [context/games/todo-2-grep-hunt/](context/games/todo-2-grep-hunt/) | [context/games/todo-2-feature-locate/](context/games/todo-2-feature-locate/)

---

## 11. FIXME Boss Battle Specification

> **Full boss narrative and dialogue in [GAME-NARRATIVE.md](./context/narrative/GAME-NARRATIVE.md)**  
> **Detailed boss battle specification:** [context/games/fixme-spaghetti-monster/](context/games/fixme-spaghetti-monster/)

### The Spaghetti Code Monster

When all TODOs are complete, only one item remains: the FIXME boss battle.

> **See [Boss Battle Intro Screen](./context/visuals/EXAMPLES.md#boss-battle-intro-screen) for visual example.**

### Battle Flow Overview

**Three Phases:**
1. **THE LEGACY ONSLAUGHT** - Rapid-fire questions with hotfix mechanics
2. **THE DEPENDENCY TANGLE** - Interdependent questions mirroring codebase structure
3. **THE FINAL MERGE CONFLICT** - Resolve conflicting information, free-form evaluation

**Battle Mechanics:**
- **Technical Debt** starts at 100%, decreases with correct answers (not "damage" - you're documenting, not destroying)
- Player has 5 retries (shields)
- Understanding scales with speed and clean commit streaks
- Wrong answers cost retries; timeouts increase debt
- **Visual glitches** escalate as debt decreases (progressive corruption)
- **Monster becomes cleaner** as you document it (not more broken)

**Victory Ending:**
- Monster is **documented**, not destroyed (redemption arc)
- Generates **CODEBASE_KNOWLEDGE.md** artifact
- **Shareable victory summary** with stats and Monster's last words
- **Post-game task suggestion** for first real contribution
- Option to create PR with documentation

**See:** [context/games/fixme-spaghetti-monster/GAME.md](context/games/fixme-spaghetti-monster/GAME.md) for complete battle specification, mechanics, and endings.

---

## 12. State Management

The system tracks progress, history, unlocked documentation, behavioral patterns, and memory logs in local filesystem storage. All state is stored in `.onboarding/state/` (gitignored).

> **Complete state management documentation:** See [STATE-MANAGEMENT.md](./context/technical/STATE-MANAGEMENT.md) for:
> - Progress tracking interface
> - History/audit trail structure
> - Documentation log schema
> - **Behavioral tracking** (hint usage, speed, exploration, accuracy patterns)
> - **Memory log tracking** (unlocked backstory fragments)
> - **Player personality inference** (methodical, aggressive, balanced, struggling)

---

## 13. Question Design Principles

Questions must require **real exploration**, not just grep. They should be multi-hop (requiring 2+ files), contextual (understanding *why*), verifiable by AI, time-appropriate, and learning-oriented.

**Enhanced Question Types:**
- **Command-based questions** — Players run actual dev tools (grep, git blame, tests) as "weapons"
- **Spaced repetition** — Concepts revisited across TODOs for better retention
- **Learning spiral** — Each TODO builds on previous knowledge

> **Complete question design documentation:** See [QUESTION-DESIGN.md](./context/technical/QUESTION-DESIGN.md) for:
> - Anti-shortcut design principles
> - Good vs bad question examples
> - Question requirements
> - The teaching loop
> - **Command-based question specifications** (IDE as weapon mechanic)
> - **Learning spiral system** (spaced repetition)

---

## 14. Open Questions

### Architecture Questions

1. ~~**Agent invocation pattern:**~~ **DECIDED** — CLI calls agent CLI/SDK as subprocess. User selects agent during init, handles their own auth. Start with Claude Code only.

2. **Streaming responses:** Should AI responses stream in real-time during briefs/explanations? **DECIDED** — No, we will not have streaming responses.

3. **Offline mode:** Should there be a degraded mode without agent access? **DECIDED** — No, we will not have a degraded mode without agent access.

### Game Design Questions

1. **Hint system:** How many hints per game? Cost in points/time?

2. **Skip mechanic:** Can users skip questions? At what cost?

3. **Difficulty scaling:** Should questions adapt based on performance?

4. **Time limits:** Fixed per question, or per game total?

### Content Questions

1. **Minimum codebase size:** What's too small to be interesting?

2. **Multi-repo support:** Should it work across multiple repositories?

3. **Generated content review:** Should there be a way to preview/edit questions before playing?

---

## 15. Future Considerations

*Not in v1, but worth designing for:*

### Potential Future Features

- **Team mode:** Multiple engineers compete/collaborate
- **Custom games:** Teams add their own mini-games
- **Leaderboards:** Team-based victory summaries (already have individual shareable cards ✅)
- **Manager dashboard:** Track team onboarding progress
- **Integration with ticketing:** First ticket tied to onboarding (partially implemented via task suggestion ✅)
- **Replay mode:** Re-challenge the Monster with harder questions
- **Community content:** Share question packs between companies
- **Automatic file watcher:** Detect command execution for IDE-as-weapon questions
- **Slack/Discord integration:** Auto-post victory summaries to team channels

### Extensibility Points

Design the system to allow:
- New game types (plugin architecture)
- New agent backends
- Custom question templates
- Branded themes

---

## 16. Recent Improvements (2025-02-02)

Based on comprehensive Creative Director reviews, 16 major enhancements were implemented to transform the experience from "quiz with Monster skin" to "interactive thriller":

**Priority 0 (Critical):**
- ✅ Cold open introduction (atmospheric 17-second Monster reveal)
- ✅ Quiet moments / pacing valleys (2-5 second silence between peaks)
- ✅ Ambient Monster presence (continuous subtle sounds)
- ✅ Loading screens as worldbuilding (Monster commentary)

**Priority 1 (High Impact):**
- ✅ IDE as weapon mechanic (command-based questions)
- ✅ Reframe damage as healing/refactoring (sympathetic villain)
- ✅ Learning spiral / spaced repetition (concept reinforcement)
- ✅ Player dialogue choices (4 key relationship moments)
- ✅ Shareable victory summary (social proof)
- ✅ Post-game task suggestion (bridge to real work)

**Priority 2 (Polish):**
- ✅ Variable typing speeds (emotional text rendering)
- ✅ Visual glitch system (progressive corruption)
- ✅ Behavioral tracking (reactive Monster)
- ✅ Hint usage reactions (social pressure)
- ✅ Memory logs / corrupted memories (discoverable backstory)
- ✅ Real artifact: CODEBASE_KNOWLEDGE.md (first contribution)

> **Complete improvement documentation:** See [IMPROVEMENTS-SUMMARY.md](./IMPROVEMENTS-SUMMARY.md)

**New Design Documents (9):**
- [COLD-OPEN.md](./context/narrative/COLD-OPEN.md)
- [PACING-GUIDE.md](./context/narrative/PACING-GUIDE.md)
- [PLAYER-CHOICES.md](./context/narrative/PLAYER-CHOICES.md)
- [MEMORY-LOGS.md](./context/narrative/MEMORY-LOGS.md)
- [LOADING-SCREENS.md](./context/visuals/LOADING-SCREENS.md)
- [VICTORY-SUMMARY.md](./context/visuals/VICTORY-SUMMARY.md)
- [GLITCH-SYSTEM.md](./context/visuals/GLITCH-SYSTEM.md)
- [RENDERING-ENGINE.md](./context/technical/RENDERING-ENGINE.md)
- [BEHAVIORAL-TRACKING.md](./context/technical/BEHAVIORAL-TRACKING.md)

---

*Document Version: 0.2*
*Last Updated: 2025-02-02*
*Status: Design Complete - Ready for Implementation*
