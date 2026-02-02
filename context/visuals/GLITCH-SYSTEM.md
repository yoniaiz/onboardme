# Visual Glitch System

> **Progressive decay. The Monster losing control should feel unstable visually.**

This document specifies visual corruption effects that escalate as the boss battle intensifies, creating atmosphere and conveying the Monster's deteriorating state.

---

## Core Principle

> "As the Monster weakens, reality itself becomes unstable."

Visual glitches serve three purposes:
1. **Atmosphere** — Create unsettling, unstable feeling
2. **Feedback** — Show Monster's state without explicit health bars
3. **Escalation** — Build tension as battle progresses

---

## Glitch Intensity Levels

| Monster State | Technical Debt | Glitch Level | Visual Effects |
|---------------|----------------|--------------|----------------|
| **Full Power** | 100-75% | None | Clean, stable display |
| **Concerned** | 74-50% | Light | Occasional character flicker |
| **Worried** | 49-25% | Medium | Frequent glitches, color bleeding |
| **Desperate** | 24-10% | Heavy | Constant instability, corruption |
| **Critical** | 9-1% | Extreme | Reality breaking down |

---

## Light Glitches (75-50% Debt)

### Occasional Character Corruption

**Frequency:** Every 10-15 seconds  
**Duration:** 100-200ms  
**Effect:** Single character briefly becomes corrupted

```
Normal:  "I've crashed more browsers than you've written functions."
Glitch:  "I've crashed more browsers than you've writt█n functions."
         (Brief flash, then returns to normal)
```

### Implementation

```typescript
async function lightGlitch(text: string) {
  const glitchChars = '█▓▒░';
  const randomIndex = Math.floor(Math.random() * text.length);
  const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
  
  // Replace one character briefly
  const glitched = text.slice(0, randomIndex) + glitchChar + text.slice(randomIndex + 1);
  process.stdout.write('\r' + glitched);
  await sleep(150);
  process.stdout.write('\r' + text); // Restore
}
```

---

## Medium Glitches (50-25% Debt)

### Box Character Corruption

**Frequency:** Every 5-8 seconds  
**Duration:** 300-500ms  
**Effect:** Box borders become corrupted

```
Normal:
╔════════════════════════════════════════╗
║  Monster Integrity: 40%                ║
╚════════════════════════════════════════╝

Glitched:
╔̷════════════════════════════════════════╗
║  Monster Integrity: 40%                ║
╚̷════════════════════════════════════════╝
```

### Color Bleeding

**Effect:** Colors leak between elements

```typescript
// Normal
console.log('\x1b[35mMonster dialogue\x1b[0m');

// Glitched
console.log('\x1b[35mMonster dialogue\x1b[31m\x1b[0m'); // Brief red flash
```

### Word Scrambling

**Frequency:** Every 8-12 seconds  
**Duration:** 200ms  
**Effect:** Brief word reordering

```
Normal:  "You're getting too close."
Glitch:  "You're close too getting." (brief)
Normal:  "You're getting too close."
```

---

## Heavy Glitches (25-10% Debt)

### Constant Flickering

**Frequency:** Continuous  
**Effect:** Text flickers between normal and corrupted states

```typescript
async function heavyGlitch(text: string) {
  const interval = setInterval(() => {
    if (Math.random() < 0.3) {
      // 30% chance each frame
      const corrupted = corruptText(text);
      process.stdout.write('\r' + corrupted);
      setTimeout(() => {
        process.stdout.write('\r' + text);
      }, 50);
    }
  }, 200);
  
  return () => clearInterval(interval); // Return cleanup function
}

function corruptText(text: string): string {
  return text.split('').map(char => {
    if (Math.random() < 0.2) {
      return '█▓▒░'[Math.floor(Math.random() * 4)];
    }
    return char;
  }).join('');
}
```

### Screen Shake

**Frequency:** Every 3-5 seconds  
**Duration:** 500ms  
**Effect:** Entire display shifts horizontally

```typescript
async function screenShake() {
  const originalContent = captureScreen();
  
  for (let i = 0; i < 5; i++) {
    const offset = (i % 2 === 0) ? 2 : -2;
    process.stdout.write(' '.repeat(Math.abs(offset)));
    process.stdout.write(originalContent);
    await sleep(100);
  }
  
  // Restore
  process.stdout.write('\r' + originalContent);
}
```

### Hex Code Intrusion

**Effect:** Random hex codes appear in text

```
Normal:  "I'm not defeated..."
Glitch:  "I'm not *0x4E4F* defeated..."
```

---

## Extreme Glitches (10-1% Debt)

### Reality Breakdown

**Frequency:** Continuous  
**Effect:** Multiple simultaneous glitches

```
╔̷═══*0x45*═════════════════════════════╗
║  M█nster Int▓grity: 5%     ░░░░      ║
╚̷═══════════════════════════════════════╝

"I AM un█̷o̵c̷u̶m̴e̶ṉ̴ṯ̶a̵ḇ̶ḻ̶ë̴"

*[ST█CK OV▓RFLOW]*
```

### Combining Diacritics

**Effect:** Text becomes heavily corrupted with combining characters

```
Normal:  "You can't document me"
Extreme: "Y̷o̵u̶ ̴c̶a̷n̵'̶t̴ ̷d̶o̵c̷u̶m̴e̶n̵t̷ ̵m̶e̷"
```

### Implementation

```typescript
function addCombiningMarks(text: string): string {
  const marks = ['\u0336', '\u0337', '\u0338']; // Combining marks
  return text.split('').map(char => {
    if (Math.random() < 0.6) {
      return char + marks[Math.floor(Math.random() * marks.length)];
    }
    return char;
  }).join('');
}
```

