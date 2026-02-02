# Text Rendering Engine Specifications

> **Make text feel alive. Variable typing speeds create atmosphere.**

This document specifies text animation and rendering behaviors that transform static text into an atmospheric experience.

---

## Core Principle

> "A haunted codebase feels unstable. Text should reflect the Monster's emotional state."

Text rendering is not just display—it's performance. Speed, pauses, and effects communicate emotion and create immersion.

---

## Typing Speed Specifications

### Base Speeds

| Context | Speed (ms/char) | Purpose |
|---------|-----------------|---------|
| **Normal dialogue** | 30ms | Readable, conversational |
| **Sound effects** | 50ms | Slower, more atmospheric |
| **Descriptive text** | 40ms | Italicized scene-setting |
| **Fast/Angry** | 5-10ms | Aggressive, overwhelming |
| **Slow/Damaged** | 100ms | Struggling, weakened |
| **Dramatic pause** | Variable | Emphasis, tension |

### Monster Emotional States

| State | Typing Speed | Example |
|-------|--------------|---------|
| **Dismissive** (Early game) | 25ms | Quick, uninterested |
| **Annoyed** (TODO #1) | 20ms | Faster, sharper |
| **Worried** (TODO #2-3) | 35ms | Hesitant, broken rhythm |
| **Desperate** (TODO #5) | 15ms then 60ms | Fast bursts, slow pauses |
| **Defeated/Peaceful** (Victory) | 50ms | Slow, contemplative |
| **Glitching** (Boss critical) | Random 5-100ms | Unstable, erratic |

---

## Implementation Examples

### Normal Dialogue

```typescript
const normalSpeed = 30; // ms per character

async function typeText(text: string, speed: number = normalSpeed) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(speed);
  }
}
```

**Example:**
```
"You figured out the folder structure."
```
Each character appears at 30ms intervals (smooth, readable).

---

### Sound Effects (Slower)

```typescript
const soundSpeed = 50; // ms per character

await typeText("*kzzzt*", soundSpeed);
```

**Result:** `*kzzzt*` appears more deliberately, creating atmosphere.

---

### Angry/Fast Dialogue

```typescript
const angrySpeed = 5; // ms per character

await typeText("YOU TRACED THE DATA FLOW?!", angrySpeed);
```

**Result:** Text appears almost instantly, overwhelming the player.

---

### Damaged/Slow Dialogue

```typescript
const damagedSpeed = 100; // ms per character

await typeText("I'm... fading...", damagedSpeed);
```

**Result:** Each character struggles to appear, conveying weakness.

---

### Variable Speed (Dramatic)

```typescript
async function dramaticDialogue() {
  await typeText("I was beautiful once.", 40);
  await sleep(1000); // Pause
  await typeText("Clean.", 60);
  await sleep(500);
  await typeText("Single-responsibility.", 50);
  await sleep(1500); // Long pause
  await typeText("A simple function.", 40);
}
```

**Result:** Variable speeds and pauses create emotional weight.

---

## Pause Specifications

### Explicit Pauses

| Pause Type | Duration | When to Use |
|------------|----------|-------------|
| **Short** | 300-500ms | Between related thoughts |
| **Medium** | 800-1200ms | Between topics |
| **Long** | 1500-2000ms | Dramatic moments |
| **Very Long** | 2500-3000ms | Emotional processing |

### Pause Notation in Scripts

```
"You figured out the folder structure."
*pause*                                    ← 500ms
"Congratulations."
*long pause*                               ← 1500ms
"But you've only seen the SURFACE."
```

---

## Special Effects

### Glitch Effect (Boss Battle Critical)

```typescript
async function glitchText(text: string) {
  for (const char of text) {
    const randomSpeed = Math.random() * 95 + 5; // 5-100ms
    process.stdout.write(char);
    await sleep(randomSpeed);
    
    // Occasional character replacement
    if (Math.random() < 0.1) {
      process.stdout.write('\b'); // Backspace
      await sleep(50);
      const glitchChar = '█▓▒░'[Math.floor(Math.random() * 4)];
      process.stdout.write(glitchChar);
      await sleep(100);
      process.stdout.write('\b'); // Backspace
      process.stdout.write(char); // Correct character
    }
  }
}
```

**Example:**
```
"I AM undocument̷̰̏able"
```
Some characters flicker or glitch briefly.

---

### Fade In Effect

```typescript
async function fadeIn(text: string) {
  const colors = ['\x1b[90m', '\x1b[37m', '\x1b[97m']; // dim → normal → bright
  
  for (let i = 0; i < colors.length; i++) {
    process.stdout.write('\r' + colors[i] + text);
    await sleep(200);
  }
  process.stdout.write('\x1b[0m'); // Reset
}
```

**Result:** Text appears gradually, brightening over time.

---

### Fade Out Effect

```typescript
async function fadeOut(text: string) {
  const colors = ['\x1b[97m', '\x1b[37m', '\x1b[90m', '\x1b[30m']; // bright → dim → invisible
  
  for (let i = 0; i < colors.length; i++) {
    process.stdout.write('\r' + colors[i] + text);
    await sleep(200);
  }
  process.stdout.write('\r' + ' '.repeat(text.length) + '\r'); // Clear
}
```

**Result:** Text gradually fades away.

---

## Context-Specific Rendering

### Cold Open

```typescript
await typeText("*kzzzt*", 50);
await sleep(300);
await typeText("\n*the static resolves into something like a voice*", 40);
await sleep(2000); // Long pause for atmosphere
await typeText('\n"Oh."', 30);
await sleep(1000);
await typeText('\n"A new one."', 30);
```

**Total timing:** ~17 seconds (as specified in COLD-OPEN.md)

---

### Monster Watching Indicators

```typescript
// Quick, non-intrusive
await fadeIn("*kzzzt* \"I've seen faster type inference...\" *kzzzt*");
await sleep(3000); // Display for 3 seconds
await fadeOut("*kzzzt* \"I've seen faster type inference...\" *kzzzt*");
```

**Result:** Indicator appears and disappears smoothly without jarring the player.

---

### Boss Battle Dialogue

```typescript
// Intense, fast
await typeText("*MASSIVE STATIC SURGE*", 10); // Very fast
await sleep(500);
await typeText("\n\"NO!\"", 5); // Extremely fast
await sleep(300);
await typeText("\n*CRACKLE*", 10);
await sleep(200);
await typeText("\n\"NO NO NO.\"", 5);
```

**Result:** Overwhelming, intense, conveys desperation.

---

### Victory Ending

```typescript
// Slow, peaceful
await typeText("*the static... softens*", 60);
await sleep(1500);
await typeText("\n*gentle hum*", 70);
await sleep(2000);
await typeText("\n\"I'm not defeated. I'm... documented.\"", 50);
await sleep(2500); // Long contemplative pause
```

**Result:** Slow, peaceful, gives time for emotional processing.

---

## Performance Considerations

### Skippable Typing

Players should be able to skip typing animations:

```typescript
let skipTyping = false;

process.stdin.on('keypress', (str, key) => {
  if (key.name === 'space' || key.name === 'return') {
    skipTyping = true;
  }
});

async function typeText(text: string, speed: number) {
  if (skipTyping) {
    process.stdout.write(text);
    skipTyping = false; // Reset for next text
    return;
  }
  
  for (const char of text) {
    if (skipTyping) {
      process.stdout.write(text.slice(text.indexOf(char)));
      skipTyping = false;
      return;
    }
    process.stdout.write(char);
    await sleep(speed);
  }
}
```

**UX:** Press space/enter to instantly complete current text block.

---

### Instant Mode (Accessibility)

For players who prefer instant text:

```typescript
const config = {
  instantText: false, // Set to true to disable all typing animations
};

async function typeText(text: string, speed: number) {
  if (config.instantText) {
    process.stdout.write(text);
    return;
  }
  // ... normal typing logic
}
```

**Configuration:** `onboardme config set instant-text true`

---

## Color and Styling

### Monster Text Colors

| Element | Color Code | Purpose |
|---------|-----------|---------|
| Monster dialogue | `\x1b[35m` (Magenta) | Distinct from normal text |
| Sound effects | `\x1b[90m` (Dim gray) | Atmospheric, not distracting |
| Descriptive text | `\x1b[90m` (Dim gray) | Scene-setting |
| System messages | `\x1b[36m` (Cyan) | Game status |
| Player choices | `\x1b[97m` (Bright white) | Emphasis |

### Example with Color

```typescript
await typeText("\x1b[35m\"I'm not deprecated. I'm CLASSIC.\"\x1b[0m", 30);
```

**Result:** Dialogue appears in magenta, then resets to default color.

---

## Testing Guidelines

### Timing Tests

```typescript
// Test: Normal dialogue should take ~1 second per 33 characters
const testText = "This is exactly thirty-three!";
const startTime = Date.now();
await typeText(testText, 30);
const elapsed = Date.now() - startTime;
assert(elapsed >= 990 && elapsed <= 1100); // Allow 10% variance
```

### Readability Tests

- **Too fast:** < 10ms/char (unreadable)
- **Too slow:** > 100ms/char (boring, except for dramatic effect)
- **Optimal:** 25-40ms/char for most dialogue

---

## Related Documents

- [MONSTER-VOICE.md](../narrative/MONSTER-VOICE.md) — Dialogue style and pacing
- [COLD-OPEN.md](../narrative/COLD-OPEN.md) — Timing specifications for intro
- [PACING-GUIDE.md](../narrative/PACING-GUIDE.md) — Overall emotional pacing
- [GLITCH-SYSTEM.md](../visuals/GLITCH-SYSTEM.md) — Visual corruption effects

---

*Document Version: 1.0*  
*Last Updated: 2025-02-02*

*"Text is not just information. It's performance."*
