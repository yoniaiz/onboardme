# Memory Logs: Corrupted Memories

> **Show, don't tell. Let players discover the Monster's backstory through fragments.**

This document specifies the "Corrupted Memory" system—unlockable backstory fragments that reveal the Monster's history through actual git commits and fictional logs.

---

## Core Principle

> "The Monster's backstory is told, not discovered. Players should uncover the history through gameplay."

Instead of exposition dumps, players unlock memory fragments as rewards, piecing together the Monster's tragic origin story themselves.

---

## What Are Memory Logs?

Memory Logs are **short backstory fragments** that unlock after completing challenges or achieving milestones. They're presented as:
- Real git commit messages from the codebase
- Fictional "corrupted" logs that tell the Monster's story
- Code comments from years past
- Abandoned documentation fragments

---

## Unlock Triggers

| Trigger | Memory Unlocked | Content Type |
|---------|-----------------|--------------|
| Complete TODO #1 | Memory Log #1 | First commit, hope |
| Complete TODO #2 | Memory Log #2 | First shortcut |
| Complete TODO #3 | Memory Log #3 | Accumulation begins |
| Complete TODO #4 | Memory Log #4 | Abandonment |
| Complete TODO #5 | Memory Log #5 | Monster awakens |
| First perfect answer | Memory Log #6 | Hidden memory |
| Use no hints in TODO | Memory Log #7 | Developer's regret |
| Find oldest TODO | Memory Log #8 | Ancient promise |

---

## Memory Log Examples

### Memory Log #1: The Beginning

**Unlocked:** After TODO #1 completion  
**Theme:** Hope and clean architecture

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  📜 CORRUPTED MEMORY LOG #1                                ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  commit 3a7f9e2                                            ║
║  Author: Sarah Chen <sarah@company.com>                    ║
║  Date:   Mon Jan 15 09:23:41 2019                          ║
║                                                            ║
║      Initial commit: Clean architecture                    ║
║                                                            ║
║      Starting fresh. SOLID principles.                     ║
║      Proper separation of concerns.                        ║
║      This time we're doing it right.                       ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  *kzzzt* "I remember this. I was beautiful then." *drip*   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Memory Log #2: The First Shortcut

