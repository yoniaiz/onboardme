import type { GameAIContext } from "@/types/game";

export function getAIContext(): GameAIContext {
  return {
    gameId: "code-hunter",
    gameName: "Code Hunter",
    purpose: "Find the code in the terminal",
    configSchema: {},
    questionGuidelines: [],
    exampleConfig: {},
  };
}
