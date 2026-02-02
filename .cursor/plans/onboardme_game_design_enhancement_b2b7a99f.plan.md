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
    content: "Review TODO #2 games: grep --hunt, import { puzzle } + potential stack validation"
    status: pending
  - id: review-todo-3
    content: "Review TODO #3 games: traceroute --function, debug --inject (testing moved to TODO #1)"
    status: pending
  - id: review-todo-4
    content: "Review TODO #4 games: whois --system, man --explain 20q"
    status: pending
  - id: review-todo-5
    content: "Review TODO #5 games: tail -f incident.log, chmod +x deploy.sh"
    status: pending
  - id: review-boss
    content: Review FIXME boss battle phases
    status: pending
  - id: implement-juice
    content: Implement juice/feedback specs across all games
    status: pending
  - id: update-docs
    content: Update PRD and game files with agreed changes
    status: pending
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

- User personas and journeys → **Addressed: TODO #1 `npm start --challenge` and `flow --trace`**
- Feature understanding before code location → **Addressed: TODO #1 hands-on exploration**
- Business metrics/KPIs context
- Product flows (signup → purchase → retention) → **Addressed: TODO #1 `flow --trace`**
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

- Testing patterns mentioned but no dedicated game → **Addressed: TODO #1 `test --stories`**
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

### Priority 4: Keep Monster Arc Intact

The emotional progression is perfect - do not change:

- Dismissive → Mocking → Worried → Existential → Desperate → Documented

---

## 4. Game Mechanic Taxonomy

### 4.1 Current Mechanics in Use


| Mechanic           | Game                     | Description                    |
| ------------------ | ------------------------ | ------------------------------ |
| Timed Hunt         | `docs --speedread`       | Find facts under time pressure |
| Evidence Deduction | `file --detective`       | Investigate and deduce         |
| Relationship Map   | `connect --relations`    | Visual puzzle building         |
| Run & Reproduce    | `npm start --challenge`  | Hands-on interaction           |
| Breadcrumb Trail   | `flow --trace`           | Step-by-step code tracing      |
| Behavior Discovery | `test --stories`         | Learn from test documentation  |
| Timed Search       | `grep --hunt`            | Find under time pressure       |
| Pattern Matching   | `import { puzzle }`      | Identify/order patterns        |
| Deduction (20Q)    | `man --explain 20q`      | Yes/no narrowing               |
| Simulation         | `tail -f incident.log`   | React to scenarios             |
| Clue Matching      | `whois --system`         | Match clues to answers         |
| Flow Tracing       | `traceroute --function`  | Follow data paths              |
| Bug Hunting        | `debug --inject`         | Find and fix issues            |
| Execution          | `chmod +x deploy.sh`     | Perform tasks                  |


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


| Game                     | Novelty   | Boredom Risk | Status/Issue                      |
| ------------------------ | --------- | ------------ | --------------------------------- |
| `docs --speedread`       | High      | Low          | ✓ Designed - Timed hunt           |
| `file --detective`       | High      | Low          | ✓ Designed - Investigation        |
| `connect --relations`    | High      | Low          | ✓ Designed - Visual puzzle        |
| `npm start --challenge`  | Very High | Very Low     | ✓ Designed - Hands-on             |
| `flow --trace`           | High      | Low          | ✓ Designed - Breadcrumb UX        |
| `test --stories`         | High      | Low          | ✓ Designed - Discovery            |
| ~~`tree --discover`~~    | ~~Medium~~| ~~Medium~~   | ✗ Replaced by npm start           |
| ~~`ps aux \| grep`~~     | ~~Low~~   | ~~HIGH~~     | ✗ Replaced by flow --trace        |
| `grep --hunt`            | High      | Low          | Time pressure works well          |
| `import { puzzle }`      | Low       | **HIGH**     | Ordering puzzles rarely fun       |
| `traceroute --function`  | High      | Low          | Inherently interesting            |
| `debug --inject`         | Very High | Very Low     | Bug hunting is engaging           |
| `whois --system`         | Low       | **HIGH**     | Too similar to clue-matching      |
| `man --explain 20q`      | High      | Low          | Interactive, player-driven        |
| `tail -f incident`       | Very High | Very Low     | Reactive, exciting                |
| `chmod +x deploy`        | Medium    | Medium       | Depends on task variety           |


### 5.2 Games Needing Attention

1. ~~`**ps aux | grep**`~~ - ✓ REPLACED with `flow --trace`
2. `**import { puzzle }**` - Static ordering is not engaging
3. `**whois --system**` - Too similar to other clue-matching

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

| TODO #0 | TODO #1 |
|---------|---------|
| "What IS this project?" | "What does it DO?" |
| Structure, tech stack | Flows, features, behaviors |
| Reading code/docs | Running and tracing |
| Dry intro | Hands-on experience |

### 9.3 Testing Game Placement

**Key Decision:** Testing game (`test --stories`) moved to TODO #1 instead of TODO #3 or #5.

**Reasoning:**
- Tests document expected behaviors - perfect for learning what the product SHOULD do
- Fits naturally after running the product (verify what you saw)
- Teaches tests-as-documentation early (valuable skill)

### 9.4 Final TODO #1 Games (3 games)

| Game | Mechanic | Duration | Learning |
|------|----------|----------|----------|
| `npm start --challenge` | Run & Reproduce | ~15 min | How to run, what it looks like, main features |
| `flow --trace` | Breadcrumb Trail | ~12 min | How code flows, architecture layers, key files |
| `test --stories` | Behavior Discovery | ~12 min | Expected behaviors, edge cases, tests as docs |

