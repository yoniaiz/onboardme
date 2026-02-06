# Context Gathering System

The Monster's knowledge must persist across sessions. This document defines how we analyze target repositories and maintain consistent knowledge throughout gameplay.

---

## Goals

1. **Persistent Knowledge** — Monster knows the codebase even in new chat sessions
2. **Fast Prepare** — Analysis completes in ~30 seconds, not minutes
3. **Consistent Validation** — Same answer key regardless of session
4. **Growing Intelligence** — Knowledge accumulates as player discovers things
5. **Compact Footprint** — Entire knowledge base fits in <1k tokens

---

## Design Principles

### Analyze Once, Grow Through Play

The prepare phase extracts metadata. Gameplay adds depth.

```
PREPARE PHASE              GAMEPLAY PHASE
┌──────────────────┐      ┌──────────────────────────────┐
│ Read manifests   │      │ Load repo-knowledge.json     │
│ Read README      │      │ Validate against answer key  │
│ Scan structure   │ ──►  │ Read live files for Ch 3-5   │
│ Save answer key  │      │ Append validated discoveries  │
└──────────────────┘      └──────────────────────────────┘
     ~30 seconds                   During gameplay
```

### One File, Not Six

A single `repo-knowledge.json` replaces multiple markdown narratives. The agent generates narrative on the fly — that's what LLMs are good at. Pre-writing prose the agent will never read verbatim is waste.

### Seed + Discover

```
Prepare: Agent extracts metadata ──► repo-knowledge.json (seed)
                                            │
Play: Player answers validated ──► discoveries[] grows
                                            │
Resume: New session reads one file ──► Full continuity
```

---

## Knowledge File

**Location:** `.onboardme/context/repo-knowledge.json`

This is the Monster's brain — the answer key for validation and the accumulator for discoveries.

### Schema

```json
{
  "schemaVersion": 1,
  "analyzedAt": "ISO timestamp",
  "analyzedFiles": ["package.json", "README.md", "..."],

  "identity": {
    "name": "project-name",
    "language": "TypeScript",
    "runtime": "Node.js",
    "type": "REST API",
    "framework": "Express",
    "version": "2.1.0"
  },

  "techStack": {
    "database": {
      "name": "PostgreSQL",
      "orm": "Prisma",
      "evidence": "prisma/schema.prisma"
    },
    "testing": {
      "framework": "Jest",
      "location": "tests/",
      "evidence": "package.json"
    },
    "linting": {
      "tool": "ESLint",
      "evidence": ".eslintrc.js"
    },
    "ci": {
      "platform": "GitHub Actions",
      "evidence": ".github/workflows/"
    }
  },

  "commands": {
    "run": "npm start",
    "dev": "npm run dev",
    "test": "npm test",
    "build": "npm run build",
    "lint": "npm run lint"
  },

  "structure": {
    "entryPoint": "src/index.ts",
    "sourceDir": "src/",
    "testDir": "tests/",
    "keyDirectories": {
      "src/routes/": "API route handlers",
      "src/services/": "Business logic",
      "src/models/": "Database models"
    },
    "configFiles": ["tsconfig.json", ".eslintrc.js", "docker-compose.yml"]
  },

  "envVars": [
    { "name": "DATABASE_URL", "required": true, "source": ".env.example" },
    { "name": "JWT_SECRET", "required": true, "source": ".env.example" }
  ],

  "readme": {
    "exists": true,
    "hasSetupInstructions": true,
    "summary": "One-line description of what the project does"
  },

  "discoveries": []
}
```

### Field Guide

