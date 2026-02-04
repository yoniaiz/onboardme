import { loadConfig } from "@/core/config.ts";
import { ExitCode, NotInitializedError } from "@/lib/errors.ts";
import { findOnboardMeRoot } from "@/lib/paths.ts";
import { GameOrchestrator } from "@/ui/orchestrator/game-orchestrator.tsx";
import {
	isInteractiveTerminal,
	renderInteractiveScreen,
} from "@/ui/render.tsx";

export async function startCommand(): Promise<number> {
	const rootDir = findOnboardMeRoot();

	if (!rootDir) {
		throw new NotInitializedError();
	}

	if (!isInteractiveTerminal()) {
		console.error(
			"Error: onboardme start requires an interactive terminal.\n" +
				"Please run this command directly in your terminal, not via a script or subprocess.",
		);
		return ExitCode.GeneralError;
	}

	const config = await loadConfig(rootDir);

	try {
		await renderInteractiveScreen<void>((resolve) => (
			<GameOrchestrator config={config} onSessionComplete={() => resolve()} />
		));
	} catch (error) {
		console.error("Game error:", error);
		return ExitCode.GameError;
	}

	return ExitCode.Success;
}
