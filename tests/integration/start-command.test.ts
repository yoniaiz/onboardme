import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { join } from "node:path";
import { ExitCode } from "@/lib/errors.ts";
import { ensureDir, writeJson } from "@/lib/fs.ts";
import {
	getManifestPath,
	getOnboardMeDir,
	getPreparedDir,
	getStateDir,
	getTemplateDir,
} from "@/lib/paths.ts";

const CLI_PATH = join(import.meta.dir, "../../src/index.ts");

describe("onboardme start", () => {
	let testDir: string;

	beforeEach(async () => {
		testDir = await Bun.$`mktemp -d`.text();
		testDir = testDir.trim();
	});

	afterEach(async () => {
		await Bun.$`rm -rf ${testDir}`;
	});

	describe("error handling", () => {
		it("returns NotInitialized when .onboardme directory is missing", async () => {
			const proc = Bun.spawn(["bun", "run", CLI_PATH, "start"], {
				cwd: testDir,
			});

			const exitCode = await proc.exited;
			expect(exitCode).toBe(ExitCode.NotInitialized);
		});

		it("returns ValidationFailed when manifest is missing", async () => {
			await ensureDir(getOnboardMeDir(testDir));
			await ensureDir(getPreparedDir(testDir));
			await ensureDir(getStateDir(testDir));
			await ensureDir(getTemplateDir(testDir));

			const proc = Bun.spawn(["bun", "run", CLI_PATH, "start"], {
				cwd: testDir,
			});

			const exitCode = await proc.exited;
			expect(exitCode).toBe(ExitCode.ValidationFailed);
		});

		it("returns ValidationFailed when manifest is malformed", async () => {
			await ensureDir(getOnboardMeDir(testDir));
			await ensureDir(getPreparedDir(testDir));
			await ensureDir(getStateDir(testDir));
			await ensureDir(getTemplateDir(testDir));

			await writeJson(getManifestPath(testDir), {
				invalid: "manifest",
			});

			const proc = Bun.spawn(["bun", "run", CLI_PATH, "start"], {
				cwd: testDir,
			});

			const exitCode = await proc.exited;
			expect(exitCode).toBe(ExitCode.ValidationFailed);
		});

		it("returns GeneralError when game plugin is not registered", async () => {
			await ensureDir(getOnboardMeDir(testDir));
			await ensureDir(getPreparedDir(testDir));
			await ensureDir(getStateDir(testDir));
			await ensureDir(getTemplateDir(testDir));

			await writeJson(getManifestPath(testDir), {
				version: "1.0.0",
				generatedAt: new Date().toISOString(),
				projectName: "test-project",
				games: [
					{
						id: "nonexistent-game",
						name: "Nonexistent Game",
						description: "A game that does not exist",
						difficulty: "easy",
						estimatedMinutes: 5,
						journeys: [
							{
								id: "j1",
								name: "Test Journey",
								entryPoint: "src/index.ts",
								checkpoints: [],
							},
						],
						maxScore: 100,
					},
				],
			});

			await writeJson(join(getTemplateDir(testDir), "template.json"), {
				games: [{ id: "nonexistent-game" }],
			});

			const gamesDir = join(
				getPreparedDir(testDir),
				"games",
				"nonexistent-game",
			);
			await ensureDir(gamesDir);
			await writeJson(join(gamesDir, "data.json"), {
				config: { questionCount: 3 },
				questions: [
					{
						id: "q1",
						type: "text-input",
						prompt: "Test question?",
						context: "Test context",
						hints: [],
					},
				],
			});

			const proc = Bun.spawn(["bun", "run", CLI_PATH, "start"], {
				cwd: testDir,
			});

			const exitCode = await proc.exited;
			expect(exitCode).toBe(ExitCode.GeneralError);
		});

		it("returns GeneralError when prepared data is missing for game", async () => {
			await ensureDir(getOnboardMeDir(testDir));
			await ensureDir(getPreparedDir(testDir));
			await ensureDir(getStateDir(testDir));
			await ensureDir(getTemplateDir(testDir));

			await writeJson(getManifestPath(testDir), {
				version: "1.0.0",
				generatedAt: new Date().toISOString(),
				projectName: "test-project",
				games: [
					{
						id: "mock-game",
						name: "Mock Game",
						description: "Test game",
						difficulty: "easy",
						estimatedMinutes: 5,
						journeys: [
							{
								id: "j1",
								name: "Test Journey",
								entryPoint: "src/index.ts",
								checkpoints: [],
							},
						],
						maxScore: 100,
					},
				],
			});

			await writeJson(join(getTemplateDir(testDir), "template.json"), {
				games: [{ id: "mock-game" }],
			});

			const proc = Bun.spawn(["bun", "run", CLI_PATH, "start"], {
				cwd: testDir,
			});

			const exitCode = await proc.exited;
			expect(exitCode).toBe(ExitCode.GeneralError);
		});
	});
});
