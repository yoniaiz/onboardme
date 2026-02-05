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
				e2e.debug("1. INITIAL: Case Briefing");

				await e2e.press("enter");
				await e2e.waitFor((frame) => frame.includes("EVIDENCE BOARD"));
				e2e.debug("2. AFTER: Started investigation - Evidence Board");

				for (let i = 0; i < 5; i++) {
					await e2e.press("enter");
					e2e.debug(`3.${i + 1}a. AFTER: Selected category ${i + 1}`);

					await e2e.press("enter");
					await e2e.waitFor((frame) => frame.includes("CORRECT"));
					e2e.debug(`3.${i + 1}b. AFTER: Answered correctly`);

					await e2e.press("enter");
					if (i < 4) {
						await e2e.waitFor((frame) => frame.includes("EVIDENCE BOARD"));
						e2e.debug(`3.${i + 1}c. AFTER: Back to Evidence Board`);
					}
				}

				await e2e.waitFor((frame) => frame.includes("FINAL DEDUCTION"));
				e2e.debug("4. AFTER: All evidence collected, auto-started deduction");

				await e2e.press("enter");
				await e2e.waitFor((frame) => frame.includes("CASE CLOSED"));
				e2e.debug("5. AFTER: Deduction result shown");

				await e2e.press("enter");
				expect(e2e.getGameResult()).not.toBeNull();
			},
		);
	});
});
