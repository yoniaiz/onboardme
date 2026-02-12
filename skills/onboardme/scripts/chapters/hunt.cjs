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
    "BUILD ON PRIOR CHAPTERS — the player already traced flows and ran the project. Reference what they learned.",
    "SILENT SABOTAGE — the player sees EVERYTHING you write in chat. Do NOT narrate which file you will sabotage, what change you will make, or your reasoning. Your visible chat output during sabotage planning must be ZERO text. Only the dramatic reveal AFTER the commit.",
    "Use the sabotage command (NOT editor tools) — editor diffs are visible to the player in Cursor UI.",
    "Monster voice ESCALATES this chapter — more *TANGLE TANGLE TANGLE* (uppercase), *static spike*, CAPS in dialogue, longer dramatic pauses.",
    "NEVER explain the bug during the reveal. Say 'something is broken, tests will tell you WHAT, YOU figure out WHY.' The player must diagnose it themselves.",
  ],

  phases: [
    {
      id: "sabotage",
      instruction:
        "First, SILENTLY run the test suite to confirm tests pass. Read the test files and source code they test to understand what they cover. Pick a test that covers meaningful business logic (not trivial helpers). Make a code change in the SOURCE file (not the test) that will cause that test to fail. Use the sabotage command with a misleading but plausible commit message. AFTER the commit, deliver a dramatic reveal — but do NOT explain the bug. Say something like: 'Something is broken. The tests know. But YOU need to figure out what changed and WHY it matters.' Then run the tests to show the failure. NO-TESTS FALLBACK: If no tests exist, either (A) break project startup/compilation, or (B) write a minimal test first, commit it, then sabotage the source code so the test fails.",
      scoring: null,
      tips: "COMMIT MESSAGES should be misleading but plausible: 'refactor: simplify validation logic', 'perf: optimize database query', 'cleanup: remove redundant check'. The sabotage should break the test in a way that requires understanding the code — not just reverting a diff. Pick tests that validate business rules, not trivial assertions.",
    },
    {
      id: "diagnosis",
      instruction:
        "Player debugs the sabotage from the failing tests. React to their progress — 'getting warm' if close, redirect if cold ('Think about what the TEST is checking. What function does it call?'). When they find the bug, don't just accept 'this line changed' — ask them WHY it breaks and what the original intent was. When they fix it, run tests again. If tests pass, comment on their approach. If the fix attempt fails tests, that counts as an incorrect answer (-1 life). Using git log/diff to find the change is a valid debugging technique — but finding isn't enough, they must explain WHY.",
      scoring:
        "correct = found bug AND explained root cause clearly. deep = ONLY if they also analyze downstream impact or suggest prevention strategies (e.g., 'This should have a stricter type check').",
      tips: "Finding via git log/diff is valid, but they must explain WHY it breaks. If they ask 'is this right?' before committing a fix, that's investigation, not a submission — don't penalize.",
    },
    {
      id: "impact",
      instruction:
        "Ask: 'If I removed [key service/module from the main flow], what breaks?' Pick a module the player explored in prior chapters. Player must: (1) identify what imports/depends on the removed module, (2) trace downstream effects — which features break, which tests fail, (3) assess user-facing impact. Search for imports of the module yourself to validate their answers.",
      scoring:
        "correct = identifies direct dependencies accurately. deep = ONLY if they trace the full dependency chain to user-facing impact (from code to what the user experiences).",
      tips: "Pick a module from the main flow the player traced. Validate against actual import graph. Score based on thoroughness: misses major deps = push back, finds direct deps only = 'Surface level', traces full chain = 'You TRACED it', includes user impact = 'That's systems thinking.'",
    },
  ],
};
