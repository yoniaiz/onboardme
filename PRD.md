# OnboardMe — Product Requirements Document

> **The best onboarding experience ever made.**

A gamified CLI tool that transforms codebase onboarding from reading static wikis into an interactive adventure. New engineers work through accumulated TODOs, solve challenges, and ultimately face "The Spaghetti Code Monster" — a boss born from the codebase's technical debt that can only be defeated through understanding.

> **See [GAME_NARRATIVE.md](./GAME_NARRATIVE.md) for detailed creative direction, boss design, dialogue, and narrative arc.**

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
6. Plays through 5 levels + boss
7. Faces "The Spaghetti Code Monster" (FIXME)
8. Has comprehensive understanding of codebase
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

> **Full narrative details in [GAME_NARRATIVE.md](./GAME_NARRATIVE.md)**

**Core Elements:**
- TODOs instead of levels (completing the debt the Monster was born from)
- The Spaghetti Code Monster as a sympathetic antagonist
- Developer-culture humor throughout
- Redemption arc: the Monster isn't destroyed, it's *documented*

### Game Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        GAME PROGRESSION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TODO #1: // understand what we have       ──► Discovery       │
│  TODO #2: // figure out how to find things ──► Navigation      │
│  TODO #3: // trace data flows (URGENT)     ──► Understanding   │
│  TODO #4: // document why this works       ──► Business Logic  │
│  TODO #5: // learn how to deploy safely    ──► Operations      │
│  FIXME:   // the monster itself            ──► Final Battle    │
│                                                                 │
│  Each TODO: 2 sub-tasks (mini-games)                           │
│  Each sub-task: 5-10 challenges                                │
│  FIXME: 3 phases                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Game Terminology

All game elements use code-themed naming:

| Generic Term | Code-Themed Term | Context |
|--------------|-----------------|---------|
| Levels | **TODOs** | Main progression stages |
| Boss | **FIXME** | Final confrontation |
| Mini-games | **Sub-tasks** | Challenges within TODOs |
| XP | **Commits** | Progress/points earned |
| Lives/Shields | **Retries** | Remaining attempts |
| Hints | **Stack Overflow** | Help system |
| Knowledge unlocks | **Documentation** | Learning rewards |
| Achievements | **Merged PRs** | Milestones/badges |
| Game over | **Segfault** | Failure state |
| Victory | **Deployed** | Success state |
| Health bar | **Integrity** | Monster's health |
| Streak | **Clean commits** | Consecutive correct answers |

### The Spaghetti Code Monster

The Monster is dynamically generated based on actual codebase analysis:

```typescript
interface MonsterOrigin {
  birthYear: number;          // Oldest file creation date
  todoCount: number;          // Actual TODO count in codebase
  oldestTodo: string;         // Most ancient TODO still in code
  longestFunction: {
    name: string;
    lines: number;
    file: string;
  };
  deepestNesting: number;     // Max nesting level found
  circularDeps: number;       // Circular dependencies detected
  magicNumbers: number;       // Hardcoded values without explanation
}
```

**Example Generated Intro:**
```
Born from:
  • 234 TODO comments (oldest: "// TODO: fix this - Jake, 2019")
  • The legendary processPayment() function (1,847 lines)
  • 7 circular dependencies in src/services/
  • That one file everyone's afraid to touch: legacy-auth-handler.js
```

### Monster Personality

The Monster has a **tragic backstory** — it was once clean code, corrupted by shortcuts and abandonment:

| Trait | Description | Example Dialogue |
|-------|-------------|------------------|
| **Defensive** | Guards code secrets | "Nobody needs to know why that timeout is 3847ms" |
| **Nostalgic** | Remembers clean days | "I was beautiful once. Single-responsibility." |
| **Bitter** | Abandoned by devs | "The architect said she'd refactor me. She's a VP at Google now." |
| **Dramatic** | Over-the-top reactions | "You traced the DATA FLOW?! THROUGH ALL SEVEN SERVICES?!" |
| **Vulnerable** | Shows weakness | "If you defeat me, who will guard the sacred constants?" |
| **Self-aware** | Knows it's a mess | "I'm not deprecated, I'm CLASSIC." |

### Monster Appearances Throughout Game

