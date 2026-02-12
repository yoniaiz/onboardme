# Playtest plan review
_Exported on 2/11/2026 at 14:04:54 GMT+2 from Cursor (2.4.31)_

---

**User**

@playtest_2_fixes_b372c590.plan.md (1-214) i want you to review this plan very carfually, understand the context, the improvments, our correct skill and gameplay, and only if it makes perfect sense start implementing

---

**Cursor**

I'll start by thoroughly reading the current state of all files mentioned in the plan to understand the context and validate each change before implementing.

Now let me read the chapter reference files to understand the current artifact references and sabotage sections.

Now let me read the state-manager.cjs to verify the tone default and `update-mood` ceiling logic.

I've now read every file referenced in the plan. Here's my review:

**The plan is sound and well-motivated.** Every change traces back to a specific playtest regression. Let me validate each task:

1. **Rename + Character Lock** -- Confirmed: `COMPACTION-PROOF RULES` header at line 185, `Character Lock at Transitions` at lines 41-53. Merging these and removing meta-jargon makes sense.
2. **State-Write Restrictions** -- Confirmed: `update-mood` already has chapter ceilings (lines 317-323 of state-manager.cjs) but SKILL.md line 254 actively encourages direct writes. This is contradictory and needs fixing.
3. **Remove Tone System** -- Confirmed: Tone section at SKILL.md 110-131, prepare-game Step 7 at lines 187-220, play-game Step 2.5 at lines 48-51. The tone system was adding complexity without value.
4. **Remove Per-Chapter Artifacts** -- Confirmed all artifact references: CASE_FILE in Investigation, FLOW_MAP in Deep Dive, IMPACT_ANALYSIS in Hunt. Keeping only CERTIFICATE.md simplifies significantly.
5. **Fix Sabotage Table** -- Confirmed: comparison operator is first in the table at line 57. Reordering and strengthening silent sabotage guidance is well-motivated.
6. **Strengthen Transitions** -- Confirmed: Step 2.5 needs removal, Step 2.6 references non-existent "Emotional Arc" section.
7. **Certificate in Monster Voice** -- Confirmed: Phase 5 at line 571+ needs delivery instructions.

All line references check out. Implementing now.

Starting with Task 1 -- restructuring SKILL.md. I'll remove the standalone Character Lock section, rename the COMPACTION-PROOF RULES section, and add Character Lock as the first subsection of the new MANDATORY RULES.

Now rename COMPACTION-PROOF RULES and replace the meta-explanation with Character Lock as the first subsection:

Task 2 -- Add State-Write Restrictions after the Script Identity Rule, and fix the Mood System section:

Now update the Mood System section to note that `update-mood` manages respectLevel:

Task 3 -- Remove Tone System. First, remove from SKILL.md:

Add "Tone: Spicy" to the Your Character section:

Remove tone reference from the Game Flow section:

Remove the tone change reference from Game Flow:

Now remove Step 2.5 (Read Tone Preference) from play-game.md:

Now remove Step 7 (Tone Selection) from prepare-game.md:

Also update the auto-prepare reference in play-game.md that mentions "select tone":

Now change the default tone in state-manager.cjs:

Task 4 -- Remove Per-Chapter Artifacts. First, simplify the File Artifacts table in SKILL.md:

Now update the Chapter End Checklist in SKILL.md to remove the artifact step:

Now update the remaining checklist numbering:

Now update play-game.md -- remove the CASE_FILE reference and artifact references in the Important section:

Now update play-game.md Step 5 reference to "Compaction-Proof Rules" (now "Mandatory Rules"):

Update play-game.md Step 6 reference:

Now tackle THE-INVESTIGATION.md -- remove artifact header, CASE_FILE creation, and all CASE_FILE references:

Remove the "Opening: Create the Case File" section -- replace with just the opening dialogue:

Remove the "Update CASE_FILE.md" reference in Phase 1:

Remove the "Update CASE_FILE.md" block after the Phase 1 example exchange:

Remove "For each discovery, update CASE_FILE.md with:" in Phase 2:

Now update the Closing section -- remove the CASE_FILE finalization, keep the ceremony:

Fix the remaining step number in Investigation closing:

Now tackle THE-DEEP-DIVE.md -- remove artifact header:

Reframe the "You and the player build FLOW_MAP.md together" line:

Remove the "Opening: Create FLOW_MAP.md" section and replace with simpler opening:

Remove "Update FLOW_MAP.md with an ASCII flow diagram after each correct step" from Phase 1:

Remove the "Update FLOW_MAP.md with ASCII diagram after correct trace" block:

Remove "Build an ASCII relationship diagram in FLOW_MAP.md" from Phase 2:

Remove "Update FLOW_MAP.md with discovered test insights" from Phase 3:

Now update the Closing section -- remove FLOW_MAP finalization:

Fix the remaining step numbers in Deep Dive closing:

Now THE-HUNT.md -- remove artifact header:

Remove "Update IMPACT_ANALYSIS.md with dependency analysis." from Phase 3:

Remove the IMPACT_ANALYSIS.md creation template from the closing section:

Fix the remaining step numbers in Hunt closing:

Also remove the "Update BOSS_BATTLE.md with review details." reference in THE-BOSS-BATTLE.md Phase 3:

Also remove the `respectLevel` tracking from chapter state management sections since `update-mood` handles it. Let me update the investigation state management section:

Update Deep Dive state management:

Update Hunt state management:

Update Boss Battle state management:

Task 5 -- Fix Sabotage Guidance in THE-HUNT.md. First, reorder the sabotage table:

Now update line 105 to remove "For Spicy/Full-Monster:" prefix:

Strengthen the silent sabotage section:

Task 6 -- Strengthen Chapter Transition Rules in play-game.md. Let me read the current state of Step 6 first:

Add the transition rule after the "DO NOT" block:

Fix Step 2.6 -- remove reference to non-existent "Emotional Arc" section:

Task 7 -- Certificate Presentation in Monster Voice. Add delivery instructions after step 7 in Phase 5 of THE-BOSS-BATTLE.md:

Task 8 -- Update PROGRESS.md with Milestone 10:

Now add Milestone 10 section before the Completed Milestones:

Update the last updated line:

---

**User**

why do we still have artifact in @skills/onboardme/references/THE-HANDS-ON.md ?

---

**Cursor**

Good catch. Let me check what's in there.

Line 4 still has an artifact header. The plan didn't explicitly list THE-HANDS-ON.md because its original artifact table entry was "_(none)_ — Running project is the proof", but it still has a leftover `_Artifact:_` line in the header. Let me clean it up for consistency.

Now all 5 chapter reference files are consistent -- no artifact headers except THE-BOSS-BATTLE.md which correctly references `CERTIFICATE.md`. Let me also verify there are no other stray artifact references across the codebase.

Two more FLOW_MAP.md references in THE-DEEP-DIVE.md. Let me clean those up.

Now let me also check PROGRESS.md and other docs for stale artifact references:

The references in `context/`, `PROGRESS.md`, `PRD.md`, `README.md`, etc. are historical documentation -- they describe the design history and don't affect gameplay. The skill files (under `skills/onboardme/`) are clean now, which is what matters. The skill is what the agent reads during gameplay.

All artifact references are now removed from the active skill files. Good catch on THE-HANDS-ON.md -- the plan missed it since the original artifacts table showed "_(none)_" for Ch2, but the file itself still had an artifact header line.

