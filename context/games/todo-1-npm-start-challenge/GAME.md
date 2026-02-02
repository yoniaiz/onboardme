# TODO #1: npm start --challenge

## Game Overview

**Type:** Run & Reproduce  
**Goal:** Get the project running and complete hands-on challenges  
**Level:** 1 (TODO #1)  
**Sub-task:** First sub-task of TODO #1  
**Duration:** ~15 minutes

## Core Concept

Players actually RUN the project and interact with it. This is hands-on learning - not just reading code, but experiencing the product as a user would.

**Philosophy:** You can't truly understand a codebase until you've seen it alive.

## Learning Outcomes

- How to run the project locally
- What the product actually looks/feels like
- Main features from a user perspective
- Entry points and primary flows

## Game Flow

### Phase 1: Boot Up (~3 min)

**Challenge:** Get this project running locally

1. CLI prompts: "Your first mission: bring this project to life"
2. Player figures out the command from:
   - package.json scripts
   - README instructions
   - Makefile / docker-compose
   - Common conventions
3. Player runs the command and reports back
4. CLI validates: "What port is it running on?" or "What output do you see?"

**Success:** Project is running locally

### Phase 2: Guided Challenges (~10 min)

CLI gives specific tasks based on detected project type:

| Project Type | Example Challenges |
|--------------|-------------------|
| **Frontend/Fullstack** | "Find the login page", "Navigate to user settings", "What happens when you submit an empty form?" |
| **Backend API** | "Hit the health endpoint", "What does GET /api/users return?", "Try to access a protected route without auth" |
| **CLI Tool** | "Run --help", "What subcommands are available?", "Execute the init command - what does it create?" |
| **Library** | "Import the main module in a REPL", "Call the primary function", "What does it return?" |

Each challenge:
1. CLI presents the task
2. Player explores/interacts with running product
3. Player reports what they found
4. CLI validates and moves to next challenge

### Phase 3: Report Back (~2 min)

Quick-fire questions about their experience:
- "What's the first thing a user sees?"
- "How many main sections/routes did you find?"
- "What happens without authentication?"

## Adaptability

Game detects project type and adjusts challenges:

```
Frontend App     → UI navigation, forms, pages
Backend API      → Endpoints, responses, auth
CLI Tool         → Commands, flags, outputs
Library          → Imports, functions, returns
Fullstack        → Mix of frontend + backend challenges
```

## Design Decisions

### Why Run First?
- Reading code without context is abstract
- Seeing the product creates mental anchors
- "Oh, THAT'S what that component does"
- Builds excitement and connection to the project

### No Hints on HOW to Run
- Player must discover the run command themselves
- Teaches real skill: figuring out how to start any project
- After failure, reveal: "The command was `npm run dev` - found in package.json scripts"

## Monster Reaction on Completion

```
*LOUD STATIC*

"..."

*the noise stabilizes*

"You got it running."

*creak*

"On the first try."

*processing... processing...*

"Do you have any idea how long it took the LAST person?"

*whirrrr*

"Three days."

*tangle*

"THREE DAYS."

*static spike*

"They kept asking 'but where's the Main class?'"

*crackle*

"It's JavaScript. THERE IS NO MAIN CLASS."

*slrrrrp*

"They're in finance now."

*heh*

"...I'm not worried."

*pause*

"This is the easy part. Running code."

*hrrrrnn*

"Understanding code? That's where they all fail."

*kzzzt*

"Keep going. I dare you."

*[TRANSMISSION ENDED]*
```

## Visual Reference

See [GAME-VISUALS.md](./GAME-VISUALS.md) for screen mockups and UI design.
