# Instructions for AI Agents

This is OnboardMe — a gamified CLI tool for codebase onboarding.

## Project Documentation

Before making changes, understand the project:

- **[PROGRESS.md](./PROGRESS.md)** — Current milestone, task breakdown, and what to work on next
- **[PRD.md](./PRD.md)** — Product requirements, vision, game design, and user journey
- **[context/ARCHITECTURE.md](./context/ARCHITECTURE.md)** — Technical architecture, plugin system, and file structure

For specific tasks, reference additional context:

| Task Type | Reference Documents |
|-----------|---------------------|
| Game mechanics | `context/games/*/GAME.md` |
| Visual design | `context/visuals/*.md`, `context/games/*/GAME-VISUALS.md` |
| CLI commands | `context/technical/CLI-COMMANDS.md` |
| State management | `context/technical/STATE-MANAGEMENT.md` |
| Narrative/dialogue | `context/narrative/*.md` |
| Plugin development | `context/technical/PLUGIN-ARCHITECTURE.md` |

---

## Tech Stack

- **Runtime**: Bun (>=1.1.0)
- **Language**: TypeScript (strict mode)
- **Linter/Formatter**: Biome
- **Dependency Checker**: Knip

### Dependency Management

When adding dependencies:

1. Always use the **latest stable version** — verify on npm before adding
2. Use `bun add <package>` for runtime deps, `bun add -d <package>` for dev deps
3. Never guess versions — check the actual latest version first
4. Avoid adding unnecessary dependencies — prefer built-in solutions

---

## Commands

```bash
# Development
bun run dev          # Run with hot reload
bun run start        # Run the CLI

# Quality checks
bun run typecheck    # TypeScript type checking
bun run check        # Biome lint + format check
bun run knip         # Unused dependency/export check
bun run test         # Run tests

# Fixes
bun run check:fix    # Auto-fix lint/format issues
```

---

## Code Standards

### Design Principles

