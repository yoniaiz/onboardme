import { FileDetective } from "@/games/file-detective/index.ts";
import { MockGame } from "@/games/mock/index.ts";
import { registerGame } from "./registry.ts";

export function bootstrapGames(): void {
	registerGame("file-detective", FileDetective);
	registerGame("mock-game", MockGame);
}
