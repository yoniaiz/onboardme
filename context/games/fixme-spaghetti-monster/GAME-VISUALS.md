# FIXME: The Spaghetti Code Monster - Visuals

## Visual Design Notes

This is the boss battle. Visual elements should be **minimalistic but impactful**:

- **Monster ASCII art** — small, cute, but menacing
- **Health bar visualization** showing Monster Integrity
- **Phase transitions** with subtle effects
- **Damage animations** when Monster takes damage
- **Victory/defeat animations** for endings

## Monster Design — The Spaghetti Code Monster

A minimalistic design that communicates "code monster" through:
- `{ }` curly braces as the body frame
- `~~~~` wavy lines representing tangled spaghetti code
- `╱│││╲` tentacles/dependencies hanging below
- Visual degradation as health decreases

### Health States

**100% — Full Power**
```
     ╭─────────╮
     │ { ◉ ◉ } │
     │  ~~~~   │
     ╰────┬────╯
       ╱│││╲
```

**75% — Concerned**
```
     ╭─────────╮
     │ { ◉ ◉ } │
     │  ~~~    │
     ╰────┬────╯
       ╱││╲
```

**50% — Worried**
```
     ╭─────────╮
     │ { ◉ _ } │
     │  ~~     │
     ╰────┬────╯
       ╱│╲
```

**25% — Desperate**
```
     ╭ ─ ─ ─ ─╮
     │ { x _ } │
     │   ~     │
     ╰────┬────╯
        │
```

**10% — Critical**
```
     ╭  ─  ─  ╮
     │ { x x } │
     │         │
     ╰ ─ ─┬─ ─╯
```

**0% — Documented (Peaceful)**
```
     ╭─────────╮
     │ { - - } │
     │   __    │
     ╰─────────╯
```

### With Speech Bubble (Dialogue Display)

```
 *kzzzt*
 
 ╭────────────────────────────────────╮
 │ "I've crashed more browsers than   │
 │  you've written functions."        │
 │                              *hrrrrnn* │
 ╰──────────────────┬─────────────────╯
                    │
               ╭─────────╮
               │ { ◉ ◉ } │
               │  ~~~~   │
               ╰────┬────╯
                 ╱│││╲
```

### With Extended Dialogue (Multiple Lines)

```
 *crackle*
 
 ╭────────────────────────────────────╮
 │ "I was beautiful once."            │
 │                                    │
 │ *drip*                             │
 │                                    │
 │ "Clean. Single-responsibility."    │
 │                                    │
 │ *tangle*                           │
 │                                    │
 │ "Then came the edge cases."        │
 ╰──────────────────┬─────────────────╯
                    │
               ╭─────────╮
               │ { ◉ _ } │
               │  ~~     │
               ╰────┬────╯
                 ╱│╲
```

## Design Principles

- **Minimalistic** — small footprint, easy to render
- **Expressive** — conveys emotion through simple changes (eyes, tentacles)
- **Code-themed** — curly braces and squiggles = spaghetti code
- **Degradation** — visual "untangling" as it takes damage (fewer ~, fewer tentacles)

## Health Bars with Character

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

## Damage Flash

When Monster takes damage:
1. Screen briefly inverts colors (50ms)
2. Monster ASCII art "shakes" (offset left-right)
3. Health bar smoothly animates down
4. Damage number floats up: `-15 DMG`

## Visual Examples

### Boss Battle Screen
See Appendix B in PRD.md for a detailed example of the boss battle screen layout, including:
- Monster name and health display
- Phase indicator
- Streak multiplier display
- Question presentation
- Timer display

### Title Screen
See the PRD's Visual & Aesthetic Direction section for title screen examples.

### Victory Animation
See the PRD's Visual & Aesthetic Direction section for victory animation examples.

Visuals for this game should follow the overall aesthetic direction outlined in the PRD's Visual & Aesthetic Direction section, emphasizing:
- Retro-futuristic terminal aesthetic
- Juicy feedback for all actions
- Professional fun (cool, not cute)
- Dramatic, impactful presentation befitting a final boss
