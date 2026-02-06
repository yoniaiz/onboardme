# State Schema

OnboardMe persists game progress, player behavior, and Monster emotional state in a single `state.json` file. This document defines the schema with versioning and migration strategy.

---

## Schema Version

Current version: **1**

The schema includes a `schemaVersion` field to enable future migrations. When loading state, check version and migrate if needed.

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
    currentChapter:
      | "investigation"
      | "hands-on"
      | "deep-dive"
      | "hunt"
      | "boss";
    currentGame: string;
    chaptersCompleted: string[];
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
    memorableExchanges: string[];
    lastMockery: string;
  };

  session: {
    conversationSummary: string;
    lastEmotionalBeat: string;
    pendingCallbacks: string[];
  };

  behavior: {
    hintUsageCount: number;
    averageResponseTime: number;
    accuracyByTopic: Record<string, number>;
    playerStyle: "methodical" | "aggressive" | "balanced" | "struggling";
  };

  context: {
    prepared: boolean;
    preparedAt: string;
    contextFiles: string[];
  };

  preferences: {
    monsterTone: "friendly" | "balanced" | "spicy" | "full-monster";
  };
}

interface QuestionResult {
  question: string;
  answer: string;
  chapter: string;
  tier: "incorrect" | "partial" | "correct" | "deep";
  commits: number;
  timestamp: string;
}
```

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
| `name`         | string | Player's chosen name               |
| `totalCommits` | number | Accumulated score (commits earned) |
| `currentLives` | number | Lives remaining (start: 5)         |
| `startedAt`    | string | ISO timestamp of first session     |

### `progress`

Game progression tracking.

| Field               | Type             | Description                   |
| ------------------- | ---------------- | ----------------------------- |
| `currentChapter`    | enum             | Active chapter identifier     |
| `currentGame`       | string           | Current game within chapter   |
| `chaptersCompleted` | string[]         | List of completed chapter IDs |
| `questionHistory`   | QuestionResult[] | Full answer history           |

**Chapter Progression:**

```
investigation → hands-on → deep-dive → hunt → boss
```

### `monster`

The Monster's emotional state and memory.

| Field                | Type     | Description                        |
| -------------------- | -------- | ---------------------------------- |
| `currentMood`        | enum     | Emotional state affecting dialogue |
| `respectLevel`       | number   | 0-100, affects Monster's attitude  |
| `memorableExchanges` | string[] | Key moments for callbacks          |
| `lastMockery`        | string   | Last insult used (avoid repeats)   |

**Mood Progression:**

```
dismissive → annoyed → worried → desperate → peaceful
        (player success erodes Monster's confidence)
```

**Mood Triggers:**
| Event | Mood Change |
|-------|-------------|
| Deep answer | +worry, +respect |
| Correct streak (3+) | dismissive→annoyed |
| Correct streak (5+) | annoyed→worried |
| Near victory | worried→desperate |
| Victory | desperate→peaceful |
| Incorrect answer | Monster regains confidence |

### `session`

Current session context for conversation continuity.

| Field                 | Type     | Description                |
| --------------------- | -------- | -------------------------- |
| `conversationSummary` | string   | Brief summary for resume   |
| `lastEmotionalBeat`   | string   | Last significant moment    |
| `pendingCallbacks`    | string[] | Moments to reference later |

### `behavior`

Player behavioral tracking for adaptive difficulty.

| Field                 | Type   | Description             |
| --------------------- | ------ | ----------------------- |
| `hintUsageCount`      | number | Total hints requested   |
| `averageResponseTime` | number | Seconds (for pacing)    |
| `accuracyByTopic`     | Record | Accuracy per topic area |
| `playerStyle`         | enum   | Inferred play style     |

**Play Style Detection:**
| Style | Indicators |
|-------|------------|
| `methodical` | Long response times, few hints, high accuracy |
| `aggressive` | Fast responses, some misses, no hints |
| `balanced` | Mixed timing, moderate hint usage |
| `struggling` | Many hints, low accuracy, long pauses |

### `context`

Prepared game context status.

| Field          | Type     | Description                     |
| -------------- | -------- | ------------------------------- |
| `prepared`     | boolean  | Whether `/prepare-game` has run |
| `preparedAt`   | string   | ISO timestamp of preparation    |
| `contextFiles` | string[] | List of analyzed files          |

**Codebase knowledge** is stored separately in `.onboardme/context/repo-knowledge.json` (managed by `knowledge-manager.cjs`). This file contains the Monster's answer key and player-validated discoveries. See `context/agent/CONTEXT-GATHERING.md` for the full schema.

### `preferences`

Player preferences for experience customization.

| Field         | Type | Description                |
| ------------- | ---- | -------------------------- |
| `monsterTone` | enum | Snark intensity preference |

**Tone Levels:**
| Level | Description |
|-------|-------------|
| `friendly` | Light teasing, encouraging |
| `balanced` | Default, moderate snark |
| `spicy` | More mockery, less hand-holding |
| `full-monster` | Maximum chaos energy |

---

## Default State

New game initialization:

```json
{
  "schemaVersion": 1,
  "repo": {
    "id": "",
    "path": "",
    "name": ""
  },
  "player": {
    "name": "",
    "totalCommits": 0,
    "currentLives": 5,
    "startedAt": ""
  },
  "progress": {
    "currentChapter": "investigation",
    "currentGame": "",
    "chaptersCompleted": [],
    "questionHistory": []
  },
  "monster": {
    "currentMood": "dismissive",
    "respectLevel": 0,
    "memorableExchanges": [],
    "lastMockery": ""
  },
  "session": {
    "conversationSummary": "",
    "lastEmotionalBeat": "",
    "pendingCallbacks": []
  },
  "behavior": {
    "hintUsageCount": 0,
    "averageResponseTime": 0,
    "accuracyByTopic": {},
    "playerStyle": "balanced"
  },
  "context": {
    "prepared": false,
    "preparedAt": "",
    "contextFiles": []
  },
  "preferences": {
    "monsterTone": "balanced"
  }
}
```

---

## State Location

```
.onboardme/
├── state.json          # Main state file
└── state.backup.json   # Auto-backup before writes
```

---

## Migration Strategy

When `schemaVersion` changes:

1. Load existing state
2. Check `schemaVersion`
3. Apply migrations sequentially
4. Update `schemaVersion`
5. Save migrated state

```typescript
const migrations: Record<number, (state: unknown) => unknown> = {
  // Version 1 → 2: Example migration
  2: (state) => ({
    ...state,
    schemaVersion: 2,
    newField: "default",
  }),
};

function migrateState(state: OnboardMeState): OnboardMeState {
  let current = state;
  while (current.schemaVersion < CURRENT_VERSION) {
    const nextVersion = current.schemaVersion + 1;
    current = migrations[nextVersion](current);
  }
  return current;
}
```

---

## State Access Patterns

**Read-only access (most games):**

```typescript
const state = await readState();
const { currentMood, respectLevel } = state.monster;
```

**Write access (checkpoints, answer results):**

```typescript
await updateState({
  monster: { respectLevel: state.monster.respectLevel + 10 },
  progress: {
    questionHistory: [...state.progress.questionHistory, result],
  },
});
```

**Atomic updates:** Always read-modify-write with backup.

## Auto-Scoring

The `add-question` command automatically handles scoring:

- **Commits**: If the result includes a `commits` field, it's added to `player.totalCommits`
- **Lives**: If `tier` is `"incorrect"`, `player.currentLives` is decremented by 1

This means the agent only needs to call `add-question` — no separate `write` call for scoring.

## Companion: Knowledge File

Game state (`state.json`) tracks **where the player is**. Codebase knowledge (`repo-knowledge.json`) tracks **what's known about the repo**.

Together they enable full cross-session resumption:

```
state.json          → chapter, score, lives, mood, question history
repo-knowledge.json → codebase facts, player-validated discoveries
```

---

_Document Version: 1.1_
_Last Updated: 2026-02-06_
