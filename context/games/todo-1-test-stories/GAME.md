# TODO #1: test --stories

## Game Overview

**Type:** Behavior Discovery  
**Goal:** Learn expected behaviors from test files  
**Level:** 1 (TODO #1)  
**Sub-task:** Third sub-task of TODO #1  
**Duration:** ~12 minutes

## Core Concept

Tests are living documentation - they describe what the product SHOULD do and must stay accurate (or they'd fail). This game teaches players to use tests as a source of truth for understanding expected behaviors.

**Philosophy:** When you want to know "should this work?", tests have the answer.

## Learning Outcomes

- Tests as documentation (not just for CI)
- How to find expected behaviors quickly
- Edge cases and business rules
- Where to look when debugging unexpected behavior

## Game Flow

### Opening: The Teaching Moment

```
"You've seen what the product does.
 But how do you know what it SHOULD do?"

Tests are living documentation.
They describe expected behaviors that must stay true.

Let's explore what this codebase promises to do.
```

### Phase 1: Locate Tests (~2 min)

**Challenge:** Find where tests live in this project

1. CLI asks: "Where do the tests live?"
2. Player explores, finds: `__tests__/`, `spec/`, `*.test.ts`, `*.spec.js`, etc.
3. CLI confirms: "Found! This project has X test files covering Y areas"

**Variations:**
- Some projects: `src/__tests__/`
- Some projects: `test/` at root
- Some projects: `*.test.ts` next to source files
- Some projects: multiple patterns

### Phase 2: Read the Stories (~5 min)

**Challenge:** Understand what behaviors are documented

1. CLI shows categories of tests found (auth, users, projects, etc.)
2. Player explores describe blocks and test names
3. CLI asks: "What user actions have test coverage?"
4. Player reports key behaviors they found

**Example exploration:**
```
Tests found in: src/__tests__/

Categories:
• auth/ - 12 tests
• users/ - 8 tests  
• projects/ - 15 tests

Pick a category to explore: _
```

### Phase 3: Answer from Tests (~5 min)

**Challenge:** Find specific behaviors in tests

CLI asks questions that require reading tests:

| Question Type | Example |
|--------------|---------|
| **Validation rules** | "What's the minimum password length?" |
| **Edge cases** | "What happens with duplicate email signup?" |
| **Business rules** | "Can a user belong to multiple organizations?" |
| **Error handling** | "What error is returned for invalid tokens?" |
| **Limits** | "How many projects can a free user create?" |

Player finds answers in test assertions:
- `expect(error.message).toBe('Password must be at least 8 characters')`
- `it('should reject duplicate emails', ...)`
- `describe('user can belong to multiple orgs', ...)`

### Pro Tip (shown during gameplay)

```
💡 Pro tip: When you join a new team, reading test descriptions
   is one of the fastest ways to understand expected behaviors.
   
   Tests must pass, so they're always up-to-date documentation.
```

## Why Tests (Not Just Running the App)?

Tests document:
- **Edge cases** you can't easily reproduce (rate limits, concurrent access)
- **Error states** that are hard to trigger manually
- **Validation rules** without digging through code
- **Business logic** decisions in plain English
- **Expected behavior** that might differ from actual (bugs!)

## Adaptability

Different test frameworks, same concept:

| Framework | Where to Look |
|-----------|---------------|
| **Jest** | `describe()` blocks, `it()` / `test()` names |
| **Mocha** | `describe()` / `it()` structure |
| **pytest** | `test_` function names, docstrings |
| **RSpec** | `describe` / `it` / `context` blocks |
| **JUnit** | `@Test` method names, `@DisplayName` |

## Design Decisions

### Why Explicitly Teach "Tests = Docs"?
- Many devs don't think to read tests when onboarding
- This is a genuinely useful skill transfer
- Tests are more reliable than comments or outdated docs

### Guided Discovery
- We tell them to look at tests (not expect them to figure it out)
- The skill is knowing tests are valuable, then practicing using them

### Questions Require Test Reading
- Can't answer just from running the app
- Forces engagement with test files
- Reveals edge cases they wouldn't otherwise discover

## Monster Reaction on Completion

After completing all TODO #1 sub-tasks:

```
*CRACKLE*

*the static surges*

"You completed a TODO?"

*pause*

"AN ACTUAL TODO?"

*static spike*

"Do you know how long that's been there?"

*whirrrr... calculating*

"That TODO is older than some of your coworkers."

*tangle*

"Added by @sarah-dev-2019."

*creak*

"She's a CTO now. Different company."

*pause*

"Still has nightmares about this codebase."

*kzzzzzt*

"...I felt that."

*the static wavers*

"Something just... left me."

*drip*

"A piece of me. Gone. Documented."

*slrrrrp*

"It's fine."

*HRRRRNN*

"I have PLENTY more where that came from."

*tangle tangle tangle*

"TODO #2 awaits. This time it gets REAL."

*[TODO #1 RESOLVED — INTEGRITY REDUCED]*
```

## Visual Reference

See [GAME-VISUALS.md](./GAME-VISUALS.md) for screen mockups and UI design.
