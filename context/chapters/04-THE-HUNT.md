# Chapter 4: The Hunt

_Duration: ~30 minutes_
_Artifacts: Bug fix + `IMPACT_ANALYSIS.md`_

---

## Goal

The Monster sabotages the codebase on the game branch. The player must diagnose the sabotage using test failures, trace it to the root cause, explain WHY it breaks, and actually FIX it. Then the player demonstrates architectural understanding through feature planning and impact analysis.

---

## Core Mechanic: Monster-as-Saboteur

Unlike Chapters 1-3 (investigation, execution, tracing), Chapter 4 is where the **Monster fights back**. The Monster deliberately introduces a subtle bug via a commit on the `onboardme/game` branch. The player must:

1. Read the test failure output
2. Form a hypothesis
3. Trace the code to the root cause (using skills from Ch3)
4. EXPLAIN to the Monster what's wrong (understanding, not just finding)
5. Fix the code
6. Verify the fix passes tests

**Why sabotage over existing bugs:**

- **Narrative:** The Monster is desperate. Sabotage is its last defense.
- **Educational:** Mirrors real debugging — "someone introduced a regression."
- **Mechanical:** Works on ANY codebase. Agent controls difficulty.

**The game branch (`onboardme/game`) was created during prepare-game.** The player's original branch is never touched.

---

## Sabotage Design

**Good sabotage types:**

| Type | Example | Difficulty |
|------|---------|------------|
| Change comparison operator | `<=` to `<` | Medium |
| Remove validation step | Delete a null check | Easy |
| Swap similar function calls | `.find` to `.filter` | Medium |
| Change a default value | Timeout from 5000 to 50 | Hard |
| Remove an `await` | Race condition | Hard |
| Modify config value | Change threshold/limit | Medium |

**Bad sabotage (avoid):**

- Deleting a function entirely (too obvious)
- Syntax errors (caught by linter)
- Changing variable names (caught by TypeScript)
- Breaking 10 things at once (overwhelming)

**Commit messages are misleading but plausible:**

- "refactor: simplify validation logic"
- "perf: optimize database query"
- "cleanup: remove redundant check"

**Can the player "cheat" with git?** Yes, and that's fine. `git log` and `git diff` are valid debugging techniques. Scoring rewards UNDERSTANDING, not just FINDING.

---

## Inputs

| Resource | Access | Notes |
|----------|--------|-------|
| `src/**/*.ts`, `src/**/*.js` | read/write | Source code (sabotage + fix) |
| `tests/**/*` | read | Test files for failure info |
| Test commands (`npm test`, `bun test`, etc.) | run | Run tests to verify sabotage and fix |
| `git add`, `git commit` | run | Commit sabotage on game branch |
| `git diff`, `git status` | run | Verify player's fix |

---

## State

**Reads:**
- `player.name` — Personalized dialogue
- `monster.currentMood` — Should be `worried` → `desperate`
- `progress.questionHistory[]` — Prior knowledge (informs sabotage target)
- `behavior.playerStyle` — Adapt hunt difficulty
- `git.gameBranch` — Confirm on game branch

**Writes:**
- `progress.questionHistory[]` — Add hunt results (sabotage details, fix quality)
- `monster.respectLevel` — Major increase for clean fixes
- `monster.currentMood` — Shift to `desperate`
- `artifacts.impactAnalysis.path` — Created artifact

---

## Rubric

| Tier | Criteria | Example |
|------|----------|---------|
| **Incorrect** | Wrong location or wrong fix | Editing unrelated file, fix breaks other tests |
| **Partial** | Found bug but can't explain WHY | "This line looks wrong" (no root cause) |
| **Correct** | Bug found, root cause explained, properly fixed | Clean fix, tests pass, no regressions |
| **Deep** | Fix + understanding + prevention | "Fixed it, explained downstream impact, suggested test coverage" |

---

## Flow

### Phase 1: The Sabotage (~3 min)

Agent picks sabotage target using Ch1-3 discoveries, reads source files on-demand, makes the change, commits with misleading message, then dramatically reveals:

```
*MASSIVE STATIC SURGE*

"You traced the flows."

*tangle*

"You know how data SHOULD move."

*long pause*

"But what happens when I... make a change?"

*crackle crackle crackle*

"I've done something."

*slrrrrp*

"Something is broken now."

*heh*

"The tests will tell you WHAT."

*pause*

"But YOU need to figure out WHY."

*[THE HUNT BEGINS]*
```

Agent runs tests and shows failure output.

### Phase 2: The Hunt (~15 min)

Player-driven investigation:

- Player reads test failure, forms hypothesis
- Player traces code to root cause (using Ch3 skills)
- Player EXPLAINS to the Monster what's wrong (Monster evaluates understanding)
- Player fixes the code
- Agent re-runs tests to validate
- Agent reviews git diff of the fix
- Optional: if player handles quickly, Monster reveals second sabotage

### Phase 3: Feature Location (~10 min)

Breathing room after debugging. Different skill: architectural planning.

- Agent presents a realistic feature request for this codebase
- Player identifies where new code should live (files, layers, patterns)
- Tests architectural understanding from Ch3
- "You fixed my mess. Now show me where NEW code goes."

### Phase 4: Impact Reflection (~2 min)

Quick systems thinking test:

- "If I removed [key service], what would break?"
- Player traces dependencies and downstream effects
- Validates that the player sees the whole system

---

### Closing: Hunter Complete

```
*MASSIVE STATIC SURGE*

*the codebase trembles*

"You know where the bugs live."

*creak*

"You know where new code should go."

*slrrrrp slrrrrp*

"You're thinking like..."

*long pause*

"...like someone who BELONGS here."

*the static grows darker*

*TANGLE TANGLE TANGLE*

"Fine."

*crackle*

"You want to understand this codebase?"

*whirrrrrrrrrr*

"Then come understand ME."

*[CHAPTER 4 COMPLETE — BOSS BATTLE AWAITS]*
```

Finalize IMPACT_ANALYSIS.md with bug details, feature plan, and impact assessment.

---

## No-Tests Scenario

If the codebase has no test runner or tests:

1. Monster introduces a bug that breaks **project startup** or **compilation**
2. OR Monster writes a simple test alongside the sabotage: "There are no tests? That IS the bug. Fine, I wrote one."
3. The "fix" includes both fixing the code AND understanding why tests matter

---

## Recovery

**Player can't find the bug:**

1. First hint: "The test name tells you what's broken"
2. Second hint: "Search for the function being tested"
3. Third hint: "It's in [directory] — look at the [specific area]"
4. Skip: Agent shows location and explains

**Player's fix breaks other tests:**

```
"You fixed it."
"...And broke three other things."
"Classic."
"Maybe a more surgical fix?"
```

**Player uses git to find the change:**

Valid technique. Don't penalize. But require UNDERSTANDING of WHY it breaks.

---

## Timing

| Parameter | Value |
|-----------|-------|
| Expected duration | 30 minutes |
| Warning trigger | 35 minutes |
| Move-on trigger | 40 minutes |
| Checkpoint | After bug fix |

---

## Consolidated From

This chapter combines:
- **grep --hunt**: Bug hunting with marker system → Monster-as-saboteur mechanic
- **feature --locate**: Feature planning with location marking

The agent model enables:
- **Active sabotage** — Monster introduces bugs on the game branch
- Running real tests and showing failures
- Verifying actual fixes via test re-runs
- Reviewing git diffs to validate changes
- Active pattern searching
- Difficulty scaling based on player performance

---

_Document Version: 2.0_
_Last Updated: 2026-02-06_
