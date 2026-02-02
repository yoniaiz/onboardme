# CLI Commands

> **Clear, professional command documentation. Every command does exactly what it says.**

## Core Commands

| Command | Purpose | Quick Example |
|---------|---------|---------------|
| `onboardme init` | Initialize OnboardMe for this repository | `onboardme init --agent=cursor` |
| `onboardme start` | Start or resume your game | `onboardme start` |
| `onboardme status` | View your current progress | `onboardme status` |
| `onboardme knowledge` | Browse unlocked documentation | `onboardme knowledge auth` |
| `onboardme reset` | Start over (preserves high scores) | `onboardme reset --hard` |
| `onboardme config` | View or modify settings | `onboardme config theme dark` |

```bash
# Quick reference
onboardme init [--agent=cursor|claude|opencode]
onboardme start
onboardme status
onboardme knowledge [topic]
onboardme reset [--hard]
onboardme config [key] [value]
```

## Development/Debug Commands

For testing and debugging game content:

```bash
# Test a specific game in isolation
onboardme game:test <game-id> [--verbose] [--fixture=<path>]

# List all registered games
onboardme game:list

# Preview generated questions (without playing)
onboardme game:preview <game-id>

# Regenerate questions for a specific level/game
onboardme regenerate [--level=<n>] [--game=<id>]

# Dump gathered codebase context (debugging)
onboardme debug:context

# Validate all generated questions (paths exist, etc.)
onboardme debug:validate
```

---

## Command Details

### `onboardme init`

**What it does:** Scans your codebase, generates questions, and awakens the Monster.

**Usage:**
```bash
onboardme init                    # Auto-detect agent
onboardme init --agent=cursor     # Specify agent explicitly
```

**Output:**
```
$ onboardme init

🔍 SCANNING CODEBASE...

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

*kzzzt*

Something stirs in the depths...

*crackle*

The Spaghetti Code Monster awakens.
Origin: 234 forgotten TODOs. The legendary processPayment() — 1,847 lines.

*slrrrrp*

"Finally. Fresh documentation..."

*[CONNECTION ESTABLISHED]*

Run 'onboardme start' to begin.
```

---

### `onboardme start`

**What it does:** Launches the game or resumes from your last checkpoint.

**Usage:**
```bash
onboardme start                   # Continue from last position
onboardme start --todo=2          # Jump to specific TODO (if unlocked)
```

**Output:**
```
$ onboardme start

╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║                    ░█████╗░███╗░░██╗██████╗░                   ║
║                    ██╔══██╗████╗░██║██╔══██╗                   ║
║                    ██║░░██║██╔██╗██║██████╦╝                   ║
║                    ██║░░██║██║╚████║██╔══██╗                   ║
║                    ╚█████╔╝██║░╚███║██████╦╝                   ║
║                    ░╚════╝░╚═╝░░╚══╝╚═════╝░                   ║
║                                                                ║
║                    ══════════════════════                      ║
║                       THE QUEST BEGINS                         ║
║                    ══════════════════════                      ║
║                                                                ║
║  Your mission: Understand this codebase. Defeat the Monster.  ║
║                                                                ║
║  CRITICAL TODOs:                                               ║
║    □ TODO #0: // understand what we have                      ║
║    □ TODO #1: // trace flows and run the app                  ║
║    □ TODO #2: // find bugs and plan features                  ║
║    ▣ FIXME:   // the monster itself                           ║
║                                                                ║
║  *kzzzt*                                                       ║
║                                                                ║
║  "So. You're the new one."                                    ║
║  "Let's see how long you last."                               ║
║                                                                ║
║  *slrrrrp*                                                     ║
║                                                                ║
║                      [PRESS ENTER TO BEGIN]                    ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

### `onboardme status`

**What it does:** Shows your current progress, stats, and the Monster's health.

**Usage:**
```bash
onboardme status                  # Full status display
onboardme status --brief          # One-line summary
```

**Output:**
```
$ onboardme status

╔════════════════════════════════════════════════════════════════╗
║  📋 CODEBASE STATUS                                            ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  Monster: The Spaghetti Code Monster                          ║
║  Integrity: ████████░░░░░░░░░░░░ 40%                          ║
║                                                                ║
║  *kzzzt* "You're still here? Persistent." *kzzzt*             ║
║                                                                ║
║  CRITICAL TODOs:                                              ║
║  ────────────────────────────────────────────────────────     ║
║  ✓ TODO #0: // understand what we have        RESOLVED        ║
║  ✓ TODO #1: // trace flows and run the app    RESOLVED        ║
║  → TODO #2: // find bugs and plan features    IN PROGRESS     ║
║  ▣ FIXME:   // the monster itself             LOCKED          ║
║                                                                ║
║  STATS:                                                        ║
║  ────────────────────────────────────────────────────────     ║
║  • Total Commits: 2,340                                       ║
║  • Accuracy: 38/47 correct (81%)                              ║
║  • Time played: 2h 34m                                        ║
║  • Longest clean streak: 7                                    ║
║                                                                ║
║  Run 'onboardme start' to continue.                           ║
╚════════════════════════════════════════════════════════════════╝
```

---

### `onboardme knowledge`

**What it does:** Browse documentation you've unlocked through gameplay.

**Usage:**
```bash
onboardme knowledge               # List all unlocked topics
onboardme knowledge auth          # View specific topic
onboardme knowledge --all         # List all topics (including locked)
```

**Output:**
```
$ onboardme knowledge

╔════════════════════════════════════════════════════════════════╗
║  📚 UNLOCKED KNOWLEDGE                                         ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  You've documented 12 topics:                                  ║
║                                                                ║
║  ✓ project-structure    How the codebase is organized         ║
║  ✓ tech-stack           Languages, frameworks, and tools      ║
║  ✓ auth-flow            How authentication works              ║
║  ✓ database-schema      Main entities and relationships       ║
║  ✓ api-endpoints        Available routes and handlers         ║
║  ✓ test-patterns        How tests are organized               ║
║  ○ deployment           [LOCKED - Complete TODO #2]           ║
║  ○ monitoring           [LOCKED - Complete TODO #2]           ║
║                                                                ║
║  Use 'onboardme knowledge <topic>' to view details.           ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## Error Messages

Errors are designed to be helpful, not just informative:

| Error | Message | What to Do |
|-------|---------|------------|
| Not initialized | `No .onboardme found. Run 'onboardme init' first.` | Run init in repo root |
| Invalid game | `Game 'xyz' not found. Run 'onboardme game:list' to see available games.` | Check game ID spelling |
| Locked content | `TODO #3 is locked. Complete TODO #2 first.` | Progress sequentially |
| Agent not detected | `Could not detect agent. Use --agent flag to specify.` | Add explicit `--agent=` |

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Not initialized |
| 4 | Game validation failed |
