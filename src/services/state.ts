import { readJson } from "@/lib/fs.ts";
import { getProgressPath } from "@/lib/paths.ts";
import type { Progress } from "@/types/state.ts";

export async function readProgress(rootDir: string): Promise<Progress | null> {
	const progressPath = getProgressPath(rootDir);
	return readJson<Progress>(progressPath);
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
