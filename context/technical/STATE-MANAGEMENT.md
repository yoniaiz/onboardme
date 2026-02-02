# State Management

## Progress Tracking

```typescript
interface Progress {
  currentTodo: number;              // 1-5 or 0 for FIXME
  currentSubTask: string | null;
  currentChallenge: number;
  
  todos: Record<string, TodoProgress>;
  monsterIntegrity: number;         // 0-100, decreases as TODOs complete
  
  stats: {
    totalCommits: number;           // XP equivalent
    totalTime: number;
    challengesAnswered: number;
    correctAnswers: number;
    stackOverflowUsed: number;      // Hints used
    longestCleanStreak: number;
    currentCleanStreak: number;
  };
  
  checkpoint: {
    canResume: boolean;
    resumePoint: ResumePoint | null;
  };
}
```

## History (Audit Trail)

Every answer is logged:

```typescript
interface HistoryEntry {
  timestamp: string;
  todo: number;
  subTask: string;
  challengeId: string;
  challenge: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeToAnswer: number;
  stackOverflowUsed: number;
  commitsEarned: number;
  documentationUnlocked: string[];
}
```

## Documentation Log

What the user has learned (knowledge unlocks):

```typescript
interface DocumentationEntry {
  id: string;
  unlockedAt: string;
  todo: number;
  category: string;
  title: string;
  content: string;           // AI-generated explanation
  relatedFiles: string[];
  relatedDocs: string[];
}
```

---

## Behavioral Tracking

**New feature:** Track player behavior patterns for dynamic Monster reactions.

> **See [BEHAVIORAL-TRACKING.md](./BEHAVIORAL-TRACKING.md) for complete specifications.**

```typescript
interface BehavioralTracking {
  hints: {
    totalHints: number;
    hintsPerTODO: Record<number, number>;
    lastHintTime: Date;
    consecutiveHints: number;
  };
  
  speed: {
    answerTimes: number[];
    timeouts: number;
  };
  
  exploration: {
    filesOpened: Set<string>;
    fileOpenCounts: Record<string, number>;
    docsRevisits: number;
  };
  
  accuracy: {
    currentStreak: number;
    wrongStreak: number;
    totalCorrect: number;
    totalQuestions: number;
  };
  
  commands: {
    commandsUsed: Record<string, number>;
    totalCommands: number;
  };
  
  personality: {
    type: 'methodical' | 'aggressive' | 'balanced' | 'struggling';
    traits: string[];
    confidence: number;
  };
}
```

**Purpose:** Enable Monster to react to player patterns dynamically, creating illusion of awareness.

---

## Memory Logs

**New feature:** Track unlocked backstory fragments.

> **See [MEMORY-LOGS.md](../narrative/MEMORY-LOGS.md) for complete specifications.**

```typescript
interface MemoryLogTracking {
  unlocked: Array<{
    id: string;
    theme: string;
    unlockedAt: Date;
    trigger: string;
  }>;
  total: number;
  viewed: string[];
}
```

**Storage:** `.onboarding/state/memory-logs.json`
