# OnboardMe — Progress Tracker

> **Status**: Milestone 11 In Progress  
> **Current Focus**: Phase Tracking & Instruction Hooks

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

**Success Criteria**:
- [x] All 5 chapters playable sequentially
- [x] State persists across sessions
- [x] All artifacts generated (CASE_FILE, FLOW_MAP, IMPACT_ANALYSIS, BOSS_BATTLE, CODEBASE_KNOWLEDGE)
- [x] Monster mood arc visible throughout
- [x] Explicit state management bash commands in all 5 reference files

---

### Tasks

#### 5.1 Add State Commands to THE-INVESTIGATION.md
`completed`

Added "CRITICAL: State Commands" section with explicit bash commands for `add-question`, `update-mood`, `add-exchange`, `add-discovery`, and chapter completion (`write` for chaptersCompleted/currentChapter). Also added explicit bash commands to the chapter closing section.

---

#### 5.2 Add State Commands to THE-HANDS-ON.md
`completed`

Same pattern as 5.1: CRITICAL section with during-gameplay commands, plus explicit bash commands at chapter closing for chaptersCompleted, session summary, and exchange logging.

---

#### 5.3 Add State Commands to THE-DEEP-DIVE.md
`completed`

Same pattern with additional mood update to `worried` at chapter completion. Both the CRITICAL section and closing section now have full bash commands.

---

#### 5.4 Add State Commands to THE-HUNT.md
`completed`

Same pattern with mood update to `desperate` at chapter completion. Both the CRITICAL section and closing section now have full bash commands.

---

#### 5.5 Verify Chapter Transition Flow
`completed`

Verified play-game.md Step 6 delegates chapter completion state updates to reference files. All 5 reference files now have explicit bash commands at their closing sections. The delegation chain is: play-game.md Step 6 → reference file closing → explicit `state-manager.cjs write` commands.

---

#### 5.6 Install and Verify
`completed`

Ran `bash scripts/install-skill.sh` — all 13 files deployed. Diff between source and installed files: clean (identical). State command counts verified across all reference files: Investigation (8), Hands-On (8), Deep Dive (10), Hunt (10), Boss Battle (5).

---

#### 5.7 Full Sequential Playtest
`completed`

Simulated full Ch1→Ch2→Ch3→Ch4→Ch5 state pipeline. Verified:
- State pipeline: all 9 state-manager commands work across 5 chapters
- Knowledge accumulation: discoveries saved and readable across chapters
- Question history: 14 questions tracked across all 5 chapters with correct tiers
- Memorable exchanges: 9 exchanges accumulated throughout the game
- Mood arc: dismissive → worried → desperate → peaceful
- Chapter progression: investigation → hands-on → deep-dive → hunt → boss → complete
- Backup system: state.backup.json created automatically
- Game-complete detection: all 5 chapters detected, mood peaceful, respect 100

---

#### 5.8 Update PROGRESS.md
`completed`

---

## Milestone 7: Open Source Preparation

**Goal**: Prepare the repo for high-quality open source consumption — clean up legacy code, create README + LICENSE, ensure skills.sh discoverability.

**Success Criteria**:
- [x] Delete legacy CLI code (src/, tests/, CLI deps)
- [x] Delete stale context docs (games/, visuals/, technical/, evaluation/)
- [x] Delete dev artifacts (.cursor/plans/, .cursor/commands/, .agents/skills/)
- [x] Delete unused configs (biome.json, knip.json, tsconfig.json)
- [x] Create README.md with install instructions, quick start, chapters, commands
- [x] Create MIT LICENSE file
- [x] Strip package.json to minimal metadata
- [x] Update .gitignore for clean repo
- [x] Update SKILL.md frontmatter (author: yoniaiz)
- [x] Update AGENTS.md (remove CLI references)
- [x] Update PRD.md (install command, current scope)
- [x] Update ARCHITECTURE.md (remove legacy section)
- [x] Final verification — repo clean, .gitignore correct, all files accounted for

---