The Monster appears **after every TODO** with evolving dialogue:

| After TODO | Monster Mood | Sample Dialogue |
|------------|--------------|-----------------|
| TODO #1 | Dismissive | "You completed a TODO? AN ACTUAL TODO? That's been there longer than some of your coworkers." |
| TODO #2 | Mocking | "You can grep. Impressive. My grandma's bash script can grep." |
| TODO #3 | Worried | "You traced that flow. The WHOLE flow. ...How did you—nobody's done that since the architect left." |
| TODO #4 | Existential | "If you defeat me, who will guard the sacred constants? WHO WILL REMEMBER WHY THE TIMEOUT IS 3847ms?" |
| TODO #5 | Desperate | "We can coexist. I'll only break on Fridays. Please. I don't want to fight you." |

### Performance-Based Reactions

**If player aced it (90%+):**
```
"...No bugs? No Stack Overflow? Are you sure you didn't just read
 the source code of my questions? Because that would be
 very on-brand for an engineer, actually."
```

**If player struggled (60-70%):**
```
"You passed. With the grace of a force push to main on a Friday.
 But hey, the tests are green. Technically."
```

**If player used many hints:**
```
"I see you've adopted the sacred tradition of Stack Overflow.
 Copy-paste your way to victory. Classic."
```

### Watching Indicators

Subtle reminders the Monster is present during gameplay:

```
"I've seen faster type inference..." — The Monster
"Even my deprecated methods work faster." — The Monster
"This is giving 'undefined is not a function' energy." — The Monster
```

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

### Design Philosophy

```
┌─────────────────────────────────────────────────────────────────┐
│                    AESTHETIC PILLARS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. RETRO-FUTURISTIC                                           │
│     • Classic terminal vibes meets modern polish               │
│     • Think: Fallout terminals, 80s hacker movies              │
│     • ASCII art that feels intentional, not lazy               │
│                                                                 │
│  2. JUICY FEEDBACK                                             │
│     • Every action has visual/audio response                   │
│     • Correct answers feel GOOD (animations, sounds)           │
│     • Streak multipliers have escalating effects               │
│                                                                 │
│  3. ATMOSPHERIC                                                │
│     • The Monster feels like a real presence                   │
│     • Levels have distinct visual themes                       │
│     • Progress feels like a journey                            │
│                                                                 │
│  4. PROFESSIONAL FUN                                           │
│     • Cool, not cute                                           │
│     • Clever, not cheesy                                       │
│     • Satisfying, not distracting                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Recommended Library Stack

#### Core UI Framework

| Library | Use Case | Why |
|---------|----------|-----|
| **Ink** | Main UI framework | React patterns, flexbox layout, used by Claude Code |
| **ink-blit** | Game-specific helpers | Hooks for game loops, sprites |

**Ink** is the clear winner—it's battle-tested (Claude Code, GitHub Copilot CLI, Wrangler all use it), has React patterns developers know, and handles layout beautifully.

#### Text Art & Typography

| Library | Use Case | Example |
|---------|----------|---------|
| **figlet** | Big ASCII text titles | `LEVEL UP!`, `GUARDIAN`, etc. |
| **gradient-string** | Rainbow/gradient text | Title screens, victory messages |
| **chalk** | Basic colors | All text styling |
| **chalk-animation** | Animated text effects | `rainbow`, `pulse`, `glitch`, `neon` |
| **ascii-art** | Image to ASCII conversion | Monster sprites from images |

#### ASCII Art Resources & Tools

| Resource | URL | Use |
|----------|-----|-----|
| **REXPaint** | gridsagegames.com/rexpaint | Professional ASCII art editor for roguelikes |
| **ASCII Art Archive** | asciiart.eu | Large collection of monsters, dragons, creatures |
| **ascii.co.uk** | ascii.co.uk/art | Detailed dragon/demon designs |
| **terminal-kit** | npm: terminal-kit | Sprites, animations, screen buffers |
| **terminal-game-io** | npm: terminal-game-io | Simple ASCII game frame handling |

#### Monster Design Direction

The Spaghetti Code Monster should be designed using proper ASCII art tools (REXPaint) or sourced/adapted from existing art. Key considerations:
- Use **block characters** (█ ▓ ░) for shading and depth
- Consider **ANSI colors** for dramatic effect (glowing eyes, damage states)
- Design **multiple frames** for animation (idle, angry, damaged, documented)
- Reference roguelike games (Dwarf Fortress, NetHack, DCSS) for creature design language
- The Monster should feel **tangled and tragic**, not evil
- Visual degradation should show code "untangling" as it takes damage

**Example: Title Screen**
```typescript
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';

