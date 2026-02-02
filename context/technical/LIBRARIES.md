# Recommended Library Stack

> **6 core libraries.** Everything else is handcrafted.

## Core Dependencies

| Library | Version | Weekly Downloads | Purpose |
|---------|---------|------------------|---------|
| **ink** | ^5.0.0 | 500K+ | React for terminal — main framework |
| **chalk** | ^5.3.0 | 250M+ | Text colors — the gold standard |
| **boxen** | ^8.0.0 | 10M+ | Boxes with borders |
| **ora** | ^8.0.0 | 15M+ | Spinners/loading states |
| **figlet** | ^1.9.0 | 1M+ | ASCII text headers |
| **log-update** | ^6.0.0 | 10M+ | Single-line updates (timers) |

## Optional Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| **gradient-string** | ^3.0.0 | Subtle gradients (victory screen only) |

## Skip These

| Library | Reason |
|---------|--------|
| ~~ascii-art~~ | Deprecated, overcomplicated |
| ~~image-to-ascii~~ | Last update 2+ years |
| ~~cfonts~~ | Overkill — figlet is enough |
| ~~chalk-animation~~ | Gimmicky, distracting |
| ~~terminal-canvas~~ | Overkill for our needs |
| ~~blessed~~ | Ink is simpler and sufficient |
| ~~ink-blit~~ | Not needed for our game types |

---

## package.json

```json
{
  "dependencies": {
    "ink": "^5.0.0",
    "chalk": "^5.3.0",
    "boxen": "^8.0.0",
    "ora": "^8.0.0",
    "figlet": "^1.9.0",
    "log-update": "^6.0.0"
  },
  "optionalDependencies": {
    "gradient-string": "^3.0.0"
  }
}
```

---

## Why These Libraries?

**Ink** — Battle-tested (Claude Code, GitHub Copilot CLI, Wrangler). React patterns developers know.

**Chalk** — The universal standard for terminal colors. 250M+ weekly downloads.

**Boxen** — Clean, simple box drawing. No need for complex alternatives.

**Ora** — Elegant spinners. Used everywhere.

**Figlet** — ASCII text headers. One font (`ANSI Shadow`), used consistently.

**Log-update** — Single-line updates for timers and progress. Clean API.

---

## Implementation Priority

1. **Phase 0:** Basic Ink setup with chalk colors
2. **Phase 1:** Boxen frames, figlet headers
3. **Phase 2:** Ora spinners, log-update timers
4. **Phase 3:** Typewriter effect (custom, ~20 lines)
5. **Phase 4:** Polish (subtle screen shake if needed)

---

## Existing Games for Inspiration

| Game | Built With | What to Learn |
|------|-----------|---------------|
| **ink-tetris** | Ink | Real-time game loop |
| **Terminal Wordle** | Ink | Letter grid, color feedback |
| **mnswpr** | Ink + TypeScript | Complete CLI game reference |

---

> **Project structure details:** See [ARCHITECTURE.md](../ARCHITECTURE.md#6-project-structure).
> **Visual guidelines:** See [context/visuals/](../visuals/) for design specs.
