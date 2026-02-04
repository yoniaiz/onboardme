import type { AnswerResult, GameComponent, GameResult } from "@/types/game.ts";

export interface E2EOptions<TConfig> {
	GameComponent: GameComponent<TConfig>;
	config: TConfig;
}

export interface E2EHelper {
	lastFrame(): string;
	press(key: KeyName): Promise<void>;
	type(text: string): Promise<void>;
	waitFor(
		condition: (frame: string) => boolean,
		options?: { timeout?: number; interval?: number },
	): Promise<void>;
	debug(label?: string): void;
	getResults(): AnswerResult[];
	getGameResult(): GameResult | null;
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
