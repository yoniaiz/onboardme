# TODO #2: grep --hunt

## Game Overview

**Type:** Bug Hunt (Mark & Find)  
**Goal:** Find bugs by running tests and marking the source  
**Level:** 2 (TODO #2)  
**Sub-task:** First sub-task of TODO #2  
**Duration:** ~12 minutes

## Core Concept

A test is failing. Player must run the tests, understand the failure, hunt down the buggy code, and mark it with a special comment. This teaches real debugging workflow: test failure → investigate → locate → understand.

**Philosophy:** Real debugging starts with a failing test. Learn to follow the trail.

## Learning Outcomes

- How to run tests in this codebase
- Reading and understanding test failures
- Navigating from test to implementation
- Debugging workflow (symptom → source)
- Search strategies for finding code

## Game Flow

### Phase 1: The Failing Test (~2 min)

CLI triggers or reveals a failing test:

```
┌─────────────────────────────────────────────────────────────┐
│  grep --hunt                                    BUG HUNT    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔴 A test is failing.                                      │
│                                                             │
│  Run the test suite to see what's broken:                   │
│                                                             │
│    npm test                                                 │
│    (or the test command for this project)                   │
│                                                             │
│  Find the failing test and understand what's wrong.         │
│                                                             │
│  [Press ENTER when you've seen the failure]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 2: The Hunt (~8 min)

Player hunts for the bug and marks it:

```
┌─────────────────────────────────────────────────────────────┐
│  grep --hunt                                    HUNTING     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Test failure: "email validation should reject invalid      │
│  emails" - Expected false, got true                         │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Your mission:                                              │
│  1. Find the buggy code that's causing this failure         │
│  2. Mark it with this comment:                              │
│                                                             │
│     // ONBOARD:BUG email-validation                         │
│                                                             │
│  Place the marker on the line(s) that contain the bug.      │
│                                                             │
│  ⏱️ 8:00 remaining                                          │
│                                                             │
│  [Press ENTER when you've marked the bug]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Validation (~2 min)

CLI greps for the marker and validates:

```
┌─────────────────────────────────────────────────────────────┐
│  grep --hunt                                   VALIDATING   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Scanning for marker: // ONBOARD:BUG email-validation       │
│                                                             │
│  Found at: src/utils/validators.ts:27                       │
│                                                             │
│  ✓ CORRECT! You found the bug.                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Line 27:                                           │   │
│  │  const isValidEmail = (email) => email.includes('@');│   │
│  │                                                     │   │
│  │  THE BUG: Only checks for '@', not valid domain.    │   │
│  │  'test@test' passes but shouldn't.                  │   │
│  │                                                     │   │
│  │  THE FIX: Use proper email regex or validation      │   │
│  │  library like validator.js or zod.string().email()  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Cleaning up marker...                                      │
│                                                             │
│  +50 commits                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Why Failing Tests?

| Without Tests | With Failing Test |
|---------------|-------------------|
| "Find the bug somewhere" (vague) | Clear starting point |
| Could be anywhere in codebase | Test points to feature area |
| No way to verify fix | Can re-run test to confirm |
| Overwhelming in large codebases | Scoped and achievable |

## Marker Syntax

```
// ONBOARD:BUG <hunt-id>
```

- `ONBOARD:BUG` - Marker type (bug hunt)
- `<hunt-id>` - Unique ID for this hunt (provided by CLI)

## Validation Logic

1. Grep for marker with correct hunt-id
2. Check if marker is in reasonable file (not config, not test file itself)
3. Check if marker is near the actual bug (within N lines of expected location)
4. If wrong: Give hint about which direction to look
5. If correct: Show explanation and cleanup

## Adaptability

Bug scenarios adapt to project type:

| Project Type | Example Bug Scenarios |
|--------------|----------------------|
| **Backend** | Validation fails, auth bypass, wrong query |
| **Frontend** | State not updating, wrong prop handling |
| **CLI** | Flag parsing error, output format wrong |
| **Library** | Edge case not handled, type coercion bug |

## Design Decisions

### Why Run Tests First?
- Teaches the real debugging workflow
- Test output gives clues about where to look
- Player learns to read test failures
- Scopes the hunt (not "find bug somewhere")

### Why Mark in Code?
- Hands-on interaction with codebase
- More memorable than typing path in CLI
- Proves player actually found the right spot
- Consistent with `feature --locate` mechanic

### Time Pressure
- Timer adds urgency but is generous
- Failing test already scopes the problem
- If timeout: Show answer and explain

## Monster Reaction on Completion

After completing both TODO #2 games:

```
"You can grep. Impressive."
"My grandma's bash script can grep."
"...Okay, she doesn't have a bash script."
"She's also not real. I made her up."
"I do that sometimes. Make things up."
"Like the comments in this codebase."
```

## Visual Reference

See [GAME-VISUALS.md](./GAME-VISUALS.md) for screen mockups and UI design.
