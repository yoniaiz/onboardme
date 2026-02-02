# Animations & Effects

> **Subtle, purposeful animations.** No gimmicks.

## Animation Libraries

| Library | Use Case | Status |
|---------|----------|--------|
| **ora** | Spinners during loading | Required |
| **log-update** | Single-line updates (timers, progress) | Required |
| **cli-spinners** | Spinner patterns (used by ora) | Required |

**Skip these:**
- ~~terminal-canvas~~ — overkill for our needs
- ~~chalk-animation~~ — too gimmicky

---

## Approved Animations

| Animation | When | Priority |
|-----------|------|----------|
| Typewriter text | Monster dialogue | P1 |
| Progress bar smooth | Health/progress changes | P1 |
| Screen shake | Wrong answer (subtle, optional) | P2 |
| Damage number float | Boss battle hits | P2 |

---

## Animation Specifications

### Typewriter Effect (Monster Dialogue)

```typescript
// Duration: ~30ms per character
const TYPEWRITER_DELAY = 30;

async function typewrite(text: string) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(TYPEWRITER_DELAY);
  }
}
```

### Health Bar Animation

```typescript
// Duration: 300ms total
// Easing: ease-out (fast start, slow end)
const HEALTH_ANIMATION_MS = 300;
const FRAMES = 10;

// Animate from oldHealth to newHealth over 10 frames
```

### Screen Shake (Optional)

```typescript
// Duration: 100ms total (~16ms per frame)
// Use sparingly — wrong answers only

const shakeFrames = [
  { x: 0, y: 0 },   // Start
  { x: -1, y: 0 },  // Left
  { x: 1, y: 0 },   // Right
  { x: -1, y: 0 },  // Left
  { x: 1, y: 0 },   // Right
  { x: 0, y: 0 },   // End
];

const SHAKE_FRAME_MS = 16;
```

### Damage Number Float

```typescript
// Duration: 500ms
// Movement: Float up 2 lines, fade out

const DAMAGE_ANIMATION_MS = 500;
// Frame 1 (0-100ms): Show "-15 DMG" at position
// Frame 2 (100-300ms): Move up 1 line
// Frame 3 (300-500ms): Move up 1 more line, fade to muted color
// Frame 4: Remove
```

---

## Loading States

### Spinner (During AI Calls)

```typescript
import ora from 'ora';

const spinner = ora({
  text: 'Analyzing codebase...',
  spinner: 'dots',  // Use 'dots' consistently
}).start();

// Later
spinner.succeed('Analysis complete');
// or
spinner.fail('Analysis failed');
```

### Loading Screen

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║                        COMPILING KNOWLEDGE...                        ║
║                                                                      ║
║                              ⠋                                       ║
║                                                                      ║
║                    Analyzing codebase structure                      ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

Spinner characters (braille): `⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏`

---

## Transitions

### TODO Completion

1. Show completion message (500ms)
2. Clear screen
3. Show TODO resolved stamp
4. Typewrite Monster reaction
5. Continue prompt

### Phase Transition (Boss Battle)

1. Flash screen briefly (50ms)
2. Clear current phase
3. Show "PHASE 2" header
4. Typewrite Monster dialogue
5. Resume battle

---

## Don'ts

- Don't use rainbow/pulse/glitch effects
- Don't animate everything — be selective
- Don't block input during animations
- Don't use animations longer than 500ms
- Don't use rapid flashing (epilepsy risk)

---

*See also: [VISUAL-STYLE-GUIDE.md](./VISUAL-STYLE-GUIDE.md) | [JUICE-FEEDBACK.md](./JUICE-FEEDBACK.md)*
