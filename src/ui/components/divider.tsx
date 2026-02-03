import { Box, Text } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";

interface DividerProps {
	width?: number;
}

export function Divider({ width = 60 }: DividerProps): React.ReactElement {
	const { colors } = useTheme();
	const line = "─".repeat(width);

	return (
		<Box>
			<Text color={colors.muted}>{line}</Text>
		</Box>
	);
}
