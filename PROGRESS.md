# OnboardMe — Progress Tracker

> **Status**: Milestone 1 Complete  
> **Current Focus**: Ready for Milestone 2 — Chapter 2 and additional features

---

## How to Use This File

**Before starting work:**
1. Check this file for the next `pending` task
2. Mark the task as `in_progress`
3. Complete the work
4. Mark the task as `completed`
5. Move to the next task

**Task States:**
- `pending` — Not started
- `in_progress` — Currently being worked on
- `completed` — Done and verified
- `blocked` — Waiting on another task or decision

---

## Architecture Pivot: CLI → Agent Skills

OnboardMe has pivoted from a CLI tool to an agent-skills framework. The game now runs entirely within coding agent platforms (Cursor, Claude Code) through skill files.

**Key Changes:**
- The agent IS the Monster (not a CLI rendering the Monster)
- Games are conversational, not multiple-choice
- Editor files serve as the game board (CASE_FILE.md, FLOW_MAP.md, etc.)
- State persists in `.onboardme/state.json`

**Documentation Foundation (Complete):**
- `context/agent/SKILL-CONTRACT.md` — Skill template with rubrics
- `context/agent/STATE-SCHEMA.md` — State schema with versioning
- `context/agent/AGENT-AS-MONSTER.md` — Monster character embodiment
- `context/agent/CONVERSATIONAL-GAMEPLAY.md` — Multi-turn investigation design
- `context/agent/EDITOR-AS-UI.md` — Files as game boards
- `context/agent/DYNAMIC-EXPERIENCE.md` — Adaptive difficulty
- `context/agent/SAFETY-RULES.md` — Agent behavioral boundaries

**Chapter Design (Complete):**
- `context/chapters/01-THE-INVESTIGATION.md` — 20 min, produces CASE_FILE.md
- `context/chapters/02-THE-HANDS-ON.md` — 15 min, get project running
- `context/chapters/03-THE-DEEP-DIVE.md` — 25 min, produces FLOW_MAP.md
- `context/chapters/04-THE-HUNT.md` — 30 min, bug fix + IMPACT_ANALYSIS.md
- `context/chapters/05-THE-BOSS-BATTLE.md` — 15 min, produces CODEBASE_KNOWLEDGE.md

---

## Milestone 1: Orchestrator MVP

**Goal**: Create the core orchestrator skill and state management that enables gameplay within coding agents.

**Success Criteria**:
- [x] SKILL.md orchestrator skill with commands
- [x] state.json management (read/write/migrate)
- [x] Prepare Game command implementation
- [x] Play Game command implementation
- [x] Status command implementation
- [x] Basic chapter progression tracking

---

### Tasks

#### 1.1 Create Skill Structure
`completed`

**Goal**: Create the skill directory following Agent Skills standard.

**Files created**:
- `skills/onboardme/SKILL.md` — Main orchestrator skill with YAML frontmatter

**Contents**:
- YAML frontmatter (name, description, license, metadata)
- Monster persona and voice instructions
- State management instructions
- Command sections (Prepare Game, Play Game, Status, Hint, Reset)
- Gameplay loop and rubric
- Recovery patterns
- Safety rules

**Completed**:
- Follows Agent Skills standard
- Clear command descriptions
- Persona lock mechanism (never break character)
- References state-manager.cjs for state operations

---

#### 1.2 State Manager Script
`completed`

**Goal**: Create JavaScript utilities for state management (no TypeScript compilation needed).

**Files created**:
- `skills/onboardme/scripts/state-manager.cjs` — State read/write utilities

**CLI commands**:
- `node state-manager.cjs read` — Load and return state
- `node state-manager.cjs write '<json>'` — Deep merge updates into state
- `node state-manager.cjs init '<repo-json>'` — Initialize new game
- `node state-manager.cjs reset` — Delete all state
- `node state-manager.cjs add-question '<json>'` — Add question result
- `node state-manager.cjs update-mood <tier>` — Update Monster mood

**Completed**:
- Follows STATE-SCHEMA.md exactly
- Handles missing/corrupted state gracefully
- Auto-backup before writes
- Schema version checking and migration support
- Deep merge for partial updates

---

#### 1.3 Commands in SKILL.md
`completed`

**Goal**: All game commands documented in SKILL.md for agent interpretation.

