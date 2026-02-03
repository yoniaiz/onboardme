import { join } from "node:path";
import { z } from "zod";
import { fileExists, readJson } from "@/lib/fs.ts";
import { getTemplateDir } from "@/lib/paths.ts";
import type { Manifest } from "@/types/manifest.ts";
import type {
	GameResolutionResult,
	ResolvedGame,
	Template,
	TemplateLoadResult,
} from "@/types/template.ts";

const TEMPLATE_FILE = "template.json";
const BOSS_GAME_ID = "spaghetti-monster";

const TemplateGameSchema = z.object({
	id: z.string().min(1),
	options: z.record(z.string(), z.unknown()).optional(),
});

const TemplateSchema = z.object({
	games: z.array(TemplateGameSchema).min(1),
});

export function getDefaultTemplate(): Template {
	return {
		games: [
			{ id: "file-detective" },
			{ id: "flow-trace" },
			{ id: "grep-hunt" },
			{ id: "spaghetti-monster" },
		],
	};
}

export async function loadTemplate(
	rootDir: string,
): Promise<TemplateLoadResult> {
	const templateDir = getTemplateDir(rootDir);
	const templatePath = join(templateDir, TEMPLATE_FILE);

	if (!fileExists(templatePath)) {
		return {
			template: getDefaultTemplate(),
			source: "default",
		};
	}

	let templateData: unknown;
	try {
		templateData = await readJson<unknown>(templatePath);
	} catch {
		return {
			template: getDefaultTemplate(),
			source: "default",
		};
	}

	if (!templateData) {
		return {
			template: getDefaultTemplate(),
			source: "default",
		};
	}

	const result = TemplateSchema.safeParse(templateData);

	if (!result.success) {
		return {
			template: getDefaultTemplate(),
			source: "default",
		};
	}

	return {
		template: result.data,
		source: "user",
	};
}

export function resolveGameOrder(
	template: Template,
	manifest: Manifest,
): GameResolutionResult {
	const errors: string[] = [];
	const resolvedGames: ResolvedGame[] = [];
	const manifestGamesMap = new Map(
		manifest.games.map((game) => [game.id, game]),
	);

	let bossGame: ResolvedGame | null = null;

	for (let i = 0; i < template.games.length; i++) {
		const templateGame = template.games[i];
		const manifestGame = manifestGamesMap.get(templateGame.id);

		if (!manifestGame) {
			errors.push(
				`Game "${templateGame.id}" not found in manifest. Run 'prepare game' skill to generate it.`,
			);
			continue;
		}

		const resolvedGame: ResolvedGame = {
			id: manifestGame.id,
			position: i,
			name: manifestGame.name,
			description: manifestGame.description,
			estimatedMinutes: manifestGame.estimatedMinutes,
			isBoss: templateGame.id === BOSS_GAME_ID,
			ready: true,
		};

		if (resolvedGame.isBoss) {
			bossGame = resolvedGame;
		} else {
			resolvedGames.push(resolvedGame);
		}
	}

	if (bossGame) {
		if (bossGame.position !== template.games.length - 1) {
			errors.push(`Boss game "${BOSS_GAME_ID}" must be last in template order`);
		}
		bossGame.position = resolvedGames.length;
		resolvedGames.push(bossGame);
	}

	return {
		success: errors.length === 0,
		games: resolvedGames,
		errors,
	};
}
