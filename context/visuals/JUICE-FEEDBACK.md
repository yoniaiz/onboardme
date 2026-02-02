# Juice & Feedback Design

> **"Game feel" is the #1 factor that makes interactions satisfying.**

This document defines the feedback systems that make OnboardMe feel responsive, rewarding, and alive.

---

## Core Principle

```
Player Input → Immediate Response (<100ms) → Visual/Audio Feedback → Emotional Satisfaction → More Input
```

Every interaction needs satisfying feedback. No silent successes, no invisible failures.

---

## 1. Correct Answer Feedback

When player answers correctly:

| Element | Specification |
|---------|--------------|
| Screen flash | Green tint, 50ms duration |
| Points animation | "+X commits" floats up and fades |
| Sound | Satisfying terminal beep/ding |
| Progress bar | Animates with easing curve (not instant jump) |
| Monster reaction | Flinches during boss battle |

```
┌─────────────────────────────────────────┐
│                                         │
│            ✓ CORRECT                    │
│                                         │
│         +15 commits ↑                   │
│                                         │
│  [████████████░░░░░░░░] 60%            │
│                                         │
└─────────────────────────────────────────┘
```

---

## 2. Wrong Answer Feedback

When player answers incorrectly:

| Element | Specification |
|---------|--------------|
| Screen shake | Small horizontal offset, 100ms |
| Flash | Red tint on answer area only |
| Text | "Build failed" with error aesthetic |
| Retry counter | Decrements with visual weight (shrink + bounce) |
| Monster reaction | Laughs/taunts (boss battle only) |

```
┌─────────────────────────────────────────┐
│                                         │
│     ✗ BUILD FAILED                      │
│                                         │
│     Expected: UserService               │
│     Received: AuthService               │
│                                         │
│     Retries: ■ ■ ■ □ □                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 3. Time Pressure Feedback

For timed challenges:

| Time Remaining | Visual | Audio |
|----------------|--------|-------|
| > 50% | Green timer, normal | None |
| 25-50% | Yellow timer, subtle pulse | None |
| 10-25% | Orange timer, faster pulse | Optional tick |
| < 10% | Red timer, shake | Heartbeat sound |
| < 5 sec | Red + flash, text shakes | Urgent heartbeat |

```
Normal:    ⏱️ 0:45
Warning:   ⏱️ 0:15  (pulsing)
Critical:  ⏱️ 0:05  (shaking, red)
```

---

## 4. Completion Celebration

When completing a game/TODO:

| Element | Specification |
|---------|--------------|
| Animation | ASCII confetti or celebration |
| Stamp | "TODO RESOLVED" with stamp effect |
| Stats | Dramatic reveal (one by one) |
| **Silence** | **2-5 seconds of quiet (see below)** |
| Monster | Dialogue with typing effect |
| Knowledge | "File appearing" animation |

### Valley Moment (Critical)

After stats reveal and before Monster appears, include a **valley moment** for emotional pacing:

1. **Silence** (2-5 seconds depending on TODO)
   - No dialogue
   - No sound effects
   - Minimal UI (just stats visible)
   - Optional ambient presence indicator (30% chance)

2. **Ambient Presence** (if triggered)
   ```
   *drip...*
   ```
   or
   ```
   *distant crackle*
   ```
   - Appears in muted corner
   - Fades in slowly (500ms)
   - Stays 2-3 seconds
   - Fades out slowly (500ms)

3. **Monster Entry** (after silence)
   - Slower, more contemplative entry
   - `*the static returns*` (1-2 seconds)
   - Then normal Monster dialogue

**Purpose:** Lets players process their accomplishment before the next peak. See [PACING-GUIDE.md](../narrative/PACING-GUIDE.md) for full specifications.

```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     ████████╗ ██████╗ ██████╗  ██████╗               ║
║     ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗              ║
║        ██║   ██║   ██║██║  ██║██║   ██║              ║
║        ██║   ██║   ██║██║  ██║██║   ██║              ║
║        ██║   ╚██████╔╝██████╔╝╚██████╔╝              ║
║        ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝               ║
║                                                       ║
║                   [RESOLVED]                          ║
║                                                       ║
║     Accuracy: 87%                                     ║
║     Time: 4:32                                        ║
║     Commits earned: +127                              ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

---

## 5. Monster Watching Indicators

Subtle reminders the Monster is present during gameplay. Each indicator includes Monster sound effects for atmosphere.

### Two Types of Monster Presence

| Type | Trigger | Content | Purpose |
|------|---------|---------|---------|
| **Watching Indicators** | Player idle 10+ seconds | Full dialogue | Encourage action |
| **Ambient Presence** | Random during active play | Sounds only | Maintain atmosphere |

### Watching Indicators (Idle 10+ seconds)

**Indicator Format:**
```
*[sound]* "[comment]" *[sound]*
```

**Indicator Library:**

**Impatience (10+ seconds idle):**
```
*tap tap tap* "...Still thinking?" *drip*
*kzzzt* "Take your time. I've got seven years of patience left." *kzzzt*
*whirrrr* "Processing... oh wait, that's you." *heh*
*crackle* "The timeout for this isn't infinite, you know." *crackle*
```

**Mocking (player struggling):**
```
*kzzzt* "I've seen faster type inference..." *kzzzt*
*slrrrrp* "Even my deprecated methods work faster." *CLICK*
*static* "This is giving 'undefined is not a function' energy." *heh*
*tangle* "The intern got this one on the first try." *pause* "Just saying." *slrrrrp*
```