**Commands implemented**:
- **Prepare Game** — Scan repo, initialize state, report in Monster voice
- **Play Game** — Check prepared, load chapter reference, begin/resume gameplay
- **Status** — Display progress, score, lives, Monster mood
- **Hint** — Progressive hints (costs commits), 4 levels
- **Reset** — Delete state with confirmation

**Completed**:
- All commands with clear agent instructions
- Monster dialogue examples for each
- State management integration
- Recovery patterns for edge cases

---

#### 1.4 Chapter 1 Reference File
`completed`

**Goal**: Create the Investigation chapter reference file.

**Files created**:
- `skills/onboardme/references/THE-INVESTIGATION.md` — Chapter 1 instructions

**Contents**:
- 4-phase investigation flow (~20 min)
- CASE_FILE.md artifact creation template
- Scoring rubric (Incorrect/Partial/Correct/Deep)
- Monster dialogue examples for each phase
- Recovery patterns and timing guidelines
- State management instructions (reads/writes)

**Completed**:
- Follows chapter design from `context/chapters/01-THE-INVESTIGATION.md`
- Full Monster dialogue library for this chapter
- Clear agent instructions for each phase
- Rubrics for incorrect/partial/correct/deep answers
- Progressive hint system
- Chapter completion criteria clear

---

#### 1.5 Integration Test: State Manager
`completed`

**Goal**: Verify state manager works correctly.

**Tested**:
1. `node state-manager.cjs read` — Returns default state
2. `node state-manager.cjs init '{"name":"test","path":"/tmp/test"}'` — Creates state.json
3. `node state-manager.cjs write '{"player":{"totalCommits":5}}'` — Deep merges updates
4. `node state-manager.cjs reset` — Deletes .onboardme directory
5. Backup created before writes

**Completed**:
- All CLI commands work without errors
- State persists and loads correctly
- Backup mechanism works
- Deep merge preserves existing fields

---

## Milestone 2: One Killer Game

**Goal**: Complete Chapter 1 (The Investigation) as a fully playable experience.

**Success Criteria**:
- [x] Context gathering system (repo-knowledge.json)
- [ ] Full investigation flow with 5 evidence categories
- [ ] CASE_FILE.md artifact generation
- [ ] Tiered rubric evaluation working
- [ ] Monster reactions based on answer quality
- [ ] Chapter completion triggers progression

---

### Tasks

#### 2.0 Context Gathering System
`completed`

**Goal**: Implement the Monster's persistent knowledge base so it can validate answers consistently across sessions.

**Files created/updated**:
- `skills/onboardme/scripts/knowledge-manager.cjs` — Read/write/add-discovery for repo-knowledge.json
- `skills/onboardme/commands/prepare-game.md` — Detailed repo analysis instructions (Priority 1/2/3 files, JSON schema)
- `skills/onboardme/commands/play-game.md` — Load knowledge at session start, save discoveries after validated answers
- `skills/onboardme/SKILL.md` — Added Knowledge Management section

**How it works**:
- **Prepare**: Agent reads 8-12 key files, builds `repo-knowledge.json` as answer key
- **Play**: Agent loads knowledge, validates Ch 1-2 answers against it, reads live files for Ch 3-5
- **Discover**: After each correct/deep answer, fact is appended to `discoveries[]`
- **Resume**: New session reads `state.json` + `repo-knowledge.json` for full continuity

**Design reference**: `context/agent/CONTEXT-GATHERING.md`

---

#### 2.1 Evidence Examination Flow
`pending`

**Goal**: Implement the 5-category evidence examination from THE-INVESTIGATION.md.

**Categories**:
1. Project Identity (README, package.json)
2. Architecture (folder structure, entry points)
3. Dependencies (tech stack, frameworks)
4. Build & Scripts (npm scripts, config files)
5. Code Patterns (naming conventions, structure)

---

#### 2.2 CASE_FILE.md Artifact
`pending`

**Goal**: Create the CASE_FILE.md artifact that builds during investigation.

**Sections**:
- Evidence Log (what player examined)
- Key Findings (correct deductions)
- Monster's Notes (commentary)
- Final Assessment (chapter score)

---

#### 2.3 Rubric Evaluation
`pending`

**Goal**: Implement tiered answer evaluation per SKILL-CONTRACT.md.

**Tiers**:
- Incorrect: Fundamentally wrong understanding
- Partial: Right direction, missing details
- Correct: Accurate and complete
- Deep: Shows insight beyond the question

---

#### 2.4 Monster Reactions
`pending`

**Goal**: Dynamic Monster responses based on answer quality.

