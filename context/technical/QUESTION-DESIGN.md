# Question Design Principles

> **Questions that teach through exploration, not memorization.**

This document defines how to design questions that require real understanding and create engaging gameplay.

---

## Question Types

OnboardMe supports multiple question types to create variety and match learning goals:

| Type | Format | Best For | Example |
|------|--------|----------|---------|
| **Multiple Choice** | Select from options | Quick knowledge checks | "Which service handles auth?" |
| **Text Input** | Free-form answer | Understanding concepts | "Explain why retry count is 3" |
| **Multi-step** | Sequential questions | Complex flows | "Trace request → auth → database" |
| **Timed** | Answer under pressure | Simulating real urgency | "Find the bug in 60 seconds" |
| **Command-based** | Run actual commands | IDE as weapon mechanic | "Run grep to find UserAuth" |

---

## NEW: Command-Based Questions (IDE as Weapon)

**Purpose:** Transform from "quiz" to "exorcising the codebase" by having players use actual developer tools.

### Concept

Instead of asking "Where is UserAuth defined?", the game prompts:

```
Monster: "You can't find me..."

Objective: Run `grep -r "UserAuth" .`

[Player runs command in their terminal]

Result: Terminal shakes (simulated), Monster shrieks
        "AAAH! You found me!"
```

This shifts the experience from answering questions to actively hunting through code.

### Command Types

| Command | Purpose | Monster Reaction |
|---------|---------|------------------|
| `grep -r "pattern" .` | Find code locations | "You're shining a light on me!" |
| `git blame file.js` | Discover code history | "Don't look at my past!" |
| `git log --oneline` | See commit history | "Those memories... they hurt!" |
| `find . -name "*.js"` | Locate files | "Stop mapping my territory!" |
| `cat file.js \| wc -l` | Count lines | "Don't measure me!" |
| `npm run test` | Run tests | "The tests... they expose everything!" |

### Implementation Design

**Question Structure:**
```typescript
interface CommandQuestion extends GameQuestion {
  type: 'command-based';
  objective: string;              // "Find where UserAuth is defined"
  command: string;                // "grep -r 'UserAuth' ."
  expectedOutput: string;         // Pattern to match in output
  monsterReaction: {
    onAttempt: string;            // "You're getting close..."
    onSuccess: string;            // "AAAH! You found me!"
    onFailure: string;            // "Nice try. Wrong place."
  };
  hints: string[];
  timeLimit: number;
}
```

**Player Experience:**
1. Monster taunts: "You'll never find where I hide the auth logic..."
2. Objective displayed: "Use grep to find 'UserAuth' in the codebase"
3. Player opens their terminal
4. Player runs command
5. Game detects command execution (via file watcher or manual confirmation)
6. Terminal "shakes" (simulated with screen effects)
7. Monster reacts dramatically
8. Answer is validated based on command output

### Validation Methods

**Option A: Manual Confirmation**
```
Did you find it? (y/n)
Where did you find it? [Player types path]
```

**Option B: Output Capture** (Advanced)
```
Paste the output of your command:
[Player pastes grep results]
[AI validates the output]
```

**Option C: File Watcher** (Most Immersive)
```
[Game watches for terminal activity]
[Detects grep command execution]
[Automatically validates output]
```

### Monster Reactions to Commands

**When player runs grep:**
```
*KZZZT*

"You're... you're shining a light on me!"

*crackle crackle*

"I can't hide in the darkness anymore!"

*the terminal flickers*

*[LOCATION EXPOSED]*
```

**When player runs git blame:**
```
*tangle tangle*

"NO! Not the git history!"

*drip*

"Those commits... they reveal everything..."

*whirrrr*

"You know who created me now."

*[ORIGIN REVEALED]*
```

**When player runs tests:**
```
*MASSIVE STATIC*

"THE TESTS!"

*CRACKLE*

"They expose all my weaknesses!"

*the screen shakes*

"Every failing assertion... it hurts..."

*[VULNERABILITIES EXPOSED]*
```

### Game Design Benefits

