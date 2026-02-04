import type { GameAIContext } from "@/types/game.ts";

export function getAIContext(): GameAIContext {
	return {
		gameId: "file-detective",
		gameName: "File Detective",
		purpose:
			"Teach developers to systematically investigate a codebase by examining evidence (files, folders, configs) and making deductions about the project type and tech stack.",
		configSchema: {
			projectType: {
				type: "object",
				properties: {
					projectType: { type: "string" },
					language: { type: "string" },
					framework: { type: "string" },
					architecture: { type: "string" },
				},
			},
			evidence: {
				type: "array",
				items: {
					type: "object",
					properties: {
						id: { type: "string" },
						title: { type: "string" },
						description: { type: "string" },
						questions: { type: "array" },
					},
				},
			},
			deduction: {
				type: "object",
				properties: {
					prompt: { type: "string" },
					options: { type: "array" },
					correctId: { type: "string" },
				},
			},
		},
		questionGuidelines: [
			{
				category: "root-files",
				description:
					"Questions about config files in the project root (package.json, tsconfig, etc)",
				difficulty: "easy",
				goodExamples: [
					"What is the main entry point defined in package.json?",
					"Which TypeScript compiler options are enabled?",
				],
				badExamples: ["What is package.json?", "Do you see any files?"],
				principles: [
					"Focus on specific, observable facts",
					"Guide toward understanding project structure",
					"Connect files to their purpose",
				],
			},
			{
				category: "folder-structure",
				description: "Questions about how the project is organized",
				difficulty: "easy",
				goodExamples: [
					"What convention does the src/ folder follow?",
					"Which folder likely contains the API routes?",
				],
				badExamples: ["List all folders", "How many files are there?"],
				principles: [
					"Focus on meaningful patterns",
					"Connect structure to architecture",
					"Highlight conventions",
				],
			},
			{
				category: "dependencies",
				description: "Questions about packages and libraries",
				difficulty: "medium",
				goodExamples: [
					"Which framework does the presence of 'react' and 'next' suggest?",
					"What testing library is being used?",
				],
				badExamples: ["How many dependencies are there?", "What is npm?"],
				principles: [
					"Connect dependencies to capabilities",
					"Identify key framework indicators",
					"Look for ecosystem patterns",
				],
			},
			{
				category: "scripts",
				description: "Questions about build and run commands",
				difficulty: "medium",
				goodExamples: [
					"What does the 'dev' script reveal about the development workflow?",
					"Which command would you use to run tests?",
				],
				badExamples: ["What scripts exist?", "Copy the scripts section"],
				principles: [
					"Connect scripts to developer workflows",
					"Identify build tools and patterns",
					"Understand development vs production",
				],
			},
			{
				category: "config-files",
				description: "Questions about environment and build configuration",
				difficulty: "hard",
				goodExamples: [
					"What does the presence of docker-compose.yml suggest about deployment?",
					"Which linting rules indicate code quality priorities?",
				],
				badExamples: ["What is a config file?", "List all config files"],
				principles: [
					"Connect configs to project decisions",
					"Identify deployment and infrastructure patterns",
					"Understand toolchain choices",
				],
			},
		],
	};
}
