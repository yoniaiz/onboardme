# Plugin Architecture

> **Games are plugins—modular, composable units that can be mixed, matched, and customized.**

## Overview

The plugin architecture enables:
- **Built-in games** — Bundled with the OnboardMe package
- **Custom games** — Teams create their own onboarding games
- **Templates** — Define which games to include and their order
- **Composition** — Mix built-in and custom games freely

---

## Plugin Schema

Every game plugin must define its schema. The schema tells the skill what context data the game needs.

```typescript
interface GamePluginSchema {
  id: string;                     // Unique identifier, e.g., "file-detective"
  name: string;                   // Display name, e.g., "file --detective"
  description: string;            // What this game teaches
  estimatedTime: number;          // Minutes to complete
  
  // What context this game needs
  requiredContext: ContextRequirement[];
}

interface ContextRequirement {
  key: string;                    // Key in prepared data, e.g., "projectType"
  source: string;                 // Which context file to read from
  schema: JSONSchema;             // Expected output schema
}
```

### Example: File Detective Schema

```typescript
// games/file-detective/schema.ts
export const schema: GamePluginSchema = {
  id: 'file-detective',
  name: 'file --detective',
  description: 'Investigate codebase to determine project type and tech stack',
  estimatedTime: 10,
  requiredContext: [
    {
      key: 'projectType',
      source: 'meta.json',
      schema: {
        type: 'object',
        properties: {
          language: { type: 'string' },
          framework: { type: 'string' },
          packageManager: { type: 'string' }
        },
        required: ['language', 'framework']
      }
    },
    {
      key: 'evidence',
      source: 'structure.json',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            file: { type: 'string' },
            clue: { type: 'string' },
            reveals: { type: 'string' }
          }
        }
      }
    }
  ]
};
```

---

## Plugin Interface

Every game plugin extends the base `GamePlugin` class:

```typescript
abstract class GamePlugin {
  // Schema defines requirements
  abstract schema: GamePluginSchema;
  
  // State
  protected preparedData: GamePreparedData;
  protected questions: GameQuestion[];
  protected currentIndex: number = 0;
  
  // Lifecycle methods (called by CLI)
  abstract initialize(preparedData: GamePreparedData): Promise<void>;
  abstract start(): Promise<void>;
  abstract end(): GameResult;
  
  // Question flow
  abstract getCurrentQuestion(): GameQuestion;
  abstract submitAnswer(answer: string): Promise<AnswerResult>;
  
  // Optional hooks
  onCorrectAnswer?(question: GameQuestion): void;
  onWrongAnswer?(question: GameQuestion): void;
  onHintUsed?(question: GameQuestion): void;
  onSkip?(question: GameQuestion): void;
}

interface GameQuestion {
  id: string;
  type: 'multiple-choice' | 'text-input' | 'marker' | 'timed';
  prompt: string;
  context?: string;
  hints: string[];
  timeLimit?: number;
  validation: ValidationRule;
}

interface AnswerResult {
  correct: boolean;
  feedback: string;
  knowledgeUnlocked?: string[];
  commitsEarned: number;
}

interface GameResult {
  completed: boolean;
  score: number;
  maxScore: number;
  timeSpent: number;
  knowledgeUnlocked: string[];
}
```

---

## Template System

Templates define which games to include and their order. **Position in array = TODO level.**

### Default Template

```typescript
// Bundled in onboardme package
export const defaultTemplate = [
  FileDetective,        // TODO #0
  FlowTrace,            // TODO #1
  GrepHunt,             // TODO #2
  SpaghettiMonster,     // FIXME (always last)
];
```

### JSON Template

Users can create a simple JSON template:

```json
// .onboardme/template/template.json
{
  "games": [
    { "id": "file-detective" },
    { "id": "flow-trace" },
    { "id": "spaghetti-monster" }
  ]
}
```

### TypeScript Template

For custom games, users can create a TypeScript template:

```typescript
// .onboardme/template/template.ts
import { FileDetective, FlowTrace, SpaghettiMonster } from 'onboardme';
import { MyCustomGame } from './games/my-custom-game';

export const template = [
  FileDetective,
  MyCustomGame,         // Custom game at TODO #1
  FlowTrace,            // Moved to TODO #2
  SpaghettiMonster,
];
```

### Template Resolution

1. CLI checks for `.onboardme/template/template.ts`
2. If found, runs `onboardme template build` to compile
3. Falls back to `.onboardme/template/template.json`
4. Falls back to default template

---

## Creating Custom Games

### Step 1: Create Game Class

```typescript
// .onboardme/template/games/my-custom-game.ts
import { GamePlugin, GamePluginSchema, GameQuestion } from 'onboardme';

export class MyCustomGame extends GamePlugin {
  schema: GamePluginSchema = {
    id: 'my-custom-game',
    name: 'my --custom',
    description: 'My team-specific onboarding challenge',
    estimatedTime: 15,
    requiredContext: [
      {
        key: 'teamData',
        source: 'features.json',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              owner: { type: 'string' },
              description: { type: 'string' }
            }
          }
        }
      }
    ]
  };
  
  async initialize(preparedData: GamePreparedData): Promise<void> {
    this.preparedData = preparedData;
    this.questions = preparedData.questions;
  }
  
  async start(): Promise<void> {
    this.currentIndex = 0;
  }
  
  getCurrentQuestion(): GameQuestion {
    return this.questions[this.currentIndex];
  }
  
  async submitAnswer(answer: string): Promise<AnswerResult> {
    const question = this.getCurrentQuestion();
    const correct = this.validateAnswer(answer, question);
    
    if (correct) {
      this.currentIndex++;
    }
    
    return {
      correct,
      feedback: correct ? 'Nice work!' : 'Try again.',
      commitsEarned: correct ? 100 : 0
    };
  }
  
  end(): GameResult {
    return {
      completed: this.currentIndex >= this.questions.length,
      score: this.currentIndex * 100,
      maxScore: this.questions.length * 100,
      timeSpent: 0,
      knowledgeUnlocked: []
    };
  }
  
  private validateAnswer(answer: string, question: GameQuestion): boolean {
    // Custom validation logic
    return true;
  }
}
```

