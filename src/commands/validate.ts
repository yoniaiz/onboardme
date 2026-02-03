import { getGameDataPath } from "@/core/loader.ts";
import { validatePreparedData as validateFileDetective } from "@/games/file-detective/prepared-schema.ts";
import { ExitCode } from "@/lib/errors.ts";
import { fileExists } from "@/lib/fs.ts";
import { findOnboardMeRoot } from "@/lib/paths.ts";
import { validateManifest } from "@/services/validation.ts";
import type { ValidationResult } from "@/types/manifest.ts";

const FILE_DETECTIVE_ID = "file-detective";

export async function validateCommand(): Promise<number> {
	const rootDir = findOnboardMeRoot();

	if (!rootDir) {
		const result = {
			valid: false,
			errors: [
				{
					field: "initialization",
					error: "OnboardMe is not initialized in this directory",
				},
			],
			suggestion: "Run 'onboardme init' first",
		};
		console.log(JSON.stringify(result, null, 2));
		return ExitCode.NotInitialized;
	}

	const manifestResult = await validateManifest(rootDir);
	const gameResults = await validateGameData(rootDir);

	const combinedResult: ValidationResult = {
		valid: manifestResult.valid && gameResults.valid,
		errors: [...manifestResult.errors, ...gameResults.errors],
		suggestion: manifestResult.suggestion ?? gameResults.suggestion,
	};

	console.log(JSON.stringify(combinedResult, null, 2));

	return combinedResult.valid ? ExitCode.Success : ExitCode.ValidationFailed;
}

async function validateGameData(rootDir: string): Promise<ValidationResult> {
	const fileDetectivePath = getGameDataPath(rootDir, FILE_DETECTIVE_ID);

	if (!fileExists(fileDetectivePath)) {
		return { valid: true, errors: [] };
	}

	return validateFileDetective(rootDir);
}
