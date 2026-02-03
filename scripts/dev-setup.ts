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
				id: "file-detective",
				name: "File Detective",
				description:
					"Investigate the codebase and deduce what type of project this is",
				difficulty: "easy",
				estimatedMinutes: 5,
				journeys: [
					{
						id: "investigation",
						name: "Codebase Investigation",
						entryPoint: ".",
						checkpoints: ["package.json", "src/", "tsconfig.json"],
					},
				],
				maxScore: 100,
			},
			{
				id: "spaghetti-monster",
				name: "Spaghetti Monster",
				description: "The final boss battle",
				difficulty: "hard",
				estimatedMinutes: 15,
				journeys: [
					{
						id: "boss-battle",
						name: "Final Boss",
						entryPoint: ".",
						checkpoints: [],
					},
				],
				maxScore: 500,
			},
		],
	});
	console.log("✓ Created manifest.json");

	await writeJson(join(getTemplateDir(rootDir), "template.json"), {
		games: [{ id: "file-detective" }],
	});
	console.log("✓ Created template.json");

	const fileDetectiveDir = join(
		getPreparedDir(rootDir),
		"games",
		"file-detective",
	);
	await ensureDir(fileDetectiveDir);
	await writeJson(join(fileDetectiveDir, "data.json"), {
		config: {
			projectType: {
				projectType: "CLI Tool",
				language: "TypeScript",
				framework: "Ink (React for CLI)",
				architecture: "Plugin-based",
			},
			evidence: [
				{
					id: "root-files",
					title: "Root Files",
					description: "Examine the configuration files in the project root",
					questions: [
						{
							id: "root-1",
							prompt: "What package manager config do you see?",
							options: ["package.json", "Cargo.toml", "go.mod", "pom.xml"],
							correctAnswer: "package.json",
						},
						{
							id: "root-2",
							prompt: "Is there a TypeScript config (tsconfig.json)?",
							options: ["Yes", "No"],
							correctAnswer: "Yes",
						},
					],
				},
				{
					id: "folder-structure",
					title: "Folder Structure",
					description: "Look at how the project is organized",
					questions: [
						{
							id: "folder-1",
							prompt: "What folders do you see in src/?",
							options: [
								"commands, core, ui",
								"routes, controllers, models",
								"components, pages",
								"cmd, pkg",
							],
							correctAnswer: "commands, core, ui",
						},
					],
				},
				{
					id: "dependencies",
					title: "Dependencies",
					description: "Check package.json for key dependencies",
					questions: [
						{
							id: "deps-1",
							prompt: "What CLI/terminal framework is used?",
							options: ["Ink", "Commander only", "Yargs", "Oclif"],
							correctAnswer: "Ink",
						},
						{
							id: "deps-2",
							prompt: "What testing framework do you see?",
							options: ["Bun test", "Jest", "Vitest", "Mocha"],
							correctAnswer: "Bun test",
						},
					],
				},
				{
					id: "scripts",
					title: "Scripts",
					description: "Check the available npm/bun scripts",
					questions: [
						{
							id: "scripts-1",
							prompt: "What scripts are available?",
							options: [
								"dev, start, test, typecheck",
								"dev, build, serve",
								"start, build, deploy",
								"test only",
							],
							correctAnswer: "dev, start, test, typecheck",
						},
					],
				},
				{
					id: "config-files",
					title: "Config Files",
					description: "Look for configuration and tooling files",
					questions: [
						{
							id: "config-1",
							prompt: "What linter/formatter is configured?",
							options: ["Biome", "ESLint + Prettier", "Standard", "None"],
							correctAnswer: "Biome",
						},
					],
				},
			],
			deduction: {
				prompt: "Based on your investigation, what type of project is this?",
				options: [
					{
						id: "cli-tool",
						label: "CLI Tool",
						matches: {
							projectType: "CLI Tool",
							language: "TypeScript",
							framework: "Ink",
						},
					},
					{
						id: "api-service",
						label: "Backend REST API",
						matches: {
							projectType: "API",
							language: "TypeScript",
							framework: "Express",
						},
					},
					{
						id: "frontend-app",
						label: "Frontend Web App",
						matches: {
							projectType: "Frontend",
							language: "TypeScript",
							framework: "React",
						},
					},
					{
						id: "library",
						label: "NPM Library/Package",
						matches: {
							projectType: "Library",
							language: "TypeScript",
							framework: "None",
						},
					},
				],
				correctId: "cli-tool",
			},
		},
		questions: [],
	});
	console.log("✓ Created file-detective data.json");

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
	console.log("\nRun 'bun run start' to play file-detective.");
	console.log("Investigate the evidence and make your deduction!\n");
}

setupDevEnvironment().catch(console.error);
