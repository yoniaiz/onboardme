import { describe, expect, it } from "bun:test";
import { FileDetectiveComponent } from "@/games/file-detective/component.tsx";
import { FILE_DETECTIVE_TEST_CONFIG } from "./configs/file-detective.ts";
import { withGameE2E } from "./framework/index.ts";

describe("E2E: File Detective Game", () => {
	it("plays through the game with interactions", async () => {
		await withGameE2E(
			{
				GameComponent: FileDetectiveComponent,
				config: FILE_DETECTIVE_TEST_CONFIG,
			},
			async (e2e) => {
				e2e.debug("1. INITIAL: Evidence Board");

				await e2e.press("enter");
				e2e.debug("2. AFTER: Selected Root Files");

				await e2e.type("package.json");
				e2e.debug("3. AFTER: Typed 'package.json'");

				await e2e.press("enter");
				e2e.debug("4. AFTER: Submitted - Back to Evidence Board");

				await e2e.press("enter");
				e2e.debug("5. AFTER: Selected Next Category");

				expect(e2e.lastFrame()).toBeTruthy();
			},
		);
	});
});
