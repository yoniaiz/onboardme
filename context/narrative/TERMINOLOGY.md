# Game Terminology

All game elements use code-themed naming:

| Generic Term | Code-Themed Term | Context |
|--------------|-----------------|---------|
| Levels | **TODOs** | Main progression stages |
| Boss | **FIXME** | Final confrontation |
| Mini-games | **Sub-tasks** | Challenges within TODOs |
| XP | **Commits** | Progress/points earned |
| Lives/Shields | **Retries** | Remaining attempts |
| Hints | **Stack Overflow** | Help system |
| Knowledge unlocks | **Documentation** | Learning rewards |
| Achievements | **Merged PRs** | Milestones/badges |
| Game over | **Segfault** | Failure state |
| Victory | **Deployed** | Success state |
| Health bar | **Integrity** | Monster's health |
| Streak | **Clean commits** | Consecutive correct answers |

## In-Game Usage Examples

```
"You've earned +50 commits!"
"Stack Overflow consulted. (-30 seconds)"
"New documentation unlocked: Authentication Flow"
"🎉 PR Merged: First TODO Completed"
"SEGMENTATION FAULT (core dumped) - Try again?"
"Monster Integrity: 40%"
"Clean commit streak: 5x multiplier!"
```

## Status Messages

| State | Message |
|-------|---------|
| Starting game | `Initializing codebase exploration...` |
| Correct answer | `Changes committed successfully.` |
| Wrong answer | `Build failed. Check your logic.` |
| Using hint | `// Consulting Stack Overflow...` |
| TODO complete | `TODO resolved. Closing ticket.` |
| All TODOs done | `All tickets closed. FIXME remains.` |
| Victory | `Deployed to PRODUCTION (your brain)` |
| Defeat | `SEGMENTATION FAULT (core dumped)` |
