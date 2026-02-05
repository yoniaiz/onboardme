# Chapter 3: The Deep Dive

_Duration: ~25 minutes_
_Artifact: `FLOW_MAP.md`_

---

## Goal

Understand how the code actually works: trace user journeys through the codebase, discover how components relate to each other, and learn what tests reveal about expected behavior.

---

## Inputs

| Resource | Access | Notes |
|----------|--------|-------|
| `src/**/*.ts`, `src/**/*.js` | read | Source code |
| `tests/**/*`, `__tests__/**/*`, `*.test.*` | read | Test files |
| Model/schema files | read | Data relationships |
| Import statements | read | Dependency tracing |
| `grep`, `rg` commands | run | Code search |

---

## State

**Reads:**
- `player.name` — Personalized dialogue
- `monster.currentMood` — Should be `annoyed` → `worried`
- `progress.questionHistory[]` — Build on previous knowledge

**Writes:**
- `progress.questionHistory[]` — Add traced flows
- `monster.respectLevel` — Significant increase for good traces
- `monster.memorableExchanges[]` — "The cache!" moment
- `artifacts.flowMap.path` — Created artifact
- `artifacts.flowMap.diagramsCount` — Track progress

---

## Rubric

| Tier | Criteria | Example |
|------|----------|---------|
| **Incorrect** | Wrong path or missing key components | "Request goes straight to database" (skipping service layer) |
| **Partial** | Correct start, missing intermediate steps | "Route → Database" (missing controller, service) |
| **Correct** | Complete trace through all layers | "Route → Controller → Service → Repository → Database" |
| **Deep** | Traces alternate paths and edge cases | "Route → Controller → Cache check → (miss) → Service → Repository → Database → Cache update" |

---

## Flow

### Opening: Create FLOW_MAP.md

Create `.onboardme/artifacts/FLOW_MAP.md`:

```markdown
# Flow Map: [Project Name]

_Traced by: [Player Name]_

---

## Traced Flows

[Flow diagrams will be added here]

---

## Relationships Discovered

[Entity relationships will be added here]

---

## Test Insights

[Behavior discoveries will be added here]

---

## Map Status: 📊 IN PROGRESS
```

Monster introduces the deep dive:

```
*kzzzt*

"You can run it."

*pause*

"Big deal."

*crackle*

"Do you know how it WORKS?"

*slrrrrp*

"When a user clicks a button..."

*tangle*

"Where does the code GO?"

*whirrrr*

"What calls what? What depends on what?"

*pause*

"Let's find out."

*[DEEP DIVE BEGINS]*
```

---

### Phase 1: Flow Trace (~10 min)

**Challenge:** Trace a user action from entry point to data layer.

The agent presents a user journey:

```
*crackle*

"User action: 'User creates a new project'"

*pause*

"Trace it."

*slrrrrp*

"From the moment they click..."

*tangle*

"To the moment it hits the database."

*whirrrr*

"What files? What functions? What layers?"

*[TRACE BEGINS]*
```

**Building the breadcrumb trail:**

The agent guides through layers:

1. **Entry Point**
   ```
   *kzzzt*

   "Where does 'create project' START?"

   *pause*

   "Route? Page? Command?"

   *[FIND ENTRY POINT]*
   ```

2. **Handler/Controller**
   ```
   *crackle*

   "What function HANDLES this request?"

   *slrrrrp*

   "The entry point calls... what?"

   *[FIND HANDLER]*
   ```

3. **Service/Logic**
   ```
   *whirrrr*

   "Where's the business logic?"

   *pause*

   "Handlers shouldn't do real work."

   *tangle*

   "There's usually a service layer..."

   *[FIND SERVICE]*
   ```

4. **Data Layer**
   ```
   *kzzzt*

   "Where does the data get SAVED?"

   *crackle*

   "Repository? Model? Direct query?"

   *[FIND DATA LAYER]*
   ```

**Agent validates and builds diagram:**

After each correct step, update FLOW_MAP.md:

```markdown
## Flow 1: User Creates Project

\`\`\`mermaid
flowchart TD
    A[POST /api/projects] --> B[projectController.create]
    B --> C[ProjectService.createProject]
    C --> D[ProjectRepository.save]
    D --> E[(PostgreSQL)]
\`\`\`

_Traced: Entry → Controller → Service → Repository → Database_

**Monster Note:** _"You can follow a trail. Debuggers do that."_
```

---

### Phase 2: Connect Relations (~8 min)

**Challenge:** Discover how the main entities relate to each other.

Agent identifies key entities from models/types:

```
*whirrrr*

"I see these entities in the codebase:"

*crackle*

"User. Organization. Project. Task."

*pause*

"How do they CONNECT?"

*slrrrrp*

"Pick two. Investigate their relationship."

*tangle*

"Look at the models. The foreign keys. The imports."

*[RELATIONSHIP MAPPING]*
```

**Player investigates pairs:**

For each pair, player finds the relationship:
- One-to-one
- One-to-many
- Many-to-many
- Composition
- Inheritance

**Example exchange:**

