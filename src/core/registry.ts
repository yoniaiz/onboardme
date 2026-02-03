import type { GamePlugin } from "./plugin.ts";

export type GamePluginConstructor = new () => GamePlugin;

const gameRegistry = new Map<string, GamePluginConstructor>();

export function registerGame(id: string, plugin: GamePluginConstructor): void {
	gameRegistry.set(id, plugin);
}

export function getGamePlugin(id: string): GamePluginConstructor | undefined {
	return gameRegistry.get(id);
}

export function hasGame(id: string): boolean {
	return gameRegistry.has(id);
}

export function getRegisteredGames(): string[] {
	return Array.from(gameRegistry.keys());
}

export function clearRegistry(): void {
	gameRegistry.clear();
}
