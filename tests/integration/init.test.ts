import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { join } from "node:path";

const CLI_PATH = join(import.meta.dir, "../../src/index.ts");

describe("onboardme init", () => {
	let testDir: string;

	beforeEach(async () => {
		testDir = await Bun.$`mktemp -d`.text();
		testDir = testDir.trim();
	});

	afterEach(async () => {
		await Bun.$`rm -rf ${testDir}`;
	});

	it("creates .onboardme directory structure", async () => {
		const proc = Bun.spawn(["bun", "run", CLI_PATH, "init"], {
			cwd: testDir,
		});

		await proc.exited;

		const onboardmeDir = join(testDir, ".onboardme");
		const dirs = await Bun.$`ls -la ${onboardmeDir}`.text();
		expect(dirs).toContain("prepared");
		expect(dirs).toContain("state");
		expect(dirs).toContain("context");
		expect(dirs).toContain("template");
	});

	it("creates .gitignore file", async () => {
		const proc = Bun.spawn(["bun", "run", CLI_PATH, "init"], {
			cwd: testDir,
		});

		await proc.exited;

		const gitignorePath = join(testDir, ".onboardme", ".gitignore");
		const file = Bun.file(gitignorePath);
		expect(await file.exists()).toBe(true);

		const content = await file.text();
		expect(content).toContain("context/");
		expect(content).toContain("prepared/");
		expect(content).toContain("state/");
	});

	it("creates initial progress file", async () => {
		const proc = Bun.spawn(["bun", "run", CLI_PATH, "init"], {
			cwd: testDir,
		});

		await proc.exited;

		const progressPath = join(testDir, ".onboardme", "state", "progress.json");
		const file = Bun.file(progressPath);
		expect(await file.exists()).toBe(true);

		const progress = await file.json();
		expect(progress.version).toBe("1.0.0");
		expect(progress.startedAt).toBeNull();
		expect(progress.games).toEqual({});
	});

	it("returns success exit code", async () => {
		const proc = Bun.spawn(["bun", "run", CLI_PATH, "init"], {
			cwd: testDir,
		});

		const exitCode = await proc.exited;
		expect(exitCode).toBe(0);
	});
});
