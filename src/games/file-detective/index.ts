import { DEDUCTION_OPTION_TEXT } from "@/core/constants.ts";
import { GamePlugin } from "@/core/plugin.ts";
import type {
	AnswerResult,
	GamePreparedData,
	GameQuestion,
} from "@/core/types.ts";
import { createDefaultConfig, parseConfig } from "./config.ts";
import { schema } from "./schema.ts";
import type {
	CaseNote,
	EvidenceCategory,
	EvidenceCategoryId,
	FileDetectiveConfig,
	InvestigationState,
	InvestigationStep,
} from "./types.ts";

const DEDUCTION_OPTION = DEDUCTION_OPTION_TEXT;
export class FileDetective extends GamePlugin {
	readonly schema = schema;
	private config: FileDetectiveConfig = createDefaultConfig();
	private examined = new Set<EvidenceCategoryId>();
	private caseNotes: CaseNote[] = [];
	private step: InvestigationStep = "select";
	private currentCategory: EvidenceCategory | null = null;
	private categoryQuestionIndex = 0;
	async initialize(preparedData: GamePreparedData): Promise<void> {
		this.preparedData = preparedData;
		this.config = parseConfig(preparedData.config);
		this.questions = [this.buildSelectQuestion()];
		this.currentIndex = 0;
		this.examined = new Set<EvidenceCategoryId>();
		this.caseNotes = [];
		this.step = "select";
		this.currentCategory = null;
		this.categoryQuestionIndex = 0;
	}
	async start(): Promise<void> {
		this.startTime = Date.now();
	}
	async submitAnswer(answer: string): Promise<AnswerResult> {
		const question = this.getCurrentQuestion();
		if (!question) {
			return {
				correct: false,
				feedback: "No active question.",
				commitsEarned: 0,
			};
		}

		if (this.step === "select") {
			return this.handleSelect(answer);
		}
		if (this.step === "evidence") {
			return this.handleEvidence(answer);
		}
		return this.handleDeduction(answer);
	}

	getInvestigationState(): InvestigationState {
		return {
			step: this.step,
			examinedCategories: Array.from(this.examined),
			caseNotes: [...this.caseNotes],
			currentCategoryId: this.currentCategory?.id ?? null,
			totalCategories: this.config.evidence.length,
		};
	}

	getConfig(): FileDetectiveConfig {
		return this.config;
	}

	getProgress(): { current: number; total: number } {
		const totalCategories = this.config.evidence.length;
		const examinedCount = this.examined.size;
		const inDeduction = this.step === "deduction";
		return {
			current: inDeduction ? totalCategories : examinedCount,
			total: totalCategories,
		};
	}

	private handleSelect(answer: string): AnswerResult {
		const nextQuestion =
			answer === DEDUCTION_OPTION
				? this.startDeduction()
				: this.startEvidence(answer);

		if (!nextQuestion) {
			return {
				correct: true,
				feedback: "",
				commitsEarned: 0,
				isNavigation: true,
			};
		}

		this.questions.push(nextQuestion);
		this.advanceToNextQuestion();
		return {
			correct: true,
			feedback: "",
			commitsEarned: 0,
			isNavigation: true,
		};
	}

	private handleEvidence(answer: string): AnswerResult {
		const category = this.currentCategory;
		if (!category) {
			return {
				correct: false,
				feedback: "No evidence selected.",
				commitsEarned: 0,
			};
		}

		const question = category.questions[this.categoryQuestionIndex];
		const correct = question.correctAnswer
			? normalize(answer) === normalize(question.correctAnswer)
			: true;

		if (!correct) {
			return {
				correct: false,
				feedback: "Not quite right. Try again!",
				commitsEarned: 0,
			};
		}

		this.caseNotes.push({
			id: `${category.id}-${question.id}`,
			categoryId: category.id,
			text: `${question.prompt} ${answer}`,
		});

		if (this.categoryQuestionIndex < category.questions.length - 1) {
			this.categoryQuestionIndex++;
			this.questions.push(this.buildEvidenceQuestion(category));
			this.advanceToNextQuestion();
			return this.createResult(true, "Correct! Evidence noted.");
		}

		this.examined.add(category.id);
		this.currentCategory = null;
		this.categoryQuestionIndex = 0;

		const remaining = this.getSelectableEvidence();

		if (remaining.length > 0) {
			this.step = "select";
		}

		const nextQuestion =
			remaining.length === 0
				? this.startDeduction()
				: this.buildSelectQuestion();

		this.questions.push(nextQuestion);
		this.advanceToNextQuestion();
		return this.createResult(true, "Correct! Evidence logged.");
	}

	private handleDeduction(answer: string): AnswerResult {
		const correctLabel = this.getCorrectDeductionLabel();
		const correct =
			correctLabel.length > 0
				? answer === correctLabel
				: normalize(answer) === normalize(this.config.projectType.projectType);

		if (!correct) {
			return {
				correct: false,
				feedback: "That deduction does not fit the evidence. Try again!",
				commitsEarned: 0,
			};
		}

		this.advanceToNextQuestion();

		return this.createResult(true, "Deduction confirmed.");
	}

	private startEvidence(answer: string): GameQuestion | null {
		const category = this.config.evidence.find((item) => item.title === answer);
		if (!category) {
			return null;
		}
		this.step = "evidence";
		this.currentCategory = category;
		this.categoryQuestionIndex = 0;
		return this.buildEvidenceQuestion(category);
	}

	private startDeduction(): GameQuestion {
		this.step = "deduction";
		return this.buildDeductionQuestion();
	}

	private buildSelectQuestion(): GameQuestion {
		const options = this.getSelectableEvidence().map((item) => item.title);
		options.push(DEDUCTION_OPTION);
		return {
			id: `select-${this.questions.length + 1}`,
			type: "multiple-choice",
			prompt: "Choose evidence to examine.",
			context: `Case notes: ${this.caseNotes.length}`,
			hints: [],
			options,
		};
	}

	private buildEvidenceQuestion(category: EvidenceCategory): GameQuestion {
		const question = category.questions[this.categoryQuestionIndex];
		const isMultipleChoice = Array.isArray(question.options);
		return {
			id: `evidence-${category.id}-${question.id}`,
			type: isMultipleChoice ? "multiple-choice" : "text-input",
			prompt: question.prompt,
			context: category.description,
			hints: [],
			options: question.options,
		};
	}

	private buildDeductionQuestion(): GameQuestion {
		const options = this.config.deduction.options.map((option) => option.label);
		if (options.length === 0) {
			return {
				id: "deduction",
				type: "text-input",
				prompt: this.config.deduction.prompt,
				hints: [],
			};
		}
		return {
			id: "deduction",
			type: "multiple-choice",
			prompt: this.config.deduction.prompt,
			hints: [],
			options,
		};
	}

	private getCorrectDeductionLabel(): string {
		return (
			this.config.deduction.options.find(
				(option) => option.id === this.config.deduction.correctId,
			)?.label ?? ""
		);
	}

	private getSelectableEvidence(): EvidenceCategory[] {
		return this.config.evidence.filter((item) => !this.examined.has(item.id));
	}

	private createResult(correct: boolean, feedback: string): AnswerResult {
		const commitsEarned = correct ? 10 : 0;
		if (commitsEarned > 0) {
			this.addCommits(commitsEarned);
		}
		return { correct, feedback, commitsEarned };
	}
}

function normalize(value: string): string {
	return value.trim().toLowerCase();
}
