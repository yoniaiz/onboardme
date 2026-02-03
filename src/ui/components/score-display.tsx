import { Box, Text } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";
import { ProgressBar } from "./progress.tsx";

interface ScoreDisplayProps {
	totalCommits: number;
	currentStreak: number;
	currentQuestion: number;
	totalQuestions: number;
	gameId: string;
}

export function ScoreDisplay({
	totalCommits,
	currentStreak,
	currentQuestion,
	totalQuestions,
	gameId,
}: ScoreDisplayProps): React.ReactElement {
	const { colors, symbols } = useTheme();
	const percentage =
		totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

	return (
		<Box
			flexDirection="column"
			borderStyle="single"
			borderColor={colors.muted}
			paddingX={1}
		>
			<Box justifyContent="space-between">
				<Text color={colors.muted}>{gameId}</Text>
			</Box>
			<Box gap={3}>
				<Text>
					<Text color={colors.gold}>{symbols.star}</Text>{" "}
					<Text bold color={colors.gold}>
						{totalCommits}
					</Text>{" "}
					<Text color={colors.muted}>commits</Text>
				</Text>
				<Text>
					<Text color={colors.primary}>🔥</Text>{" "}
					<Text bold color={colors.primary}>
						{currentStreak}
					</Text>{" "}
					<Text color={colors.muted}>streak</Text>
				</Text>
				<Text>
					<Text color={colors.muted}>Progress: </Text>
					<Text color={colors.text}>
						{currentQuestion}/{totalQuestions}
					</Text>{" "}
					<ProgressBar percentage={percentage} width={10} />
				</Text>
			</Box>
		</Box>
	);
}
