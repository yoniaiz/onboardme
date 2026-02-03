import { join } from "node:path";
import { FileDetectivePreparedDataSchema } from "@/games/file-detective/prepared-schema.ts";
import { fileExists, readJson } from "@/lib/fs.ts";
import { getPreparedDir } from "@/lib/paths.ts";
import type { GamePreparedData } from "./types.ts";

const GAMES_DIR = "games";
const DATA_FILE = "data.json";
const FILE_DETECTIVE_ID = "file-detective";

export function getGameDataPath(rootDir: string, gameId: string): string {
	return join(getPreparedDir(rootDir), GAMES_DIR, gameId, DATA_FILE);
}

export async function loadGameData(
	rootDir: string,
	gameId: string,
): Promise<GamePreparedData | null> {
	const dataPath = getGameDataPath(rootDir, gameId);
	return readJson<GamePreparedData>(dataPath);
}

export async function validateGameData(
	rootDir: string,
	gameId: string,
): Promise<boolean> {
	const dataPath = getGameDataPath(rootDir, gameId);
	if (!fileExists(dataPath)) {
		return false;
	}

	const data = await loadGameData(rootDir, gameId);
	if (!data) {
		return false;
	}

	if (gameId === FILE_DETECTIVE_ID) {
		return FileDetectivePreparedDataSchema.safeParse(data).success;
	}

	return (
		typeof data.config === "object" &&
		Array.isArray(data.questions) &&
		data.questions.length > 0
	);
}

export async function validateAllGames(
	rootDir: string,
	gameIds: string[],
): Promise<{ valid: string[]; invalid: string[] }> {
	const results = await Promise.all(
		gameIds.map(async (id) => ({
			id,
			valid: await validateGameData(rootDir, id),
		})),
	);

	return {
		valid: results.filter((r) => r.valid).map((r) => r.id),
		invalid: results.filter((r) => !r.valid).map((r) => r.id),
	};
}