// Big gradient title
const title = figlet.textSync('ONBOARDME', { font: 'ANSI Shadow' });
console.log(gradient.pastel.multiline(title));

// Animated subtitle
const rainbow = chalkAnimation.rainbow('The Quest Begins...');
setTimeout(() => rainbow.stop(), 2000);
```

#### Boxes & Frames

| Library | Use Case |
|---------|----------|
| **boxen** | Simple boxed text |
| **cli-table3** | Data tables |
| **Custom box-drawing** | Game frames (see below) |

**Custom Box Characters for Game Feel:**
```
Single line:  ┌ ─ ┐ │ └ ┘
Double line:  ╔ ═ ╗ ║ ╚ ╝
Rounded:      ╭ ─ ╮ │ ╰ ╯
Heavy:        ┏ ━ ┓ ┃ ┗ ┛
Mixed:        ╓ ─ ╖ ║ ╙ ╜
```

#### Animations & Effects

| Library | Use Case |
|---------|----------|
| **terminal-canvas** | Advanced animations, canvas-like API |
| **ora** | Spinners during loading |
| **cli-spinners** | More spinner styles |
| **log-update** | Updating single line (timers, progress) |

**Animation Ideas:**
- Health bar depleting with smooth animation
- XP counter rolling up like a slot machine
- Screen shake on wrong answer (shift text briefly)
- Typewriter effect for Monster dialogue
- Glitch effect when boss takes damage

#### Sound Effects (Optional)

| Library | Use Case |
|---------|----------|
| **beeper** | System beeps (cross-platform) |
| **cli-sound** | Play actual audio files (MP3) |

**Sound Moments:**
- Correct answer: Short victory beep
- Wrong answer: Error tone
- Streak milestone: Escalating tones
- Boss phase change: Dramatic sound
- Victory: Celebration melody

```typescript
import beeper from 'beeper';

// Victory beep pattern
await beeper('*-*-***'); // short-short-long celebration

// Error
await beeper('*'); // single sad beep
```

### Visual Examples

#### Title Screen
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   ░█████╗░███╗░░██╗██████╗░░█████╗░░█████╗░██████╗░██████╗░       ║
║   ██╔══██╗████╗░██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗       ║
║   ██║░░██║██╔██╗██║██████╦╝██║░░██║███████║██████╔╝██║░░██║       ║
║   ██║░░██║██║╚████║██╔══██╗██║░░██║██╔══██║██╔══██╗██║░░██║       ║
║   ╚█████╔╝██║░╚███║██████╦╝╚█████╔╝██║░░██║██║░░██║██████╔╝       ║
║   ░╚════╝░╚═╝░░╚══╝╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░       ║
║                                                                   ║
║                    ══════════════════════                        ║
║                       THE QUEST BEGINS                           ║
║                    ══════════════════════                        ║
║                                                                   ║
║                        ▼ PRESS ENTER ▼                           ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

#### Victory Animation
```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║    ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★     ║
║                                                                   ║
║     ██╗   ██╗██╗ ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗      ║
║     ██║   ██║██║██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝      ║
║     ██║   ██║██║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝       ║
║     ╚██╗ ██╔╝██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝        ║
║      ╚████╔╝ ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║         ║
║       ╚═══╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝         ║
║                                                                   ║
║    ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★     ║
║                                                                   ║
║                 THE GUARDIAN HAS BEEN DEFEATED                   ║
║                                                                   ║
║                    You are now a true                            ║
║                   CODEBASE MASTER                                ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

