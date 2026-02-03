# OnboardMe — Progress Tracker

> **Status**: Milestone 1 in progress  
> **Current Focus**: CLI Foundation & Core Infrastructure

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

## Milestone 1: CLI Foundation

**Goal**: Create a working CLI that can be installed and run basic commands. Users should be able to run `onboardme init` and `onboardme start` (with validation errors if no prepared data exists).

**Success Criteria**:
- [ ] `npm install -g onboardme` works (or `bun link` for local dev)
- [ ] `onboardme --help` shows available commands
- [ ] `onboardme init` creates `.onboardme/` folder structure
- [ ] `onboardme start` validates prepared data and shows errors if missing
- [ ] `onboardme status` shows current progress (or "not started")
- [ ] All commands have proper terminal UI (colors, formatting)

**Estimated Time**: ~1-2 sessions

---

### Tasks

#### 1. Project Setup & Configuration

| ID | Task | Status | Acceptance Criteria |
|----|------|--------|---------------------|
| 1.1 | Add runtime dependencies | `pending` | `commander`, `ink`, `react`, `chalk` added to package.json |
| 1.2 | Configure TypeScript for CLI | `pending` | tsconfig.json updated with proper CLI settings, `src/cli/` as entry |
| 1.3 | Add build configuration | `pending` | Build script produces executable CLI bundle |
| 1.4 | Configure package.json bin entry | `pending` | `"bin": { "onboardme": "./dist/cli.js" }` configured |
| 1.5 | Verify local development workflow | `pending` | `bun run dev` runs CLI, `bun link` installs globally |

#### 2. CLI Command Structure

| ID | Task | Status | Acceptance Criteria |
|----|------|--------|---------------------|
| 2.1 | Create CLI entry point | `pending` | `src/cli/index.ts` with Commander.js setup |
| 2.2 | Implement `--version` and `--help` | `pending` | Version from package.json, help shows all commands |
| 2.3 | Create command file structure | `pending` | `src/cli/commands/` with separate files per command |

#### 3. Init Command

| ID | Task | Status | Acceptance Criteria |
|----|------|--------|---------------------|
| 3.1 | Implement `init` command | `pending` | Creates `.onboardme/` with subdirectories |
| 3.2 | Create folder structure | `pending` | Creates `context/`, `prepared/`, `template/`, `state/` |
| 3.3 | Generate `.onboardme/.gitignore` | `pending` | Ignores `context/`, `prepared/`, `state/` |
| 3.4 | Detect existing installation | `pending` | Warns if `.onboardme/` already exists, offers reset |
| 3.5 | Add success output with next steps | `pending` | Shows "Run skills in AI platform" instructions |

#### 4. Start Command (Validation Only)

| ID | Task | Status | Acceptance Criteria |
|----|------|--------|---------------------|
| 4.1 | Implement `start` command | `pending` | Entry point that checks for prepared data |
| 4.2 | Validate prepared data exists | `pending` | Checks for `.onboardme/prepared/manifest.json` |
| 4.3 | Show structured validation errors | `pending` | JSON output listing missing files/fields |
| 4.4 | Show "run prepare skill" message | `pending` | Clear next steps when validation fails |

#### 5. Status Command

| ID | Task | Status | Acceptance Criteria |
|----|------|--------|---------------------|
| 5.1 | Implement `status` command | `pending` | Shows current progress or "not started" |
| 5.2 | Read progress from state file | `pending` | Reads `.onboardme/state/progress.json` |
| 5.3 | Format progress output | `pending` | Shows TODO completion, current game, time played |

#### 6. Terminal UI Foundation

| ID | Task | Status | Acceptance Criteria |
|----|------|--------|---------------------|
| 6.1 | Create Ink app wrapper | `pending` | `src/ui/App.tsx` with basic Ink setup |
| 6.2 | Implement color theme | `pending` | `src/ui/theme.ts` with color palette from design docs |
| 6.3 | Create basic Box component | `pending` | Reusable bordered box component |
| 6.4 | Create spinner component | `pending` | Loading indicator for async operations |
| 6.5 | Create error display component | `pending` | Styled error messages with suggestions |

#### 7. File System Utilities

| ID | Task | Status | Acceptance Criteria |
|----|------|--------|---------------------|
| 7.1 | Create fs utilities | `pending` | `src/utils/fs.ts` with typed file operations |
| 7.2 | Implement JSON read/write | `pending` | Type-safe JSON parsing with validation |
| 7.3 | Implement path resolution | `pending` | Find `.onboardme/` from any subdirectory |
| 7.4 | Create directory structure builder | `pending` | Create nested directories safely |

#### 8. State Management Foundation

| ID | Task | Status | Acceptance Criteria |
|----|------|--------|---------------------|
| 8.1 | Define state types | `pending` | `src/core/state/types.ts` with Progress, History interfaces |
| 8.2 | Implement state reader | `pending` | Read and validate state files |
| 8.3 | Implement state writer | `pending` | Write state with atomic operations |
| 8.4 | Create initial state generator | `pending` | Generate default state for new installations |

---

### Task Dependencies

```
1.1 → 1.2 → 1.3 → 1.4 → 1.5
              ↓
        2.1 → 2.2 → 2.3
              ↓
    ┌─────────┼─────────┐
    ↓         ↓         ↓
   3.x       4.x       5.x
    │         │         │
    └────┬────┴────┬────┘
         ↓         ↓
        6.x       7.x
                   ↓
                  8.x
```

**Parallel tracks after 2.3:**
- Commands (3, 4, 5) can be developed in parallel
- UI (6) and FS utilities (7) can be developed in parallel
- State (8) depends on FS utilities (7)

---

### Completed Tasks

*None yet — milestone just started*

---

## Future Milestones (Not Yet Planned)

These will be planned in detail when we reach them:

| Milestone | Goal | Depends On |
|-----------|------|------------|
| **M2: Game Engine Core** | Plugin system, game loop, scoring | M1 |
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

### Open Questions
- None currently

### Blockers
- None currently

---

*Last Updated: 2026-02-03*
