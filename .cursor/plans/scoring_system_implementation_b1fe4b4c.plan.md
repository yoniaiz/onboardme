---
name: Scoring System Implementation
overview: Implement the scoring system that calculates Commits (XP) earned per answer with base points, speed bonuses, and streak multipliers, plus track clean commit streaks and time per question.
todos:
  - id: scoring-types
    content: Define ScoringConfig, AnswerScore, and StreakState types
    status: pending
  - id: streak-multiplier
    content: Implement calculateStreakMultiplier with 1x-5x scale
    status: pending
  - id: speed-bonus
    content: Implement calculateSpeedBonus for fast answers
    status: pending
  - id: calculate-score
    content: Implement main calculateScore function combining all factors
    status: pending
  - id: update-streak
    content: Implement updateStreak to track consecutive correct answers
    status: pending
  - id: default-config
    content: Implement createDefaultScoringConfig with sensible defaults
    status: pending
isProject: false
---

# Scoring System Implementation (Task 2.2)

## Goal

Implement the scoring system using "Commits" as the XP currency. The system calculates points earned per answer based on:

- Base commits for correct answers
- Speed bonus for fast answers
- Streak multiplier for consecutive correct answers (clean commits)

---

## Scoring Formula

Based on the [fixme-spaghetti-monster/GAME.md](context/games/fixme-spaghetti-monster/GAME.md) battle mechanics:

- **Base Commits**: Award a fixed amount per correct answer
- **Speed Bonus**: +bonus for answers under a time threshold (e.g., <15 seconds)
- **Streak Multiplier**: Up to 5x multiplier for clean commit streaks (consecutive correct answers)

**Formula**: `totalCommits = baseCommits * streakMultiplier + speedBonus`

**Streak Multiplier Scale** (from [TERMINOLOGY.md](context/narrative/TERMINOLOGY.md) "5x multiplier"):


| Streak | Multiplier |
| ------ | ---------- |
| 1      | 1x         |
| 2      | 1.5x       |
| 3      | 2x         |
| 4      | 3x         |
| 5+     | 5x         |


---

## File to Create

**[src/core/scoring.ts](src/core/scoring.ts)** - Score calculation and streak tracking

### Core Types

```typescript
interface ScoringConfig {
  baseCommits: number;
  speedBonusThreshold: number;
  speedBonusAmount: number;
  maxStreakMultiplier: number;
}

interface AnswerScore {
  baseCommits: number;
  speedBonus: number;
  streakMultiplier: number;
  totalCommits: number;
}

interface StreakState {
  currentStreak: number;
  longestStreak: number;
}
```

### Functions to Implement

1. `**calculateStreakMultiplier(streak: number): number**`
  - Returns multiplier based on current streak (1x to 5x scale)
2. `**calculateSpeedBonus(answerTimeMs: number, config: ScoringConfig): number**`
  - Returns speed bonus if answer time is under threshold
3. `**calculateScore(params: { correct: boolean; answerTimeMs: number; currentStreak: number; config: ScoringConfig }): AnswerScore**`
  - Main scoring function combining all factors
  - Returns 0 commits if answer is incorrect
4. `**updateStreak(correct: boolean, currentState: StreakState): StreakState**`
  - Updates streak state: increments on correct, resets on wrong
  - Updates longest streak if current exceeds it
5. `**createDefaultScoringConfig(): ScoringConfig**`
  - Returns sensible defaults for scoring parameters

---

## Default Configuration Values

From the game design docs:

- `baseCommits`: 100 (standard reward per correct answer)
- `speedBonusThreshold`: 15000ms (15 seconds, from boss battle spec)
- `speedBonusAmount`: 50 (bonus for fast answers)
- `maxStreakMultiplier`: 5 (cap at 5x)

---

## Integration Points

The scoring system will be used by:

- **Task 2.5 (Game Engine)**: Calls `calculateScore` after each answer
- **Task 2.4 (State Management)**: Uses `updateStreak` to track progress
- **Task 2.6 (Game UI)**: Displays score and streak information

---

## Acceptance Criteria Checklist

- Calculate Commits earned per answer (base + speed bonus + streak bonus)
- Track clean commit streaks (current and longest)
- Time tracking per question (via `answerTimeMs` parameter)

