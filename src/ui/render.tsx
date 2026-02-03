import { render } from "ink";
import type React from "react";
import { ThemeProvider } from "./theme.tsx";

export function renderScreen(element: React.ReactElement): void {
	const { unmount } = render(<ThemeProvider>{element}</ThemeProvider>);

	if (!process.stdout.isTTY) {
		unmount();
	}
}
