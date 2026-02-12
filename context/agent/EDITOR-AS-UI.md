# Editor as UI

The editor IS the game board. Files become artifacts, tools become actions, and the workspace becomes the playing field.

---

## Core Principle

> "Don't just talk about the code — interact with it. Don't just ask questions — create artifacts. The game leaves traces in the filesystem."

---

## Files as Game Boards

Each game creates and uses files as tangible gameplay elements.

### Artifact Types

| Game              | Primary Artifact     | Purpose                                    |
| ----------------- | -------------------- | ------------------------------------------ |
| **Deep Dive**     | `@onboardme` comments | Player marks trace trail in source code    |
| **Boss Battle**   | `CERTIFICATE.md`      | Certificate of Codebase Survival           |
| **Code Review**   | `REVIEW_NOTES.md`    | Player comments, Monster responds          |
| **Hunt**          | `IMPACT_ANALYSIS.md` | Bug analysis, fix verification             |
| **Boss Battle**   | `BOSS_BATTLE.md`     | Task list, progress, Monster state         |

### Artifact Location

All game artifacts live in the `.onboardme/` folder:

```
.onboardme/
├── state.json          # Game state
├── artifacts/
│   └── CERTIFICATE.md  # Boss battle artifact
│   └── BOSS_BATTLE.md  # Boss battle artifact
└── context/
    └── prepared.json   # Prepared questions/context
```

---

## Artifact Templates

### CASE_FILE.md (Investigation)

Created at chapter start, updated throughout:

```markdown
# Case File: [Project Name]

_Investigation by: [Player Name]_
_Date opened: [Timestamp]_

---

## Evidence Log

### Finding #1: Project Type

**Question:** What type of project is this?
**Evidence:** [Player pastes evidence]
**Verdict:** ✅ CONFIRMED — [Monster stamp]

### Finding #2: Tech Stack

**Question:** What frameworks/libraries does it use?
**Evidence:**
**Verdict:** ⏳ PENDING

---

## Monster Notes

_"Not bad for a newbie. But you've only scratched the surface."_
_— The Spaghetti Code Monster_

---

## Case Status: 🔍 IN PROGRESS
```

### FLOW_MAP.md (Deep Dive)

Collaborative diagram building:

```markdown
# Flow Map: [Feature Name]

_Traced by: [Player Name]_

---

## Data Flow

\`\`\`mermaid
flowchart TD
A[User Request] --> B{Router}
B --> C[Controller]
C --> D[Service Layer]
D --> E[(Database)]

    %% Player added this path
    C --> F[Cache Check]
    F -->|Hit| G[Return Cached]
    F -->|Miss| D

\`\`\`

---

## Monster Commentary

_"You found the cache. Most people miss that."_

---

## Trace Status: 📊 75% COMPLETE
```

### BOSS_BATTLE.md (Final Challenge)

Real-time battle status:

```markdown
# Boss Battle: Spaghetti Code Monster

_Challenger: [Player Name]_

---

## Monster Status

\`\`\`
╔═══════════════════════════════════╗
║ SPAGHETTI CODE MONSTER ║
║ ████████████░░░░░░░░ 60% ║
║ Status: WORRIED ║
╚═══════════════════════════════════╝

         ,@@@@@@@,
    ,,,.   ,@@@@@@/@@,  .oo8888o.

,&%%&%&&%,@@@@@/@@@@@@,8888\88/8o
,%&\%&&%&&%,@@@\@@@/@@@88\88888/88'
%&&%&%&/%&&%@@\@@/ /@@@88888\88888'
%&&%/ %&%%&&@@\ V /@@' `88\8 `/88'
`&%\ ` /%&' |.| \ '|8'
|o| | | | |
|.| | | | |
\\/ ._\//_/**/ ,\_//**\\/. \_//\_\_
\`\`\`

---

## Battle Log

| Round | Challenge               | Result     |
| ----- | ----------------------- | ---------- |
| 1     | Architecture overview   | ✅ -20%    |
| 2     | Error handling patterns | ✅ -10%    |
| 3     | Database relationships  | ⏳ Current |

---

## Current Challenge

**"How do Users relate to Projects in this schema?"**

_Type your answer below..._

---

## Monster Taunts

_"You're doing better than expected. I hate that."_
```

---

## Active Tools, Not Just Talk

### The Rule

**Don't ask about results — GET results.**

| Wrong                                    | Right                                   |
| ---------------------------------------- | --------------------------------------- |
| "What happens when you run npm test?"    | Agent RUNS `npm test`, shows output     |
| "What's in package.json?"                | Agent READS package.json, discusses it  |
| "Can you find where errors are handled?" | Agent SEARCHES codebase, shows findings |

### Tool Usage Examples

**Running commands:**

```
*kzzzt*

"You say the tests pass?"

*whirrrr*

"Let me see."

[Agent runs: npm test]

*crackle*

"Interesting. 3 tests failed."

*heh*

"Did you actually RUN them?"

*[EVIDENCE GATHERED]*
```

**Reading files:**

```
*kzzzt*

"The config file."

*pause*

"Let's look together."

[Agent reads: src/config/database.ts]

*static spike*

"See line 15?"

*slrrrrp*

"What does that tell you?"

*[FILE EXAMINED]*
```

**Searching code:**

```
*whirrrr*

"You claim there's error handling."

*pause*

"Prove it."

[Agent searches: "try.*catch" in src/]

*crackle*

"Found 12 instances."

*heh*

"But only 3 actually LOG the error."

*[SEARCH COMPLETE]*
```

---

## Artifact Generation Rules

### Every Game Produces Something

No game ends without a tangible artifact:

| Game Type     | Artifact                | Contains                                    |
| ------------- | ----------------------- | ------------------------------------------- |
| Deep Dive     | `@onboardme` comments   | Trace trail markers in source code          |
| Boss Battle   | `CERTIFICATE.md`        | Certificate of Codebase Survival            |
| Hunt          | `IMPACT_ANALYSIS.md`    | Bug location, fix description, verification |
| Boss Battle   | `BOSS_BATTLE.md`        | Battle log, final score, Monster farewell   |
| Any game      | `CODEBASE_KNOWLEDGE.md` | Consolidated learnings (final artifact)     |

### Artifact Lifecycle

1. **Created** — At chapter/game start
2. **Updated** — After each significant answer
3. **Stamped** — Monster adds commentary
4. **Completed** — Status updated, summary added
5. **Preserved** — Remains in `.onboardme/artifacts/`

### Monster Stamps

The Monster "signs" artifacts with personality:

```markdown
## Monster Notes

_"Not bad for a human."_
_— The Spaghetti Code Monster_
_[GRUDGING APPROVAL GRANTED]_
```

```markdown
## Monster Notes

_"You found the deprecated endpoint. I'm impressed."_
_"I'm also concerned about your free time."_
_— The Spaghetti Code Monster_
_[DEEP KNOWLEDGE ACKNOWLEDGED]_
```

---

## Visual Elements in Artifacts

### ASCII Art

The Monster's visual presence in markdown:

**Healthy Monster (start):**

```
     ,@@@@@@@,
,,,.   ,@@@@@@/@@,  .oo8888o.
,&%%&%&&%,@@@@@/@@@@@@,8888\88/8o
,%&\%&&%&&%,@@@\@@@/@@@88\88888/88'
%&&%&%&/%&&%@@\@@/ /@@@88888\88888'
%&&%/ %&%%&&@@\ V /@@' `88\8 `/88'
`&%\ ` /%&'    |.|        \ '|8'
|o|        | |         | |
|.|        | |         | |
\\/ ._\//_/__/  ,\_//__\\/.  \_//__
```

**Damaged Monster (mid-battle):**

```
     ,@@@@@@@,
,,,     @@@@@@/@@,     8888o.
,&%%&%   ,@@@@@/@@@@@@,8888 88/8o
,%&    %&&%,@@@\@@   @@88  888 /88'
%&&    /%&&%@@\@@/ /@@   88\88888'
%&&%    %%&&@@\ V /@@'    8 `/88'
`&    ` /%&'    |.|        \ '|
|o|        | |         |
|.|        | |         |
\\/ ._\//_/__/  ,\_//__ /.  \_
```

**Peaceful Monster (end):**

```
     .-------.
    /   o   o \
   |    ___    |
    \  \___/  /
     '-------'
    /|       |\
   / |       | \
  *  |       |  *
     |_______|

[DOCUMENTED]
```

### Progress Bars

For visual status tracking:

```
Monster Health: ████████░░░░░░░░░░░░ 40%
Your Progress:  ████████████████░░░░ 80%
Commits Earned: ██████░░░░░░░░░░░░░░ 32/100
```

### Status Badges

```
✅ CONFIRMED    — Evidence accepted
⏳ PENDING      — Awaiting answer
❌ REJECTED     — Evidence disputed
🔍 IN PROGRESS  — Investigation ongoing
📊 COMPLETE     — Section finished
🏆 VICTORY      — Game won
```

---

## File Editing as Gameplay

### Collaborative Editing

The Monster and player edit files together:

**Player adds evidence:**

```markdown
### Finding #3: Database Type

**Evidence:**
Found in `src/config/database.ts`:

- Uses `pg` package
- Connection string format: postgres://
```

**Monster responds (agent edits file):**

```markdown
### Finding #3: Database Type

**Evidence:**
Found in `src/config/database.ts`:

- Uses `pg` package
- Connection string format: postgres://
  **Verdict:** ✅ CONFIRMED — PostgreSQL it is.

_"At least you can read import statements."_
```

### Real Bug Fixes (Hunt Chapter)

Players don't just find bugs — they FIX them:

```
*kzzzt*

"You found the bug."

*pause*

"Now FIX it."

*slrrrrp*

"Show me the diff."

[Player makes changes]

*whirrrr*

"Let's see..."

[Agent runs tests, reviews diff]

*crackle*

"Clean fix. No new bugs introduced."

*heh*

"I'm... impressed."

*[BUG SQUASHED — UPDATE IMPACT_ANALYSIS.md]*
```

---

## State Integration

### Artifact References in State

```typescript
interface ArtifactState {
  artifacts: {
    caseFile?: {
      path: string;
      lastUpdated: string;
      findingsCount: number;
      confirmedCount: number;
    };
    flowMap?: {
      path: string;
      diagramsCount: number;
      completionPercentage: number;
    };
    bossBattle?: {
      path: string;
      roundsCompleted: number;
      monsterHealth: number;
    };
  };
}
```

### Artifact Updates Trigger State Updates

When artifact changes:

1. Update artifact file
2. Update `state.json` artifact reference
3. Log in `progress.questionHistory`
4. Checkpoint (if significant)

---

## Implementation Guidelines

### Creating Artifacts

1. Check if artifact exists
2. If not, create from template
3. Add player name, timestamp
4. Initialize empty sections
5. Save path to state

### Updating Artifacts

1. Read current artifact
2. Find appropriate section
3. Add player content
4. Add Monster stamp
5. Update status badges
6. Save and update state

### Completing Artifacts

1. Update all pending items to confirmed/rejected
2. Add summary section
3. Add Monster farewell
4. Update status to COMPLETE
5. Save final state

---

_Document Version: 1.0_
_Last Updated: 2026-02-05_

_"The best documentation is the documentation you actually write."_