#### Streak Indicator Evolution
```
No streak:     ○ ○ ○ ○ ○
Streak 1:      ● ○ ○ ○ ○
Streak 3:      ● ● ● ○ ○  "Nice!"
Streak 5:      🔥 🔥 🔥 🔥 🔥  "ON FIRE!"
Streak 7+:     💀 💀 💀 💀 💀 💀 💀  "UNSTOPPABLE!"

(Or ASCII-only version)
Streak 5:      [*] [*] [*] [*] [*]  BLAZING!
```

#### Health Bars with Character
```
GUARDIAN HEALTH:
Full:    [████████████████████] 100%  "You cannot defeat me."
75%:     [███████████████░░░░░] 75%   "Is that all you have?"
50%:     [██████████░░░░░░░░░░] 50%   "You... are stronger than I thought."
25%:     [█████░░░░░░░░░░░░░░░] 25%   "No... this cannot be!"
Critical:[██░░░░░░░░░░░░░░░░░░] 10%   "IMPOSSIBLE!"

YOUR SHIELDS:
Full:    🛡️ 🛡️ 🛡️ 🛡️ 🛡️
Damaged: 🛡️ 🛡️ 🛡️ 💔 💔
(ASCII): [■] [■] [■] [×] [×]
```

### Animation Concepts

#### Timer Tension
```
Plenty of time:  ⏱️ 0:45  [████████████████████]  (green)
Getting close:   ⏱️ 0:15  [████████░░░░░░░░░░░░]  (yellow, pulsing)
Almost out:      ⏱️ 0:05  [██░░░░░░░░░░░░░░░░░░]  (red, flashing)
```

#### Damage Flash
When Monster takes damage:
1. Screen briefly inverts colors (50ms)
2. Monster ASCII art "shakes" (offset left-right)
3. Health bar smoothly animates down
4. Damage number floats up: `-15 DMG`

#### Level Transition
```
Current screen fades/dissolves
↓
Black screen with level name typing out
↓
"LEVEL 3: cat ./deep-dive"
↓
Brief description fades in
↓
New level screen builds in piece by piece
```

### Color Palette

```typescript
const theme = {
  // Primary colors
  primary: '#00ff88',      // Matrix green - success, correct
  secondary: '#00d4ff',    // Cyber blue - info, highlights
  accent: '#ff6b6b',       // Warning red - errors, damage
  gold: '#ffd700',         // Gold - achievements, XP
  
  // UI colors
  background: '#0a0a0a',   // Near black
  surface: '#1a1a2e',      // Slightly lighter
  border: '#16213e',       // Box borders
  text: '#e4e4e4',         // Main text
  muted: '#6b6b6b',        // Secondary text
  
  // Special effects
  streak: ['#ff6b6b', '#ff8c42', '#ffd700', '#7fff00', '#00ff88'],
  rainbow: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
};
```

### Existing Games for Inspiration

| Game | Built With | What to Learn |
|------|-----------|---------------|
| **ink-tetris** | Ink | Real-time game loop, piece rendering |
| **breakout-ink** | Ink + Redux | State management, collision |
| **Terminal Wordle** | Ink | Letter grid, color feedback |
| **blessed-contrib** | Blessed | Dashboard layouts, graphs |

### Implementation Priority

1. **Phase 0:** Basic Ink setup with theme colors
2. **Phase 1:** Box-drawing frames, figlet titles
3. **Phase 2:** Progress bars, timers, health bars
4. **Phase 3:** Animations (typing, transitions)
5. **Phase 4:** Sound effects (optional, off by default)
6. **Phase 5:** Polish (screen shake, damage flash)

