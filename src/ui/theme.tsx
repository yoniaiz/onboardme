import type React from "react";
import { createContext, useContext } from "react";

export const theme = {
	colors: {
		primary: "#00ff88",
		secondary: "#00d4ff",
		error: "#ff6b6b",
		gold: "#ffd700",
		muted: "#6b6b6b",
		text: "#e4e4e4",
	},
	symbols: {
		success: "✓",
		error: "✗",
		warning: "⚠",
		info: "ℹ",
		arrow: "→",
		bullet: "•",
		star: "★",
		filledCircle: "●",
		emptyCircle: "○",
		filledBlock: "█",
		emptyBlock: "░",
	},
} as const;

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}

export function useTheme(): Theme {
	return useContext(ThemeContext);
}
