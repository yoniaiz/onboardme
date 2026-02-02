# Animations & Effects

## Animation Libraries

| Library | Use Case |
|---------|----------|
| **terminal-canvas** | Advanced animations, canvas-like API |
| **ora** | Spinners during loading |
| **cli-spinners** | More spinner styles |
| **log-update** | Updating single line (timers, progress) |

## Animation Ideas

- Health bar depleting with smooth animation
- XP counter rolling up like a slot machine
- Screen shake on wrong answer (shift text briefly)
- Typewriter effect for Monster dialogue
- Glitch effect when boss takes damage

## Damage Flash Effect

When Monster takes damage:
1. Screen briefly inverts colors (50ms)
2. Monster ASCII art "shakes" (offset left-right)
3. Health bar smoothly animates down
4. Damage number floats up: `-15 DMG`

## Level Transitions

```
Current screen fades/dissolves
↓
Black screen with level name typing out
↓
"LEVEL 3: cat ./deep-dive"
↓
Brief description fades in
↓
New level screen builds in piece by piece
```
