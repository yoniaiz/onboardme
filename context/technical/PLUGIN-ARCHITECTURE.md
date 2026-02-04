# Game Architecture (React-Based)

> This document describes the **current** game system. The legacy class-based `GameEngine` / `GamePlugin` / template system has been removed.

## Overview

OnboardMe runs games with a React-first architecture:

- **Games are React components** rendered with Ink
- **Game state lives in hooks** (typically `useReducer`)
- **Games are exported as typed factories** via `defineGame()` (similar to Vite/ESLint config patterns)
- **Users choose games via TypeScript config** in `.onboardme/config.ts` using `defineConfig()`
- **A React orchestrator** (`GameOrchestrator`) renders games and aggregates session stats
- **Logic stays pure** (validation/state transitions live in standalone functions)

## Core Types

The shared types live in `src/types/game.ts`:

- **`GameQuestion`**: prompt + type + options (multiple-choice / text-input)
- **`AnswerResult`**: what the orchestrator records per answer
  - `isNavigation?: true` marks UI navigation events that should not affect score/stats
- **`GameResult`**: game completion result
- **`GameProps<TConfig>`**: props every game component receives
- **`GameInstance<TConfig>`**: a configured game (component + config + metadata + AI context)
- **`defineGame()` / `defineConfig()`**: helpers that preserve type inference

## Defining a Game

Recommended folder layout:

```
src/games/my-game/
├── index.ts        # defineGame() export
├── component.tsx   # React component (useReducer)
├── types.ts        # Config + data types (often with Zod)
├── state.ts        # State + actions
├── reducer.ts      # Pure reducer
├── logic.ts        # Pure validation/state helpers
└── ai-context.ts   # AI context for question generation
```

### `index.ts`: export a typed factory

Each game exports a factory created by `defineGame()`:

```typescript
import { defineGame } from "@/types/game.ts";
import type { MyGameConfig } from "./types.ts";
import { MyGameComponent } from "./component.tsx";
import { defaultConfig } from "./types.ts";
import { getAIContext } from "./ai-context.ts";

export const MyGame = defineGame<MyGameConfig>({
  id: "my-game",
  component: MyGameComponent,
  defaultConfig,
  metadata: {
    id: "my-game",
    name: "my --game",
    description: "",
    estimatedMinutes: 5,
  },
  getAIContext,
});
```

Calling `MyGame({ ...options })` returns a `GameInstance<MyGameConfig>`.

### `component.tsx`: implement the UI + callbacks

Every game component receives `config`, `onAnswerResult`, and `onGameComplete`.

Rules of thumb:

- Call **`onAnswerResult`** every time the player submits an answer (or performs a scored action)
- Call **`onGameComplete`** exactly once when the game is complete
- Use `AnswerResult.isNavigation = true` for actions like “select category” that should not award commits

## User Configuration (`.onboardme/config.ts`)

Users configure the session with a TypeScript file:

```typescript
// .onboardme/config.ts
import { defineConfig, FileDetective } from "onboardme/games";

export default defineConfig({
  games: [
    FileDetective(),
    // Add more games here (built-in or local)
  ],
});
```

How it’s loaded:

- The CLI calls `loadConfig(rootDir)` in `src/core/config.ts`
- If `.onboardme/config.ts` does not exist (or fails to load), it falls back to `getDefaultConfig()` from `src/games/index.ts`

Because it’s TypeScript, teams can import custom games directly from local paths or packages—no registries or string IDs needed.

## Orchestration (`GameOrchestrator`)

`src/ui/orchestrator/game-orchestrator.tsx` is responsible for:

- Selecting the current game (`config.games[index]`)
- Rendering the current game component
- Tracking session stats (commits, accuracy, streak)
- Advancing to the next game on `onGameComplete`

## AI Context

Each game provides `getAIContext()` which returns `GameAIContext` (also in `src/types/game.ts`).

This is the contract for skills that generate prepared data/questions: it explains the game’s purpose, config schema, and question guidelines.

## Testing

E2E tests render game components directly:

- `tests/e2e/framework/withGameE2E` mounts the component with a config
- It simulates keyboard input (`press`, `type`) and captures frames (`lastFrame`)
- It captures `AnswerResult[]` and the final `GameResult`

This avoids adapters/engines and makes tests close to “real UI.”

## Scaffolding (`onboardme game:new`)

The CLI can scaffold a new game:

```bash
onboardme game:new my-game
```

This creates `src/games/my-game/` with the standard files and minimal working boilerplate.

## Design Decisions (Why This Architecture)

- **React components instead of classes**: state is explicit, updates are automatic, and UI+state stays together
- **TypeScript config instead of template JSON**: full autocomplete + type inference, import-based composition, fewer runtime errors
- **Pure logic + reducers**: deterministic behavior and straightforward tests
- **E2E renders components directly**: no registry/engine abstraction layer needed for UI correctness

