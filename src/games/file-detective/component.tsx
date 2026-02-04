import type React from "react";
import { useCallback, useEffect, useReducer, useRef } from "react";
import type { GameProps } from "@/types/game.ts";
import {
	getCurrentCategory,
	getResult,
	getSelectableEvidence,
	isComplete,
	toAnswerResult,
	validateAnswer,
} from "./logic.ts";
import { fileDetectiveReducer } from "./reducer.ts";
import { createInitialState } from "./state.ts";
import type { EvidenceCategoryId, FileDetectiveConfig } from "./types.ts";
import { FileDetectiveUI } from "./ui.tsx";

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

	const handleSubmitAnswer = useCallback(
		(answer: string) => {
			const result = validateAnswer(state, config, answer);
			const answerResult = toAnswerResult(result);
			onAnswerResult(answerResult);

			if (!result.isCorrect) {
				dispatch({ type: "ANSWER_WRONG", answer });
				return;
			}

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

	useEffect(() => {
		if (isComplete(state) && !completionTriggered.current) {
			completionTriggered.current = true;
			onGameComplete(getResult(state));
		}
	}, [state, onGameComplete]);

	const currentCategory = getCurrentCategory(state, config);
	const currentQuestion =
		currentCategory?.questions[state.currentQuestionIndex];

	return (
		<FileDetectiveUI
			state={state}
			config={config}
			currentQuestion={currentQuestion ?? null}
			wrongAnswers={state.wrongAnswers}
			onSelectCategory={handleCategorySelect}
			onStartDeduction={handleStartDeduction}
			onDeductionSelect={handleDeductionSelect}
			onSubmitAnswer={handleSubmitAnswer}
		/>
	);
}
