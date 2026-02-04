import { z } from "zod";
import { getGameDataPath } from "@/core/loader.ts";
import { fileExists, readJson } from "@/lib/fs.ts";
import type { ValidationResult } from "@/types/manifest.ts";

const GAME_ID = "file-detective";

const EvidenceCategoryIdSchema = z.enum([
	"root-files",
	"folder-structure",
	"dependencies",
	"scripts",
	"config-files",
]);

const EvidenceQuestionSchema = z.object({
	id: z.string().min(1),
	prompt: z.string().min(1),
	options: z.array(z.string().min(1)).optional(),
});

const EvidenceCategorySchema = z.object({
	id: EvidenceCategoryIdSchema,
	title: z.string().min(1),
	description: z.string().min(1),
	questions: z.array(EvidenceQuestionSchema).min(1),
});

const ProjectTypeInfoSchema = z.object({
	projectType: z.string().min(1),
	language: z.string().min(1),
	framework: z.string().min(1),
	architecture: z.string().optional(),
});

const DeductionOptionSchema = z.object({
	id: z.string().min(1),
	label: z.string().min(1),
	matches: ProjectTypeInfoSchema,
});

const DeductionConfigSchema = z
	.object({
		prompt: z.string().min(1),
		options: z.array(DeductionOptionSchema).min(2),
		correctId: z.string().min(1),
	})
	.refine(
		(data) => data.options.some((option) => option.id === data.correctId),
		{ message: "correctId must reference an existing option id" },
	);

const ALL_CATEGORY_IDS = [
	"root-files",
	"folder-structure",
	"dependencies",
	"scripts",
	"config-files",
] as const;

const FileDetectiveConfigSchema = z
	.object({
		projectType: ProjectTypeInfoSchema,
		evidence: z.array(EvidenceCategorySchema).length(5),
		deduction: DeductionConfigSchema,
	})
	.refine(
		(data) => {
			const ids = new Set(data.evidence.map((e) => e.id));
			return ALL_CATEGORY_IDS.every((id) => ids.has(id));
		},
		{ message: "evidence must include all 5 category IDs" },
	);

const fileDetectivePreparedDataSchema = z.object({
	config: FileDetectiveConfigSchema,
	questions: z.array(z.unknown()),
});

export async function validatePreparedData(
	rootDir: string,
): Promise<ValidationResult> {
	const dataPath = getGameDataPath(rootDir, GAME_ID);

	if (!fileExists(dataPath)) {
		return {
			valid: false,
			errors: [
				{
					game: GAME_ID,
					field: "data",
					error: `Prepared data not found at ${dataPath}`,
				},
			],
			suggestion:
				"Run the 'prepare game' skill to generate file-detective data",
		};
	}

	const data = await readJson<unknown>(dataPath);

	if (!data) {
		return {
			valid: false,
			errors: [
				{
					game: GAME_ID,
					field: "data",
					error: "Failed to read prepared data file",
				},
			],
			suggestion: "Check that the data file is valid JSON",
		};
	}

	const result = fileDetectivePreparedDataSchema.safeParse(data);

	if (!result.success) {
		const errors = result.error.issues.map((issue) => ({
			game: GAME_ID,
			field: issue.path.join("."),
			error: issue.message,
		}));

		return {
			valid: false,
			errors,
			suggestion:
				"Re-run 'prepare game' skill to fix file-detective validation errors",
		};
	}

	return { valid: true, errors: [] };
}