**Total TODO #1 time: ~40 minutes**

### 9.5 Rejected Original Games

| Original Game | Why Replaced |
|---------------|--------------|
| `tree --discover` | Too passive, overlapped with TODO #0 structure discovery |
| `ps aux \| grep` | HIGH boredom risk, too similar to clue-matching |

### 9.6 Key Design Principles Applied

- **Hands-on over reading:** Player actually runs the project
- **Structured challenges:** Not vague "explore" - specific tasks to complete
- **Explicit teaching:** Tell player to look at tests (don't expect discovery)
- **Breadcrumb UX:** Step-by-step tracing with visual progress
- **Different pacing:** Mix of calm exploration and systematic investigation

---

## 10. Proposed Game Flow Structure

```
TODO #0: // understand what we're building (DESIGNED)
├── docs --speedread    → Timed document fact hunt
├── file --detective    → Project investigation & deduction
└── connect --relations → Relationship mapping puzzle

TODO #1: // experience what it does (REDESIGNED)
├── npm start --challenge → Run project, complete hands-on tasks
├── flow --trace          → Trace user journey through code layers
└── test --stories        → Learn behaviors from test documentation

TODO #2: // figure out how to find things
├── grep --hunt (keep - works well)
└── import { puzzle } (redesign candidate)
└── [POTENTIAL] stack validation game

TODO #3: // trace data flows (URGENT)
├── traceroute --function (keep - works well)
└── debug --inject (keep - works well)

TODO #4: // document why this works
├── whois --system (redesign candidate)
└── man --explain 20q (keep - works well)

TODO #5: // learn how to deploy safely
├── tail -f incident.log (keep - works well)
└── chmod +x deploy.sh (review needed)

FIXME: // the monster itself (keep as-is)
├── Phase 1: Legacy Onslaught
├── Phase 2: Dependency Tangle
└── Phase 3: Final Merge Conflict
```

---

## 11. Review Process

We will review games one-by-one in this order:

1. ~~TODO #0 concept (new games to design)~~ **COMPLETED**
2. ~~TODO #1 games~~ **COMPLETED** - Redesigned: `npm start --challenge`, `flow --trace`, `test --stories`
3. TODO #2 games: `grep --hunt`, `import { puzzle }`
4. TODO #3 games: `traceroute --function`, `debug --inject`
5. TODO #4 games: `whois --system`, `man --explain 20q`
6. TODO #5 games: `tail -f incident.log`, `chmod +x deploy.sh`
7. FIXME boss battle (review phases)

For each game, we will evaluate:

- Does it follow flow state principles?
- Does it satisfy SDT needs (competence, autonomy, relatedness)?
- Is the mechanic engaging or repetitive?
- What juice/feedback should it have?
- Should it be kept, enhanced, or redesigned?

---

## 12. Key Files Reference

### TODO #0 Games (DESIGNED)

- [context/games/todo-0-docs-speedread/GAME.md](context/games/todo-0-docs-speedread/GAME.md)
- [context/games/todo-0-file-detective/GAME.md](context/games/todo-0-file-detective/GAME.md)
- [context/games/todo-0-connect-relations/GAME.md](context/games/todo-0-connect-relations/GAME.md)

### TODO #1 Games (REDESIGNED)

- [context/games/todo-1-npm-start-challenge/GAME.md](context/games/todo-1-npm-start-challenge/GAME.md)
- [context/games/todo-1-flow-trace/GAME.md](context/games/todo-1-flow-trace/GAME.md)
- [context/games/todo-1-test-stories/GAME.md](context/games/todo-1-test-stories/GAME.md)

### TODO #1 Games (DEPRECATED - replaced)

- ~~[context/games/todo-1-tree-discover/GAME.md](context/games/todo-1-tree-discover/GAME.md)~~ → Replaced
- ~~[context/games/todo-1-ps-aux-grep/GAME.md](context/games/todo-1-ps-aux-grep/GAME.md)~~ → Replaced

### Existing Game Definitions (To Review)

- [context/games/todo-2-grep-hunt/GAME.md](context/games/todo-2-grep-hunt/GAME.md)
- [context/games/todo-2-import-puzzle/GAME.md](context/games/todo-2-import-puzzle/GAME.md)
- [context/games/todo-3-traceroute-function/GAME.md](context/games/todo-3-traceroute-function/GAME.md)
- [context/games/todo-3-debug-inject/GAME.md](context/games/todo-3-debug-inject/GAME.md)
- [context/games/todo-4-whois-system/GAME.md](context/games/todo-4-whois-system/GAME.md)
- [context/games/todo-4-man-explain-20q/GAME.md](context/games/todo-4-man-explain-20q/GAME.md)
- [context/games/todo-5-tail-incident/GAME.md](context/games/todo-5-tail-incident/GAME.md)
- [context/games/todo-5-chmod-deploy/GAME.md](context/games/todo-5-chmod-deploy/GAME.md)
- [context/games/fixme-spaghetti-monster/GAME.md](context/games/fixme-spaghetti-monster/GAME.md)

### Core Documentation

- [PRD.md](PRD.md)
- [context/narrative/GAME-NARRATIVE.md](context/narrative/GAME-NARRATIVE.md)
- [context/visuals/DESIGN-PHILOSOPHY.md](context/visuals/DESIGN-PHILOSOPHY.md)

