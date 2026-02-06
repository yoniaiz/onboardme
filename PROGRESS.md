# OnboardMe — Progress Tracker

> **Status**: Milestone 4 Complete  
> **Current Focus**: Ready for Milestone 5

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
- [x] Full investigation flow with 4 phases (Identity, Tech Stack, Documentation, Synthesis)
- [x] CASE_FILE.md artifact generation
- [x] Tiered rubric evaluation working (incorrect/partial/correct/deep)
- [x] Monster reactions based on answer quality (mood shifts, respect tracking)
- [x] Chapter completion triggers progression (investigation -> hands-on)

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
`completed`

**Goal**: Implement the 4-phase investigation flow in THE-INVESTIGATION.md.

**Phases** (refined from original 5 categories):
1. Project Identity (~5 min) — Language, project type, framework
2. Tech Stack Discovery (~7 min) — Database, testing, build tools, services
3. Documentation Hunt (~5 min) — Run commands, env vars, prerequisites
4. Final Deduction (~3 min) — Synthesis of how components connect

**Completed**: Proven in playtest (2026-02-06). Full 4-phase flow working end-to-end with Monster dialogue, evidence logging, and progressive difficulty.

---

#### 2.2 CASE_FILE.md Artifact
`completed`

**Goal**: Create the CASE_FILE.md artifact that builds during investigation.

**Sections**:
- Evidence Log (what player examined)
- Key Findings (correct deductions)
- Monster's Notes (commentary)
- Final Assessment (chapter score)

**Completed**: Generated during playtest. Artifact created at `.onboardme/artifacts/CASE_FILE.md` with evidence log, findings, case summary, and Monster notes.

---

#### 2.3 Rubric Evaluation
`completed`

**Goal**: Implement tiered answer evaluation per SKILL-CONTRACT.md.

**Tiers**:
- Incorrect: 0 commits, -1 life
- Partial: 1 commit
- Correct: 2 commits
- Deep: 3 commits, +15 respect

**Completed**: All 4 tiers working in playtest. Commit awards, life deductions, and respect adjustments applied correctly via state-manager.cjs.

---

#### 2.4 Monster Reactions
`completed`

**Goal**: Dynamic Monster responses based on answer quality.

**Reactions mapped to**:
- Answer tier (dismissive → impressed)
- Cumulative performance (mood tracking via update-mood)
- Respect level adjustments (+15 for deep answers)

**Completed**: Mood shifts visible in playtest (dismissive -> annoyed). Respect level tracking working. Emotional beats with commit announcements confirmed.

---

#### 2.5 Playtest & Iterate
`completed`

**Goal**: Playtest Chapter 1 and iterate based on experience.

**Playtest completed** (2026-02-06): Full Chapter 1 run with detailed feedback in `feedback/onboardme/2026-02-06T12-30-00Z.json` (overall score: 1.81/3).

**All feedback addressed:**
- [x] Monster conflating player with code author → Fixed with third-person language instructions
- [x] Mood progression mostly internal → Added mood-surfacing instructions and example lines
- [x] Scoring tiers never explained to player → Added to THE-INVESTIGATION.md opening dialogue
- [x] Pacing between challenges → Added breathing-beat guidance to SKILL.md gameplay loop

**Bonus work completed (ahead of schedule):**
- Chapter 2 reference: `references/THE-HANDS-ON.md` — Full 3-phase flow
- Chapter 5 reference: `references/THE-BOSS-BATTLE.md` — Full 4-phase flow

---

## Milestone 3: Act 2 — Chapters 3 + 4

**Goal**: Complete Chapters 3 (The Deep Dive) and 4 (The Hunt) — the gameplay heart of OnboardMe where the player evolves from understanding code to changing it, and the Monster transitions from worried to desperate.

**Success Criteria**:
- [x] Chapter 3 reference: collaborative diagram building, FLOW_MAP.md artifact
- [x] Chapter 4 reference: Monster-as-saboteur mechanic with git game branch
- [x] Game branch setup in prepare-game (onboardme/game branch)
- [x] State manager supports git branch tracking
- [x] Safety rules sanction game branch mechanic
- [x] Playtest Chapters 2→3→4 sequentially on OnboardMe codebase
- [x] Monster emotional arc: annoyed → worried → desperate
- [x] State management commands running during gameplay (verified)

---

### Tasks

#### 3.1 State Manager Updates
`completed`

Added `git` section to state schema: `gameBranch`, `originalBranch`, `branchCreated` — enables tracking the game branch for Ch4 sabotage and post-game cleanup.

---

#### 3.2 Safety Rules Update
`completed`

Added Section 6 (Game Branch) to SAFETY-RULES.md — explicitly sanctions the `onboardme/game` branch as a game mechanic, defines what branch operations are safe within the game, and what remains forbidden.

---

#### 3.3 Prepare Game Branch
`completed`

