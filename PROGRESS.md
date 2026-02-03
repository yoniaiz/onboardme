# OnboardMe — Progress Tracker

> **Status**: Milestone 2 In Progress  
> **Current Focus**: Game Engine Core — Plugin system, game loop, scoring

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

## Milestone 2: Game Engine Core

**Goal**: Build the core game engine that can load plugins, run games, track scoring, and manage state. After this milestone, we can plug in actual games.

**Success Criteria**:
- [ ] Game plugin base class with lifecycle methods (initialize, start, submitAnswer, end)
- [ ] Template system loads game order from manifest
- [ ] Game engine runs games in sequence
- [ ] Scoring system tracks Commits, streaks, and time
- [ ] State persists progress between sessions
- [ ] `onboardme start` launches first game when prepared data exists

---

### Tasks

#### 2.1 Game Plugin Types & Base Class
`completed`

**Goal**: Define the core types and abstract base class for game plugins.

**Files to create**:
- `src/core/types.ts` — Core game types (GameQuestion, AnswerResult, GameResult)
- `src/core/plugin.ts` — Abstract GamePlugin class

**Acceptance Criteria**:
- GamePluginSchema interface defined
- GamePlugin abstract class with lifecycle methods
- All types from PLUGIN-ARCHITECTURE.md implemented

---

#### 2.2 Scoring System
`completed`

**Goal**: Implement the scoring system (Commits instead of XP).

**Files to create**:
- `src/core/scoring.ts` — Score calculation, streak tracking

**Acceptance Criteria**:
- Calculate Commits earned per answer (base + speed bonus + streak bonus)
- Track clean commit streaks
- Time tracking per question

---

#### 2.3 Template Loader
`completed`

**Goal**: Load game templates (manifest.json) and resolve game order.

**Files created**:
- `src/core/template.ts` — Template loading and resolution
- `src/types/template.ts` — Template type definitions
- `tests/unit/template.test.ts` — Unit tests (16 tests, all passing)

**Acceptance Criteria**:
- ✓ Load template.json from .onboardme/template/ (with fallback to default)
- ✓ Resolve game order by cross-referencing template with manifest
- ✓ Validate template structure with Zod
- ✓ Ensure boss game (spaghetti-monster) is always positioned last
- ✓ Return detailed errors when template games missing from manifest

---

#### 2.4 Game State Management
`completed`

**Goal**: Persist and restore game progress between sessions.

**Files updated**:
- `src/services/state.ts` — Added write functions, game lifecycle, checkpoint support
- `src/types/state.ts` — Added SessionStats, CheckpointData, tracking fields
- `src/core/types.ts` — Renamed GameProgress → GameRuntimeProgress (avoid naming conflict)
- `tests/unit/state.test.ts` — 18 unit tests for state management

**Acceptance Criteria**:
- ✓ Track current game, current question index
- ✓ Save/restore progress on exit/start (writeProgress, getOrCreateProgress)
- ✓ Track completed games and total score
- ✓ Session stats (commits, time, streaks, hints)
- ✓ Checkpoint/resume support
- ✓ Migration support for old progress files

---

#### 2.5 Game Engine
`completed`

**Goal**: Core engine that orchestrates game flow.

**Files created**:
- `src/core/engine.ts` — Main game loop orchestration
- `src/core/registry.ts` — Game plugin registry for dynamic instantiation
- `src/core/loader.ts` — Prepared data loader for games
- `src/types/engine.ts` — Engine types (callbacks, progress, config)

**Acceptance Criteria**:
- ✓ Load template and instantiate games
- ✓ Run games in sequence
- ✓ Handle game transitions
- ✓ Coordinate with state management

---

#### 2.6 Game UI Components
`completed`

**Goal**: UI components for playing games.

**Files created**:
- `src/ui/screens/game-screen.tsx` — Main game playing screen with engine orchestration
- `src/ui/components/question.tsx` — Question display + input (multiple-choice & text)
- `src/ui/components/score-display.tsx` — Score/streak/progress display

**Acceptance Criteria**:
- ✓ Display current question with context
- ✓ Show score and streak
- ✓ Handle answer input (multiple-choice with number keys, text with enter)
- ✓ Show feedback on answer (correct/incorrect with commits earned)

