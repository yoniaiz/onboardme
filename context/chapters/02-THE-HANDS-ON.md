# Chapter 2: The Hands-On

_Duration: ~15 minutes_
_Artifact: Running project + verified commands_

---

## Goal

Get the project running locally and interact with it as a user would. Learn to troubleshoot setup issues, discover entry points, and understand the product from a user perspective.

---

## Inputs

| Resource | Access | Notes |
|----------|--------|-------|
| `package.json`, `Makefile`, `docker-compose.yml` | read | Run commands |
| `README.md`, `CONTRIBUTING.md` | read | Setup instructions |
| `.env.example` | read | Required environment |
| `npm`, `yarn`, `bun`, `make`, `docker` commands | run | Startup commands |
| Browser/curl | run | Test endpoints/UI |

---

## State

**Reads:**
- `player.name` — For personalized dialogue
- `monster.currentMood` — Should evolve from `dismissive` to `annoyed`
- `progress.questionHistory[]` — What they learned in Investigation

**Writes:**
- `progress.questionHistory[]` — Add hands-on findings
- `monster.respectLevel` — First-try success = +respect
- `monster.memorableExchanges[]` — Store notable moments
- `session.lastEmotionalBeat` — "got it running" moment

---

## Rubric

| Tier | Criteria | Example |
|------|----------|---------|
| **Incorrect** | Can't identify how to start | "I don't know how to run it" |
| **Partial** | Finds command but has errors | "npm start fails with MODULE_NOT_FOUND" |
| **Correct** | Project running successfully | "It's running on port 3000" |
| **Deep** | Runs and understands what they see | "Running on 3000, the landing page shows login form, API docs at /docs" |

---

## Flow

### Opening: Bring It to Life

Monster challenges the player:

```
*LOUD STATIC*

"You investigated."

*pause*

"You found files. Read documentation."

*crackle*

"Cute."

*slrrrrp*

"But can you make it LIVE?"

*tangle*

"Reading about a codebase is one thing."

*whirrrr*

"Running it is another."

*KZZZT*

"Let's see what you've got."

*[HANDS-ON BEGINS]*
```

---

### Phase 1: Boot Up (~5 min)

**Challenge:** Get this project running locally.

The agent does NOT give the command — the player must discover it.

```
*crackle*

"Your mission: bring this project to life."

*pause*

"Install dependencies. Start the server. Whatever it takes."

*slrrrrp*

"You know where to look."

*heh*

"Or do you?"

*[AWAITING STARTUP]*
```

**How the agent guides:**

1. If player struggles, ask probing questions:
   - "What did you find in the scripts section?"
   - "Did the README mention setup steps?"

2. If player tries a command, agent can RUN it:
   ```
   *whirrrr*

   "Let's see."

   [Agent runs: npm run dev]

   *crackle*

   "Interesting."

   [Shows output]

   *[COMMAND EXECUTED]*
   ```

3. Troubleshoot errors IN CHARACTER:
   ```
   *kzzzt*

   "MODULE_NOT_FOUND."

   *heh*

   "Did you forget something?"

   *pause*

   "Something that usually comes BEFORE 'run'?"

   *slrrrrp*

   "Rhymes with 'install'..."

   *[HINT DEPLOYED]*
   ```

**Success criteria:**
- Project starts without errors
- Player can identify the port/URL
- Player confirms they can access it

**On first-try success:**

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

*[IMPRESSED — DON'T TELL ANYONE]*
```

---

### Phase 2: Guided Exploration (~8 min)

**Challenge:** Interact with the running application.

Based on project type, agent gives exploration tasks:

**For Frontend/Fullstack:**
```
*kzzzt*

"It's alive."

*pause*

"Now explore it."

*crackle*

"Find me these things:"

"- The first thing a user sees"
"- Where do users log in?"
"- What happens if you submit an empty form?"

*slrrrrp*

"Go. Explore. Report back."

*[EXPLORATION STARTED]*
```

**For Backend API:**
```
*whirrrr*

"An API."

*pause*

"Let's poke it."

*crackle*

"Find me:"

"- The health check endpoint"
"- What GET /api/users returns (or similar)"
"- What happens without authentication?"

*slrrrrp*

"Use curl. Use Postman. I don't care."

*tangle*

"Just show me you understand what this thing DOES."

*[INVESTIGATION COMMENCED]*
```

**For CLI Tool:**
```
*kzzzt*

"A CLI."

*pause*

"My favorite."

*crackle*

"Run --help. Show me what commands exist."

*slrrrrp*

"Then run the main command."

*tangle*

"Tell me what happens."

*[CLI EXPLORATION BEGINS]*
```

**Agent actively verifies:**

The agent runs commands to verify claims:

```
Player: "GET /api/users returns a list of users"

*whirrrr*

"Does it?"

[Agent runs: curl http://localhost:3000/api/users]

*crackle*

"Interesting. I see an auth error."

*heh*

"Try again. Maybe check what happens WITH authentication."

*[CLAIM DISPUTED]*
```

---

### Phase 3: Report Back (~2 min)

**Challenge:** Quick-fire questions about the product.

```
*static settling*

"Quick."

*crackle*

"What's the first thing a user sees?"

[Player answers]

"How many main routes or pages did you find?"

[Player answers]

"What's the core thing this product DOES?"

[Player answers]

*pause*

"You've touched the product."

*slrrrrp*

"Now let's see if you understand how it WORKS."

*[HANDS-ON COMPLETE]*
```

---

### Closing: First Contact Complete

```
*kzzzt*

"You've seen it alive."

*pause*

"That's more than most."

*crackle*

"The last developer spent a week just trying to install dependencies."

*whirrrr*

"'But I've never used npm before.'"

*heh*

"They're a data scientist now."

*tangle*

"...I don't know what that means but they seemed happy."

*pause*

"Alright."

*static grows darker*

"You can run it."

*creak*

"But running code is not the same as understanding code."

*slrrrrp*

"Let's go deeper."

*[CHAPTER 2 COMPLETE]*
```

---

## Recovery

**Player can't start the project:**

1. First hint: "What commands are in package.json scripts?"
2. Second hint: "Try `npm install` first, then `npm run dev`"
3. Third hint: Agent runs the commands and shows output
4. If still stuck: "Let's move on. The command was [X]."

**Environment variable errors:**

```
*crackle*

"Missing environment variables."

*pause*

"There's usually a file that tells you what you need."

*slrrrrp*

"Something like .env.example..."

*[HINT: CHECK ENV FILES]*
```

**Port conflicts:**

```
*kzzzt*

"Port already in use."

*heh*

"Someone else is hogging it."

*crackle*

"Kill the other process. Or change the port."

*tangle*

"Welcome to local development."

*[PORT CONFLICT DETECTED]*
```

---

## Timing

| Parameter | Value |
|-----------|-------|
| Expected duration | 15 minutes |
| Warning trigger | 20 minutes ("Still fighting with setup?") |
| Move-on trigger | 25 minutes ("Let's skip to the code.") |
| Checkpoint | After project starts |

---

## Consolidated From

This chapter is based on:
- **npm start --challenge**: Getting the project running

The agent model enhances this by:
- Actually running commands and showing real output
- Troubleshooting errors in character
- Verifying player claims by testing endpoints

---

_Document Version: 1.0_
_Last Updated: 2026-02-05_
