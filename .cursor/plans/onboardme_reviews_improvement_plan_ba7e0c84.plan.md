---
name: OnboardMe Reviews Improvement Plan
overview: A comprehensive plan to elevate OnboardMe from "a quiz with a monster skin" to "an interactive thriller where coding skills are superpowers" - addressing emotional pacing, player agency, real-world impact, and atmosphere refinements identified in both creative director reviews.
todos:
  - id: p0-cold-open
    content: "P0: Create COLD-OPEN.md and update GAME-NARRATIVE.md with atmospheric introduction"
    status: completed
  - id: p0-pacing
    content: "P0: Create PACING-GUIDE.md with quiet moments and tension-release oscillation specifications"
    status: completed
  - id: p0-ambient
    content: "P0: Update MONSTER-VOICE.md and JUICE-FEEDBACK.md with ambient presence system"
    status: completed
  - id: p0-loading
    content: "P0: Create LOADING-SCREENS.md with worldbuilding loading sequences"
    status: completed
  - id: p1-ide-weapon
    content: "P1: Update QUESTION-DESIGN.md with command-based 'IDE as weapon' question type"
    status: completed
  - id: p1-healing-reframe
    content: "P1: Update GAME.md and GAME-NARRATIVE.md to reframe damage as healing/refactoring"
    status: completed
  - id: p1-learning-spiral
    content: "P1: Update QUESTION-DESIGN.md with spaced repetition / learning spiral system"
    status: completed
  - id: p1-player-choices
    content: "P1: Create PLAYER-CHOICES.md with dialogue choice points throughout game"
    status: completed
  - id: p1-victory-summary
    content: "P1: Create VICTORY-SUMMARY.md with shareable victory card design"
    status: completed
  - id: p1-post-game-task
    content: "P1: Update ARCHITECTURE.md and GAME.md with post-game real task suggestion flow"
    status: completed
  - id: p2-typing-speeds
    content: "P2: Create RENDERING-ENGINE.md with variable typing speed specifications"
    status: completed
  - id: p2-glitch-system
    content: "P2: Create GLITCH-SYSTEM.md with visual corruption specifications"
    status: completed
  - id: p2-behavioral-tracking
    content: "P2: Create BEHAVIORAL-TRACKING.md with player pattern detection and Monster reactions"
    status: completed
  - id: p2-hint-reactions
    content: "P2: Update MONSTER-VOICE.md with hint usage reactions"
    status: completed
  - id: p2-memory-logs
    content: "P2: Create MEMORY-LOGS.md with unlockable corrupted memories system"
    status: completed
  - id: p2-real-artifact
    content: "P2: Update ARCHITECTURE.md with CODEBASE_KNOWLEDGE.md PR generation specification"
    status: completed
isProject: false
---

# OnboardMe Improvement Plan: From Quiz to Experience

## Current State Assessment

The project has exceptional foundations:

- **Strong**: Monster character concept, voice guide, terminology theming, game mechanics design
- **Gap**: Emotional architecture is documented but not player-facing; experience reads as "scripted" rather than "lived"

Both reviews agree: the Monster is brilliant (GLaDOS-tier potential), but the player journey needs refinement.

---

## Priority 0: Critical Gaps (Must-Have Before Launch)

### 1. Cold Open Introduction

**Problem**: Players encounter mechanics before meaning. The Monster's personality is front-loaded in documentation, not revealed through play.

**Solution**: Add atmospheric intro before `TODO #0`:

```
*kzzzt*
*the static resolves into something like a voice*
"Oh."
*pause*
"A new one."
*processing sounds*
"Welcome to the codebase."
*crackle*
"I'm... well, you'll figure out what I am soon enough."
*slrrrrp*
"Everyone does. Eventually."
*the static fades to a whisper*
"Good luck."
*[CONNECTION ESTABLISHED]*
```

**Files to update**:

- Create new `context/narrative/COLD-OPEN.md`
- Update [GAME-NARRATIVE.md](context/narrative/GAME-NARRATIVE.md) to include intro sequence
- Add to architecture flow in [ARCHITECTURE.md](context/ARCHITECTURE.md)

