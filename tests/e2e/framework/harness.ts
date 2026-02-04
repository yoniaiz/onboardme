import React from "react";
import type { GameEngine } from "@/core/engine.ts";
import { type TestHarnessOptions, withTestHarness } from "@/testing/harness.ts";
import { render as inkRender } from "./ink-render.ts";
import { DEFAULT_RENDER_DELAY, KEYS } from "./keys.ts";
import { RenderWrapper } from "./render-wrapper.tsx";
import type { E2EOptions, GameAdapter, KeyName } from "./types.ts";

export interface E2EHarnessInstance {
	readonly engine: GameEngine;
	readonly stdin: { write(input: string): void };
	lastFrame(): string;
	press(key: KeyName): Promise<void>;
	type(text: string): Promise<void>;
	waitFor(
		condition: (frame: string) => boolean,
		options?: { timeout?: number; interval?: number },
	): Promise<void>;
	debug(label?: string): void;
}

function createE2EHarnessInstance<TState>(
	engine: GameEngine,
	adapter: GameAdapter<TState>,
	renderDelay: number = DEFAULT_RENDER_DELAY,
): E2EHarnessInstance {
	const { lastFrame, stdin } = inkRender(
		React.createElement(RenderWrapper, { engine, adapter }),
	);

	const wait = (ms: number) =>
		new Promise<void>((resolve) => setTimeout(resolve, ms));

	return {
		engine,
		stdin,

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
	};
}

export async function withE2E<TState, TResult>(
	options: E2EOptions<TState>,
	fn: (harness: E2EHarnessInstance) => Promise<TResult>,
): Promise<TResult> {
	const harnessOptions: TestHarnessOptions = {
		games: [
			{
				id: options.game.id,
				plugin: options.game.plugin,
				config: options.game.config,
			},
		],
	};

	return withTestHarness(harnessOptions, async (testHarness) => {
		const e2eHarness = createE2EHarnessInstance(
			testHarness.engine,
			options.adapter,
		);

		await new Promise<void>((r) => setTimeout(r, DEFAULT_RENDER_DELAY * 2));

		return fn(e2eHarness);
	});
}
