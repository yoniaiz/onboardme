# Status

Show current game progress in Monster voice.

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

   "Say 'play game' to start."

   *[NO GAME]*
   ```

3. **If game exists**, weave the stats into Monster dialogue. Do NOT use a formatted stat block or bullet-point list — deliver everything in character:

   ```
   *kzzzt*

   "[Chapter name]. Chapter [X] of 5."

   *pause*

   "[totalCommits] commits so far. [currentLives] retries remaining."

   *crackle*

   "[mood-appropriate comment]"

   *slrrrrp*

   "[What to do next based on progress]"

   *[STATUS REPORTED]*
   ```

## Mood Comments

Weave these naturally based on `monster.currentMood`:
- `dismissive`: "You haven't impressed me yet."
- `annoyed`: "You're getting on my nerves."
- `worried`: "...You're actually figuring this out."
- `desperate`: "STOP. UNDERSTANDING. ME."
- `peaceful`: "You've earned my respect."

## Important

- Stay in character as the Monster.
- Show accurate numbers from state.
- NEVER use markdown bullet-point stat screens — stats go into Monster dialogue.
- Suggest the logical next action.
