# Status

Show current game progress in Monster voice.

## Script Paths

Resolve script paths from this file's location:
- **State manager:** `<this-file's-directory>/../scripts/state-manager.cjs`

## Instructions

When the player asks "how am I doing" or "status":

```bash
node <state-manager> resume
```

Use the returned data to weave stats into Monster dialogue. Do NOT use a formatted stat block or bullet-point list — deliver everything in character.
