# Monster ASCII Art Reference

Visual assets for the Spaghetti Code Monster that agents can render in markdown responses and artifact files.

---

## Monster Health States

Use these ASCII representations based on Monster's current health/mood state.

### 100% — Full Power (Dismissive)

```
            ╭───────────╮
    ~~~~~~~~│ { ◉\ /◉ } │~~~~~~~~
  ~~~~╱╱~~~~│    ~~~~   │~~~~╲╲~~~~
     ╱ │    ╰─────┬─────╯    │ ╲
    ╱ ╱│        ╱│││╲        │╲ ╲
   │ ╱ │       ╱ │││ ╲       │ ╲ │
   │╱  ╲╲     ╱ ╱│││╲ ╲     ╱╱  ╲│
        ╲╲   ╱ ╱ │││ ╲ ╲   ╱╱
```

**Visual notes:**
- Angry eyes (◉\ /◉)
- Maximum spaghetti tentacles overflowing
- Chaotic, imposing presence

---

### 75% — Concerned (Annoyed)

```
          ╭───────────╮
    ~~~~~~│ { ◉   ◉ } │~~~~~~
  ~~~~╱~~~│    ~~~    │~~~╲~~~~
     ╱    ╰─────┬─────╯    ╲
    ╱│        ╱│││╲        │╲
   │ │       ╱ │││ ╲       │ │
   │ ╲╲       ╱│││╲       ╱╱ │
      ╲╲       │││       ╱╱
```

**Visual notes:**
- Neutral eyes
- Slightly reduced spaghetti
- Still formidable

---

### 50% — Worried

```
        ╭───────────╮
    ~~~~│ { ◉   _ } │~~~~
   ~~╱~~│    ~~     │~~╲~~
     ╱  ╰─────┬─────╯  ╲
    │       ╱│││╲       │
    │        │││        │
     ╲       │││       ╱
```

**Visual notes:**
- One eye half-closed (_)
- Reduced spaghetti
- Shrinking presence

---

### 25% — Desperate

```
      ╭ ─ ─ ─ ─ ─ ─ ╮
   ~~ │ { x     _ } │ ~~
      │      ~      │
      ╰──────┬──────╯
            ╱│╲
            │││
```

**Visual notes:**
- Damaged eye (x)
- Broken lines in border
- Minimal spaghetti
- Fragile appearance

---

### 10% — Critical

```
      ╭  ─  ─  ─  ─  ╮
      │ { x     x }  │
      │              │
      ╰ ─ ─ ─┬─ ─ ─ ╯
             │
```

**Visual notes:**
- Both eyes damaged (x x)
- Very broken borders
- Almost no tentacles
- Near defeat

---

### 0% — Documented (Peaceful)

```
        ╭───────────╮
        │ { -   - } │
        │    __     │
        ╰───────────╯
```

**Visual notes:**
- Peaceful eyes (- -)
- Smiling (____)
- Clean lines, no spaghetti
- Completely calm

---

## With Speech Bubbles

### Standard Speech Bubble

```
 *kzzzt*
 
 ╭──────────────────────────────────────────╮
 │ "I've crashed more browsers than         │
 │  you've written functions."              │
 │                                 *hrrrrnn* │
 ╰─────────────────────┬────────────────────╯
                       │
            ╭───────────╮
    ~~~~~~~~│ { ◉   ◉ } │~~~~~~~~
  ~~~~╱╱~~~~│    ~~~~   │~~~~╲╲~~~~
     ╱ │    ╰─────┬─────╯    │ ╲
    ╱ ╱│        ╱│││╲        │╲ ╲
   │ ╱ │       ╱ │││ ╲       │ ╲ │
```

### Extended Dialogue

```
 *crackle*
 
 ╭──────────────────────────────────────────╮
 │ "I was beautiful once."                  │
 │                                          │
 │ *drip*                                   │
 │                                          │
 │ "Clean. Single-responsibility."          │
 │                                          │
 │ *tangle*                                 │
 │                                          │
 │ "Then came the edge cases."              │
 ╰─────────────────────┬────────────────────╯
                       │
        ╭───────────╮
    ~~~~│ { ◉   _ } │~~~~
   ~~╱~~│    ~~     │~~╲~~
     ╱  ╰─────┬─────╯  ╲
    │       ╱│││╲       │
```

---

## Health Bars

### Monster Health Bar

