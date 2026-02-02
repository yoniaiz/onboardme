# Cold Open: The First Encounter

> **The Monster's introduction before any gameplay begins.**

This document specifies the atmospheric introduction sequence that hooks players emotionally before they encounter any mechanics.

---

## Core Principle

> "Create curiosity before understanding. Let players meet the Monster before they understand the game."

The cold open serves three purposes:
1. **Emotional hook** — Intrigue before instruction
2. **Character introduction** — Monster's personality revealed through behavior, not exposition
3. **Atmosphere establishment** — Set the tone for the entire experience

---

## The Sequence

### Timing

The cold open appears **immediately after** `onboardme init` completes the codebase scan, **before** any TODO selection or game explanation.

```
onboardme init
  ↓
[Codebase scanning...]
  ↓
[COLD OPEN] ← You are here
  ↓
[Game introduction / TODO selection]
```

---

## Full Cold Open Script

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

---

## Timing Specifications

| Element | Duration | Notes |
|---------|----------|-------|
| `*kzzzt*` | 300ms | Initial static burst |
| Static resolution line | 2000ms | Slow reveal, builds tension |
| `"Oh."` | 500ms + 1000ms pause | Surprise, then consideration |
| `"A new one."` | 800ms + 800ms pause | Recognition, slightly ominous |
| `*processing sounds*` | 1200ms | Analyzing the player |
| `"Welcome to the codebase."` | 1000ms + 600ms pause | Formal, but unsettling |
| `*crackle*` | 400ms | Instability hint |
| Main revelation | 2500ms | Key character moment |
| `*slrrrrp*` | 600ms | Creepy presence |
| `"Everyone does. Eventually."` | 1500ms + 1000ms pause | Ominous foreshadowing |
| Fade whisper | 1500ms | Gradual disappearance |
| `"Good luck."` | 800ms + 500ms pause | Ambiguous - helpful or threatening? |
| `*[CONNECTION ESTABLISHED]*` | 500ms | System message style |

**Total duration:** ~17-18 seconds

---

## Visual Presentation

### Option A: Minimal (Recommended)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│   *kzzzt*                                                   │
│                                                             │
│   *the static resolves into something like a voice*        │
│                                                             │
│   "Oh."                                                     │
│                                                             │
│   "A new one."                                              │
│                                                             │
│   "Welcome to the codebase."                                │
│                                                             │
│   "I'm... well, you'll figure out what I am soon enough."  │
│                                                             │
│   "Everyone does. Eventually."                              │
│                                                             │
│   "Good luck."                                              │
│                                                             │
│   *[CONNECTION ESTABLISHED]*                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Option B: With Subtle Visual Effects

```
╔═════════════════════════════════════════════════════════════╗
║                                                             ║
║                    *kzzzt*                                  ║
║                                                             ║
║        *the static resolves into something like a voice*   ║
║                                                             ║
║                      "Oh."                                  ║
║                                                             ║
║                   "A new one."                              ║
║                                                             ║
║              *processing sounds*                            ║
║                                                             ║
║              "Welcome to the codebase."                     ║
║                                                             ║
║   "I'm... well, you'll figure out what I am soon enough."  ║
║                                                             ║
║              "Everyone does. Eventually."                   ║
║                                                             ║
║         *the static fades to a whisper*                     ║
║                                                             ║
║                   "Good luck."                              ║
║                                                             ║
║              *[CONNECTION ESTABLISHED]*                     ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝
```

---

## Typing Speed

Use **variable typing speed** to create atmosphere (see [RENDERING-ENGINE.md](../technical/RENDERING-ENGINE.md)):

- Sounds: 50ms/char
- Descriptive text (italics): 40ms/char
- Dialogue: 30ms/char
- Pauses: Explicit delays between elements

---

## Alternative Variations

For replay value, the cold open can have subtle variations while maintaining the core structure:

### Variation 1: Curious
```
*kzzzt*
"Interesting."
"Another engineer."
"Welcome to the codebase."
"I wonder how long you'll last."
```

### Variation 2: Weary
```
*kzzzt*
"Again?"
"How many of you are there?"
"Welcome to the codebase."
"Try not to break anything."
```

### Variation 3: Hopeful
```
*kzzzt*
"Oh."
"Maybe this time..."
"Welcome to the codebase."
"Maybe you'll be different."
```

**Implementation Note:** Use variation 1 (the main script) for first-time players. Variations 2-3 can appear on subsequent runs if the player re-initializes.

---

## Skip Option

**Important:** Players should be able to skip the cold open after seeing it once.

```
*kzzzt*

*the static resolves into something like a voice*

"Oh."

                                    [Press any key to skip]
```

- Skip option appears after 3 seconds
- Pressing any key immediately jumps to `*[CONNECTION ESTABLISHED]*`
- Skip preference can be saved in config

---

## Integration Points

### Before Cold Open
- Codebase scan completes
- Monster generation finishes
- Context is ready

### After Cold Open
- Brief pause (1 second)
- Transition to game introduction
- Display TODO list and game explanation

---

## Emotional Goals

What the player should feel:

1. **Curiosity** — "What is this voice?"
2. **Intrigue** — "What am I dealing with?"
3. **Slight unease** — "Is this... friendly?"
4. **Anticipation** — "I want to know more"

What the player should NOT feel:

- Confusion about what to do next (instructions come after)
- Boredom (keep it short and atmospheric)
- Fear (unsettling, not scary)

---

## Testing Checklist

- [ ] Timing feels natural (not too fast or slow)
- [ ] Pauses create dramatic effect
- [ ] Monster's personality comes through
- [ ] Players want to continue after seeing it
- [ ] Skip option works correctly
- [ ] Transitions smoothly to next screen

---

## Related Documents

- [MONSTER-VOICE.md](./MONSTER-VOICE.md) — Voice style guide
- [GAME-NARRATIVE.md](./GAME-NARRATIVE.md) — Full narrative arc
- [PACING-GUIDE.md](./PACING-GUIDE.md) — Emotional pacing throughout game
- [RENDERING-ENGINE.md](../technical/RENDERING-ENGINE.md) — Text animation specs

---

*Document Version: 1.0*  
*Last Updated: 2025-02-02*

*"The first impression is the only impression you get to make twice."*
