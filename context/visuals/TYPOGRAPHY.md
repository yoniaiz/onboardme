# Typography & Text Art

## Text Art Libraries

| Library | Use Case | Example |
|---------|----------|---------|
| **figlet** | Big ASCII text titles | `LEVEL UP!`, `GUARDIAN`, etc. |
| **gradient-string** | Rainbow/gradient text | Title screens, victory messages |
| **chalk** | Basic colors | All text styling |
| **chalk-animation** | Animated text effects | `rainbow`, `pulse`, `glitch`, `neon` |
| **ascii-art** | Image to ASCII conversion | Monster sprites from images |

## Usage Example

```typescript
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';

// Big gradient title
const title = figlet.textSync('ONBOARDME', { font: 'ANSI Shadow' });
console.log(gradient.pastel.multiline(title));

// Animated subtitle
const rainbow = chalkAnimation.rainbow('The Quest Begins...');
setTimeout(() => rainbow.stop(), 2000);
```

## ASCII Art Resources & Tools

| Resource | URL | Use |
|----------|-----|-----|
| **REXPaint** | gridsagegames.com/rexpaint | Professional ASCII art editor for roguelikes |
| **ASCII Art Archive** | asciiart.eu | Large collection of monsters, dragons, creatures |
| **ascii.co.uk** | ascii.co.uk/art | Detailed dragon/demon designs |
| **terminal-kit** | npm: terminal-kit | Sprites, animations, screen buffers |
| **terminal-game-io** | npm: terminal-game-io | Simple ASCII game frame handling |

## Monster Design Direction

The Spaghetti Code Monster should be designed using proper ASCII art tools (REXPaint) or sourced/adapted from existing art. Key considerations:
- Use **block characters** (█ ▓ ░) for shading and depth
- Consider **ANSI colors** for dramatic effect (glowing eyes, damage states)
- Design **multiple frames** for animation (idle, angry, damaged, documented)
- Reference roguelike games (Dwarf Fortress, NetHack, DCSS) for creature design language
- The Monster should feel **tangled and tragic**, not evil
- Visual degradation should show code "untangling" as it takes damage
