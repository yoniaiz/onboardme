import { ExitCode } from "@/lib/errors.ts";
import { dirExists, ensureDir, writeJson, writeTextFile } from "@/lib/fs.ts";
import {
	getContextDir,
	getGitignorePath,
	getOnboardMeDir,
	getPreparedDir,
	getProgressPath,
	getStateDir,
	getTemplateDir,
	ONBOARDME_DIR,
} from "@/lib/paths.ts";
import { createInitialProgress } from "@/types/state.ts";
import { withSpinner } from "@/ui/components/index.ts";
import { renderScreen } from "@/ui/render.tsx";
import {
	InitAlreadyExistsScreen,
	InitSuccessScreen,
} from "@/ui/screens/index.ts";

const GITIGNORE_CONTENT = `# OnboardMe generated files
context/
prepared/
state/
`;

export async function initCommand(): Promise<number> {
	const cwd = process.cwd();
	const onboardMeDir = getOnboardMeDir(cwd);

	if (dirExists(onboardMeDir)) {
		renderScreen(<InitAlreadyExistsScreen directory={`${ONBOARDME_DIR}/`} />);
		return ExitCode.Success;
	}

	console.log("Initializing OnboardMe...\n");

	await withSpinner("Creating folder structure", async () => {
		await ensureDir(onboardMeDir);
		await ensureDir(getPreparedDir(cwd));
		await ensureDir(getStateDir(cwd));
		await ensureDir(getContextDir(cwd));
		await ensureDir(getTemplateDir(cwd));
		await writeTextFile(getGitignorePath(cwd), GITIGNORE_CONTENT);
		await writeJson(getProgressPath(cwd), createInitialProgress());
	});

	const directories = [
		`${ONBOARDME_DIR}/`,
		`${ONBOARDME_DIR}/prepared/`,
		`${ONBOARDME_DIR}/state/`,
		`${ONBOARDME_DIR}/context/`,
		`${ONBOARDME_DIR}/template/`,
	];

	renderScreen(<InitSuccessScreen directories={directories} />);

	return ExitCode.Success;
}