**Creepy (atmosphere building):**
```
*drip... drip...* "I'm not going anywhere." *slrrrrp*
*creak* "The code watches. I watch. Same thing." *creak*
*hummmmm* "Every keystroke echoes in here." *hummmmm*
*static* "I can hear you thinking. It's... slow." *kzzzt*
```

**Observational (player exploring):**
```
*kzzzt* "Interesting approach. Wrong, but interesting." *kzzzt*
*whirrrr* "Is that... is that how you indent?" *static spike*
*crackle* "I've seen interns debug faster. In COBOL." *crackle*
*slrrrrp* "You're getting warmer. Or colder. I forget which is good." *heh*
```

**Boss Battle Specific:**
```
*KZZZT* "Is that all you've got?" *HRRRRNN*
*tangle tangle* "I've survived twelve refactoring attempts." *crackle*
*static spike* "The last engineer who got this far..." *pause* "...nevermind." *slrrrrp*
*creak* "Even if you win, who maintains me after you leave?" *drip*
```

**Display Rules:**
- Appear after 10+ seconds of no input
- Fade in slowly (not jarring)
- Different message each time (no repeats until all shown)
- Never block gameplay
- Sound effects displayed with italics styling
- Monster attribution shown subtly: `— The Monster`

**Visual Styling:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   *kzzzt* "I've seen faster type inference..." *kzzzt*     │
│                                          — The Monster      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Ambient Presence (Active Play)

**New feature:** Continuous atmospheric reminders during active gameplay.

**Purpose:** Maintain Monster presence without interrupting flow.

**Ambient Sound Library:**
```
*drip...*
*distant crackle*
*whirrrr (fading)*
*static... barely audible*
*creak*
*hummmmm*
```

**Display Specifications:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [MAIN GAME CONTENT - QUESTION, TIMER, ETC.]              │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                                              *drip...*      │
└─────────────────────────────────────────────────────────────┘
```

**Visual Rules:**
- **Placement:** Bottom-right corner
- **Color:** Dim gray (muted, not distracting)
- **Animation:** 
  - Fade in: 500ms
  - Stay: 2-3 seconds
  - Fade out: 500ms
- **Frequency:** Every 30-60 seconds during active play
- **Limit:** Only one at a time
- **Never during:** Monster dialogue, critical moments (timer < 10s), valleys

**Frequency by Game Stage:**
- Early game (TODO #1-2): 40% chance, subtle sounds
- Mid game (TODO #3-4): 50% chance, mixed sounds
- Late game (TODO #5, Boss): 60% chance, intense sounds

**Valley-Specific Rules:**
- During 2-5 second silence: 30% chance of one appearance
- Reinforces Monster presence without breaking quiet moment

> **Full specifications:** See [MONSTER-VOICE.md](../narrative/MONSTER-VOICE.md) section 9

---

## 6. Streak Feedback

For consecutive correct answers:

| Streak | Visual | Bonus |
|--------|--------|-------|
| 2 | "2x" appears briefly | None |
| 3 | "3x STREAK" + glow | +5% bonus |
| 5 | "5x CLEAN COMMIT" + flash | +10% bonus |
| 10+ | "PERFECT RUN" + special effect | +25% bonus |

```
┌─────────────────────────────────────────┐
│                                         │
│     🔥 5x CLEAN COMMIT STREAK 🔥        │
│                                         │
│         Bonus: +10% commits             │
│                                         │
└─────────────────────────────────────────┘
```

---

## 7. Transition Effects

Between screens/phases:

| Transition | Effect |
|------------|--------|
| Game start | Terminal "boot" sequence |
| Question change | Slide left or fade |
| Phase change | Dramatic wipe + text |
| Boss entrance | Slow reveal, ASCII art builds |
| Victory | Bright flash → fade to stats |
| Defeat | Glitch effect → "core dumped" |

---

## 8. Damage Visualization (Boss Battle)

When Monster takes damage:

1. Screen briefly inverts colors (50ms)
2. Monster ASCII art "shakes" (offset left-right)
3. Health bar smoothly animates down
4. Damage number floats up: `-15 DMG`
5. Monster sprite shows cracks at lower health

```
Monster Integrity: [████████░░░░░░░░░░░░] 40%
                          ↑
                      -15 DMG
```

---

## 9. Audio Design (Optional)

All audio should be optional and off by default.

| Event | Sound Type |
|-------|-----------|
| Correct | Short "ding" or "blip" |
| Wrong | Low "buzz" or "error beep" |
| Timer warning | Subtle tick |
| Timer critical | Heartbeat pulse |
| Completion | Triumphant chord |
| Boss damage | Impact + crack |
| Victory | Celebration fanfare |
| Defeat | Descending tone + static |

---

## 10. Accessibility Considerations

- All feedback must work without sound (visual primary)
- Color-blind friendly: use shapes + text, not just color
- Screen shake should be subtle and optional
- Timing feedback should not rely solely on color changes

---

## Implementation Priority

1. **P0 (Must have):** Correct/wrong feedback, progress animations
2. **P1 (Should have):** Time pressure, completion celebration
3. **P2 (Nice to have):** Streaks, Monster watching, transitions
4. **P3 (Future):** Audio, advanced animations

---

*See also: [DESIGN-PHILOSOPHY.md](./DESIGN-PHILOSOPHY.md) | [ANIMATIONS.md](./ANIMATIONS.md) | [UI-COMPONENTS.md](./UI-COMPONENTS.md)*
