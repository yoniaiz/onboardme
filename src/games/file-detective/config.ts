import type {
	DeductionConfig,
	DeductionOption,
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

export function createDefaultConfig(): FileDetectiveConfig {
	return {
		projectType: DEFAULT_PROJECT_TYPE,
		evidence: DEFAULT_EVIDENCE,
		deduction: DEFAULT_DEDUCTION,
	};
}

export function parseConfig(raw: unknown): FileDetectiveConfig {
	if (!isRecord(raw)) {
		return createDefaultConfig();
	}

	return {
		projectType: normalizeProjectType(raw.projectType),
		evidence: normalizeEvidence(raw.evidence),
		deduction: isRecord(raw.deduction)
			? normalizeDeduction(raw.deduction)
			: DEFAULT_DEDUCTION,
	};
}

function normalizeProjectType(value: unknown): ProjectTypeInfo {
	if (!isRecord(value)) {
		return DEFAULT_PROJECT_TYPE;
	}

	return {
		projectType:
			typeof value.projectType === "string"
				? value.projectType
				: DEFAULT_PROJECT_TYPE.projectType,
		language:
			typeof value.language === "string"
				? value.language
				: DEFAULT_PROJECT_TYPE.language,
		framework:
			typeof value.framework === "string"
				? value.framework
				: DEFAULT_PROJECT_TYPE.framework,
		architecture:
			typeof value.architecture === "string"
				? value.architecture
				: DEFAULT_PROJECT_TYPE.architecture,
	};
}

function normalizeEvidence(value: unknown): EvidenceCategory[] {
	return Array.isArray(value)
		? (value as EvidenceCategory[])
		: DEFAULT_EVIDENCE;
}

function normalizeDeduction(raw: Record<string, unknown>): DeductionConfig {
	const prompt =
		typeof raw.prompt === "string" ? raw.prompt : DEFAULT_DEDUCTION.prompt;
	const options = Array.isArray(raw.options)
		? (raw.options as DeductionOption[])
		: DEFAULT_DEDUCTION.options;
	const correctId =
		typeof raw.correctId === "string"
			? raw.correctId
			: DEFAULT_DEDUCTION.correctId;
	return { prompt, options, correctId };
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}
