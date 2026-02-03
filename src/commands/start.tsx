import { ExitCode, NotInitializedError } from "@/lib/errors.ts";
import { findOnboardMeRoot } from "@/lib/paths.ts";
import { loadManifest, validateManifest } from "@/services/validation.ts";
import { renderScreen } from "@/ui/render.tsx";
import {
	LoadManifestErrorScreen,
	ValidationFailedScreen,
	ValidationSuccessScreen,
} from "@/ui/screens/index.ts";

export async function startCommand(): Promise<number> {
	const rootDir = findOnboardMeRoot();

	if (!rootDir) {
		throw new NotInitializedError();
	}

	const validationResult = await validateManifest(rootDir);

	if (!validationResult.valid) {
		renderScreen(<ValidationFailedScreen errors={validationResult.errors} />);
		return ExitCode.ValidationFailed;
	}

	const manifest = await loadManifest(rootDir);

	if (!manifest) {
		renderScreen(<LoadManifestErrorScreen />);
		return ExitCode.GeneralError;
	}

	const games = manifest.games.map((game) => ({
		name: game.name,
		description: game.description,
		difficulty: game.difficulty,
	}));

	renderScreen(
		<ValidationSuccessScreen
			projectName={manifest.projectName}
			games={games}
		/>,
	);

	return ExitCode.Success;
}
