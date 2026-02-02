# Visual Style Guide

> **Consistency is more important than complexity.**

This guide ensures all games and screens share a unified visual language.

---

## Box Drawing Characters

Use consistent box styles across all screens:

| Context | Style | Characters |
|---------|-------|------------|
| **Main frame** | Double line | `╔ ═ ╗ ║ ╚ ╝` |
| **Inner panels** | Single line | `┌ ─ ┐ │ └ ┘` |
| **Rounded panels** | Rounded | `╭ ─ ╮ │ ╰ ╯` |
| **Highlights** | Heavy line | `┏ ━ ┓ ┃ ┗ ┛` |

### Standard Screen Frame

```
╔═══════════════════════════════════════════════════════════════════╗
║  [game-name]                                    [context-info]    ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Content goes here...                                             ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Inner Panel

```
  ┌─────────────────────────────────────────────────────────────┐
  │  Panel content                                              │
  └─────────────────────────────────────────────────────────────┘
```

### Speech Bubble (Monster Dialogue)

```
 ╭────────────────────────────────────╮
 │ "Dialogue text goes here."        │
 ╰──────────────────┬─────────────────╯
                    │
```

---

## Emoji Usage

**Restraint is key.** Emojis should enhance, not clutter.

| Context | Rule |
|---------|------|
| **Section headers** | 1 emoji max (optional) |
| **Progress indicators** | ASCII only: `●`, `○`, `■`, `□` |
| **Streak indicators** | ASCII only: `●●●○○` |
| **Celebrations** | Multiple allowed (victory screens only) |
| **In-game content** | Avoid — use ASCII symbols |

### Allowed Section Emojis

- `🎯` Target/mission
- `📋` List/tasks
- `🔍` Investigation
- `✓` or `✗` Correct/wrong (prefer ASCII)

---

## Progress Indicators

### Health/Integrity Bars

```
Monster Integrity: [████████████░░░░░░░░] 60%
```

### Progress (Numeric)

```
Progress: 3/5 ███░░
```

### Streak Indicators

```
Streak: ●●●○○
```

### Timer

```
⏱️ 0:45   or   Time: 0:45
```

### Retries/Shields

```
Retries: ■ ■ ■ □ □
```

---

## Header Patterns

### Game Screen Header

```
╔═══════════════════════════════════════════════════════════════════╗
║  docs --speedread                                    ⏱️ 02:47     ║
╠═══════════════════════════════════════════════════════════════════╣
```

### Boss Battle Header

```
╔═══════════════════════════════════════════════════════════════════╗
║  FIXME: The Spaghetti Code Monster                 Phase 1 of 3  ║
╠═══════════════════════════════════════════════════════════════════╣
```

### Completion Header

```
╔═══════════════════════════════════════════════════════════════════╗
║  docs --speedread                                     COMPLETE    ║
╠═══════════════════════════════════════════════════════════════════╣
```

---

## Footer Patterns

### Standard Footer

```
║                                                                   ║
║  [ENTER] Continue                                                 ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Game Status Footer

```
║                                                                   ║
║  ⏱️ 0:24                          Streak: ●●●○○  Retries: ■ ■ ■ □ ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## Feedback Messages

### Correct Answer

```
  ┌─────────────────────────────────────┐
  │  ✓ CORRECT                          │
  │                                     │
  │  +15 commits                        │
  └─────────────────────────────────────┘
```

### Wrong Answer

```
  ┌─────────────────────────────────────┐
  │  ✗ BUILD FAILED                     │
  │                                     │
  │  Expected: UserService              │
  │  Received: AuthService              │
  └─────────────────────────────────────┘
```

---

## Spacing & Alignment

- **Outer padding:** 1 space inside frame edges
- **Section gaps:** 1 blank line between sections
- **Text alignment:** Left-aligned by default
- **Numbers:** Right-aligned in tables

---

## Don'ts

- Don't mix box styles within the same frame
- Don't use more than 2 box nesting levels
- Don't use emojis in running game content
- Don't use gradients except victory screen
- Don't use animation effects like rainbow/glitch

---

*See also: [COLORS.md](./COLORS.md) | [TYPOGRAPHY.md](./TYPOGRAPHY.md) | [ANIMATIONS.md](./ANIMATIONS.md)*
