import { Box, Text, useInput } from "ink";
import type React from "react";
import type { AnswerResult } from "@/types/game.ts";
import { DeductionResultScreen } from "@/ui/components/deduction.tsx";
import { FeedbackDisplay } from "@/ui/components/question.tsx";
import { useTheme } from "@/ui/theme.tsx";
import type { ProjectTypeInfo } from "./types.ts";

interface AnswerFeedbackScreenProps {
	result: AnswerResult;
	insight?: string;
	onContinue: () => void;
}

export function AnswerFeedbackScreen({
	result,
	insight,
	onContinue,
}: AnswerFeedbackScreenProps): React.ReactElement {
	const { colors } = useTheme();

	useInput(() => {
		onContinue();
	});

	return (
		<Box flexDirection="column" gap={1}>
			<FeedbackDisplay result={result} />
			{insight && result.correct && (
				<Box
					flexDirection="column"
					borderStyle="round"
					borderColor={colors.secondary}
					paddingX={2}
					paddingY={1}
				>
					<Text bold color={colors.secondary}>
						INSIGHT:
					</Text>
					<Text color={colors.text}>{insight}</Text>
				</Box>
			)}
			<Text color={colors.muted}>Press any key to continue</Text>
		</Box>
	);
}

interface DeductionResultOverlayProps {
	playerChoice: string;
	correctAnswer: string;
	projectInfo: ProjectTypeInfo;
	correct: boolean;
	commitsEarned: number;
	missedClues?: string[];
	onContinue: () => void;
}

export function DeductionResultOverlay({
	playerChoice,
	correctAnswer,
	projectInfo,
	correct,
	commitsEarned,
	missedClues,
	onContinue,
}: DeductionResultOverlayProps): React.ReactElement {
	const { colors } = useTheme();

	useInput(() => {
		onContinue();
	});

	return (
		<Box flexDirection="column" gap={1}>
			<DeductionResultScreen
				playerChoice={playerChoice}
				correctAnswer={correctAnswer}
				projectInfo={projectInfo}
				correct={correct}
				commitsEarned={commitsEarned}
				missedClues={missedClues}
			/>
			<Text color={colors.muted}>Press any key to continue</Text>
		</Box>
	);
}