Updated prepare-game.md with Step 5: creates `onboardme/game` branch during preparation. Handles uncommitted changes (player chooses commit/stash/revert), records original branch in state, confirms branch creation to player.

---

#### 3.4 Chapter 3 Reference (The Deep Dive)
`completed`

Created `skills/onboardme/references/THE-DEEP-DIVE.md` — 3-phase collaborative flow:

1. **Flow Trace** (~10 min): Trace user action from entry to data layer, build Mermaid diagrams
2. **Entity Relations** (~8 min): Map how models/types connect, build ER diagram
3. **Test Stories** (~7 min): Extract business rules from test assertions

Key design: Monster is a reluctant collaborator (not just evaluator). Backstory leaks. Mood: annoyed → worried. FLOW_MAP.md artifact builds progressively.

---

#### 3.5 Chapter 4 Reference (The Hunt)
`completed`

Created `skills/onboardme/references/THE-HUNT.md` — Monster-as-saboteur mechanic:

1. **The Sabotage** (~3 min): Agent picks target from Ch1-3 discoveries, introduces subtle bug, commits with misleading message
2. **The Hunt** (~15 min): Player diagnoses from test failures, traces root cause, explains WHY, fixes the code, agent verifies
3. **Feature Location** (~10 min): Player plans where new code would live (architectural understanding)
4. **Impact Reflection** (~2 min): "If I removed [service], what would break?"

Key design: Scoring rewards understanding, not just finding. Git-based debugging is valid. No-tests fallback included. Optional second sabotage for fast players.

---

#### 3.6 Chapter Design Update
`completed`

Updated `context/chapters/04-THE-HUNT.md` design doc to v2.0 — reflects Monster-as-saboteur mechanic, game branch workflow, sabotage design guidelines, and no-tests fallback strategy.

---

#### 3.7 Install and Verify
`completed`

Deployed skill changes via install-skill.sh. Play-game routing verified for `deep-dive` and `hunt` chapters.

---

#### 3.8 Playtest & Iterate
`completed`

Playtested Chapters 2→3→4 sequentially on OnboardMe codebase (2026-02-06).

**Results:** All chapters playable. Monster emotional arc working (annoyed → worried → desperate). State management commands running during gameplay. Sabotage mechanic worked — Monster broke scoring.ts, player fixed it, tests verified.

**Feedback addressed:**
- [x] State management commands not running → Added CRITICAL sections with explicit bash commands to play-game.md and all 5 reference files
- [x] Hands-On phase stops when CLI requires TTY → Rewrote Phase 2: agent asks player to interact and report back (works for any project type)
- [x] Mermaid diagrams require markdown viewer → Replaced with ASCII text diagrams in all FLOW_MAP.md templates
- [x] Sabotage visible in Cursor UI diff → Agent uses temp `node -e` script instead of editor tools
- [x] Sabotage picked area with no test coverage → Added "verify tests pass BEFORE sabotaging" step

---

#### 3.4 Chapter 3 Reference (The Deep Dive)
`completed`

Created `skills/onboardme/references/THE-DEEP-DIVE.md` — 3-phase collaborative flow:

1. **Flow Trace** (~10 min): Trace user action from entry to data layer, build ASCII flow diagrams
2. **Entity Relations** (~8 min): Map how models/types connect, build ASCII relationship diagrams
3. **Test Stories** (~7 min): Extract business rules from test assertions

Key design: Monster is a reluctant collaborator (not just evaluator). Backstory leaks. Mood: annoyed → worried. FLOW_MAP.md artifact builds progressively. ASCII diagrams (not Mermaid) for universal readability.

---

## Milestone 4: Monster Voice + Progression

**Goal**: Implement the full Monster persona with emotional arc and progression tracking.

**Success Criteria**:
- [x] Persona lock mechanism (never breaks character)
- [x] Snark slider (friendly → full-monster)
- [x] Emotional arc tracking across sessions
- [x] Memorable exchange logging
- [x] Mood-appropriate dialogue selection

---

### Tasks

#### 4.1 Snark Slider
`completed`

Added tone selection to the game flow:
- `state-manager.cjs`: New `set-tone` command (validates friendly/balanced/spicy/full-monster)
- `prepare-game.md`: New Step 7 — "How much pain do you want?" prompt with 4 tone levels
- `SKILL.md`: New "Tone Adjustment" section with per-tone behavioral guidelines (hint generosity, mockery intensity, partial credit, pacing)
- `play-game.md`: Step 2.5 — reads tone preference before gameplay
- `SKILL.md` commands table: Added "change tone" trigger for mid-game adjustment

---

#### 4.2 Player Name + Game-Over + Game-Complete
`completed`

