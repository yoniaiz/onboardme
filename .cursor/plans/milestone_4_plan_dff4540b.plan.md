---
name: Milestone 4 Plan
overview: 'Milestone 4 closes the gap between what the design docs envision and what the skill files actually instruct the agent to do. Many M4 features are partially implemented — persona lock is strong, mood tracking exists, state fields are defined — but the "last mile" is missing: the snark slider isn''t wired up, memorable exchanges have no save mechanics, game-over and post-game flows don''t exist, and several critical UX gaps (player name, tone selection, chapter transitions) would break the "best onboarding experience ever" goal.'
todos:
  - id: "4.1"
    content: "Snark slider: Add tone selection to prepare-game, tone-aware instructions to play-game and SKILL.md, set-tone command to state-manager"
    status: completed
  - id: "4.2"
    content: "Critical flows: Auto-detect player name from git config in prepare-game, game-over handling (0 lives), game-complete handling (all 5 chapters done)"
    status: completed
  - id: "4.3"
    content: "Memorable exchanges: Add add-exchange command to state-manager, explicit save/load instructions in play-game and reference files"
    status: completed
  - id: "4.4"
    content: "Emotional arc: Fix updateMonsterMood for full arc (desperate->peaceful), chapter-based mood minimums, mood-driven dialogue selection"
    status: completed
  - id: "4.5"
    content: "Boss battle polish: CODEBASE_KNOWLEDGE.md template, BOSS_BATTLE.md template, explicit state commands, post-game cleanup flow"
    status: completed
  - id: "4.6"
    content: "Reset + safety: Git branch cleanup in reset-game, fix artifact path inconsistency in SAFETY-RULES.md"
    status: completed
  - id: "4.7"
    content: "Session flow: Auto-continue between chapters, session summary updates, player style tracking mechanics"
    status: completed
  - id: "4.8"
    content: "Install and verify: Run install-skill.sh, verify all flows work end-to-end"
    status: completed
isProject: false
---

# Milestone 4: Monster Voice + Progression

## Current State Assessment

After reviewing all 13 skill files, both utility scripts, and all design docs, here is where each M4 success criterion stands:

| Criterion | Status | Gap |
| --------- | ------ | --- |

**Persona Lock** -- ~90% done. Every reference file has "CRITICAL: Monster Voice" sections with right/wrong examples. Re-anchoring protocol exists. Minor polish only.

**Snark Slider** -- ~40% done. Design exists in [DYNAMIC-EXPERIENCE.md](context/agent/DYNAMIC-EXPERIENCE.md) with 4 tone levels + dialogue examples. State field `preferences.monsterTone` exists in [state-manager.cjs](skills/onboardme/scripts/state-manager.cjs). But NO skill file reads or acts on this preference. The agent has no instructions to adjust dialogue based on tone.

**Emotional Arc Tracking** -- ~70% done. `updateMonsterMood()` works for forward transitions (dismissive->annoyed->worried->desperate) but never reaches `peaceful`. No backward transitions. No handling of "player completed all chapters."

**Memorable Exchange Logging** -- ~50% done. `monster.memorableExchanges[]` exists in state. Reference files say "save key callbacks" but provide NO bash command to actually write them. The agent knows it should remember, but has no mechanism.

**Mood-Appropriate Dialogue** -- ~60% done. Each chapter has mood-specific examples, but there's no systematic instruction like "check current mood, select dialogue from appropriate pool."

## Critical Quality Gaps Found

Beyond the M4 criteria, I found these gaps that would hurt the onboarding experience:

### 1. No player name detection

`player.name` exists in state but nothing in [prepare-game.md](skills/onboardme/instructions/prepare-game.md) or [play-game.md](skills/onboardme/instructions/play-game.md) populates it. Every artifact says "Investigation by: Unknown Agent." Fix: auto-detect from `git config user.name` during prepare -- seamless, no prompts.

### 2. No game-over flow (0 lives)

State decrements `currentLives` on incorrect answers, but NO reference file or instruction describes what happens at 0 lives. The game just... continues? This is a critical missing flow.

### 3. No tone selection at game start

[DYNAMIC-EXPERIENCE.md](context/agent/DYNAMIC-EXPERIENCE.md) designs a "how much pain do you want?" prompt but this never appears in the actual skill instructions.

### 4. No post-game cleanup

After Ch5 victory, what happens to the `onboardme/game` branch? No "game complete" workflow exists. The player is left on the game branch with no guidance.

### 5. No "game complete" state

If all 5 chapters are done and the player says "play game," [play-game.md](skills/onboardme/instructions/play-game.md) has no handling for this. It would try to load a chapter reference that doesn't exist.

### 6. Missing CODEBASE_KNOWLEDGE.md template

