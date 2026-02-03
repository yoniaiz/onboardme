import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { join } from "node:path";

const CLI_PATH = join(import.meta.dir, "../../src/index.ts");
const FIXTURES_DIR = join(import.meta.dir, "../fixtures/prepared");

describe("onboardme validate", () => {
	let testDir: string;

	beforeEach(async () => {
		testDir = (await Bun.$`mktemp -d`.text()).trim();
		await Bun.spawn(["bun", "run", CLI_PATH, "init"], { cwd: testDir }).exited;
	});

	afterEach(async () => {
		await Bun.$`rm -rf ${testDir}`;
	});

	it("returns error when manifest is missing", async () => {
		const proc = Bun.spawn(["bun", "run", CLI_PATH, "validate"], {
			cwd: testDir,
			stdout: "pipe",
		});

		const exitCode = await proc.exited;
		const output = await new Response(proc.stdout).text();
		const result = JSON.parse(output);

		expect(exitCode).toBe(4);
		expect(result.valid).toBe(false);
		expect(result.errors[0].field).toBe("manifest");
	});

	it("returns success for valid manifest", async () => {
		const preparedDir = join(testDir, ".onboardme", "prepared");
		const validManifest = await Bun.file(
			join(FIXTURES_DIR, "valid-manifest.json"),
		).text();
		await Bun.write(join(preparedDir, "manifest.json"), validManifest);

		const proc = Bun.spawn(["bun", "run", CLI_PATH, "validate"], {
			cwd: testDir,
			stdout: "pipe",
		});

		const exitCode = await proc.exited;
		const output = await new Response(proc.stdout).text();
		const result = JSON.parse(output);

		expect(exitCode).toBe(0);
		expect(result.valid).toBe(true);
		expect(result.errors).toEqual([]);
	});

	it("returns validation errors for invalid manifest", async () => {
		const preparedDir = join(testDir, ".onboardme", "prepared");
		const invalidManifest = await Bun.file(
			join(FIXTURES_DIR, "invalid-manifest.json"),
		).text();
		await Bun.write(join(preparedDir, "manifest.json"), invalidManifest);

		const proc = Bun.spawn(["bun", "run", CLI_PATH, "validate"], {
			cwd: testDir,
			stdout: "pipe",
		});

		const exitCode = await proc.exited;
		const output = await new Response(proc.stdout).text();
		const result = JSON.parse(output);

		expect(exitCode).toBe(4);
		expect(result.valid).toBe(false);
		expect(result.errors.length).toBeGreaterThan(0);
	});
});
