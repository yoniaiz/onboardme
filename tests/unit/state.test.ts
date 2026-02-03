import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ensureDir, writeJson } from "../../src/lib/fs.ts";
import { getProgressPath, ONBOARDME_DIR } from "../../src/lib/paths.ts";
import {
	advanceQuestion,
	canResume,
	clearCheckpoint,
	completeGame,
	getOrCreateProgress,
	readProgress,
	recordAnswer,
	recordHintUsed,
	saveCheckpoint,
	startGame,
	writeProgress,
} from "../../src/services/state.ts";
import { createInitialProgress } from "../../src/types/state.ts";

describe("state management", () => {
	let tempDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "onboardme-state-test-"));
		await ensureDir(join(tempDir, ONBOARDME_DIR, "state"));
	});

	afterEach(async () => {
		if (tempDir) {
			await rm(tempDir, { recursive: true, force: true });
		}
	});

	describe("readProgress and writeProgress", () => {
		it("returns null when no progress file exists", async () => {
			const emptyDir = await mkdtemp(join(tmpdir(), "onboardme-empty-test-"));
			try {
				const progress = await readProgress(emptyDir);
				expect(progress).toBeNull();
			} finally {
				await rm(emptyDir, { recursive: true, force: true });
			}
		});

		it("writes and reads progress correctly", async () => {
			const initial = createInitialProgress();
			initial.totalScore = 500;

			await writeProgress(tempDir, initial);
			const read = await readProgress(tempDir);

			expect(read).not.toBeNull();
			expect(read?.totalScore).toBe(500);
			expect(read?.stats).toBeDefined();
			expect(read?.checkpoint).toBeDefined();
		});
	});

	describe("getOrCreateProgress", () => {
		it("creates initial progress when none exists", async () => {
			const progress = await getOrCreateProgress(tempDir);

			expect(progress.version).toBe("1.0.0");
			expect(progress.totalScore).toBe(0);
			expect(progress.currentGameIndex).toBe(0);
			expect(progress.stats.totalCommits).toBe(0);
		});

		it("returns existing progress when present", async () => {
			const existing = createInitialProgress();
			existing.totalScore = 1000;
			await writeProgress(tempDir, existing);

			const progress = await getOrCreateProgress(tempDir);
			expect(progress.totalScore).toBe(1000);
		});

		it("migrates old progress files without new fields", async () => {
			const oldProgress = {
				version: "1.0.0",
				startedAt: null,
				lastPlayedAt: null,
				totalScore: 250,
				maxTotalScore: 500,
				currentGameId: null,
				games: {},
			};
			const progressPath = getProgressPath(tempDir);
			await writeJson(progressPath, oldProgress);

			const progress = await getOrCreateProgress(tempDir);

			expect(progress.totalScore).toBe(250);
			expect(progress.stats).toBeDefined();
			expect(progress.stats.totalCommits).toBe(0);
			expect(progress.checkpoint).toBeDefined();
			expect(progress.checkpoint.canResume).toBe(false);
			expect(progress.currentGameIndex).toBe(0);
			expect(progress.currentQuestionIndex).toBe(0);
		});
	});

	describe("startGame", () => {
		it("initializes game state and sets startedAt on first game", async () => {
			await startGame(tempDir, "file-detective");
			const progress = await readProgress(tempDir);

			expect(progress?.startedAt).not.toBeNull();
			expect(progress?.currentGameId).toBe("file-detective");
			expect(progress?.currentQuestionIndex).toBe(0);
			expect(progress?.games["file-detective"]).toBeDefined();
			expect(progress?.games["file-detective"].status).toBe("in_progress");
		});

		it("preserves startedAt on subsequent games", async () => {
			await startGame(tempDir, "first-game");
			const first = await readProgress(tempDir);

			await startGame(tempDir, "second-game");
			const second = await readProgress(tempDir);

			expect(second?.startedAt).toBe(first?.startedAt);
		});
	});

	describe("completeGame", () => {
		it("updates game status and advances game index", async () => {
			await startGame(tempDir, "test-game");
			await completeGame(tempDir, "test-game", {
				completed: true,
				score: 500,
				maxScore: 1000,
				timeSpent: 60000,
				knowledgeUnlocked: ["item1"],
			});

			const progress = await readProgress(tempDir);

			expect(progress?.games["test-game"].status).toBe("completed");
			expect(progress?.games["test-game"].completedAt).not.toBeNull();
			expect(progress?.games["test-game"].score).toBe(500);
			expect(progress?.totalScore).toBe(500);
			expect(progress?.currentGameIndex).toBe(1);
			expect(progress?.checkpoint.canResume).toBe(false);
		});
	});

	describe("advanceQuestion", () => {
		it("increments question index", async () => {
			await startGame(tempDir, "test-game");
			await advanceQuestion(tempDir);

			const progress = await readProgress(tempDir);

			expect(progress?.currentQuestionIndex).toBe(1);
			expect(progress?.games["test-game"].currentQuestionIndex).toBe(1);
		});
	});

	describe("recordAnswer", () => {
		it("accumulates stats for correct answers", async () => {
			await startGame(tempDir, "test-game");
			await recordAnswer(tempDir, true, 100, 5000);

			const progress = await readProgress(tempDir);

			expect(progress?.stats.questionsAnswered).toBe(1);
			expect(progress?.stats.correctAnswers).toBe(1);
			expect(progress?.stats.totalCommits).toBe(100);
			expect(progress?.stats.totalTime).toBe(5000);
			expect(progress?.stats.currentCleanStreak).toBe(1);
		});

		it("resets streak on wrong answers", async () => {
			await startGame(tempDir, "test-game");
			await recordAnswer(tempDir, true, 100, 5000);
			await recordAnswer(tempDir, true, 100, 5000);
			await recordAnswer(tempDir, false, 0, 5000);

			const progress = await readProgress(tempDir);

			expect(progress?.stats.currentCleanStreak).toBe(0);
			expect(progress?.stats.longestCleanStreak).toBe(2);
		});

		it("tracks longest streak correctly", async () => {
			await startGame(tempDir, "test-game");
			await recordAnswer(tempDir, true, 100, 5000);
			await recordAnswer(tempDir, true, 100, 5000);
			await recordAnswer(tempDir, true, 100, 5000);

			const progress = await readProgress(tempDir);

			expect(progress?.stats.currentCleanStreak).toBe(3);
			expect(progress?.stats.longestCleanStreak).toBe(3);
		});
	});

	describe("recordHintUsed", () => {
		it("increments hint counter", async () => {
			await startGame(tempDir, "test-game");
			await recordHintUsed(tempDir);
			await recordHintUsed(tempDir);

			const progress = await readProgress(tempDir);
			expect(progress?.stats.hintsUsed).toBe(2);
		});
	});

	describe("checkpoint management", () => {
		it("saves checkpoint with current position", async () => {
			await startGame(tempDir, "test-game");
			await advanceQuestion(tempDir);
			await advanceQuestion(tempDir);
			await saveCheckpoint(tempDir);

			const progress = await readProgress(tempDir);

			expect(progress?.checkpoint.canResume).toBe(true);
			expect(progress?.checkpoint.resumePoint?.gameId).toBe("test-game");
			expect(progress?.checkpoint.resumePoint?.questionIndex).toBe(2);
		});

		it("canResume returns true when checkpoint exists", async () => {
			await startGame(tempDir, "test-game");
			await saveCheckpoint(tempDir);

			const result = await canResume(tempDir);
			expect(result).toBe(true);
		});

		it("canResume returns false when no checkpoint", async () => {
			const result = await canResume(tempDir);
			expect(result).toBe(false);
		});

		it("clearCheckpoint removes checkpoint data", async () => {
			await startGame(tempDir, "test-game");
			await saveCheckpoint(tempDir);
			await clearCheckpoint(tempDir);

			const progress = await readProgress(tempDir);

			expect(progress?.checkpoint.canResume).toBe(false);
			expect(progress?.checkpoint.resumePoint).toBeNull();
		});

		it("saveCheckpoint does nothing when no current game", async () => {
			await getOrCreateProgress(tempDir);
			await saveCheckpoint(tempDir);

			const result = await canResume(tempDir);
			expect(result).toBe(false);
		});
	});
});
