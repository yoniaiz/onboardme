import { readJson, writeJson } from "@/lib/fs.ts";
import { getProgressPath } from "@/lib/paths.ts";
import type { GameResult } from "@/types/game.ts";
import { createInitialProgress, type Progress } from "@/types/state.ts";

export async function readProgress(rootDir: string): Promise<Progress | null> {
	const progressPath = getProgressPath(rootDir);
	return readJson<Progress>(progressPath);
}

export async function writeProgress(
	rootDir: string,
	progress: Progress,
): Promise<void> {
	const progressPath = getProgressPath(rootDir);
	await writeJson(progressPath, progress);
}

function migrateProgress(progress: Partial<Progress>): Progress {
	const defaults = createInitialProgress();
	return {
		version: progress.version ?? defaults.version,
		startedAt: progress.startedAt ?? defaults.startedAt,
		lastPlayedAt: progress.lastPlayedAt ?? defaults.lastPlayedAt,
		totalScore: progress.totalScore ?? defaults.totalScore,
		maxTotalScore: progress.maxTotalScore ?? defaults.maxTotalScore,
		currentGameId: progress.currentGameId ?? defaults.currentGameId,
		currentGameIndex: progress.currentGameIndex ?? defaults.currentGameIndex,
		currentQuestionIndex:
			progress.currentQuestionIndex ?? defaults.currentQuestionIndex,
		games: progress.games ?? defaults.games,
		stats: progress.stats ?? defaults.stats,
		checkpoint: progress.checkpoint ?? defaults.checkpoint,
	};
}

export async function getOrCreateProgress(rootDir: string): Promise<Progress> {
	const existing = await readProgress(rootDir);
	if (existing) {
		return migrateProgress(existing);
	}
	const initial = createInitialProgress();
	await writeProgress(rootDir, initial);
	return initial;
}

export async function startGame(
	rootDir: string,
	gameId: string,
): Promise<void> {
	const progress = await getOrCreateProgress(rootDir);
	const now = new Date().toISOString();

	if (!progress.startedAt) {
		progress.startedAt = now;
	}
	progress.lastPlayedAt = now;
	progress.currentGameId = gameId;
	progress.currentQuestionIndex = 0;

	const existingGame = progress.games[gameId];
	progress.games[gameId] = {
		gameId,
		status: "in_progress",
		score: existingGame?.score ?? 0,
		maxScore: existingGame?.maxScore ?? 0,
		startedAt: existingGame?.startedAt ?? now,
		completedAt: null,
		currentCheckpoint: null,
		currentQuestionIndex: 0,
	};

	await writeProgress(rootDir, progress);
}

export async function completeGame(
	rootDir: string,
	gameId: string,
	result: GameResult,
): Promise<void> {
	const progress = await getOrCreateProgress(rootDir);
	const now = new Date().toISOString();

	progress.lastPlayedAt = now;
	progress.totalScore += result.score;

	const game = progress.games[gameId];
	if (game) {
		game.status = "completed";
		game.completedAt = now;
		game.score = result.score;
		game.maxScore = result.maxScore;
	}

	progress.currentGameIndex++;
	progress.currentQuestionIndex = 0;
	progress.checkpoint.canResume = false;
	progress.checkpoint.resumePoint = null;

	await writeProgress(rootDir, progress);
}

export async function advanceQuestion(rootDir: string): Promise<void> {
	const progress = await getOrCreateProgress(rootDir);
	progress.currentQuestionIndex++;

	const currentGame = progress.currentGameId
		? progress.games[progress.currentGameId]
		: null;
	if (currentGame) {
		currentGame.currentQuestionIndex = progress.currentQuestionIndex;
	}

	progress.lastPlayedAt = new Date().toISOString();
	await writeProgress(rootDir, progress);
}

export async function recordAnswer(
	rootDir: string,
	correct: boolean,
	commits: number,
	timeMs: number,
): Promise<void> {
	const progress = await getOrCreateProgress(rootDir);

	progress.stats.questionsAnswered++;
	progress.stats.totalCommits += commits;
	progress.stats.totalTime += timeMs;

	if (correct) {
		progress.stats.correctAnswers++;
		progress.stats.currentCleanStreak++;
		if (progress.stats.currentCleanStreak > progress.stats.longestCleanStreak) {
			progress.stats.longestCleanStreak = progress.stats.currentCleanStreak;
		}
	} else {
		progress.stats.currentCleanStreak = 0;
	}

	progress.lastPlayedAt = new Date().toISOString();
	await writeProgress(rootDir, progress);
}

export async function recordHintUsed(rootDir: string): Promise<void> {
	const progress = await getOrCreateProgress(rootDir);
	progress.stats.hintsUsed++;
	progress.lastPlayedAt = new Date().toISOString();
	await writeProgress(rootDir, progress);
}

export async function saveCheckpoint(rootDir: string): Promise<void> {
	const progress = await getOrCreateProgress(rootDir);

	if (!progress.currentGameId) {
		return;
	}

	progress.checkpoint = {
		canResume: true,
		resumePoint: {
			gameId: progress.currentGameId,
			questionIndex: progress.currentQuestionIndex,
			savedAt: new Date().toISOString(),
		},
	};

	await writeProgress(rootDir, progress);
}

export async function canResume(rootDir: string): Promise<boolean> {
	const progress = await readProgress(rootDir);
	return progress?.checkpoint?.canResume ?? false;
}

export async function clearCheckpoint(rootDir: string): Promise<void> {
	const progress = await getOrCreateProgress(rootDir);
	progress.checkpoint = {
		canResume: false,
		resumePoint: null,
	};
	await writeProgress(rootDir, progress);
}

export function calculateCompletionPercentage(progress: Progress): number {
	if (progress.maxTotalScore === 0) {
		return 0;
	}
	return Math.round((progress.totalScore / progress.maxTotalScore) * 100);
}

export function getGamesCompleted(progress: Progress): number {
	return Object.values(progress.games).filter((g) => g.status === "completed")
		.length;
}

export function getTotalGames(progress: Progress): number {
	return Object.keys(progress.games).length;
}

export function formatTimePlayed(progress: Progress): string {
	if (!progress.startedAt || !progress.lastPlayedAt) {
		return "0m";
	}

	const start = new Date(progress.startedAt).getTime();
	const last = new Date(progress.lastPlayedAt).getTime();
	const diffMs = last - start;
	const diffMinutes = Math.floor(diffMs / 60000);

	if (diffMinutes < 60) {
		return `${diffMinutes}m`;
	}

	const hours = Math.floor(diffMinutes / 60);
	const minutes = diffMinutes % 60;
	return `${hours}h ${minutes}m`;
}
