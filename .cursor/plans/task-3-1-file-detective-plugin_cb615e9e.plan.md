---
name: task-3-1-file-detective-plugin
overview: Implement the core FileDetective game plugin (types, schema, logic) and register it so the engine can load it for the default template.
todos:
  - id: progress-start
    content: Mark task 3.1 as in_progress in PROGRESS.md
    status: completed
  - id: add-file-detective-plugin
    content: Create types, schema, and FileDetective plugin implementation
    status: completed
  - id: register-plugin
    content: Register FileDetective in core bootstrap
    status: completed
  - id: progress-done
    content: Mark task 3.1 as completed in PROGRESS.md
    status: completed
isProject: false
---

# Plan for task 3.1

## Summary

- Build the `file-detective` game plugin with its own types and schema, then wire it into the game registry so the engine can load it from the default template.
- Implement a custom investigation flow (evidence selection → question → note update → deduction validation) within the plugin while still returning `GameQuestion` objects for the existing UI.

## Key References

- GamePlugin base and lifecycle (`src/core/plugin.ts`):

```10:44:/Users/yonatanai/Projects/onboardme/src/core/plugin.ts
export abstract class GamePlugin {
	abstract readonly schema: GamePluginSchema;

	protected preparedData!: GamePreparedData;
	protected questions: GameQuestion[] = [];
	protected currentIndex = 0;

	abstract initialize(preparedData: GamePreparedData): Promise<void>;
	abstract start(): Promise<void>;
	abstract submitAnswer(answer: string): Promise<AnswerResult>;

	getCurrentQuestion(): GameQuestion | null {
		if (this.currentIndex >= this.questions.length) {
			return null;
		}
		return this.questions[this.currentIndex];
	}

	end(): GameResult {
		const timeSpent = this.startTime > 0 ? Date.now() - this.startTime : 0;
		return {
			completed: this.isComplete(),
			score: this.totalCommits,
			maxScore: this.questions.length * 10,
			timeSpent,
			knowledgeUnlocked: [...this.knowledgeUnlocked],
		};
	}
}
```

- Plugin schema shape and requiredContext (`src/core/types.ts`):

```32:44:/Users/yonatanai/Projects/onboardme/src/core/types.ts
export interface ContextRequirement {
	key: string;
	source: string;
	schema: Record<string, unknown>;
}

export interface GamePluginSchema {
	id: string;
	name: string;
	description: string;
	estimatedTime: number;
	requiredContext: ContextRequirement[];
}
```

- Default template includes `file-detective` (`src/core/template.ts`):

```25:33:/Users/yonatanai/Projects/onboardme/src/core/template.ts
export function getDefaultTemplate(): Template {
	return {
		games: [
			{ id: "file-detective" },
			{ id: "flow-trace" },
			{ id: "grep-hunt" },
			{ id: "spaghetti-monster" },
		],
	};
}
```

## Implementation Plan

1. Update `PROGRESS.md` to mark task 3.1 as `in_progress`.
2. Create `src/games/file-detective/types.ts` defining evidence, case note, and deduction types that match the investigation flow in `context/games/todo-0-file-detective/GAME.md`.
3. Create `src/games/file-detective/schema.ts` with `requiredContext` entries for `projectType`, `evidence`, and `deduction`, consistent with task 3.1 acceptance criteria and the plugin schema format.
4. Create `src/games/file-detective/index.ts` with a `FileDetective` class extending `GamePlugin` that:
  - Initializes from `preparedData` and sets up investigation state (available evidence, selected evidence, case notes, deduction).
  - Produces `GameQuestion` objects to drive: evidence selection, evidence question/answer, and final deduction validation.
  - Tracks examined evidence and appends case notes as answers are submitted.
  - Validates final deduction and completes the game.
5. Register `FileDetective` in `src/core/bootstrap.ts` so it can be loaded at runtime (the engine already expects `file-detective` from the default template).
6. Update `PROGRESS.md` to mark task 3.1 as `completed` once code compiles and basic flow is in place.

## Notes / Constraints

- Keep files under 200 lines and avoid comments per project standards (`AGENTS.md`).
- Use minimal code, no dead exports; everything defined must be used by the plugin.
- I will not add dependencies.

## Suggested Tests

- Run `bun run typecheck` after new TypeScript additions.
- Run `bun run test` only if we add or modify tests during this task.