### 2. Quiet Moments After Victories

**Problem**: Constant intensity becomes bland. Every TODO completion triggers dialogue immediately - no breathing room.

**Solution**: Design "valley" moments between peaks:

- After each TODO completion, add 2-3 seconds of silence before Monster appears
- Include ambient presence indicators (subtle sounds without dialogue)
- Let players sit with accomplishment before next challenge

**Pacing curve to implement**:

```
Intensity
    |                                          BOSS
    |                              ╭─╮       ╱    ╲
    |          ╭─╮      ╱   ╲    ╱     ╲   ╱       ╲
    |    ╭─╮  ╱   ╲    ╱     ╲  ╱       ╲ ╱         │ VICTORY
    |   ╱   ╲╱     ╲  ╱       ╲╱         V          │
 ───┼──────────────────────────────────────────────┴──►
   INTRO  TODO1   TODO2    TODO3    TODO4   TODO5  FIXME
```

**Files to update**:

- Create `context/narrative/PACING-GUIDE.md`
- Update [JUICE-FEEDBACK.md](context/visuals/JUICE-FEEDBACK.md) with valley specifications

### 3. Ambient Monster Presence

**Problem**: Watching indicators only appear after 10 seconds idle. Atmosphere should exist continuously.

**Solution**: Add passive atmosphere during active play:

```
// During active play, occasional subtle sounds in muted corner:
| *drip...*                                               |
| *distant crackle*                                       |
| *whirrrr (fading)*                                      |
```

These are not interruptions - they're reminders the Monster is always there.

**Files to update**:

- Update [JUICE-FEEDBACK.md](context/visuals/JUICE-FEEDBACK.md) section 5
- Add to [MONSTER-VOICE.md](context/narrative/MONSTER-VOICE.md) as "Ambient Presence" section

### 4. Loading Screens as Worldbuilding

**Problem**: First impressions matter. `Analyzing codebase...` is generic.

**Solution**: Atmospheric loading with Monster commentary:

```
╔════════════════════════════════════════╗
║      EXCAVATING CODEBASE DEPTHS        ║
║              ⠋                         ║
║   Discovered: 47 TODOs                 ║
║   Detected: 3 circular dependencies    ║
║   Warning: Magic numbers detected      ║
║                                        ║
║   *something stirs in the deepest      ║
║    module...*                          ║
╚════════════════════════════════════════╝
```

When displaying codebase facts:

```
Oldest file: config.js (2019)
   *kzzzt* "That's where I was born." *kzzzt*
```

**Files to update**:

- Create `context/visuals/LOADING-SCREENS.md`
- Update [UI-COMPONENTS.md](context/visuals/UI-COMPONENTS.md)

---

## Priority 1: High Impact Enhancements

### 5. IDE as Weapon Mechanic

**Problem**: Current design is "quiz" format - answering multiple-choice questions.

**Solution**: Transform some questions into actual commands:

```
Monster: "You can't find me..."
Objective: Run `grep -r "UserAuth" .`
Result: Terminal shakes (simulated), Monster shrieks
```

This shifts from "answering questions" to "exorcising the codebase."

**Files to update**:

- Update [QUESTION-DESIGN.md](context/technical/QUESTION-DESIGN.md) with "command-based" question type
- Update game files in `context/games/` to include command-based challenges

### 6. Reframe "Damage" as "Healing/Refactoring"

**Problem**: "Killing" a sympathetic villain feels wrong narratively.

**Solution**: 

- HP bar becomes "Technical Debt" (reduce to 0)
- "Damage" becomes "Understanding" or "Documentation"
- Visuals change from "Red/Jagged" to "Green/Smooth" as you progress
- Monster becomes cleaner, not broken, as integrity decreases

**Files to update**:

- Update [GAME.md](context/games/fixme-spaghetti-monster/GAME.md) terminology
- Update [GAME-NARRATIVE.md](context/narrative/GAME-NARRATIVE.md) boss battle framing
- Update visual states in game visuals files

