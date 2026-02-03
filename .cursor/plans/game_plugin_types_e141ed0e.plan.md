---
name: Game Plugin Types
overview: Create the core types and abstract base class for game plugins, establishing the foundation for the plugin system.
todos:
  - id: create-types
    content: Create src/core/types.ts with all game interfaces (GameQuestion, AnswerResult, GameResult, GamePluginSchema, etc.)
    status: pending
  - id: create-plugin
    content: Create src/core/plugin.ts with abstract GamePlugin class and utility methods
    status: pending
  - id: create-barrel
    content: Create src/core/index.ts barrel export
    status: pending
isProject: false
---

# Task 2.1: Game Plugin Types & Base Class

## Goal

Define the TypeScript types and abstract base class that all game plugins will implement. This establishes the contract between the game engine and individual games.

## Files to Create

### 1. `src/core/types.ts` — Core Game Types

Define all interfaces for the plugin system:

```typescript
// Question types
type QuestionType = "multiple-choice" | "text-input" | "marker" | "timed";

interface GameQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  context?: string;
  hints: string[];
  timeLimit?: number;
  // Validation handled by each game plugin
}

// Answer result from submitting an answer
interface AnswerResult {
  correct: boolean;
  feedback: string;
  knowledgeUnlocked?: string[];
  commitsEarned: number;
}

// Final result when game ends
interface GameResult {
  completed: boolean;
  score: number;
  maxScore: number;
  timeSpent: number;
  knowledgeUnlocked: string[];
}

// Plugin schema (what the plugin requires)
interface GamePluginSchema {
  id: string;
  name: string;
  description: string;
  estimatedTime: number;
  requiredContext: ContextRequirement[];
}

interface ContextRequirement {
  key: string;
  source: string;
  schema: Record<string, unknown>;  // JSON Schema
}

// Prepared data passed to plugin at init
interface GamePreparedData {
  config: Record<string, unknown>;
  questions: GameQuestion[];
}
```

### 2. `src/core/plugin.ts` — Abstract GamePlugin Class

```typescript
abstract class GamePlugin {
  abstract schema: GamePluginSchema;
  
  protected preparedData!: GamePreparedData;
  protected questions: GameQuestion[] = [];
  protected currentIndex = 0;
  
  // Lifecycle methods
  abstract initialize(preparedData: GamePreparedData): Promise<void>;
  abstract start(): Promise<void>;
  abstract end(): GameResult;
  
  // Question flow
  abstract getCurrentQuestion(): GameQuestion | null;
  abstract submitAnswer(answer: string): Promise<AnswerResult>;
  
  // Optional hooks (with default no-op implementations)
  onCorrectAnswer?(question: GameQuestion): void;
  onWrongAnswer?(question: GameQuestion): void;
  onHintUsed?(question: GameQuestion): void;
  onSkip?(question: GameQuestion): void;
  
  // Utility methods
  isComplete(): boolean;
  getProgress(): { current: number; total: number };
}
```

### 3. `src/core/index.ts` — Barrel Export

Export all types and the base class from a single entry point.

## Design Decisions

- **Abstract class over interface**: Allows shared utility methods (`isComplete`, `getProgress`) while enforcing contract
- **Async lifecycle methods**: Games may need to load assets or validate data
- **Optional hooks**: Default no-op allows games to opt-in to specific behaviors
- `**GamePreparedData` is generic**: Each game interprets its prepared data differently

## Integration Points

- Existing [src/types/state.ts](src/types/state.ts) already has `GameProgress` — will integrate with `GameResult`
- Existing [src/types/manifest.ts](src/types/manifest.ts) has `PreparedGame` — `GamePluginSchema` extends this concept

