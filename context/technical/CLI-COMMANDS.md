# CLI Commands

> **The CLI is a runner—it loads `.onboardme/config.ts`, runs games, and can validate prepared data. AI work happens through skills.**

## Quick Reference

```bash
# Setup
onboardme init                    # Setup .onboardme/ folder structure
onboardme game:new <id>           # Scaffold a new game in src/games/

# Playing
onboardme start                   # Run games from .onboardme/config.ts (TTY required)
onboardme status                  # Show current progress

# Utilities
onboardme validate                # Validate prepared/ structure (JSON output)

# Planned (not implemented yet)
# onboardme knowledge [topic]       # View unlocked knowledge
# onboardme memories                # View unlocked memory logs
# onboardme reset [--hard]          # Reset progress
```

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  1. onboardme init                                              │
│     Creates .onboardme/ folder structure                         │
├─────────────────────────────────────────────────────────────────┤
│  2. Optional: In AI platform: "Run initialize context"          │
│     Skill scans repo → writes to .onboardme/context/            │
├─────────────────────────────────────────────────────────────────┤
│  3. Optional: In AI platform: "Run prepare game"                │
│     Skill writes to .onboardme/prepared/ (validated via CLI)    │
├─────────────────────────────────────────────────────────────────┤
│  4. onboardme start                                             │
│     CLI loads .onboardme/config.ts → runs games (interactive)   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Command Details

### `onboardme init`

**What it does:** Sets up the OnboardMe folder structure and installs the skill to your AI platform.

**Usage:**
```bash
onboardme init
```

**Output:**
```
$ onboardme init

🔧 INITIALIZING ONBOARDME...

Creating .onboardme/ directory structure...
  ✓ Created .onboardme/context/
  ✓ Created .onboardme/prepared/
  ✓ Created .onboardme/template/
  ✓ Created .onboardme/state/
  ✓ Created .onboardme/.gitignore

Installing skill...
  ✓ Skill installed to .cursor/skills/onboardme/

Updating .gitignore...
  ✓ Added .onboardme/context/ to .gitignore
  ✓ Added .onboardme/prepared/ to .gitignore
  ✓ Added .onboardme/state/ to .gitignore

✅ INITIALIZATION COMPLETE

*kzzzt*

Something stirs in the depths...

*crackle*

The Spaghetti Code Monster awakens.

*slrrrrp*

"Finally. Fresh documentation..."

*[CONNECTION ESTABLISHED]*

─────────────────────────────────────────────────────────────────

Next steps:
  1. In your AI platform, run: "Initialize context"
  2. Then run: "Prepare game"  
  3. Finally: onboardme start

The Monster awaits.
```

---

### `onboardme game:new`

**What it does:** Scaffolds a new game under `src/games/<id>/` (React component + `defineGame` export + types + AI context stub).

**Usage:**
```bash
onboardme game:new my-game
```

**Output:**
```
Created game scaffold in src/games/my-game
```

**Next steps:**
- Add the game to `.onboardme/config.ts`
- Optionally re-export the game factory from `src/games/index.ts` for convenience

---

### `onboardme start`

**What it does:** Loads `.onboardme/config.ts` (or falls back to the built-in default config) and runs games in an interactive terminal.

**Usage:**
```bash
onboardme start
```

**Notes:**
- Requires a TTY (interactive terminal). Running via scripts/subprocesses will exit with an error.
- `onboardme start` does not currently block on prepared-data validation. Use `onboardme validate` to check `.onboardme/prepared/`.

---

### `onboardme status`

**What it does:** Shows your current progress through the game.

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
║  Technical Debt: ████████░░░░░░░░░░░░ 40%                     ║
║                                                                ║
║  *kzzzt* "You're still here? Persistent." *kzzzt*             ║
║                                                                ║
║  PROGRESS:                                                     ║
║  ────────────────────────────────────────────────────────     ║
║  ✓ TODO #0: file-detective                   COMPLETE         ║
║  → TODO #1: flow-trace                       IN PROGRESS      ║
║  ○ TODO #2: grep-hunt                        LOCKED           ║
║  ▣ FIXME:   spaghetti-monster                LOCKED           ║
║                                                                ║
║  STATS:                                                        ║
║  ────────────────────────────────────────────────────────     ║
║  • Total Commits: 1,240                                       ║
║  • Accuracy: 18/22 correct (82%)                              ║
║  • Time played: 1h 12m                                        ║
║  • Longest clean streak: 5                                    ║
║                                                                ║
║  Run 'onboardme start' to continue.                           ║
╚════════════════════════════════════════════════════════════════╝
```

---

### `onboardme validate`

**What it does:** Validates the prepared data files (and manifest) without starting the game.

**Usage:**
```bash
onboardme validate
```

**Output (JSON):**
```json
{
  "valid": true,
  "errors": []
}
```

**Notes:**
- Always prints JSON to stdout (intended for AI consumption).
- Use this before `onboardme start` when you want to verify `.onboardme/prepared/` outputs.

---

### Game configuration (`.onboardme/config.ts`)

**What it does:** Defines which games to run (and in what order). This replaces the legacy template system (`template.json` / `template.ts`).

**Example:**
```typescript
// .onboardme/config.ts
import { defineConfig, FileDetective } from "onboardme/games";