### Screen Inversion

**Frequency:** Every 2-3 seconds  
**Duration:** 100ms  
**Effect:** Colors invert briefly

```typescript
async function screenInvert() {
  process.stdout.write('\x1b[7m'); // Invert colors
  await sleep(100);
  process.stdout.write('\x1b[27m'); // Restore
}
```

---

## Special Glitch Moments

### On Correct Answer (Boss Battle)

**Trigger:** Player answers correctly  
**Effect:** Monster "takes damage" - reality glitches heavily

```typescript
async function damageGlitch() {
  // 1. Screen flash
  process.stdout.write('\x1b[7m'); // Invert
  await sleep(50);
  process.stdout.write('\x1b[27m'); // Restore
  
  // 2. Monster ASCII shakes
  await screenShake();
  
  // 3. Text corruption
  const monsterText = "AAAAaah!";
  for (let i = 0; i < 3; i++) {
    process.stdout.write('\r' + corruptText(monsterText));
    await sleep(100);
  }
  
  // 4. Brief static
  process.stdout.write('\r' + '█'.repeat(monsterText.length));
  await sleep(200);
  
  // 5. Restore
  process.stdout.write('\r' + monsterText);
}
```

### On Wrong Answer

**Trigger:** Player answers incorrectly  
**Effect:** Monster "laughs" - brief glitch

```typescript
async function mockingGlitch() {
  const text = "*heh*";
  
  // Brief color flash
  process.stdout.write('\x1b[31m' + text + '\x1b[0m'); // Red
  await sleep(100);
  process.stdout.write('\r\x1b[35m' + text + '\x1b[0m'); // Magenta (normal)
}
```

### Phase Transitions

**Trigger:** Moving between boss phases  
**Effect:** Major reality break

```typescript
async function phaseTransitionGlitch() {
  // 1. Everything corrupts
  const screen = captureScreen();
  process.stdout.write('\r' + corruptText(screen));
  await sleep(500);
  
  // 2. Static
  process.stdout.write('\r' + '█'.repeat(screen.length));
  await sleep(300);
  
  // 3. Slow restoration
  for (let i = 0; i < screen.length; i += 5) {
    process.stdout.write('\r' + screen.slice(0, i) + '█'.repeat(screen.length - i));
    await sleep(20);
  }
  
  // 4. Fully restored (new phase)
  process.stdout.write('\r' + screen);
}
```

---

## Glitch Timing

### Escalation Schedule

```
Technical Debt: 100% → 75%  (Phase 1 start)
  Glitches: None → Light
  Frequency: 0 → Every 15 seconds

Technical Debt: 75% → 50%   (Phase 1 end)
  Glitches: Light → Medium
  Frequency: Every 15s → Every 8s

Technical Debt: 50% → 25%   (Phase 2)
  Glitches: Medium → Heavy
  Frequency: Every 8s → Every 3s

Technical Debt: 25% → 10%   (Phase 3 start)
  Glitches: Heavy → Extreme
  Frequency: Every 3s → Continuous

Technical Debt: 10% → 0%    (Phase 3 end)
  Glitches: Extreme → Reality breakdown
  Frequency: Continuous + special effects
```

---

## Accessibility Considerations

### Photosensitivity Warning

Display before boss battle:

```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║  ⚠️  WARNING: VISUAL EFFECTS                           ║
║                                                        ║
║  The upcoming battle contains:                         ║
║  • Flashing text                                       ║
║  • Screen shake effects                                ║
║  • Rapid color changes                                 ║
║                                                        ║
║  Disable visual effects? (y/n)                         ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

### Reduced Motion Mode

```typescript
const config = {
  reducedMotion: false, // Set to true to disable glitches
};

async function applyGlitch() {
  if (config.reducedMotion) {
    // Use text-only indicators instead
    console.log("[GLITCH]");
    return;
  }
  // ... normal glitch logic
}
```

**Configuration:** `onboardme config set reduced-motion true`

---

## Performance Optimization

### Glitch Budget

- **Maximum simultaneous glitches:** 2
- **Minimum time between glitches:** 100ms
- **Maximum glitch duration:** 1 second
- **CPU usage target:** < 5% during glitches

### Efficient Corruption

```typescript
// Bad: Recreate entire screen each frame
function slowGlitch() {
  setInterval(() => {
    redrawEntireScreen();
  }, 100);
}

// Good: Only corrupt changed elements
function efficientGlitch() {
  const elementsToGlitch = identifyGlitchTargets();
  elementsToGlitch.forEach(element => {
    corruptElement(element);
  });
}
```

---

## Testing Guidelines

### Visual Tests

1. **Readability:** Text should remain readable even with glitches
2. **Performance:** No frame drops or stuttering
3. **Accessibility:** Reduced motion mode works correctly
4. **Escalation:** Glitches increase appropriately with debt reduction

### Edge Cases

- **Very fast answers:** Glitches don't overlap
- **Pause/resume:** Glitches reset correctly
- **Terminal resize:** Glitches adapt to new size

---

## Related Documents

- [RENDERING-ENGINE.md](../technical/RENDERING-ENGINE.md) — Text animation specs
- [GAME.md](../games/fixme-spaghetti-monster/GAME.md) — Boss battle mechanics
- [MONSTER-VOICE.md](../narrative/MONSTER-VOICE.md) — Glitch text in dialogue
- [ANIMATIONS.md](./ANIMATIONS.md) — Other animation specs

---

*Document Version: 1.0*  
*Last Updated: 2025-02-02*

*"Glitches are not bugs. They're features of a haunted codebase."*
