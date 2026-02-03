import { describe, expect, it } from "bun:test";
import { MockGame } from "../../src/games/mock/index.ts";
import { withTestHarness } from "../../src/testing/harness.ts";

describe("GameEngine progress", () => {
	it("updates session stats after correct answer", async () => {
		await withTestHarness(
			{
				games: [
					{
						id: "mock-game",
						plugin: MockGame,
						config: { questionCount: 1, acceptedAnswer: "correct" },
					},
				],
			},
			async (harness) => {
				await harness.submitAnswer("correct");
				const progress = harness.getProgress();

				expect(progress.sessionStats.questionsAnswered).toBe(1);
				expect(progress.sessionStats.totalCommits).toBeGreaterThan(0);
			},
		);
	});
});
