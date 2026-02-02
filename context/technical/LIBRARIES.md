# Recommended Library Stack

## Core UI Framework

| Library | Use Case | Why |
|---------|----------|-----|
| **Ink** | Main UI framework | React patterns, flexbox layout, used by Claude Code |
| **ink-blit** | Game-specific helpers | Hooks for game loops, sprites |

**Ink** is the clear winner—it's battle-tested (Claude Code, GitHub Copilot CLI, Wrangler all use it), has React patterns developers know, and handles layout beautifully.

## Existing Games for Inspiration

| Game | Built With | What to Learn |
|------|-----------|---------------|
| **ink-tetris** | Ink | Real-time game loop, piece rendering |
| **breakout-ink** | Ink + Redux | State management, collision |
| **Terminal Wordle** | Ink | Letter grid, color feedback |
| **blessed-contrib** | Blessed | Dashboard layouts, graphs |

## Implementation Priority

1. **Phase 0:** Basic Ink setup with theme colors
2. **Phase 1:** Box-drawing frames, figlet titles
3. **Phase 2:** Progress bars, timers, health bars
4. **Phase 3:** Animations (typing, transitions)
5. **Phase 4:** Sound effects (optional, off by default)
6. **Phase 5:** Polish (screen shake, damage flash)

> **Project structure details:** See [ARCHITECTURE.md](../ARCHITECTURE.md#6-project-structure).
