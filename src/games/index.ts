import type { OnboardMeConfig } from "@/types/game.ts";
import { FileDetective } from "./file-detective/index.ts";

export { defineConfig, defineGame } from "@/types/game.ts";
export { FileDetective } from "./file-detective/index.ts";

export function getDefaultConfig(): OnboardMeConfig {
	return {
		games: [FileDetective()],
	};
}
