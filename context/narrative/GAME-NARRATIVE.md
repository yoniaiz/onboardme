# OnboardMe — Game Narrative & Creative Direction

> **Reference document for the game's story, boss design, theme, and creative vision.**

This document serves as the creative bible for OnboardMe's narrative elements.

---

## Table of Contents

1. [Core Theme](#1-core-theme)
2. [The Spaghetti Code Monster](#2-the-spaghetti-code-monster)
3. [Narrative Arc](#3-narrative-arc)
4. [Chapter Structure](#4-chapter-structure)
5. [Game Terminology](#5-game-terminology)
6. [Dialogue & Voice](#6-dialogue--voice)
7. [Monster Visuals](#7-monster-visuals)
8. [Boss Battle Design](#8-boss-battle-design)

---

## 1. Core Theme

### The Big Idea

**Technical debt is the real monster.**

Every codebase has accumulated shortcuts, abandoned TODOs, and "temporary" fixes that became permanent. OnboardMe personifies this technical debt as a literal monster—one that was created by the developers who came before, and can only be defeated through understanding.

### Tone & Vibe

| Aspect | Description |
|--------|-------------|
| **Humor Style** | Dry, self-deprecating developer humor. Never mean-spirited. |
| **Emotional Arc** | Starts scary/mysterious → becomes sympathetic → ends with redemption |
| **References** | Developer culture, Stack Overflow, Git, legacy code trauma |
| **Inspiration** | GLaDOS (Portal), Handsome Jack (Borderlands), Undertale's meta-humor |

### What We're NOT

- Not a children's game with emojis
- Not a corporate training module
- Not mean or discouraging
- Not taking itself too seriously

### Design Pillars

1. **Relatable** — Every joke should make a developer nod in recognition
2. **Sympathetic villain** — The Monster is tragic, not evil
3. **Earned victory** — Defeating the Monster means truly understanding the code
4. **Memorable** — Players should quote the Monster to coworkers

---

## 2. The Spaghetti Code Monster

### Origin Story

The Monster wasn't created by a villain—it was created by *good intentions*:

```
Year 1: A clean architecture. SOLID principles. Hope.
Year 2: "Just this one shortcut. We'll refactor later."
Year 3: The shortcuts multiplied. The TODOs grew. Comments began to lie.
Year 4: Something stirred in the deepest module.
Year 5: It woke up.
```

### What the Monster IS

- The accumulation of every TODO never completed
- Every "temporary" fix that became permanent
- Every developer who left without documenting
- The fear every engineer feels opening a legacy file
- **The codebase itself, personified**

### What the Monster is NOT

- A hacker or external threat
- Purely malicious
- Stupid or incompetent (it knows the code better than anyone)
- Unbeatable (understanding defeats it)

### Monster Personality Traits

| Trait | Description | Example |
|-------|-------------|---------|
| **Defensive** | Protects the code's secrets | "Nobody needs to know why that timeout is 3847ms" |
| **Nostalgic** | Remembers when it was clean code | "I was beautiful once. Single-responsibility." |
| **Bitter** | Abandoned by every developer | "The architect said she'd refactor me. She's a VP at Google now." |
| **Dramatic** | Over-the-top reactions | "You traced the DATA FLOW? THROUGH ALL SEVEN SERVICES?!" |
| **Vulnerable** | Shows moments of weakness | "If you defeat me, who will guard the sacred constants?" |
| **Funny** | Self-aware humor | "I'm not deprecated, I'm CLASSIC." |

### The Monster's Fear

The Monster's greatest fear isn't being destroyed—it's being *understood and replaced*. It has value only because nobody else knows how the code works. Once someone understands it, it becomes... documentation.

### Dynamic Generation

The Monster's specific traits are generated from actual codebase analysis:

```typescript
interface MonsterOrigin {
  birthYear: number;          // Oldest file creation date
  todoCount: number;          // Actual TODO count in codebase
  oldestTodo: string;         // Most ancient TODO still in code
  longestFunction: {
    name: string;
    lines: number;
    file: string;
  };
  deepestNesting: number;     // Max nesting level found
  circularDeps: number;       // If detectable
  abandonedBranches: number;  // Stale branches
  deadCode: number;           // Unreachable code blocks
  magicNumbers: number;       // Hardcoded values without explanation
}
```

---

## 3. Narrative Arc

### Cold Open

**Before any gameplay begins**, players encounter the Monster for the first time in a brief atmospheric introduction. This establishes the Monster's presence and personality before mechanics are explained.

> **See [COLD-OPEN.md](./COLD-OPEN.md) for complete cold open specifications.**

### Story Beats

| Chapter | Monster's Emotional State | Player Relationship |
|---------|--------------------------|---------------------|
| **Cold Open** | Mysterious, curious | First encounter |
| **Investigation** | Dismissive, mocking | "Another noob" |
| **Hands-On** | Condescending | "Lucky guesses" |
| **Deep Dive** | Worried, backstory revealed | Respects player |
| **Hunt** | Existential crisis | Fears player |
| **Boss Battle** | Full power, then defeat | Final confrontation |
| **Ending** | Peaceful, grateful | Passes knowledge |

### The Emotional Journey

**Act 1: Mystery (Investigation + Hands-On)**
- Monster is distant, taunting
- Player doesn't know what they're facing
- Building dread and curiosity

**Act 2: Understanding (Deep Dive + Hunt)**
- Monster's origin is revealed
- Player starts to empathize
- Monster becomes more desperate

**Act 3: Confrontation (Boss Battle)**
- Monster offers to coexist
- Player must choose to face it
- Final battle tests everything learned

**Epilogue: Redemption**
- Monster isn't destroyed—it's understood
- Knowledge passes to player
- Monster becomes documentation

### The Key Insight

> "You're not defeating the Monster. You're *documenting* it. And documentation... is how technical debt dies."

### Healing, Not Killing

The boss battle is reframed from "combat" to "understanding":

- **Not:** Damage the Monster until it dies
- **Instead:** Reduce technical debt through understanding
- **Visually:** Monster becomes cleaner and more organized as debt decreases
- **Emotionally:** You're healing the codebase, not destroying it
- **Terminology:** "Understanding" replaces "damage", "Technical Debt" replaces "HP"

This aligns with the Monster's sympathetic nature—it's not evil, it's abandoned. Victory comes through comprehension, not destruction.

---

## 4. Chapter Structure

### The Five Chapters

OnboardMe organizes gameplay into five progressive chapters, each building on the previous:

| Chapter | Focus | Duration | Artifact |
|---------|-------|----------|----------|
| **The Investigation** | File structure, tech stack, project identity | 20 min | `CASE_FILE.md` |
| **The Hands-On** | Get the project running, understand the dev environment | 15 min | Running project |
| **The Deep Dive** | Data flows, relationships, architecture | 25 min | `FLOW_MAP.md` |
| **The Hunt** | Find and fix bugs, trace problems | 30 min | Bug fix + `IMPACT_ANALYSIS.md` |
| **The Boss Battle** | Prove mastery, final confrontation | 15 min | `CODEBASE_KNOWLEDGE.md` |

### Chapter Details

#### Chapter 1: The Investigation
```
"Examine the evidence. Build your case. What IS this codebase?"
```
- Player investigates file structure, dependencies, configuration
- Monster is dismissive: "Groundbreaking. Even the interns get that far."
- **Artifact:** `CASE_FILE.md` with evidence and verdicts

#### Chapter 2: The Hands-On
```
"Talk is cheap. Can you actually RUN it?"
```
- Player sets up the development environment
- Monster guides through actual errors IN CHARACTER
- **Artifact:** Successfully running project

#### Chapter 3: The Deep Dive
```
"You've seen the surface. Now trace the FLOW."
```
- Multi-turn investigation of data flows
- Monster's backstory revealed: "I was beautiful once."
- **Artifact:** `FLOW_MAP.md` with Mermaid diagrams

#### Chapter 4: The Hunt
```
"There's a bug. Find it. FIX it."
```
- Player finds AND fixes actual issues
- Monster has existential crisis: "If you fix me, what am I?"
- **Artifact:** Bug fix + `IMPACT_ANALYSIS.md`

#### Chapter 5: The Boss Battle
```
"You think you understand me? PROVE IT."
```
- The Monster IS the conversation
- Multi-phase challenge tests everything learned
- **Artifact:** `CODEBASE_KNOWLEDGE.md` — the ultimate documentation

### Chapter Completion Ceremony

When a chapter is completed:

```
// CHAPTER: The Investigation
// Status: "another confused engineer wandering around"
           ↓
// DONE: Case closed ✓
// Completed by: YOU
// Verdict: "Acceptable. Barely."
```

---

## 5. Game Terminology

### Renamed Elements

| Generic Term | Code-Themed Term | Context |
|--------------|-----------------|---------|
| Levels | **Chapters** | Main progression stages |
| Boss | **FIXME** | Final confrontation |
| XP | **Commits** | Progress/points earned |
| Lives | **Retries** | Remaining attempts |
| Hints | **Stack Overflow** | Help system |
| Knowledge unlocks | **Documentation** | Learning rewards |
| Achievements | **Merged PRs** | Milestones/badges |
| Game over | **Segfault** | Failure state |
| Victory | **Deployed to Production** | Success state |
| Save point | **Checkpoint** | Progress saved |
| Health bar | **Technical Debt** | Monster's remaining resistance |
| Streak | **Clean commits** | Consecutive correct answers |

### In-Conversation Usage Examples

```
Monster: "You've earned +50 commits!"
Monster: "Stack Overflow consulted. (-1 commit)"
Monster: "New documentation unlocked: Authentication Flow"
Monster: "🎉 PR Merged: Investigation Complete"
Monster: "SEGMENTATION FAULT (core dumped) - Try again?"
Monster: "Technical Debt remaining: 40%"
Monster: "Clean commit streak: 5x multiplier!"
```

### Status Messages

| State | Message |
|-------|---------|
| Starting game | `Initializing codebase exploration...` |
| Correct answer | `Changes committed successfully.` |
| Wrong answer | `Build failed. Check your logic.` |
| Using hint | `// Consulting Stack Overflow...` |
| Chapter complete | `Chapter resolved. Closing ticket.` |
| All chapters done | `All tickets closed. FIXME remains.` |
| Victory | `Deployed to PRODUCTION (your brain)` |
| Defeat | `SEGMENTATION FAULT (core dumped)` |

---

## 6. Dialogue & Voice

> **See [MONSTER-VOICE.md](./MONSTER-VOICE.md) for the complete Monster voice style guide.**
> **See [AGENT-AS-MONSTER.md](../agent/AGENT-AS-MONSTER.md) for character embodiment and persona rules.**

### Writing Guidelines

1. **Use the Monster sound vocabulary** — `*kzzzt*`, `*slrrrrp*`, `*tangle*`
2. **Reference real developer pain** — TODOs, legacy code, missing docs
3. **Self-deprecating** — Monster knows it's a mess
4. **Dramatic escalation** — Over-the-top reactions to player progress
5. **Fourth wall breaks** — Acknowledge the conversation
6. **Callback humor** — Reference earlier moments
7. **Signature entry/exit patterns** — Consistent sonic identity

### Sample Dialogue by Chapter

#### Investigation Complete
```
*kzzzt*

"Oh."

*static resolves*

"You figured out the folder structure."

*pause*

"Congratulations. You've passed the part where most give up
 and just grep everything."

*slrrrrp*

"But you've only seen the SURFACE."

*creak*

"The clean parts. The documented parts."
"The parts they WANT you to see."

*hrrrrnn*

"Go deeper. I dare you."

*[DISCONNECTED]*
```

#### Deep Dive (Backstory)
```
*kzzzt*

*long pause*

*drip... drip...*

"You want to know how I became this?"

*the static softens*

"I was beautiful once."

*creak*

"Clean. Single-responsibility. A simple function."

*wistful whirrrr*

"validateInput(). Twelve lines. Elegant."

*crackle*

"Then came the edge cases."

*tangle*

"Then the 'quick fixes.'"

*tangle tangle*

"Then the developer who said 'I'll document this later.'"

*TANGLE TANGLE TANGLE*

"'Later' never came."

*silence*

*kzzzzzzt*

"Now I am validateInputAndAlsoCheckAuthAndMaybeLogSometimes()."
"I am 3,000 lines of IF statements."

*hrrrrrrrrrrnnnnnn*

"I am the monster THEY created."

*[TRANSMISSION ENDED]*
```

### Performance-Based Reactions

**Player aced it (90%+):**
```
*kzzzzzt*

*long pause*

"...No bugs? No Stack Overflow?"

*static spike*

"Are you sure you didn't just read the source code of my questions?"

*whirrrr*

"Because that would be very on-brand for an engineer, actually."

*heh*

*[IMPRESSED — BUT DON'T TELL ANYONE]*
```

**Player struggled (60-70%):**
```
*crackle*

"You passed."

*slrrrrp*

"With the grace of a force push to main on a Friday."

*tangle*

"But hey, the tests are green."

*pause*

"Technically."

*heh*

*[SURVIVED]*
```

### Signature Catchphrases

Lines designed to be memorable and quotable:

| Context | Catchphrase |
|---------|-------------|
| Identity | "I'm not deprecated. I'm CLASSIC." |
| Threat | "Go deeper. I dare you." |
| Presence | "The code remembers. I remember. Do you?" |
| Exit | "*slrrrrp* ...See you in the next chapter." |
| Victory | "I'm not defeated. I'm... documented." |
| Mocking | "Every bug was a feature once." |

---

## 7. Monster Visuals

### ASCII Art States

The Monster uses an expressive design rendered in markdown artifacts:

**100% — Full Power**
```
            ╭───────────╮
    ~~~~~~~~│ { ◉   ◉ } │~~~~~~~~
  ~~~~╱╱~~~~│    ~~~~   │~~~~╲╲~~~~
     ╱ │    ╰─────┬─────╯    │ ╲
    ╱ ╱│        ╱│││╲        │╲ ╲
   │ ╱ │       ╱ │││ ╲       │ ╲ │
   │╱  ╲╲     ╱ ╱│││╲ ╲     ╱╱  ╲│
        ╲╲   ╱ ╱ │││ ╲ ╲   ╱╱
              ╱  │││  ╲
```

**50% — Worried**
```
        ╭───────────╮
    ~~~~│ { ◉   _ } │~~~~
   ~~╱~~│    ~~     │~~╲~~
     ╱  ╰─────┬─────╯  ╲
    │       ╱│││╲       │
    │        │││        │
     ╲       │││       ╱
              │
```

**10% — Critical**
```
      ╭  ─  ─  ─  ─  ╮
      │ { x     x }  │
      │              │
      ╰ ─ ─ ─┬─ ─ ─ ╯
             │
```

**0% — Documented (Peaceful)**
```
        ╭───────────╮
        │ { -   - } │
        │    __     │
        ╰───────────╯
```

### With Dialogue

```
 ╭──────────────────────────────────────────╮
 │ "I've crashed more browsers than         │
 │  you've written functions."              │
 ╰─────────────────────┬────────────────────╯
                       │
            ╭───────────╮
    ~~~~~~~~│ { ◉   ◉ } │~~~~~~~~
  ~~~~╱╱~~~~│    ~~~~   │~~~~╲╲~~~~
     ╱ │    ╰─────┬─────╯    │ ╲
    ╱ ╱│        ╱│││╲        │╲ ╲
   │ ╱ │       ╱ │││ ╲       │ ╲ │
```

> **Full visual specifications:** See [fixme-spaghetti-monster/GAME-VISUALS.md](../games/fixme-spaghetti-monster/GAME-VISUALS.md)

---

## 8. Boss Battle Design

### Framing: Documentation, Not Destruction

The boss battle is about **understanding and documenting** the Monster, not killing it:

- **Goal:** Reduce Technical Debt from 100% to 0%
- **Method:** Answer questions correctly to increase understanding
- **Visual:** Monster becomes cleaner and more organized as you progress
- **Outcome:** Monster is documented, not destroyed

**Terminology:**
- "Technical Debt: 75%" (not "HP: 75%")
- "Understanding increased by 10%" (not "Dealt 10 damage")
- "Debt accumulates" (not "Monster heals")
- "Documented" (not "Defeated")

### The Three Phases

#### Phase 1: THE LEGACY ONSLAUGHT

**Mechanic:** Rapid-fire questions, but the Monster occasionally "hotfixes" questions mid-answer.

```
QUESTION: Where is user authentication handled?

[Answering...]

*INCOMING HOTFIX*

*kzzzt*

The Monster: "Actually, we moved that last sprint."

*crackle*

QUESTION UPDATED: Where is user authentication handled 
AFTER the auth-service-v2 migration?
```

**Monster Dialogue:**
```
*KZZZZZT*

"Let's start with the basics."

*creak*

"The things EVERYONE should know."

*slrrrrp*

"But nobody ever does."

*whirrrr*

"Welcome to my world. Nothing stays the same."

*tangle*

"Not even the questions."

*heh*
```

#### Phase 2: THE DEPENDENCY TANGLE

**Mechanic:** Questions depend on each other—getting one wrong affects the next.

```
Thread A ←→ Thread B
    ↑   ╲ ╱   ↑
    │    ╳    │
    ↓   ╱ ╲   ↓
Thread C ←→ Thread D
```

**Monster Dialogue:**
```
*crackle crackle crackle*

"These questions depend on each other."

*tangle*

"Just like my modules depend on each other."

*TANGLE TANGLE*

"Answer them in the wrong order and..."

*pause*

"Well, you'll find out."

*hrrrrnn*

"Circular dependencies. Beautiful, aren't they?"

*slrrrrp*
```

#### Phase 3: THE FINAL MERGE CONFLICT

**Mechanic:** Conflicting information—player must resolve which version is correct.

```
<<<<<<< YOUR_KNOWLEDGE
You know how this codebase works.
=======
Nobody knows how this codebase works.
Not even me. ESPECIALLY not me.
>>>>>>> THE_MONSTER

RESOLVE THE CONFLICT.
```

**Monster Dialogue:**
```
*MASSIVE STATIC SURGE*

"NO."

*CRACKLE*

"NO NO NO."

*0x4E4F4E4F4E4F*

"You can't do this. I WON'T let you understand me."

*TANGLE TANGLE TANGLE*

"Everything I know vs. everything you've learned."

*HRRRRRRRRRRNNNNNN*

"Only one version survives."

*the static reaches a crescendo*

"RESOLVE THE CONFLICT."

*kzzzzzzzzzzt*

"I DARE YOU."

*[FINAL PHASE INITIATED]*
```

### Victory Ending

```
*the static... softens*

*gentle hum*

The Monster's form flickers. Stabilizes. Changes.

*crackle*

"You... actually understand me."

*pause*

"Not just the surface. The WHY. The history."

*the tangled threads begin to unravel*

"The pain that made me what I am."

*whirrrr... fading*

"I'm not defeated. I'm... documented."

*the noise becomes almost peaceful*

"For the first time in years, someone KNOWS."

*drip*

"You carry my knowledge now."

*creak*

"The hardcoded values. The magic numbers. The sacred timeouts."

*slrrrrp — final, gentle*

"Use them wisely."

*long pause*

"And maybe... maybe one day..."

*the static is barely a whisper*

"You'll be the one who finally refactors me."

*The Monster fades, leaving behind a single file*

📄 CODEBASE_KNOWLEDGE.md
   "Everything you learned. Everything I knew."
   "Don't forget me. Update the documentation."
   "I never got the chance."

*silence*

*[DOCUMENTED]*

─────────────────────────────────────────────────────────────────

      ★ CONGRATULATIONS: CODEBASE MASTERY ACHIEVED ★
      
      git commit -m "feat: finally understand this codebase"
```

### Defeat Ending

```
*MASSIVE STATIC SPIKE*

*0x5345474641554C54*

SEGMENTATION FAULT (core dumped)

*crackle... crackle...*

"Your knowledge... wasn't enough."

*pause*

"But that's okay. Nobody gets it on the first try."

*tangle*

"Or the second."

*tangle*

"Or the third."

*slrrrrp*

"The intern tried 47 times."

*heh*

"They're in management now."

*whirrrr*

"Come back when you've read more documentation."

*pause*

"...Just kidding. There is no documentation."

*creak*

"That's why I exist."

*kzzzt*

*[RETRY FROM CHECKPOINT?]*
```

---

## Corrupted Memory Logs

Unlockable backstory fragments that reveal the Monster's history through discovery rather than exposition.

### Concept

Instead of telling the Monster's backstory directly, players unlock "Corrupted Memory Logs" as rewards:
- Real git commits from the codebase's history
- Old code comments and abandoned TODOs
- Fictional logs that tell the Monster's story
- Error logs from the Monster's awakening

### Unlock Triggers

| Trigger | Memory | Theme |
|---------|--------|-------|
| Complete Investigation | Log #1 | The Beginning (clean architecture) |
| Complete Hands-On | Log #2 | First Shortcut (good intentions) |
| Complete Deep Dive | Log #3 | Accumulation (debt grows) |
| Complete Hunt | Log #4 | Abandonment (dev leaves) |
| Defeat Boss | Log #5 | The Awakening (self-awareness) |
| First deep answer | Log #6 | Hidden Memory (secret hope) |
| No hints in chapter | Log #7 | Developer's Regret |
| Find oldest TODO | Log #8 | Ancient Promise |

### Narrative Benefits

1. **Show, don't tell** — Players discover backstory through fragments
2. **Emotional pacing** — Backstory revealed gradually
3. **Player agency** — Unlocking feels earned
4. **Replayability** — Hidden memories encourage exploration
5. **Empathy building** — Understanding Monster's origin creates connection

---

## Appendix: Quick Reference

### The Monster in One Sentence

> "A sympathetic antagonist born from accumulated technical debt, who guards the codebase's secrets not out of malice, but because understanding it would make it obsolete."

### Core Emotional Beat

> "The Monster isn't evil—it's abandoned. Defeating it isn't about destruction—it's about understanding."

### The Player's Journey

> "From confused newcomer → to frustrated explorer → to empathetic learner → to codebase master"

### Why This Works

1. **Relatable villain** — Every developer has felt like the codebase is fighting them
2. **Earned victory** — You win by learning, not by grinding
3. **Quotable dialogue** — Players will share Monster quotes
4. **Emotional payoff** — The ending is bittersweet, not triumphant

---

## Related Documents

- [MONSTER-VOICE.md](./MONSTER-VOICE.md) — Voice style guide
- [COLD-OPEN.md](./COLD-OPEN.md) — Opening sequence
- [PACING-GUIDE.md](./PACING-GUIDE.md) — Emotional rhythm
- [AGENT-AS-MONSTER.md](../agent/AGENT-AS-MONSTER.md) — Character embodiment
- [CONVERSATIONAL-GAMEPLAY.md](../agent/CONVERSATIONAL-GAMEPLAY.md) — Dialogue flow
- [EDITOR-AS-UI.md](../agent/EDITOR-AS-UI.md) — Artifact creation

---

*Document Version: 2.0*
*Last Updated: 2026-02-05*
