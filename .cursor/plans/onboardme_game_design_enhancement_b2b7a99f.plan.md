---
name: OnboardMe Game Design Enhancement
overview: A comprehensive game design enhancement plan for OnboardMe based on research into engagement psychology, game mechanics, and educational game design. This document serves as a reference for iterative game-by-game review and improvement.
todos:
  - id: review-todo-0
    content: "Design and review TODO #0 product context games together"
    status: completed
  - id: review-todo-1
    content: "Review TODO #1 games: npm start --challenge, flow --trace, test --stories"
    status: completed
  - id: review-todo-2
    content: "Review TODO #2 games: grep --hunt (enhanced), feature --locate (new)"
    status: completed
  - id: review-todo-3-5
    content: "Review TODO #3-5 games - CUT (redundant/can't generate content)"
    status: completed
  - id: review-boss
    content: Review FIXME boss battle - Updated Monster arc for 3 TODOs
    status: completed
  - id: implement-juice
    content: Implement juice/feedback specs across all games
    status: completed
  - id: update-docs
    content: Update PRD and game files with agreed changes
    status: completed
isProject: false
---

# OnboardMe Game Design Enhancement Plan

This plan captures all research findings, design principles, and recommendations from our game design analysis session. Specific game implementations will be decided through collaborative game-by-game review.

---

## 1. Core Design Principles (Research-Backed)

### 1.1 Flow State Design (Csikszentmihalyi)

- Challenge must match player skill precisely
- Too easy = boredom, too hard = anxiety
- As players improve, challenges must escalate
- Clear goals with immediate feedback required
- Intrinsic reward over external rewards

### 1.2 Self-Determination Theory (SDT) - Three Psychological Needs


| Need            | Definition                 | Application                                             |
| --------------- | -------------------------- | ------------------------------------------------------- |
| **Competence**  | Feeling capable            | Clear feedback, visible progress, achievable challenges |
| **Autonomy**    | Feeling in control         | Multiple paths, player agency, choices                  |
| **Relatedness** | Connection to story/others | Monster relationship, narrative investment              |


### 1.3 Feedback Loop Principle

```
Player Input → Immediate Response (<100ms) → Visual/Audio Feedback → Emotional Satisfaction → More Input
```

The #1 factor for "game feel" - every interaction needs satisfying feedback.

### 1.4 Pacing Curves

- Linear progression causes boredom
- Use wave curves: tension → release → tension → release
- Each TODO should have internal peaks and valleys
- Alternate between calm exploration and high-pressure moments

---

## 2. Critical Gaps Identified

### 2.1 Missing Product/Business Layer (Major Gap) - PARTIALLY ADDRESSED

Current flow is ~90% technical, ~10% business. Should be closer to 65/35.

Missing elements:

- User personas and journeys → **Addressed: TODO #1 `npm start --challenge` and `flow --trace**`
- Feature understanding before code location → **Addressed: TODO #1 hands-on exploration**
- Business metrics/KPIs context
- Product flows (signup → purchase → retention) → **Addressed: TODO #1 `flow --trace**`
- Domain terminology definitions

### 2.2 Technology Validation Absent

Games teach WHERE things are but never verify if developer KNOWS the technologies.

- No framework concept validation
- No language feature understanding check
- No library API familiarity test

### 2.3 Architecture Understanding Buried Too Deep

- No system diagrams or service maps early
- No explicit microservices/monolith understanding
- ADRs mentioned but not explored interactively

### 2.4 Testing Philosophy Barely Touched - ADDRESSED

- Testing patterns mentioned but no dedicated game → **Addressed: TODO #1 `test --stories**`
- ~~Missing: test coverage expectations, unit vs integration vs E2E, CI/CD pipeline~~ → **Now covered**

---

## 3. Hybrid Approach Recommendations

### Priority 1: Add TODO #0 - Product Context (~15 min gameplay)

Most impactful single change. Give developers context BEFORE technical diving.

- Product vision and "why this exists"
- User personas and key flows
- Domain terminology
- Business context for technical decisions

### Priority 2: Add Technology Validation to TODO #2

One sub-task confirming familiarity with the stack.

