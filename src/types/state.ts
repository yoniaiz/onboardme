type GameStatus = "not_started" | "in_progress" | "completed";

export interface GameProgress {
	gameId: string;
	status: GameStatus;
	score: number;
	maxScore: number;
	startedAt: string | null;
	completedAt: string | null;
	currentCheckpoint: string | null;
	currentQuestionIndex: number;
}

export interface SessionStats {
	totalCommits: number;
	totalTime: number;
	questionsAnswered: number;
	correctAnswers: number;
	hintsUsed: number;
	longestCleanStreak: number;
	currentCleanStreak: number;
}

interface ResumePoint {
	gameId: string;
	questionIndex: number;
	savedAt: string;
}

export interface CheckpointData {
	canResume: boolean;
	resumePoint: ResumePoint | null;
}

export interface Progress {
	version: string;
	startedAt: string | null;
	lastPlayedAt: string | null;
	totalScore: number;
	maxTotalScore: number;
	currentGameId: string | null;
	currentGameIndex: number;
	currentQuestionIndex: number;
	games: Record<string, GameProgress>;
	stats: SessionStats;
	checkpoint: CheckpointData;
}

function createInitialStats(): SessionStats {
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

function createInitialCheckpoint(): CheckpointData {
	return {
		canResume: false,
		resumePoint: null,
	};
}

export function createInitialProgress(): Progress {
	return {
		version: "1.0.0",
		startedAt: null,
		lastPlayedAt: null,
		totalScore: 0,
		maxTotalScore: 0,
		currentGameId: null,
		currentGameIndex: 0,
		currentQuestionIndex: 0,
		games: {},
		stats: createInitialStats(),
		checkpoint: createInitialCheckpoint(),
	};
}
