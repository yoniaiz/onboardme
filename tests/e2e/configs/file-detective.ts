import type { FileDetectiveConfig } from "@/games/file-detective/types.ts";

export const FILE_DETECTIVE_TEST_CONFIG: FileDetectiveConfig = {
	projectType: {
		projectType: "Node.js CLI",
		language: "TypeScript",
		framework: "Ink",
	},
	evidence: [
		{
			id: "root-files",
			title: "Root Files",
			description: "Examine files in the project root",
			questions: [
				{
					id: "rf-1",
					prompt: "What file defines dependencies?",
					options: ["package.json", "deps.txt", "requirements.txt", "Gemfile"],
					correctAnswer: "package.json",
					insight:
						"package.json is the standard dependency manifest for Node.js projects.",
				},
			],
		},
		{
			id: "folder-structure",
			title: "Folder Structure",
			description: "Check the folder organization",
			questions: [
				{
					id: "fs-1",
					prompt: "Where is the source code?",
					options: ["src", "lib", "app", "source"],
					correctAnswer: "src",
					insight:
						"The src/ directory is a common convention for TypeScript projects.",
				},
			],
		},
		{
			id: "dependencies",
			title: "Dependencies",
			description: "Examine package dependencies",
			questions: [
				{
					id: "dp-1",
					prompt: "What runtime is used?",
					options: ["bun", "node", "deno", "npm"],
					correctAnswer: "bun",
					insight:
						"Bun is a fast JavaScript runtime with built-in bundler and package manager.",
				},
			],
		},
		{
			id: "scripts",
			title: "Scripts",
			description: "Check npm scripts",
			questions: [
				{
					id: "sc-1",
					prompt: "What runs tests?",
					options: ["test", "check", "verify", "spec"],
					correctAnswer: "test",
					insight:
						"The test script is the standard npm convention for running tests.",
				},
			],
		},
		{
			id: "config-files",
			title: "Config Files",
			description: "Examine configuration files",
			questions: [
				{
					id: "cf-1",
					prompt: "TypeScript config file?",
					options: [
						"tsconfig.json",
						"typescript.json",
						"ts.config.js",
						".tsrc",
					],
					correctAnswer: "tsconfig.json",
					insight:
						"tsconfig.json configures TypeScript compiler options for the project.",
				},
			],
		},
	],
	deduction: {
		prompt: "Based on the evidence, what type of project is this?",
		options: [
			{
				id: "cli",
				label: "Node.js CLI Tool",
				matches: {
					projectType: "cli",
					language: "TypeScript",
					framework: "Ink",
				},
			},
			{
				id: "web",
				label: "Web Application",
				matches: {
					projectType: "web",
					language: "JavaScript",
					framework: "React",
				},
				missedClues: [
					"No index.html or public folder found",
					"Ink is a CLI framework, not a web framework",
				],
			},
			{
				id: "api",
				label: "REST API",
				matches: {
					projectType: "api",
					language: "TypeScript",
					framework: "Express",
				},
				missedClues: [
					"No Express or API-related dependencies",
					"Ink is used for terminal UIs, not HTTP servers",
				],
			},
		],
		correctId: "cli",
	},
};
