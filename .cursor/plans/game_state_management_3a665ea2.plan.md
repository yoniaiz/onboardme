---
name: Game State Management
overview: Extend the state management system to persist and restore game progress between sessions, including tracking current game/question, checkpoints for resume, and session statistics.
todos:
  - id: rename-conflict
    content: Rename GameProgress in core/types.ts to GameRuntimeProgress and update references
    status: pending
  - id: extend-types
    content: Add SessionStats, CheckpointData, ResumePoint interfaces and extend Progress/GameProgress in types/state.ts
    status: pending
  - id: write-functions
    content: Implement writeProgress, startGame, completeGame, advanceQuestion, recordAnswer in services/state.ts
    status: pending
  - id: checkpoint-support
    content: Add saveCheckpoint, canResume, clearCheckpoint functions in services/state.ts
    status: pending
  - id: unit-tests
    content: Create tests/unit/state.test.ts with comprehensive state management tests
    status: pending
isProject: false
---

# Game State Management

## Current State

The codebase has basic progress types but lacks write functionality and detailed session tracking:

- [src/types/state.ts](src/types/state.ts) - Basic `Progress` and `GameProgress` types
- [src/services/state.ts](src/services/state.ts) - Only has `readProgress()`, no write functions
- [context/technical/STATE-MANAGEMENT.md](context/technical/STATE-MANAGEMENT.md) - Full specification to implement

**Key Gap:** No ability to save progress or track within-game state (current question index, checkpoints).

## Naming Conflict

There's a `GameProgress` naming conflict:

- `src/types/state.ts` - Session-level progress (status, score, timestamps)
- `src/core/types.ts` - Runtime progress (current/total question indices)

**Resolution:** Rename the `src/core/types.ts` version to `GameRuntimeProgress` to distinguish it from persisted state.

## Implementation

### 1. Extend State Types ([src/types/state.ts](src/types/state.ts))

Add missing fields per STATE-MANAGEMENT.md:

```typescript
export interface Progress {
  // existing fields...
  currentGameIndex: number;           // Position in template (0-based)
  currentQuestionIndex: number;       // Within current game
  
  stats: SessionStats;
  checkpoint: CheckpointData;
}

export interface SessionStats {
  totalCommits: number;
  totalTime: number;
  questionsAnswered: number;
  correctAnswers: number;
  hintsUsed: number;
  longestCleanStreak: number;
  currentCleanStreak: number;
}

export interface CheckpointData {
  canResume: boolean;
  resumePoint: ResumePoint | null;
}

export interface ResumePoint {
  gameId: string;
  questionIndex: number;
  savedAt: string;
}
```

Update `GameProgress` to include `currentQuestionIndex`.

### 2. Add State Write Functions ([src/services/state.ts](src/services/state.ts))

```typescript
// Core write function
writeProgress(rootDir: string, progress: Progress): Promise<void>

// Game lifecycle
startGame(rootDir: string, gameId: string): Promise<void>
completeGame(rootDir: string, gameId: string, result: GameResult): Promise<void>

// Question tracking
advanceQuestion(rootDir: string): Promise<void>
recordAnswer(rootDir: string, correct: boolean, commits: number, timeMs: number): Promise<void>

// Checkpoint support
saveCheckpoint(rootDir: string): Promise<void>
canResume(rootDir: string): Promise<boolean>
clearCheckpoint(rootDir: string): Promise<void>
```

### 3. Fix Naming Conflict ([src/core/types.ts](src/core/types.ts))

Rename `GameProgress` to `GameRuntimeProgress` and update [src/core/plugin.ts](src/core/plugin.ts) accordingly.

### 4. Unit Tests ([tests/unit/state.test.ts](tests/unit/state.test.ts))

Test cases:

- Create and write initial progress
- Update game progress (start, advance question, complete)
- Save and restore checkpoint
- Stats accumulation (commits, streaks, time)
- Edge cases (no existing file, corrupt file handling)

## Files Changed


| File                       | Action                                                  |
| -------------------------- | ------------------------------------------------------- |
| `src/types/state.ts`       | Extend with stats, checkpoint, question tracking        |
| `src/services/state.ts`    | Add write functions, game lifecycle, checkpoint support |
| `src/core/types.ts`        | Rename `GameProgress` to `GameRuntimeProgress`          |
| `src/core/plugin.ts`       | Update to use `GameRuntimeProgress`                     |
| `src/core/index.ts`        | Update export name                                      |
| `tests/unit/state.test.ts` | New - unit tests for state management                   |


