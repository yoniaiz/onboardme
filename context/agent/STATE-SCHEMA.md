# State Schema

OnboardMe persists game progress, player behavior, and Monster emotional state in a single `state.json` file. This document defines the schema with versioning and migration strategy.

---

## Schema Version

Current version: **2**

The schema includes a `schemaVersion` field to enable future migrations. When loading state, check version and migrate if needed. The v1 → v2 migration maps `currentChapter`/`currentPhase`/`chaptersCompleted` to a single `currentStep` index.

---

## Full Schema

```typescript
interface OnboardMeState {
  schemaVersion: number;

  repo: {
    id: string;
    path: string;
    name: string;
  };

  player: {
    name: string;
    totalCommits: number;
    currentLives: number;
    startedAt: string;
  };

  progress: {
    currentStep: number;          // Index into GAME_FLOW (0-15, or 16 = complete)
    questionHistory: QuestionResult[];
  };

  monster: {
    currentMood:
      | "dismissive"
      | "annoyed"
      | "worried"
      | "desperate"
      | "peaceful";
    respectLevel: number;
    memorableExchanges: Exchange[];
  };

  session: {
    conversationSummary: string;
  };

  git: {
    gameBranch: string;
    originalBranch: string;
    branchCreated: boolean;
  };

  context: {
    prepared: boolean;
    preparedAt: string;
  };

  preferences: {
    monsterTone: "spicy";
  };
}

interface QuestionResult {
  question: string;
  answer: string;
  chapter: string;
  phase: string;
  tier: "incorrect" | "partial" | "correct" | "deep";
  commits: number;
  timestamp: string;
}

interface Exchange {
  description: string;
  chapter: string;
  timestamp: string;
}
```

---

## Game Flow

Progress is tracked by a single `currentStep` index into the `GAME_FLOW` array:

```
Step 0:  investigation:identity
Step 1:  investigation:stack
Step 2:  investigation:docs
Step 3:  investigation:synthesis
Step 4:  deep-dive:trace
Step 5:  deep-dive:entities
Step 6:  deep-dive:tests
Step 7:  hunt:sabotage
Step 8:  hunt:diagnosis
Step 9:  hunt:impact
Step 10: boss:challenge
Step 11: boss:planning
Step 12: boss:build
Step 13: boss:review
Step 14: boss:defense
Step 15: boss:victory
Step 16: (game complete)
```

Chapter, phase, and completion status are all derived from `currentStep`. No separate `currentChapter`, `currentPhase`, or `chaptersCompleted` fields.

---

## Section Details

### `repo`

Repository identification and location.

| Field  | Type   | Description                        |
| ------ | ------ | ---------------------------------- |
| `id`   | string | Unique identifier (generated hash) |
| `path` | string | Absolute path to repo root         |
| `name` | string | Human-readable project name        |

### `player`

Player profile and resources.

| Field          | Type   | Description                        |
| -------------- | ------ | ---------------------------------- |
| `name`         | string | Player's name (auto-detected)      |
| `totalCommits` | number | Accumulated score (commits earned) |
| `currentLives` | number | Lives remaining (start: 5)         |
| `startedAt`    | string | ISO timestamp of first session     |

### `progress`

Game progression tracking.

| Field             | Type             | Description                          |
| ----------------- | ---------------- | ------------------------------------ |
| `currentStep`     | number           | Index into GAME_FLOW (0-16)          |
| `questionHistory` | QuestionResult[] | Full answer history across all phases |

### `monster`

The Monster's emotional state and memory.

| Field                | Type      | Description                        |
| -------------------- | --------- | ---------------------------------- |
| `currentMood`        | enum      | Emotional state affecting dialogue |
| `respectLevel`       | number    | 0-100, affects Monster's attitude  |
| `memorableExchanges` | Exchange[] | Key moments for callbacks          |

**Mood Progression:**

```
dismissive → annoyed → worried → desperate → peaceful
        (player success erodes Monster's confidence)
```

### `session`

Current session context for conversation continuity.

| Field                 | Type   | Description              |
| --------------------- | ------ | ------------------------ |
| `conversationSummary` | string | Brief summary for resume |

### `git`

Game branch tracking.

| Field            | Type    | Description                |
| ---------------- | ------- | -------------------------- |
| `gameBranch`     | string  | Game branch name           |
| `originalBranch` | string  | Player's original branch   |
| `branchCreated`  | boolean | Whether branch was created |

### `context`

Prepared game context status.

| Field      | Type    | Description                     |
| ---------- | ------- | ------------------------------- |
| `prepared` | boolean | Whether prepare has run         |
| `preparedAt` | string | ISO timestamp of preparation  |

---

## Default State

New game initialization:

```json
{
  "schemaVersion": 2,
  "repo": { "id": "", "path": "", "name": "" },
  "player": { "name": "", "totalCommits": 0, "currentLives": 5, "startedAt": "" },
  "progress": { "currentStep": 0, "questionHistory": [] },
  "monster": { "currentMood": "dismissive", "respectLevel": 0, "memorableExchanges": [] },
  "session": { "conversationSummary": "" },
  "git": { "gameBranch": "", "originalBranch": "", "branchCreated": false },
  "context": { "prepared": false, "preparedAt": "" },
  "preferences": { "monsterTone": "spicy" }
}
```

---

## State Location

```
.onboardme/
└── state.json          # Main state file
```

---

## Migration Strategy

When `schemaVersion` changes, migrations run sequentially:

**v1 → v2:**
- `currentChapter` + `currentPhase` + `chaptersCompleted` → single `currentStep` index
- Maps old phase names to new ones (e.g., `investigation:questions` → step 0, `deep-dive:bootup` → step 4)
- Removes unused fields: `behavior`, `lastMockery`, `pendingCallbacks`, `contextFiles`

---

## Commands

The agent interacts with state through two primary commands:

- **`resume`** — Returns current phase instruction, scoring, tips, rules, and score
- **`complete-step`** — Records results, advances game, returns next phase or ceremony

See `state-manager.cjs help` for the full command reference.

---

## Companion: Knowledge File

Game state (`state.json`) tracks **where the player is**. Codebase knowledge (`repo-knowledge.json`) tracks **what's known about the repo**.

Together they enable full cross-session resumption:

```
state.json          → step, score, lives, mood, question history
repo-knowledge.json → codebase facts, player-validated discoveries
```

---

_Document Version: 2.0_
_Last Updated: 2026-02-12_
