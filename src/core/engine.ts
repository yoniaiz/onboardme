import { readJson } from "@/lib/fs.ts";
import { getManifestPath } from "@/lib/paths.ts";
import {
	advanceQuestion,
	completeGame,
	getOrCreateProgress,
	recordAnswer,
	saveCheckpoint,
	startGame,
} from "@/services/state.ts";
import type {
	EngineCallbacks,
	EngineInitResult,
	EngineProgress,
	GameEngineConfig,
} from "@/types/engine.ts";
import type { Manifest } from "@/types/manifest.ts";
import type { SessionStats } from "@/types/state.ts";
import type { ResolvedGame } from "@/types/template.ts";
import { loadGameData, validateAllGames } from "./loader.ts";
import type { GamePlugin } from "./plugin.ts";
import { getGamePlugin } from "./registry.ts";
import {
	calculateScore,
	createDefaultScoringConfig,
	createInitialStreakState,
	type ScoringConfig,
	type StreakState,
	updateStreak,
} from "./scoring.ts";
import { loadTemplate, resolveGameOrder } from "./template.ts";
import type { AnswerResult, GameQuestion } from "./types.ts";

export class GameEngine {
	private rootDir: string;
	private callbacks: EngineCallbacks;
	private resolvedGames: ResolvedGame[] = [];
	private currentGameIndex = 0;
	private currentPlugin: GamePlugin | null = null;
	private scoringConfig: ScoringConfig;
	private streakState: StreakState;
	private questionStartTime = 0;
	private sessionStats: SessionStats = createEmptySessionStats();

	constructor(config: GameEngineConfig) {
		this.rootDir = config.rootDir;
		this.callbacks = config.callbacks ?? {};
		this.scoringConfig = createDefaultScoringConfig();
		this.streakState = createInitialStreakState();
	}

	async initialize(): Promise<EngineInitResult> {
		const errors: string[] = [];

		const { template } = await loadTemplate(this.rootDir);

		const manifestPath = getManifestPath(this.rootDir);
		const manifest = await readJson<Manifest>(manifestPath);

		if (!manifest) {
			return {
				success: false,
				games: [],
				errors: ["Manifest not found. Run 'onboardme prepare' first."],
			};
		}

		const resolution = resolveGameOrder(template, manifest);
		if (!resolution.success) {
			errors.push(...resolution.errors);
		}

		const gameIds = resolution.games.map((g) => g.id);
		const { invalid } = await validateAllGames(this.rootDir, gameIds);

		if (invalid.length > 0) {
			errors.push(
				`Missing prepared data for games: ${invalid.join(", ")}. Run 'onboardme prepare' first.`,
			);
		}

		for (const game of resolution.games) {
			if (!getGamePlugin(game.id)) {
				errors.push(`No plugin registered for game: ${game.id}`);
			}
		}

		if (errors.length > 0) {
			return { success: false, games: resolution.games, errors };
		}

		this.resolvedGames = resolution.games;
		return { success: true, games: this.resolvedGames, errors: [] };
	}

	async startSession(): Promise<void> {
		if (this.resolvedGames.length === 0) {
			throw new Error("Engine not initialized. Call initialize() first.");
		}

		const progress = await getOrCreateProgress(this.rootDir);
		this.currentGameIndex = progress.currentGameIndex;
		this.sessionStats = { ...progress.stats };

		await this.loadCurrentGame();
	}

	async resumeSession(): Promise<boolean> {
		const progress = await getOrCreateProgress(this.rootDir);

		if (!progress.checkpoint.canResume || !progress.checkpoint.resumePoint) {
			return false;
		}

		this.currentGameIndex = progress.currentGameIndex;
		this.sessionStats = { ...progress.stats };

		await this.loadCurrentGame();
		return true;
	}

	getCurrentQuestion(): GameQuestion | null {
		return this.currentPlugin?.getCurrentQuestion() ?? null;
	}

