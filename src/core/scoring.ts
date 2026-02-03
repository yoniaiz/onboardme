export interface ScoringConfig {
	baseCommits: number;
	speedBonusThreshold: number;
	speedBonusAmount: number;
	maxStreakMultiplier: number;
}

export interface AnswerScore {
	baseCommits: number;
	speedBonus: number;
	streakMultiplier: number;
	totalCommits: number;
}

export interface StreakState {
	currentStreak: number;
	longestStreak: number;
}

const STREAK_MULTIPLIERS: Record<number, number> = {
	1: 1,
	2: 1.5,
	3: 2,
	4: 3,
};

const MAX_STREAK_MULTIPLIER = 5;

export function calculateStreakMultiplier(streak: number): number {
	if (streak <= 0) return 1;
	if (streak >= 5) return MAX_STREAK_MULTIPLIER;
	return STREAK_MULTIPLIERS[streak] ?? 1;
}

export function calculateSpeedBonus(
	answerTimeMs: number,
	config: ScoringConfig,
): number {
	if (answerTimeMs < config.speedBonusThreshold) {
		return config.speedBonusAmount;
	}
	return 0;
}

export interface CalculateScoreParams {
	correct: boolean;
	answerTimeMs: number;
	currentStreak: number;
	config: ScoringConfig;
}

export function calculateScore(params: CalculateScoreParams): AnswerScore {
	const { correct, answerTimeMs, currentStreak, config } = params;

	if (!correct) {
		return {
			baseCommits: 0,
			speedBonus: 0,
			streakMultiplier: 1,
			totalCommits: 0,
		};
	}

	const streakMultiplier = calculateStreakMultiplier(currentStreak + 1);
	const speedBonus = calculateSpeedBonus(answerTimeMs, config);
	const baseCommits = config.baseCommits;
	const totalCommits = Math.round(baseCommits * streakMultiplier + speedBonus);

	return {
		baseCommits,
		speedBonus,
		streakMultiplier,
		totalCommits,
	};
}

export function updateStreak(
	correct: boolean,
	currentState: StreakState,
): StreakState {
	if (!correct) {
		return {
			currentStreak: 0,
			longestStreak: currentState.longestStreak,
		};
	}

	const newStreak = currentState.currentStreak + 1;
	return {
		currentStreak: newStreak,
		longestStreak: Math.max(newStreak, currentState.longestStreak),
	};
}

export function createDefaultScoringConfig(): ScoringConfig {
	return {
		baseCommits: 100,
		speedBonusThreshold: 15000,
		speedBonusAmount: 50,
		maxStreakMultiplier: 5,
	};
}

export function createInitialStreakState(): StreakState {
	return {
		currentStreak: 0,
		longestStreak: 0,
	};
}