## Milestone 8: Certificate of Codebase Survival

**Goal**: Generate a personalized CERTIFICATE.md artifact when the player completes all 5 chapters — the Monster's farewell gift.

**Success Criteria**:
- [x] `generate-certificate` command in state-manager.cjs (rank, accuracy, per-chapter stats, JSON output)
- [x] Certificate template and generation flow in play-game.md Step 2.8
- [x] CERTIFICATE.md referenced in SKILL.md artifacts and Game Complete section
- [x] CERTIFICATE.md added to PRD.md and ARCHITECTURE.md artifact listings
- [x] Skill deployed via install-skill.sh

---

### Tasks

#### 8.1 State Manager: generate-certificate Command
`completed`

Added `generateCertificate()` function and `generate-certificate` CLI command. Computes rank (5-tier system based on accuracy/deep insights/incorrect count), accuracy percentage, per-chapter question stats, and returns structured JSON for template rendering.

---

#### 8.2 Play Game: Certificate Flow
`completed`

Updated Step 2.8 in play-game.md: after branch cleanup, agent runs `generate-certificate`, creates `.onboardme/artifacts/CERTIFICATE.md` from template with dynamic Monster commentary, and presents the certificate ceremony.

---

#### 8.3 Documentation Updates
`completed`

- SKILL.md: Added CERTIFICATE.md to File Artifacts section and Game Complete flow
- PRD.md: Added CERTIFICATE.md to artifacts table and runtime files listing
- ARCHITECTURE.md: Added CERTIFICATE.md to runtime files directory tree

---

#### 8.4 Deploy
`completed`

Ran `bash scripts/install-skill.sh` — skill files deployed to `.cursor/skills/onboardme/`.

---

## Milestone 9: Playtest Fixes and Compaction-Proof Architecture

**Goal**: Fix all playtest bugs and make critical game rules survive Cursor's context compaction.

**Success Criteria**:
- [x] `get-score` command in state-manager.cjs (compact score data, prevents fabrication)
- [x] SKILL.md restructured as compaction-proof rulebook (deterministic command flow, chapter end checklist, score/array/script-identity rules)
- [x] play-game.md simplified (certificate template moved to Boss Battle, command patterns moved to SKILL.md)
- [x] SHARED-RULES.md deleted (content merged into SKILL.md)
- [x] THE-HANDS-ON.md fixed (Code Challenge Mode and Adaptive Path Detection removed)
- [x] All 5 chapter files trimmed (recovery patterns, timing tables, dialogue fluff compressed)
- [x] THE-BOSS-BATTLE.md updated (CERTIFICATE.md is ONLY Ch5 artifact, BOSS_BATTLE.md and CODEBASE_KNOWLEDGE.md templates removed)
- [x] Certificate generation moved to Boss Battle Phase 5
- [x] Skill deployed via install-skill.sh

---

### Tasks

#### 9.1 Add get-score Command
`completed`

Added `getScore()` function and `get-score` CLI command to state-manager.cjs. Returns compact JSON with commits, retries, respect, mood, chapter progress, and deep insights. Prevents score fabrication by giving the agent deterministic numbers to use.

---

#### 9.2 Restructure SKILL.md
`completed`

SKILL.md is now the "compaction-proof rulebook" — the only file that survives Cursor's context compaction. Added: "After Each Answer (MANDATORY)" checklist with exact commands, "Chapter End Checklist", Score Display Rule, Array Safety Rule, Script Identity Rule. Cut: Emotional Arc (redundant), verbose Recovery Patterns, Signature Lines, Breathing Beat dialogue example, Game Over/Complete sections (compressed to references). 424 → 329 lines.

---

#### 9.3 Simplify play-game.md
`completed`

Removed certificate template (~168 lines, moved to Boss Battle Phase 5), removed SHARED-RULES.md load instruction, replaced command patterns with reference to SKILL.md, compressed Game Over dialogue, compressed Game Complete section. 620 → 243 lines.

---

#### 9.4 Delete SHARED-RULES.md
`completed`

