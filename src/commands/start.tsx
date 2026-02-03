import { bootstrapGames } from "@/core/bootstrap.ts";
import { GameEngine } from "@/core/engine.ts";
import { ExitCode, NotInitializedError } from "@/lib/errors.ts";
import { findOnboardMeRoot } from "@/lib/paths.ts";
import { getOrCreateProgress, writeProgress } from "@/services/state.ts";
import { validateManifest } from "@/services/validation.ts";
import { createInitialProgress } from "@/types/state.ts";
import {
	isInteractiveTerminal,
	renderInteractiveScreen,
	renderScreen,
} from "@/ui/render.tsx";
import {
	EngineInitErrorScreen,
	GameScreen,
	SessionCompleteScreen,
	ValidationFailedScreen,
} from "@/ui/screens/index.ts";

export async function startCommand(): Promise<number> {
	const rootDir = findOnboardMeRoot();

	if (!rootDir) {
		throw new NotInitializedError();
	}

	const validationResult = await validateManifest(rootDir);

	if (!validationResult.valid) {
		renderScreen(<ValidationFailedScreen errors={validationResult.errors} />);
		return ExitCode.ValidationFailed;
	}

	bootstrapGames();

	const engine = new GameEngine({ rootDir });
	const initResult = await engine.initialize();

	if (!initResult.success) {
		renderScreen(<EngineInitErrorScreen errors={initResult.errors} />);
		return ExitCode.GeneralError;
	}

	const progress = await getOrCreateProgress(rootDir);
	const totalGames = initResult.games.length;

	if (totalGames > 0 && progress.currentGameIndex >= totalGames) {
		await writeProgress(rootDir, createInitialProgress());
	}

	if (!isInteractiveTerminal()) {
		console.error(
			"Error: onboardme start requires an interactive terminal.\n" +
				"Please run this command directly in your terminal, not via a script or subprocess.",
		);
		return ExitCode.GeneralError;
	}

	try {
		await renderInteractiveScreen<void>((resolve) => (
			<GameScreen engine={engine} onComplete={resolve} />
		));
	} catch (error) {
		console.error("Game error:", error);
		return ExitCode.GameError;
	}

	const sessionProgress = engine.getProgress();

	renderScreen(
		<SessionCompleteScreen
			totalCommits={sessionProgress.sessionStats.totalCommits}
			correctAnswers={sessionProgress.sessionStats.correctAnswers}
			totalQuestions={sessionProgress.sessionStats.questionsAnswered}
			longestStreak={sessionProgress.sessionStats.longestCleanStreak}
		/>,
	);

	return ExitCode.Success;
}
