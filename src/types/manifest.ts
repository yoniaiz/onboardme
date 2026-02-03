interface GameJourney {
	id: string;
	name: string;
	entryPoint: string;
	checkpoints: string[];
}

export interface PreparedGame {
	id: string;
	name: string;
	description: string;
	difficulty: "easy" | "medium" | "hard";
	estimatedMinutes: number;
	journeys: GameJourney[];
	maxScore: number;
}

export interface Manifest {
	version: string;
	generatedAt: string;
	projectName: string;
	games: PreparedGame[];
}

export interface ValidationError {
	game?: string;
	field: string;
	error: string;
}

export interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
	suggestion?: string;
}