Three critical flow gaps closed:
- `prepare-game.md`: New Step 5 — auto-detects player name from `git config user.name`, falls back to "Unknown Agent", Monster reacts without asking
- `play-game.md`: Step 2.7 — game-over flow (0 lives): offers continue (costs 5 commits, 3 lives restored) or start over
- `play-game.md`: Step 2.8 — game-complete flow (all 5 chapters done): victory summary, artifact list, branch cleanup options (keep/merge/delete)
- `SKILL.md`: Added "Game Over" and "Game Complete" sections

---

#### 4.3 Memorable Exchange Mechanics
`completed`

Exchanges now have save/load mechanics:
- `state-manager.cjs`: New `add-exchange` command — appends to `memorableExchanges[]` with chapter and timestamp
- `play-game.md`: Step 5.4 — explicit `add-exchange` instruction after notable moments (1-3 per chapter)
- All 5 reference files: Added `memorableExchanges[]` to "During chapter, update" sections
- Investigation + Hands-On: Added `memorableExchanges[]` to "At chapter start, read" sections (were missing)

---

#### 4.4 Emotional Arc Completion
`completed`

Full mood arc now works:
- `state-manager.cjs`: Rewrote `updateMonsterMood()` — supports `desperate→peaceful` (when boss completed), chapter-based mood minimums (Ch3+ = at least annoyed), backward transitions on failure streaks
- `SKILL.md`: New "Emotional Arc" section with chapter-to-mood mapping and mood-specific behavior guidelines
- `play-game.md`: Step 2.6 — explicit mood check before generating dialogue

---

#### 4.5 Boss Battle Polish
`completed`

Boss battle now has full templates and state commands:
- `THE-BOSS-BATTLE.md`: Added BOSS_BATTLE.md artifact template (challenge, requirements, constraints, review log)
- `THE-BOSS-BATTLE.md`: Added CODEBASE_KNOWLEDGE.md template (project identity, how to run, architecture, debugging notes, contribution, monster's notes, key discoveries)
- `THE-BOSS-BATTLE.md`: Added explicit bash commands for all state updates (add-question, write chaptersCompleted, set mood to peaceful, add-exchange)
- Fixed chapter name inconsistency: `"boss-battle"` → `"boss"` to match routing

---

#### 4.6 Reset + Safety Cleanup
`completed`

- `reset-game.md`: Now reads git state before deleting, switches to original branch, asks player about deleting game branch, then resets
- `SAFETY-RULES.md`: Fixed artifact path tree — moved CASE_FILE.md, FLOW_MAP.md under `.onboardme/artifacts/`, added all 5 artifact files and context directory

---

#### 4.7 Session Flow
`completed`

- `play-game.md`: Step 6 — auto-continue between chapters (no need to say "play game" again), with graceful stop option and session summary save
- `play-game.md`: Step 7 — player style tracking (methodical/aggressive/balanced/struggling) based on hint usage, accuracy, and response patterns

---

#### 4.8 Install and Verify
`completed`

- Ran `bash scripts/install-skill.sh` — all 13 files deployed
- Verified `set-tone`, `add-exchange`, `update-mood` commands work
- Verified deployed files match source (diff clean)

---

## Milestone 5: Full Game Integration

**Goal**: All 5 chapters playable end-to-end with full emotional arc.

**Remaining**:
- Playtest full Ch1→Ch2→Ch3→Ch4→Ch5 sequence
- Verify chapter transitions and state continuity
- CODEBASE_KNOWLEDGE.md generated on victory (Ch5)
- Full emotional arc: dismissive → annoyed → worried → desperate → peaceful

**Success Criteria**:
- [ ] All 5 chapters playable sequentially
- [ ] State persists across sessions
- [ ] All artifacts generated (CASE_FILE, FLOW_MAP, IMPACT_ANALYSIS, CODEBASE_KNOWLEDGE)
- [ ] Monster mood arc visible throughout

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

### Milestone 3: Act 2 ✓

**Goal**: Chapters 3 (Deep Dive) + 4 (The Hunt) — player evolves from understanding code to changing it.

**Completed**: 2026-02-06

**Deliverables**:
- [x] THE-DEEP-DIVE.md — Collaborative tracing, ASCII diagrams, FLOW_MAP.md artifact
- [x] THE-HUNT.md — Monster-as-saboteur, temp script sabotage, test-verified, IMPACT_ANALYSIS.md
- [x] Game branch in prepare-game (onboardme/game)
- [x] State manager git tracking (gameBranch, originalBranch)
- [x] Safety rules updated for game branch
- [x] State management commands embedded in all reference files
- [x] Playtest Ch2→3→4 with iteration on feedback

---

### Milestone 2: One Killer Game ✓

**Goal**: Complete Chapter 1 (The Investigation) as a fully playable experience.

**Completed**: 2026-02-06

---

### Milestone 1: Orchestrator MVP ✓

**Goal**: Core orchestrator skill and state management.

**Completed**: 2026-02-06

---

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

*Last Updated: 2026-02-06 (Milestone 4 complete — Monster voice, snark slider, emotional arc, memorable exchanges, game-over/complete flows, session continuity)*
