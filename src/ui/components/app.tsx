import { Box, render, Text } from "ink";
import type React from "react";

interface AppProps {
	title: string;
	children?: React.ReactNode;
}

export function App({ title, children }: AppProps): React.ReactElement {
	return (
		<Box flexDirection="column" padding={1}>
			<Text bold color="cyan">
				{title}
			</Text>
			{children}
		</Box>
	);
}

export function renderApp(element: React.ReactElement): void {
	render(element);
}
