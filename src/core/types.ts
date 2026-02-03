export type QuestionType =
	| "multiple-choice"
	| "text-input"
	| "marker"
	| "timed";

export interface GameQuestion {
	id: string;
	type: QuestionType;
	prompt: string;
	context?: string;
	hints: string[];
	timeLimit?: number;
	options?: string[];
}

export interface AnswerResult {
	correct: boolean;
	feedback: string;
	knowledgeUnlocked?: string[];
	commitsEarned: number;
}

export interface GameResult {
	completed: boolean;
	score: number;
	maxScore: number;
	timeSpent: number;
	knowledgeUnlocked: string[];
}

export interface ContextRequirement {
	key: string;
	source: string;
	schema: Record<string, unknown>;
}

export interface GamePluginSchema {
	id: string;
	name: string;
	description: string;
	estimatedTime: number;
	requiredContext: ContextRequirement[];
}

export interface GamePreparedData {
	config: Record<string, unknown>;
	questions: GameQuestion[];
}

export interface GameRuntimeProgress {
	current: number;
	total: number;
}
