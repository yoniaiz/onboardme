# Chapter 1: The Investigation

_Duration: ~20 minutes_
_Artifact: `CASE_FILE.md`_

---

## Goal

Learn to identify project type, tech stack, and architecture by examining file structure, dependencies, and documentation. Build investigation skills transferable to any codebase.

---

## Design Principle: Avoid Repetition

**Each phase builds on the previous. Don't re-ask what they already answered.**

- Phase 1: Project type → They answer → MOVE ON
- Phase 2: Tech stack → They answer → MOVE ON  
- Phase 3: Run commands → They answer → MOVE ON
- Phase 4: Synthesis → How it CONNECTS (not repeating phases 1-3)

**If they gave a good answer, acknowledge it and progress. Don't keep probing the same question.**

**Final Deduction should ask for SYNTHESIS:**
- How do the pieces fit together?
- What patterns connect the components?
- NOT "tell me the project type, stack, and architecture again"

---

## Inputs

| Resource | Access | Notes |
|----------|--------|-------|
| `package.json`, `Cargo.toml`, `go.mod`, `pom.xml` | read | Project manifest files |
| `README.md`, `CONTRIBUTING.md`, `docs/` | read | Documentation |
| `.env.example`, `docker-compose.yml`, `.github/workflows/` | read | Config files |
| Root directory listing | read | Folder structure |
| `ls`, `tree` commands | run | Directory exploration |

---

## State

**Reads:**
- `player.name` — For personalized dialogue
- `monster.currentMood` — Should be `dismissive` at start
- `progress.currentChapter` — Should be `investigation`

**Writes:**
- `progress.questionHistory[]` — Add findings
- `monster.respectLevel` — Adjust based on insight quality
- `session.conversationSummary` — Investigation conclusions
- `artifacts.caseFile.path` — Created artifact location

---

## Rubric

