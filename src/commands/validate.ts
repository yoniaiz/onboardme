import { ExitCode } from "@/lib/errors.ts";
import { findOnboardMeRoot } from "@/lib/paths.ts";
import { validateManifest } from "@/services/validation.ts";

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

	const validationResult = await validateManifest(rootDir);
	console.log(JSON.stringify(validationResult, null, 2));

	return validationResult.valid ? ExitCode.Success : ExitCode.ValidationFailed;
}
