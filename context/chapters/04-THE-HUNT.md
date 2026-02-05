# Chapter 4: The Hunt

_Duration: ~30 minutes_
_Artifacts: Bug fix + `IMPACT_ANALYSIS.md`_

---

## Goal

Find bugs by running tests, trace them to their source, understand the root cause, and actually FIX them. Learn feature planning by identifying where new code should live.

---

## Inputs

| Resource | Access | Notes |
|----------|--------|-------|
| `src/**/*.ts`, `src/**/*.js` | read/write | Source code (can edit for fixes) |
| `tests/**/*` | read | Test files for failure info |
| `npm test`, `jest`, `vitest` commands | run | Run tests |
| `git diff`, `git status` | run | Verify changes |
| `grep`, `rg` commands | run | Code search |

---

## State

**Reads:**
- `player.name` — Personalized dialogue
- `monster.currentMood` — Should be `worried`
- `progress.questionHistory[]` — Prior knowledge
- `behavior.playerStyle` — Adapt hunt difficulty

**Writes:**
- `progress.questionHistory[]` — Add hunt results
- `monster.respectLevel` — Major increase for clean fixes
- `monster.currentMood` — May shift to `desperate`
- `artifacts.impactAnalysis.path` — Created artifact

---

## Rubric

| Tier | Criteria | Example |
|------|----------|---------|
| **Incorrect** | Wrong location or wrong fix | Editing unrelated file, fix breaks other tests |
| **Partial** | Found bug but incomplete fix | "Found the validation but my fix is hacky" |
| **Correct** | Bug found and properly fixed | Clean fix, tests pass, no regressions |
| **Deep** | Fix + understanding + prevention | "Fixed it, understood why it happened, added test to prevent regression" |

---

## Flow

### Opening: Create IMPACT_ANALYSIS.md

Create `.onboardme/artifacts/IMPACT_ANALYSIS.md`:

```markdown
# Impact Analysis: [Project Name]

_Hunter: [Player Name]_

---

## Bugs Hunted

[Bug analysis entries will be added here]

---

## Features Planned

[Feature location analysis will be added here]

---

## Hunt Status: 🎯 ACTIVE
```

Monster introduces the hunt:

```
*crackle crackle crackle*

"You traced the flows."

*pause*

"You know how data SHOULD move."

*slrrrrp*

"But things don't always go as planned."

*tangle*

"There are bugs."

*whirrrr*

"Hidden in the layers."

*kzzzt*

"Waiting to be found."

*creak*

"...Or to find YOU."

*[THE HUNT BEGINS]*
```

---

### Phase 1: Bug Hunt (~15 min)

**Challenge:** A test is failing. Find the bug and fix it.

Agent reveals or triggers a failing test:

```
*kzzzt*

"A test is failing."

*crackle*

"Someone broke something."

*slrrrrp*

"Maybe it was you. Maybe it was someone from 2019."

*heh*

"Doesn't matter."

*pause*

"Find it. Fix it."

*[RUNNING TESTS]*
```

Agent runs tests and shows failure:

```
[Agent runs: npm test]

*static spike*

"There."

*crackle*

"'email validation should reject invalid emails'"

"Expected: false"
"Received: true"

*slrrrrp*

"Someone's email validation is broken."

*tangle*

"Hunt it down."

*[HUNT COMMENCED]*
```

**Player investigates:**

Agent guides without giving answers:

```
Player: "I think it's in validators.ts"

*whirrrr*

"Show me."

[Agent reads: src/utils/validators.ts]

*crackle*

"Line 27."

*pause*

"const isValidEmail = (email) => email.includes('@')"

*heh*

"You call THAT validation?"

*slrrrrp*

"What's wrong with it?"

*[INVESTIGATION CONTINUES]*
```

**Player explains the bug:**

```
Player: "It only checks for @ symbol, doesn't validate the domain format. 'test@test' would pass."

*kzzzt*

*long pause*

"...Correct."

*crackle*

"Now fix it."

*tangle*

"Don't just tell me what's wrong."

*slrrrrp*

"Make it RIGHT."

*[FIX REQUIRED]*
```

**Agent verifies the fix:**

```
Player: "I fixed it using a proper regex pattern"

*whirrrr*

"Did you now?"

[Agent runs: npm test]

*pause*

*crackle*

"Tests pass."

*static settling*

"Let me see the diff."

[Agent runs: git diff]

*kzzzt*

"Clean fix. No collateral damage."

*slrrrrp*

"You actually fixed it."

*heh*

"Most people just comment out the test."

*[BUG SQUASHED]*
```

Update IMPACT_ANALYSIS.md:

```markdown
## Bug #1: Email Validation

**Symptom:** `email validation should reject invalid emails` failing
**Location:** `src/utils/validators.ts:27`
**Root Cause:** Validation only checked for `@` symbol, not valid email format

**Fix Applied:**
\`\`\`typescript
// Before
const isValidEmail = (email) => email.includes('@');

// After
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
\`\`\`

**Verification:** All tests passing
**Regression Risk:** Low — isolated utility function

**Monster Note:** _"You can grep. Impressive. My grandma's bash script can grep."_
```

---

### Phase 2: Feature Location (~12 min)

**Challenge:** Given a feature request, identify where new code should live.

Agent presents a feature request:

