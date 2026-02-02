# TODO #1: flow --trace

## Game Overview

**Type:** Step-by-Step Tracing  
**Goal:** Trace a user journey through the codebase  
**Level:** 1 (TODO #1)  
**Sub-task:** Second sub-task of TODO #1  
**Duration:** ~12 minutes

## Core Concept

Players follow a user action from entry point to data layer, building a "breadcrumb trail" through the code. This connects the running product they just experienced to the actual implementation.

**Philosophy:** Code makes sense when you can trace what happens step by step.

## Learning Outcomes

- How user actions flow through the codebase
- The layers of the architecture (routes → handlers → services → data)
- Key files for implementing features
- How to trace any feature in the future

## Game Flow

### The Breadcrumb Trail

CLI presents a user journey with empty slots to fill:

```
FLOW TRACE: "User creates a new project"

Your trail:
┌─────────────────────────────────────────────────────┐
│ 1. [?] Entry point (route/page/command)             │
│    ↓                                                │
│ 2. [?] Handler/Controller                           │
│    ↓                                                │
│ 3. [?] Service/Business logic                       │
│    ↓                                                │
│ 4. [?] Data layer (database/storage)                │
└─────────────────────────────────────────────────────┘
```

### Step-by-Step Gameplay

**Step 1: Entry Point**
- CLI asks: "Where does 'create project' start? Find the route, page, or command."
- Player explores codebase, finds: `src/routes/projects.ts` or `pages/projects/new.tsx`
- CLI validates: "Correct! This file defines the entry point."

**Step 2: Handler/Controller**
- CLI asks: "What function handles this request?"
- Player finds: `createProjectHandler` or `handleSubmit`
- CLI validates and shows connection to step 1

**Step 3: Service/Logic**
- CLI asks: "Where's the business logic? What service does the actual work?"
- Player finds: `services/project.service.ts` → `createProject()`
- CLI validates and shows the growing trail

**Step 4: Data Layer**
- CLI asks: "Where does the data get saved?"
- Player finds: `repositories/project.repo.ts` or Prisma model
- Trail complete!

### Feedback System

**Correct answer:**
- Step fills in with green checkmark
- Brief explanation: "This file handles POST /api/projects"
- Trail visually connects
- Move to next step

**Wrong answer:**
- "Not quite. That file exists but doesn't handle this action."
- "Look for files related to [hint based on current step]"
- After 2 wrong: Narrow scope hint (no direct file reveal)

**Stuck too long:**
- "This step typically lives in /routes or /api folders"
- Still no direct answer - player must find it

## Adaptability

Trail structure adapts to architecture:

| Architecture | Layers |
|-------------|--------|
| **MVC** | Route → Controller → Model → Database |
| **Clean/Layered** | Route → Handler → Service → Repository → Entity |
| **Frontend** | Page → Component → Hook/State → API call |
| **Serverless** | API Route → Handler → Service → Database |
| **CLI** | Command → Handler → Service → Output |

## Example Journeys by Project Type

**Backend API:**
- "User registers a new account"
- "User fetches their profile"
- "Admin deletes a user"

**Frontend App:**
- "User submits the login form"
- "User navigates to dashboard"
- "User updates their settings"

**CLI Tool:**
- "User runs the init command"
- "User deploys their project"
- "User checks status"

## Design Decisions

### Why Tracing Matters
- Connects abstract code to concrete actions
- Teaches the mental model for understanding ANY feature
- "To find how X works, trace from entry point down"

### Why Step-by-Step
- Prevents overwhelm (one thing at a time)
- Each step builds on previous understanding
- Creates clear mental map of architecture layers

### Breadcrumb UX
- Visual trail shows progress
- Connections between steps are explicit
- Final complete trail becomes a reference

## Monster Reaction on Completion

```
"Oh, you can follow a trail."
"Entry point to database. How methodical."
"You know what else follows trails?"
"Debuggers. Debug-gers."
"...That wasn't a compliment."
"Anyway. Let's see if you can find where the BUGS live."
```

## Visual Reference

See [GAME-VISUALS.md](./GAME-VISUALS.md) for screen mockups and UI design.