---

#### 2.7 Mock Game for Testing
`completed`

**Goal**: Create a simple mock game to test the engine end-to-end.

**Files created**:
- `src/games/mock/index.ts` — Configurable mock game plugin
- `src/testing/index.ts` — Public exports for testing framework
- `src/testing/harness.ts` — Test harness for isolated engine testing
- `src/testing/utils.ts` — Test utilities and callback capture
- `src/testing/fixtures.ts` — Fixture generator for test data
- `src/testing/runner.ts` — CLI test runner for manual testing
- `tests/integration/engine.test.ts` — Engine integration tests (16 tests)

**Acceptance Criteria**:
- ✓ Mock game with configurable questions
- ✓ Can be loaded and played through the engine
- ✓ Integration tests pass (16 tests covering initialization, playthrough, multi-game, callbacks, scoring)

---

#### 2.8 Wire Up Start Command
`completed`

**Goal**: Connect the start command to launch the game engine.

**Files created/updated**:
- `src/ui/render.tsx` — Added `renderInteractiveScreen` for interactive UI flows
- `src/core/bootstrap.ts` — Game plugin registration module
- `src/commands/start.tsx` — Rewritten to launch game engine and UI
- `src/ui/screens/start-screen.tsx` — Added `EngineInitErrorScreen`
- `tests/integration/start-command.test.ts` — 5 integration tests

**Acceptance Criteria**:
- ✓ `onboardme start` launches game when prepared/ exists
- ✓ Shows validation errors if data missing
- ✓ Shows engine init errors (missing plugin, missing prepared data)
- ✓ Game plays through questions interactively

---

#### 2.9 Restore Terminal Cursor After Sessions
`completed`

**Goal**: Ensure terminal cursor and prompt indicators are restored after interactive play.

**Files to update**:
- `src/ui/render.tsx` — Restore cursor and stdin state after Ink exits

**Acceptance Criteria**:
- Cursor is visible after `onboardme start` exits
- Terminal prompt indicators remain intact after a session

---

## Milestone 1: CLI Foundation ✓

**Goal**: Create a working CLI that can be installed and run basic commands. Users should be able to run `onboardme init` and `onboardme start` (with validation errors if no prepared data exists).

**Success Criteria**:
- [x] `npm install -g onboardme` works (or `bun link` for local dev)
- [x] `onboardme --help` shows available commands
- [x] `onboardme init` creates `.onboardme/` folder structure
- [x] `onboardme start` validates prepared data and shows errors if missing
- [x] `onboardme status` shows current progress (or "not started")
- [x] All commands have proper terminal UI (colors, formatting)

**Completed**: 2026-02-03

---

### Implementation Summary

**Architecture:**
- Entry point: `src/index.ts` with Commander.js
- Commands: `src/commands/*.tsx` (init, start, status, validate)
- UI: Ink-based React components in `src/ui/`
- Utilities: `src/lib/` (fs, paths, errors)
- Services: `src/services/` (state, validation)

**Key Decisions:**
- Used Ink for terminal UI (React-like components)
- Design system colors from `context/visuals/COLORS.md` (#00ff88, #00d4ff, #ff6b6b, #ffd700)
- ANSI Shadow font for figlet banners (per `context/visuals/TYPOGRAPHY.md`)
- Hybrid spinner approach: ora for async operations, Ink for screens

---

## Future Milestones

| Milestone | Goal | Depends On |
|-----------|------|------------|
| **M3: First Game** | `file-detective` game playable end-to-end | M2 |
| **M4: Narrative System** | Monster dialogue, cold open, pacing | M2 |
| **M5: Boss Battle** | Spaghetti Monster encounter | M3, M4 |
| **M6: Skills & Context** | AI skills for context gathering | M3 |
| **M7: Polish & Victory** | Victory screen, knowledge export, PR generation | M5 |

---

## Notes

### Decisions Made
- Using Bun as runtime (per AGENTS.md)
- Using Commander.js for CLI (mature, well-documented)
- Using Ink for terminal UI (React patterns, rich UI)
- react-devtools-core as dev dependency (required for bundling Ink)

### Open Questions
- None currently

### Blockers
- None currently

---

*Last Updated: 2026-02-03 (M2 Planning)*
