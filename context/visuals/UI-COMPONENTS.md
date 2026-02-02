# UI Components

## Boxes & Frames

| Library | Use Case |
|---------|----------|
| **boxen** | Simple boxed text |
| **cli-table3** | Data tables |
| **Custom box-drawing** | Game frames (see below) |

### Custom Box Characters for Game Feel

```
Single line:  ┌ ─ ┐ │ └ ┘
Double line:  ╔ ═ ╗ ║ ╚ ╝
Rounded:      ╭ ─ ╮ │ ╰ ╯
Heavy:        ┏ ━ ┓ ┃ ┗ ┛
Mixed:        ╓ ─ ╖ ║ ╙ ╜
```

## Progress Bars & Health Bars

### Health Bars with Character

```
GUARDIAN HEALTH:
Full:    [████████████████████] 100%  "You cannot defeat me."
75%:     [███████████████░░░░░] 75%   "Is that all you have?"
50%:     [██████████░░░░░░░░░░] 50%   "You... are stronger than I thought."
25%:     [█████░░░░░░░░░░░░░░░] 25%   "No... this cannot be!"
Critical:[██░░░░░░░░░░░░░░░░░░] 10%   "IMPOSSIBLE!"

YOUR SHIELDS:
Full:    🛡️ 🛡️ 🛡️ 🛡️ 🛡️
Damaged: 🛡️ 🛡️ 🛡️ 💔 💔
(ASCII): [■] [■] [■] [×] [×]
```

## Streak Indicators

### Streak Indicator Evolution

```
No streak:     ○ ○ ○ ○ ○
Streak 1:      ● ○ ○ ○ ○
Streak 3:      ● ● ● ○ ○  "Nice!"
Streak 5:      🔥 🔥 🔥 🔥 🔥  "ON FIRE!"
Streak 7+:     💀 💀 💀 💀 💀 💀 💀  "UNSTOPPABLE!"

(Or ASCII-only version)
Streak 5:      [*] [*] [*] [*] [*]  BLAZING!
```

## Timer Displays

### Timer Tension

```
Plenty of time:  ⏱️ 0:45  [████████████████████]  (green)
Getting close:   ⏱️ 0:15  [████████░░░░░░░░░░░░]  (yellow, pulsing)
Almost out:      ⏱️ 0:05  [██░░░░░░░░░░░░░░░░░░]  (red, flashing)
```