```
Player: "User has_many Projects through Organization membership"

*kzzzt*

"Interesting."

*pause*

[Agent reads: src/models/project.ts]

*crackle*

"I see the organizationId foreign key."

*slrrrrp*

"But you mentioned something about membership..."

*tangle*

"Users don't own projects directly?"

Player: "No, they're members of Organizations, and Organizations own Projects"

*whirrrr*

"So there's a join table."

*pause*

"UserOrganization."

*heh*

"...There's also a UserOrganizationProjectTaskLegacyBridge table."

*crackle*

"Don't ask. Nobody asks."

*[RELATIONSHIP CONFIRMED]*
```

Update FLOW_MAP.md:

```markdown
## Entity Relationships

\`\`\`mermaid
erDiagram
    User ||--o{ UserOrganization : "member of"
    Organization ||--o{ UserOrganization : "has members"
    Organization ||--o{ Project : "owns"
    Project ||--o{ Task : "contains"
    User ||--o{ Task : "assigned to"
\`\`\`

_Key insight: Users access Projects through Organization membership, not direct ownership._
```

---

### Phase 3: Test Stories (~7 min)

**Challenge:** Learn expected behaviors from test files.

Agent explores test files:

```
*crackle*

"You've seen what the product DOES."

*pause*

"But how do you know what it SHOULD do?"

*slrrrrp*

"Tests."

*whirrrr*

"Tests are living documentation."

*tangle*

"They describe expected behaviors that MUST stay true."

*kzzzt*

"Let's explore what this codebase PROMISES to do."

*[TEST EXPLORATION BEGINS]*
```

**Agent guides test reading:**

```
*whirrrr*

"Where do the tests live?"

[Agent searches for test files]

*crackle*

"Found them. src/__tests__/"

*pause*

"Categories:"
"- auth/ — 12 tests"
"- users/ — 8 tests"
"- projects/ — 15 tests"

*slrrrrp*

"What validation rules exist for user passwords?"

*tangle*

"The tests will tell you."

*[FIND IN TESTS]*
```

**Questions that require test reading:**

```
*kzzzt*

"Find me these things in the tests:"

"- What's the minimum password length?"
"- What happens with duplicate email signup?"
"- How many projects can a free user create?"

*crackle*

"The answers are in the assertions."

*slrrrrp*

"expect(error.message).toBe('...')"

*[TEST INVESTIGATION]*
```

Update FLOW_MAP.md:

```markdown
## Test Insights

### Authentication Rules
- Minimum password length: 8 characters
- Passwords must contain: uppercase, lowercase, number
- Failed login lockout after: 5 attempts

### Business Rules
- Free tier: 3 projects max
- Duplicate emails: rejected with specific error
- Project names: must be unique per organization

### Edge Cases Discovered
- Rate limiting: 100 requests/minute
- Token expiry: 24 hours
- Refresh tokens: 7 day rotation

_Source: auth.test.ts, users.test.ts, projects.test.ts_
```

---

### Closing: Deep Dive Complete

```
*kzzzt*

"Oh."

*pause*

"You can follow a trail."

*crackle*

"Entry point to database. How methodical."

*slrrrrp*

"Request comes in here... flows through there... saves down here..."

*tangle*

"You know what else follows trails?"

*pause*

"Debuggers."

*whirrrr*

"Debug-gers."

*static spike*

"...That wasn't a compliment."

*creak*

"The thing about trails..."

*hrrrrnn*

"...is they go BOTH ways."

*tangle tangle*

"You can trace features forward."

*crackle*

"But can you trace bugs BACKWARD?"

*slrrrrp*

"Let's find out."

*[CHAPTER 3 COMPLETE]*
```

Finalize FLOW_MAP.md:

```markdown
## Map Status: 📊 COMPLETE

### Summary
- 2 flows traced
- 5 relationships mapped
- 8 test insights documented

### Monster Notes

_"You think in layers now."_
_"Entry → Handler → Service → Data."_
_"That's how the code thinks too."_
_"...I hate when they learn fast."_

_— The Spaghetti Code Monster_
```

---

## Recovery

**Player can't trace the flow:**

1. First hint: "Start at the routes folder"
2. Second hint: "Look at what the controller imports"
3. Third hint: "The service is usually in src/services/"
4. Skip: Agent traces it and explains

**Player misses a layer:**

```
*crackle*

"Route to database?"

*pause*

"That's... direct."

*heh*

"Missing something in between."

*slrrrrp*

"Hint: What handles the business logic?"

*[LAYER MISSED]*
```

**Conversation derails:**

```
*static spike*

"Interesting architecture opinion."

*pause*

"But we're tracing flows right now."

*crackle*

"Back to: where does [action] go after [current step]?"

*[REFOCUSED]*
```

---

## Timing

| Parameter | Value |
|-----------|-------|
| Expected duration | 25 minutes |
| Warning trigger | 30 minutes |
| Move-on trigger | 35 minutes |
| Checkpoint | After each phase |

---

## Consolidated From

This chapter combines:
- **flow --trace**: Step-by-step tracing of user journeys
- **connect --relations**: Entity relationship mapping
- **test --stories**: Behavior discovery from tests

The agent model enables:
- Real-time code reading and validation
- Collaborative diagram building
- Multi-phase investigation in single session

---

_Document Version: 1.0_
_Last Updated: 2026-02-05_
