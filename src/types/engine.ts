import type { AnswerResult, GameQuestion, GameResult } from "@/core/types.ts";
import type { SessionStats } from "./state.ts";
import type { ResolvedGame } from "./template.ts";

export interface EngineInitResult {
	success: boolean;
	games: ResolvedGame[];
	errors: string[];
}

export interface EngineProgress {
	currentGameIndex: number;
	totalGames: number;
	currentGameId: string | null;
	currentQuestionIndex: number;
	totalQuestions: number;
	sessionStats: SessionStats;
}

export interface EngineCallbacks {
	onQuestionStart?: (gameId: string, question: GameQuestion) => void;
	onAnswerResult?: (result: AnswerResult, stats: { streak: number }) => void;
	onGameComplete?: (gameId: string, result: GameResult) => void;
	onSessionComplete?: (stats: SessionStats) => void;
}

export interface GameEngineConfig {
	rootDir: string;
	callbacks?: EngineCallbacks;
}