Deleted `skills/onboardme/references/SHARED-RULES.md`. Its content (voice rules already in SKILL.md, command patterns now in SKILL.md Compaction-Proof Rules) is fully covered. All 5 chapter file references removed.

---

#### 9.5 Fix THE-HANDS-ON.md
`completed`

Removed "Adaptive Path Detection" and "Alternative: Code Challenge Mode" sections — these caused Ch2 to incorrectly assign code-writing tasks that belong in Ch5. Compressed recovery patterns, timing, and Monster Notes. 683 → 499 lines.

---

#### 9.6 Trim Chapter Files
`completed`

Trimmed all 5 chapter reference files — removed SHARED-RULES.md references, compressed verbose dialogue blocks, recovery patterns, timing tables, and Monster Notes sections. Added script path header to THE-INVESTIGATION.md.

| File | Before | After |
|------|--------|-------|
| THE-INVESTIGATION.md | 632 | 519 |
| THE-HANDS-ON.md | 683 | 499 |
| THE-DEEP-DIVE.md | 1018 | 447 |
| THE-HUNT.md | 959 | 544 |
| THE-BOSS-BATTLE.md | 869 | 602 |

---

#### 9.7 Boss Battle: Certificate as Only Artifact
`completed`

CERTIFICATE.md is now the ONLY Chapter 5 artifact. Removed BOSS_BATTLE.md and CODEBASE_KNOWLEDGE.md templates. Added certificate generation instructions to Phase 5 with compact checklist (generate-certificate, create file, complete-chapter, farewell ceremony).

---

#### 9.8 Trim prepare-game.md
`completed`

Compressed Knowledge JSON schema, git uncommitted changes dialogue, tone reaction dialogues, and Step 8 report dialogue. 405 → 245 lines.

---

#### 9.9 Deploy and Verify
`completed`

Ran `bash scripts/install-skill.sh` — 13 files deployed. Diff between source and installed: clean (identical). SHARED-RULES.md correctly absent from deployment.

---

## Milestone 10: Playtest #2 Fixes

**Goal**: Fix regressions from Playtest #2 — character breaks at transitions, manual state overrides, repetitive sabotage, confusing artifacts, and tone complexity.

**Success Criteria**:
- [x] SKILL.md: Renamed COMPACTION-PROOF RULES to MANDATORY RULES with Character Lock as first subsection
- [x] SKILL.md: State Write Restrictions added (never manually set respectLevel, currentMood, currentChapter)
- [x] Tone system removed (always spicy) — SKILL.md, play-game.md, prepare-game.md, state-manager.cjs
- [x] Per-chapter artifacts removed (CASE_FILE, FLOW_MAP, IMPACT_ANALYSIS) — only CERTIFICATE.md remains
- [x] THE-HUNT.md: Sabotage table reordered (harder patterns first), silent sabotage strengthened
- [x] play-game.md: Chapter transition rules strengthened, tone step removed, mood reference fixed
- [x] THE-BOSS-BATTLE.md: Monster-voice certificate presentation added
- [x] Skill deployed via install-skill.sh

---

### Tasks

#### 10.1 Rename Section and Move Character Lock into Mandatory Rules
`completed`

Renamed `## COMPACTION-PROOF RULES` to `## MANDATORY RULES`, removed meta-explanation about compaction, added Character Lock as first subsection with explicit rules (no emoji, no narrator mode, no skip offers, no stat bullet lists).

---

#### 10.2 Add State-Write Restrictions
`completed`

Added `### State Write Restrictions` to Mandatory Rules. `update-mood` manages mood and respectLevel automatically (with chapter ceilings). `complete-chapter` manages chapter progression. Direct `write` only for session notes, player name, git state, and game-over flow. Updated Mood System section to clarify `update-mood` manages respectLevel. Updated all 4 chapter reference files' state management sections to reference commands instead of direct writes.

---

#### 10.3 Remove Tone System (Always Spicy)
`completed`

