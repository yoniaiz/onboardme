# OnboardMe — Progress Tracker

> **Status**: Milestone 1 In Progress  
> **Current Focus**: Orchestrator MVP — skill files and state management

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
- [ ] ONBOARD.md orchestrator skill with slash commands
- [ ] state.json management (read/write/migrate)
- [ ] `/prepare-game` command implementation
- [ ] `/play-game` command implementation
- [ ] `/status` command implementation
- [ ] Basic chapter progression tracking

---

### Tasks

#### 1.1 Create Orchestrator Skill
`in_progress`

**Goal**: Create the main ONBOARD.md skill file that serves as the game's entry point.

**Files to create**:
- `.onboardme/ONBOARD.md` — Main orchestrator skill

**Contents**:
- Skill header with goal and inputs
- Slash command definitions (`/prepare-game`, `/play-game`, `/status`, `/hint`, `/reset-game`)
- Monster persona activation instructions
- Chapter routing logic
- State file references

**Acceptance Criteria**:
- Skill follows SKILL-CONTRACT.md template
- Clear command descriptions for each slash command
- Persona lock mechanism (never break character)
- References state.json for progress tracking

---

#### 1.2 State Manager Script
`pending`

**Goal**: Create TypeScript utilities for state management.

**Files to create**:
- `.onboardme/scripts/state-manager.ts` — State read/write utilities

**Functions needed**:
- `readState()` — Load and validate state.json
- `writeState(state)` — Persist state with backup
- `migrateState(oldState)` — Handle schema version upgrades
- `initializeState(repoInfo)` — Create initial state for new game

**Acceptance Criteria**:
- Follows STATE-SCHEMA.md exactly
- Handles missing/corrupted state gracefully
- Schema version checking and migration
- TypeScript types match state schema

---

#### 1.3 Prepare Game Command
`pending`

**Goal**: Implement `/prepare-game` that analyzes the target repo and generates context.

**Files to update**:
- `.onboardme/ONBOARD.md` — Add prepare-game section

**Behavior**:
1. Scan target repository structure
2. Identify key files (package.json, README, configs)
3. Generate chapter-specific context files
4. Initialize state.json with repo info
5. Report preparation status to user

**Acceptance Criteria**:
- Creates `.onboardme/context/` with gathered intel
- State initialized with repo.id, repo.path, repo.name
- Context files follow chapter requirements
- User sees clear success/failure message

---

#### 1.4 Play Game Command
`pending`

**Goal**: Implement `/play-game` that starts or resumes the game session.

**Files to update**:
- `.onboardme/ONBOARD.md` — Add play-game section

**Behavior**:
1. Check state.json for current progress
2. Load appropriate chapter skill
3. Activate Monster persona
4. Begin or resume gameplay
5. Track progress in state

**Acceptance Criteria**:
- Resumes from last checkpoint if exists
- Loads correct chapter based on progress.currentChapter
- Monster voice activates immediately
- Handles "game not prepared" error gracefully

---

#### 1.5 Status Command
`pending`

**Goal**: Implement `/status` that shows current game progress.

**Files to update**:
- `.onboardme/ONBOARD.md` — Add status section

**Output includes**:
- Current chapter and progress within chapter
- Total score (commits earned)
- Monster mood indicator
- Time played
- Next recommended action

**Acceptance Criteria**:
- Works even when no game started (shows "not initialized")
- Clear visual formatting
- Accurate progress percentages

---

#### 1.6 Chapter 1 Skill File
`pending`

**Goal**: Create the Investigation chapter skill file.

**Files to create**:
- `.onboardme/games/THE-INVESTIGATION.md` — Chapter 1 skill

**Contents**:
- Investigation flow from `01-THE-INVESTIGATION.md`
- CASE_FILE.md artifact creation
- Open-ended question rubrics
- Evidence examination patterns
- Monster dialogue for this chapter

**Acceptance Criteria**:
- Follows SKILL-CONTRACT.md template
- Creates CASE_FILE.md artifact during play
- Rubrics for incorrect/partial/correct/deep answers
- Progressive hint system
- Chapter completion criteria clear

---

#### 1.7 Integration Test: Full Flow
`pending`

**Goal**: Manually test the complete `/prepare-game` → `/play-game` → `/status` flow.

**Test Plan**:
1. Run `/prepare-game` on this repository (onboardme itself)
2. Verify state.json created correctly
3. Run `/play-game` and complete first investigation question
4. Run `/status` to verify progress saved
5. Exit and re-run `/play-game` to verify resume works

**Acceptance Criteria**:
- All commands work without errors
- State persists between sessions
- Monster voice is consistent
- CASE_FILE.md artifact created

---

## Milestone 2: One Killer Game

**Goal**: Complete Chapter 1 (The Investigation) as a fully playable experience.

**Success Criteria**:
- [ ] Full investigation flow with 5 evidence categories
- [ ] CASE_FILE.md artifact generation
- [ ] Tiered rubric evaluation working
- [ ] Monster reactions based on answer quality
- [ ] Chapter completion triggers progression

---

### Tasks

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
- [ ] PRD.md reflects agent-skills reality
- [ ] ARCHITECTURE.md updated for skill-based system
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

*Last Updated: 2026-02-05 (Agent-Skills Pivot — Milestone 1 Started)*
