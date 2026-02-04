import type { KeyName } from "./types.ts";

export const KEYS: Record<KeyName, string> = {
	enter: "\r",
	up: "\x1B[A",
	down: "\x1B[B",
	right: "\x1B[C",
	left: "\x1B[D",
	escape: "\x1B",
	backspace: "\x7F",
	tab: "\t",
};

export const DEFAULT_RENDER_DELAY = 50;
