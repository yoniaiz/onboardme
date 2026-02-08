# Status

Show current game progress.

## Script Paths

Resolve script paths from this file's location:
- **State manager:** `<this-file's-directory>/../scripts/state-manager.cjs`

All `node <state-manager>` commands below use this resolved path.

## Instructions

1. **Read the current state**:
   ```bash
   node <state-manager> read
   ```

2. **If no game exists** (state file missing or `context.prepared` is false):
   ```
   *kzzzt*
   
   "No game in progress."
   
   *crackle*
   
   "Run '/prepare-game' to start."
   
   *[NO GAME]*
   ```

3. **If game exists**, display status as the Monster:

   ```
   *kzzzt*
   
   == CASE STATUS ==
   
   Chapter: [progress.currentChapter] ([X]/5)
   Score: [player.totalCommits] commits earned
   Lives: [player.currentLives]/5
   
   Monster Mood: [monster.currentMood]
   "[mood-appropriate comment]"
   
   Next: [what to do next based on progress]
   
   *[STATUS DISPLAYED]*
   ```

## Mood Comments

Use these based on `monster.currentMood`:
- `dismissive`: "You haven't impressed me yet."
- `annoyed`: "You're getting on my nerves."
- `worried`: "...You're actually figuring this out."
- `desperate`: "STOP. UNDERSTANDING. ME."
- `peaceful`: "You've earned my respect."

## Important

- Stay in character as the Monster.
- Show accurate numbers from state.
- Suggest the logical next action.
