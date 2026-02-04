import { Box } from "ink";
import type React from "react";
import { DeductionScreen } from "@/ui/components/deduction.tsx";
import { EvidenceBoard } from "@/ui/components/evidence-board.tsx";
import { QuestionDisplay } from "@/ui/components/question.tsx";
import type { FileDetectiveState } from "./state.ts";
import type { EvidenceQuestion, FileDetectiveConfig } from "./types.ts";

interface FileDetectiveUIProps {
	state: FileDetectiveState;
	config: FileDetectiveConfig;
	currentQuestion: EvidenceQuestion | null;
	wrongAnswers: string[];
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
	onSelectCategory,
	onStartDeduction,
	onDeductionSelect,
	onSubmitAnswer,
}: FileDetectiveUIProps): React.ReactElement {
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
			</Box>
		);
	}

	return <Box />;
}
