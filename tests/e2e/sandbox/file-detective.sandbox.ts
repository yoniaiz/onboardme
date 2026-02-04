import { FileDetective } from "@/games/file-detective/index.ts";
import { fileDetectiveAdapter } from "../adapters/file-detective.ts";
import { FILE_DETECTIVE_TEST_CONFIG } from "../configs/file-detective.ts";
import { withE2E } from "../framework/index.ts";

async function main() {
	console.log("File Detective E2E Sandbox");
	console.log("==========================\n");
	console.log("This sandbox lets you interact with the File Detective game.");
	console.log("Modify this file to experiment with different game flows.\n");

	await withE2E(
		{
			game: {
				id: "file-detective",
				plugin: FileDetective,
				config: FILE_DETECTIVE_TEST_CONFIG,
			},
			adapter: fileDetectiveAdapter,
		},
		async (e2e) => {
			e2e.debug("Initial State - Evidence Board");

			await e2e.press("enter");
			e2e.debug("After selecting first category (Root Files)");

			await e2e.type("package.json");
			e2e.debug("After typing answer");

			await e2e.press("enter");
			e2e.debug("After submitting answer - back to Evidence Board");

			await e2e.press("down");
			e2e.debug("After pressing down arrow");

			await e2e.press("enter");
			e2e.debug("After selecting second category");

			console.log("\n--- Sandbox Complete ---");
			console.log("Modify this file to test different interactions:");
			console.log("  - e2e.press('enter') - Press Enter key");
			console.log("  - e2e.press('up/down/left/right') - Arrow keys");
			console.log("  - e2e.type('text') - Type text input");
			console.log("  - e2e.debug('label') - Print current screen");
			console.log("  - e2e.lastFrame() - Get current screen as string");
			console.log("  - e2e.waitFor(fn) - Wait for condition");
		},
	);
}

main().catch(console.error);
