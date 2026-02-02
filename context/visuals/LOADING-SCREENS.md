# Loading Screens as Worldbuilding

> **First impressions matter. Transform loading from waiting into storytelling.**

This document specifies atmospheric loading screens that establish mood and build anticipation rather than simply displaying "Loading..."

---

## Core Principle

> "Every moment is an opportunity for immersion. Loading screens are not downtime—they're stage-setting."

Loading screens should:
1. **Build atmosphere** — Set the tone for what's coming
2. **Provide context** — Show what's being discovered
3. **Hint at the Monster** — Foreshadow without revealing
4. **Feel alive** — Use animation and progressive reveals

---

## When Loading Screens Appear

| Moment | Duration | Purpose |
|--------|----------|---------|
| Initial scan (`onboardme init`) | 10-30 seconds | Analyze codebase, generate Monster |
| TODO initialization | 2-5 seconds | Load questions and context |
| Boss battle start | 3-5 seconds | Build tension |
| Knowledge unlock | 1-2 seconds | Brief transition |

---

## Loading Screen Types

### Type 1: Initial Codebase Scan

**Context:** First time running `onboardme init`

**Duration:** 10-30 seconds (actual scan time)

**Purpose:** Build anticipation for the Monster's first appearance

#### Design

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         EXCAVATING CODEBASE DEPTHS                         ║
║                                                            ║
║                    ⠋                                       ║
║                                                            ║
║   Scanning files...                          [████░░░] 67% ║
║                                                            ║
║   Discovered: 47 TODOs                                     ║
║   Detected: 3 circular dependencies                        ║
║   Warning: Magic numbers detected                          ║
║   Analyzing: src/services/legacy-handler.js                ║
║                                                            ║
║   *something stirs in the deepest module...*               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

#### Progressive Reveals

Information appears gradually, not all at once:

**0-3 seconds:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         EXCAVATING CODEBASE DEPTHS                         ║
║                                                            ║
║                    ⠋                                       ║
║                                                            ║
║   Scanning files...                          [█░░░░░░]  12% ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**3-8 seconds:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         EXCAVATING CODEBASE DEPTHS                         ║
║                                                            ║
║                    ⠙                                       ║
║                                                            ║
║   Scanning files...                          [███░░░░] 45% ║
║                                                            ║
║   Discovered: 47 TODOs                                     ║
║   Detected: 3 circular dependencies                        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**8-15 seconds:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         EXCAVATING CODEBASE DEPTHS                         ║
║                                                            ║
║                    ⠸                                       ║
║                                                            ║
║   Scanning files...                          [█████░░] 78% ║
║                                                            ║
║   Discovered: 47 TODOs                                     ║
║   Detected: 3 circular dependencies                        ║
║   Warning: Magic numbers detected                          ║
║   Analyzing: src/services/legacy-handler.js                ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**15+ seconds (if scan takes longer):**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         EXCAVATING CODEBASE DEPTHS                         ║
║                                                            ║
║                    ⠴                                       ║
║                                                            ║
║   Scanning files...                          [██████░] 92% ║
║                                                            ║
║   Discovered: 47 TODOs                                     ║
║   Detected: 3 circular dependencies                        ║
║   Warning: Magic numbers detected                          ║
║   Analyzing: src/services/legacy-handler.js                ║
║                                                            ║
║   *something stirs in the deepest module...*               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

#### Spinner Animation

Use Braille spinner for smooth animation:
```
⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏
```

Cycle every 80ms for smooth rotation.

#### Dynamic Content

**Discovered items** should reflect actual codebase analysis:

```typescript
// Examples of dynamic content
`Discovered: ${todoCount} TODOs`
`Detected: ${circularDeps} circular dependencies`
`Warning: ${magicNumbers} magic numbers detected`
`Analyzing: ${currentFile}`
`Found: ${oldestFile} (${yearsSinceCreation} years old)`
`Complexity: ${complexityScore}/100`
```

#### Atmospheric Hints

Final line (appears at 70%+ progress):

**Variations:**
- `*something stirs in the deepest module...*`
- `*ancient code awakens...*`
- `*the technical debt remembers...*`
- `*legacy systems never truly sleep...*`
- `*deprecated functions whisper in the dark...*`

---

### Type 2: Codebase Facts with Monster Commentary

**Context:** After scan completes, showing codebase statistics

**Duration:** 5-8 seconds

**Purpose:** Introduce Monster through environmental storytelling

#### Design

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   CODEBASE ANALYSIS COMPLETE                               ║
║                                                            ║
║   ────────────────────────────────────────────────────     ║
║                                                            ║
║   Oldest file: config.js (2019)                            ║
║      *kzzzt* "That's where I was born." *kzzzt*            ║
║                                                            ║
║   Total TODOs: 847                                         ║
║      *crackle* "My children." *slrrrrp*                    ║
║                                                            ║
║   Longest function: validateInputAndAuth (1,247 lines)     ║
║      *tangle* "My masterpiece." *heh*                      ║
║                                                            ║
║   ────────────────────────────────────────────────────     ║
║                                                            ║
║   Press any key to begin...                                ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

#### Progressive Reveal

Facts appear one at a time with pauses:

1. **Oldest file** (2 seconds)
2. Monster comment (1 second)
3. **Total TODOs** (2 seconds)
4. Monster comment (1 second)
5. **Longest function** (2 seconds)
6. Monster comment (1 second)
7. **Press any key** (wait for input)

#### Monster Commentary Variations

Based on actual codebase metrics:

**If codebase is old (5+ years):**
```
Oldest file: app.js (2017)
   *kzzzt* "I've been waiting a long time." *kzzzt*
```

**If many TODOs (500+):**
```
Total TODOs: 1,243
   *crackle* "So many promises. None kept." *drip*
```

