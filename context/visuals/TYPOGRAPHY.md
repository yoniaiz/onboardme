# Typography & Text Art

> **One font, used consistently.** Restraint over variety.

## Font Selection

Use **one figlet font** across the entire game for consistency:

| Context | Font | Example |
|---------|------|---------|
| **All headers** | `ANSI Shadow` | Title, TODO headers, victory, defeat, boss |

```typescript
import figlet from 'figlet';

// Standard header - use everywhere
const header = figlet.textSync('ONBOARDME', { font: 'ANSI Shadow' });
```

### Why ANSI Shadow?

- Clean, readable at terminal sizes
- Tech/retro aesthetic matches the game
- Works well with box-drawing frames
- Widely available in figlet

---

## Text Styling Libraries

| Library | Use Case | Status |
|---------|----------|--------|
| **figlet** | ASCII text headers | Required |
| **chalk** | Text colors | Required |
| **gradient-string** | Gradient text | Optional (victory screen only) |

**Skip these:**
- ~~chalk-animation~~ — too gimmicky
- ~~ascii-art~~ — deprecated
- ~~cfonts~~ — overkill, figlet is enough

---

## Usage Examples

### Standard Header

```typescript
import figlet from 'figlet';
import chalk from 'chalk';

// Green title
const title = figlet.textSync('TODO #1', { font: 'ANSI Shadow' });
console.log(chalk.hex('#00ff88')(title));
```

### Victory Screen (with optional gradient)

```typescript
import figlet from 'figlet';
import gradient from 'gradient-string';

// Victory with gradient (the ONE place it's allowed)
const victory = figlet.textSync('VICTORY', { font: 'ANSI Shadow' });
console.log(gradient.pastel.multiline(victory));
```

### Defeat Screen

```typescript
// Red for defeat
const defeat = figlet.textSync('SEGFAULT', { font: 'ANSI Shadow' });
console.log(chalk.hex('#ff6b6b')(defeat));
```

---

## Text Hierarchy

| Level | Style | Example |
|-------|-------|---------|
| **H1** | figlet ANSI Shadow | Game title, TODO headers |
| **H2** | UPPERCASE + box | Section titles |
| **H3** | Bold/bright | Sub-section titles |
| **Body** | Normal | Regular text |
| **Muted** | Dim/gray | Hints, secondary info |

---

## Monster ASCII Art

The Monster is **handcrafted**, not generated. See [fixme-spaghetti-monster/GAME-VISUALS.md](../games/fixme-spaghetti-monster/GAME-VISUALS.md) for the design.

---

*See also: [VISUAL-STYLE-GUIDE.md](./VISUAL-STYLE-GUIDE.md) | [COLORS.md](./COLORS.md)*