[THE-BOSS-BATTLE.md](skills/onboardme/references/THE-BOSS-BATTLE.md) says "Create CODEBASE_KNOWLEDGE.md with everything they learned" but provides no template, unlike every other artifact.

### 7. Reset doesn't clean up git

[reset-game.md](skills/onboardme/instructions/reset-game.md) deletes `.onboardme/` but doesn't switch back to the original branch or clean up `onboardme/game`.

### 8. THE-BOSS-BATTLE.md lacks state management commands

All other reference files have explicit bash commands for state updates (added after M3 feedback). THE-BOSS-BATTLE.md says "update state" without providing the actual commands.

### 9. Inconsistent artifact paths

[SAFETY-RULES.md](context/agent/SAFETY-RULES.md) shows `.onboardme/CASE_FILE.md` but reference files use `.onboardme/artifacts/`. Should be consistent.

### 10. No chapter auto-continue

When a chapter ends and the next begins in the same session, there's no instruction on whether to auto-continue or wait for "play game" again.

---

## Implementation Plan

### Task 4.1: Snark Slider Implementation

**Files to change:**

- [skills/onboardme/instructions/prepare-game.md](skills/onboardme/instructions/prepare-game.md) -- Add tone selection step after repo analysis
- [skills/onboardme/instructions/play-game.md](skills/onboardme/instructions/play-game.md) -- Add "read tone, adjust dialogue" instruction in Step 2
- [skills/onboardme/SKILL.md](skills/onboardme/SKILL.md) -- Add "Tone Adjustment" section with per-level guidelines
- [skills/onboardme/scripts/state-manager.cjs](skills/onboardme/scripts/state-manager.cjs) -- Add `set-tone` command

Add a new step in `prepare-game.md` (after Step 5, before Step 6) that presents the tone selection prompt from [DYNAMIC-EXPERIENCE.md](context/agent/DYNAMIC-EXPERIENCE.md):

```
"How much pain do you want?"
- Friendly — "I'm here to learn"
- Balanced — "Challenge me" (default)
- Spicy — "Bring it"
- Full Monster — "Destroy me"
```

Save to `preferences.monsterTone`. Then add a section to `SKILL.md` that maps each tone level to specific behavioral adjustments (hint generosity, mockery intensity, partial credit strictness). Add a brief instruction in `play-game.md` Step 2: "Read `preferences.monsterTone` from state. Adjust dialogue intensity accordingly — see SKILL.md Tone Adjustment section."

Also add a "change tone" trigger to the commands table in SKILL.md so players can adjust mid-game.

### Task 4.2: Player Name (from git) + Game-Over + Post-Game Flows

**Files to change:**

- [skills/onboardme/instructions/prepare-game.md](skills/onboardme/instructions/prepare-game.md) -- Auto-detect player name from git config
- [skills/onboardme/instructions/play-game.md](skills/onboardme/instructions/play-game.md) -- Add game-over handling and game-complete handling
- [skills/onboardme/SKILL.md](skills/onboardme/SKILL.md) -- Add Game Over and Game Complete sections

In `prepare-game.md`, add a step during initialization that runs `git config user.name` to auto-detect the player's name. Save to `player.name`. Fall back to "Unknown Agent" if git config is empty. The Monster reacts to their name without asking — no form, no prompt, just:

```
*kzzzt*

"[Name]."

*pause*

"I've heard worse."

*[IDENTITY LOGGED]*
```

This is seamless — git config is almost always set, and pulling it silently keeps the Monster's mystique ("I already know who you are").

In `play-game.md`, add two new sections:

- **Game Over (0 lives):** Check `player.currentLives` after loading state. If 0, present the game-over flow — Monster mocks, offers restart or continue (with restored lives at a cost).
- **Game Complete:** If `progress.chaptersCompleted` contains all 5 chapters, present victory summary and post-game cleanup (branch options).

### Task 4.3: Memorable Exchange Mechanics

**Files to change:**

- [skills/onboardme/instructions/play-game.md](skills/onboardme/instructions/play-game.md) -- Add memorable exchange save command
- All 5 reference files -- Add explicit `state-manager.cjs write` examples for `memorableExchanges`

Currently, reference files say "save key callbacks" but don't show the bash command. Add an explicit step in `play-game.md` Step 5 (after updating mood):

```bash
node .cursor/skills/onboardme/scripts/state-manager.cjs write '{"monster":{"memorableExchanges":["<brief description of the moment>"]}}'
```

This needs special handling since `memorableExchanges` is an array and deep merge replaces arrays. Either:

- (a) Add an `add-exchange` command to `state-manager.cjs` (preferred, mirrors `add-question`), or
- (b) Have the agent read, append, write

