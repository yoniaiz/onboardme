import { parseArgs } from "node:util";
import { registerGame } from "@/core/registry.ts";
import { createMockQuestions, MockGame } from "@/games/mock/index.ts";
import { GameTestHarness } from "./harness.ts";

interface RunnerOptions {
	game: string;
	questions: number;
	answers?: string[];
	interactive: boolean;
	acceptedAnswer: string;
}

async function parseRunnerArgs(): Promise<RunnerOptions> {
	const { values } = parseArgs({
		args: process.argv.slice(2),
		options: {
			game: { type: "string", default: "mock-game" },
			questions: { type: "string", default: "3" },
			answers: { type: "string" },
			interactive: { type: "boolean", default: false },
			accepted: { type: "string", default: "correct" },
		},
	});

	return {
		game: values.game ?? "mock-game",
		questions: Number.parseInt(values.questions ?? "3", 10),
		answers: values.answers?.split(","),
		interactive: values.interactive ?? false,
		acceptedAnswer: values.accepted ?? "correct",
	};
}

async function runInteractive(harness: GameTestHarness): Promise<void> {
	const readline = await import("node:readline");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const askQuestion = (prompt: string): Promise<string> =>
		new Promise((resolve) => {
			rl.question(prompt, resolve);
		});

	console.log("\n--- Interactive Mode ---\n");

	while (harness.getCurrentQuestion()) {
		const question = harness.getCurrentQuestion();
		if (!question) break;

		console.log(`\nQuestion: ${question.prompt}`);
		if (question.context) {
			console.log(`Context: ${question.context}`);
		}
		if (question.options) {
			question.options.forEach((opt, i) => {
				console.log(`  ${i + 1}. ${opt}`);
			});
		}

		const answer = await askQuestion("\nYour answer: ");
		const result = await harness.submitAnswer(answer);

		console.log(`\n${result.correct ? "✓ Correct!" : "✗ Incorrect"}`);
		console.log(`Commits earned: ${result.commitsEarned}`);
	}

	rl.close();

	const progress = harness.getProgress();
	console.log("\n--- Session Complete ---");
	console.log(`Total commits: ${progress.sessionStats.totalCommits}`);
	console.log(`Questions answered: ${progress.sessionStats.questionsAnswered}`);
	console.log(`Correct: ${progress.sessionStats.correctAnswers}`);
}

async function runAutomated(
	harness: GameTestHarness,
	answers: string[],
): Promise<void> {
	console.log("\n--- Automated Mode ---\n");
	console.log(`Running with answers: ${answers.join(", ")}\n`);

	const results = await harness.submitAnswerSequence(answers);

	results.forEach((result, i) => {
		console.log(
			`Q${i + 1}: ${result.correct ? "✓" : "✗"} (${result.commitsEarned} commits)`,
		);
	});

	const progress = harness.getProgress();
	console.log("\n--- Results ---");
	console.log(`Total commits: ${progress.sessionStats.totalCommits}`);
	console.log(
		`Correct: ${progress.sessionStats.correctAnswers}/${answers.length}`,
	);
}

async function main(): Promise<void> {
	const options = await parseRunnerArgs();

	console.log("OnboardMe Test Runner");
	console.log("=====================");
	console.log(`Game: ${options.game}`);
	console.log(`Questions: ${options.questions}`);

	registerGame("mock-game", MockGame);

	const questions = createMockQuestions(options.questions, "text-input");

	const harness = await GameTestHarness.create({
		games: [
			{
				id: options.game,
				plugin: MockGame,
				questions,
				config: {
					questionCount: options.questions,
					acceptedAnswer: options.acceptedAnswer,
				},
			},
		],
	});

	try {
		if (options.interactive) {
			await runInteractive(harness);
		} else if (options.answers) {
			await runAutomated(harness, options.answers);
		} else {
			console.log(
				"\nNo answers provided. Running with default correct answers...",
			);
			const defaultAnswers = Array(options.questions).fill(
				options.acceptedAnswer,
			);
			await runAutomated(harness, defaultAnswers);
		}
	} finally {
		await harness.cleanup();
	}
}

main().catch(console.error);
