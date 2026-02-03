export type EvidenceCategoryId =
	| "root-files"
	| "folder-structure"
	| "dependencies"
	| "scripts"
	| "config-files";

export interface EvidenceQuestion {
	id: string;
	prompt: string;
	options?: string[];
}

export interface EvidenceCategory {
	id: EvidenceCategoryId;
	title: string;
	description: string;
	questions: EvidenceQuestion[];
}

export interface CaseNote {
	id: string;
	categoryId: EvidenceCategoryId;
	text: string;
}

export interface ProjectTypeInfo {
	projectType: string;
	language: string;
	framework: string;
	architecture?: string;
}

export interface DeductionOption {
	id: string;
	label: string;
	matches: ProjectTypeInfo;
}

export interface DeductionConfig {
	prompt: string;
	options: DeductionOption[];
	correctId: string;
}

export interface FileDetectiveConfig {
	projectType: ProjectTypeInfo;
	evidence: EvidenceCategory[];
	deduction: DeductionConfig;
}

export type InvestigationStep = "select" | "evidence" | "deduction";

export interface InvestigationState {
	step: InvestigationStep;
	examinedCategories: EvidenceCategoryId[];
	caseNotes: CaseNote[];
	currentCategoryId: EvidenceCategoryId | null;
	totalCategories: number;
}
