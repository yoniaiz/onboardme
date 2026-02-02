# Color Palette

> **Use the palette exactly.** No custom colors, no gradients (except victory).

## Theme Colors

```typescript
const theme = {
  // Primary colors
  primary: '#00ff88',      // Matrix green - success, correct
  secondary: '#00d4ff',    // Cyber blue - info, highlights
  accent: '#ff6b6b',       // Warning red - errors, damage
  gold: '#ffd700',         // Gold - achievements, XP
  
  // UI colors
  background: '#0a0a0a',   // Near black
  surface: '#1a1a2e',      // Slightly lighter
  border: '#16213e',       // Box borders
  text: '#e4e4e4',         // Main text
  muted: '#6b6b6b',        // Secondary text
  
  // Special effects (use sparingly)
  streak: ['#ff6b6b', '#ff8c42', '#ffd700', '#7fff00', '#00ff88'],
};
```

---

## Color Context Mapping

### Answer Feedback

| State | Color | Hex |
|-------|-------|-----|
| Correct | Matrix Green | `#00ff88` |
| Wrong | Warning Red | `#ff6b6b` |
| Partial credit | Gold | `#ffd700` |

### Timer States

| State | Color | Hex | Trigger |
|-------|-------|-----|---------|
| Plenty | Matrix Green | `#00ff88` | > 50% time |
| Warning | Gold | `#ffd700` | 25-50% time |
| Critical | Warning Red | `#ff6b6b` | < 25% time |

### Monster Health (Boss Battle)

| Integrity | Color | Hex | Note |
|-----------|-------|-----|------|
| 100-75% | Warning Red | `#ff6b6b` | Monster is strong |
| 75-50% | Orange | `#ff8c42` | Getting damaged |
| 50-25% | Gold | `#ffd700` | Significant damage |
| 25-0% | Matrix Green | `#00ff88` | Player winning |

### Monster Dialogue

| Mood | Color | Hex |
|------|-------|-----|
| Dismissive | Muted | `#6b6b6b` |
| Worried | Gold | `#ffd700` |
| Desperate | Warning Red | `#ff6b6b` |
| Defeated | Cyber Blue | `#00d4ff` |

### UI Elements

| Element | Color | Hex |
|---------|-------|-----|
| Default text | Text | `#e4e4e4` |
| Secondary text | Muted | `#6b6b6b` |
| Highlights | Cyber Blue | `#00d4ff` |
| Achievements | Gold | `#ffd700` |
| Commits/XP | Gold | `#ffd700` |

---

## Implementation

```typescript
import chalk from 'chalk';

const colors = {
  success: chalk.hex('#00ff88'),
  error: chalk.hex('#ff6b6b'),
  info: chalk.hex('#00d4ff'),
  gold: chalk.hex('#ffd700'),
  muted: chalk.hex('#6b6b6b'),
  text: chalk.hex('#e4e4e4'),
};

// Usage
console.log(colors.success('✓ CORRECT'));
console.log(colors.error('✗ BUILD FAILED'));
console.log(colors.gold('+15 commits'));
```

---

## Don'ts

- Don't use colors not in this palette
- Don't use gradients (except victory screen)
- Don't rely on color alone — always pair with symbols (✓, ✗, ⚠)
- Don't use rainbow effects

---

*See also: [VISUAL-STYLE-GUIDE.md](./VISUAL-STYLE-GUIDE.md) | [TYPOGRAPHY.md](./TYPOGRAPHY.md)*
