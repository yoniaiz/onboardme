import { Box, Text, useInput } from "ink";
import type React from "react";
import type { AnswerResult } from "@/types/game.ts";
import { DeductionScreen } from "@/ui/components/deduction.tsx";
import { EvidenceBoard } from "@/ui/components/evidence-board.tsx";
import { FeedbackDisplay, QuestionDisplay } from "@/ui/components/question.tsx";
import { useTheme } from "@/ui/theme.tsx";
import type { FileDetectiveState } from "./state.ts";
import type { EvidenceQuestion, FileDetectiveConfig } from "./types.ts";

interface CaseBriefingProps {
	projectType: string;
	onStart: () => void;
}

function CaseBriefing({
	projectType,
	onStart,
}: CaseBriefingProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	useInput(() => {
		onStart();
	});

	return (
		<Box
			flexDirection="column"
			borderStyle="double"
			borderColor={colors.gold}
			paddingX={2}
			paddingY={1}
		>
			<Box justifyContent="center" marginBottom={1}>
				<Text bold color={colors.gold}>
					{symbols.star} NEW CASE ASSIGNMENT {symbols.star}
				</Text>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text color={colors.text}>
					Detective, a new codebase has arrived for analysis.
				</Text>
				<Text color={colors.text}>
					Your mission: Investigate and identify the project type.
				</Text>

				<Box marginTop={1}>
					<Text color={colors.muted}>Target Classification: </Text>
					<Text color={colors.secondary}>{projectType}</Text>
				</Box>
			</Box>

			<Box marginTop={2} justifyContent="center">
				<Text color={colors.muted}>
					Press any key to begin investigation...
				</Text>
			</Box>
		</Box>
	);
}

interface FileDetectiveUIProps {
	state: FileDetectiveState;
	config: FileDetectiveConfig;
	currentQuestion: EvidenceQuestion | null;
	wrongAnswers: string[];
	inlineResult: AnswerResult | null;
	onStartInvestigation: () => void;
	onSelectCategory: (categoryId: string) => void;
	onStartDeduction: () => void;
	onDeductionSelect: (optionId: string) => void;
	onSubmitAnswer: (answer: string) => void;
}

export function FileDetectiveUI({
	state,
	config,
	currentQuestion,
	wrongAnswers,
	inlineResult,
	onStartInvestigation,
	onSelectCategory,
	onStartDeduction,
	onDeductionSelect,
	onSubmitAnswer,
}: FileDetectiveUIProps): React.ReactElement {
	if (state.step === "briefing") {
		return (
			<CaseBriefing
				projectType={config.projectType.projectType}
				onStart={onStartInvestigation}
			/>
		);
	}

	if (state.step === "select") {
		return (
			<EvidenceBoard
				categories={config.evidence}
				examinedCategories={Array.from(state.examined)}
				caseNotes={state.caseNotes}
				onSelectCategory={onSelectCategory}
				onStartDeduction={onStartDeduction}
			/>
		);
	}

	if (state.step === "deduction") {
		return (
			<DeductionScreen
				prompt={config.deduction.prompt}
				options={config.deduction.options}
				caseNotes={state.caseNotes}
				onSelect={onDeductionSelect}
				wrongAnswers={wrongAnswers}
			/>
		);
	}

	if (currentQuestion) {
		const isMultipleChoice = Array.isArray(currentQuestion.options);
		return (
			<Box flexDirection="column" gap={1}>
				<QuestionDisplay
					question={{
						id: currentQuestion.id,
						type: isMultipleChoice ? "multiple-choice" : "text-input",
						prompt: currentQuestion.prompt,
						hints: [],
						options: currentQuestion.options,
					}}
					onSubmit={onSubmitAnswer}
					wrongAnswers={wrongAnswers}
				/>
				{inlineResult && !inlineResult.correct && (
					<FeedbackDisplay result={inlineResult} />
				)}
			</Box>
		);
	}

	return <Box />;
}
