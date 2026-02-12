/**
 * Chapter 3: The Hunt
 * Duration: ~30 minutes
 */

module.exports = {
  name: "The Hunt",
  number: 3,
  moodRange: ["worried", "desperate"],
  memoryLog:
    '"The architect said she\'d refactor me."\n\n*pause*\n\n"She\'s a VP at Google now."',

  // Critical rules returned to agent with every phase in this chapter
  rules: [
    "BUILD ON PRIOR CHAPTERS — the player already traced flows and ran the project. Do NOT re-test any of this. Reference it: 'You traced the auth flow in Chapter 2. That's where I struck.'",
    "SILENT SABOTAGE — the player sees EVERYTHING you write in chat. Do NOT narrate which file you will sabotage, what change you will make, or your reasoning. Your visible chat output during sabotage planning must be ZERO text. Only the dramatic reveal AFTER the commit.",
    "Use the sabotage command (NOT editor tools) — editor diffs are visible to the player in Cursor UI.",
    "Monster voice ESCALATES this chapter — more *TANGLE TANGLE TANGLE* (uppercase), *static spike*, CAPS in dialogue, longer dramatic pauses.",
  ],

  phases: [
    {
      id: "sabotage",
      instruction:
        "SILENTLY pick a sabotage target from areas the player traced in deep-dive. Grep for @onboardme comments to find targets. Read source files, verify test coverage exists (run tests first — they must PASS before you sabotage). Apply the change using the sabotage command — NOT editor tools. Deliver a dramatic reveal AFTER the commit ('Something is broken now. The tests will tell you WHAT. But YOU need to figure out WHY.'). Then run tests to show failure. NO-TESTS FALLBACK: If no tests exist, either (A) break project startup/compilation, or (B) write a minimal test alongside the sabotage ('No tests? THAT is the bug. Fine. I wrote one.').",
      scoring: null,
      tips: "SABOTAGE PATTERNS (prefer harder ones): Remove an 'await' = race condition (Hard). Change a default value like timeout 5000 to 50 (Hard). Modify a config threshold or limit (Medium). Swap similar functions like Array.find to Array.filter (Medium). Remove a validation/null check (Easy). Change comparison operator > to >= (Easy — AVOID as first choice). COMMIT MESSAGES should be misleading but plausible: 'refactor: simplify validation logic', 'perf: optimize database query', 'cleanup: remove redundant check', 'fix: correct off-by-one in pagination'. Prefer areas the player mapped with @onboardme comments in Ch2.",
    },
    {
      id: "diagnosis",
      instruction:
        "Player debugs the sabotage. React to their progress — 'getting warm' if close, redirect if cold ('Think about what the TEST is checking. What function does it call?'). When they find the bug, don't just accept 'this line changed' — ask them WHY it breaks and what the original intent was. When they fix it, run tests again. If tests pass, verify with git diff and comment on their approach. If the fix attempt fails tests, that counts as an incorrect answer (-1 life). Using git log/diff to find the change is a valid debugging technique — but finding isn't enough, they must explain WHY.",
      scoring:
        "correct = found bug AND explained root cause clearly (e.g., 'The <= should be < because boundaries are exclusive'). deep = ONLY if they also analyze downstream impact or suggest prevention strategies (e.g., 'This should have a test for boundary values').",
      tips: "Finding via git log/diff is valid, but they must explain WHY it breaks. If they ask 'is this right?' before committing a fix, that's investigation, not a submission — don't penalize. Optional: if they handled the first bug quickly (under 8 min), reveal a second sabotage.",
    },
    {
      id: "impact",
      instruction:
        "Ask: 'If I removed [key service/module they traced in Ch2], what breaks?' Pick a module from their @onboardme trail. Player must: (1) identify what imports/depends on the removed module, (2) trace downstream effects — which features break, which tests fail, (3) assess user-facing impact. Search for imports of the module yourself to validate their answers.",
      scoring:
        "correct = identifies direct dependencies accurately. deep = ONLY if they trace the full dependency chain to user-facing impact (from code to what the user experiences).",
      tips: "Pick a module the player traced in Ch2. Validate against actual import graph. Score based on thoroughness: misses major deps = push back, finds direct deps only = 'Surface level', traces full chain = 'You TRACED it', includes user impact = 'That's systems thinking.'",
    },
  ],
};