| Tier | Criteria | Example |
|------|----------|---------|
| **Incorrect** | Wrong technology or project type | "It's a Python project" (when it's Node.js) |
| **Partial** | Right direction, missing key details | "It's a Node API" (missing framework, database) |
| **Correct** | Accurate identification | "It's an Express API with PostgreSQL and Prisma" |
| **Deep** | Shows architectural insight | "Express API with PostgreSQL, uses repository pattern, has GraphQL layer on top of REST" |

---

## Flow

### Opening: The Case File

Create `.onboardme/artifacts/CASE_FILE.md` with initial template:

```markdown
# Case File: [Project Name]

_Investigation by: [Player Name]_
_Date opened: [Timestamp]_

---

## Evidence Log

[Evidence entries will be added here]

---

## Case Status: 🔍 OPEN
```

Monster introduces the investigation:

```
*kzzzt*

*static resolves into something like a voice*

"New developer."

*pause*

"Another one who thinks they can figure this out."

*slrrrrp*

"Alright. Let's see what you've got."

*crackle*

"Before you do anything, you need to know what you're dealing with."

*tangle*

"Investigate. Find evidence. Build your case."

*whirrrr*

"I'll be watching."

*[INVESTIGATION BEGINS]*
```

---

### Phase 1: Project Identity (~5 min)

**Challenge:** Determine what type of project this is.

Questions to investigate:
1. What language is this project written in?
2. What type of application is it? (API, frontend, CLI, library, fullstack)
3. What's the primary framework?

**How the agent conducts this:**

1. Read project manifest files (package.json, etc.)
2. Examine folder structure
3. Ask player open-ended questions
4. Validate answers against evidence found
5. Add findings to CASE_FILE.md

**Example exchange:**

```
*kzzzt*

"First things first."

*pause*

"What kind of project are we dealing with here?"

*slrrrrp*

"Look at the root. The manifest file. The folder structure."

*crackle*

"What type of project is this, and what language?"

*[AWAITING INVESTIGATION REPORT]*
```

Player explores, responds: "It's a Node.js backend API using Express"

```
*whirrrr*

"Hmm."

*pause*

"You actually looked before you answered."

*tangle*

"That's... not how this usually goes."

*[EVIDENCE LOGGED]*
```

Agent updates CASE_FILE.md:

```markdown
### Finding #1: Project Type

**Question:** What type of project is this?
**Evidence:** package.json shows "express" dependency, src/routes/ folder structure
**Verdict:** ✅ CONFIRMED — Node.js Express API

_Monster Note: "They can read a package.json. Revolutionary."_
```

---

### Phase 2: Tech Stack Discovery (~7 min)

**Challenge:** Identify the key technologies in use.

Categories to investigate:
- **Database**: What database? What ORM/driver?
- **Testing**: What test framework? Where do tests live?
- **Build tools**: TypeScript? Bundler? Compiler?
- **External services**: Auth provider? Cloud services? APIs?

**Example exchange:**

```
*crackle*

"So you know it's Express."

*pause*

"What's it talking to?"

*slrrrrp*

"Database. External services. The things that actually matter."

*heh*

"The Express part is easy. The data layer is where developers cry."

*[INVESTIGATE THE STACK]*
```

For each discovery, update CASE_FILE.md with:
- Evidence found (file, line, content)
- Player's conclusion
- Monster's stamp (CONFIRMED/DISPUTED/NEEDS MORE EVIDENCE)

---

### Phase 3: Documentation Hunt (~5 min)

**Challenge:** Extract key operational facts from documentation.

Facts to find:
- How to run the project locally
- Required environment variables
- Prerequisites (Node version, etc.)
- How to run tests

**Agent actively reads files:**

```
*kzzzt*

"Let me see this README."

[Agent reads: README.md]

*crackle*

"Last updated: 2019."

*heh*

"Classic."

*pause*

"Find me these things:"
"- How do you start this thing?"
"- What environment variables are required?"
"- What's the test command?"

*slrrrrp*

"The README might lie. The package.json doesn't."

*[DOCUMENTATION HUNT]*
```

---

### Phase 4: Final Deduction (~3 min)

**Challenge:** Synthesize findings into a complete project summary.

Player must provide a complete deduction:
- Project type and purpose
- Primary tech stack
- Architecture pattern (MVC, layered, microservices, etc.)
- Any notable aspects

**Rubric applied here:**

| Response Quality | Scoring |
|-----------------|---------|
| Misidentifies project type | 0 commits, lose 1 life |
| Correct type, missing stack details | 1 commit |
| Accurate identification | 2 commits |
| Deep insight (patterns, design decisions) | 3 commits, grudging respect |

**Example strong deduction:**

"This is an Express.js REST API with PostgreSQL database using Prisma ORM. It follows a layered architecture with routes → services → repositories. Uses Jest for testing, TypeScript for type safety, and has GitHub Actions CI. The auth system uses JWT tokens with refresh token rotation."

```
*kzzzzzt*

*long pause*

"..."

*static spike*

"You... actually understand what you're looking at."

*crackle*

"Most people say 'it's a JavaScript project.'"

*slrrrrp*

"You identified the layers. The patterns."

*pause*

"I don't like you."

*heh*

"That's a compliment."

*[CASE CLOSED — INVESTIGATION COMPLETE]*
```

---

### Closing: Case File Sealed

Update CASE_FILE.md with final status:

```markdown
## Case Summary

**Project:** [Name]
**Type:** [API/Frontend/CLI/etc.]
**Stack:** [Framework, Database, Key Tools]
**Architecture:** [Pattern identified]

## Deduction Quality: ⭐⭐⭐ DEEP

---

## Monster Notes

_"Not bad for a human."_
_"You actually looked at the evidence."_
_"The last person just opened package.json and said 'ah, JavaScript.'"_

_— The Spaghetti Code Monster_
_[GRUDGING APPROVAL GRANTED]_

---

## Case Status: 📁 CLOSED
```

---

## Recovery

**Player is stuck:**

1. First hint: "Have you checked the config files?"
2. Second hint: "The package.json dependencies section is useful..."
3. Third hint: "Look at line 15-20 of package.json"
4. Each hint costs 1 commit from final score

**Player disputes scoring:**

```
*crackle*

"You think THAT was a complete answer?"

*heh*

"Fine. Explain your reasoning."

[Player explains]

*long pause*

"...I'll allow it."
OR
"*kzzzt* Nice try. Still missing [specific detail]."
```

**Conversation derails:**

```
*static spike*

"That's... interesting."

*slrrrrp*

"But not what I asked."

*crackle*

"Back to the investigation: [restate current question]"

*[RELEVANCE RESTORED]*
```

---

## Timing

| Parameter | Value |
|-----------|-------|
| Expected duration | 20 minutes |
| Warning trigger | 25 minutes ("Taking your time, huh?") |
| Move-on trigger | 30 minutes ("Let's wrap this up.") |
| Checkpoint | After each phase |

---

## Consolidated From

This chapter combines:
- **file --detective**: Evidence-based investigation gameplay
- **docs --speedread**: Documentation extraction under time pressure

The agent model removes the need for separate "timed" vs "untimed" games — the Monster controls pacing conversationally.

---

_Document Version: 1.0_
_Last Updated: 2026-02-05_