### Step 2: Add to Template

```typescript
// .onboardme/template/template.ts
import { FileDetective, SpaghettiMonster } from 'onboardme';
import { MyCustomGame } from './games/my-custom-game';

export const template = [
  FileDetective,
  MyCustomGame,
  SpaghettiMonster,
];
```

### Step 3: Build Template

```bash
onboardme template build
```

### Step 4: Re-run Prepare Skill

In your AI platform, run "prepare game" to generate the prepared data for your new game.

---

## Context Schemas

The skill reads these schemas to know what data to generate.

### meta.json

```typescript
interface MetaContext {
  projectName: string;
  language: string;
  framework: string;
  packageManager: string;
  totalFiles: number;
  totalLines: number;
  entryPoints: string[];
}
```

### structure.json

```typescript
interface StructureContext {
  keyDirectories: Array<{
    path: string;
    purpose: string;
    contents: string[];
  }>;
  patterns: {
    hasTests: boolean;
    testPattern: string;
    hasConfig: boolean;
    configFiles: string[];
  };
}
```

### services.json

```typescript
interface ServicesContext {
  services: Array<{
    name: string;
    path: string;
    description: string;
    entryPoint: string;
    dependencies: string[];
    externalDeps: string[];
    keyFunctions: Array<{
      name: string;
      file: string;
      line: number;
      description: string;
    }>;
  }>;
}
```

### flows.json

```typescript
interface FlowsContext {
  flows: Array<{
    name: string;
    description: string;
    trigger: string;
    steps: Array<{
      description: string;
      file: string;
      function: string;
    }>;
  }>;
}
```

### domain.json

```typescript
interface DomainContext {
  terms: Record<string, string>;
  acronyms: Record<string, string>;
  businessRules: Array<{
    name: string;
    description: string;
    file: string;
  }>;
}
```

### features.json

```typescript
interface FeaturesContext {
  features: Array<{
    name: string;
    description: string;
    entryPoint: string;
    relatedFiles: string[];
  }>;
}
```

### debt.json

```typescript
interface DebtContext {
  monster: {
    birthYear: number;
    todoCount: number;
    oldestTodo: {
      text: string;
      file: string;
      line: number;
      age: string;
    };
    longestFunction: {
      name: string;
      lines: number;
      file: string;
    };
    complexityScore: number;
  };
}
```

### tests.json

```typescript
interface TestsContext {
  framework: string;
  testFiles: string[];
  coverage: number | null;
  patterns: {
    unitTests: string;
    integrationTests: string;
    e2eTests: string;
  };
}
```

### docs.json

```typescript
interface DocsContext {
  readme: {
    exists: boolean;
    sections: string[];
    hasSetup: boolean;
  };
  additionalDocs: Array<{
    file: string;
    title: string;
    type: string;
  }>;
}
```

### history.json

```typescript
interface HistoryContext {
  firstCommit: {
    date: string;
    author: string;
    message: string;
  };
  totalCommits: number;
  contributors: number;
  recentActivity: Array<{
    date: string;
    message: string;
    files: string[];
  }>;
}
```

---

## Prepared Data Structure

The skill generates prepared data for each game based on the template.

```
.onboardme/prepared/
├── manifest.json               # Game order and metadata
├── games/
│   ├── file-detective/
│   │   ├── config.json         # Game configuration
│   │   └── questions.json      # Generated questions
│   ├── flow-trace/
│   │   ├── config.json
│   │   └── journeys.json
│   └── spaghetti-monster/
│       ├── config.json
│       └── phases.json
└── narrative/
    ├── monster.json            # Monster personality data
    └── memory-logs.json        # Backstory fragments
```

### manifest.json

```json
{
  "version": "1.0.0",
  "generatedAt": "2025-02-02T10:30:00Z",
  "games": [
    {
      "id": "file-detective",
      "position": 0,
      "ready": true
    },
    {
      "id": "flow-trace",
      "position": 1,
      "ready": true
    },
    {
      "id": "spaghetti-monster",
      "position": 2,
      "isBoss": true,
      "ready": true
    }
  ]
}
```

---

## Validation

The CLI validates prepared data against game schemas before running.

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  suggestion?: string;
}

interface ValidationError {
  game: string;
  file: string;
  field: string;
  error: string;
  expected: string;
  received: string;
  line?: number;
}
```

### Example Validation Output

```json
{
  "valid": false,
  "errors": [
    {
      "game": "flow-trace",
      "file": "games/flow-trace/journeys.json",
      "field": "journeys[0].entryPoint",
      "error": "Missing required field",
      "expected": "string",
      "received": "undefined"
    }
  ],
  "suggestion": "Re-run 'prepare game' skill to regenerate flow-trace data"
}
```

Users show this error to their AI platform, which can then fix and re-run the prepare skill.
