export { GameEngine } from "./engine.ts";
export {
	getGameDataPath,
	loadGameData,
	validateAllGames,
	validateGameData,
} from "./loader.ts";
export { GamePlugin } from "./plugin.ts";
export {
	clearRegistry,
	type GamePluginConstructor,
	getGamePlugin,
	getRegisteredGames,
	hasGame,
	registerGame,
} from "./registry.ts";
export type {
	AnswerScore,
	CalculateScoreParams,
	ScoringConfig,
	StreakState,
} from "./scoring.ts";
export {
	calculateScore,
	calculateSpeedBonus,
	calculateStreakMultiplier,
	createDefaultScoringConfig,
	createInitialStreakState,
	updateStreak,
} from "./scoring.ts";
export {
	getDefaultTemplate,
	loadTemplate,
	resolveGameOrder,
} from "./template.ts";
export type {
	AnswerResult,
	ContextRequirement,
	GamePluginSchema,
	GamePreparedData,
	GameQuestion,
	GameResult,
	GameRuntimeProgress,
	QuestionType,
} from "./types.ts";
