# Instructions for AI Agents

This is OnboardMe — a gamified agent skill for codebase onboarding.

## Project Documentation

Before making changes, understand the project:

- **[PROGRESS.md](./PROGRESS.md)** — Current milestone, task breakdown, and what to work on next
- **[PRD.md](./PRD.md)** — Product requirements, vision, game design, and user journey
- **[context/ARCHITECTURE.md](./context/ARCHITECTURE.md)** — Technical architecture and file structure

For specific tasks, reference additional context:

| Task Type | Reference Documents |
|-----------|---------------------|
| Agent design | `context/agent/*.md` |
| Chapter design | `context/chapters/*.md` |
| Narrative/dialogue | `context/narrative/*.md` |
| Skill implementation | `skills/onboardme/SKILL.md` |
| State management | `context/agent/STATE-SCHEMA.md` |

---

## Skill Development

The OnboardMe game runs as an **agent skill** — markdown files that instruct coding agents (Cursor, Claude Code) to embody the Spaghetti Code Monster.

### Source of Truth

**`skills/onboardme/`** is the authoritative source for all skill files:

```
skills/onboardme/
├── SKILL.md              # Monster persona, compaction-proof rules, gameplay loop
├── instructions/         # Command implementations (play-game, prepare-game, etc.)
├── references/           # Chapter content (THE-INVESTIGATION, THE-DEEP-DIVE, etc.)
└── scripts/              # State and knowledge manager utilities
```

### Syncing to Runtime

The agent reads skills from `.cursor/skills/onboardme/`. To deploy changes:

```bash
bash scripts/install-skill.sh
```

This copies `skills/onboardme/` -> `.cursor/skills/onboardme/`, replacing the previous installation.

### Rules

- **Always edit in `skills/onboardme/`** — never edit `.cursor/skills/onboardme/` directly
- **Run `bash scripts/install-skill.sh` after any skill file changes** — otherwise the agent uses stale files
- `.cursor/skills/onboardme/` is a deployment target, not a source — it is overwritten on each sync

---

## Compaction-Proof Architecture

This is the most important design principle in the skill. **Understand it before making changes.**

### The Problem

During long gameplay sessions, Cursor compacts conversation context — summarizing earlier messages to save token space. Files loaded via tool calls (like `play-game.md` or chapter references) get summarized and lose their exact instructions. By Chapter 4+, the agent may forget exact command names, scoring rules, and ceremony checklists.

### The Solution

**`SKILL.md` is loaded as a persistent skill file and survives compaction.** Everything that must be followed across all 4 chapters — regardless of conversation length — lives in `SKILL.md`.

### What Goes Where

| Must survive compaction → **SKILL.md** | OK to lose detail → **Other files** |
|---------------------------------------|--------------------------------------|
| Exact script names and command syntax | Dialogue examples (agent improvises) |
| "After Each Answer" command checklist | Phase-by-phase question suggestions |
| "Chapter End" ceremony checklist | Recovery patterns and timing hints |
| Score Display Rule (never fabricate) | Opening dialogue and artifact templates |
| Array Safety Rule (never write arrays directly) | Branch cleanup instructions |
| Script Identity Rule (only 2 scripts exist) | Detailed phase descriptions |
| Artifact mapping (which chapter creates what) | |
| Character voice rules and game terminology | |

### When Editing Skill Files

- **Adding a rule that must always be followed?** Put it in `SKILL.md` under "Compaction-Proof Rules"
- **Adding chapter-specific guidance?** Put it in the chapter reference file
- **Adding a new command?** Add it to both `state-manager.cjs` AND reference it in `SKILL.md`
- **Removing a section?** Check if any other file references it first

---

## Skill Writing Guidelines

### SKILL.md — The Persistent Rulebook

