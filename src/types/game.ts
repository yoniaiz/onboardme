import type React from "react";

export interface AnswerResult {
	correct: boolean;
	feedback: string;
	commitsEarned: number;
	isNavigation?: boolean;
}

export type QuestionType = "multiple-choice" | "text-input";

export interface GameQuestion {
	id: string;
	type: QuestionType;
	prompt: string;
	context?: string;
	hints: string[];
	options?: string[];
}

export interface GameResult {
	completed: boolean;
	score: number;
	maxScore: number;
	timeSpent: number;
	knowledgeUnlocked: string[];
}

export interface GameProps<TConfig = unknown> {
	config: TConfig;
	onAnswerResult: (result: AnswerResult) => void;
	onGameComplete: (result: GameResult) => void;
}

export type GameComponent<TConfig = unknown> = React.ComponentType<
	GameProps<TConfig>
>;

export interface GameMetadata {
	id: string;
	name: string;
	description: string;
	estimatedMinutes: number;
}

export interface QuestionGuideline {
	category: string;
	description: string;
	difficulty: "easy" | "medium" | "hard";
	goodExamples: string[];
	badExamples: string[];
	principles: string[];
}

export interface GameAIContext {
	gameId: string;
	gameName: string;
	purpose: string;
	configSchema: Record<string, unknown>;
	questionGuidelines: QuestionGuideline[];
	exampleConfig?: unknown;
}

export interface GameInstance<TConfig = unknown> {
	id: string;
	component: GameComponent<TConfig>;
	config: TConfig;
	metadata: GameMetadata;
	getAIContext: () => GameAIContext;
}

export interface OnboardMeConfig {
	// biome-ignore lint/suspicious/noExplicitAny: Games can have any config type
	games: GameInstance<any>[];
}

export function defineConfig(config: OnboardMeConfig): OnboardMeConfig {
	return config;
}

export interface GameDefinition<TConfig> {
	id: string;
	component: GameComponent<TConfig>;
	defaultConfig: TConfig;
	metadata: GameMetadata;
	getAIContext: () => GameAIContext;
}

export function defineGame<TConfig>(
	definition: GameDefinition<TConfig>,
): (options?: Partial<TConfig>) => GameInstance<TConfig> {
	return (options?: Partial<TConfig>) => ({
		id: definition.id,
		component: definition.component,
		config: { ...definition.defaultConfig, ...options } as TConfig,
		metadata: definition.metadata,
		getAIContext: definition.getAIContext,
	});
}
