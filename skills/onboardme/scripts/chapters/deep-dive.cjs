/**
 * Chapter 2: The Deep Dive
 * Duration: ~30 minutes
 */

module.exports = {
  name: "The Deep Dive",
  number: 2,
  moodRange: ["dismissive", "worried"],
  memoryLog:
    '"Just this one shortcut. We\'ll refactor later."\n\n*crackle*\n\n"They never did."\n\n*tangle*\n\n"The shortcuts multiplied. The TODOs grew. Comments began to lie."',

  // Critical rules returned to agent with every phase in this chapter
  rules: [
    "BUILD ON CHAPTER 1 — the player already identified project type, tech stack, framework, and commands. Do NOT re-ask any of that. Reference what they learned: 'You said this was Express with PostgreSQL. Let's see if you can make it LIVE.'",
    "ADAPT TO PROJECT TYPE — read identity.type from knowledge file. Server=hit endpoint, web app=open browser, CLI=run command, library=run tests. NEVER assume a browser or specific tooling.",
    "This chapter is COLLABORATIVE — after bootup, you become a reluctant collaborator, reading files alongside the player, confirming steps, pointing at code.",
    "Use ASCII text diagrams (A -> B -> C with vertical bars for layers). Do NOT use Mermaid syntax.",
  ],

  phases: [
    {
      id: "trace",
      instruction:
        "First, challenge the player to get the project running locally. Read identity.type from knowledge file and adapt: server=hit endpoint, web app=open browser, CLI=run command, library=run tests. Do NOT give them the command — they must discover it from their Ch1 investigation. If they get it running instantly, keep bootup brief — score it and move on. Once running, introduce the @onboardme comment convention. Player picks a user action from the running project and marks each code layer with // @onboardme [step] [description] comments. Read entry point files yourself to know the correct path — NEVER pick a stub or partial flow. When player says done, grep for @onboardme to validate their trail. Check step ordering, layer completeness, and description accuracy.",
      scoring:
        "Boot: correct = project running successfully. deep = runs AND identifies unexpected behavior or config implications. Trace: correct = complete trail through all layers. deep = ONLY if they trace alternate paths, caching, or error handling.",
      tips: "For bootup errors: react in character ('MODULE_NOT_FOUND... did you forget something?'). For trace: read the entry point files yourself first. The @onboardme comment syntax adapts to language: // for JS/TS, # for Python, -- for SQL. If player can't run the project at all (env issues), pivot to code exploration — read the code to understand what it WOULD do.",
    },
    {
      id: "entities",
      instruction:
        "Ask player to map entity relationships. Search for model/type/schema files in the codebase, identify 3-5 key entities, present them. Player investigates relationships (read model files, look at foreign keys, check imports). For each pair, determine: one-to-one, one-to-many, many-to-many. Read model files yourself to validate. If player gets a relationship wrong, challenge them: 'Check again. How many [Entity B] can one [Entity A] have?'",
      scoring:
        "correct = accurate relationship mapping. deep = ONLY if they explain design rationale (e.g., why no foreign keys, why this denormalized structure).",
      tips: "Search for model/schema/type files in the codebase. Present 3-5 entities and have them map pairs. Validate against actual source code.",
    },
    {
      id: "tests",
      instruction:
        "Ask player to extract business rules from tests. Search for test files, present categories and counts. Frame tests as 'promises' — behaviors that MUST stay true. Ask them to find validation rules, edge cases, and business logic from test assertions. If NO tests exist, react dramatically ('NO. TESTS.') then pivot — have the player infer business rules from validation logic, error handling, and conditional branches in the source code.",
      scoring:
        "correct = accurate rule extraction from tests. deep = ONLY if they connect rules to broader system behavior or identify coverage gaps.",
      tips: "If no tests exist, pivot to inferring rules from validation logic and error handling in source code. Present test counts and categories to frame the challenge.",
    },
  ],
};
