import { GamePlugin } from "@/core/plugin.ts";
import type {
	AnswerResult,
	GamePluginSchema,
	GamePreparedData,
	GameQuestion,
	QuestionType,
} from "@/core/types.ts";

export interface MockGameConfig {
	questionCount: number;
	acceptedAnswer?: string | RegExp;
	questionType?: QuestionType;
	simulateDelay?: number;
	knowledgePerQuestion?: string[];
}

const DEFAULT_CONFIG: MockGameConfig = {
	questionCount: 3,
	acceptedAnswer: "correct",
	questionType: "text-input",
	simulateDelay: 0,
	knowledgePerQuestion: [],
};

export class MockGame extends GamePlugin {
	readonly schema: GamePluginSchema = {
		id: "mock-game",
		name: "Mock Game",
		description: "Test game for engine validation",
		estimatedTime: 1,
		requiredContext: [],
	};

	private config: MockGameConfig = DEFAULT_CONFIG;
	private lifecycleEvents: string[] = [];

	async initialize(preparedData: GamePreparedData): Promise<void> {
		this.lifecycleEvents.push("initialize");
		this.preparedData = preparedData;
		this.config = { ...DEFAULT_CONFIG, ...preparedData.config };
		this.questions = preparedData.questions;
	}

	async start(): Promise<void> {
		this.lifecycleEvents.push("start");
		this.startTime = Date.now();
	}

	async submitAnswer(answer: string): Promise<AnswerResult> {
		this.lifecycleEvents.push(`submitAnswer:${answer}`);

		if (this.config.simulateDelay && this.config.simulateDelay > 0) {
			await delay(this.config.simulateDelay);
		}

		const question = this.getCurrentQuestion();
		const correct = this.isCorrectAnswer(answer);

		if (correct && question) {
			this.onCorrectAnswer(question);
			if (this.config.knowledgePerQuestion?.length) {
				this.addKnowledge(this.config.knowledgePerQuestion);
			}
		} else if (question) {
			this.onWrongAnswer(question);
		}

		const baseCommits = correct ? 10 : 0;
		this.addCommits(baseCommits);
		this.advanceToNextQuestion();

		return {
			correct,
			feedback: correct ? "Correct!" : "Incorrect!",
			knowledgeUnlocked: correct ? this.config.knowledgePerQuestion : undefined,
			commitsEarned: baseCommits,
		};
	}

	getLifecycleEvents(): string[] {
		return [...this.lifecycleEvents];
	}

	clearLifecycleEvents(): void {
		this.lifecycleEvents = [];
	}

	private isCorrectAnswer(answer: string): boolean {
		const { acceptedAnswer } = this.config;

		if (!acceptedAnswer) {
			return false;
		}

		if (acceptedAnswer instanceof RegExp) {
			return acceptedAnswer.test(answer);
		}

		return answer === acceptedAnswer;
	}
}

export function createMockQuestions(
	count: number,
	type: QuestionType = "text-input",
): GameQuestion[] {
	return Array.from({ length: count }, (_, i) => ({
		id: `mock-q-${i + 1}`,
		type,
		prompt: `Mock question ${i + 1}?`,
		context: `This is context for question ${i + 1}`,
		hints: [`Hint for question ${i + 1}`],
		options:
			type === "multiple-choice"
				? ["Option A", "Option B", "Option C", "Option D"]
				: undefined,
	}));
}

export function createMockPreparedData(
	config: Partial<MockGameConfig> = {},
): GamePreparedData {
	const mergedConfig = { ...DEFAULT_CONFIG, ...config };
	return {
		config: mergedConfig,
		questions: createMockQuestions(
			mergedConfig.questionCount,
			mergedConfig.questionType,
		),
	};
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
