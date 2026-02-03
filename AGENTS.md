# Instructions for AI Agents

This is OnboardMe — a gamified CLI tool for codebase onboarding.

## Project Documentation

Before making changes, understand the project:

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
├── integration/     # Full flow tests
│   ├── cli.test.ts
│   └── games/
└── unit/            # Critical module tests
    └── scoring.test.ts
```

### Test Guidelines

- Each test file tests one feature or module
- Use descriptive test names that explain the behavior
- Avoid mocking unless absolutely necessary
- Tests should be fast and deterministic

---

## Session Workflow

### Before Making Changes

1. Read relevant documentation (PRD, Architecture, specific context files)
2. Understand the existing code structure
3. Plan the minimal changes needed

### After Making Changes

Run quality checks before finishing:

```bash
bun run test        # Ensure tests pass
bun run typecheck   # Ensure types are correct
bun run check       # Ensure code style is clean
bun run knip        # Ensure no unused code
```

Only run checks for affected areas — if you changed code that could affect tests, run tests. If you only changed types, run typecheck.

---

## Boundaries

### Always Do

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
├── AGENTS.md             # This file
├── package.json
├── tsconfig.json
├── biome.json
└── knip.json
```

---

*Document Version: 0.1*
*Last Updated: 2026-02-03*
