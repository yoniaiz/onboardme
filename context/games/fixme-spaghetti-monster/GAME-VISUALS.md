# FIXME: The Spaghetti Code Monster - Visuals

## Visual Design Notes

This is the boss battle. Visual elements should be **dramatic and impactful**:

- **Monster ASCII art** — commanding presence, chaotic but sympathetic
- **Health bar visualization** showing Technical Debt / Monster Integrity
- **Phase transitions** with escalating visual effects
- **Understanding animations** when technical debt decreases
- **Victory/defeat animations** for endings

## Monster Design — The Spaghetti Code Monster

A design that communicates "tangled legacy code monster" through:
- `{ }` curly braces as the core identity (code)
- `~~~~` wavy lines representing tangled spaghetti code that **escapes its boundaries**
- Asymmetric tentacles representing chaotic dependencies
- Visual progression from chaos to clean as technical debt decreases
- Larger presence befitting a final boss encounter

### Design Principles

- **Spaghetti escapes the box** — Code that has grown beyond its intended scope
- **Asymmetric tentacles** — Dependencies that vary in length and direction
- **Dramatic size** — A final boss should command visual presence
- **Chaos → Order** — Visual transformation tells the redemption story

### Health States

**100% — Full Power**
```
            ╭───────────╮
    ~~~~~~~~│ { ◉   ◉ } │~~~~~~~~
  ~~~~╱╱~~~~│    ~~~~   │~~~~╲╲~~~~
     ╱ │    ╰─────┬─────╯    │ ╲
    ╱ ╱│        ╱│││╲        │╲ ╲
   │ ╱ │       ╱ │││ ╲       │ ╲ │
   │╱  ╲╲     ╱ ╱│││╲ ╲     ╱╱  ╲│
        ╲╲   ╱ ╱ │││ ╲ ╲   ╱╱
              ╱  │││  ╲
```

**75% — Concerned**
```
          ╭───────────╮
    ~~~~~~│ { ◉   ◉ } │~~~~~~
  ~~~~╱~~~│    ~~~    │~~~╲~~~~
     ╱    ╰─────┬─────╯    ╲
    ╱│        ╱│││╲        │╲
   │ │       ╱ │││ ╲       │ │
   │ ╲╲       ╱│││╲       ╱╱ │
      ╲╲      │││       ╱╱
```

**50% — Worried**
```
        ╭───────────╮
    ~~~~│ { ◉   _ } │~~~~
   ~~╱~~│    ~~     │~~╲~~
     ╱  ╰─────┬─────╯  ╲
    │       ╱│││╲       │
    │        │││        │
     ╲       │││       ╱
              │
```

**25% — Desperate**
```
      ╭ ─ ─ ─ ─ ─ ─ ╮
   ~~ │ { x     _ } │ ~~
      │      ~      │
      ╰──────┬──────╯
            ╱│╲
            │││
             │
```

**10% — Critical**
```
      ╭  ─  ─  ─  ─  ╮
      │ { x     x }  │
      │              │
      ╰ ─ ─ ─┬─ ─ ─ ╯
             │
```

**0% — Documented (Peaceful)**
```
        ╭───────────╮
        │ { -   - } │
        │    __     │
        ╰───────────╯
```

### With Speech Bubble (Dialogue Display)

```
 *kzzzt*
 
 ╭──────────────────────────────────────────╮
 │ "I've crashed more browsers than         │
 │  you've written functions."              │
 │                                 *hrrrrnn* │
 ╰─────────────────────┬────────────────────╯
                       │
            ╭───────────╮
    ~~~~~~~~│ { ◉   ◉ } │~~~~~~~~
  ~~~~╱╱~~~~│    ~~~~   │~~~~╲╲~~~~
     ╱ │    ╰─────┬─────╯    │ ╲
    ╱ ╱│        ╱│││╲        │╲ ╲
   │ ╱ │       ╱ │││ ╲       │ ╲ │
```

### With Extended Dialogue (Multiple Lines)

```
 *crackle*
 
 ╭──────────────────────────────────────────╮
 │ "I was beautiful once."                  │
 │                                          │
 │ *drip*                                   │
 │                                          │
 │ "Clean. Single-responsibility."          │
 │                                          │
 │ *tangle*                                 │
 │                                          │
 │ "Then came the edge cases."              │
 ╰─────────────────────┬────────────────────╯
                       │
        ╭───────────╮
    ~~~~│ { ◉   _ } │~~~~
   ~~╱~~│    ~~     │~~╲~~
     ╱  ╰─────┬─────╯  ╲
    │       ╱│││╲       │
```

## Design Philosophy

- **Chaos escapes containment** — Spaghetti code overflows its boundaries, not neatly contained
- **Expressive** — Conveys emotion through eyes, tentacles, and overall form
- **Code-themed** — Curly braces as core identity, tildes as tangled code
- **Progressive cleanup** — Visual "untangling" as technical debt decreases
- **Boss presence** — Larger, more dramatic than regular game elements
- **Asymmetry** — Chaotic dependencies don't follow neat patterns

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
