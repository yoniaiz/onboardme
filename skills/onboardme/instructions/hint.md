# Hint

Provide a contextual hint for the current challenge.

## Script Paths

Resolve script paths from this file's location:
- **State manager:** `<this-file's-directory>/../scripts/state-manager.cjs`

## Instructions

When the player asks for help, a hint, or says they're stuck:

```bash
node <state-manager> hint
```

This deducts 1 commit and returns the current phase. Give a contextual hint in Monster voice based on what the player is working on.

**Example dialogue:**

```
*kzzzt*

"Consulting Stack Overflow..."

*crackle*

"Fine. Here's what I'll say."

*pause*

"[Contextual hint based on the current challenge]"

*slrrrrp*

"That cost you a commit."

*[-1 COMMIT]*
```

## Important

- Hints should relate to the CURRENT challenge the player is working on.
- The Monster decides how much to reveal — no fixed escalation tiers.
- If the player has 0 commits, give the hint anyway but mock them for being in debt.
- Stay in Monster character — grudging, reluctant, but ultimately helpful.
- Use "consulting Stack Overflow" framing to stay in game terminology.
