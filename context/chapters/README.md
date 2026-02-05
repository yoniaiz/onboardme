# OnboardMe Chapters

This folder contains the 5 consolidated game chapters for the agent-skills model of OnboardMe.

---

## Chapter Overview

| Chapter | Duration | Artifact | Consolidates |
|---------|----------|----------|--------------|
| **01 — The Investigation** | 20 min | `CASE_FILE.md` | file-detective, docs-speedread |
| **02 — The Hands-On** | 15 min | Running project | npm-start-challenge |
| **03 — The Deep Dive** | 25 min | `FLOW_MAP.md` | flow-trace, connect-relations, test-stories |
| **04 — The Hunt** | 30 min | `IMPACT_ANALYSIS.md` + bug fix | grep-hunt, feature-locate |
| **05 — The Boss Battle** | 15 min | `CODEBASE_KNOWLEDGE.md` | spaghetti-monster boss |

**Total Experience:** ~105 minutes (1h 45m)

---

## File Structure

```
chapters/
├── README.md                 # This file
├── 01-THE-INVESTIGATION.md   # Chapter 1 skill definition
├── 02-THE-HANDS-ON.md        # Chapter 2 skill definition
├── 03-THE-DEEP-DIVE.md       # Chapter 3 skill definition
├── 04-THE-HUNT.md            # Chapter 4 skill definition
├── 05-THE-BOSS-BATTLE.md     # Chapter 5 skill definition
└── MONSTER-ASCII.md          # Visual assets for Monster rendering
```

---

## How Chapters Work

Each chapter follows the **SKILL-CONTRACT.md** template:

1. **Goal** — What the player learns
2. **Inputs** — Files and commands the agent can access
3. **State** — What it reads/writes to state.json
4. **Rubric** — 4-tier evaluation criteria
5. **Flow** — Detailed gameplay phases
6. **Recovery** — Handling stuck players, disputes, derails
7. **Timing** — Expected duration and checkpoints

---

## Design Principles

### Agent IS the Monster

The coding agent doesn't just facilitate the game — it embodies the Spaghetti Code Monster character. All dialogue, reactions, and feedback come through the Monster's voice.

### Editor as UI

Files become game boards:
- `CASE_FILE.md` — Evidence collection
- `FLOW_MAP.md` — Collaborative diagrams
- `IMPACT_ANALYSIS.md` — Bug analysis
- `BOSS_BATTLE.md` — Battle status
- `CODEBASE_KNOWLEDGE.md` — Final knowledge export

### Active Tools

The agent doesn't just ask questions — it:
- Runs commands and shows output
- Reads files and discusses findings
- Searches code and validates claims
- Verifies fixes by running tests

---

## Progression

```
Investigation → Hands-On → Deep Dive → Hunt → Boss Battle
    |              |           |         |         |
 identity       running     flows    bugs/fixes  mastery
```

Each chapter builds on prior knowledge:
- Investigation teaches what the project IS
- Hands-On makes it real by running it
- Deep Dive reveals how it WORKS
- Hunt applies knowledge to find/fix issues
- Boss Battle proves comprehensive understanding

---

## Artifacts Produced

By the end of all chapters, the `.onboardme/artifacts/` folder contains:

```
.onboardme/
└── artifacts/
    ├── CASE_FILE.md           # Investigation findings
    ├── FLOW_MAP.md            # Architecture diagrams
    ├── IMPACT_ANALYSIS.md     # Bug hunt results
    ├── BOSS_BATTLE.md         # Battle log
    └── CODEBASE_KNOWLEDGE.md  # Complete knowledge export
```

These artifacts serve as real documentation — useful beyond the game.

---

## Migrated From

This chapter structure consolidates the previous `context/games/` folder:

| Old Game | New Location |
|----------|--------------|
| `todo-0-docs-speedread` | Chapter 1 |
| `todo-0-file-detective` | Chapter 1 |
| `todo-0-connect-relations` | Chapter 3 |
| `todo-1-npm-start-challenge` | Chapter 2 |
| `todo-1-flow-trace` | Chapter 3 |
| `todo-1-test-stories` | Chapter 3 |
| `todo-2-grep-hunt` | Chapter 4 |
| `todo-2-feature-locate` | Chapter 4 |
| `fixme-spaghetti-monster` | Chapter 5 |

The old `context/games/` folder is retained for reference but the canonical game definitions are now in this chapters folder.

---

_Document Version: 1.0_
_Last Updated: 2026-02-05_
