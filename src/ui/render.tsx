import { render } from "ink";
import type React from "react";
import { ThemeProvider } from "./theme.tsx";

let restoreRegistered = false;
let restored = false;

function restoreTerminalState(): void {
	if (restored) return;
	restored = true;

	if (process.stdin.isTTY) {
		if (typeof process.stdin.setRawMode === "function") {
			try {
				process.stdin.setRawMode(false);
			} catch {}
		}
		try {
			process.stdin.pause();
		} catch {}
	}

	if (process.stdout.isTTY) {
		process.stdout.write("\x1b[?25h");
	}
}

function ensureRestoreOnExit(): void {
	if (restoreRegistered) return;
	restoreRegistered = true;
	process.on("exit", restoreTerminalState);
	process.on("SIGINT", () => {
		restoreTerminalState();
		process.exit(130);
	});
	process.on("SIGTERM", () => {
		restoreTerminalState();
		process.exit(143);
	});
}

export function renderScreen(element: React.ReactElement): void {
	ensureRestoreOnExit();
	const { unmount } = render(<ThemeProvider>{element}</ThemeProvider>);

	if (!process.stdout.isTTY) {
		unmount();
		restoreTerminalState();
	}
}

export function isInteractiveTerminal(): boolean {
	return Boolean(process.stdin.isTTY && process.stdout.isTTY);
}

export function renderInteractiveScreen<T>(
	createComponent: (resolve: (value: T) => void) => React.ReactElement,
): Promise<T> {
	if (!isInteractiveTerminal()) {
		return Promise.reject(
			new Error(
				"Interactive mode requires a TTY terminal. Run this command in a terminal, not a subprocess.",
			),
		);
	}

	process.stdin.resume();

	return new Promise((resolve) => {
		ensureRestoreOnExit();
		restored = false;
		const { waitUntilExit, unmount } = render(
			<ThemeProvider>{createComponent(resolve)}</ThemeProvider>,
		);
		waitUntilExit().finally(() => {
			unmount();
			restoreTerminalState();
		});
	});
}
