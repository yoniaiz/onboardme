import React from "react";
import type { AnswerResult, GameResult } from "@/types/game.ts";
import { render as inkRender } from "./ink-render.ts";
import { DEFAULT_RENDER_DELAY, KEYS } from "./keys.ts";
import type { E2EHelper, E2EOptions, KeyName } from "./types.ts";

function createE2EHarnessInstance<TConfig>(
	options: E2EOptions<TConfig>,
	renderDelay: number = DEFAULT_RENDER_DELAY,
): E2EHelper {
	const results: AnswerResult[] = [];
	let gameResult: GameResult | null = null;

	const { lastFrame, stdin } = inkRender(
		React.createElement(options.GameComponent, {
			config: options.config,
			onAnswerResult: (result: AnswerResult) => {
				results.push(result);
			},
			onGameComplete: (result: GameResult) => {
				gameResult = result;
			},
		}),
	);

	const wait = (ms: number) =>
		new Promise<void>((resolve) => setTimeout(resolve, ms));

	return {
		lastFrame(): string {
			return lastFrame() ?? "";
		},

		async press(key: KeyName): Promise<void> {
			const keyCode = KEYS[key];
			stdin.write(keyCode);
			await wait(renderDelay);
		},

		async type(text: string): Promise<void> {
			stdin.write(text);
			await wait(renderDelay);
		},

		async waitFor(
			condition: (frame: string) => boolean,
			options: { timeout?: number; interval?: number } = {},
		): Promise<void> {
			const { timeout = 5000, interval = 50 } = options;
			const start = Date.now();

			while (Date.now() - start < timeout) {
				const frame = lastFrame() ?? "";
				if (condition(frame)) {
					return;
				}
				await wait(interval);
			}

			throw new Error(
				`waitFor timed out after ${timeout}ms. Last frame:\n${lastFrame()}`,
			);
		},

		debug(label?: string): void {
			const frame = lastFrame() ?? "";
			const separator = "=".repeat(50);
			const header = label ? `=== ${label} ===` : separator;
			console.log(`\n${header}`);
			console.log(frame);
			console.log(separator);
		},
		getResults(): AnswerResult[] {
			return results;
		},
		getGameResult(): GameResult | null {
			return gameResult;
		},
	};
}

export async function withGameE2E<TConfig, TResult>(
	options: E2EOptions<TConfig>,
	fn: (harness: E2EHelper) => Promise<TResult>,
): Promise<TResult> {
	const e2eHarness = createE2EHarnessInstance(options);
	await new Promise<void>((r) => setTimeout(r, DEFAULT_RENDER_DELAY * 2));
	return fn(e2eHarness);
}
