import { describe, expect, it } from "bun:test";
import {
	type AnswerResult,
	GamePlugin,
	type GamePluginSchema,
	type GamePreparedData,
	type GameQuestion,
} from "../../src/core/index.ts";

class MockGamePlugin extends GamePlugin {
	readonly schema: GamePluginSchema = {
		id: "mock-game",
		name: "Mock Game",
		description: "A test game",
		estimatedTime: 5,
		requiredContext: [],
	};

	async initialize(preparedData: GamePreparedData): Promise<void> {
		this.preparedData = preparedData;
		this.questions = preparedData.questions;
	}

	async start(): Promise<void> {
		this.startTime = Date.now();
	}

	async submitAnswer(answer: string): Promise<AnswerResult> {
		const question = this.getCurrentQuestion();
		if (!question) {
			return { correct: false, feedback: "No question", commitsEarned: 0 };
		}

		const correct = answer === "correct";
		if (correct) {
			this.addCommits(10);
			this.addKnowledge(["test-knowledge"]);
			this.onCorrectAnswer(question);
		} else {
			this.onWrongAnswer(question);
		}
		this.advanceToNextQuestion();

		return {
			correct,
			feedback: correct ? "Correct!" : "Wrong!",
			commitsEarned: correct ? 10 : 0,
			knowledgeUnlocked: correct ? ["test-knowledge"] : undefined,
		};
	}
}

function createTestQuestion(id: string): GameQuestion {
	return {
		id,
		type: "text-input",
		prompt: `Question ${id}`,
		hints: ["Hint 1"],
	};
}

function createPreparedData(questionCount: number): GamePreparedData {
	const questions = Array.from({ length: questionCount }, (_, i) =>
		createTestQuestion(`q${i + 1}`),
	);
	return { config: {}, questions };
}

describe("GamePlugin", () => {
	describe("initialization", () => {
		it("stores prepared data and questions", async () => {
			const plugin = new MockGamePlugin();
			const data = createPreparedData(3);

			await plugin.initialize(data);

			expect(plugin.getProgress().total).toBe(3);
		});
	});

	describe("getCurrentQuestion", () => {
		it("returns first question initially", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(2));

			const question = plugin.getCurrentQuestion();

			expect(question?.id).toBe("q1");
		});

		it("returns null when no questions", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(0));

			const question = plugin.getCurrentQuestion();

			expect(question).toBeNull();
		});

		it("returns null after all questions answered", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(1));
			await plugin.submitAnswer("correct");

			const question = plugin.getCurrentQuestion();

			expect(question).toBeNull();
		});
	});

	describe("getProgress", () => {
		it("tracks progress through questions", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(3));

			expect(plugin.getProgress()).toEqual({ current: 0, total: 3 });

			await plugin.submitAnswer("correct");
			expect(plugin.getProgress()).toEqual({ current: 1, total: 3 });

			await plugin.submitAnswer("wrong");
			expect(plugin.getProgress()).toEqual({ current: 2, total: 3 });
		});
	});

	describe("isComplete", () => {
		it("returns false when questions remain", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(2));

			expect(plugin.isComplete()).toBe(false);
		});

		it("returns true when all questions answered", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(2));
			await plugin.submitAnswer("correct");
			await plugin.submitAnswer("correct");

			expect(plugin.isComplete()).toBe(true);
		});

		it("returns true when no questions", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(0));

			expect(plugin.isComplete()).toBe(true);
		});
	});

	describe("end", () => {
		it("returns game result with score and knowledge", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(2));
			await plugin.start();
			await plugin.submitAnswer("correct");
			await plugin.submitAnswer("wrong");

			const result = plugin.end();

			expect(result.completed).toBe(true);
			expect(result.score).toBe(10);
			expect(result.maxScore).toBe(20);
			expect(result.knowledgeUnlocked).toContain("test-knowledge");
			expect(result.timeSpent).toBeGreaterThanOrEqual(0);
		});

		it("marks incomplete when questions remain", async () => {
			const plugin = new MockGamePlugin();
			await plugin.initialize(createPreparedData(3));
			await plugin.submitAnswer("correct");

			const result = plugin.end();

			expect(result.completed).toBe(false);
		});
	});

	describe("hooks", () => {
		it("calls onCorrectAnswer for correct answers", async () => {
			const plugin = new MockGamePlugin();
			let hookCalled = false;
			plugin.onCorrectAnswer = () => {
				hookCalled = true;
			};
			await plugin.initialize(createPreparedData(1));

			await plugin.submitAnswer("correct");

			expect(hookCalled).toBe(true);
		});

		it("calls onWrongAnswer for wrong answers", async () => {
			const plugin = new MockGamePlugin();
			let hookCalled = false;
			plugin.onWrongAnswer = () => {
				hookCalled = true;
			};
			await plugin.initialize(createPreparedData(1));

			await plugin.submitAnswer("wrong");

			expect(hookCalled).toBe(true);
		});
	});
});
