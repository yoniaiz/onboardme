import { join } from "node:path";
import { ensureDir, writeJson } from "@/lib/fs.ts";
import {
	getManifestPath,
	getOnboardMeDir,
	getPreparedDir,
	getStateDir,
	getTemplateDir,
} from "@/lib/paths.ts";

const rootDir = process.cwd();

async function setupDevEnvironment(): Promise<void> {
	console.log("Setting up development environment...\n");

	await ensureDir(getOnboardMeDir(rootDir));
	await ensureDir(getPreparedDir(rootDir));
	await ensureDir(getStateDir(rootDir));
	await ensureDir(getTemplateDir(rootDir));

	await writeJson(getManifestPath(rootDir), {
		version: "1.0.0",
		generatedAt: new Date().toISOString(),
		projectName: "OnboardMe Dev",
		games: [
			{
				id: "mock-game",
				name: "Mock Game",
				description: "A test game for development",
				difficulty: "easy",
				estimatedMinutes: 5,
				journeys: [
					{
						id: "dev-journey",
						name: "Dev Journey",
						entryPoint: "src/index.ts",
						checkpoints: ["src/commands/", "src/core/"],
					},
				],
				maxScore: 100,
			},
		],
	});
	console.log("✓ Created manifest.json");

	await writeJson(join(getTemplateDir(rootDir), "template.json"), {
		games: [{ id: "mock-game" }],
	});
	console.log("✓ Created template.json");

	const gamesDir = join(getPreparedDir(rootDir), "games", "mock-game");
	await ensureDir(gamesDir);
	await writeJson(join(gamesDir, "data.json"), {
		config: {
			questionCount: 5,
			acceptedAnswer: "correct",
			questionType: "text-input",
		},
		questions: [
			{
				id: "q1",
				type: "text-input",
				prompt: "What command initializes OnboardMe in a project?",
				context: "OnboardMe is a CLI tool with several commands.",
				hints: ["Think about starting fresh in a new project"],
			},
			{
				id: "q2",
				type: "text-input",
				prompt: "What file defines the game engine orchestration?",
				context: "The core game logic lives in src/core/",
				hints: ["It's named after what it does - run the games"],
			},
			{
				id: "q3",
				type: "multiple-choice",
				prompt: "Which directory contains prepared game data?",
				context: "OnboardMe stores various data in .onboardme/",
				hints: ["The data is ready to use"],
				options: ["context/", "prepared/", "state/", "template/"],
			},
			{
				id: "q4",
				type: "text-input",
				prompt: "What currency do players earn for correct answers?",
				context: "The scoring system uses a git-themed currency.",
				hints: ["Think about what you do when saving code changes"],
			},
			{
				id: "q5",
				type: "text-input",
				prompt: "What is the boss monster called?",
				context: "There's a final boss battle in OnboardMe.",
				hints: ["It's a type of code that's hard to maintain"],
			},
		],
	});
	console.log("✓ Created mock-game data.json");

	await writeJson(join(getStateDir(rootDir), "progress.json"), {
		version: "1.0.0",
		startedAt: null,
		lastPlayedAt: null,
		totalScore: 0,
		maxTotalScore: 0,
		currentGameId: null,
		currentGameIndex: 0,
		currentQuestionIndex: 0,
		games: {},
		stats: {
			totalCommits: 0,
			totalTime: 0,
			questionsAnswered: 0,
			correctAnswers: 0,
			hintsUsed: 0,
			longestCleanStreak: 0,
			currentCleanStreak: 0,
		},
		checkpoint: {
			canResume: false,
			resumePoint: null,
		},
	});
	console.log("✓ Created progress.json");

	console.log("\n✅ Dev environment ready!");
	console.log("\nRun 'bun run start' to play through the mock game.");
	console.log("Answer 'correct' to get questions right.\n");
}

setupDevEnvironment().catch(console.error);
