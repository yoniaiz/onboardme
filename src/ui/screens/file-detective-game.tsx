import { Box, Text } from "ink";
import type React from "react";
import type { AnswerResult } from "@/core/types.ts";
import type {
	FileDetectiveConfig,
	InvestigationState,
	ProjectTypeInfo,
} from "@/games/file-detective/types.ts";
import {
	DeductionResultScreen,
	DeductionScreen,
	EvidenceBoard,
	MonsterReaction,
} from "../components/index.tsx";
import { QuestionDisplay } from "../components/question.tsx";
import { useTheme } from "../theme.tsx";

const FILE_DETECTIVE_DIALOGUE = [
	"*crackle*",
	"",
	"*something shifts in the codebase*",
	"",
	'"Hmm."',
	"",
	"*tangle tangle*",
	"",
	'"You actually looked before you leaped."',
	"",
	"*slrrrrp*",
	"",
	'"Examined the evidence. Drew conclusions."',
	"",
	"*pause*",
	"",
	"\"Identified the tech stack without grep'ing for 'framework'.\"",
	"",
	"*static spike*",
	"",
	"\"That's... that's not how this usually goes.\"",
	"",
	"*whirrrr*",
	"",
	"\"Usually they just open package.json, say 'ah, JavaScript,'\"",
	'" and start typing things."',
	"",
	"*creak*",
	"",
	'"You\'re methodical."',
	"",
	"*pause*",
	"",
	'"I don\'t like methodical."',
	"",
	"*hrrrrnn*",
	"",
	'"Methodical people find things."',
	"",
	"*kzzzt*",
	"",
	'"I\'m watching you."',
	"",
	"*[SIGNAL LOST]*",
];

export interface DeductionResult {
	playerChoice: string;
	correctAnswer: string;
	projectInfo: ProjectTypeInfo;
	correct: boolean;
	commitsEarned: number;
}

interface FileDetectiveFeedbackProps {
	result: AnswerResult;
}

function FileDetectiveFeedback({
	result,
}: FileDetectiveFeedbackProps): React.ReactElement {
	const { colors } = useTheme();

	return (
		<Box flexDirection="column" gap={1}>
			<Box
				flexDirection="column"
				borderStyle="round"
				borderColor={result.correct ? colors.primary : colors.error}
				paddingX={2}
				paddingY={1}
			>
				<Box justifyContent="space-between">
					<Text bold color={result.correct ? colors.primary : colors.error}>
						{result.correct ? "✓ CORRECT" : "✗ TRY AGAIN"}
					</Text>
					{result.correct && result.commitsEarned > 0 && (
						<Text color={colors.gold}>+{result.commitsEarned} commits</Text>
					)}
				</Box>
				<Text> </Text>
				<Text color={colors.muted}>{result.feedback}</Text>
			</Box>
		</Box>
	);
}

interface FileDetectiveDeductionResultProps {
	deductionResult: DeductionResult;
}

export function FileDetectiveDeductionResult({
	deductionResult,
}: FileDetectiveDeductionResultProps): React.ReactElement {
	return (
		<DeductionResultScreen
			playerChoice={deductionResult.playerChoice}
			correctAnswer={deductionResult.correctAnswer}
			projectInfo={deductionResult.projectInfo}
			correct={deductionResult.correct}
			commitsEarned={deductionResult.commitsEarned}
		/>
	);
}

interface FileDetectiveMonsterProps {
	onContinue: () => void;
}

export function FileDetectiveMonster({
	onContinue,
}: FileDetectiveMonsterProps): React.ReactElement {
	return (
		<MonsterReaction
			dialogue={FILE_DETECTIVE_DIALOGUE}
			onContinue={onContinue}
		/>
	);
}

interface FileDetectiveUIProps {
	investigationState: InvestigationState;
	config: FileDetectiveConfig;
	currentQuestion: unknown;
	lastResult: AnswerResult | null;
	wrongAnswers: string[];
	disabled: boolean;
	onSelectCategory: (categoryId: string) => void;
	onStartDeduction: () => void;
	onDeductionSelect: (optionId: string) => void;
	onSubmitAnswer: (answer: string) => void;
}

export function FileDetectiveUI({
	investigationState,
	config,
	currentQuestion,
	lastResult,
	wrongAnswers,
	disabled,
	onSelectCategory,
	onStartDeduction,
	onDeductionSelect,
	onSubmitAnswer,
}: FileDetectiveUIProps): React.ReactElement | null {
	const step = investigationState.step;

	if (disabled && lastResult?.feedback) {
		return <FileDetectiveFeedback result={lastResult} />;
	}

	if (step === "select") {
		return (
			<EvidenceBoard
				categories={config.evidence}
				examinedCategories={investigationState.examinedCategories}
				caseNotes={investigationState.caseNotes}
				onSelectCategory={onSelectCategory}
				onStartDeduction={onStartDeduction}
				disabled={disabled}
			/>
		);
	}

	if (step === "deduction") {
		return (
			<DeductionScreen
				prompt={config.deduction.prompt}
				options={config.deduction.options}
				caseNotes={investigationState.caseNotes}
				onSelect={onDeductionSelect}
				disabled={disabled}
				wrongAnswers={wrongAnswers}
			/>
		);
	}

	if (currentQuestion) {
		return (
			<QuestionDisplay
				question={
					currentQuestion as Parameters<typeof QuestionDisplay>[0]["question"]
				}
				onSubmit={onSubmitAnswer}
				disabled={disabled}
				wrongAnswers={wrongAnswers}
			/>
		);
	}

	return null;
}

export function buildDeductionResult(
	answer: string,
	config: FileDetectiveConfig,
	result: AnswerResult,
): DeductionResult {
	const correctOption = config.deduction.options.find(
		(opt) => opt.id === config.deduction.correctId,
	);

	return {
		playerChoice: answer,
		correctAnswer: correctOption?.label ?? config.projectType.projectType,
		projectInfo: config.projectType,
		correct: result.correct,
		commitsEarned: result.commitsEarned,
	};
}