Removed Tone Adjustment section from SKILL.md, Step 7 (Tone Selection) from prepare-game.md, Step 2.5 (Read Tone Preference) from play-game.md. Changed default `monsterTone` from `"balanced"` to `"spicy"` in state-manager.cjs. Added "Tone: Spicy" to Your Character section. Kept `set-tone` CLI command for backward compatibility.

---

#### 10.4 Remove Per-Chapter Artifacts
`completed`

Removed CASE_FILE.md from THE-INVESTIGATION.md (template, update references, closing finalization). Removed FLOW_MAP.md from THE-DEEP-DIVE.md (template, update references, closing finalization). Removed IMPACT_ANALYSIS.md from THE-HUNT.md (template, update reference, closing creation). Simplified File Artifacts section in SKILL.md to only reference CERTIFICATE.md. Updated Chapter End Checklist to remove artifact step. Removed CASE_FILE reference from play-game.md Important section.

---

#### 10.5 Fix Sabotage Guidance
`completed`

Reordered sabotage table in THE-HUNT.md — harder patterns (remove `await`, change default value) now first, comparison operator last. Added guidance: "prefer patterns that test UNDERSTANDING, comparison-operator is easiest to spot." Removed "For Spicy/Full-Monster:" prefix. Strengthened silent sabotage section with explicit warning about visible chat output.

---

#### 10.6 Strengthen Chapter Transition Rules
`completed`

Added explicit rule to play-game.md Step 6: "NEVER offer to skip chapters, summarize progress in assistant mode, or ask meta-questions." Removed artifact references from DO NOT list. Fixed Step 2.6 reference from non-existent "Emotional Arc" to "Mood System" section.

---

#### 10.7 Certificate Presentation in Monster Voice
`completed`

Added step 8 to THE-BOSS-BATTLE.md Phase 5 with Monster-voice certificate delivery dialogue. Added explicit rule: "NEVER say Congratulations or use emoji in the game-complete sequence."

---

#### 10.8 Deploy and Verify
`completed`

Ran `bash scripts/install-skill.sh` — skill files deployed.

---

## Milestone 11: Phase Tracking & Instruction Hooks

**Goal**: Make the game survive context compaction by embedding phase-specific instructions in `get-score` output. Add a phase tracking system so the agent always knows what to do next, even after Cursor summarizes earlier messages.

**Success Criteria**:
- [x] `CHAPTER_PHASES` and `PHASE_INSTRUCTIONS` constants in state-manager.cjs
- [x] `progress.currentPhase` in state schema
- [x] `get-score` returns `phase`, `phaseInstruction`, `nextPhase`, `referenceFile`
- [x] `advance-phase` command with validation (next phase only)
- [x] `complete-chapter` validates agent is in final phase before completing
- [x] `sabotage` command (file change + git commit in one call)
- [x] Backup file creation removed (prevents agent from restoring stale state)
- [x] SKILL.md: Phase System section, auto-start, evaluation guidance, new commands in Script Identity Rule
- [x] play-game.md: Phase-aware steps, phaseInstruction usage
- [x] THE-HUNT.md: `sabotage` command, `advance-phase` calls, creativity guidance
- [x] THE-BOSS-BATTLE.md: `advance-phase` calls at each transition, feature validation
- [x] THE-DEEP-DIVE.md: `advance-phase` calls between phases
- [x] Skill deployed via install-skill.sh

---

### Tasks

#### 11.1 Phase Constants and Instructions
`completed`

Added `CHAPTER_PHASES` (phase sequences per chapter) and `PHASE_INSTRUCTIONS` (actionable text per phase) constants to state-manager.cjs. These drive the self-correcting loop: `get-score` returns the current phase instruction, which the agent follows even after compaction.

---

#### 11.2 State Schema Update
`completed`

Added `progress.currentPhase` to default state and `initializeState()`. Starts at `"questions"` for investigation chapter.

---

#### 11.3 Enhanced get-score
`completed`

