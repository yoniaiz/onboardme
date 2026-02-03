import type {
	AnswerResult,
	GamePreparedData,
	GameQuestion,
	GameResult,
	QuestionType,
} from "@/core/types.ts";
import type { EngineCallbacks } from "@/types/engine.ts";
import type { Manifest, PreparedGame } from "@/types/manifest.ts";
import type { SessionStats } from "@/types/state.ts";
import type { Template } from "@/types/template.ts";

export interface CapturedCallbacks {
	questionStarts: Array<{ gameId: string; question: GameQuestion }>;
	answerResults: Array<{ result: AnswerResult; stats: { streak: number } }>;
	gameCompletes: Array<{ gameId: string; result: GameResult }>;
	sessionComplete: SessionStats | null;
}

export function createCapturedCallbacks(): CapturedCallbacks {
	return {
		questionStarts: [],
		answerResults: [],
		gameCompletes: [],
		sessionComplete: null,
	};
}

export function createMockCallbacks(): {
	callbacks: EngineCallbacks;
	captured: CapturedCallbacks;
} {
	const captured = createCapturedCallbacks();

	const callbacks: EngineCallbacks = {
		onQuestionStart: (gameId, question) => {
			captured.questionStarts.push({ gameId, question });
		},
		onAnswerResult: (result, stats) => {
			captured.answerResults.push({ result, stats });
		},
		onGameComplete: (gameId, result) => {
			captured.gameCompletes.push({ gameId, result });
		},
		onSessionComplete: (stats) => {
			captured.sessionComplete = stats;
		},
	};

	return { callbacks, captured };
}

export function createTestQuestion(
	overrides: Partial<GameQuestion> = {},
): GameQuestion {
	return {
		id: overrides.id ?? `test-q-${Date.now()}`,
		type: overrides.type ?? "text-input",
		prompt: overrides.prompt ?? "What is the test answer?",
		context: overrides.context ?? "Test context",
		hints: overrides.hints ?? ["Test hint"],
		options: overrides.options,
		timeLimit: overrides.timeLimit,
	};
}

export function createMultipleChoiceQuestion(
	options: string[],
	correctIndex: number,
): GameQuestion {
	return {
		id: `mc-q-${Date.now()}`,
		type: "multiple-choice" as QuestionType,
		prompt: `Select option ${correctIndex + 1}`,
		hints: ["Look at the options"],
		options,
	};
}

export function createPreparedData(
	questions: GameQuestion[],
	config: Record<string, unknown> = {},
): GamePreparedData {
	return {
		config: { acceptedAnswer: "correct", ...config },
		questions,
	};
}

export function createTestManifest(
	games: Array<{ id: string; name?: string }>,
): Manifest {
	return {
		version: "1.0.0",
		generatedAt: new Date().toISOString(),
		projectName: "test-project",
		games: games.map((g) => createPreparedGameEntry(g.id, g.name)),
	};
}

export function createPreparedGameEntry(
	id: string,
	name?: string,
): PreparedGame {
	return {
		id,
		name: name ?? `Test Game ${id}`,
		description: `Description for ${id}`,
		difficulty: "easy",
		estimatedMinutes: 5,
		journeys: [],
		maxScore: 100,
	};
}

export function createTestTemplate(gameIds: string[]): Template {
	return {
		games: gameIds.map((id) => ({ id })),
	};
}