**Reactions mapped to**:
- Answer tier (dismissive → impressed)
- Cumulative performance (mood tracking)
- Time taken (impatience vs respect)

---

#### 2.5 Playtest & Iterate
`pending`

**Goal**: Playtest Chapter 1 and iterate based on experience.

**Before proceeding to Milestone 3**, must playtest with real user.

---

## Milestone 3: One "Real Action" Game

**Goal**: Complete Chapter 4 (The Hunt) where players actually fix bugs.

**Success Criteria**:
- [ ] Bug hunt with actual code changes
- [ ] Agent validates fixes by running tests
- [ ] IMPACT_ANALYSIS.md artifact generation
- [ ] Monster's increasingly desperate reactions

---

### Tasks

#### 3.1 Bug Hunt Flow
`pending`

Implement bug discovery and fixing flow from THE-HUNT.md.

---

#### 3.2 Fix Validation
`pending`

Agent runs tests to validate player's fixes.

---

#### 3.3 Impact Analysis Artifact
`pending`

Generate IMPACT_ANALYSIS.md showing what was fixed and why.

---

#### 3.4 Playtest & Iterate
`pending`

Playtest Chapter 4 before proceeding.

---

## Milestone 4: Monster Voice + Progression

**Goal**: Implement the full Monster persona with emotional arc and progression tracking.

**Success Criteria**:
- [ ] Persona lock mechanism (never breaks character)
- [ ] Snark slider (friendly → full-monster)
- [ ] Emotional arc tracking across sessions
- [ ] Memorable exchange logging
- [ ] Mood-appropriate dialogue selection

---

## Milestone 5: Remaining Chapters

**Goal**: Implement Chapters 2, 3, and 5.

**Chapters**:
- Chapter 2: The Hands-On (get project running)
- Chapter 3: The Deep Dive (flow tracing)
- Chapter 5: The Boss Battle (final confrontation)

**Success Criteria**:
- [ ] All 5 chapters playable
- [ ] CODEBASE_KNOWLEDGE.md generated on victory
- [ ] Full emotional arc from dismissive to peaceful

---

## Milestone 6: Polish + Testing

**Goal**: Quality assurance and testing framework.

**Success Criteria**:
- [ ] Golden transcript tests (expected conversation flows)
- [ ] Character consistency testing
- [ ] State migration tests
- [ ] Edge case handling (stuck players, invalid input)

---

## Milestone 7: Documentation Rewrite

**Goal**: Update all documentation to reflect the implemented system.

**Success Criteria**:
- [x] PRD.md reflects agent-skills reality
- [x] ARCHITECTURE.md updated for skill-based system
- [ ] README.md with setup instructions
- [ ] Archive deprecated CLI documentation

---

## Completed Milestones

### Milestone 0: Foundation ✓

**Goal**: Create foundational design documents for the agent-skills pivot.

**Completed**: 2026-02-05

**Deliverables**:
- [x] SKILL-CONTRACT.md — Template for all game skills
- [x] STATE-SCHEMA.md — State persistence schema
- [x] AGENT-AS-MONSTER.md — Monster character embodiment
- [x] CONVERSATIONAL-GAMEPLAY.md — Multi-turn game design
- [x] EDITOR-AS-UI.md — Files as game boards
- [x] DYNAMIC-EXPERIENCE.md — Adaptive difficulty
- [x] SAFETY-RULES.md — Agent behavioral boundaries
- [x] Chapter design documents (01-05)
- [x] MONSTER-ASCII.md — Visual assets for agent rendering

---

## Legacy: CLI Implementation

The original CLI implementation (Milestone 1-3 of old plan) exists in `src/` but is being superseded by the agent-skills approach. Key learnings from CLI work:

- Game plugin architecture (reusable concepts)
- State management patterns (adapted for state.json)
- File-detective game logic (informing Chapter 1 design)

This code may be archived or adapted for the state-manager.ts utilities.

---

## Notes

### Decisions Made
- Agent IS the Monster (not rendering the Monster)
- Conversational gameplay (not multiple-choice)
- Editor files as game boards (CASE_FILE.md, etc.)
- 5 consolidated chapters (not 9+ individual games)
- Slash commands for agent interaction

### Open Questions
- How to handle multiple coding agent platforms (Cursor vs Claude Code)?
- State file location: `.onboardme/` in target repo or elsewhere?

### Blockers
- None currently

---

*Last Updated: 2026-02-05 (Agent-Skills Pivot Complete — PRD & Architecture Rewritten)*