1. **Active, not passive** — Players do real work, not just answer questions
2. **Skill building** — Learn actual developer tools
3. **Immersive** — Feels like hunting/exorcising, not testing
4. **Memorable** — Physical actions create stronger memories
5. **Authentic** — Uses real codebase, real tools

### Implementation Priority

- **P0 (MVP):** Manual confirmation method
- **P1 (Enhanced):** Output capture and validation
- **P2 (Future):** Automatic file watcher integration

### Example Questions

**Early game (TODO #1):**
```
Monster: "You'll never map my territory..."
Objective: Use `find` to list all JavaScript files
Command: find . -name "*.js" -type f
Success: "You've seen the surface. But there's so much more..."
```

**Mid game (TODO #3):**
```
Monster: "My data flows are too complex to trace..."
Objective: Use `grep` to find all imports of UserService
Command: grep -r "import.*UserService" .
Success: "You're following the threads... this is bad for me."
```

**Late game (TODO #5):**
```
Monster: "You'll never understand my deployment secrets..."
Objective: Use `git log` to find the last deployment commit
Command: git log --grep="deploy" --oneline -n 5
Success: "My deployment history... exposed!"
```

---

## Anti-Shortcut Design

Questions must require **real exploration**, not just grep:

| ❌ Bad Question | ✅ Good Question |
|----------------|------------------|
| "What port does the API run on?" | "Trace from app startup to where the port is configured. What file defines it and why that specific value?" |
| "Find the validateEmail function" | "A user reports 'test@test' is accepted. Find where validation happens and why it fails to catch this." |
| "What does PaymentService do?" | "PaymentService calls 3 other services. Name them and explain why each is needed." |

## Question Requirements

1. **Multi-hop:** Requires visiting 2+ files
2. **Contextual:** Must understand *why*, not just *what*
3. **Verifiable:** AI can verify answer is reasoned
4. **Time-appropriate:** Enough time to explore, not read everything
5. **Learning-oriented:** Even wrong answers teach something
6. **Command-based (new):** Some questions require running actual commands

## The Teaching Loop

```
┌──────────┐     ┌──────────┐     ┌─────────────────────┐
│   PLAY   │ ──► │  RESULT  │ ──► │  AI EXPLAINS        │
│   GAME   │     │ (Win/Lose)│     │  "Here's what this  │
└──────────┘     └──────────┘     │   actually means.." │
                                  └──────────┬──────────┘
                                             │
                                             ▼
                                  ┌─────────────────────┐
                                  │ KNOWLEDGE UNLOCKED  │
                                  │ (Saved to log)      │
                                  └─────────────────────┘

Wrong answer? → STILL get explanation
Right answer? → Get DEEPER context as reward
```

---

## Learning Spiral (Spaced Repetition)

**Problem:** Concepts learned in TODO #1 aren't revisited until the boss battle, leading to forgetting.

**Solution:** Each TODO should reference and build upon concepts from earlier TODOs, creating a spiral of reinforcement.

### The Spiral Pattern

```
       ╭─────────────────────────────────────────────────╮
       │                    BOSS BATTLE                  │
       │         (Tests ALL concepts together)           │
       ╰───────────────────────┬─────────────────────────╯
                               │
       ╭───────────────────────┼───────────────────────╮
       │                       │                       │
   TODO #5              TODO #4                  TODO #3
  (Uses #1+#2)         (Uses #2+#3)          (Introduces #3
   +Introduces #5)     +Introduces #4)        +Uses #1)
       │                       │                       │
       ╰───────────────────────┼───────────────────────╯
                               │
       ╭───────────────────────┴───────────────────────╮
       │                                               │
   TODO #2                                         TODO #1
  (Introduces #2                              (Introduces #1
   +Uses #1)                                   concept)
```

### Concept Mapping

| TODO | New Concepts | Revisits Concepts | Example |
|------|--------------|-------------------|---------|
| **TODO #1** | Project structure, file organization | — | "Where is the auth service?" |
| **TODO #2** | Search techniques, grep patterns | Project structure | "Use grep to find auth, then explain its location in the project structure" |
| **TODO #3** | Data flows, tracing | Project structure, Search | "Trace auth flow from controller to service (structure) using grep (search)" |
| **TODO #4** | Business logic, why decisions | Data flows, Structure | "Explain why auth flow goes through 3 services (flows + structure)" |
| **TODO #5** | Deployment, operations | All previous | "Deploy auth changes—where do they go? (structure + flows + logic)" |
| **BOSS** | Integration | ALL concepts | "Resolve merge conflict involving auth across all layers" |

### Implementation Guidelines

**For Question Designers:**

1. **Identify prerequisite concepts** — What must players know from earlier TODOs?
2. **Create bridging questions** — Questions that require both old and new knowledge
3. **Explicit callbacks** — Reference earlier TODOs in question text
4. **Progressive complexity** — Each revisit adds depth

**Example Progression:**

**TODO #1 (Introduce):**
```
Q: "Where is the UserService located?"
A: src/services/UserService.js
Concept: File location
```

**TODO #2 (Revisit + Extend):**
```
Q: "Use grep to find all imports of UserService. 
    Based on what you learned in TODO #1, which directory 
    should have the most imports?"
A: src/controllers/ (because services are called by controllers)
Concepts: Search (new) + File structure (revisit)
```

**TODO #3 (Revisit + Deepen):**
```
Q: "Trace a request from AuthController to UserService. 
    How many files does it pass through? Use your grep 
    skills from TODO #2 and structure knowledge from TODO #1."
A: 3 files (controller → middleware → service)
Concepts: Data flows (new) + Search + Structure (revisit)
```

**TODO #4 (Revisit + Apply):**
```
Q: "Why does the auth flow go through middleware before 
    UserService? Trace the flow (TODO #3), find the 
    middleware code (TODO #2), and explain its purpose."
A: Middleware validates tokens before allowing service access
Concepts: Business logic (new) + Flows + Search (revisit)
```

**TODO #5 (Revisit All):**
```
Q: "You need to deploy a change to UserService. List all 
    files that import it (TODO #2), trace which flows will 
    be affected (TODO #3), explain why each is necessary 
    (TODO #4), and identify where it's deployed."
A: Comprehensive answer using all prior knowledge
Concepts: Deployment (new) + ALL previous (revisit)
```

**BOSS (Integrate All):**
```
Q: "Merge conflict in UserService. One version adds rate 
    limiting, another adds logging. Both touch the same 
    middleware. Resolve the conflict by understanding the 
    full flow, structure, and business logic."
A: Requires synthesizing all concepts
Concepts: ALL concepts integrated
```

### Spaced Repetition Schedule

| Concept | Introduced | Revisited | Revisited | Revisited | Tested |
|---------|-----------|-----------|-----------|-----------|--------|
| Structure | TODO #1 | TODO #2 | TODO #3 | TODO #5 | BOSS |
| Search | TODO #2 | TODO #3 | TODO #4 | TODO #5 | BOSS |
| Flows | TODO #3 | TODO #4 | TODO #5 | — | BOSS |
| Logic | TODO #4 | TODO #5 | — | — | BOSS |
| Deployment | TODO #5 | — | — | — | BOSS |

**Optimal spacing:** 3-5 revisits per concept before final integration.

### Benefits

1. **Retention** — Spaced repetition proven to improve long-term memory
2. **Depth** — Each revisit adds complexity and nuance
3. **Integration** — Concepts don't exist in isolation
4. **Confidence** — Players feel mastery through repeated success
5. **Boss preparation** — Final battle feels achievable, not impossible

### Anti-Patterns to Avoid

❌ **One-and-done:** Teach concept once, never revisit
❌ **Sudden complexity:** Jump from basic to advanced without steps
❌ **Isolated concepts:** Each TODO teaches completely new things
❌ **Boss surprise:** Boss requires knowledge never practiced

✓ **Spiral learning:** Introduce → Revisit → Deepen → Integrate
✓ **Gradual complexity:** Each revisit adds one layer
✓ **Connected concepts:** New knowledge builds on old
✓ **Boss preparation:** Boss tests practiced combinations
