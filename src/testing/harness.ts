import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { GameEngine } from "@/core/engine.ts";
import {
	type GamePluginConstructor,
	getGamePlugin,
	registerGame,
} from "@/core/registry.ts";
import type { AnswerResult, GameQuestion } from "@/core/types.ts";
import type { EngineProgress } from "@/types/engine.ts";
import type { SessionStats } from "@/types/state.ts";
import {
	cleanupFixtures,
	createTestFixtures,
	type FixtureGameOptions,
} from "./fixtures.ts";
import { type CapturedCallbacks, createMockCallbacks } from "./utils.ts";

export interface TestHarnessOptions {
	games: Array<{
		id: string;
		plugin: GamePluginConstructor;
		questions?: GameQuestion[];
		config?: Record<string, unknown>;
	}>;
	autoStart?: boolean;
}

export interface PlayThroughResult {
	stats: SessionStats;
	captured: CapturedCallbacks;
	answerResults: AnswerResult[];
}

export class GameTestHarness {
	readonly engine: GameEngine;
	readonly captured: CapturedCallbacks;
	private rootDir: string;
	private registeredGameIds: string[] = [];
	private previousRegistrations: Map<string, GamePluginConstructor>;

	private constructor(
		engine: GameEngine,
		captured: CapturedCallbacks,
		rootDir: string,
		registeredGameIds: string[],
		previousRegistrations: Map<string, GamePluginConstructor>,
	) {
		this.engine = engine;
		this.captured = captured;
		this.rootDir = rootDir;
		this.registeredGameIds = registeredGameIds;
		this.previousRegistrations = previousRegistrations;
	}

	static async create(options: TestHarnessOptions): Promise<GameTestHarness> {
		const rootDir = await mkdtemp(join(tmpdir(), "onboardme-test-"));

		const previousRegistrations = new Map<string, GamePluginConstructor>();
		const registeredGameIds: string[] = [];

		for (const game of options.games) {
			const existingPlugin = getGamePlugin(game.id);
			if (existingPlugin) {
				previousRegistrations.set(game.id, existingPlugin);
			}
			registerGame(game.id, game.plugin);
			registeredGameIds.push(game.id);
		}

		const fixtureGames: FixtureGameOptions[] = options.games.map((g) => ({
			id: g.id,
			questions: g.questions,
			config: g.config,
		}));

		await createTestFixtures(rootDir, { games: fixtureGames });

		const { callbacks, captured } = createMockCallbacks();
		const engine = new GameEngine({ rootDir, callbacks });

		const result = await engine.initialize();
		if (!result.success) {
			await cleanupFixtures(rootDir);
			throw new Error(
				`Engine initialization failed: ${result.errors.join(", ")}`,
			);
		}

		const harness = new GameTestHarness(
			engine,
			captured,
			rootDir,
			registeredGameIds,
			previousRegistrations,
		);

		if (options.autoStart !== false) {
			await engine.startSession();
		}

		return harness;
	}

	async submitAnswer(answer: string): Promise<AnswerResult> {
		return this.engine.submitAnswer(answer);
	}

	async submitAnswerSequence(answers: string[]): Promise<AnswerResult[]> {
		const results: AnswerResult[] = [];
		for (const answer of answers) {
			const result = await this.engine.submitAnswer(answer);
			results.push(result);
		}
		return results;
	}

	async playThrough(
		correctAnswer: string = "correct",
	): Promise<PlayThroughResult> {
		const results: AnswerResult[] = [];

		while (this.engine.getCurrentQuestion()) {
			const result = await this.engine.submitAnswer(correctAnswer);
			results.push(result);
		}

		const stats = this.engine.getProgress().sessionStats;
		return {
			stats,
			captured: this.captured,
			answerResults: results,
		};
	}

	getCurrentQuestion(): GameQuestion | null {
		return this.engine.getCurrentQuestion();
	}

	getProgress(): EngineProgress {
		return this.engine.getProgress();
	}

	getRootDir(): string {
		return this.rootDir;
	}

	async cleanup(): Promise<void> {
		await cleanupFixtures(this.rootDir);

		for (const gameId of this.registeredGameIds) {
			const previous = this.previousRegistrations.get(gameId);
			if (previous) {
				registerGame(gameId, previous);
			}
		}
	}
}

export async function withTestHarness<T>(
	options: TestHarnessOptions,
	fn: (harness: GameTestHarness) => Promise<T>,
): Promise<T> {
	const harness = await GameTestHarness.create(options);
	try {
		return await fn(harness);
	} finally {
		await harness.cleanup();
	}
}
