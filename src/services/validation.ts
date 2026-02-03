import { z } from "zod";
import { fileExists, readJson } from "@/lib/fs.ts";
import { getManifestPath } from "@/lib/paths.ts";
import type { Manifest, ValidationResult } from "@/types/manifest.ts";

const GameJourneySchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	entryPoint: z.string().min(1),
	checkpoints: z.array(z.string()),
});

const PreparedGameSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	description: z.string(),
	difficulty: z.enum(["easy", "medium", "hard"]),
	estimatedMinutes: z.number().positive(),
	journeys: z.array(GameJourneySchema).min(1),
	maxScore: z.number().nonnegative(),
});

const ManifestSchema = z.object({
	version: z.string().min(1),
	generatedAt: z.string(),
	projectName: z.string().min(1),
	games: z.array(PreparedGameSchema).min(1),
});

export async function validateManifest(
	rootDir: string,
): Promise<ValidationResult> {
	const manifestPath = getManifestPath(rootDir);

	if (!fileExists(manifestPath)) {
		return {
			valid: false,
			errors: [
				{
					field: "manifest",
					error: "Manifest file not found at .onboardme/prepared/manifest.json",
				},
			],
			suggestion: "Run the 'prepare game' skill in your AI platform",
		};
	}

	const manifestData = await readJson<unknown>(manifestPath);

	if (!manifestData) {
		return {
			valid: false,
			errors: [
				{
					field: "manifest",
					error: "Failed to read manifest file",
				},
			],
			suggestion: "Check that the manifest file is valid JSON",
		};
	}

	const result = ManifestSchema.safeParse(manifestData);

	if (!result.success) {
		const errors = result.error.issues.map((issue) => ({
			field: issue.path.join("."),
			error: issue.message,
		}));

		return {
			valid: false,
			errors,
			suggestion: "Re-run 'prepare game' skill to fix these validation errors",
		};
	}

	return {
		valid: true,
		errors: [],
	};
}

export async function loadManifest(rootDir: string): Promise<Manifest | null> {
	const manifestPath = getManifestPath(rootDir);

	if (!fileExists(manifestPath)) {
		return null;
	}

	const manifestData = await readJson<unknown>(manifestPath);
	const result = ManifestSchema.safeParse(manifestData);

	if (!result.success) {
		return null;
	}

	return result.data as Manifest;
}
