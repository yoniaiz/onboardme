import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "../../src/core/config.ts";
import type { FileDetectiveConfig } from "../../src/games/file-detective/types.ts";
import { writeJson } from "../../src/lib/fs.ts";
import { getPreparedDir, ONBOARDME_DIR } from "../../src/lib/paths.ts";
import { FILE_DETECTIVE_TEST_CONFIG } from "../e2e/configs/file-detective.ts";

describe("loadConfig", () => {
	let tempDir: string;

	beforeEach(async () => {
		tempDir = await mkdtemp(join(tmpdir(), "onboardme-config-test-"));
		await writeJson(join(tempDir, ONBOARDME_DIR, ".keep"), {});
	});

	afterEach(async () => {
		if (tempDir) {
			await rm(tempDir, { recursive: true, force: true });
		}
	});

	it("uses prepared file-detective config when available", async () => {
		const preparedPath = join(
			getPreparedDir(tempDir),
			"games",
			"file-detective",
			"data.json",
		);

		await writeJson(preparedPath, {
			config: FILE_DETECTIVE_TEST_CONFIG,
			questions: [],
		});

		const config = await loadConfig(tempDir);
		const fileDetective = config.games.find(
			(game) => game.id === "file-detective",
		);

		expect(fileDetective).toBeDefined();

		const fileDetectiveConfig = (
			fileDetective as unknown as { config: FileDetectiveConfig }
		).config;

		const evidence = fileDetectiveConfig.evidence;
		expect(evidence[0].questions[0].options).toContain("package.json");
		expect(evidence[0].questions[0].correctAnswer).toBe("package.json");
	});

	it("falls back to legacy prepared data path", async () => {
		const legacyPath = join(
			getPreparedDir(tempDir),
			"file-detective",
			"data.json",
		);

		await writeJson(legacyPath, {
			config: FILE_DETECTIVE_TEST_CONFIG,
			questions: [],
		});

		const config = await loadConfig(tempDir);
		const fileDetective = config.games.find(
			(game) => game.id === "file-detective",
		);

		expect(fileDetective).toBeDefined();

		const fileDetectiveConfig = (
			fileDetective as unknown as { config: FileDetectiveConfig }
		).config;

		const evidence = fileDetectiveConfig.evidence;
		expect(evidence[0].questions[0].options).toContain("package.json");
	});
});
