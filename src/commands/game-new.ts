import { join } from "node:path";
import { ExitCode } from "@/lib/errors.ts";
import { dirExists, ensureDir, writeTextFile } from "@/lib/fs.ts";

const DEFAULT_ESTIMATED_MINUTES = 5;

export async function gameNewCommand(id: string): Promise<number> {
	const trimmedId = id.trim();
	if (!trimmedId) {
		console.error("Game id is required.");
		return ExitCode.InvalidArguments;
	}

	const cwd = process.cwd();
	const gameDir = join(cwd, "src", "games", trimmedId);

	if (dirExists(gameDir)) {
		console.error(`Game already exists at src/games/${trimmedId}`);
		return ExitCode.GeneralError;
	}

	await ensureDir(gameDir);

	const pascalId = toPascalCase(trimmedId);
	const displayName = toDisplayName(trimmedId);

	await writeTextFile(
		join(gameDir, "index.ts"),
		createIndexTemplate(trimmedId, pascalId, displayName),
	);
	await writeTextFile(
		join(gameDir, "component.tsx"),
		createComponentTemplate(pascalId),
	);
	await writeTextFile(join(gameDir, "types.ts"), createTypesTemplate(pascalId));
	await writeTextFile(
		join(gameDir, "ai-context.ts"),
		createAiContextTemplate(trimmedId, displayName, pascalId),
	);

	console.log(`Created game scaffold in src/games/${trimmedId}`);
	return ExitCode.Success;
}

function toPascalCase(value: string): string {
	return value
		.split(/[^a-zA-Z0-9]/)
		.filter(Boolean)
		.map((part) => part[0]?.toUpperCase() + part.slice(1))
		.join("");
}

function toDisplayName(value: string): string {
	return value
		.split(/[-_]/)
		.filter(Boolean)
		.map((part) => part[0]?.toUpperCase() + part.slice(1))
		.join(" ");
}

function createIndexTemplate(
	id: string,
	pascalId: string,
	displayName: string,
): string {
	return `import { defineGame } from "@/types/game.ts";
import type { ${pascalId}Config } from "./types.ts";
import { ${pascalId}Component } from "./component.tsx";
import { getAIContext } from "./ai-context.ts";
import { defaultConfig } from "./types.ts";

export const ${pascalId} = defineGame<${pascalId}Config>({
	id: "${id}",
	component: ${pascalId}Component,
	defaultConfig,
	metadata: {
		id: "${id}",
		name: "${displayName}",
		description: "",
		estimatedMinutes: ${DEFAULT_ESTIMATED_MINUTES},
	},
	getAIContext,
});
`;
}

function createComponentTemplate(pascalId: string): string {
	return `import React, { useCallback, useReducer } from "react";
import { Box } from "ink";
import type { GameProps } from "@/types/game.ts";
import type { ${pascalId}Config } from "./types.ts";

interface State {
	questionIndex: number;
	startTime: number;
}

type Action = { type: "NEXT_QUESTION" };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "NEXT_QUESTION":
			return { ...state, questionIndex: state.questionIndex + 1 };
		default:
			return state;
	}
}

export function ${pascalId}Component({
	config,
	onAnswerResult,
	onGameComplete,
}: GameProps<${pascalId}Config>): React.ReactElement {
	const [state, dispatch] = useReducer(reducer, {
		questionIndex: 0,
		startTime: Date.now(),
	});

	const handleSubmit = useCallback(
		(answer: string) => {
			onAnswerResult({ correct: true, feedback: "", commitsEarned: 10 });
			dispatch({ type: "NEXT_QUESTION" });
			if (state.questionIndex >= config.questions.length - 1) {
				onGameComplete({
					completed: true,
					score: 10,
					maxScore: 10,
					timeSpent: Date.now() - state.startTime,
					knowledgeUnlocked: [],
				});
			}
		},
		[state, config, onAnswerResult, onGameComplete],
	);

	return <Box>{${pascalId}Component.name} ready</Box>;
}
`;
}

function createTypesTemplate(pascalId: string): string {
	return `import { z } from "zod";

export const ${pascalId}ConfigSchema = z.object({
	difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
	questions: z
		.array(
			z.object({
				text: z.string(),
				answer: z.string(),
				hints: z.array(z.string()).optional(),
			}),
		)
		.default([]),
});

export type ${pascalId}Config = z.infer<typeof ${pascalId}ConfigSchema>;

export const defaultConfig: ${pascalId}Config = {
	difficulty: "medium",
	questions: [],
};
`;
}

function createAiContextTemplate(
	id: string,
	displayName: string,
	pascalId: string,
): string {
	return `import type { GameAIContext } from "@/types/game.ts";
import { ${pascalId}ConfigSchema, defaultConfig } from "./types.ts";

export function getAIContext(): GameAIContext {
	return {
		gameId: "${id}",
		gameName: "${displayName}",
		purpose: "",
		configSchema: ${pascalId}ConfigSchema.shape as Record<string, unknown>,
		questionGuidelines: [],
		exampleConfig: defaultConfig,
	};
}
`;
}