Option (a) is cleaner. Add `add-exchange` to state-manager.cjs.

Also add explicit callback instructions at the start of each chapter: "Read `monster.memorableExchanges` and reference 1-2 past moments in your opening dialogue."

### Task 4.4: Emotional Arc Completion

**Files to change:**

- [skills/onboardme/scripts/state-manager.cjs](skills/onboardme/scripts/state-manager.cjs) -- Fix `updateMonsterMood` to handle full arc
- [skills/onboardme/SKILL.md](skills/onboardme/SKILL.md) -- Add "Emotional Arc" detail section
- [skills/onboardme/instructions/play-game.md](skills/onboardme/instructions/play-game.md) -- Add mood-driven dialogue selection instruction

The `updateMonsterMood()` function currently:

- Transitions dismissive->annoyed after 3 correct in last 5
- Transitions annoyed->worried after 5 correct in last 5
- Transitions worried->desperate after 4+ chapters completed

Missing:

- `desperate->peaceful` transition (should happen when boss battle is completed)
- No mechanism for backward mood transitions if player starts failing after early success
- The function doesn't account for chapter-based mood expectations (Ch1=dismissive, Ch3=annoyed->worried)

Fix `updateMonsterMood` to:

1. Account for chapter-appropriate mood minimums (Ch3+ should be at least annoyed)
2. Handle `desperate->peaceful` when `boss-battle` is added to completed chapters
3. Add the instruction in `play-game.md` to explicitly check mood before generating dialogue

### Task 4.5: Boss Battle Polish + CODEBASE_KNOWLEDGE.md Template

**Files to change:**

- [skills/onboardme/references/THE-BOSS-BATTLE.md](skills/onboardme/references/THE-BOSS-BATTLE.md) -- Add explicit state management commands, CODEBASE_KNOWLEDGE.md template, BOSS_BATTLE.md template, post-game cleanup flow

Add the missing pieces:

1. **CODEBASE_KNOWLEDGE.md template** -- Full markdown template capturing: project identity (from Ch1), how to run it (Ch2), architecture flows (Ch3), debugging learnings (Ch4), and their contribution (Ch5). Include Monster's final notes.
2. **BOSS_BATTLE.md template** -- Structured template for the review artifact.
3. **Explicit state commands** -- Add the exact bash commands for all state updates (matching the pattern in THE-HUNT.md).
4. **Post-game cleanup** -- Instructions for cleaning up the game branch: offer merge, keep, or discard. Switch back to original branch. Show victory summary.

### Task 4.6: Reset + Safety Cleanup

**Files to change:**

- [skills/onboardme/instructions/reset-game.md](skills/onboardme/instructions/reset-game.md) -- Add git branch cleanup
- [context/agent/SAFETY-RULES.md](context/agent/SAFETY-RULES.md) -- Fix artifact path inconsistency

Update `reset-game.md` to:

1. Read `git.originalBranch` from state before deleting
2. Switch to original branch if on game branch
3. Offer to delete the `onboardme/game` branch
4. Then delete `.onboardme/`

Fix SAFETY-RULES.md artifact paths to consistently use `.onboardme/artifacts/`.

### Task 4.7: Auto-Continue + Session Continuity

**Files to change:**

- [skills/onboardme/instructions/play-game.md](skills/onboardme/instructions/play-game.md) -- Add chapter transition and session continuity instructions

Add instructions for:

1. **Auto-continue within session:** When a chapter ends, automatically load the next chapter reference and continue. Don't make the player say "play game" again if they're in an active session.
2. **Session summary on resume:** Update `session.conversationSummary` at the end of each interaction. On resume, read it and the discoveries to provide rich context.
3. **Player style tracking:** After each answer, assess `behavior.playerStyle` (aggressive/methodical/balanced/struggling) based on hint usage and accuracy patterns. Update state.

### Task 4.8: Install + Verify

Run `bash scripts/install-skill.sh` to deploy all changes, then verify:

- Tone selection works in prepare flow
- Memorable exchanges get saved and loaded
- Mood transitions complete the full arc
- Game-over and game-complete flows handle edge cases
- Reset cleans up git state

---

## What This Achieves

After M4, the skill delivers:

- A **personalized experience** (player name, tone selection, adaptive dialogue)
- A **complete emotional arc** (dismissive -> peaceful with no dead-ends)
- **Cross-session continuity** (memorable exchanges referenced, conversation summaries loaded, discoveries acknowledged)
- **No dead-end states** (game-over handled, game-complete handled, reset cleans up git)
- **Every artifact has a template** (CODEBASE_KNOWLEDGE.md, BOSS_BATTLE.md filled in)
- The "best onboarding experience ever" polish that makes the difference between a prototype and a product
