# Visual Examples

## Game Progression Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        GAME PROGRESSION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TODO #1: // understand what we have       ──► Discovery       │
│  TODO #2: // figure out how to find things ──► Navigation      │
│  TODO #3: // trace data flows (URGENT)     ──► Understanding   │
│  TODO #4: // document why this works       ──► Business Logic  │
│  TODO #5: // learn how to deploy safely    ──► Operations      │
│  FIXME:   // the monster itself            ──► Final Battle    │
│                                                                 │
│  Each TODO: 2 sub-tasks (mini-games)                           │
│  Each sub-task: 5-10 challenges                                │
│  FIXME: 3 phases                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Boss Battle Intro Screen

```
╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║   ALL TODOs RESOLVED.                                                 ║
║                                                                        ║
║   ✓ TODO #1: understand what we have                                  ║
║   ✓ TODO #2: figure out how to find things                            ║
║   ✓ TODO #3: trace data flows (URGENT)                                ║
║   ✓ TODO #4: document why this works                                  ║
║   ✓ TODO #5: learn how to deploy safely                               ║
║                                                                        ║
║   Only one item remains:                                              ║
║                                                                        ║
║   ▣ FIXME: // CRITICAL - DO NOT IGNORE                                ║
║   // Added: Unknown                                                   ║
║   // Author: Unknown                                                  ║
║   // Description: "Just... fix it. Please. Someone. Anyone."          ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
```

## Title Screen

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   ░█████╗░███╗░░██╗██████╗░░█████╗░░█████╗░██████╗░██████╗░       ║
║   ██╔══██╗████╗░██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗       ║
║   ██║░░██║██╔██╗██║██████╦╝██║░░██║███████║██████╔╝██║░░██║       ║
║   ██║░░██║██║╚████║██╔══██╗██║░░██║██╔══██║██╔══██╗██║░░██║       ║
║   ╚█████╔╝██║░╚███║██████╦╝╚█████╔╝██║░░██║██║░░██║██████╔╝       ║
║   ░╚════╝░╚═╝░░╚══╝╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░       ║
║                                                                   ║
║                    ══════════════════════                        ║
║                       THE QUEST BEGINS                           ║
║                    ══════════════════════                        ║
║                                                                   ║
║                        ▼ PRESS ENTER ▼                           ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

## Victory Animation

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║    ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★     ║
║                                                                   ║
║     ██╗   ██╗██╗ ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗      ║
║     ██║   ██║██║██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝      ║
║     ██║   ██║██║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝       ║
║     ╚██╗ ██╔╝██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝        ║
║      ╚████╔╝ ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║         ║
║       ╚═══╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝         ║
║                                                                   ║
║    ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★ ☆ ★     ║
║                                                                   ║
║                 THE GUARDIAN HAS BEEN DEFEATED                   ║
║                                                                   ║
║                    You are now a true                            ║
║                   CODEBASE MASTER                                ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

## Sound Effects (Optional)

| Library | Use Case |
|---------|----------|
| **beeper** | System beeps (cross-platform) |
| **cli-sound** | Play actual audio files (MP3) |

### Sound Moments

- Correct answer: Short victory beep
- Wrong answer: Error tone
- Streak milestone: Escalating tones
- Boss phase change: Dramatic sound
- Victory: Celebration melody

### Usage Example

```typescript
import beeper from 'beeper';

// Victory beep pattern
await beeper('*-*-***'); // short-short-long celebration

// Error
await beeper('*'); // single sad beep
```
