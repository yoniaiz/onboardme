import { ExitCode, NotInitializedError } from "@/lib/errors.ts";
import { findOnboardMeRoot } from "@/lib/paths.ts";
import {
	calculateCompletionPercentage,
	formatTimePlayed,
	getGamesCompleted,
	getTotalGames,
	readProgress,
} from "@/services/state.ts";
import { loadManifest } from "@/services/validation.ts";
import { renderScreen } from "@/ui/render.tsx";
import {
	NoProgressScreen,
	NotStartedScreen,
	StatusScreen,
} from "@/ui/screens/index.ts";

export async function statusCommand(): Promise<number> {
	const rootDir = findOnboardMeRoot();

	if (!rootDir) {
		throw new NotInitializedError();
	}

	const progress = await readProgress(rootDir);
	const manifest = await loadManifest(rootDir);

	if (!progress) {
		renderScreen(<NoProgressScreen />);
		return ExitCode.Success;
	}

	if (!progress.startedAt) {
		renderScreen(<NotStartedScreen />);
		return ExitCode.Success;
	}

	const completion = calculateCompletionPercentage(progress);
	const gamesCompleted = getGamesCompleted(progress);
	const totalGames = getTotalGames(progress);
	const timePlayed = formatTimePlayed(progress);
	const projectName = manifest?.projectName ?? "Unknown Project";

	const games = Object.entries(progress.games).map(
		([gameId, gameProgress]) => ({
			gameId,
			status: gameProgress.status as "completed" | "in_progress" | "pending",
			score: gameProgress.score,
			maxScore: gameProgress.maxScore,
		}),
	);

	renderScreen(
		<StatusScreen
			projectName={projectName}
			completion={completion}
			totalScore={progress.totalScore}
			maxTotalScore={progress.maxTotalScore}
			gamesCompleted={gamesCompleted}
			totalGames={totalGames}
			timePlayed={timePlayed}
			currentGameId={progress.currentGameId}
			games={games}
		/>,
	);

	return ExitCode.Success;
}
