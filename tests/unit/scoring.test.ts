import { describe, expect, it } from "bun:test";
import {
	calculateScore,
	calculateSpeedBonus,
	calculateStreakMultiplier,
	createDefaultScoringConfig,
	createInitialStreakState,
	updateStreak,
} from "../../src/core/scoring.ts";

describe("calculateStreakMultiplier", () => {
	it("returns 1x for streak of 0 or less", () => {
		expect(calculateStreakMultiplier(0)).toBe(1);
		expect(calculateStreakMultiplier(-1)).toBe(1);
	});

	it("returns correct multipliers for streaks 1-4", () => {
		expect(calculateStreakMultiplier(1)).toBe(1);
		expect(calculateStreakMultiplier(2)).toBe(1.5);
		expect(calculateStreakMultiplier(3)).toBe(2);
		expect(calculateStreakMultiplier(4)).toBe(3);
	});

	it("returns 5x for streak of 5 or more", () => {
		expect(calculateStreakMultiplier(5)).toBe(5);
		expect(calculateStreakMultiplier(10)).toBe(5);
		expect(calculateStreakMultiplier(100)).toBe(5);
	});
});

describe("calculateSpeedBonus", () => {
	const config = createDefaultScoringConfig();

	it("returns bonus when answer is faster than threshold", () => {
		expect(calculateSpeedBonus(10000, config)).toBe(50);
		expect(calculateSpeedBonus(14999, config)).toBe(50);
		expect(calculateSpeedBonus(0, config)).toBe(50);
	});

	it("returns 0 when answer is at or above threshold", () => {
		expect(calculateSpeedBonus(15000, config)).toBe(0);
		expect(calculateSpeedBonus(20000, config)).toBe(0);
	});
});

describe("calculateScore", () => {
	const config = createDefaultScoringConfig();

	it("returns zero score for incorrect answers", () => {
		const result = calculateScore({
			correct: false,
			answerTimeMs: 5000,
			currentStreak: 5,
			config,
		});

		expect(result.totalCommits).toBe(0);
		expect(result.baseCommits).toBe(0);
		expect(result.speedBonus).toBe(0);
		expect(result.streakMultiplier).toBe(1);
	});

	it("calculates base score for first correct answer", () => {
		const result = calculateScore({
			correct: true,
			answerTimeMs: 20000,
			currentStreak: 0,
			config,
		});

		expect(result.baseCommits).toBe(100);
		expect(result.speedBonus).toBe(0);
		expect(result.streakMultiplier).toBe(1);
		expect(result.totalCommits).toBe(100);
	});

	it("adds speed bonus for fast answers", () => {
		const result = calculateScore({
			correct: true,
			answerTimeMs: 10000,
			currentStreak: 0,
			config,
		});

		expect(result.baseCommits).toBe(100);
		expect(result.speedBonus).toBe(50);
		expect(result.totalCommits).toBe(150);
	});

	it("applies streak multiplier correctly", () => {
		const result = calculateScore({
			correct: true,
			answerTimeMs: 20000,
			currentStreak: 4,
			config,
		});

		expect(result.streakMultiplier).toBe(5);
		expect(result.totalCommits).toBe(500);
	});

	it("combines speed bonus and streak multiplier", () => {
		const result = calculateScore({
			correct: true,
			answerTimeMs: 10000,
			currentStreak: 2,
			config,
		});

		expect(result.streakMultiplier).toBe(2);
		expect(result.speedBonus).toBe(50);
		expect(result.totalCommits).toBe(250);
	});
});

describe("updateStreak", () => {
	it("increments streak on correct answer", () => {
		const state = createInitialStreakState();
		const newState = updateStreak(true, state);

		expect(newState.currentStreak).toBe(1);
		expect(newState.longestStreak).toBe(1);
	});

	it("resets streak on incorrect answer", () => {
		const state = { currentStreak: 5, longestStreak: 5 };
		const newState = updateStreak(false, state);

		expect(newState.currentStreak).toBe(0);
		expect(newState.longestStreak).toBe(5);
	});

	it("preserves longest streak when current exceeds it", () => {
		const state = { currentStreak: 3, longestStreak: 3 };
		const newState = updateStreak(true, state);

		expect(newState.currentStreak).toBe(4);
		expect(newState.longestStreak).toBe(4);
	});

	it("keeps longest streak unchanged when current is lower", () => {
		const state = { currentStreak: 2, longestStreak: 10 };
		const newState = updateStreak(true, state);

		expect(newState.currentStreak).toBe(3);
		expect(newState.longestStreak).toBe(10);
	});
});

describe("createDefaultScoringConfig", () => {
	it("returns expected default values", () => {
		const config = createDefaultScoringConfig();

		expect(config.baseCommits).toBe(100);
		expect(config.speedBonusThreshold).toBe(15000);
		expect(config.speedBonusAmount).toBe(50);
		expect(config.maxStreakMultiplier).toBe(5);
	});
});

describe("createInitialStreakState", () => {
	it("returns zeroed streak state", () => {
		const state = createInitialStreakState();

		expect(state.currentStreak).toBe(0);
		expect(state.longestStreak).toBe(0);
	});
});
