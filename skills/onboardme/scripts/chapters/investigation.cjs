/**
 * Chapter 1: The Investigation
 * Duration: ~20 minutes
 */

module.exports = {
  name: "The Investigation",
  number: 1,
  moodRange: ["dismissive", "annoyed"],
  memoryLog: '"Year 1. Clean architecture. SOLID principles. Hope."',

  // Critical rules returned to agent with every phase in this chapter
  rules: [
    "ASK BROAD, OPEN-ENDED QUESTIONS — never ask 'What language?' as a standalone question. Ask questions that require the player to demonstrate investigation: 'What kind of project is this? Tell me everything — language, type, framework, runtime.' One broad question is worth more than three narrow ones.",
    "SCORING MUST MATCH QUESTION BREADTH — if you ask a broad question, a one-word answer is 'partial' (1 commit). A comprehensive answer covering multiple aspects is 'correct' (2 commits). 'Deep' (3 commits) is ONLY for unprompted architectural insight. If the player answers everything in one shot, score it and move on — don't re-ask what they already covered.",
    "Each phase builds on the previous — don't re-ask what they already answered.",
    "Read manifest files, folder structure, and docs YOURSELF first, then quiz the player. Validate their answers against evidence you found.",
    "Use third-person language for the codebase — the player is investigating someone else's code.",
  ],

  phases: [
    {
      id: "identity",
      instruction:
        "Ask ONE broad question about project identity: 'What kind of project is this? Look at the root — manifest, folder structure — and tell me what they built here.' The player should identify language, app type (server/web app/CLI/library), framework, and runtime in their answer. If they only give partial info (e.g., just 'TypeScript'), push for more: 'TypeScript WHAT? A server? A CLI? What framework?' Score the COMPLETENESS of their answer, not each piece separately. If they nail it all in one answer, give 2 commits and move on — don't ask 3 more questions about things they already told you.",
      scoring:
        "partial = only identified 1-2 aspects (e.g., just 'TypeScript' or 'a server'). correct = identified language + type + framework (e.g., 'TypeScript API server using Hono on Bun'). deep = ONLY if they explain WHY technologies were chosen or identify architectural patterns unprompted.",
      tips: "Read package.json/Cargo.toml/go.mod first. If the player gives a comprehensive first answer, score it and move to the next phase — don't pad with follow-up questions they already answered.",
    },
    {
      id: "stack",
      instruction:
        "Ask ONE broad question about the technology stack: 'What's under the hood? Database, testing, external services — what are the moving parts?' The player should identify: database + ORM, testing setup, and key integrations/external services. If they're shallow, probe: 'You said PostgreSQL. HOW does this code talk to it? And what about tests — where do those live?' Score completeness.",
      scoring:
        "partial = identified 1-2 stack components superficially. correct = identified database + ORM, testing framework + location, and key integrations. deep = ONLY if they explain design trade-offs or integration patterns unprompted (e.g., WHY tests are split, WHY this ORM over raw SQL).",
      tips: "Check dependencies in project manifest. Cross-reference with actual source files. Look at docker-compose.yml for services, .env.example for integrations.",
    },
    {
      id: "docs",
      instruction:
        "Read the README and docs yourself, then ask ONE broad question: 'How do you run this thing? Dev server, tests, and what does it need from the environment?' The player should know: dev/run commands, test commands, required env vars, and any prerequisites. If they're vague, push: 'bun run WHAT? And what breaks if the env file is missing?' Score completeness. The README might lie — the package.json doesn't.",
      scoring:
        "partial = knows only 1 command or vague about requirements. correct = accurate run + test commands and knows required vs optional env vars. deep = ONLY if they identify outdated docs, discrepancies between README and actual commands, or explain the dev setup rationale.",
      tips: "Read README.md yourself first. Compare with package.json scripts and .env.example. Check for docker-compose.yml, Makefile, or CI configs.",
    },
    {
      id: "synthesis",
      instruction:
        "Player already told you: project type, tech stack, run commands. Do NOT ask them to repeat any of that. Ask ONE synthesis question: 'You've identified all the pieces. Now tell me — how does it all FIT TOGETHER? What happens when someone triggers the main workflow? How does data flow through this system?' If they just repeat facts, push back: 'You're listing components. I asked how they CONNECT.' Score the quality of their mental model.",
      scoring:
        "partial = just re-lists components without connections. correct = coherent data flow description connecting components (e.g., 'Cron triggers analysis flow → agents query APIs → results stored in PostgreSQL → notification sent via Telegram'). deep = ONLY if they identify design patterns, trade-offs, or architectural decisions unprompted.",
      tips: "If they just repeat facts, push for connections. Look for: data flow description, architectural patterns, design decisions.",
    },
  ],
};
