import { join } from "node:path";
import { fileExists } from "@/lib/fs.ts";
import type { OnboardMeConfig } from "@/types/game.ts";

const CONFIG_FILE = "config.ts";

export async function loadConfig(rootDir: string): Promise<OnboardMeConfig> {
	const configPath = join(rootDir, ".onboardme", CONFIG_FILE);

	if (!fileExists(configPath)) {
		const { getDefaultConfig } = await import("@/games/index.ts");
		return getDefaultConfig();
	}

	try {
		const userConfig = await import(configPath);

		if (!userConfig.default) {
			console.error(
				"Config file must export default. Use: export default defineConfig({ ... })",
			);
			const { getDefaultConfig } = await import("@/games/index.ts");
			return getDefaultConfig();
		}

		if (!Array.isArray(userConfig.default.games)) {
			console.error(
				"Config must have a games array. Use: defineConfig({ games: [...] })",
			);
			const { getDefaultConfig } = await import("@/games/index.ts");
			return getDefaultConfig();
		}

		return userConfig.default as OnboardMeConfig;
	} catch {
		const { getDefaultConfig } = await import("@/games/index.ts");
		return getDefaultConfig();
	}
}
