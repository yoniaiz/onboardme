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
| Game content | `skills/onboardme/scripts/chapters/*.cjs` |

---

## Skill Development

The OnboardMe game runs as an **agent skill** — a script-driven game engine where `state-manager.cjs` is the authoritative source of truth for game flow, and SKILL.md defines the Monster character.

### Source of Truth

**`skills/onboardme/`** is the authoritative source for all skill files:

```
skills/onboardme/
├── SKILL.md              # Monster persona, How To Play, scoring rubric
├── instructions/         # Command implementations (play-game, prepare-game, etc.)
├── references/           # (empty — chapter content lives in scripts/chapters/)
└── scripts/
    ├── state-manager.cjs     # Game engine (resume, complete-step, etc.)
    ├── game-data.cjs         # Combines chapter data into flat lookups
    ├── knowledge-manager.cjs # Codebase knowledge persistence
    └── chapters/             # Game content (one file per chapter)
        ├── investigation.cjs
        ├── deep-dive.cjs
        ├── hunt.cjs
        └── boss.cjs
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

## Script-Driven Architecture

This is the most important design principle in the skill. **Understand it before making changes.**

### The Problem

During long gameplay sessions, Cursor compacts conversation context — summarizing earlier messages. Files loaded via tool calls get summarized and lose their exact instructions. The agent forgets command names, scoring rules, and ceremony checklists.

### The Solution

**The script is the game engine.** Two commands drive the entire game:

- **`resume`** — Returns the current phase instruction, rules, scoring, tips, and score
- **`complete-step`** — Records results, advances the game, returns next phase or ceremony data

The agent only needs to remember: "call resume, follow its output, call complete-step when done."

**`SKILL.md`** is loaded as a persistent skill file and survives compaction. It contains the Monster character, the 2-command "How To Play" section, and scoring rules.

### What Goes Where

| Must survive compaction → **SKILL.md** | Script returns at runtime → **chapters/*.cjs** | One-time read → **instructions/*.md** |
|---------------------------------------|------------------------------------------------|--------------------------------------|
| Monster character and voice | Phase instructions and scoring | Prepare-game setup steps |
| How To Play (resume + complete-step) | Chapter-specific rules | Session start orchestration |
| Scoring rubric with examples | Tips and operational details | Hint/status/reset flows |
| Character lock rules | Sabotage patterns, certificate structure | |
| Score display rule | Ceremony data (ASCII art, memory logs) | |
| Game terminology | | |

### When Editing Game Content

- **Modifying a phase?** Edit the chapter file in `scripts/chapters/` (e.g., `investigation.cjs`)
- **Adding a rule the agent must always follow?** Put it in `SKILL.md`
- **Adding a chapter-specific rule?** Add it to the chapter's `rules` array — it gets returned with every phase
- **Adding a new command?** Add it to `state-manager.cjs` AND reference it in `SKILL.md` "How To Play"
- **Changing game structure?** Update the chapter file, `game-data.cjs` rebuilds automatically

---

## Skill Writing Guidelines

### SKILL.md — The Persistent Rulebook

- Contains everything the agent must know even after context compaction
- Rules here should be **deterministic and unambiguous** — exact command syntax, not vague guidance
- Keep it focused: character identity, How To Play, scoring rubric, terminology
- Avoid lengthy dialogue examples (the agent improvises in Monster voice)

### Chapter Files (scripts/chapters/*.cjs)

- Each chapter exports: name, number, moodRange, memoryLog, rules[], phases[]
- `rules[]` — critical rules returned to agent with EVERY phase in this chapter
- Each phase has: id, instruction, scoring (null for non-Q&A phases), tips
- `instruction` should be detailed enough that the agent knows exactly what to do
- Keep dialogue examples out — the agent improvises from SKILL.md persona

### Instruction Files (play-game.md, prepare-game.md, etc.)

- Orchestration logic: run resume, check result, follow instructions
- These get read once via tool calls and may be summarized during compaction
- Keep them concise — the script handles all game flow

### Scripts (state-manager.cjs, knowledge-manager.cjs)

- Plain JavaScript (.cjs) — no build step, no external dependencies
- Agents execute directly via `node <script> <command> [args]`
- `state-manager.cjs` and `knowledge-manager.cjs` are the **only** agent-facing scripts
- `game-data.cjs` and `chapters/*.cjs` are internal data modules — never called directly by agents
- All CLI commands should have help text and clear error messages
- Return JSON for agent consumption — the agent parses the output

---

## Naming Conventions

- Instruction files: `kebab-case.md`
- Scripts: `kebab-case.cjs`
- Chapter data files: `kebab-case.cjs` (matching chapter ID)

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
- Put game-wide rules in `SKILL.md` (survives compaction)
- Put chapter-specific rules in the chapter's `rules` array
- Test script changes with `node <script> <command>` before deploying

### Ask First

- Major architectural changes
- Adding new agent-facing scripts
- Changing state schema version
- Restructuring SKILL.md sections

### Never Do

- Edit `.cursor/skills/onboardme/` directly (edit `skills/onboardme/` instead)
- Commit secrets or API keys
- Break Monster voice consistency
- Skip deployment after skill changes

---

## Project Structure

```
onboardme/
├── skills/onboardme/        # Skill source of truth (the product)
│   ├── SKILL.md             # Monster persona, How To Play, scoring
│   ├── instructions/        # Command implementations
│   ├── references/          # (empty — content in scripts/chapters/)
│   └── scripts/
│       ├── state-manager.cjs    # Game engine
│       ├── game-data.cjs        # Chapter data combiner
│       ├── knowledge-manager.cjs # Codebase knowledge
│       └── chapters/            # Game content (per-chapter)
├── context/                 # Design documentation
│   ├── ARCHITECTURE.md
│   ├── agent/               # Agent design docs
│   ├── chapters/            # Chapter design docs
│   └── narrative/           # Narrative design docs
├── scripts/
│   └── install-skill.sh     # Deploy skill locally
├── feedback/                # Playtest feedback
├── README.md                # Open source documentation
├── LICENSE                  # MIT license
├── PRD.md                   # Product requirements
├── PROGRESS.md              # Task tracking & milestones
├── AGENTS.md                # This file
└── package.json             # Project metadata
```

---

*Document Version: 3.0*
*Last Updated: 2026-02-12*