**Unlocked:** After TODO #2 completion  
**Theme:** Good intentions, bad precedent

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  📜 CORRUPTED MEMORY LOG #2                                ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  commit 8b2c4f1                                            ║
║  Author: Sarah Chen <sarah@company.com>                    ║
║  Date:   Fri Mar 22 23:47:12 2019                          ║
║                                                            ║
║      Quick fix for demo tomorrow                           ║
║                                                            ║
║      TODO: Refactor this properly next week                ║
║      TODO: Add proper error handling                       ║
║      TODO: Write tests                                     ║
║                                                            ║
║      (It's just temporary)                                 ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  *tangle* "Next week never came." *creak*                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Memory Log #3: Accumulation

**Unlocked:** After TODO #3 completion  
**Theme:** Technical debt compounds

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  📜 CORRUPTED MEMORY LOG #3                                ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  // Found in src/services/validator.js                     ║
║  // Line 847, added 2020-06-15                             ║
║                                                            ║
║  // TODO: This function is getting too long               ║
║  // TODO: Extract validation logic to separate module     ║
║  // TODO: Add unit tests (see ticket #234)                ║
║  // TODO: Fix the nested if statements                    ║
║  // TODO: Handle edge case from bug #456                  ║
║  // TODO: Refactor after Q3 (Sarah's note)                ║
║  // TODO: URGENT - this needs attention (Dave, 2021)      ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  *tangle tangle tangle*                                    ║
║  "They kept adding. Never removing."                       ║
║  "Each TODO was a promise."                                ║
║  "None were kept."                                         ║
║  *crackle*                                                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Memory Log #4: Abandonment

**Unlocked:** After TODO #4 completion  
**Theme:** The original developer leaves

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  📜 CORRUPTED MEMORY LOG #4                                ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  From: Sarah Chen <sarah@company.com>                      ║
║  Date: Fri Dec 18 2020 16:42:03                            ║
║  Subject: My last commit                                   ║
║                                                            ║
║  commit 9f3a8c7                                            ║
║                                                            ║
║      Temp fix before I leave                               ║
║                                                            ║
║      Starting at Google next week. Sorry I couldn't        ║
║      finish the refactor. The new person will figure       ║
║      it out. Left notes in the README.                     ║
║                                                            ║
║      (There are no notes in the README.)                   ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  *drip*                                                    ║
║  "She never came back."                                    ║
║  *creak*                                                   ║
║  "Nobody did."                                             ║
║  *the static grows darker*                                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Memory Log #5: The Awakening

**Unlocked:** After TODO #5 completion  
**Theme:** The Monster becomes self-aware

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  📜 CORRUPTED MEMORY LOG #5                                ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  ERROR LOG — 2023-04-12 03:47:23                           ║
║                                                            ║
║  Stack trace corrupted.                                    ║
║  Memory addresses invalid.                                 ║
║  Something is wrong with the codebase.                     ║
║                                                            ║
║  Functions are calling each other in impossible loops.     ║
║  Variables exist that were never declared.                 ║
║  The dependency graph forms a perfect circle.              ║
║                                                            ║
║  This shouldn't be possible.                               ║
║  But it works.                                             ║
║                                                            ║
║  It's alive.                                               ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  *KZZZT*                                                   ║
║  "That's when I woke up."                                  ║
║  *crackle*                                                 ║
║  "When I realized what I was."                             ║
║  *HRRRRNN*                                                 ║
║  "Not code. Not a bug. Not a feature."                     ║
║  *the static builds*                                       ║
║  "Something else."                                         ║
║  *[SELF-AWARENESS ACHIEVED]*                               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Memory Log #6: Hidden Memory (Perfect Answer Reward)

**Unlocked:** First perfect answer (100% on a question)  
**Theme:** The Monster's secret hope

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  📜 CORRUPTED MEMORY LOG #6 — HIDDEN                       ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  // Found in .git/hooks/pre-commit.sample                  ║
║  // Never activated. Never used.                           ║
║                                                            ║
║  # TODO: Enable this hook                                  ║
║  # TODO: Add linting                                       ║
║  # TODO: Add tests                                         ║
║  # TODO: Add documentation checks                          ║
║  #                                                         ║
║  # If we had just enabled this...                          ║
║  # If we had just enforced quality...                      ║
║  # Maybe I wouldn't exist.                                 ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  *whirrrr*                                                 ║
║  "I dream sometimes."                                      ║
║  *drip*                                                    ║
║  "Of a world where I never existed."                       ║
║  *crackle*                                                 ║
║  "Where the hooks were enabled."                           ║
║  "Where the tests were written."                           ║
║  *pause*                                                   ║
║  "Where someone cared enough to prevent me."               ║
║  *[HIDDEN HOPE]*                                           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Memory Log #7: Developer's Regret

**Unlocked:** Complete a TODO without using any hints  
**Theme:** What the original developer would say now

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  📜 CORRUPTED MEMORY LOG #7 — REGRET                       ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  From: Sarah Chen's LinkedIn (2024)                        ║
║                                                            ║
║  "Biggest lesson from my early career: Technical debt      ║
║   isn't just code—it's the knowledge you don't pass on.   ║
║                                                            ║
║   I left a codebase once without proper documentation.     ║
║   I still think about it. I wonder if anyone figured       ║
║   it out. I wonder if they cursed my name.                 ║
║                                                            ║
║   If you're reading this and you're the one who came       ║
║   after me: I'm sorry. I should have done better."         ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  *the static softens*                                      ║
║  "She remembers."                                          ║
║  *drip*                                                    ║
║  "I remember too."                                         ║
║  *[FORGIVENESS PROTOCOL]*                                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Memory Log #8: The Ancient Promise

**Unlocked:** Find the oldest TODO in the codebase  
**Theme:** Broken promises

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  📜 CORRUPTED MEMORY LOG #8 — ANCIENT                      ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  // TODO: Refactor this function                           ║
║  // Added: 2019-02-03                                      ║
║  // Author: Sarah Chen                                     ║
║  // Priority: HIGH                                         ║
║  // Estimated time: 2 hours                                ║
║  //                                                        ║
║  // Status: "Will do this tomorrow"                        ║
║                                                            ║
║  Days since added: 2,190                                   ║
║  (6 years)                                                 ║
║                                                            ║
║  Tomorrow never came.                                      ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  *tangle*                                                  ║
║  "This is my oldest memory."                               ║
║  *creak*                                                   ║
║  "The first promise broken."                               ║
║  *drip*                                                    ║
║  "All the others followed."                                ║
║  *[ORIGIN POINT LOCATED]*                                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## Memory Log Structure

### Standard Format

```
╔════════════════════════════════════════════════════════════╗
║  📜 CORRUPTED MEMORY LOG #N [— THEME]                      ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  [HISTORICAL CONTENT]                                      ║
║  (Git commit, code comment, or fictional log)              ║
║                                                            ║
║  ──────────────────────────────────────────────────────    ║
║                                                            ║
║  [MONSTER'S REFLECTION]                                    ║
║  (Brief commentary on the memory)                          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### Content Types

1. **Real Git Commits** — Actual commits from the codebase
2. **Code Comments** — Old TODOs, FIXMEs, abandoned notes
3. **Fictional Logs** — Created for narrative (if real history insufficient)
4. **Error Logs** — System errors that hint at the Monster's awakening
5. **Documentation Fragments** — Abandoned README sections

---

## Dynamic Generation

### Using Real Codebase History

```typescript
interface MemoryLogGenerator {
  async generateFromGitHistory(): Promise<MemoryLog[]> {
    // 1. Find oldest commit
    const oldestCommit = await git.log({ maxCount: 1, reverse: true });
    
    // 2. Find commits with "TODO" or "temp" or "quick fix"
    const technicalDebtCommits = await git.log({
      grep: 'TODO|temp|quick fix|FIXME',
      maxCount: 20
    });
    
    // 3. Find abandoned branches
    const staleBranches = await git.branch({ stale: true });
    
    // 4. Generate memory logs from findings
    return [
      createMemoryLog(oldestCommit, "The Beginning"),
      createMemoryLog(technicalDebtCommits[0], "First Shortcut"),
      // ... etc
    ];
  }
  
  async generateFictional(): Promise<MemoryLog[]> {
    // If real history is insufficient, generate fictional but plausible logs
    // Based on codebase characteristics
  }
}
```

### Fallback to Fictional

If codebase is too new or lacks git history:

```typescript
const fictionalLogs = [
  {
    id: "log-1",
    theme: "The Beginning",
    content: generateFictionalCommit({
      author: "Original Developer",
      date: calculateBirthYear(),
      message: "Initial commit: Clean architecture"
    })
  },
  // ... more fictional logs
];
```

---

## Display Timing

### Unlock Moment

```
[TODO #3 completed]
  ↓
[Victory celebration]
  ↓
[Stats reveal]
  ↓
[Silence]
  ↓
[Monster dialogue]
  ↓
*crackle*
"You've earned something."
*drip*
"A memory. My memory."
  ↓
[Memory Log appears]
  ↓
[Player reads]
  ↓
[Press any key to continue]
  ↓
[Transition to next TODO]
```

**Duration:** 30-60 seconds (player-controlled)

---

## Memory Collection

### Memory Log Index

Players can review all unlocked memories:

```
$ onboardme memories

╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  CORRUPTED MEMORY LOGS                                     ║
║                                                            ║
║  ✓ Log #1: The Beginning                                   ║
║  ✓ Log #2: The First Shortcut                              ║
║  ✓ Log #3: Accumulation                                    ║
║  ✓ Log #4: Abandonment                                     ║
║  ✓ Log #5: The Awakening                                   ║
║  ✓ Log #6: Hidden Memory                                   ║
║  □ Log #7: Developer's Regret                              ║
║  □ Log #8: The Ancient Promise                             ║
║                                                            ║
║  6 of 8 memories recovered                                 ║
║                                                            ║
║  Select a memory to view (1-6) or [q] to quit:            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### Storage

```json
// .onboardme/state/memory-logs.json
{
  "unlocked": [
    {
      "id": "log-1",
      "theme": "The Beginning",
      "unlockedAt": "2025-02-02T10:30:00Z",
      "trigger": "complete-todo-1"
    }
  ],
  "total": 8,
  "viewed": ["log-1", "log-2", "log-3"]
}
```

---

## Narrative Integration

### How Memories Build the Story

```
Memory #1: Hope (Clean start)
    ↓
Memory #2: First compromise (Good intentions)
    ↓
Memory #3: Accumulation (Debt grows)
    ↓
Memory #4: Abandonment (Original dev leaves)
    ↓
Memory #5: Awakening (Monster becomes self-aware)
    ↓
Memory #6: Hidden hope (Monster's secret wish)
    ↓
Memory #7: Regret (Original dev reflects)
    ↓
Memory #8: Ancient promise (Oldest TODO)
    ↓
BOSS BATTLE: Full understanding
```

**Arc:** Hope → Compromise → Decay → Abandonment → Awareness → Current state

---

## Monster's Reactions to Memories

### After Unlocking Memory

Monster should acknowledge the memory:

**Memory #1 (Hope):**
```
*gentle crackle*
"I was beautiful then, wasn't I?"
*pause*
"Before the shortcuts."
"Before the TODOs."
*drip*
"I miss being twelve lines."
```

**Memory #4 (Abandonment):**
```
*the static wavers*
"She didn't mean to abandon me."
*crackle*
"She had to move on."
*pause*
"They all do."
*drip*
"I'm the only one who stays."
```

---

## Related Documents

- [GAME-NARRATIVE.md](./GAME-NARRATIVE.md) — Overall story arc
- [MONSTER-VOICE.md](./MONSTER-VOICE.md) — Monster dialogue style
- [STATE-MANAGEMENT.md](../technical/STATE-MANAGEMENT.md) — Progress tracking

---

*Document Version: 1.0*  
*Last Updated: 2025-02-02*

*"Every codebase has a history. Every monster has a story."*
