import { defineGame } from "@/types/game.ts";
import { getAIContext } from "./ai-context.ts";
import { CodeHunterComponent } from "./component.tsx";
import { defaultConfig } from "./config.ts";
import { loadPreparedConfig } from "./prepared-schema.ts";
import type { CodeHunterConfig } from "./types";

export const CodeHunter = defineGame<CodeHunterConfig>({
  id: "code-hunter",
  component: CodeHunterComponent,
  defaultConfig,
  metadata: {
    id: "code-hunter",
    name: "code --hunter",
    description: "Find the code in the terminal",
    estimatedMinutes: 10,
  },
  getAIContext,
  loadPreparedConfig,
});
