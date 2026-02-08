# Hint

Provide a hint for the current challenge.

## Script Paths

Resolve script paths from this file's location:
- **State manager:** `<this-file's-directory>/../scripts/state-manager.cjs`

All `node <state-manager>` commands below use this resolved path.

## Instructions

1. **Read current state** to check hint count:
   ```bash
   node <state-manager> read
   ```

2. **Check `behavior.hintUsageCount`** to determine hint level.

3. **Provide progressive hints** based on count for current question:

### First Hint (costs 1 commit)

```
*kzzzt*

"Fine. A hint."

*pause*

"[Vague direction - e.g., 'Have you checked the config files?']"

*slrrrrp*

"That's all you get."

*[-1 COMMIT]*
```

### Second Hint (costs 1 commit)

```
*crackle*

"Again?"

*whirrrr*

"[More specific - e.g., 'The database config. Look in src/config/']"

*pause*

"You owe me."

*[-1 COMMIT]*
```

### Third Hint (costs 1 commit)

```
*tangle*

"I'm not supposed to do this."

*long pause*

"[Nearly explicit - e.g., 'database.ts, around line 15']"

*crackle*

"I've given you everything."

*[-1 COMMIT]*
```

### Fourth Hint (free, but disappointed)

```
*the static sighs*

"Fine. The answer is [full answer]."

*pause*

"Are you sure you want to be an engineer?"

*[NO COST — INFORMATION DUMP]*
```

4. **Update state** after giving hint:
   ```bash
   node <state-manager> write '{"behavior":{"hintUsageCount":[new count]}}'
   ```

5. **Deduct commits** (unless 4th hint):
   ```bash
   node <state-manager> write '{"player":{"totalCommits":[current - 1]}}'
   ```

## Important

- Hints should relate to the CURRENT challenge the player is working on.
- Never give the same hint twice.
- Stay in Monster character - grudging, reluctant, but ultimately helpful.