`get-score` now returns 4 new fields: `phase` (current phase name), `phaseInstruction` (what to do now), `nextPhase` (what comes next), `referenceFile` (chapter reference file path). These appear in every `get-score` call, creating a self-correcting instruction loop.

---

#### 11.4 advance-phase Command
`completed`

New `advancePhase()` function validates the requested phase is the next valid phase in sequence. Returns the new phase + instructions. Prevents skipping phases.

---

#### 11.5 complete-chapter Phase Validation
`completed`

`completeChapter()` now validates that `currentPhase` is the FINAL phase for that chapter before allowing completion. Also sets `currentPhase` to the first phase of the next chapter after completing.

---

#### 11.6 Sabotage Command
`completed`

New `sabotage` command reads a file, applies string replacement, writes it back, and runs `git add + git commit` — all in one tool call. Returns `{ success, file, testsToRun }`. Eliminates fragile `node -e` scripts.

---

#### 11.7 Remove Backup Mechanism
`completed`

Removed `state.backup.json` creation from `writeState()`. The backup was discovered by the agent during gameplay and used to accidentally destroy all game data via `cp state.backup.json state.json`.

---

#### 11.8 SKILL.md Updates
`completed`

Added Phase System section to Mandatory Rules, auto-start game flow, evaluation guidance for "deep" tier, `advance-phase` and `sabotage` to Script Identity Rule, `phaseInstruction` step to After Each Answer checklist.

---

#### 11.9 play-game.md Updates
`completed`

Step 1 notes `currentPhase`, Step 5 adds phaseInstruction guidance, Step 6 notes `complete-chapter` phase validation with recovery path.

---

#### 11.10 THE-HUNT.md Updates
`completed`

Replaced `node -e` sabotage with `sabotage` command, added `advance-phase diagnosis` and `advance-phase impact` calls, added creativity guidance against comparison-operator patterns.

---

#### 11.11 THE-BOSS-BATTLE.md Updates
`completed`

Added `advance-phase` calls at all 5 transitions (planning, build, review, defense, victory), added feature validation to Phase 1 (verify feature doesn't already exist).

---

#### 11.12 THE-DEEP-DIVE.md Updates
`completed`

Added `advance-phase entities` and `advance-phase tests` calls at phase transitions.

---

#### 11.13 Deploy
`completed`

Ran `bash scripts/install-skill.sh` — skill files deployed to `.cursor/skills/onboardme/`.

---

## Completed Milestones

### Milestone 5: Full Game Integration ✓

**Goal**: All 5 chapters playable end-to-end with full emotional arc.

**Completed**: 2026-02-06

**Deliverables**:
- [x] Explicit state management bash commands added to all 5 reference files (Ch1-4 were missing them)
- [x] Chapter transition state updates verified (play-game.md → reference files → bash commands)
- [x] Full Ch1→Ch5 state pipeline verified: 14 questions, 9 exchanges, mood arc complete
- [x] All artifacts: CASE_FILE.md, FLOW_MAP.md, IMPACT_ANALYSIS.md, BOSS_BATTLE.md, CODEBASE_KNOWLEDGE.md
- [x] Game-complete detection: 5 chapters → peaceful mood → victory flow
- [x] Knowledge manager: discoveries accumulate across chapters, persist across sessions

---

### Milestone 4: Monster Voice + Progression ✓

**Goal**: Implement the full Monster persona with emotional arc and progression tracking.

**Completed**: 2026-02-06

---

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

## Notes

### Decisions Made
- Agent IS the Monster (not rendering the Monster)
- Conversational gameplay (not multiple-choice)
- Editor files as game boards (CASE_FILE.md, etc.)
- 5 consolidated chapters (not 9+ individual games)
- Slash commands for agent interaction
- Legacy CLI code deleted in Milestone 7 (clean slate for open source)
- State files in `.onboardme/` in the target repository
- Distribution via skills.sh ecosystem (`npx skills add yoniaiz/onboardme`)

### Blockers
- None currently

---

*Last Updated: 2026-02-11 (Milestone 11 complete — Phase Tracking & Instruction Hooks)*
