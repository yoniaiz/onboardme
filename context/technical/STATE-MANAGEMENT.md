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
