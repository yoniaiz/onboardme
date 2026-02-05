import type React from "react";
import { useCallback, useReducer, useRef, useState } from "react";
import type { AnswerResult, GameProps } from "@/types/game.ts";
import {
	getCurrentCategory,
	getResult,
	getSelectableEvidence,
	toAnswerResult,
	validateAnswer,
} from "./logic.ts";
import { fileDetectiveReducer } from "./reducer.ts";
import { AnswerFeedbackScreen, DeductionResultOverlay } from "./screens.tsx";
import { createInitialState } from "./state.ts";
import type { EvidenceCategoryId, FileDetectiveConfig } from "./types.ts";
import { FileDetectiveUI } from "./ui.tsx";

type OverlayState =
	| { type: "none" }
	| { type: "answer-feedback"; result: AnswerResult; insight?: string }
	| {
			type: "deduction-result";
			playerChoice: string;
			correctAnswer: string;
			correct: boolean;
			commitsEarned: number;
			missedClues?: string[];
	  };

export function FileDetectiveComponent({
	config,
	onAnswerResult,
	onGameComplete,
}: GameProps<FileDetectiveConfig>): React.ReactElement {
	const [state, dispatch] = useReducer(
		fileDetectiveReducer,
		undefined,
		createInitialState,
	);
	const completionTriggered = useRef(false);
	const [overlay, setOverlay] = useState<OverlayState>({ type: "none" });
	const [inlineResult, setInlineResult] = useState<AnswerResult | null>(null);

	const handleStartInvestigation = useCallback(() => {
		dispatch({ type: "START_INVESTIGATION" });
	}, []);

	const handleSelectCategory = useCallback(
		(categoryId: EvidenceCategoryId) => {
			dispatch({ type: "SELECT_CATEGORY", categoryId });
			onAnswerResult({
				correct: true,
				feedback: "",
				commitsEarned: 0,
				isNavigation: true,
			});
		},
		[onAnswerResult],
	);

	const handleStartDeduction = useCallback(() => {
		dispatch({ type: "START_DEDUCTION" });
		onAnswerResult({
			correct: true,
			feedback: "",
			commitsEarned: 0,
			isNavigation: true,
		});
	}, [onAnswerResult]);

	const handleDeductionComplete = useCallback(() => {
		if (completionTriggered.current) return;
		completionTriggered.current = true;
		onGameComplete(getResult(state));
	}, [onGameComplete, state]);

	const handleSubmitAnswer = useCallback(
		(answer: string) => {
			const result = validateAnswer(state, config, answer);
			const answerResult = toAnswerResult(result);
			onAnswerResult(answerResult);

			if (state.step === "deduction") {
				if (!result.isCorrect) {
					dispatch({ type: "ANSWER_WRONG", answer });
				}

				if (result.isCorrect && result.commitsEarned > 0) {
					dispatch({ type: "ADD_COMMITS", amount: result.commitsEarned });
				}

				const correctAnswer =
					config.deduction.options.find(
						(option) => option.id === config.deduction.correctId,
					)?.label ?? config.projectType.projectType;

				const selectedOption = config.deduction.options.find(
					(option) => option.label === answer,
				);

				setInlineResult(null);
				setOverlay({
					type: "deduction-result",
					playerChoice: answer,
					correctAnswer,
					correct: result.isCorrect,
					commitsEarned: result.commitsEarned,
					missedClues: !result.isCorrect
						? selectedOption?.missedClues
						: undefined,
				});
				return;
			}

			if (!result.isCorrect) {
				dispatch({ type: "ANSWER_WRONG", answer });
				setInlineResult(answerResult);
				return;
			}

			setInlineResult(null);

			if (result.caseNote) {
				dispatch({ type: "ANSWER_CORRECT", caseNote: result.caseNote });
			}

			if (result.commitsEarned > 0) {
				dispatch({ type: "ADD_COMMITS", amount: result.commitsEarned });
			}

			if (state.step === "evidence") {
				const category = getCurrentCategory(state, config);
				if (category && result.categoryComplete) {
					dispatch({ type: "CATEGORY_COMPLETE", categoryId: category.id });
					const remaining = getSelectableEvidence(
						{ ...state, examined: new Set([...state.examined, category.id]) },
						config,
					);
					if (remaining.length === 0) {
						dispatch({ type: "START_DEDUCTION" });
					} else {
						dispatch({ type: "BACK_TO_SELECT" });
					}
				} else if (category && !result.categoryComplete) {
					dispatch({ type: "ADVANCE_QUESTION" });
				}
			}

			const currentCat = getCurrentCategory(state, config);
			const currentQ = currentCat?.questions[state.currentQuestionIndex];
			setOverlay({
				type: "answer-feedback",
				result: answerResult,
				insight: currentQ?.insight,
			});
		},
		[state, config, onAnswerResult],
	);

	const handleDeductionSelect = useCallback(
		(optionId: string) => {
			const option = config.deduction.options.find((o) => o.id === optionId);
			if (option) {
				handleSubmitAnswer(option.label);
			}
		},
		[config, handleSubmitAnswer],
	);

	const handleCategorySelect = useCallback(
		(categoryId: string) => {
			const category = config.evidence.find((c) => c.id === categoryId);
			if (category) {
				handleSelectCategory(category.id);
			}
		},
		[config, handleSelectCategory],
	);

	const currentCategory = getCurrentCategory(state, config);
	const currentQuestion =
		currentCategory?.questions[state.currentQuestionIndex];

	if (overlay.type === "answer-feedback") {
		return (
			<AnswerFeedbackScreen
				result={overlay.result}
				insight={overlay.insight}
				onContinue={() => setOverlay({ type: "none" })}
			/>
		);
	}

	if (overlay.type === "deduction-result") {
		return (
			<DeductionResultOverlay
				playerChoice={overlay.playerChoice}
				correctAnswer={overlay.correctAnswer}
				projectInfo={config.projectType}
				correct={overlay.correct}
				commitsEarned={overlay.commitsEarned}
				missedClues={overlay.missedClues}
				onContinue={() => {
					if (overlay.correct) {
						handleDeductionComplete();
					} else {
						setOverlay({ type: "none" });
					}
				}}
			/>
		);
	}

	return (
		<FileDetectiveUI
			state={state}
			config={config}
			currentQuestion={currentQuestion ?? null}
			wrongAnswers={state.wrongAnswers}
			inlineResult={inlineResult}
			onStartInvestigation={handleStartInvestigation}
			onSelectCategory={handleCategorySelect}
			onStartDeduction={handleStartDeduction}
			onDeductionSelect={handleDeductionSelect}
			onSubmitAnswer={handleSubmitAnswer}
		/>
	);
}
