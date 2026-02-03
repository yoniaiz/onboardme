import { Text } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";

interface ProgressBarProps {
	percentage: number;
	width?: number;
}

export function ProgressBar({
	percentage,
	width = 20,
}: ProgressBarProps): React.ReactElement {
	const { colors, symbols } = useTheme();
	const clampedPercentage = Math.max(0, Math.min(100, percentage));
	const filled = Math.round((clampedPercentage / 100) * width);
	const empty = width - filled;

	return (
		<Text>
			[<Text color={colors.primary}>{symbols.filledBlock.repeat(filled)}</Text>
			<Text color={colors.muted}>{symbols.emptyBlock.repeat(empty)}</Text>]
		</Text>
	);
}

type StatusType = "completed" | "in_progress" | "pending";

interface StatusIconProps {
	status: StatusType;
}

export function StatusIcon({ status }: StatusIconProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	switch (status) {
		case "completed":
			return <Text color={colors.primary}>{symbols.success}</Text>;
		case "in_progress":
			return <Text color={colors.primary}>{symbols.filledCircle}</Text>;
		default:
			return <Text color={colors.muted}>{symbols.emptyCircle}</Text>;
	}
}