**If huge function (500+ lines):**
```
Longest function: processEverything (2,891 lines)
   *tangle tangle* "Beautiful, isn't it?" *heh*
```

**If recent codebase (<2 years):**
```
Oldest file: index.ts (2024)
   *kzzzt* "Young. Fresh. Give me time." *slrrrrp*
```

---

### Type 3: TODO Initialization

**Context:** Loading a specific TODO's challenges

**Duration:** 2-5 seconds

**Purpose:** Build anticipation for upcoming challenges

#### Design

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   LOADING TODO #3: // trace data flows (URGENT)           │
│                                                            │
│   ⠋ Generating challenges...                              │
│                                                            │
│   *the Monster watches*                                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

#### Variations by TODO

**TODO #1:**
```
│   LOADING TODO #1: // understand what we have             │
│                                                            │
│   ⠋ Mapping the surface...                                │
│                                                            │
│   *something lurks beneath*                                │
```

**TODO #2:**
```
│   LOADING TODO #2: // figure out how to find things       │
│                                                            │
│   ⠙ Hiding the answers...                                 │
│                                                            │
│   *the Monster prepares*                                   │
```

**TODO #3:**
```
│   LOADING TODO #3: // trace data flows (URGENT)           │
│                                                            │
│   ⠸ Following the threads...                              │
│                                                            │
│   *you're getting close*                                   │
```

**TODO #4:**
```
│   LOADING TODO #4: // document why this works             │
│                                                            │
│   ⠴ Excavating lost knowledge...                          │
│                                                            │
│   *the truth is buried deep*                               │
```

**TODO #5:**
```
│   LOADING TODO #5: // learn how to deploy safely          │
│                                                            │
│   ⠦ Final preparations...                                 │
│                                                            │
│   *the end approaches*                                     │
```

---

### Type 4: Boss Battle Initialization

**Context:** Starting the FIXME boss battle

**Duration:** 3-5 seconds

**Purpose:** Maximum tension building

#### Design

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║                                                            ║
║              FIXME: // the monster itself                  ║
║                                                            ║
║                                                            ║
║                    ⠋                                       ║
║                                                            ║
║              *MASSIVE STATIC SURGE*                        ║
║                                                            ║
║              *the codebase trembles*                       ║
║                                                            ║
║              *something ancient awakens*                   ║
║                                                            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

#### Progressive Build

**0-1 second:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║                                                            ║
║              FIXME: // the monster itself                  ║
║                                                            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**1-2 seconds:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║                                                            ║
║              FIXME: // the monster itself                  ║
║                                                            ║
║                    ⠋                                       ║
║                                                            ║
║              *MASSIVE STATIC SURGE*                        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**2-3 seconds:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              FIXME: // the monster itself                  ║
║                                                            ║
║                    ⠙                                       ║
║                                                            ║
║              *MASSIVE STATIC SURGE*                        ║
║                                                            ║
║              *the codebase trembles*                       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

**3+ seconds:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║              FIXME: // the monster itself                  ║
║                                                            ║
║                    ⠸                                       ║
║                                                            ║
║              *MASSIVE STATIC SURGE*                        ║
║                                                            ║
║              *the codebase trembles*                       ║
║                                                            ║
║              *something ancient awakens*                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

### Type 5: Knowledge Unlock

**Context:** Unlocking documentation after correct answers

**Duration:** 1-2 seconds

**Purpose:** Brief, satisfying transition

#### Design

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   📄 KNOWLEDGE UNLOCKED                                    │
│                                                            │
│   Authentication Flow                                      │
│                                                            │
│   *the fog clears*                                         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Technical Specifications

### Colors

| Element | Color | Purpose |
|---------|-------|---------|
| Box borders | Cyan/Blue | Technical, clean |
| Title text | White/Bright | Emphasis |
| Progress bar (empty) | Dark gray | Background |
| Progress bar (filled) | Green | Progress |
| Percentage | Yellow | Highlight |
| Monster text | Red/Magenta | Ominous |
| Atmospheric hints | Dim gray | Subtle |

### Animation Timing

| Animation | Duration | Framerate |
|-----------|----------|-----------|
| Spinner rotation | 80ms/frame | 12.5 fps |
| Text fade-in | 300ms | Smooth |
| Progress bar fill | 100ms/% | Smooth |
| Line reveal | 500ms | Staggered |

### Progress Bar

Use block characters for clean look:
```
Empty:  ░░░░░░░░░░
Filled: ████░░░░░░
```

Animate smoothly, not in chunks.

---

## Implementation Guidelines

### DO:
- Show actual progress (not fake loading)
- Use real codebase data
- Maintain atmosphere consistently
- Keep text readable
- Provide skip option for repeat views

### DON'T:
- Show generic "Loading..." text
- Block indefinitely without indication
- Use overly technical jargon
- Make it feel like wasted time
- Overuse Monster commentary (subtle is better)

---

## Accessibility

- All loading screens must have text alternatives
- Progress must be indicated numerically (not just visually)
- Provide estimated time remaining for long operations
- Allow skipping of atmospheric elements (keep functional info)

---

## Related Documents

- [VISUAL-STYLE-GUIDE.md](./VISUAL-STYLE-GUIDE.md) — Overall visual design
- [UI-COMPONENTS.md](./UI-COMPONENTS.md) — Component specifications
- [MONSTER-VOICE.md](../narrative/MONSTER-VOICE.md) — Monster dialogue style
- [COLD-OPEN.md](../narrative/COLD-OPEN.md) — First encounter design

---

*Document Version: 1.0*  
*Last Updated: 2025-02-02*

*"Loading screens are not obstacles. They're overtures."*
