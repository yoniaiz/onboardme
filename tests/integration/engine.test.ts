import { describe, expect, it } from "bun:test";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { GameEngine } from "../../src/core/engine.ts";
import { MockGame } from "../../src/games/mock/index.ts";
import {
	cleanupFixtures,
	createTestFixtures,
} from "../../src/testing/fixtures.ts";
import {
	type GameTestHarness,
	withTestHarness,
} from "../../src/testing/harness.ts";
import { createMockCallbacks } from "../../src/testing/utils.ts";

describe("GameEngine", () => {
	describe("initialization", () => {
		it("initializes with valid prepared data", async () => {
			await withTestHarness(
				{
					games: [{ id: "mock-game", plugin: MockGame }],
					autoStart: false,
				},
				async (harness) => {
					const question = await startAndGetQuestion(harness);
					expect(question).not.toBeNull();
					expect(question?.prompt).toContain("Mock question");
				},
			);
		});

		it("fails when manifest is missing", async () => {
			const rootDir = await mkdtemp(join(tmpdir(), "onboardme-test-"));
			const { callbacks } = createMockCallbacks();
			const engine = new GameEngine({ rootDir, callbacks });

			const result = await engine.initialize();

			expect(result.success).toBe(false);
			expect(result.errors[0]).toContain("Manifest not found");

			await cleanupFixtures(rootDir);
		});

		it("fails when game plugin is not registered", async () => {
			const rootDir = await mkdtemp(join(tmpdir(), "onboardme-test-"));
			await createTestFixtures(rootDir, {
				games: [{ id: "unregistered-game" }],
			});

			const { callbacks } = createMockCallbacks();
			const engine = new GameEngine({ rootDir, callbacks });

			const result = await engine.initialize();

			expect(result.success).toBe(false);
			expect(result.errors[0]).toContain("No plugin registered");

			await cleanupFixtures(rootDir);
		});
	});

	describe("full game playthrough", () => {
		it("completes a game with all correct answers", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 3, acceptedAnswer: "correct" },
						},
					],
				},
				async (harness) => {
					const result = await harness.playThrough("correct");

					expect(result.answerResults).toHaveLength(3);
					expect(result.answerResults.every((r) => r.correct)).toBe(true);
					expect(result.captured.gameCompletes).toHaveLength(1);
					expect(result.captured.gameCompletes[0].gameId).toBe("mock-game");
				},
			);
		});

		it("handles mixed correct and incorrect answers", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 3, acceptedAnswer: "correct" },
						},
					],
				},
				async (harness) => {
					const results = await harness.submitAnswerSequence([
						"correct",
						"wrong",
						"correct",
					]);

					expect(results[0].correct).toBe(true);
					expect(results[1].correct).toBe(false);
					expect(results[2].correct).toBe(true);
				},
			);
		});

		it("tracks progress through questions", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 3 },
						},
					],
				},
				async (harness) => {
					expect(harness.getProgress().currentQuestionIndex).toBe(0);

					await harness.submitAnswer("correct");
					expect(harness.getProgress().currentQuestionIndex).toBe(1);

					await harness.submitAnswer("correct");
					expect(harness.getProgress().currentQuestionIndex).toBe(2);
				},
			);
		});
	});

	describe("multi-game session", () => {
		it("transitions between games", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 2, acceptedAnswer: "correct" },
						},
						{
							id: "second-game",
							plugin: MockGame,
							config: { questionCount: 2, acceptedAnswer: "correct" },
						},
					],
				},
				async (harness) => {
					expect(harness.getProgress().currentGameId).toBe("mock-game");

					await harness.submitAnswer("correct");
					await harness.submitAnswer("correct");

					expect(harness.getProgress().currentGameId).toBe("second-game");
					expect(harness.captured.gameCompletes).toHaveLength(1);
				},
			);
		});

		it("completes all games in order", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "game-1",
							plugin: MockGame,
							config: { questionCount: 1 },
						},
						{
							id: "game-2",
							plugin: MockGame,
							config: { questionCount: 1 },
						},
						{
							id: "game-3",
							plugin: MockGame,
							config: { questionCount: 1 },
						},
					],
				},
				async (harness) => {
					await harness.playThrough("correct");

					expect(harness.captured.gameCompletes).toHaveLength(3);
					expect(harness.captured.gameCompletes[0].gameId).toBe("game-1");
					expect(harness.captured.gameCompletes[1].gameId).toBe("game-2");
					expect(harness.captured.gameCompletes[2].gameId).toBe("game-3");
				},
			);
		});
	});

	describe("callback invocation", () => {
		it("calls onQuestionStart for each question", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 3 },
						},
					],
				},
				async (harness) => {
					await harness.playThrough("correct");

					expect(harness.captured.questionStarts.length).toBeGreaterThanOrEqual(
						3,
					);
				},
			);
		});

		it("calls onAnswerResult for each answer", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 2 },
						},
					],
				},
				async (harness) => {
					await harness.submitAnswer("correct");
					await harness.submitAnswer("wrong");

					expect(harness.captured.answerResults).toHaveLength(2);
					expect(harness.captured.answerResults[0].result.correct).toBe(true);
					expect(harness.captured.answerResults[1].result.correct).toBe(false);
				},
			);
		});

		it("calls onGameComplete when game ends", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 1 },
						},
					],
				},
				async (harness) => {
					await harness.submitAnswer("correct");

					expect(harness.captured.gameCompletes).toHaveLength(1);
					expect(harness.captured.gameCompletes[0].result.completed).toBe(true);
				},
			);
		});

		it("calls onSessionComplete when all games finish", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 1 },
						},
					],
				},
				async (harness) => {
					await harness.playThrough("correct");

					expect(harness.captured.sessionComplete).not.toBeNull();
				},
			);
		});
	});

	describe("scoring and streaks", () => {
		it("tracks commits earned in answer results", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 3 },
						},
					],
				},
				async (harness) => {
					const results = await harness.submitAnswerSequence([
						"correct",
						"correct",
						"correct",
					]);

					const totalCommits = results.reduce(
						(sum, r) => sum + r.commitsEarned,
						0,
					);
					expect(totalCommits).toBeGreaterThan(0);
				},
			);
		});

		it("tracks streak information", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 3 },
						},
					],
				},
				async (harness) => {
					await harness.submitAnswer("correct");
					await harness.submitAnswer("correct");

					const answerResult = harness.captured.answerResults[1];
					expect(answerResult.stats.streak).toBeGreaterThanOrEqual(1);
				},
			);
		});

		it("resets streak on wrong answer", async () => {
			await withTestHarness(
				{
					games: [
						{
							id: "mock-game",
							plugin: MockGame,
							config: { questionCount: 4 },
						},
					],
				},
				async (harness) => {
					await harness.submitAnswer("correct");
					expect(harness.captured.answerResults[0].stats.streak).toBe(1);

					await harness.submitAnswer("wrong");
					expect(harness.captured.answerResults[1].stats.streak).toBe(0);

					await harness.submitAnswer("correct");
					expect(harness.captured.answerResults[2].stats.streak).toBe(1);
				},
			);
		});
	});

	describe("error handling", () => {
		it("throws when submitting answer without starting session", async () => {
			await withTestHarness(
				{
					games: [{ id: "mock-game", plugin: MockGame }],
					autoStart: false,
				},
				async (harness) => {
					expect(async () => {
						await harness.submitAnswer("test");
					}).toThrow();
				},
			);
		});
	});
});

async function startAndGetQuestion(harness: GameTestHarness) {
	await harness.engine.startSession();
	return harness.getCurrentQuestion();
}