| Section | Source | When Populated | Used By |
|---------|--------|----------------|---------|
| `identity` | Package manifest, folder name | Prepare | Ch 1, Ch 5 |
| `techStack` | Dependencies, config files | Prepare | Ch 1, Ch 3 |
| `commands` | Package manifest scripts | Prepare | Ch 1, Ch 2 |
| `structure` | Directory listing, entry points | Prepare | Ch 1, Ch 3 |
| `envVars` | `.env.example`, docs | Prepare | Ch 2 |
| `readme` | `README.md` | Prepare | Ch 1, Ch 2 |
| `discoveries` | Player answers (validated) | Gameplay | Ch 3, Ch 4, Ch 5 |

### Token Budget

Target: **<1k tokens** for the seed (pre-discoveries). This keeps context window impact minimal while providing full validation capability. Discoveries grow the file but each entry is ~50 tokens.

---

## What to Analyze During Prepare

### Priority 1 — Always Read

These files exist in virtually every project and reveal 80% of identity:

| File | What to Extract |
|------|----------------|
| Package manifest (`package.json`, `Cargo.toml`, `go.mod`, `pyproject.toml`, `pom.xml`, `build.gradle`, `Gemfile`) | Name, version, language, dependencies, scripts |
| `README.md` | Exists? Has setup instructions? One-line summary |
| Root directory listing | Key directories, entry points, config files present |

### Priority 2 — Read If Exists

These files add valuable context when present:

| File | What to Extract |
|------|----------------|
| `.env.example` / `.env.sample` | Required environment variables |
| `docker-compose.yml` | Services (database, cache, queue) |
| Linter/compiler config (`tsconfig.json`, `biome.json`, `.eslintrc`) | Language settings, strictness |
| CI config (`.github/workflows/`, `.gitlab-ci.yml`) | CI platform, test/build pipeline |

### Priority 3 — Scan for Structure

Quick directory listings (one level deep, not recursive):

| Path | What to Extract |
|------|----------------|
| `src/` or `lib/` or `app/` | Key subdirectories and their apparent purpose |
| `tests/` or `test/` or `spec/` | Test organization pattern |

**Total: 8-12 file reads max.** This keeps prepare fast and focused.

---

## How Knowledge Grows

### Phase 1: Seed (Prepare)

Agent reads metadata files and populates `identity`, `techStack`, `commands`, `structure`, `envVars`, `readme`. The `discoveries` array is empty.

The Monster now knows enough for Chapters 1-2:
- "What language is this?" → `identity.language`
- "What's the test command?" → `commands.test`
- "What database?" → `techStack.database.name`

### Phase 2: Accumulate (Chapters 1-2)

As the player answers correctly, validated facts get appended to `discoveries`:

```json
{
  "chapter": "investigation",
  "fact": "Uses layered architecture: routes → services → repositories",
  "tier": "deep",
  "evidence": "src/ folder structure analysis",
  "timestamp": "2026-02-06T10:35:00Z"
}
```

### Phase 3: Deepen (Chapters 3-5)

For deeper questions (data flows, architecture patterns, bug locations), the agent reads **live source files on-demand** during gameplay. This is intentional:

1. Deep analysis during prepare would take too long
2. The player is supposed to discover architecture — pre-computing it defeats the game
3. Live file reading is always accurate (no staleness)
4. The Monster only analyzes what comes up (efficient)

After validation, new facts join `discoveries`:

```json
{
  "chapter": "deep-dive",
  "fact": "Auth flow: JWT middleware → user service → role check",
  "tier": "correct",
  "evidence": "src/middleware/auth.ts → src/services/user.ts",
  "timestamp": "2026-02-06T11:15:00Z"
}
```

### Phase 4: Mastery (Boss Battle)

By Chapter 5, `discoveries` contains a rich, player-validated map of the codebase. The Monster can challenge the player to synthesize everything, referencing specific discoveries from earlier chapters.

---

## Cross-Session Resumption

When a new chat session starts:

```
Agent reads state.json
  → Knows: chapter, score, lives, mood, question history

Agent reads repo-knowledge.json
  → Knows: codebase facts, what player has discovered

Monster has full continuity:
  "You're back. Last time you traced the auth flow
   through three layers. Let's see if you understand
   the data model next."
```