### 7. Learning Spiral (Spaced Repetition)

**Problem**: Concepts learned in TODO #1 aren't revisited until boss battle.

**Solution**: Each TODO should reference concepts from earlier TODOs:

```
       ╭─────────────────────────────────────────────────╮
       │                    BOSS BATTLE                  │
       │              (Tests everything)                 │
       ╰───────────────────────┬─────────────────────────╯
                               │
       ╭───────────────────────┼───────────────────────╮
       │                       │                       │
   TODO #5              TODO #4                  TODO #3
  (Uses #1 concept)   (Uses #2 concept)      (Introduces #3)
```

**Files to update**:

- Update [QUESTION-DESIGN.md](context/technical/QUESTION-DESIGN.md)
- Add cross-references in individual game GAME.md files

### 8. Player Choice Moments

**Problem**: The Monster talks constantly, but the player is silent. This feels like interrogation, not relationship.

**Solution**: Add occasional dialogue choices (don't affect gameplay, affect Monster's reaction):

```
Monster: "Why are you doing this? What do you possibly gain 
         from understanding ME?"

  > [A] Knowledge is power.
  > [B] I just want to do my job well.
  > [C] Someone has to understand this codebase.
  > [D] (Say nothing)
```

**Files to update**:

- Create `context/narrative/PLAYER-CHOICES.md`
- Update [GAME-NARRATIVE.md](context/narrative/GAME-NARRATIVE.md)
- Add choice points to TODO completion dialogues

### 9. Shareable Victory Summary

**Problem**: No social element - great onboarding includes shared experiences.

**Solution**: Generate shareable summary after victory:

```
╔══════════════════════════════════════════════════════════╗
║  @new_dev has DOCUMENTED the Spaghetti Code Monster      ║
║  at [company-repo]                                       ║
║                                                          ║
║  Monster Age: 7 years                                    ║
║  TODOs Conquered: 847                                    ║
║  Final Score: 2,340 commits                              ║
║                                                          ║
║  Monster's Last Words:                                   ║
║  "I'm not defeated. I'm documented."                     ║
║                                                          ║
║  #OnboardMe #CodebaseMonster                             ║
╚══════════════════════════════════════════════════════════╝
```

**Files to update**:

- Create `context/visuals/VICTORY-SUMMARY.md`
- Update [GAME.md](context/games/fixme-spaghetti-monster/GAME.md) victory ending

### 10. Post-Game Real Task Suggestion

**Problem**: After victory, players have learned but game doesn't bridge to actual work.

**Solution**: End with a real task suggestion:

```
*gentle hum*
"Now that you understand me... you should probably do something about it."

*[SUGGESTED FIRST CONTRIBUTION]*
Based on your exploration, here's a good first issue:

  TODO in src/services/auth.js:47
     "// TODO: add rate limiting - added 2021"
  
  You discovered this during TODO #3.
  You now know the auth flow.
  This is your chance to prove you understand.

Would you like me to create a ticket?
```

**Files to update**:

- Update [ARCHITECTURE.md](context/ARCHITECTURE.md) with post-game flow
- Update victory ending in [GAME.md](context/games/fixme-spaghetti-monster/GAME.md)

---

## Priority 2: Polish Enhancements

### 11. Variable Typing Speeds

**Problem**: Text is too clean. A haunted codebase feels unstable.

**Solution**: Add typing speed indicators to dialogue:

- Normal: 30ms/char
- Angry: 5ms/char (aggressive, fast)
- Damaged: 100ms/char (slow, bleeding out)
- Dramatic: Variable with pauses

**Files to update**:

- Add to [MONSTER-VOICE.md](context/narrative/MONSTER-VOICE.md)
- Create `context/technical/RENDERING-ENGINE.md` for text animation specs

### 12. Visual Glitch System

**Problem**: Monster losing control should feel unstable visually.

**Solution**: Progressive decay as boss battle continues:

- Box characters becoming corrupted: `╔` -> `╔̷`
- Occasional text glitches
- Color bleeding (subtle)
- Random colorize keywords (red for DEPRECATED, yellow for TODO)

