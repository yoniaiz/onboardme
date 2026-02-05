import type { FileDetectiveAction, FileDetectiveState } from "./state.ts";

export function fileDetectiveReducer(
	state: FileDetectiveState,
	action: FileDetectiveAction,
): FileDetectiveState {
	switch (action.type) {
		case "START_INVESTIGATION":
			return {
				...state,
				step: "select",
			};

		case "SELECT_CATEGORY":
			return {
				...state,
				step: "evidence",
				currentCategoryId: action.categoryId,
				currentQuestionIndex: 0,
				wrongAnswers: [],
			};

		case "START_DEDUCTION":
			return {
				...state,
				step: "deduction",
				currentCategoryId: null,
				wrongAnswers: [],
			};

		case "ANSWER_CORRECT":
			return {
				...state,
				caseNotes: [...state.caseNotes, action.caseNote],
				wrongAnswers: [],
			};

		case "CATEGORY_COMPLETE": {
			const newExamined = new Set(state.examined);
			newExamined.add(action.categoryId);
			return {
				...state,
				examined: newExamined,
				currentCategoryId: null,
				currentQuestionIndex: 0,
			};
		}

		case "ANSWER_WRONG":
			return {
				...state,
				wrongAnswers: [...state.wrongAnswers, action.answer],
			};

		case "ADD_COMMITS":
			return {
				...state,
				totalCommits: state.totalCommits + action.amount,
			};

		case "ADVANCE_QUESTION":
			return {
				...state,
				currentQuestionIndex: state.currentQuestionIndex + 1,
				wrongAnswers: [],
			};

		case "BACK_TO_SELECT":
			return {
				...state,
				step: "select",
				currentCategoryId: null,
				wrongAnswers: [],
			};

		default:
			return state;
	}
}