- Quick challenges on framework concepts
- Language feature understanding
- Library API familiarity

### Priority 3: Add Testing Game ~~to TODO #3 or #5~~ ✓ DONE (TODO #1)

Testing is too important to omit. **Addressed by `test --stories` in TODO #1.**

- ✓ Test coverage expectations
- ✓ Testing philosophy (tests as documentation)
- ✓ How to run tests, where they live
- ✓ Expected behaviors from test descriptions

### Priority 5: Cut Games We Can't Generate Content For ✓ DONE

**Critical filter added:** Can we reliably extract content from the codebase?

- ✗ TODO #3-5 cut - relied on ADRs, incident logs, historical context that doesn't exist in most codebases
- ✓ Final journey: TODO #0-2 + Boss covers core onboarding with extractable data

### Priority 4: Keep Monster Arc Intact

The emotional progression is perfect - do not change:

- Dismissive → Mocking → Worried → Existential → Desperate → Documented

---

## 4. Game Mechanic Taxonomy

### 4.1 Current Mechanics in Use


| Mechanic           | Game                    | Description                    |
| ------------------ | ----------------------- | ------------------------------ |
| Timed Hunt         | `docs --speedread`      | Find facts under time pressure |
| Evidence Deduction | `file --detective`      | Investigate and deduce         |
| Relationship Map   | `connect --relations`   | Visual puzzle building         |
| Run & Reproduce    | `npm start --challenge` | Hands-on interaction           |
| Breadcrumb Trail   | `flow --trace`          | Step-by-step code tracing      |
| Behavior Discovery | `test --stories`        | Learn from test documentation  |
| Bug Hunt (Mark)    | `grep --hunt`           | Run tests, find & mark bugs    |
| Feature Planning   | `feature --locate`      | Mark where new code should go  |
| Deduction (20Q)    | `man --explain 20q`     | Yes/no narrowing               |
| Simulation         | `tail -f incident.log`  | React to scenarios             |
| Clue Matching      | `whois --system`        | Match clues to answers         |
| Flow Tracing       | `traceroute --function` | Follow data paths              |
| Bug Hunting        | `debug --inject`        | Find and fix issues            |
| Execution          | `chmod +x deploy.sh`    | Perform tasks                  |


### 4.2 Potential New Mechanics to Consider


| Mechanic                | Description                 | Experience             |
| ----------------------- | --------------------------- | ---------------------- |
| Contradiction Detection | Spot inconsistencies        | Detective work         |
| Connection Mapping      | Draw relationships          | Visual/spatial         |
| Memory Recall           | Use earlier knowledge later | Retention testing      |
| Speed Typing/Input      | Accurate fast input         | Pressure + skill       |
| Elimination             | Rule out wrong answers      | Process of elimination |
| Assembly/Construction   | Put pieces together         | Building               |
| Resource Management     | Limited actions/hints       | Strategic choices      |
| Reversal/Undo           | Work backwards              | Reverse engineering    |
| Timeline Navigation     | Explore history             | Code archaeology       |
| Real-time Monitoring    | React to live events        | Urgency                |


---

## 5. Current Game Evaluation

### 5.1 Risk Assessment


