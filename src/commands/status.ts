import boxen from "boxen";
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
import { colors, formatMuted, formatTitle, symbols } from "@/ui/theme.ts";

export async function statusCommand(): Promise<number> {
	const rootDir = findOnboardMeRoot();

	if (!rootDir) {
		throw new NotInitializedError();
	}

	const progress = await readProgress(rootDir);
	const manifest = await loadManifest(rootDir);

	if (!progress) {
		console.log(
			formatMuted("No progress data found. Run 'onboardme start' to begin."),
		);
		return ExitCode.Success;
	}

	if (!progress.startedAt) {
		const notStartedBox = boxen(
			`${formatTitle("OnboardMe Status")}\n\n` +
				`${colors.muted("Status:")} Not started\n\n` +
				`Run ${colors.primary("onboardme start")} to begin your onboarding journey!`,
			{
				padding: 1,
				borderStyle: "round",
				borderColor: "cyan",
			},
		);

		console.log(notStartedBox);
		return ExitCode.Success;
	}

	const completion = calculateCompletionPercentage(progress);
	const gamesCompleted = getGamesCompleted(progress);
	const totalGames = getTotalGames(progress);
	const timePlayed = formatTimePlayed(progress);

	const progressBar = createProgressBar(completion, 20);
	const projectName = manifest?.projectName ?? "Unknown Project";

	const statusBox = boxen(
		`${formatTitle("OnboardMe Status")}\n\n` +
			`${colors.muted("Project:")} ${projectName}\n` +
			`${colors.muted("Progress:")} ${progressBar} ${completion}%\n` +
			`${colors.muted("Score:")} ${progress.totalScore}/${progress.maxTotalScore}\n` +
			`${colors.muted("Games:")} ${gamesCompleted}/${totalGames} completed\n` +
			`${colors.muted("Time played:")} ${timePlayed}\n` +
			`${colors.muted("Current game:")} ${progress.currentGameId ?? "None"}`,
		{
			padding: 1,
			borderStyle: "round",
			borderColor: "cyan",
		},
	);

	console.log(statusBox);

	if (totalGames > 0) {
		console.log();
		console.log(formatTitle("Games:"));
		console.log();

		for (const [gameId, gameProgress] of Object.entries(progress.games)) {
			const statusIcon = getStatusIcon(gameProgress.status);
			const gameCompletion =
				gameProgress.maxScore > 0
					? Math.round((gameProgress.score / gameProgress.maxScore) * 100)
					: 0;

			console.log(`  ${statusIcon} ${gameId}`);
			console.log(
				`    ${formatMuted(`Score: ${gameProgress.score}/${gameProgress.maxScore} (${gameCompletion}%)`)}`,
			);
		}
	}

	return ExitCode.Success;
}

function createProgressBar(percentage: number, width: number): string {
	const filled = Math.round((percentage / 100) * width);
	const empty = width - filled;
	const filledBar = colors.primary("█".repeat(filled));
	const emptyBar = colors.muted("░".repeat(empty));
	return `[${filledBar}${emptyBar}]`;
}

function getStatusIcon(status: string): string {
	switch (status) {
		case "completed":
			return symbols.success;
		case "in_progress":
			return colors.primary("●");
		default:
			return colors.muted("○");
	}
}
