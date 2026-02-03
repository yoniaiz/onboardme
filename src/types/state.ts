type GameStatus = "not_started" | "in_progress" | "completed";

export interface GameProgress {
	gameId: string;
	status: GameStatus;
	score: number;
	maxScore: number;
	startedAt: string | null;
	completedAt: string | null;
	currentCheckpoint: string | null;
}

export interface Progress {
	version: string;
	startedAt: string | null;
	lastPlayedAt: string | null;
	totalScore: number;
	maxTotalScore: number;
	currentGameId: string | null;
	games: Record<string, GameProgress>;
}

export function createInitialProgress(): Progress {
	return {
		version: "1.0.0",
		startedAt: null,
		lastPlayedAt: null,
		totalScore: 0,
		maxTotalScore: 0,
		currentGameId: null,
		games: {},
	};
}