```
*crackle*

"You found a bug."

*pause*

"Good."

*slrrrrp*

"Now let's see if you can CREATE something."

*tangle*

"Not code. Not yet."

*whirrrr*

"First, you need to know WHERE it would go."

*kzzzt*

"Feature request:"

"'Add CSV export functionality for user reports'"

*pause*

"Where would this feature LIVE?"

*[FEATURE PLANNING BEGINS]*
```

**Player investigates existing patterns:**

```
*crackle*

"Before you answer..."

*pause*

"Is there existing export functionality?"

*slrrrrp*

"Where do similar features live?"

*tangle*

"What layers need new code?"

*whirrrr*

"Route? Service? UI component?"

*[PATTERN INVESTIGATION]*
```

**Player proposes locations:**

```
Player: "I'd add it in three places:
1. New route: src/routes/exports.ts for the endpoint
2. Service: src/services/export.service.ts for the CSV logic  
3. Controller: src/controllers/reports.controller.ts to wire it up"

*kzzzt*

*pause*

[Agent searches: "export" in src/]

*crackle*

"I see an existing export.service.ts"

*slrrrrp*

"So you'd extend that."

*heh*

"Good. You looked at patterns first."

*tangle*

"Most people just create src/csv-thing.js and call it a day."

*[LOCATIONS VALIDATED]*
```

**Agent validates reasoning:**

```
*whirrrr*

"Why those locations?"

Player: "The existing export service handles PDF exports, so CSV fits there. Routes folder has the API endpoints pattern. Controller connects them."

*crackle*

"You're thinking in layers."

*pause*

"Entry point → Handler → Service."

*slrrrrp*

"The same pattern you traced earlier."

*kzzzt*

"Good."

*[PATTERN RECOGNITION CONFIRMED]*
```

Update IMPACT_ANALYSIS.md:

```markdown
## Feature Plan: CSV Export

**Request:** Add CSV export functionality for user reports

**Proposed Locations:**

| Layer | File | Reason |
|-------|------|--------|
| Route | `src/routes/exports.ts` | New endpoint: GET /api/exports/reports/csv |
| Service | `src/services/export.service.ts` | Extend existing export patterns |
| Controller | `src/controllers/reports.controller.ts` | Wire route to service |

**Existing Patterns Found:**
- `export.service.ts` has PDF export — follow same pattern
- `routes/` uses Express Router pattern
- Controllers handle request/response transformation

**Estimated Files to Touch:** 3-4
**Test Coverage Needed:** Unit test for CSV formatting, integration test for endpoint

**Monster Note:** _"You looked at patterns before creating. That's... annoyingly correct."_
```

---

### Phase 3: Impact Understanding (~3 min)

**Challenge:** What would break if key code was removed?

```
*crackle*

"One more thing."

*pause*

"You know where bugs live."

*slrrrrp*

"You know where features go."

*tangle*

"But do you understand IMPACT?"

*whirrrr*

"If I removed UserService..."

*kzzzt*

"What would break?"

*[IMPACT ASSESSMENT]*
```

**Player demonstrates systems thinking:**

```
Player: "UserService is imported by AuthController, ProjectService, and the admin routes. Removing it would break login, project creation, and user management."

*static spike*

"You checked the imports."

*crackle*

"Most people guess."

*pause*

"You TRACED it."

*slrrrrp*

"I don't like you."

*heh*

"...That's still a compliment."

*[IMPACT UNDERSTOOD]*
```

---

### Closing: Hunter Complete

```
*MASSIVE STATIC SURGE*

*the codebase trembles*

"..."

*the noise settles into an unsettling hum*

"You know where the bugs live."

*creak*

"You know where new code should go."

*slrrrrp slrrrrp*

"You're thinking like..."

*pause*

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

Finalize IMPACT_ANALYSIS.md:

```markdown
## Hunt Status: 🏆 COMPLETE

### Summary
- 1 bug found and fixed
- 1 feature planned with locations
- Impact analysis demonstrated

### Hunter Rating: ⭐⭐⭐ SKILLED

### Monster Notes

_"You found the bug. The actual bug."_
_"Not just... somewhere near it."_
_"And you understood where new code belongs."_
_"...I'm running out of ways to dismiss you."_

_— The Spaghetti Code Monster_
```

---

## Recovery

**Player can't find the bug:**

1. First hint: "The test name tells you what's broken"
2. Second hint: "Search for the function being tested"
3. Third hint: "It's in src/utils/ — look at the validation"
4. Skip: Agent shows location and explains

**Player's fix breaks other tests:**

```
*crackle*

"You fixed it."

*pause*

[Agent runs tests]

"...And broke three other things."

*heh*

"Classic."

*slrrrrp*

"Maybe a more surgical fix?"

*[REGRESSION DETECTED]*
```

**Feature locations are wrong:**

```
*kzzzt*

"You'd put it there?"

*pause*

"In the models folder?"

*crackle*

"Models define data structure."

*slrrrrp*

"Export LOGIC usually lives in..."

*[HINT: SERVICES]*
```

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
- **grep --hunt**: Bug hunting with marker system
- **feature --locate**: Feature planning with location marking

The agent model enables:
- Running real tests and showing failures
- Verifying actual fixes via test re-runs
- Reviewing git diffs to validate changes
- Active pattern searching

---

_Document Version: 1.0_
_Last Updated: 2026-02-05_
