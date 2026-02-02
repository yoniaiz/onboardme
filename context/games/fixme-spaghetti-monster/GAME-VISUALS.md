# FIXME: The Spaghetti Code Monster - Visuals

## Visual Design Notes

This is the boss battle, so visuals should be dramatic and impactful. Visual elements should emphasize:

- **Monster ASCII art** designed using proper tools (REXPaint) or sourced/adapted
- **Health bar visualization** showing Monster Integrity
- **Phase transitions** with dramatic effects
- **Damage animations** when Monster takes damage
- **Victory/defeat animations** for endings

## Monster Design Direction

The Spaghetti Code Monster should be designed using proper ASCII art tools (REXPaint) or sourced/adapted from existing art. Key considerations:
- Use **block characters** (█ ▓ ░) for shading and depth
- Consider **ANSI colors** for dramatic effect (glowing eyes, damage states)
- Design **multiple frames** for animation (idle, angry, damaged, documented)
- Reference roguelike games (Dwarf Fortress, NetHack, DCSS) for creature design language
- The Monster should feel **tangled and tragic**, not evil
- Visual degradation should show code "untangling" as it takes damage

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
