import { Box, Text } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";

export interface SessionStats {
	totalCommits: number;
	correctAnswers: number;
	totalAnswers: number;
	currentStreak: number;
	longestStreak: number;
}

interface SessionCompleteProps {
	stats: SessionStats;
}

export function SessionComplete({
	stats,
}: SessionCompleteProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	return (
		<Box flexDirection="column" gap={1}>
			<Box
				flexDirection="column"
				borderStyle="double"
				borderColor={colors.gold}
				paddingX={2}
				paddingY={1}
			>
				<Text bold color={colors.gold}>
					{symbols.star} SESSION COMPLETE {symbols.star}
				</Text>
			</Box>

			<Box flexDirection="column" paddingLeft={2}>
				<Text>
					<Text color={colors.gold}>{symbols.star}</Text> Total Commits:{" "}
					<Text bold color={colors.gold}>
						{stats.totalCommits}
					</Text>
				</Text>
				<Text>
					<Text color={colors.primary}>{symbols.success}</Text> Correct Answers:{" "}
					<Text color={colors.text}>
						{stats.correctAnswers}/{stats.totalAnswers}
					</Text>
				</Text>
				<Text>
					<Text color={colors.primary}>🔥</Text> Longest Streak:{" "}
					<Text color={colors.text}>{stats.longestStreak}</Text>
				</Text>
			</Box>

			<Text color={colors.muted}>Your progress has been saved.</Text>
		</Box>
	);
}