export default defineConfig({
  games: [FileDetective()],
});
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
║  You've documented 8 topics:                                   ║
║                                                                ║
║  ✓ project-structure    How the codebase is organized         ║
║  ✓ tech-stack           Languages, frameworks, and tools      ║
║  ✓ auth-flow            How authentication works              ║
║  ✓ database-schema      Main entities and relationships       ║
║  ○ api-endpoints        [LOCKED - Complete TODO #1]           ║
║  ○ deployment           [LOCKED - Complete TODO #2]           ║
║                                                                ║
║  *kzzzt* "You're learning my secrets." *kzzzt*                ║
║                                                                ║
║  Use 'onboardme knowledge <topic>' to view details.           ║
╚════════════════════════════════════════════════════════════════╝
```

---

### `onboardme memories`

**What it does:** View unlocked memory logs—backstory fragments that reveal the Monster's origin.

**Usage:**
```bash
onboardme memories                # List all memory logs
onboardme memories 3              # View specific memory log
onboardme memories --all          # List all (including locked)
```

**Output:**
```
$ onboardme memories

╔════════════════════════════════════════════════════════════════╗
║  🧠 CORRUPTED MEMORY LOGS                                      ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  *kzzzt* "You found my memories..." *crackle*                  ║
║                                                                ║
║  RECOVERED FRAGMENTS: 4 / 8                                    ║
║                                                                ║
║  ✓ Memory #1: "The First Commit"                               ║
║    Unlocked: TODO #0 completion                                ║
║                                                                ║
║  ✓ Memory #2: "The Promise"                                    ║
║    Unlocked: Perfect score on file-detective                   ║
║                                                                ║
║  ✓ Memory #3: "The Shortcut"                                   ║
║    Unlocked: TODO #1 completion                                ║
║                                                                ║
║  ✓ Memory #4: "The Departure"                                  ║
║    Unlocked: Found the oldest TODO                             ║
║                                                                ║
║  ○ Memory #5: [CORRUPTED - Continue playing]                   ║
║  ○ Memory #6: [CORRUPTED - Continue playing]                   ║
║  ○ Memory #7: [CORRUPTED - Continue playing]                   ║
║  ○ Memory #8: [CORRUPTED - Defeat the Monster]                 ║
║                                                                ║
║  *tangle* "Some things are better left forgotten." *drip*      ║
║                                                                ║
║  Use 'onboardme memories <number>' to read a fragment.         ║
╚════════════════════════════════════════════════════════════════╝
```

**Viewing a specific memory:**
```
$ onboardme memories 1

╔════════════════════════════════════════════════════════════════╗
║  🧠 MEMORY LOG #1: "The First Commit"                          ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  *static crackle*                                              ║
║                                                                ║
║  Date: 2017-03-14                                              ║
║  Author: sarah@company.com                                     ║
║                                                                ║
║  "Initial commit. Clean architecture."                         ║
║  "This will be different. This time we'll do it right."        ║
║                                                                ║
║  *pause*                                                       ║
║                                                                ║
║  "Single responsibility. No shortcuts."                        ║
║  "The future team will thank us."                              ║
║                                                                ║
║  *the static fades to silence*                                 ║
║                                                                ║
║  commit: a1b2c3d                                               ║
║  files: 12 added                                               ║
║  message: "Initial project setup - clean slate"                ║
║                                                                ║
║  *kzzzt*                                                       ║
║                                                                ║
║  "She meant it, you know."                                     ║
║  "They always mean it at the beginning."                       ║
║                                                                ║
║  *[END OF FRAGMENT]*                                           ║
╚════════════════════════════════════════════════════════════════╝
```

---

### `onboardme reset`

**What it does:** Resets your game progress.

**Usage:**
```bash
onboardme reset                   # Soft reset (preserves stats)
onboardme reset --hard            # Full reset (deletes everything)
```

**Output:**
```
$ onboardme reset

⚠️  This will reset your progress to the beginning.
    Your high scores and achievements will be preserved.

Are you sure? (y/n) y

Resetting progress...
  ✓ Progress cleared
  ✓ History archived
  ✓ Knowledge preserved

*kzzzt*

"Back for more?"

*pause*

"I admire the persistence."

*crackle*

"Most people just... give up."

*tangle*

"Read the README once and call it onboarding."

*slrrrrp*

"But you? You want to understand."

*whirrrr*

"...Interesting."

*[PROGRESS RESET — MONSTER INTEGRITY RESTORED TO 100%]*

Run 'onboardme start' to begin again.
```

---

## Error Messages

Errors are designed to be helpful and actionable:

| Error | Message | What to Do |
|-------|---------|------------|
| Not initialized | `No .onboardme found. Run 'onboardme init' first.` | Run init in repo root |
| No prepared data | `No prepared data found. Run skills first.` | Run "initialize context" then "prepare game" skills |
| Validation failed | `Prepared data invalid. See errors above.` | Show errors to AI, re-run prepare skill |
| Locked game | `TODO #2 is locked. Complete TODO #1 first.` | Progress sequentially |
| Missing template | `Template not found. Using default.` | Optional—default template works fine |

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Not initialized |
| 4 | Validation failed |
| 5 | Game error |
