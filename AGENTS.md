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
├── SKILL.md              # Monster persona, commands, gameplay loop
├── instructions/         # Command implementations (play-game, prepare-game, etc.)
├── references/           # Chapter content (THE-INVESTIGATION, THE-HANDS-ON, etc.)
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

## Content Standards

### Writing Style

- Keep skill files clear and actionable for AI agents
- Use explicit instructions over vague guidance
- Include Monster dialogue examples for voice consistency
- One concept per section

### File Size

- **Maximum 200 lines per file** — split larger files into focused modules
- Prefer many small, focused files over few large files

### Naming Conventions

- Files: `kebab-case.md` or `UPPER-KEBAB-CASE.md` for reference files
- Scripts: `kebab-case.cjs`

### Script Standards (CJS files)

- Plain JavaScript (.cjs) — no build step required
- Agents execute directly via `node <script>`
- Self-contained with no external dependencies

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
- Keep files under 200 lines
- Deploy skill changes after edits

### Ask First

- Major architectural changes
- Adding new scripts or dependencies
- Changing state schema
- Modifying shared skill instructions

### Never Do

- Edit `.cursor/skills/onboardme/` directly (edit `skills/onboardme/` instead)
- Commit secrets or API keys
- Break Monster voice consistency
- Skip deployment after skill changes

---

## Project Structure

```
onboardme/
├── skills/onboardme/     # Skill source of truth (the product)
│   ├── SKILL.md          # Monster persona & commands
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

*Document Version: 1.0*
*Last Updated: 2026-02-06*
