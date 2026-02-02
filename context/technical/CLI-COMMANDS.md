# CLI Commands

## Core Commands

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

## Development/Debug Commands

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

## Command Details

### `onboardme init`

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

### `onboardme start`

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

### `onboardme status`

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