	getCurrentGameId(): string | null {
		if (this.currentGameIndex >= this.resolvedGames.length) {
			return null;
		}
		return this.resolvedGames[this.currentGameIndex].id;
	}

	getProgress(): EngineProgress {
		const totalQuestions = this.currentPlugin?.getProgress().total ?? 0;
		const currentQuestionIndex = this.currentPlugin?.getProgress().current ?? 0;

		return {
			currentGameIndex: this.currentGameIndex,
			totalGames: this.resolvedGames.length,
			currentGameId: this.getCurrentGameId(),
			currentQuestionIndex: currentQuestionIndex,
			totalQuestions,
			sessionStats: this.sessionStats,
		};
	}

	async submitAnswer(answer: string): Promise<AnswerResult> {
		if (!this.currentPlugin) {
			throw new Error("No active game. Call startSession() first.");
		}

		const answerTimeMs = Date.now() - this.questionStartTime;
		const result = await this.currentPlugin.submitAnswer(answer);

		const scoreResult = calculateScore({
			correct: result.correct,
			answerTimeMs,
			currentStreak: this.streakState.currentStreak,
			config: this.scoringConfig,
		});

		result.commitsEarned = scoreResult.totalCommits;
		this.streakState = updateStreak(result.correct, this.streakState);

		await recordAnswer(
			this.rootDir,
			result.correct,
			scoreResult.totalCommits,
			answerTimeMs,
		);

		const updatedProgress = await getOrCreateProgress(this.rootDir);
		this.sessionStats = { ...updatedProgress.stats };

		this.callbacks.onAnswerResult?.(result, {
			streak: this.streakState.currentStreak,
		});

		if (this.currentPlugin.isComplete()) {
			await this.handleGameComplete();
		} else {
			await advanceQuestion(this.rootDir);
			this.startQuestionTimer();
			const nextQuestion = this.getCurrentQuestion();
			const gameId = this.getCurrentGameId();
			if (nextQuestion && gameId) {
				this.callbacks.onQuestionStart?.(gameId, nextQuestion);
			}
		}

		return result;
	}

	private async loadCurrentGame(): Promise<void> {
		if (this.currentGameIndex >= this.resolvedGames.length) {
			await this.handleSessionComplete();
			return;
		}

		const game = this.resolvedGames[this.currentGameIndex];
		const PluginClass = getGamePlugin(game.id);

		if (!PluginClass) {
			throw new Error(`No plugin registered for game: ${game.id}`);
		}

		const preparedData = await loadGameData(this.rootDir, game.id);
		if (!preparedData) {
			throw new Error(`Failed to load prepared data for game: ${game.id}`);
		}

		this.currentPlugin = new PluginClass();
		await this.currentPlugin.initialize(preparedData);
		await this.currentPlugin.start();

		await startGame(this.rootDir, game.id);
		await saveCheckpoint(this.rootDir);

		this.startQuestionTimer();
		const question = this.getCurrentQuestion();
		if (question) {
			this.callbacks.onQuestionStart?.(game.id, question);
		}
	}

	private async handleGameComplete(): Promise<void> {
		if (!this.currentPlugin) return;

		const gameId = this.getCurrentGameId();
		if (!gameId) return;

		const result = this.currentPlugin.end();

		await completeGame(this.rootDir, gameId, result);
		this.callbacks.onGameComplete?.(gameId, result);

		this.currentGameIndex++;
		this.currentPlugin = null;

		await this.loadCurrentGame();
	}

	private async handleSessionComplete(): Promise<void> {
		const progress = await getOrCreateProgress(this.rootDir);
		this.callbacks.onSessionComplete?.(progress.stats);
	}

	private startQuestionTimer(): void {
		this.questionStartTime = Date.now();
	}
}

function createEmptySessionStats(): SessionStats {
	return {
		totalCommits: 0,
		totalTime: 0,
		questionsAnswered: 0,
		correctAnswers: 0,
		hintsUsed: 0,
		longestCleanStreak: 0,
		currentCleanStreak: 0,
	};
}
