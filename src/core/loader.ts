import { join } from "node:path";
import { getPreparedDir } from "@/lib/paths.ts";

const GAMES_DIR = "games";
const DATA_FILE = "data.json";

export function getGameDataPath(rootDir: string, gameId: string): string {
	return join(getPreparedDir(rootDir), GAMES_DIR, gameId, DATA_FILE);
}
