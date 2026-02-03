import boxen from "boxen";
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
import { printBanner } from "@/ui/banner.ts";
import { withSpinner } from "@/ui/spinner.ts";
import {
	colors,
	formatStep,
	formatSuccess,
	formatTitle,
	formatWarning,
} from "@/ui/theme.ts";

const GITIGNORE_CONTENT = `# OnboardMe generated files
context/
prepared/
state/
`;

export async function initCommand(): Promise<number> {
	const cwd = process.cwd();
	const onboardMeDir = getOnboardMeDir(cwd);

	printBanner();
	console.log();

	if (dirExists(onboardMeDir)) {
		console.log(
			formatWarning(`OnboardMe is already initialized in this directory`),
		);
		console.log(colors.muted(`  Found: ${ONBOARDME_DIR}/`));
		console.log();
		console.log(
			colors.muted(
				"To reset, delete the .onboardme folder and run init again.",
			),
		);
		return ExitCode.Success;
	}

	console.log(formatTitle("Initializing OnboardMe..."));
	console.log();

	await withSpinner("Creating folder structure", async () => {
		await ensureDir(onboardMeDir);
		await ensureDir(getPreparedDir(cwd));
		await ensureDir(getStateDir(cwd));
		await ensureDir(getContextDir(cwd));
		await ensureDir(getTemplateDir(cwd));
		await writeTextFile(getGitignorePath(cwd), GITIGNORE_CONTENT);
		await writeJson(getProgressPath(cwd), createInitialProgress());
	});

	console.log(formatSuccess("OnboardMe initialized successfully!"));
	console.log();
	console.log(colors.muted("Created:"));
	console.log(colors.muted(`  ${ONBOARDME_DIR}/`));
	console.log(colors.muted(`  ${ONBOARDME_DIR}/prepared/`));
	console.log(colors.muted(`  ${ONBOARDME_DIR}/state/`));
	console.log(colors.muted(`  ${ONBOARDME_DIR}/context/`));
	console.log(colors.muted(`  ${ONBOARDME_DIR}/template/`));
	console.log();

	const nextSteps = boxen(
		`${formatTitle("Next Steps")}\n\n` +
			`${formatStep("1", "Run the 'prepare game' skill in your AI platform")}\n` +
			`${formatStep("2", "Then run: onboardme start")}`,
		{
			padding: 1,
			borderStyle: "round",
			borderColor: "cyan",
		},
	);

	console.log(nextSteps);

	return ExitCode.Success;
}
