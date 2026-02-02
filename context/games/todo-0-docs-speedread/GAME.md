# TODO #0: docs --speedread

## Game Overview

**Type:** Timed document hunt  
**Goal:** Extract key facts from project documentation under time pressure  
**Level:** 0 (TODO #0)  
**Sub-task:** First sub-task of TODO #0

## Core Concept

Players race against the clock to find specific facts scattered across project documentation. The CLI acts as the "quest giver" - it provides targets and validates answers, while the player explores the actual files in their IDE.

## Learning Outcomes

- How to run the project locally (dev server, tests, build)
- Key technologies and tools used
- Required setup (environment variables, prerequisites)
- Where different types of information live in documentation

## Gameplay Loop

```
1. SEE TARGET     →  "Find: What command runs tests?"
       ↓
2. EXPLORE IDE    →  Player opens files, searches for answer
       ↓
3. SUBMIT ANSWER  →  Type the answer in CLI
       ↓
4. FEEDBACK       →  Correct? +points. Wrong? Learn correct answer.
       ↓
5. NEXT TARGET    →  Repeat until 5 targets found or time runs out
```

## Key Design Decisions

### CLI as Quest Giver, IDE as Game World
The game does NOT show file contents in the terminal. Instead, players navigate to real files in their IDE. This teaches actual codebase navigation skills.

### No Hints
Hints like "Check README.md" defeat the learning goal. Players must figure out WHERE information lives on their own. If they fail, they see the correct answer and location - learning through feedback, not hand-holding.

### Timed Pressure
3-minute time limit creates urgency without being stressful. Speed bonuses reward quick thinking.

### Learn from Failure
Wrong answers and timeouts show the correct answer AND where it was found. This teaches "where things live" even when players fail.

## Example Targets

Targets are generated dynamically from actual project files:

| Target Question | Expected Answer | Typically Found In |
|-----------------|-----------------|-------------------|
| What command starts the dev server? | `npm run dev` | README.md, package.json |
| What database does this project use? | PostgreSQL | README.md |
| What's the required Node version? | 18+ | README.md, package.json, .nvmrc |
| What port does the server run on? | 3000 | .env.example, README.md |
| What command runs the tests? | `npm test` | package.json |
| What ORM/database library is used? | Prisma | package.json |
| What environment variables are required? | DATABASE_URL, JWT_SECRET | .env.example |

## Why It's Fun

| Element | Engagement Driver |
|---------|-------------------|
| Timer | Creates urgency, "racing the clock" |
| Speed bonus | Rewards quick thinking, incentivizes mastery |
| Progressive targets | Building momentum (1/5 → 2/5 → 3/5...) |
| Knowledge unlocks | Tangible reward, useful information saved |
| Learn from failure | No punishment, just teaching |

## Juice/Feedback Specs

| Moment | Visual | Audio |
|--------|--------|-------|
| Correct answer | Green flash, points float up | Satisfying "ding" |
| Wrong answer | Red text, show correct answer | Error tone |
| Speed bonus | Lightning icon, extra points | Quick chime |
| Time running low (<30s) | Timer turns red, pulses | Heartbeat sound |
| All targets found | Confetti, celebration | Victory fanfare |
| Time out | Screen dims, "TIME'S UP" | Buzzer |

## Visual Examples

See [GAME-VISUALS.md](./GAME-VISUALS.md) for screen mockups and visual design.

## Monster Reaction on Completion

After completing this sub-task, the Monster stirs:

```
"You read the documentation?"
"ACTUALLY read it?"
"...I didn't even know we HAD documentation."
"I mean, I knew. I've been here since the beginning."
"I just assumed it was all lies by now."
```