**Files to update**:

- Create `context/visuals/GLITCH-SYSTEM.md`
- Update [ANIMATIONS.md](context/visuals/ANIMATIONS.md)

### 13. Behavioral Tracking and Reactions

**Problem**: Monster's dialogue is scripted per-TODO but doesn't react to player patterns.

**Solution**: Track player behavior and have Monster comment:


| Pattern            | Monster Reaction                                  |
| ------------------ | ------------------------------------------------- |
| Always uses hints  | "You and Stack Overflow are getting quite close." |
| Very fast          | "You're not even reading the files, are you?"     |
| Explores deep      | "You actually went INTO that folder? Brave."      |
| Revisits knowledge | "Checking your notes? Smart."                     |


**Files to update**:

- Create `context/technical/BEHAVIORAL-TRACKING.md`
- Update [STATE-MANAGEMENT.md](context/technical/STATE-MANAGEMENT.md)
- Add reactive dialogues to [MONSTER-VOICE.md](context/narrative/MONSTER-VOICE.md)

### 14. Hint System Enhancement

**Problem**: Current hint penalty is time-based. Missing emotional weight.

**Solution**: Monster reacts to hint usage:

```
*kzzzt*
"Oh. Stack Overflow."
*pause*
"I'm not judging."
*processing*
"I'm always judging."
*heh*
*[COPY-PASTE DETECTED]*
```

Social pressure instead of mechanical punishment.

**Files to update**:

- Update [JUICE-FEEDBACK.md](context/visuals/JUICE-FEEDBACK.md)
- Add hint reactions to [MONSTER-VOICE.md](context/narrative/MONSTER-VOICE.md)

### 15. Memory Logs / Corrupted Memories

**Problem**: Monster's backstory is told, not discovered.

**Solution**: Unlock "Corrupted Memories" as rewards - real git commit messages or fictional ones:

```
Log #04: "commit -m 'temp fix, will refactor tomorrow'"
         Timestamp: 4 years ago
```

**Files to update**:

- Create `context/narrative/MEMORY-LOGS.md`
- Add to knowledge unlock system in [GAME-NARRATIVE.md](context/narrative/GAME-NARRATIVE.md)

### 16. Real Artifact: CODEBASE_KNOWLEDGE.md

**Problem**: Victory artifact is mentioned but not specified as real.

**Solution**: Upon beating the game, generate a real Pull Request:

- Create actual `CODEBASE_KNOWLEDGE.md` file
- List player as "Slayer of the Spaghetti Monster (v1.0)"
- First real contribution on Day 1

**Files to update**:

- Update [ARCHITECTURE.md](context/ARCHITECTURE.md) with PR generation flow
- Create template for `CODEBASE_KNOWLEDGE.md` artifact

---

## Summary of New Files to Create


| File                                       | Purpose                           |
| ------------------------------------------ | --------------------------------- |
| `context/narrative/COLD-OPEN.md`           | Atmospheric introduction sequence |
| `context/narrative/PACING-GUIDE.md`        | Emotional pacing specifications   |
| `context/narrative/PLAYER-CHOICES.md`      | Dialogue choice points            |
| `context/narrative/MEMORY-LOGS.md`         | Unlockable backstory fragments    |
| `context/visuals/LOADING-SCREENS.md`       | Atmospheric loading designs       |
| `context/visuals/VICTORY-SUMMARY.md`       | Shareable victory card design     |
| `context/visuals/GLITCH-SYSTEM.md`         | Visual corruption specifications  |
| `context/technical/RENDERING-ENGINE.md`    | Text animation and typing specs   |
| `context/technical/BEHAVIORAL-TRACKING.md` | Player pattern detection          |


---

## Implementation Approach

This is a **design documentation project** (no code yet). Each improvement should:

1. Update existing design docs with new specifications
2. Create new design docs where needed
3. Ensure consistency across all documents
4. Maintain the existing high quality of documentation

The goal is to have complete specifications ready for implementation.