**state.json** = gameplay state (where the player is)
**repo-knowledge.json** = codebase truth (what's known about the repo)

Together they give complete session resumption.

---

## Integration with SKILL.md

### Prepare Game Command

Add to the existing prepare instructions:

```
Read these files to build the Monster's knowledge base:

1. Project manifest — Extract name, language, dependencies, scripts
2. README.md — Extract description, setup instructions presence
3. Root directory listing — Identify key directories, entry points
4. Config files (.env.example, docker-compose, linter configs)

Save analysis to .onboardme/context/repo-knowledge.json.
```

### Play Game Command

Add to the existing play instructions:

```
At session start:
1. Read .onboardme/context/repo-knowledge.json
2. Use identity/techStack/commands for Ch 1-2 validation
3. For Ch 3-5, read actual source files on-demand
4. After each validated answer, append to discoveries[]
5. Periodically save updated repo-knowledge.json
```

### State Manager Integration

The state-manager.cjs script needs new commands:

```bash
node state-manager.cjs read-knowledge        # Read repo-knowledge.json
node state-manager.cjs write-knowledge '...'  # Update repo-knowledge.json
node state-manager.cjs add-discovery '...'    # Append to discoveries[]
```

---

## Runtime File Structure

```
.onboardme/
├── state.json                    # Gameplay state
├── state.backup.json             # Auto-backup
├── context/
│   └── repo-knowledge.json       # Monster's brain (NEW)
└── artifacts/
    ├── CASE_FILE.md              # Ch 1 artifact
    └── ...                       # Other chapter artifacts
```

---

## What This Intentionally Omits

| Omitted | Rationale |
|---------|-----------|
| Markdown narrative files | Agent generates narrative on-the-fly |
| Deep code analysis during prepare | That's gameplay for Ch 3-5 |
| Tree-sitter parsing | Reading manifests and structure suffices |
| Architecture pre-detection | Players discover this; Monster validates on-demand |
| Vector embeddings | Requires infrastructure; file-based approach is simpler |
| Multiple output files | One JSON file, one read, full context |

---

## Implementation Plan

### Step 1: Schema and File Creation

- [ ] Define `repo-knowledge.json` TypeScript interface
- [ ] Add `context/` directory creation to prepare flow
- [ ] Add knowledge read/write commands to state-manager.cjs

### Step 2: Prepare Phase Analysis

- [ ] Implement manifest detection (package.json, Cargo.toml, etc.)
- [ ] Implement README extraction
- [ ] Implement structure scanning
- [ ] Implement config file scanning
- [ ] Save to repo-knowledge.json

### Step 3: Gameplay Integration

- [ ] Update play command to load repo-knowledge.json
- [ ] Use knowledge for Ch 1-2 answer validation
- [ ] Implement on-demand file reading for Ch 3-5
- [ ] Implement discovery accumulation after validated answers

### Step 4: Cross-Session Continuity

- [ ] Test resume with state.json + repo-knowledge.json
- [ ] Verify Monster references discoveries in dialogue
- [ ] Validate consistency across sessions

---

## Research References

This approach draws from established tools:

| Tool | What We Learned |
|------|----------------|
| **Aider repo map** | Compact representation beats comprehensive dumps. Fit the essential context in minimal tokens. |
| **Claude Code /init** | Analyze once → persist to file → read on session start. Single file, not scattered docs. |
| **Repomix** | Git-awareness and targeted file selection over brute-force repo dumps. |
| **REPO-READER** | Gamified Q&A needs indexed knowledge, but files work instead of vector DBs for our scale. |
| **Dev onboarding research** | Learning order (identity → setup → architecture → debug → synthesize) validates our chapter structure. |

---

_Document Version: 2.0_
_Last Updated: 2026-02-06_

_"I don't just see your files. I UNDERSTAND them."_