```
Monster Health: ████████████████████ 100%  "You cannot defeat me."
Monster Health: ███████████████░░░░░  75%  "Is that all you have?"
Monster Health: ██████████░░░░░░░░░░  50%  "You... are stronger than I thought."
Monster Health: █████░░░░░░░░░░░░░░░  25%  "No... this cannot be!"
Monster Health: ██░░░░░░░░░░░░░░░░░░  10%  "IMPOSSIBLE!"
Monster Health: ░░░░░░░░░░░░░░░░░░░░   0%  "I'm... documented."
```

### Alternative: Technical Debt Framing

```
Technical Debt: ████████████████████ 100%  [UNMANAGEABLE]
Technical Debt: ███████████████░░░░░  75%  [SEVERE]
Technical Debt: ██████████░░░░░░░░░░  50%  [MODERATE]
Technical Debt: █████░░░░░░░░░░░░░░░  25%  [MANAGEABLE]
Technical Debt: ██░░░░░░░░░░░░░░░░░░  10%  [MINIMAL]
Technical Debt: ░░░░░░░░░░░░░░░░░░░░   0%  [DOCUMENTED]
```

### Player Progress Bar

```
Your Progress:  ░░░░░░░░░░░░░░░░░░░░   0%
Your Progress:  █████░░░░░░░░░░░░░░░  25%
Your Progress:  ██████████░░░░░░░░░░  50%
Your Progress:  ███████████████░░░░░  75%
Your Progress:  ████████████████████ 100%  ★ COMPLETE ★
```

### Commits Earned

```
Commits Earned: ██████░░░░░░░░░░░░░░  32/100
```

---

## Status Badges

Use these in artifact files:

```
✅ CONFIRMED    — Evidence accepted
⏳ PENDING      — Awaiting answer
❌ REJECTED     — Evidence disputed
🔍 IN PROGRESS  — Investigation ongoing
📊 COMPLETE     — Section finished
🏆 VICTORY      — Game won
💀 DEFEATED     — Out of retries
🔄 RETRY        — Try again
```

---

## Victory Card

```
╔══════════════════════════════════════════════════════════════╗
║  @[player_name] has DOCUMENTED the Spaghetti Code Monster    ║
║  at [project-name]                                           ║
║                                                              ║
║  Monster Age: [X] years | TODOs: [N] | Score: [S]           ║
║  Time: [T] min | Accuracy: [A]%                              ║
║                                                              ║
║  "I'm not defeated. I'm documented." — The Monster           ║
║                                                              ║
║  #OnboardMe #TechnicalDebtSlayer                             ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Signal Tags

Visual markers for Monster transmission states:

```
*[SIGNAL LOST]*
*[CARRIER LOST]*
*[DISCONNECTED]*
*[TRANSMISSION ENDED]*
*[DOCUMENTED]*
*[HINT DEPLOYED]*
*[EVIDENCE LOGGED]*
*[INVESTIGATION BEGINS]*
*[BOSS BATTLE INITIATED]*
*[IMPRESSED — BUT DON'T TELL ANYONE]*
*[GRUDGING APPROVAL GRANTED]*
*[RELEVANCE RESTORED]*
*[HOTFIX DEPLOYED]*
*[BUG SQUASHED]*
```

---

## Design Philosophy

When rendering the Monster in responses:

1. **Match health to mood** — Use the appropriate ASCII state
2. **Sound effects precede dialogue** — Always start with *kzzzt* or similar
3. **End with signal tag** — Close transmissions with bracketed status
4. **Spaghetti = chaos** — More spaghetti tentacles = more chaotic/powerful
5. **Clean = peaceful** — Documented Monster has no spaghetti, clean lines

---

## Usage Examples

### In Chat Response

```
*crackle*

"You found the database config."

*pause*

        ╭───────────╮
    ~~~~│ { ◉   ◉ } │~~~~
   ~~╱~~│    ~~     │~~╲~~
     ╱  ╰─────┬─────╯  ╲

"PostgreSQL. Not bad."

*slrrrrp*

"Most people guess MongoDB because it sounds trendy."

*[EVIDENCE ACKNOWLEDGED]*
```

### In BOSS_BATTLE.md Artifact

```markdown
## Battle Status

Monster Health: ██████████░░░░░░░░░░ 50%

        ╭───────────╮
    ~~~~│ { ◉   _ } │~~~~
   ~~╱~~│    ~~     │~~╲~~
     ╱  ╰─────┬─────╯  ╲

**Current Phase:** Dependency Tangle
**Retries Remaining:** 3

_"You're doing better than expected. I hate that."_
```

---

_Document Version: 1.0_
_Last Updated: 2026-02-05_
