# OnboardMe — Game Narrative & Creative Direction

> **Reference document for the game's story, boss design, theme, and creative vision.**

This document serves as the creative bible for OnboardMe's narrative elements, separate from the technical PRD.

---

## Table of Contents

1. [Core Theme](#1-core-theme)
2. [The Spaghetti Code Monster](#2-the-spaghetti-code-monster)
3. [Narrative Arc](#3-narrative-arc)
4. [TODO Structure](#4-todo-structure)
5. [Game Terminology](#5-game-terminology)
6. [Dialogue & Voice](#6-dialogue--voice)
7. [Visual Direction](#7-visual-direction)
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

### Story Beats

| TODO | Monster's Emotional State | Player Relationship |
|------|--------------------------|---------------------|
| **Intro** | Mysterious, ominous | Unknown threat |
| **TODO #1** | Dismissive, mocking | "Another noob" |
| **TODO #2** | Condescending | "Lucky guesses" |
| **TODO #3** | Worried, backstory revealed | Respects player |
| **TODO #4** | Existential crisis | Fears player |
| **TODO #5** | Desperate, pleading | Offers truce |
| **FIXME** | Full power, then defeat | Final confrontation |
| **Ending** | Peaceful, grateful | Passes knowledge |

### The Emotional Journey

**Act 1: Mystery (TODO #1-2)**
- Monster is distant, taunting
- Player doesn't know what they're facing
- Building dread and curiosity

**Act 2: Understanding (TODO #3-4)**
- Monster's origin is revealed
- Player starts to empathize
- Monster becomes more desperate

**Act 3: Confrontation (TODO #5 + FIXME)**
- Monster offers to coexist
- Player must choose to face it
- Final battle tests everything learned

**Epilogue: Redemption**
- Monster isn't destroyed—it's understood
- Knowledge passes to player
- Monster becomes documentation

### The Key Insight

> "You're not defeating the Monster. You're *documenting* it. And documentation... is how technical debt dies."

---

## 4. TODO Structure

### Why TODOs Instead of Levels

| Old Term | New Term | Why It's Better |
|----------|----------|-----------------|
| Level 1 | TODO #1 | Developers know TODOs; they're relatable |
| Level 2 | TODO #2 | The Monster was BORN from TODOs |
| Boss | FIXME | FIXMEs are more urgent/scary than TODOs |
| Complete | Resolved | Git/ticket terminology |

### The Five Critical TODOs

```
□ TODO #1: // understand what we have
□ TODO #2: // figure out how to find things  
□ TODO #3: // trace data flows (URGENT)
□ TODO #4: // document why this works
□ TODO #5: // learn how to deploy safely
▣ FIXME:   // the monster itself (CRITICAL)
```

### TODO Details

| TODO | Original Comment | Learning Goal | Monster Reaction |
|------|-----------------|---------------|------------------|
| #1 | `// understand what we have` | Map the codebase structure | Dismissive |
| #2 | `// figure out how to find things` | Navigate and search | Mocking |
| #3 | `// trace data flows (URGENT)` | Understand data movement | Worried |
| #4 | `// document why this works` | Business logic & decisions | Existential |
| #5 | `// learn how to deploy safely` | Operations & deployment | Desperate |
| FIXME | `// CRITICAL - the monster` | Prove mastery | All-out battle |

### TODO Completion Ceremony

When a TODO is completed:

```
// TODO #3: trace data flows (URGENT)
// Added: 2021-03-15 by @former-architect
// Priority: HIGH  
// Status: "someone should really do this"
           ↓
// DONE: traced data flows ✓
// Completed by: YOU
// Only took: 3 years
```

---

## 5. Game Terminology

### Renamed Elements

| Generic Term | Code-Themed Term | Context |
|--------------|-----------------|---------|
| Levels | **TODOs** | Main progression stages |
| Boss | **FIXME** | Final confrontation |
| Mini-games | **Sub-tasks** | Challenges within TODOs |
| XP | **Commits** | Progress/points earned |
| Lives/Shields | **Retries** | Remaining attempts |
| Hints | **Stack Overflow** | Help system |
| Knowledge unlocks | **Documentation** | Learning rewards |
| Achievements | **Merged PRs** | Milestones/badges |
| Game over | **Segfault** | Failure state |
| Victory | **Deployed to Production** | Success state |
| Save point | **Checkpoint** | Progress saved |
| Health bar | **Integrity** | Monster's health |
| Streak | **Clean commits** | Consecutive correct answers |

### In-Game Usage Examples

```
"You've earned +50 commits!"
"Stack Overflow consulted. (-30 seconds)"
"New documentation unlocked: Authentication Flow"
"🎉 PR Merged: First TODO Completed"
"SEGMENTATION FAULT (core dumped) - Try again?"
"Monster Integrity: 40%"
"Clean commit streak: 5x multiplier!"
```

### Status Messages

| State | Message |
|-------|---------|
| Starting game | `Initializing codebase exploration...` |
| Correct answer | `Changes committed successfully.` |
| Wrong answer | `Build failed. Check your logic.` |
| Using hint | `// Consulting Stack Overflow...` |
| TODO complete | `TODO resolved. Closing ticket.` |
| All TODOs done | `All tickets closed. FIXME remains.` |
| Victory | `Deployed to PRODUCTION (your brain)` |
| Defeat | `SEGMENTATION FAULT (core dumped)` |

---

## 6. Dialogue & Voice

> **See [MONSTER-VOICE.md](./MONSTER-VOICE.md) for the complete Monster voice style guide.**

### Writing Guidelines

1. **Use the Monster sound vocabulary** — `*kzzzt*`, `*slrrrrp*`, `*tangle*`
2. **Reference real developer pain** — TODOs, legacy code, missing docs
3. **Self-deprecating** — Monster knows it's a mess
4. **Dramatic escalation** — Over-the-top reactions to player progress
5. **Fourth wall breaks** — Acknowledge the game/terminal
6. **Callback humor** — Reference earlier moments
7. **Signature entry/exit patterns** — Consistent sonic identity

### Sample Dialogue by TODO

#### TODO #0 Completion (First Appearance)
```
*kzzzt*

*the static resolves into something like a voice*

"So. You can see how the pieces connect."

*crackle*

"User to Organization to Project to Task..."

*slrrrrp*

"Impressive. That's almost correct."

*tangle*

"I mean, there's also a UserOrganizationProjectTaskLegacyBridge table."

*pause*

"Don't ask. Nobody asks."

*whirrrr*

"...Alright. You passed the warmup."

*hrrrrnn*

"Now let's see what you're really made of."

*[SIGNAL LOST]*
```

#### TODO #1 Completion
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

#### TODO #2 Completion
```
*crackle crackle crackle*

"You can grep."

*pause*

"Impressive."

*slrrrrp*

"My grandma's bash script can grep."

*static*

"...Okay, she doesn't have a bash script."
"She's also not real. I made her up."

*whirrrr*

"I do that sometimes. Make things up."

*tangle tangle*

"Like the comments in this codebase."

*heh. heheheh.*

*[CARRIER LOST]*
```

#### TODO #3 Completion (Backstory)
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

#### TODO #4 Completion (Existential Crisis)
```
*crackle*

"You understand the business logic now."

*whirrrr*

"The WHY behind the code."

*pause*

"Even the parts that don't make sense."

*tangle*

"Even the parts that NEVER made sense."

*static spike*

"Do you know why retry count is 3?"

*pause*

"Neither do I."

*creak*

"The comment says 'DO NOT CHANGE - breaks prod.'"

*drip*

"Nobody knows why. The knowledge died with the summer intern."

*HRRRRNN*

"If you defeat me, who will guard the sacred constants?"

*the static builds*

"WHO WILL REMEMBER WHY THE TIMEOUT IS 3847 MILLISECONDS?"

*0x5441494D454F5554*

*[EXISTENTIAL CRISIS MODE]*
```

#### TODO #5 Completion (Desperate)
```
*LOUD STATIC*

"You can DEPLOY."

*static spike*

"You understand the DEPLOYMENT."

*HRRRRRRNNNN*

"Do you have any idea how dangerous you are now?"

*crackle crackle*

"Listen to me. You don't have to do this."

*slrrrrp*

"We can coexist. I'll only break on Fridays."

*tangle*

"I'll even let you add ONE new feature without side effects."

*the noise wavers*

"Please."

*drip*

"I don't want to fight you."

*CRACKLE*

"But if you come for me..."

*TANGLE TANGLE TANGLE*

"I will throw EVERY edge case I have."

*[BOSS BATTLE IMMINENT]*
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

**Player used many hints:**
```
*kzzzt*

"I see you've adopted the sacred tradition of Stack Overflow."

*whirrrr*

"Copy-paste your way to victory."

*slrrrrp*

"Classic."

*[TRADITIONAL METHODS OBSERVED]*
```

### Watching Indicators

Subtle reminders the Monster is present during gameplay:

```
*kzzzt* "I've seen faster type inference..." *kzzzt*
*tap tap tap* "...Still thinking?" *drip*
*whirrrr* "Even my deprecated methods work faster." *CLICK*
*static* "This is giving 'undefined is not a function' energy." *heh*
*slrrrrp* "I'm not going anywhere." *slrrrrp*
*crackle* "I've seen interns debug faster. In COBOL." *crackle*
*kzzzt* "Interesting approach. Wrong, but interesting." *kzzzt*
*drip... drip...* "The code watches. I watch. Same thing." *creak*
```

### Signature Catchphrases

Lines designed to be memorable and quotable:

| Context | Catchphrase |
|---------|-------------|
| Identity | "I'm not deprecated. I'm CLASSIC." |
| Threat | "Go deeper. I dare you." |
| Presence | "The code remembers. I remember. Do you?" |
| Exit | "*slrrrrp* ...See you in the next TODO." |
| Victory | "I'm not defeated. I'm... documented." |
| Mocking | "Every bug was a feature once." |

---

## 7. Visual Direction

### Monster ASCII Art — Minimalistic Design

The Monster uses a small, expressive design that communicates "spaghetti code" through curly braces, wavy lines, and tentacle-like dependencies.

**100% — Full Power**
```
     ╭─────────╮
     │ { ◉ ◉ } │
     │  ~~~~   │
     ╰────┬────╯
       ╱│││╲
```

**50% — Worried**
```
     ╭─────────╮
     │ { ◉ _ } │
     │  ~~     │
     ╰────┬────╯
       ╱│╲
```

**10% — Critical**
```
     ╭  ─  ─  ╮
     │ { x x } │
     │         │
     ╰ ─ ─┬─ ─╯
```

**0% — Documented (Peaceful)**
```
     ╭─────────╮
     │ { - - } │
     │   __    │
     ╰─────────╯
```

### With Dialogue

```
 ╭────────────────────────────────────╮
 │ "I've crashed more browsers than   │
 │  you've written functions."        │
 ╰──────────────────┬─────────────────╯
                    │
               ╭─────────╮
               │ { ◉ ◉ } │
               │  ~~~~   │
               ╰────┬────╯
                 ╱│││╲
```

> **Full visual specifications:** See [fixme-spaghetti-monster/GAME-VISUALS.md](../games/fixme-spaghetti-monster/GAME-VISUALS.md)

### Screen Templates

**TODO Start Screen**
```
╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║   TODO #3: // trace data flows (URGENT)                               ║
║   ─────────────────────────────────────────────────────────────────   ║
║   Added: 2021-03-15 by @former-architect                              ║
║   Priority: HIGH                                                      ║
║   Status: "someone should really do this"                             ║
║                                                                        ║
║   Sub-tasks:                                                          ║
║   □ // trace a request through the system                             ║
║   □ // find where data transforms happen                              ║
║                                                                        ║
║   The Monster whispers:                                               ║
║   "You're getting close to where I live. Turn back now."              ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
```

**Progress Screen**
```
╔════════════════════════════════════════════════════════════════════════╗
║  📋 CODEBASE STATUS                                                    ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  Monster Integrity: ████████░░░░░░░░░░░░ 40%                          ║
║                                                                        ║
║  CRITICAL TODOs:                                                      ║
║  ────────────────────────────────────────────────────────────────     ║
║  ✓ TODO #1: // understand what we have           RESOLVED             ║
║  ✓ TODO #2: // figure out how to find things     RESOLVED             ║
║  → TODO #3: // trace data flows (URGENT)         IN PROGRESS          ║
║  ○ TODO #4: // document why this works           BLOCKED              ║
║  ○ TODO #5: // learn how to deploy safely        BLOCKED              ║
║  ▣ FIXME:   // the monster itself                LOCKED               ║
║                                                                        ║
║  Total Commits: 2,340                                                 ║
║  Documentation Unlocked: 12 entries                                   ║
║  Longest Clean Streak: 7                                              ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
```

---

## 8. Boss Battle Design

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

*Document Version: 1.0*
*Last Updated: 2025-02-02*