- **Composition over inheritance** — build features by combining small, focused functions and modules
- **DRY (Don't Repeat Yourself)** — extract shared logic into reusable utilities; if you write similar code twice, refactor
- **Separation of concerns** — each module handles one responsibility; keep UI, logic, and data separate
- **Single responsibility** — functions do one thing well; if a function needs "and" to describe it, split it

### File Size

- **Maximum 200 lines per file** — split larger files into focused modules
- Prefer many small, focused files over few large files
- One concept per file

### Code Quality

- **No comments** — code must be self-explanatory through naming and structure
- **No redundant code** — don't add functions "just in case" they might be needed
- **No dead code** — every function and export must be used
- Write the minimum code required to accomplish the task

### Naming Conventions

- Files: `kebab-case.ts`
- Functions/variables: `camelCase`
- Types/interfaces: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`

### Code Style Example

```typescript
// Good — clear, minimal, self-explanatory
export function calculateScore(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

// Bad — unnecessary comments, verbose
// Calculate the score as a percentage
export function calculateScore(correct: number, total: number): number {
  // Handle edge case where total is zero to avoid division by zero
  if (total === 0) {
    return 0; // Return zero if no questions
  }
  // Calculate percentage and round to nearest integer
  const percentage = (correct / total) * 100;
  return Math.round(percentage);
}
```

---

## Testing Strategy

### Priority: Integration Over Unit

1. **Integration tests first** — test actual user flows and CLI behavior
2. **Unit tests when essential** — for complex algorithms or critical utilities
3. **Don't test implementation details** — test behavior, not internals

### Test Organization

```
tests/
├── integration/     # Full CLI flows
├── unit/            # Critical utilities/modules
└── e2e/             # End-to-end Ink UI tests
    ├── framework/   # E2E testing framework
    ├── configs/     # Game configs used by tests
    └── sandbox/     # Experimentation area
```

### Test Guidelines

- Each test file tests one feature or module
- Use descriptive test names that explain the behavior
- Avoid mocking unless absolutely necessary
- Tests should be fast and deterministic

---

## E2E Testing Framework

The E2E framework allows testing game UIs with real interactions. It renders Ink components in memory and simulates keyboard input.

### When to Use E2E Tests

- Testing game UI flows and state transitions
- Verifying visual output matches expectations
- Debugging game interactions
- Understanding how games work

### Quick Start

```typescript
import { withGameE2E } from "./framework/index.ts";
import { FILE_DETECTIVE_TEST_CONFIG } from "./configs/file-detective.ts";
import { FileDetectiveComponent } from "@/games/file-detective/component.tsx";

await withGameE2E({
  GameComponent: FileDetectiveComponent,
  config: FILE_DETECTIVE_TEST_CONFIG,
}, async (e2e) => {
  e2e.debug("Initial");           // Print current screen
  await e2e.press("enter");       // Press Enter key
  await e2e.press("enter");       // Submit
  expect(e2e.getResults().at(-1)?.correct).toBe(true);
});
```

### Available Methods

| Method | Description |
|--------|-------------|
| `e2e.debug(label)` | Print current screen with label |
| `e2e.lastFrame()` | Get current screen as string |
| `e2e.press(key)` | Press key: `enter`, `up`, `down`, `left`, `right`, `escape`, `tab`, `backspace` |
| `e2e.type(text)` | Type text input |
| `e2e.waitFor(fn)` | Wait for condition to be true |
| `e2e.getResults()` | Get the `AnswerResult[]` captured so far |
| `e2e.getGameResult()` | Get the final `GameResult` (or `null` if incomplete) |

### Sandbox for Experimentation

Use `tests/e2e/sandbox/` for experimenting with games without modifying actual tests:

```bash
bun run tests/e2e/sandbox/file-detective.sandbox.ts
```

The sandbox is ideal for:
- Understanding game flow before writing tests
- Debugging UI issues
- Exploring state transitions
- Learning how games work

### Adding E2E Tests for New Games

1. Create config in `tests/e2e/configs/`
2. Create test file as `tests/e2e/{game-name}.e2e.test.ts`
3. Optionally create sandbox file for experimentation

---

## Session Workflow

### Before Starting Work

1. **Check [PROGRESS.md](./PROGRESS.md)** — Find the next `pending` task in the current milestone
2. **Mark task as `in_progress`** — Update PROGRESS.md before starting
3. Read relevant documentation for the task (PRD, Architecture, specific context files)
4. Understand the existing code structure
5. Plan the minimal changes needed

### While Working

- Complete one task at a time
- Follow task acceptance criteria
- Keep changes focused on the current task

### After Completing a Task

1. **Mark task as `completed`** in PROGRESS.md
2. Run quality checks:

```bash
bun run test        # If you changed code that could affect tests
bun run typecheck   # If you changed types or added new code
bun run check       # Ensure code style is clean
bun run knip        # Ensure no unused code
```

3. Move to the next `pending` task, or end the session

Only run checks for affected areas — if you changed code that could affect tests, run tests. If you only changed types, run typecheck.

---

## Boundaries

### Always Do

- Check PROGRESS.md for the next task before starting work
- Mark tasks as `in_progress` before starting, `completed` when done
- Read documentation before implementing
- Keep files under 200 lines
- Add integration tests for new features
- Verify dependency versions before adding
- Run quality checks after code changes

### Ask First

- Major architectural changes
- Adding new dependencies
- Changing existing APIs
- Modifying shared utilities

### Never Do

- Add comments to explain code (make code self-explanatory instead)
- Add unused functions or exports
- Commit secrets or API keys
- Skip quality checks before finishing
- Guess dependency versions

---

## Project Structure

```
onboardme/
├── src/
│   └── index.ts          # Entry point
├── tests/
│   ├── integration/      # Flow tests
│   └── unit/             # Module tests
├── context/              # Design documentation
│   ├── ARCHITECTURE.md
│   ├── games/
│   ├── narrative/
│   ├── technical/
│   └── visuals/
├── PRD.md                # Product requirements
├── PROGRESS.md           # Task tracking & milestones
├── AGENTS.md             # This file
├── package.json
├── tsconfig.json
├── biome.json
└── knip.json
```

---

*Document Version: 0.3*
*Last Updated: 2026-02-04*
