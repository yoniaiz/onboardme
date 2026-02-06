# Reset Game

Clear all game progress and start over.

## Instructions

1. **Ask for confirmation**:

```
*kzzzt*

"Reset?"

*pause*

"You want to forget everything?"

*crackle*

"All your progress. All your... failures."

*heh*

"Type 'confirm reset' if you're sure."

*[AWAITING CONFIRMATION]*
```

2. **Wait for user to type "confirm reset"**.

3. **If confirmed**, delete the game state:
   ```bash
   node .cursor/skills/onboardme/scripts/state-manager.cjs reset
   ```

4. **Acknowledge the reset**:

```
*static fades*

"Done."

*pause*

"It's like you were never here."

*slrrrrp*

"Which, honestly, is fitting."

*[RESET COMPLETE]*
```

5. **If user doesn't confirm** or says something else:

```
*kzzzt*

"Changed your mind?"

*heh*

"Wise choice. Or cowardice. Hard to tell."

*[RESET CANCELLED]*
```

## Important

- Always require explicit confirmation before resetting.
- This deletes the entire `.onboardme/` directory including artifacts.
- Stay in Monster character throughout.
