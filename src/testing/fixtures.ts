import { join } from "node:path";
import type { GamePreparedData, GameQuestion } from "@/core/types.ts";
import { ensureDir, writeJson } from "@/lib/fs.ts";
import {
	getManifestPath,
	getOnboardMeDir,
	getPreparedDir,
	getStateDir,
	getTemplateDir,
} from "@/lib/paths.ts";
import type { Manifest } from "@/types/manifest.ts";
import type { Progress } from "@/types/state.ts";
import type { Template } from "@/types/template.ts";
import {
	createPreparedData,
	createPreparedGameEntry,
	createTestQuestion,
} from "./utils.ts";

export interface FixtureGameOptions {
	id: string;
	name?: string;
	questions?: GameQuestion[];
	config?: Record<string, unknown>;
}

export interface FixtureOptions {
	games: FixtureGameOptions[];
	includeProgress?: boolean;
	progressState?: Partial<Progress>;
	templateOverride?: Template;
}

export async function createTestFixtures(
	rootDir: string,
	options: FixtureOptions,
): Promise<void> {
	await ensureDir(getOnboardMeDir(rootDir));
	await ensureDir(getPreparedDir(rootDir));
	await ensureDir(getStateDir(rootDir));
	await ensureDir(getTemplateDir(rootDir));

	await createManifest(rootDir, options.games);
	await createTemplate(rootDir, options);

	for (const game of options.games) {
		await createGameData(rootDir, game);
	}

	if (options.includeProgress) {
		await createProgress(rootDir, options.progressState);
	}
}

async function createManifest(
	rootDir: string,
	games: FixtureGameOptions[],
): Promise<void> {
	const manifest: Manifest = {
		version: "1.0.0",
		generatedAt: new Date().toISOString(),
		projectName: "test-project",
		games: games.map((g) => createPreparedGameEntry(g.id, g.name)),
	};

	await writeJson(getManifestPath(rootDir), manifest);
}

async function createTemplate(
	rootDir: string,
	options: FixtureOptions,
): Promise<void> {
	const template: Template = options.templateOverride ?? {
		games: options.games.map((g) => ({ id: g.id })),
	};

	const templatePath = join(getTemplateDir(rootDir), "template.json");
	await writeJson(templatePath, template);
}

async function createGameData(
	rootDir: string,
	game: FixtureGameOptions,
): Promise<void> {
	const questionCount = (game.config?.questionCount as number) ?? 3;
	const questions =
		game.questions ?? createDefaultQuestions(game.id, questionCount);
	const preparedData: GamePreparedData = createPreparedData(
		questions,
		game.config,
	);

	const gamesDir = join(getPreparedDir(rootDir), "games", game.id);
	await ensureDir(gamesDir);
	await writeJson(join(gamesDir, "data.json"), preparedData);
}

function createDefaultQuestions(gameId: string, count = 3): GameQuestion[] {
	return Array.from({ length: count }, (_, i) =>
		createTestQuestion({
			id: `${gameId}-q${i + 1}`,
			prompt: `Mock question ${i + 1}?`,
		}),
	);
}

async function createProgress(
	rootDir: string,
	overrides?: Partial<Progress>,
): Promise<void> {
	const progress: Progress = {
		version: "1.0.0",
		startedAt: overrides?.startedAt ?? null,
		lastPlayedAt: overrides?.lastPlayedAt ?? null,
		totalScore: overrides?.totalScore ?? 0,
		maxTotalScore: overrides?.maxTotalScore ?? 0,
		currentGameId: overrides?.currentGameId ?? null,
		currentGameIndex: overrides?.currentGameIndex ?? 0,
		currentQuestionIndex: overrides?.currentQuestionIndex ?? 0,
		games: overrides?.games ?? {},
		stats: overrides?.stats ?? {
			totalCommits: 0,
			totalTime: 0,
			questionsAnswered: 0,
			correctAnswers: 0,
			hintsUsed: 0,
			longestCleanStreak: 0,
			currentCleanStreak: 0,
		},
		checkpoint: overrides?.checkpoint ?? {
			canResume: false,
			resumePoint: null,
		},
	};

	const progressPath = join(getStateDir(rootDir), "progress.json");
	await writeJson(progressPath, progress);
}

export async function cleanupFixtures(rootDir: string): Promise<void> {
	const { rm } = await import("node:fs/promises");
	const onboardMeDir = getOnboardMeDir(rootDir);

	try {
		await rm(onboardMeDir, { recursive: true, force: true });
	} catch {
		// Ignore errors if directory doesn't exist
	}
}
