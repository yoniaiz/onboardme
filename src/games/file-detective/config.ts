import type {
	DeductionConfig,
	EvidenceCategory,
	FileDetectiveConfig,
	ProjectTypeInfo,
} from "./types.ts";

const DEFAULT_EVIDENCE: EvidenceCategory[] = [
	{
		id: "root-files",
		title: "Root Files",
		description: "Config files in the project root",
		questions: [
			{
				id: "root-files-1",
				prompt: "What key files do you see at the project root?",
			},
		],
	},
	{
		id: "folder-structure",
		title: "Folder Structure",
		description: "How the project is organized",
		questions: [
			{
				id: "folder-structure-1",
				prompt: "Which folders stand out and why?",
			},
		],
	},
	{
		id: "dependencies",
		title: "Dependencies",
		description: "Packages and libraries in use",
		questions: [
			{
				id: "dependencies-1",
				prompt: "What dependencies hint at the framework or runtime?",
			},
		],
	},
	{
		id: "scripts",
		title: "Scripts",
		description: "Build and run commands",
		questions: [
			{
				id: "scripts-1",
				prompt: "Which scripts reveal how the project runs?",
			},
		],
	},
	{
		id: "config-files",
		title: "Config Files",
		description: "Environment, build, and deploy setup",
		questions: [
			{
				id: "config-files-1",
				prompt: "What configuration files inform the setup?",
			},
		],
	},
];

const DEFAULT_PROJECT_TYPE: ProjectTypeInfo = {
	projectType: "unknown",
	language: "unknown",
	framework: "unknown",
	architecture: "unknown",
};

const DEFAULT_DEDUCTION: DeductionConfig = {
	prompt: "What type of project is this?",
	options: [
		{
			id: "api-service",
			label: "API service",
			matches: {
				projectType: "api",
				language: "unknown",
				framework: "unknown",
				architecture: "unknown",
			},
		},
		{
			id: "frontend-app",
			label: "Frontend app",
			matches: {
				projectType: "frontend",
				language: "unknown",
				framework: "unknown",
				architecture: "unknown",
			},
		},
		{
			id: "cli-tool",
			label: "CLI tool",
			matches: {
				projectType: "cli",
				language: "unknown",
				framework: "unknown",
				architecture: "unknown",
			},
		},
	],
	correctId: "api-service",
};

export const defaultConfig: FileDetectiveConfig = {
	projectType: DEFAULT_PROJECT_TYPE,
	evidence: DEFAULT_EVIDENCE,
	deduction: DEFAULT_DEDUCTION,
};
