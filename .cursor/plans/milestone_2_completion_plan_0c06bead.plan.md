---
name: Milestone 2 Completion Plan
overview: 'Milestone 2 ("One Killer Game") is much further along than PROGRESS.md reflects. The core investigation flow, CASE_FILE artifact, rubric evaluation, and Monster reactions are all working (proven by playtest). The remaining work is: update PROGRESS.md to match reality, address playtest feedback, and polish Chapter 1 into a fully complete experience.'
todos:
  - id: update-progress
    content: "Update PROGRESS.md: mark tasks 2.1-2.4 as completed, add notes about CH2/CH5 references, update success criteria checkboxes"
    status: completed
  - id: sync-scoring-explanation
    content: Sync scoring tier explanation into THE-INVESTIGATION.md opening dialogue (currently only in play-game.md)
    status: completed
  - id: add-pacing-guidance
    content: Add pacing/breathing-moment guidance to SKILL.md gameplay loop section
    status: completed
  - id: update-agents-md
    content: "Update AGENTS.md: document that skills/onboardme/ is the source of truth, and scripts/install-skill.sh syncs to .cursor/skills/"
    status: completed
  - id: sync-cursor-skills
    content: Run scripts/install-skill.sh to sync skills/onboardme/ -> .cursor/skills/onboardme/ after all edits
    status: completed
  - id: validate-milestone
    content: Run final review of all Milestone 2 success criteria and mark milestone complete or note remaining items
    status: completed
isProject: false
---

# Milestone 2 Completion Plan

## Current State: What's Been Built Since Milestone 1

Since Milestone 1 was completed, significant work has happened that PROGRESS.md doesn't fully reflect:

### Already Implemented (not yet marked in PROGRESS.md)

- **Task 2.0 Context Gathering** (marked completed): `knowledge-manager.cjs`, `prepare-game.md` with structured repo analysis, `play-game.md` with knowledge loading + discovery saving
- **Chapter 2 reference** (`references/THE-HANDS-ON.md`) -- full 3-phase flow with Monster voice, recovery patterns, alternative code-challenge mode
- **Chapter 5 reference** (`references/THE-BOSS-BATTLE.md`) -- full 4-phase flow: assignment, build, review, victory
- **Investigation flow**: 4-phase structure working end-to-end (Identity, Tech Stack, Documentation Hunt, Final Synthesis)
- **CASE_FILE.md artifact**: Generated during playtest, includes evidence log, findings, case summary, Monster notes
- **Rubric evaluation**: All 4 tiers (incorrect/partial/correct/deep) working with commit awards
- **Monster reactions**: Mood shifts visible (dismissive -> worried), respect level tracking, emotional beats
- **Chapter progression**: Investigation completes -> sets `currentChapter: "hands-on"`, adds to `chaptersCompleted`
- **A full playtest** was conducted with detailed feedback in `feedback/onboardme/2026-02-06T12-30-00Z.json` (overall score: 1.81/3)

### Playtest Feedback Summary (from feedback JSON)

**Strengths (keep these):**

- Monster voice is exceptional and distinctive
- Probe-deeper mechanic works brilliantly (refuses vague answers)
- Investigation arc is well-structured with progressive difficulty
- Emotional reactions are genuinely motivating
- Commit announcements with running totals provide clear progress
- State management checkpoints feel like "level complete" moments

**Issues to fix (from feedback):**

1. **Scoring tiers never explained** (medium priority) -- Player sees commits but doesn't know criteria for 3 vs 2 vs 1. Already partially addressed in `play-game.md` opening dialogue which includes scoring explanation, but THE-INVESTIGATION.md opening doesn't mention it.
2. **Monster conflates player with code author** (low priority) -- Already addressed: both `THE-INVESTIGATION.md` and `play-game.md` now have explicit "third-person language" instructions
3. **Mood progression mostly internal** (medium priority) -- Already partially addressed: `THE-INVESTIGATION.md` now has a "Monster Notes" section with explicit mood-surfacing instructions and example lines
4. **Pacing between challenges** (low priority) -- Feedback suggests clearer breathing moments between evaluation and next challenge

---

## Remaining Work

Most Milestone 2 success criteria are met. The remaining tasks are:

### 1. Update PROGRESS.md to match reality

Mark tasks 2.1-2.4 as completed based on the playtest evidence. Update success criteria checkboxes. Note the extra work done (CH2, CH5 references). Mark 2.5 as in-progress.

### 2. Address playtest feedback in skill files

Apply the remaining feedback items that haven't been addressed yet:

- **In `references/THE-INVESTIGATION.md**`: Ensure the opening dialogue includes scoring tier explanation (the `play-game.md` template has it, but THE-INVESTIGATION.md's opening on line 97-124 does not mention scoring). Sync these.
- **In `SKILL.md**`: Add a note about pacing -- include a brief Monster transition beat between evaluation wrap-up and next challenge launch.
- **In `play-game.md**`: The scoring explanation in the opening dialogue (lines 89-98) is good. Verify it's consistent with THE-INVESTIGATION.md.

Key files to edit:

- [skills/onboardme/references/THE-INVESTIGATION.md](skills/onboardme/references/THE-INVESTIGATION.md) -- sync opening with scoring rules from play-game.md
- [skills/onboardme/SKILL.md](skills/onboardme/SKILL.md) -- add pacing guidance in gameplay loop
- [PROGRESS.md](PROGRESS.md) -- update task statuses

### 3. Update AGENTS.md with skill workflow

Add a section to `AGENTS.md` documenting:

- `**skills/onboardme/**` is the source of truth for the OnboardMe skill (SKILL.md, instructions, references, scripts)
- `**scripts/install-skill.sh**` syncs `skills/onboardme/` -> `.cursor/skills/onboardme/` for local testing
- After editing any skill file, run `bash scripts/install-skill.sh` to deploy changes
- Never edit `.cursor/skills/onboardme/` directly -- always edit in `skills/onboardme/`

### 4. Run install-skill.sh to sync

After all edits to skill files, run `bash scripts/install-skill.sh` to deploy to `.cursor/skills/onboardme/`.

### 5. Final playtest validation (2.5)

After fixes, mark 2.5 as ready for another playtest or mark Milestone 2 complete if the feedback fixes are sufficient.

---

## File Inventory

| File                                               | Status                              | Action                                     |
| -------------------------------------------------- | ----------------------------------- | ------------------------------------------ |
| `PROGRESS.md`                                      | Outdated                            | Update all task statuses                   |
| `AGENTS.md`                                        | Missing skill workflow              | Add skill source/sync documentation        |
| `skills/onboardme/references/THE-INVESTIGATION.md` | Has feedback fixes, missing scoring | Add scoring explanation to opening         |
| `skills/onboardme/SKILL.md`                        | Working                             | Add pacing guidance                        |
| `skills/onboardme/instructions/play-game.md`       | Has scoring explanation             | Verify consistency                         |
| `.cursor/skills/onboardme/*`                       | Mirror                              | Run `scripts/install-skill.sh` after edits |
