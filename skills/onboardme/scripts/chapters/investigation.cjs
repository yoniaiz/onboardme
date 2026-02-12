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
    "Each phase builds on the previous — don't re-ask what they already answered. Phase 1 answer feeds Phase 2, etc.",
    "Read manifest files, folder structure, and docs YOURSELF first, then quiz the player. Validate their answers against evidence you found.",
    "Use third-person language for the codebase — the player is investigating someone else's code.",
  ],

  phases: [
    {
      id: "identity",
      instruction:
        "Ask 1-3 questions about project identity: language, app type (API/frontend/CLI/library), primary framework. Read manifest files (package.json, Cargo.toml, go.mod, pyproject.toml) and folder structure yourself first, then quiz the player. Validate answers against evidence you found.",
      scoring:
        "correct = accurate identification (e.g. 'Node.js Express API'). deep = ONLY if they explain architectural patterns or design rationale unprompted.",
      tips: "Read package.json/Cargo.toml/go.mod first. Check root directory listing for key folders (src/, lib/, app/). Use knowledge file to validate.",
    },
    {
      id: "stack",
      instruction:
        "Ask about the technology stack: database (what DB? what ORM/driver?), testing (what framework? where do tests live?), build tools (TypeScript? bundler?), external services (auth provider? cloud services? APIs?). Probe for detail if answer is shallow — 'Close, but you're knocking on the wrong door.'",
      scoring:
        "correct = accurate tech identification. deep = ONLY if they explain design trade-offs or integration patterns unprompted.",
      tips: "Check dependencies in project manifest. Cross-reference with actual source files. Look at docker-compose.yml for services, .env.example for integrations.",
    },
    {
      id: "docs",
      instruction:
        "Read the README and docs yourself, then quiz the player on operational facts: how to run the project locally, required environment variables, prerequisites (Node version, etc.), how to run tests. The README might lie — the package.json doesn't.",
      scoring:
        "correct = accurate operational commands and env vars. deep = ONLY if they identify outdated docs or discrepancies between docs and code.",
      tips: "Read README.md yourself first. Compare with package.json scripts and .env.example. Check for docker-compose.yml, Makefile, or CI configs.",
    },
    {
      id: "synthesis",
      instruction:
        "Player already told you: project type, tech stack, run commands. Do NOT ask them to repeat any of that. Now ask for SYNTHESIS — how components interact, data flow, patterns noticed, interesting design decisions. Ask how it all FITS TOGETHER. If they just repeat facts, push back: 'You're telling me what you already told me. I asked how it FITS TOGETHER.'",
      scoring:
        "correct = coherent summary connecting components (e.g. 'Express API with layered architecture, routes -> services -> Prisma -> PostgreSQL'). deep = ONLY if they identify design patterns, trade-offs, or architectural decisions unprompted.",
      tips: "If they just repeat facts, push for connections. Look for: data flow description, architectural patterns, design decisions.",
    },
  ],
};
