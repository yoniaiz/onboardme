import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

export const ONBOARDME_DIR = ".onboardme";
const PREPARED_DIR = "prepared";
const STATE_DIR = "state";
const CONTEXT_DIR = "context";
const TEMPLATE_DIR = "template";

const MANIFEST_FILE = "manifest.json";
const PROGRESS_FILE = "progress.json";
const GITIGNORE_FILE = ".gitignore";

export function findOnboardMeRoot(
	startDir: string = process.cwd(),
): string | null {
	let currentDir = resolve(startDir);
	const root = dirname(currentDir);

	while (currentDir !== root) {
		const onboardMePath = join(currentDir, ONBOARDME_DIR);
		if (existsSync(onboardMePath)) {
			return currentDir;
		}
		currentDir = dirname(currentDir);
	}

	const rootOnboardMePath = join(root, ONBOARDME_DIR);
	if (existsSync(rootOnboardMePath)) {
		return root;
	}

	return null;
}

export function getOnboardMeDir(rootDir: string): string {
	return join(rootDir, ONBOARDME_DIR);
}

export function getPreparedDir(rootDir: string): string {
	return join(rootDir, ONBOARDME_DIR, PREPARED_DIR);
}

export function getStateDir(rootDir: string): string {
	return join(rootDir, ONBOARDME_DIR, STATE_DIR);
}

export function getContextDir(rootDir: string): string {
	return join(rootDir, ONBOARDME_DIR, CONTEXT_DIR);
}

export function getTemplateDir(rootDir: string): string {
	return join(rootDir, ONBOARDME_DIR, TEMPLATE_DIR);
}

export function getManifestPath(rootDir: string): string {
	return join(rootDir, ONBOARDME_DIR, PREPARED_DIR, MANIFEST_FILE);
}

export function getProgressPath(rootDir: string): string {
	return join(rootDir, ONBOARDME_DIR, STATE_DIR, PROGRESS_FILE);
}

export function getGitignorePath(rootDir: string): string {
	return join(rootDir, ONBOARDME_DIR, GITIGNORE_FILE);
}
