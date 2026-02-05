import { join } from "node:path";
import { fileExists } from "@/lib/fs.ts";
import type { GameInstance, OnboardMeConfig } from "@/types/game.ts";

const CONFIG_FILE = "config.ts";

export async function loadConfig(rootDir: string): Promise<OnboardMeConfig> {
	const configPath = join(rootDir, ".onboardme", CONFIG_FILE);

	if (!fileExists(configPath)) {
		const { getDefaultConfig } = await import("@/games/index.ts");
		return applyPreparedConfigs(rootDir, getDefaultConfig());
	}

	try {
		const userConfig = await import(configPath);

		if (!userConfig.default) {
			console.error(
				"Config file must export default. Use: export default defineConfig({ ... })",
			);
			const { getDefaultConfig } = await import("@/games/index.ts");
			return applyPreparedConfigs(rootDir, getDefaultConfig());
		}

		if (!Array.isArray(userConfig.default.games)) {
			console.error(
				"Config must have a games array. Use: defineConfig({ games: [...] })",
			);
			const { getDefaultConfig } = await import("@/games/index.ts");
			return applyPreparedConfigs(rootDir, getDefaultConfig());
		}

		return applyPreparedConfigs(rootDir, userConfig.default as OnboardMeConfig);
	} catch {
		const { getDefaultConfig } = await import("@/games/index.ts");
		return applyPreparedConfigs(rootDir, getDefaultConfig());
	}
}

async function applyPreparedConfigs(
	rootDir: string,
	config: OnboardMeConfig,
): Promise<OnboardMeConfig> {
	const updatedGames = await Promise.all(
		config.games.map((game) => applyGamePreparedConfig(rootDir, game)),
	);

	return { ...config, games: updatedGames };
}

async function applyGamePreparedConfig<TConfig>(
	rootDir: string,
	game: GameInstance<TConfig>,
): Promise<GameInstance<TConfig>> {
	if (!game.loadPreparedConfig) return game;

	const preparedConfig = await game.loadPreparedConfig(rootDir);
	if (!preparedConfig) return game;

	return { ...game, config: preparedConfig };
}