| Game                    | Novelty    | Boredom Risk | Status/Issue                      |
| ----------------------- | ---------- | ------------ | --------------------------------- |
| `docs --speedread`      | High       | Low          | ✓ Designed - Timed hunt           |
| `file --detective`      | High       | Low          | ✓ Designed - Investigation        |
| `connect --relations`   | High       | Low          | ✓ Designed - Visual puzzle        |
| `npm start --challenge` | Very High  | Very Low     | ✓ Designed - Hands-on             |
| `flow --trace`          | High       | Low          | ✓ Designed - Breadcrumb UX        |
| `test --stories`        | High       | Low          | ✓ Designed - Discovery            |
| ~~`tree --discover`~~   | ~~Medium~~ | ~~Medium~~   | ✗ Replaced by npm start           |
| ~~`ps aux | grep`~~     | ~~Low~~    | ~~HIGH~~     | ✗ Replaced by flow --trace        |
| `grep --hunt`           | Very High  | Very Low     | ✓ Enhanced - Test-driven bug hunt |
| `feature --locate`      | Very High  | Very Low     | ✓ NEW - Replaces import puzzle    |
| ~~`import { puzzle }`~~ | ~~Low~~    | ~~**HIGH**~~ | ✗ Replaced - boring ordering      |
| ~~`traceroute --function`~~ | ~~High~~   | ~~Low~~      | ✗ CUT - Redundant with flow --trace |
| ~~`debug --inject`~~        | ~~High~~   | ~~Low~~      | ✗ CUT - Redundant with grep --hunt  |
| ~~`whois --system`~~        | ~~Low~~    | ~~HIGH~~     | ✗ CUT - Can't generate content      |
| ~~`man --explain 20q`~~     | ~~High~~   | ~~Low~~      | ✗ CUT - Can't generate content      |
| ~~`tail -f incident`~~      | ~~High~~   | ~~Low~~      | ✗ CUT - Can't generate content      |
| ~~`chmod +x deploy`~~       | ~~Medium~~ | ~~Medium~~   | ✗ CUT - Can't generate content      |


### 5.2 Games Needing Attention (RESOLVED)

