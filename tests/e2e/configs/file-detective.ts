export const FILE_DETECTIVE_TEST_CONFIG = {
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
					correctAnswer: "package.json",
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
					correctAnswer: "src",
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
					correctAnswer: "bun",
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
					correctAnswer: "test",
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
					correctAnswer: "tsconfig.json",
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
			},
			{
				id: "api",
				label: "REST API",
				matches: {
					projectType: "api",
					language: "TypeScript",
					framework: "Express",
				},
			},
		],
		correctId: "cli",
	},
};
