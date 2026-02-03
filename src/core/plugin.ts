import type {
	AnswerResult,
	GamePluginSchema,
	GamePreparedData,
	GameQuestion,
	GameResult,
	GameRuntimeProgress,
} from "./types.ts";

export abstract class GamePlugin {
	abstract readonly schema: GamePluginSchema;

	protected preparedData!: GamePreparedData;
	protected questions: GameQuestion[] = [];
	protected currentIndex = 0;
	protected startTime = 0;
	protected totalCommits = 0;
	protected knowledgeUnlocked: string[] = [];

	abstract initialize(preparedData: GamePreparedData): Promise<void>;
	abstract start(): Promise<void>;
	abstract submitAnswer(answer: string): Promise<AnswerResult>;

	getCurrentQuestion(): GameQuestion | null {
		if (this.currentIndex >= this.questions.length) {
			return null;
		}
		return this.questions[this.currentIndex];
	}

	end(): GameResult {
		const timeSpent = this.startTime > 0 ? Date.now() - this.startTime : 0;
		return {
			completed: this.isComplete(),
			score: this.totalCommits,
			maxScore: this.questions.length * 10,
			timeSpent,
			knowledgeUnlocked: [...this.knowledgeUnlocked],
		};
	}

	isComplete(): boolean {
		return this.currentIndex >= this.questions.length;
	}

	getProgress(): GameRuntimeProgress {
		return {
			current: this.currentIndex,
			total: this.questions.length,
		};
	}

	onCorrectAnswer(_question: GameQuestion): void {}
	onWrongAnswer(_question: GameQuestion): void {}
	onHintUsed(_question: GameQuestion): void {}
	onSkip(_question: GameQuestion): void {}

	protected advanceToNextQuestion(): void {
		this.currentIndex++;
	}

	protected addCommits(amount: number): void {
		this.totalCommits += amount;
	}

	protected addKnowledge(knowledge: string[]): void {
		this.knowledgeUnlocked.push(...knowledge);
	}
}
