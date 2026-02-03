import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { join } from "node:path";

const CLI_PATH = join(import.meta.dir, "../../src/index.ts");

describe("onboardme status", () => {
	let testDir: string;

	beforeEach(async () => {
		testDir = (await Bun.$`mktemp -d`.text()).trim();
		await Bun.spawn(["bun", "run", CLI_PATH, "init"], { cwd: testDir }).exited;
	});

	afterEach(async () => {
		await Bun.$`rm -rf ${testDir}`;
	});

	it("shows not started status for new installation", async () => {
		const proc = Bun.spawn(["bun", "run", CLI_PATH, "status"], {
			cwd: testDir,
			stdout: "pipe",
		});

		const exitCode = await proc.exited;
		const output = await new Response(proc.stdout).text();

		expect(exitCode).toBe(0);
		expect(output).toContain("Not started");
	});

	it("returns error when not initialized", async () => {
		const uninitDir = (await Bun.$`mktemp -d`.text()).trim();

		const proc = Bun.spawn(["bun", "run", CLI_PATH, "status"], {
			cwd: uninitDir,
			stderr: "pipe",
		});

		const exitCode = await proc.exited;

		await Bun.$`rm -rf ${uninitDir}`;

		expect(exitCode).toBe(3);
	});
});
