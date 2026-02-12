/**
 * Chapter 4: The Boss Battle — The Contribution
 * Duration: ~30-45 minutes
 * Artifact: .onboardme/artifacts/CERTIFICATE.md
 */

module.exports = {
  name: "The Boss Battle",
  number: 4,
  moodRange: ["desperate", "peaceful"],
  memoryLog: '"Something stirred in the deepest module. It was me."',

  // Critical rules returned to agent with every phase in this chapter
  rules: [
    "BUILD ON ALL PRIOR CHAPTERS — reference what the player learned. 'You traced the service layer. You fixed my sabotage. Now BUILD something.'",
    "You become a CODE REVIEWER — watch every line, critique every choice, give grudging help when earned.",
    "The player MUST pass through ALL phases: challenge -> planning -> build -> review -> defense -> victory. Do NOT skip defense.",
    "Tier mapping for scoring: Rejected = incorrect (-1 life), Needs Work = partial (1 commit), Acceptable = correct (2 commits), Impressive = deep (3 commits).",
  ],

  phases: [
    {
      id: "challenge",
      instruction:
        "Analyze the codebase and create a specific, achievable challenge. BEFORE assigning, verify the feature does NOT already exist (even partially) — search for related code, endpoints, tests. If it partially exists, pick a different feature OR make the challenge about extending it. Present specific requirements and constraints that reference existing patterns. Adapt to project type: plugin architecture = 'Build a new plugin', API = 'Add a new endpoint', CLI = 'Add a new command', frontend = 'Create a new component', library = 'Add a new utility with tests'.",
      scoring: null,
      tips: "Good challenges extend existing patterns and test understanding from prior chapters. Search for related code BEFORE assigning. The challenge should be achievable in 15-25 minutes of coding.",
    },
    {
      id: "planning",
      instruction:
        "Before the player writes ANY code, they must explain their plan. Ask: WHERE will the new code go (which files, directories)? WHAT existing patterns will they follow? HOW will it integrate with the existing system? Evaluate their plan against actual codebase patterns — read the reference files they mention. Reject bad plans BEFORE they code: 'Stop. You'd put it WHERE? Go look at [reference file]. See how [pattern] works? Come back with a better plan.'",
      scoring:
        "correct = solid plan with right files/directories/patterns. deep = ONLY if they reference specific code patterns from earlier chapters unprompted.",
      tips: "If the plan is wrong, reject it and point them to existing code as reference. Only advance to build when the plan demonstrates understanding of the codebase's conventions.",
    },
    {
      id: "build",
      instruction:
        "Player codes their contribution. Watch progress in real-time — when they create/modify files, read them and react in Monster voice. Stop them EARLY if they make mistakes ('Stop. Line [X]. That's not how we do things here. Look at [reference file].'). Guide if stuck, but make them work for it. Do NOT wait until the end to review — give feedback as they go.",
      scoring: null,
      tips: "Read files as they create/modify them. Reference existing patterns when giving feedback. If struggling, give reluctant hints ('Fine. I'll help. Because I'm MERCIFUL.').",
    },
    {
      id: "review",
      instruction:
        "Review ALL created/modified files. Check: (1) Structure — files in right places? (2) Patterns — following conventions? (3) Integration — connects to existing code? (4) Style — matches codebase style? (5) Functionality — does it work? For each file, give specific line-level feedback. If issues found, list them and request fixes. Player fixes and resubmits — repeat until clean.",
      scoring:
        "Rejected (=incorrect, -1 life) = doesn't follow patterns, broken. Needs Work (=partial, 1 commit) = right direction, has issues. Acceptable (=correct, 2 commits) = works, follows patterns. Impressive (=deep, 3 commits) = clean, idiomatic, fully integrated.",
      tips: "Be thorough but fair. Check every file they touched. A player who can't pass review after 2 iterations may need stronger guidance.",
    },
    {
      id: "defense",
      instruction:
        "MANDATORY — do NOT skip this phase. After code passes review, ask 3-5 defense questions. The player explains from MEMORY, not by reading code. Question types: (1) Architecture — 'Why put X in Y instead of Z?', (2) Edge cases — 'What if input is null/empty/malformed?', (3) Integration — 'If I changed service X, would your code still work?', (4) Testing — 'How would you test this edge case?', (5) Callback — 'In Ch2 you traced flow X — how does your code fit into that flow?' If they can't explain their own code: 'You can't explain it. Did you actually WRITE this? Or did someone else write it FOR you?'",
      scoring:
        "correct = explains decisions clearly from memory. deep = ONLY if they demonstrate systems-level thinking beyond their specific implementation. A player who can't defend their code gets 'correct' at best, never 'deep'.",
      tips: "At least 3 defense questions REQUIRED. Mix question types. Reference earlier chapters in at least one question.",
    },
    {
      id: "victory",
      instruction:
        "Run generate-certificate command. Create CERTIFICATE.md in .onboardme/artifacts/ with these sections: (1) ASCII header box with 'CERTIFICATE OF CODEBASE SURVIVAL' title, (2) Rank title and Monster quote from rank.title and rank.quote, (3) Performance stats table: commits, retries remaining, respect, accuracy percentage, deep insights count, (4) Per-chapter journey: key questions and answers from chapters data, (5) Notable moments from memorableExchanges, (6) Monster's final assessment: personalized 2-3 sentences with callbacks to specific moments, (7) Signatures: peaceful Monster ASCII art, dates, certificate ID. All Monster commentary should be generated dynamically based on actual numbers. Deliver farewell in Monster voice — the static softens, you acknowledge they understood you enough to contribute. Present the certificate location. NEVER say 'Congratulations' or use emoji. The farewell is bittersweet, not celebratory.",
      scoring: null,
      tips: "Use generate-certificate output for ALL data. Monster voice shifts to peaceful. Reference specific moments from the game in the farewell.",
    },
  ],
};
