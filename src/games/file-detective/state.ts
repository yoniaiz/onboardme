import type {
	CaseNote,
	EvidenceCategoryId,
	InvestigationStep,
} from "./types.ts";

export interface FileDetectiveState {
	step: InvestigationStep;
	examined: Set<EvidenceCategoryId>;
	currentCategoryId: EvidenceCategoryId | null;
	currentQuestionIndex: number;
	caseNotes: CaseNote[];
	wrongAnswers: string[];
	startTime: number;
	totalCommits: number;
}

export type FileDetectiveAction =
	| { type: "START_INVESTIGATION" }
	| { type: "SELECT_CATEGORY"; categoryId: EvidenceCategoryId }
	| { type: "START_DEDUCTION" }
	| { type: "ANSWER_CORRECT"; caseNote: CaseNote }
	| { type: "CATEGORY_COMPLETE"; categoryId: EvidenceCategoryId }
	| { type: "ANSWER_WRONG"; answer: string }
	| { type: "ADD_COMMITS"; amount: number }
	| { type: "ADVANCE_QUESTION" }
	| { type: "BACK_TO_SELECT" };

export function createInitialState(): FileDetectiveState {
	return {
		step: "briefing",
		examined: new Set(),
		currentCategoryId: null,
		currentQuestionIndex: 0,
		caseNotes: [],
		wrongAnswers: [],
		startTime: Date.now(),
		totalCommits: 0,
	};
}
