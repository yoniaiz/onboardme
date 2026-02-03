import { MockGame } from "@/games/mock/index.ts";
import { registerGame } from "./registry.ts";

export function bootstrapGames(): void {
	registerGame("mock-game", MockGame);
}