1. ~~`ps aux | grep`~~ - ✓ REPLACED with `flow --trace`
2. ~~`import { puzzle }`~~ - ✓ REPLACED with `feature --locate`
3. ~~`whois --system`~~ - ✓ CUT (can't generate content)
4. ~~TODO #3-5 games~~ - ✓ CUT (redundant or can't generate content)

---

## 6. Juice/Feedback Implementation Specs

### 6.1 Correct Answer Feedback

- Screen flash green (50ms duration)
- "+X commits" text floats up and fades
- Satisfying terminal beep/ding sound
- Progress bar animates with easing curve
- Monster flinches during boss battle

### 6.2 Wrong Answer Feedback

- Screen shake (small, 100ms)
- Red flash on answer area
- "Build failed" with error aesthetic
- Retry counter decrements with visual weight
- Monster reacts (laughs/taunts)

### 6.3 Time Pressure Feedback

- Timer color shifts: green → yellow → red
- Subtle pulse animation as time runs low
- Heartbeat sound effect in final 10 seconds
- Text slightly shakes in final moments

### 6.4 Completion Celebration

- ASCII confetti or celebration animation
- "TODO RESOLVED" stamp animation
- Stats summary with dramatic reveal
- Monster dialogue with typing effect
- Knowledge unlock with "file appearing" animation

---

## 7. Variety Matrix Principle

Each game should have unique characteristics across these dimensions:

- **Input Style**: Reading, typing, clicking, dragging, choosing
- **Pacing**: Calm, medium, urgent, frantic
- **Cognitive Mode**: Discovering, identifying, tracing, recalling, debugging
- **Emotional Tone**: Curiosity, alertness, pressure, satisfaction, triumph

Goal: No two consecutive games feel the same.

Rhythm should alternate between:

- Calm exploration ↔ High-pressure action
- Individual discovery ↔ Systems thinking
- Recall/Knowledge ↔ Active problem-solving

---

## 8. TODO #0 Design Decisions (COMPLETED)

### 8.1 Core Principle: CLI as Quest Giver, IDE as Game World

**Key Decision:** Games do NOT show file contents in the terminal. Instead, the CLI provides challenges and validates answers, while players explore the actual codebase in their IDE.

**Reasoning:**

- Teaches real codebase navigation skills
- More practical than artificial containment
- Simpler to build (no file rendering in terminal)
- Players learn where things live, not just what they contain

### 8.2 No Hints Policy

**Key Decision:** No hints that reveal WHERE to look (e.g., "Check README.md").

**Reasoning:**

- Hints defeat the learning goal of knowing where information lives
- Players should figure out location on their own
- Learning happens through failure + feedback instead
- When wrong/timeout, show correct answer AND location

### 8.3 Final TODO #0 Games (3 games)


| Game                  | Mechanic               | Duration | Learning                                          |
| --------------------- | ---------------------- | -------- | ------------------------------------------------- |
| `docs --speedread`    | Timed hunt             | ~5 min   | Setup commands, project basics, where docs live   |
| `file --detective`    | Evidence investigation | ~7 min   | Project type, tech stack, how to assess codebases |
| `connect --relations` | Relationship mapping   | ~8 min   | How pieces connect, domain model                  |


**Total TODO #0 time: ~20 minutes**

### 8.4 Rejected Alternatives


| Rejected Idea           | Why Rejected                                     |
| ----------------------- | ------------------------------------------------ |
| Show README in CLI      | Doesn't teach real navigation skills             |
| User journey simulation | Can't assume project has UI to interact with     |
| Domain terminology quiz | Where would terminology come from? Too quiz-like |
| Stakeholder interview   | Where would this info come from? Only have code  |
| `blocks --discover`     | Too quiz-like, unclear gameplay                  |
| `surface --explore`     | Too quiz-like, unclear gameplay                  |


### 8.5 Adaptability

Games adapt to project type:

- Backend API → models, services, endpoints
- Frontend → components, pages, routes
- CLI → commands, subcommands, flags
- Library → modules, exports, classes

---

## 9. TODO #1 Design Decisions (COMPLETED)

### 9.1 Differentiation from TODO #0

**Key Insight:** TODO #0 covers high-level "what is this project?" but doesn't cover:

- Business logic and user flows
- Actually running and experiencing the product
- Understanding expected behaviors

**Decision:** TODO #1 focuses on **user flows and product behavior** - what users can DO with this product.

### 9.2 Learning Progression


| TODO #0                 | TODO #1                    |
| ----------------------- | -------------------------- |
| "What IS this project?" | "What does it DO?"         |
| Structure, tech stack   | Flows, features, behaviors |
| Reading code/docs       | Running and tracing        |
| Dry intro               | Hands-on experience        |


### 9.3 Testing Game Placement

**Key Decision:** Testing game (`test --stories`) moved to TODO #1 instead of TODO #3 or #5.

**Reasoning:**

- Tests document expected behaviors - perfect for learning what the product SHOULD do
- Fits naturally after running the product (verify what you saw)
- Teaches tests-as-documentation early (valuable skill)

### 9.4 Final TODO #1 Games (3 games)


| Game                    | Mechanic           | Duration | Learning                                       |
| ----------------------- | ------------------ | -------- | ---------------------------------------------- |
| `npm start --challenge` | Run & Reproduce    | ~15 min  | How to run, what it looks like, main features  |
| `flow --trace`          | Breadcrumb Trail   | ~12 min  | How code flows, architecture layers, key files |
| `test --stories`        | Behavior Discovery | ~12 min  | Expected behaviors, edge cases, tests as docs  |


**Total TODO #1 time: ~40 minutes**

### 9.5 Rejected Original Games


| Original Game     | Why Replaced                                             |
| ----------------- | -------------------------------------------------------- |
| `tree --discover` | Too passive, overlapped with TODO #0 structure discovery |
| `ps aux | grep`   | HIGH boredom risk, too similar to clue-matching          |


### 9.6 Key Design Principles Applied

- **Hands-on over reading:** Player actually runs the project
- **Structured challenges:** Not vague "explore" - specific tasks to complete
- **Explicit teaching:** Tell player to look at tests (don't expect discovery)
- **Breadcrumb UX:** Step-by-step tracing with visual progress
- **Different pacing:** Mix of calm exploration and systematic investigation

---

## 10. TODO #2 Design Decisions (COMPLETED)

### 10.1 Unified "Mark in Code" Mechanic

**Key Innovation:** Both TODO #2 games use the same core mechanic - player marks locations in the actual codebase with special comments.

```
// ONBOARD:BUG <hunt-id>      - For bug hunting
// ONBOARD:FEATURE <feature-id> - For feature planning
```

**Why this works:**

- Hands-on interaction with real codebase
- Proves player actually explored (can't fake it)
- More memorable than typing paths in CLI
- Consistent mechanic across both games
- Automatic cleanup after validation

### 10.2 Bug Hunt Enhancement: Test-Driven

**Key Decision:** Bug hunting starts with a failing test, not just a symptom description.

**Flow:**

1. CLI triggers/reveals a failing test
2. Player runs tests, sees failure output
3. Player hunts for buggy code
4. Player marks with `// ONBOARD:BUG`
5. CLI validates and explains

**Why failing tests:**

- Scopes the hunt (not "find bug somewhere")
- Teaches real debugging workflow
- Test output provides clues
- Achievable in large codebases

### 10.3 Feature Planning Game (New)

**Key Decision:** Replace boring `import { puzzle }` with `feature --locate` - planning where new features should go.

**Flow:**

1. CLI presents feature request
2. Player explores for existing patterns
3. Player marks 2-4 locations with `// ONBOARD:FEATURE`
4. CLI validates against reasonable locations
5. Flexible scoring (multiple valid answers)

**Why this replaces import puzzle:**

- Real-world skill (developers do this constantly)
- Teaches architectural thinking
- Different pacing from bug hunt (thoughtful vs. urgent)
- Exploratory, not mechanical

### 10.4 Final TODO #2 Games (2 games)


| Game               | Mechanic                | Duration | Learning                                     |
| ------------------ | ----------------------- | -------- | -------------------------------------------- |
| `grep --hunt`      | Bug Hunt (Mark)         | ~12 min  | Debugging workflow, test reading, navigation |
| `feature --locate` | Feature Planning (Mark) | ~10 min  | Architecture intuition, pattern recognition  |


**Total TODO #2 time: ~22 minutes**

### 10.5 Variety Within TODO #2


| Aspect         | `grep --hunt`     | `feature --locate`     |
| -------------- | ----------------- | ---------------------- |
| **Goal**       | Find existing bug | Plan new code          |
| **Pacing**     | Timed, urgent     | No timer, thoughtful   |
| **Validation** | Exact location    | Multiple valid answers |
| **Feeling**    | Detective         | Architect              |


### 10.6 Rejected Alternatives


| Rejected              | Why                                             |
| --------------------- | ----------------------------------------------- |
| `import { puzzle }`   | Ordering imports is boring, low practical value |
| Stack validation quiz | Too quiz-like, doesn't fit "mark in code" theme |
| Navigate shortcuts    | Good idea but doesn't fit the theme             |


---

## 11. Boss Battle Design Decisions (COMPLETED)

### 11.1 Monster Emotional Arc (Updated for 3 TODOs)

| After | Mood | Arc Purpose |
|-------|------|-------------|
| TODO #0 | Dismissive | "Anyone can read docs" |
| TODO #1 | Annoyed | "You got it running... unusual" |
| TODO #2 | Worried | "You're thinking like this codebase" |
| Boss Start | Defensive | Final confrontation |

### 11.2 Three-Phase Battle Structure (Kept)

| Phase | Mechanic | Tests |
|-------|----------|-------|
| Phase 1: Legacy Onslaught | Rapid-fire questions (30s each) | Knowledge from TODO #0-2 |
| Phase 2: Dependency Tangle | Connected questions | Understanding of how pieces connect |
| Phase 3: Final Merge Conflict | Synthesis/harder questions | Deep comprehension |

### 11.3 Content Generation for Boss

Questions must come from what player learned:
- Project structure, tech stack (TODO #0)
- Running, flows, behaviors (TODO #1)
- Navigation, bug hunting, feature planning (TODO #2)

---

## 12. Final Game Flow Structure

```
TODO #0: // understand what we're building (~20 min)
├── docs --speedread    → Timed document fact hunt
├── file --detective    → Project investigation & deduction
└── connect --relations → Relationship mapping puzzle

TODO #1: // experience what it does (~40 min)
├── npm start --challenge → Run project, complete hands-on tasks
├── flow --trace          → Trace user journey through code layers
└── test --stories        → Learn behaviors from test documentation

TODO #2: // navigate and mark (~22 min)
├── grep --hunt       → Run failing tests, find & mark bugs
└── feature --locate  → Plan features, mark where code should go

FIXME: // the monster itself (~15 min)
├── Phase 1: Legacy Onslaught (rapid-fire questions)
├── Phase 2: Dependency Tangle (connected questions)
└── Phase 3: Final Merge Conflict (synthesis)

TOTAL: ~97 min (8 games + boss battle)
```

### Why TODO #3-5 Were Cut

| Original TODO | Games | Why Cut |
|---------------|-------|---------|
| TODO #3 | `traceroute --function`, `debug --inject` | Redundant with `flow --trace` and `grep --hunt` |
| TODO #4 | `whois --system`, `man --explain 20q` | Can't generate content - ADRs/decisions not in code |
| TODO #5 | `tail -f incident.log`, `chmod +x deploy.sh` | Can't generate content - incident logs don't exist in codebase |

**Key Insight:** We can only build games from information reliably extractable from the codebase. TODO #0-2 cover the core onboarding needs with real, extractable data.

---

## 13. Review Process (COMPLETED)

| Stage | Status | Outcome |
|-------|--------|---------|
| TODO #0 | ✅ COMPLETED | NEW: `docs --speedread`, `file --detective`, `connect --relations` |
| TODO #1 | ✅ COMPLETED | REDESIGNED: `npm start --challenge`, `flow --trace`, `test --stories` |
| TODO #2 | ✅ COMPLETED | ENHANCED: `grep --hunt`, NEW: `feature --locate` |
| TODO #3-5 | ✅ CUT | Redundant or can't generate content from codebase |
| FIXME Boss | ✅ COMPLETED | Updated Monster arc for 3-TODO journey |

### Evaluation Criteria Used

- Does it follow flow state principles?
- Does it satisfy SDT needs (competence, autonomy, relatedness)?
- Is the mechanic engaging or repetitive?
- **Can we generate content from the codebase?** (critical filter)
- Should it be kept, enhanced, or redesigned?

---

## 14. Key Files Reference

### TODO #0 Games (DESIGNED)

- [context/games/todo-0-docs-speedread/GAME.md](context/games/todo-0-docs-speedread/GAME.md)
- [context/games/todo-0-file-detective/GAME.md](context/games/todo-0-file-detective/GAME.md)
- [context/games/todo-0-connect-relations/GAME.md](context/games/todo-0-connect-relations/GAME.md)

### TODO #1 Games (DESIGNED)

- [context/games/todo-1-npm-start-challenge/GAME.md](context/games/todo-1-npm-start-challenge/GAME.md)
- [context/games/todo-1-flow-trace/GAME.md](context/games/todo-1-flow-trace/GAME.md)
- [context/games/todo-1-test-stories/GAME.md](context/games/todo-1-test-stories/GAME.md)

### TODO #2 Games (DESIGNED)

- [context/games/todo-2-grep-hunt/GAME.md](context/games/todo-2-grep-hunt/GAME.md)
- [context/games/todo-2-feature-locate/GAME.md](context/games/todo-2-feature-locate/GAME.md)

### Juice/Feedback Documentation

- [context/visuals/JUICE-FEEDBACK.md](context/visuals/JUICE-FEEDBACK.md) - NEW

### Deleted Game Files

The following games were deprecated and deleted:
- `todo-1-tree-discover/` → Replaced by `npm start --challenge`
- `todo-1-ps-aux-grep/` → Replaced by `flow --trace`
- `todo-2-import-puzzle/` → Replaced by `feature --locate`
- `todo-3-traceroute-function/` → Redundant with `flow --trace`
- `todo-3-debug-inject/` → Redundant with `grep --hunt`
- `todo-4-whois-system/` → Can't generate content
- `todo-4-man-explain-20q/` → Can't generate content
- `todo-5-tail-incident/` → Can't generate content
- `todo-5-chmod-deploy/` → Can't generate content

### FIXME Boss Battle (UPDATED)

- [context/games/fixme-spaghetti-monster/GAME.md](context/games/fixme-spaghetti-monster/GAME.md)


### Core Documentation

- [PRD.md](PRD.md)
- [context/narrative/GAME-NARRATIVE.md](context/narrative/GAME-NARRATIVE.md)
- [context/visuals/DESIGN-PHILOSOPHY.md](context/visuals/DESIGN-PHILOSOPHY.md)

