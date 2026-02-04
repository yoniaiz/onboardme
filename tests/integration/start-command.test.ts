import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { join } from "node:path";
import { ExitCode } from "@/lib/errors.ts";
import { ensureDir } from "@/lib/fs.ts";
import { getOnboardMeDir } from "@/lib/paths.ts";

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

		it("returns GeneralError when terminal is not interactive", async () => {
			await ensureDir(getOnboardMeDir(testDir));

			const proc = Bun.spawn(["bun", "run", CLI_PATH, "start"], {
				cwd: testDir,
			});

			const exitCode = await proc.exited;
			expect(exitCode).toBe(ExitCode.GeneralError);
		});
	});
});
