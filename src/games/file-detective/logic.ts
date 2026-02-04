import { DEDUCTION_OPTION_TEXT } from "@/core/constants.ts";
import type { AnswerResult, GameResult } from "@/types/game.ts";
import type { FileDetectiveState } from "./state.ts";
import type {
	CaseNote,
	EvidenceCategory,
	FileDetectiveConfig,
} from "./types.ts";

export interface ValidationResult {
	isCorrect: boolean;
	feedback: string;
	commitsEarned: number;
	isNavigation: boolean;
	caseNote?: CaseNote;
	categoryComplete?: boolean;
	shouldStartDeduction?: boolean;
}

export function validateAnswer(
	state: FileDetectiveState,
	config: FileDetectiveConfig,
	answer: string,
): ValidationResult {
	if (state.step === "select") {
		return validateSelectAnswer(config, answer);
	}
	if (state.step === "evidence") {
		return validateEvidenceAnswer(state, config, answer);
	}
	return validateDeductionAnswer(config, answer);
}

function validateSelectAnswer(
	config: FileDetectiveConfig,
	answer: string,
): ValidationResult {
	if (answer === DEDUCTION_OPTION_TEXT) {
		return {
			isCorrect: true,
			feedback: "",
			commitsEarned: 0,
			isNavigation: true,
			shouldStartDeduction: true,
		};
	}

	const category = config.evidence.find((item) => item.title === answer);
	if (!category) {
		return {
			isCorrect: false,
			feedback: "Invalid selection.",
			commitsEarned: 0,
			isNavigation: false,
		};
	}

	return {
		isCorrect: true,
		feedback: "",
		commitsEarned: 0,
		isNavigation: true,
	};
}

function validateEvidenceAnswer(
	state: FileDetectiveState,
	config: FileDetectiveConfig,
	answer: string,
): ValidationResult {
	const category = getCurrentCategory(state, config);
	if (!category) {
		return {
			isCorrect: false,
			feedback: "No evidence selected.",
			commitsEarned: 0,
			isNavigation: false,
		};
	}

	const question = category.questions[state.currentQuestionIndex];
	const correct = question.correctAnswer
		? normalize(answer) === normalize(question.correctAnswer)
		: true;

	if (!correct) {
		return {
			isCorrect: false,
			feedback: "Not quite right. Try again!",
			commitsEarned: 0,
			isNavigation: false,
		};
	}

	const caseNote: CaseNote = {
		id: `${category.id}-${question.id}`,
		categoryId: category.id,
		text: `${question.prompt} ${answer}`,
	};

	const isLastQuestion =
		state.currentQuestionIndex >= category.questions.length - 1;

	return {
		isCorrect: true,
		feedback: isLastQuestion
			? "Correct! Evidence logged."
			: "Correct! Evidence noted.",
		commitsEarned: 10,
		isNavigation: false,
		caseNote,
		categoryComplete: isLastQuestion,
	};
}

function validateDeductionAnswer(
	config: FileDetectiveConfig,
	answer: string,
): ValidationResult {
	const correctLabel = getCorrectDeductionLabel(config);
	const correct =
		correctLabel.length > 0
			? answer === correctLabel
			: normalize(answer) === normalize(config.projectType.projectType);

	if (!correct) {
		return {
			isCorrect: false,
			feedback: "That deduction does not fit the evidence. Try again!",
			commitsEarned: 0,
			isNavigation: false,
		};
	}

	return {
		isCorrect: true,
		feedback: "Deduction confirmed.",
		commitsEarned: 10,
		isNavigation: false,
	};
}

export function getCurrentCategory(
	state: FileDetectiveState,
	config: FileDetectiveConfig,
): EvidenceCategory | null {
	if (!state.currentCategoryId) return null;
	return config.evidence.find((c) => c.id === state.currentCategoryId) ?? null;
}

export function getSelectableEvidence(
	state: FileDetectiveState,
	config: FileDetectiveConfig,
): EvidenceCategory[] {
	return config.evidence.filter((item) => !state.examined.has(item.id));
}

function getCorrectDeductionLabel(config: FileDetectiveConfig): string {
	return (
		config.deduction.options.find(
			(option) => option.id === config.deduction.correctId,
		)?.label ?? ""
	);
}

export function isComplete(state: FileDetectiveState): boolean {
	return state.step === "deduction" && state.caseNotes.length > 0;
}

export function getResult(state: FileDetectiveState): GameResult {
	return {
		completed: isComplete(state),
		score: state.totalCommits,
		maxScore: 100,
		timeSpent: Date.now() - state.startTime,
		knowledgeUnlocked: state.caseNotes.map((n) => n.text),
	};
}

export function toAnswerResult(result: ValidationResult): AnswerResult {
	return {
		correct: result.isCorrect,
		feedback: result.feedback,
		commitsEarned: result.commitsEarned,
		isNavigation: result.isNavigation,
	};
}

function normalize(value: string): string {
	return value.trim().toLowerCase();
}
