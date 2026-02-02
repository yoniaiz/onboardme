# TODO #0: file --detective

## Game Overview

**Type:** Evidence investigation  
**Goal:** Determine project type, tech stack, and architecture through investigation  
**Level:** 0 (TODO #0)  
**Sub-task:** Second sub-task of TODO #0

## Core Concept

Players are detectives investigating an "unknown codebase." They examine evidence (files, folders, configs), build a case, and make a final deduction about what type of project this is. The CLI guides the investigation while players explore real files in their IDE.

## Learning Outcomes

- What type of project this is (API, frontend, CLI, library, etc.)
- Primary language and framework
- Key technologies in the stack
- Basic architecture pattern
- How to quickly assess any new codebase

## Gameplay Loop

```
1. SEE CASE FILE   →  "Unknown project. Investigate."
       ↓
2. CHOOSE EVIDENCE →  Player picks what to examine
       ↓
3. EXPLORE IN IDE  →  Player goes to IDE, examines files
       ↓
4. REPORT FINDINGS →  Answer questions about what you found
       ↓
5. BUILD CASE      →  Each finding adds to case notes
       ↓
6. FINAL DEDUCTION →  State your conclusion about the project
```

## Key Design Decisions

### Detective Fantasy
The investigation theme makes file exploration feel like solving a mystery, not doing homework.

### Player Chooses Investigation Order
Autonomy in what to examine and in what order. Different paths lead to the same understanding.

### Case Notes Build Visibly
Players see their findings accumulate, creating a sense of progress and accomplishment.

### Deduction Has Stakes
The final deduction can be wrong - this creates tension and makes being right feel meaningful.

## Evidence Types & Questions

### Root Files
- Is there a package.json? (Node.js)
- Is there a Cargo.toml? (Rust)
- Is there a go.mod? (Go)
- Is there a pom.xml? (Java/Maven)
- Is there a Dockerfile?

### Folder Structure
- Do you see a `src/` folder?
- Do you see `routes/`, `controllers/`, `models/`? (API structure)
- Do you see `components/`, `pages/`? (Frontend structure)
- Do you see `cmd/`, `pkg/`? (Go structure)

### Dependencies
- What web framework? (express, fastify, koa, flask, django, gin)
- What database library? (prisma, typeorm, sequelize, sqlalchemy)
- What testing framework? (jest, vitest, pytest, go test)

### Scripts
- Is there a `dev` or `start` script?
- Is there a `build` script?
- Is there a `test` script?
- Is there a `deploy` script?

### Config Files
- What's in .env.example?
- Is there a docker-compose.yml?
- Is there CI/CD config? (.github/workflows, .gitlab-ci.yml)

## Why It's Fun

| Element | Engagement Driver |
|---------|-------------------|
| Detective theme | Role-play, narrative fantasy |
| Player chooses what to examine | Autonomy, strategy |
| Building case notes | Visible progress, accumulation |
| Final deduction moment | Stakes, payoff, tension |
| Could be wrong | Meaningful consequence |

## Visual Examples

See [GAME-VISUALS.md](./GAME-VISUALS.md) for screen mockups and visual design.

## Monster Reaction on Completion

After completing this sub-task, the Monster watches with narrowed eyes:

```
*crackle*

*something shifts in the codebase*

"Hmm."

*tangle tangle*

"You actually looked before you leaped."

*slrrrrp*

"Examined the evidence. Drew conclusions."

*pause*

"Identified the tech stack without grep'ing for 'framework'."

*static spike*

"That's... that's not how this usually goes."

*whirrrr*

"Usually they just open package.json, say 'ah, JavaScript,'
 and start typing things."

*creak*

"You're methodical."

*pause*

"I don't like methodical."

*hrrrrnn*

"Methodical people find things."

*kzzzt*

"I'm watching you."

*[SIGNAL LOST]*
```