> **Project structure details:** See [ARCHITECTURE.md](./context/ARCHITECTURE.md#6-project-structure).

---

## 6. CLI Commands

### Core Commands

```bash
# Initialize OnboardMe for this repository
onboardme init [--agent=cursor|claude|opencode]

# Start or resume the game
onboardme start

# Show current progress
onboardme status

# View unlocked knowledge
onboardme knowledge [topic]

# Reset progress (start over)
onboardme reset [--hard]

# Configuration
onboardme config [key] [value]
```

### Development/Debug Commands

```bash
# Test a specific game in isolation
onboardme game:test <game-id> [--verbose] [--fixture=<path>]

# List all registered games
onboardme game:list

# Preview generated questions for a game (without playing)
onboardme game:preview <game-id>

# Regenerate questions for a specific level/game
onboardme regenerate [--level=<n>] [--game=<id>]

# Dump gathered context (for debugging)
onboardme debug:context

# Validate all generated questions (paths exist, etc.)
onboardme debug:validate
```

### Command Details

#### `onboardme init`

```
$ onboardme init

🔍 SCANNING THE REALM...

Detecting agent framework...
  ✓ Found: Claude Code

Phase 1: Structural Scan           ████████████████████ 100%
  • Language: TypeScript
  • Framework: Express + React
  • Services: 6 identified

Phase 2: Deep Analysis             ████████████████████ 100%
  • Entry points: 23 mapped
  • Key functions: 156 extracted
  • Data flows: 8 traced

Phase 3: Knowledge Extraction      ████████████████████ 100%
  • Domain terms: 34 catalogued
  • ADRs: 5 found
  • Config patterns: 12 identified

Phase 4: Game Generation           ████████████████████ 100%
  • Monster origin: src/services/payment/core/
  • TODOs generated: 5
  • Challenges created: 47

✅ INITIALIZATION COMPLETE

The Spaghetti Code Monster stirs...
Born from: 234 TODOs, the legendary processPayment() (1,847 lines)
"I've been waiting for someone like you."

Run 'onboardme start' to begin your quest.
```

#### `onboardme start`

```
$ onboardme start

╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║              ⚔️ ONBOARDME: THE QUEST BEGINS ⚔️                  ║
║                                                                ║
║  Welcome, Engineer.                                            ║
║                                                                ║
║  Deep within this codebase lies THE ANCIENT LEDGER OF ACME.   ║
║  To defeat it, you must first understand its realm.           ║
║                                                                ║
║  Your journey:                                                 ║
║    L1  ./init           Discover what exists                  ║
║    L2  cd ./deeper      Learn to navigate                     ║
║    L3  cat ./deep-dive  Understand components                 ║
║    L4  man domain       Master the business logic             ║
║    L5  sudo ./execute   Prove you can operate                 ║
║    👑  THE GUARDIAN     Final confrontation                   ║
║                                                                ║
║                    [PRESS ENTER TO BEGIN]                     ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

#### `onboardme status`

```
$ onboardme status

╔════════════════════════════════════════════════════════════════╗
║  📋 CODEBASE STATUS                                            ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  Monster: The Spaghetti Code Monster                          ║
║  Integrity: ████████░░░░░░░░░░░░ 40%                          ║
║                                                                ║
║  CRITICAL TODOs:                                              ║
║  ────────────────────────────────────────────────────────     ║
║  ✓ TODO #1: // understand what we have        RESOLVED        ║
║  ✓ TODO #2: // figure out how to find things  RESOLVED        ║
║  → TODO #3: // trace data flows (URGENT)      IN PROGRESS     ║
║  ○ TODO #4: // document why this works        BLOCKED         ║
║  ○ TODO #5: // learn how to deploy safely     BLOCKED         ║
║  ▣ FIXME:   // the monster itself             LOCKED          ║
║                                                                ║
║  STATS:                                                        ║
║  • Total Commits: 2,340                                       ║
║  • Challenges: 38/47 correct (81%)                            ║
║  • Time played: 2h 34m                                        ║
║  • Longest clean streak: 7                                    ║
║                                                                ║
║  Run 'onboardme start' to continue.                           ║
╚════════════════════════════════════════════════════════════════╝
```

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
TODO #1: // understand what we have
├── tree --discover        → [context/games/todo-1-tree-discover/](context/games/todo-1-tree-discover/)
└── ps aux | grep          → [context/games/todo-1-ps-aux-grep/](context/games/todo-1-ps-aux-grep/)

TODO #2: // figure out how to find things
├── grep --hunt            → [context/games/todo-2-grep-hunt/](context/games/todo-2-grep-hunt/)
└── import { puzzle }      → [context/games/todo-2-import-puzzle/](context/games/todo-2-import-puzzle/)

TODO #3: // trace data flows (URGENT)
├── traceroute --function  → [context/games/todo-3-traceroute-function/](context/games/todo-3-traceroute-function/)
└── debug --inject         → [context/games/todo-3-debug-inject/](context/games/todo-3-debug-inject/)

TODO #4: // document why this works
├── whois --system         → [context/games/todo-4-whois-system/](context/games/todo-4-whois-system/)
└── man --explain 20q      → [context/games/todo-4-man-explain-20q/](context/games/todo-4-man-explain-20q/)

TODO #5: // learn how to deploy safely
├── tail -f incident.log   → [context/games/todo-5-tail-incident/](context/games/todo-5-tail-incident/)
└── chmod +x deploy.sh      → [context/games/todo-5-chmod-deploy/](context/games/todo-5-chmod-deploy/)

FIXME: // the monster itself
└── The Spaghetti Monster   → [context/games/fixme-spaghetti-monster/](context/games/fixme-spaghetti-monster/)
```

### TODO #1: `// understand what we have`

**Goal:** Build mental map of what exists

**Sub-tasks:**
- `tree --discover` - Progressive reveal of project structure
- `ps aux | grep` - Service identification from dependencies

**Flow:** Players explore the codebase structure and identify services, building foundational knowledge.

**See:** [context/games/todo-1-tree-discover/](context/games/todo-1-tree-discover/) | [context/games/todo-1-ps-aux-grep/](context/games/todo-1-ps-aux-grep/)

---

### TODO #2: `// figure out how to find things`

**Goal:** Learn to navigate the codebase

**Sub-tasks:**
- `grep --hunt` - Timed search from symptom descriptions
- `import { puzzle }` - Import pattern understanding

**Flow:** Players learn effective search strategies and understand codebase organization patterns.

**See:** [context/games/todo-2-grep-hunt/](context/games/todo-2-grep-hunt/) | [context/games/todo-2-import-puzzle/](context/games/todo-2-import-puzzle/)

---

### TODO #3: `// trace data flows (URGENT)`

**Goal:** Understand how data moves through the system

**Sub-tasks:**
- `traceroute --function` - Flow tracing across files/functions
- `debug --inject` - Bug hunting and fixing

**Flow:** Players trace data flows and debug issues, understanding system architecture deeply.

**See:** [context/games/todo-3-traceroute-function/](context/games/todo-3-traceroute-function/) | [context/games/todo-3-debug-inject/](context/games/todo-3-debug-inject/)

---

### TODO #4: `// document why this works`

**Goal:** Understand *why* things work the way they do

**Sub-tasks:**
- `whois --system` - Component identification from clues
- `man --explain 20q` - Deduction through yes/no questions

**Flow:** Players learn business domain knowledge and architectural decisions, understanding the "why" behind the code.

**See:** [context/games/todo-4-whois-system/](context/games/todo-4-whois-system/) | [context/games/todo-4-man-explain-20q/](context/games/todo-4-man-explain-20q/)

---

### TODO #5: `// learn how to deploy safely`

**Goal:** Actually operate the system

**Sub-tasks:**
- `tail -f incident.log` - Incident simulation and response
- `chmod +x deploy.sh` - Operational tasks in sandbox

**Flow:** Players practice operational skills including deployment and incident response.

**See:** [context/games/todo-5-tail-incident/](context/games/todo-5-tail-incident/) | [context/games/todo-5-chmod-deploy/](context/games/todo-5-chmod-deploy/)

---

## 11. FIXME Boss Battle Specification

> **Full boss narrative and dialogue in [GAME_NARRATIVE.md](./GAME_NARRATIVE.md)**  
> **Detailed boss battle specification:** [context/games/fixme-spaghetti-monster/](context/games/fixme-spaghetti-monster/)

### The Spaghetti Code Monster

When all TODOs are complete, only one item remains:

```
╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║   ALL TODOs RESOLVED.                                                 ║
║                                                                        ║
║   ✓ TODO #1: understand what we have                                  ║
║   ✓ TODO #2: figure out how to find things                            ║
║   ✓ TODO #3: trace data flows (URGENT)                                ║
║   ✓ TODO #4: document why this works                                  ║
║   ✓ TODO #5: learn how to deploy safely                               ║
║                                                                        ║
║   Only one item remains:                                              ║
║                                                                        ║
║   ▣ FIXME: // CRITICAL - DO NOT IGNORE                                ║
║   // Added: Unknown                                                   ║
║   // Author: Unknown                                                  ║
║   // Description: "Just... fix it. Please. Someone. Anyone."          ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
```

### Battle Flow Overview

**Three Phases:**
1. **THE LEGACY ONSLAUGHT** - Rapid-fire questions with hotfix mechanics
2. **THE DEPENDENCY TANGLE** - Interdependent questions mirroring codebase structure
3. **THE FINAL MERGE CONFLICT** - Resolve conflicting information, free-form evaluation

**Battle Mechanics:**
- Monster Integrity starts at 100%, decreases with correct answers
- Player has 5 retries (shields)
- Damage scales with speed and clean commit streaks
- Wrong answers cost retries; timeouts heal the Monster

**See:** [context/games/fixme-spaghetti-monster/GAME.md](context/games/fixme-spaghetti-monster/GAME.md) for complete battle specification, mechanics, and endings.

---

## 12. State Management

### Progress Tracking

```typescript
interface Progress {
  currentTodo: number;              // 1-5 or 0 for FIXME
  currentSubTask: string | null;
  currentChallenge: number;
  
  todos: Record<string, TodoProgress>;
  monsterIntegrity: number;         // 0-100, decreases as TODOs complete
  
  stats: {
    totalCommits: number;           // XP equivalent
    totalTime: number;
    challengesAnswered: number;
    correctAnswers: number;
    stackOverflowUsed: number;      // Hints used
    longestCleanStreak: number;
    currentCleanStreak: number;
  };
  
  checkpoint: {
    canResume: boolean;
    resumePoint: ResumePoint | null;
  };
}
```

### History (Audit Trail)

Every answer is logged:

```typescript
interface HistoryEntry {
  timestamp: string;
  todo: number;
  subTask: string;
  challengeId: string;
  challenge: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeToAnswer: number;
  stackOverflowUsed: number;
  commitsEarned: number;
  documentationUnlocked: string[];
}
```

### Documentation Log

What the user has learned (knowledge unlocks):

```typescript
interface DocumentationEntry {
  id: string;
  unlockedAt: string;
  todo: number;
  category: string;
  title: string;
  content: string;           // AI-generated explanation
  relatedFiles: string[];
  relatedDocs: string[];
}
```

---

## 13. Question Design Principles

### Anti-Shortcut Design

Questions must require **real exploration**, not just grep:

| ❌ Bad Question | ✅ Good Question |
|----------------|------------------|
| "What port does the API run on?" | "Trace from app startup to where the port is configured. What file defines it and why that specific value?" |
| "Find the validateEmail function" | "A user reports 'test@test' is accepted. Find where validation happens and why it fails to catch this." |
| "What does PaymentService do?" | "PaymentService calls 3 other services. Name them and explain why each is needed." |

### Question Requirements

1. **Multi-hop:** Requires visiting 2+ files
2. **Contextual:** Must understand *why*, not just *what*
3. **Verifiable:** AI can verify answer is reasoned
4. **Time-appropriate:** Enough time to explore, not read everything
5. **Learning-oriented:** Even wrong answers teach something

### The Teaching Loop

```
┌──────────┐     ┌──────────┐     ┌─────────────────────┐
│   PLAY   │ ──► │  RESULT  │ ──► │  AI EXPLAINS        │
│   GAME   │     │ (Win/Lose)│     │  "Here's what this  │
└──────────┘     └──────────┘     │   actually means.." │
                                   └──────────┬──────────┘
                                              │
                                              ▼
                                   ┌─────────────────────┐
                                   │ KNOWLEDGE UNLOCKED  │
                                   │ (Saved to log)      │
                                   └─────────────────────┘

Wrong answer? → STILL get explanation
Right answer? → Get DEEPER context as reward
```

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
- **Achievements/badges:** Shareable accomplishments
- **Leaderboards:** Anonymous or team-based
- **Manager dashboard:** Track team onboarding progress
- **Integration with ticketing:** First ticket tied to onboarding
- **Replay mode:** Re-challenge the Monster with harder questions
- **Community content:** Share question packs between companies

### Extensibility Points

Design the system to allow:
- New game types (plugin architecture)
- New agent backends
- Custom question templates
- Branded themes

---

## Appendix A: Sample Game Flow

> **Full game flows:** See individual game folders in `context/games/` for detailed game flows and examples.

### Example: `grep --hunt` Game

> **See:** [context/games/todo-2-grep-hunt/GAME.md](context/games/todo-2-grep-hunt/GAME.md) for complete game specification.

```
╔════════════════════════════════════════════════════════════════╗
║  🔍 grep --hunt                                 Target: 3/5    ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  HUNT TARGET:                                                  ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │                                                         │  ║
║  │  A user reports: "I can register with 'test@test' but  │  ║
║  │  it says my email is valid. That can't be right!"      │  ║
║  │                                                         │  ║
║  │  TASK:                                                  │  ║
║  │  1. Find where email validation happens at registration │  ║
║  │  2. Identify why 'test@test' passes                     │  ║
║  │  3. Find the test file that should have caught this    │  ║
║  │                                                         │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  YOUR FINDINGS:                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │  Validation file:line  > _                              │  ║
║  │  Why it passes         > _                              │  ║
║  │  Test file             > _                              │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  ⏱️ 4:32 remaining                                            ║
║  [H] Hint (-30 sec)  [S] Skip (-1 life)  [ENTER] Submit       ║
╚════════════════════════════════════════════════════════════════╝
```

**After submission:**

```
╔════════════════════════════════════════════════════════════════╗
║  ✅ CORRECT!                                    +100 XP        ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  📚 KNOWLEDGE UNLOCKED: Email Validation                       ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │                                                         │  ║
║  │  LOCATION: src/utils/validators.ts:23-41                │  ║
║  │                                                         │  ║
║  │  THE BUG: The regex only checks for @ symbol, not       │  ║
║  │  for a valid TLD. 'test@test' has an @ so it passes.   │  ║
║  │                                                         │  ║
║  │  THE FIX: Use a proper email validation library like    │  ║
║  │  'validator.js' or 'zod.string().email()'              │  ║
║  │                                                         │  ║
║  │  WHY IT MATTERS: This is a common security issue.      │  ║
║  │  Invalid emails can bypass verification flows and      │  ║
║  │  create orphaned accounts.                              │  ║
║  │                                                         │  ║
║  │  RELATED:                                               │  ║
║  │  • ADR-012: Input Validation Strategy                  │  ║
║  │  • src/utils/validators.test.ts (missing coverage!)    │  ║
║  │                                                         │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  [ENTER] Continue to next challenge                           ║
╚════════════════════════════════════════════════════════════════╝
```

---

## Appendix B: Sample Boss Battle

> **Full boss battle specification:** See [context/games/fixme-spaghetti-monster/GAME.md](context/games/fixme-spaghetti-monster/GAME.md) and [context/games/fixme-spaghetti-monster/GAME-VISUALS.md](context/games/fixme-spaghetti-monster/GAME-VISUALS.md) for complete details.

```
╔════════════════════════════════════════════════════════════════╗
║  ▣ FIXME: // the monster                                       ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  GUARDIAN: THE ANCIENT LEDGER OF ACME                         ║
║  HEALTH:   ████████████████████████████████████ 100%          ║
║  SHIELDS:  🛡️ 🛡️ 🛡️ 🛡️ 🛡️                                       ║
║                                                                ║
║  ═══════════════════════════════════════════════════════════  ║
║                                                                ║
║  PHASE 1: RAPID FIRE                          Question 4/10   ║
║  STREAK:  🔥🔥🔥 (3x damage!)                                  ║
║                                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │                                                         │  ║
║  │  When a payment webhook arrives, what prevents          │  ║
║  │  duplicate charges if Stripe sends it twice?            │  ║
║  │                                                         │  ║
║  │  [A] Database unique constraint on payment_id           │  ║
║  │  [B] Redis-based idempotency key check                  │  ║
║  │  [C] In-memory Set of processed webhooks                │  ║
║  │  [D] Stripe handles it, we don't need to                │  ║
║  │                                                         │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║               ⏱️ 24 SECONDS                                   ║
║      ████████████████████░░░░░░░░░░░░░░░░░░░░                ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

*Document Version: 0.1*
*Last Updated: 2025-02-02*
*Status: Draft*
