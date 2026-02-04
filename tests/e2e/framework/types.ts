import type React from "react";
import type { GameEngine } from "@/core/engine.ts";
import type { GamePluginConstructor } from "@/core/registry.ts";
import type { AnswerResult, GameQuestion } from "@/core/types.ts";

export interface GameCallbacks {
	onSubmitAnswer: (answer: string) => Promise<void>;
}

export interface GameRenderProps<TState = unknown> {
	state: TState;
	currentQuestion: GameQuestion | null;
	lastResult: AnswerResult | null;
	wrongAnswers: string[];
	disabled: boolean;
	callbacks: GameCallbacks;
}

export interface GameAdapter<TState = unknown> {
	extractState(engine: GameEngine): TState | null;
	createCallbacks(
		submitAnswer: (answer: string) => Promise<void>,
		getState: () => TState | null,
	): GameCallbacks;
	render(props: GameRenderProps<TState>): React.ReactElement | null;
}

export interface E2EGameConfig {
	id: string;
	plugin: GamePluginConstructor;
	config: Record<string, unknown>;
}

export interface E2EOptions<TState = unknown> {
	game: E2EGameConfig;
	adapter: GameAdapter<TState>;
}

export type KeyName =
	| "enter"
	| "up"
	| "down"
	| "left"
	| "right"
	| "escape"
	| "backspace"
	| "tab";