- Contains everything the agent must know even after context compaction
- Rules here should be **deterministic and unambiguous** — exact command syntax, not vague guidance
- Keep it focused: character identity, game flow routing, compaction-proof rules, terminology
- Avoid lengthy dialogue examples (the agent improvises in Monster voice)

### Instruction Files (play-game.md, prepare-game.md, etc.)

- Orchestration logic: load state, check conditions, route to chapters
- These get read once via tool calls and may be summarized during compaction
- Keep them concise — delegate rules to `SKILL.md`, delegate gameplay to chapter references

### Chapter Reference Files (THE-INVESTIGATION.md, etc.)

- Phase-by-phase gameplay instructions for each chapter
- Include: what to ask, how to evaluate, what artifacts to create, scoring rubrics
- Keep dialogue examples brief — 1 example per concept, not 3-4 variants
- Compress recovery patterns to brief hints, not full dialogue blocks
- The agent knows how to be the Monster from `SKILL.md` — chapter files just guide the gameplay

### Scripts (state-manager.cjs, knowledge-manager.cjs)

- Plain JavaScript (.cjs) — no build step, no external dependencies
- Agents execute directly via `node <script> <command> [args]`
- These are the **only** scripts — do not create new script files without good reason
- All CLI commands should have help text and clear error messages
- Return JSON for agent consumption — the agent parses the output

---

## Naming Conventions

- Instruction files: `kebab-case.md`
- Reference files: `UPPER-KEBAB-CASE.md` (e.g., `THE-INVESTIGATION.md`)
- Scripts: `kebab-case.cjs`

---

## Session Workflow

### Before Starting Work

1. **Check [PROGRESS.md](./PROGRESS.md)** — Find the next `pending` task in the current milestone
2. **Mark task as `in_progress`** — Update PROGRESS.md before starting
3. Read relevant documentation for the task (PRD, Architecture, specific context files)
4. Understand the existing skill structure
5. Plan the minimal changes needed

### While Working

- Complete one task at a time
- Follow task acceptance criteria
- Keep changes focused on the current task

### After Completing a Task

1. **Mark task as `completed`** in PROGRESS.md
2. Deploy and verify:

```bash
bash scripts/install-skill.sh    # Deploy skill changes
```

3. Move to the next `pending` task, or end the session

---

## Boundaries

### Always Do

- Check PROGRESS.md for the next task before starting work
- Mark tasks as `in_progress` before starting, `completed` when done
- Read documentation before implementing
- Deploy skill changes after edits
- Put game-wide rules in `SKILL.md` (compaction-proof)
- Test script changes with `node <script> <command>` before deploying

### Ask First

- Major architectural changes
- Adding new scripts
- Changing state schema
- Restructuring SKILL.md sections

### Never Do

- Edit `.cursor/skills/onboardme/` directly (edit `skills/onboardme/` instead)
- Commit secrets or API keys
- Break Monster voice consistency
- Skip deployment after skill changes
- Create scripts other than `state-manager.cjs` and `knowledge-manager.cjs`
- Put critical game-wide rules in chapter files (they get compacted away)

---

## Project Structure

```
onboardme/
├── skills/onboardme/     # Skill source of truth (the product)
│   ├── SKILL.md          # Monster persona, compaction-proof rules
│   ├── instructions/     # Command implementations
│   ├── references/       # Chapter content
│   └── scripts/          # State/knowledge managers
├── context/              # Design documentation
│   ├── ARCHITECTURE.md
│   ├── agent/            # Agent design docs
│   ├── chapters/         # Chapter design docs
│   └── narrative/        # Narrative design docs
├── scripts/
│   └── install-skill.sh  # Deploy skill locally
├── feedback/             # Playtest feedback
├── README.md             # Open source documentation
├── LICENSE               # MIT license
├── PRD.md                # Product requirements
├── PROGRESS.md           # Task tracking & milestones
├── AGENTS.md             # This file
└── package.json          # Project metadata
```

---

*Document Version: 2.0*
*Last Updated: 2026-02-10*
