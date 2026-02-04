import { defineGame } from "@/types/game.ts";
import { getAIContext } from "./ai-context.ts";
import { FileDetectiveComponent } from "./component.tsx";
import { defaultConfig } from "./config.ts";
import type { FileDetectiveConfig } from "./types.ts";

export const FileDetective = defineGame<FileDetectiveConfig>({
	id: "file-detective",
	component: FileDetectiveComponent,
	defaultConfig,
	metadata: {
		id: "file-detective",
		name: "file --detective",
		description:
			"Investigate a codebase to identify its project type and stack",
		estimatedMinutes: 10,
	},
	getAIContext,
});
