# TODO #2: grep --hunt - Visuals

## Visual Design Notes

This game focuses on timed code searching. Visual elements should emphasize:

- **Timer tension** with visual countdown
- **Hunt target presentation** in a clear, readable format
- **Search interface** that feels like actual terminal work
- **Progress indicators** showing hunt progress

## Visual Examples

### Timer Tension
```
Plenty of time:  ⏱️ 0:45  [████████████████████]  (green)
Getting close:   ⏱️ 0:15  [████████░░░░░░░░░░░░]  (yellow, pulsing)
Almost out:      ⏱️ 0:05  [██░░░░░░░░░░░░░░░░░░]  (red, flashing)
```

### Game Screen Layout

#### During Gameplay

```
╔════════════════════════════════════════════════════════════════╗
║  🔍 grep --hunt                                 Target: 3/5    ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  HUNT TARGET:                                                  ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │                                                         │  ║
║  │  A user reports: "I can register with 'test@test' but  │  ║
║  │  it says my email is valid. That can't be right!"      │  ║
║  │                                                         │  ║
║  │  TASK:                                                  │  ║
║  │  1. Find where email validation happens at registration │  ║
║  │  2. Identify why 'test@test' passes                     │  ║
║  │  3. Find the test file that should have caught this    │  ║
║  │                                                         │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  YOUR FINDINGS:                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │  Validation file:line  > _                              │  ║
║  │  Why it passes         > _                              │  ║
║  │  Test file             > _                              │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  ⏱️ 4:32 remaining                                            ║
║  [H] Hint (-30 sec)  [S] Skip (-1 life)  [ENTER] Submit       ║
╚════════════════════════════════════════════════════════════════╝
```

#### After Submission

```
╔════════════════════════════════════════════════════════════════╗
║  ✅ CORRECT!                                    +100 XP        ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  📚 KNOWLEDGE UNLOCKED: Email Validation                       ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │                                                         │  ║
║  │  LOCATION: src/utils/validators.ts:23-41                │  ║
║  │                                                         │  ║
║  │  THE BUG: The regex only checks for @ symbol, not       │  ║
║  │  for a valid TLD. 'test@test' has an @ so it passes.   │  ║
║  │                                                         │  ║
║  │  THE FIX: Use a proper email validation library like    │  ║
║  │  'validator.js' or 'zod.string().email()'              │  ║
║  │                                                         │  ║
║  │  WHY IT MATTERS: This is a common security issue.      │  ║
║  │  Invalid emails can bypass verification flows and      │  ║
║  │  create orphaned accounts.                              │  ║
║  │                                                         │  ║
║  │  RELATED:                                               │  ║
║  │  • ADR-012: Input Validation Strategy                  │  ║
║  │  • src/utils/validators.test.ts (missing coverage!)    │  ║
║  │                                                         │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  [ENTER] Continue to next challenge                           ║
╚════════════════════════════════════════════════════════════════╝
```

Visuals for this game should follow the overall aesthetic direction outlined in [context/visuals/](../../visuals/).
