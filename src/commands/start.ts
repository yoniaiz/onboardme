import boxen from "boxen";
import { ExitCode, NotInitializedError } from "@/lib/errors.ts";
import { findOnboardMeRoot } from "@/lib/paths.ts";
import { loadManifest, validateManifest } from "@/services/validation.ts";
import {
	colors,
	formatError,
	formatMuted,
	formatStep,
	formatSuccess,
	formatTitle,
} from "@/ui/theme.ts";

export async function startCommand(): Promise<number> {
	const rootDir = findOnboardMeRoot();

	if (!rootDir) {
		throw new NotInitializedError();
	}

	console.log(formatTitle("Starting OnboardMe..."));
	console.log();

	const validationResult = await validateManifest(rootDir);

	if (!validationResult.valid) {
		console.log(formatError("Prepared data validation failed"));
		console.log();

		console.log(colors.muted("Errors:"));
		for (const error of validationResult.errors) {
			const field = error.game ? `${error.game}.${error.field}` : error.field;
			console.log(`  ${colors.error("•")} ${field}: ${error.error}`);
		}
		console.log();

		const helpBox = boxen(
			`${formatTitle("How to Fix")}\n\n` +
				`${formatStep("1", "Run the 'prepare game' skill in your AI platform")}\n` +
				`${formatStep("2", "Run: onboardme validate")}\n` +
				`${formatStep("3", "Once valid, run: onboardme start")}`,
			{
				padding: 1,
				borderStyle: "round",
				borderColor: "yellow",
			},
		);

		console.log(helpBox);

		return ExitCode.ValidationFailed;
	}

	const manifest = await loadManifest(rootDir);

	if (!manifest) {
		console.log(formatError("Failed to load manifest"));
		return ExitCode.GeneralError;
	}

	console.log(formatSuccess("Prepared data validated successfully!"));
	console.log();
	console.log(formatMuted(`Project: ${manifest.projectName}`));
	console.log(formatMuted(`Games available: ${manifest.games.length}`));
	console.log();

	for (const game of manifest.games) {
		console.log(`  ${colors.primary("•")} ${game.name} (${game.difficulty})`);
		console.log(`    ${colors.muted(game.description)}`);
	}

	console.log();
	console.log(
		colors.muted("Game engine not yet implemented. Coming in Milestone 2!"),
	);

	return ExitCode.Success;
}
