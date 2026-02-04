import { Box, Text } from "ink";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import type { GameEngine } from "@/core/engine.ts";
import type { AnswerResult, GameQuestion } from "@/core/types.ts";
import { Banner } from "@/ui/components/banner.tsx";
import { ScoreDisplay } from "@/ui/components/score-display.tsx";
import type { GameAdapter, GameCallbacks } from "./types.ts";

interface RenderWrapperProps<TState> {
	engine: GameEngine;
	adapter: GameAdapter<TState>;
}

interface WrapperState<TState> {
	gameState: TState | null;
	currentQuestion: GameQuestion | null;
	lastResult: AnswerResult | null;
	wrongAnswers: string[];
	isComplete: boolean;
}

export function RenderWrapper<TState>({
	engine,
	adapter,
}: RenderWrapperProps<TState>): React.ReactElement {
	const [state, setState] = useState<WrapperState<TState>>({
		gameState: null,
		currentQuestion: null,
		lastResult: null,
		wrongAnswers: [],
		isComplete: false,
	});

	const getGameState = useCallback(
		(): TState | null => adapter.extractState(engine),
		[engine, adapter],
	);

	const updateFromEngine = useCallback(() => {
		setState((prev) => ({
			...prev,
			gameState: getGameState(),
			currentQuestion: engine.getCurrentQuestion(),
		}));
	}, [engine, getGameState]);

	useEffect(() => {
		updateFromEngine();
	}, [updateFromEngine]);

	const handleSubmitAnswer = useCallback(
		async (answer: string) => {
			const result = await engine.submitAnswer(answer);

			const newGameState = getGameState();

			if (!result.correct && !result.isNavigation) {
				setState((prev) => ({
					...prev,
					wrongAnswers: [...prev.wrongAnswers, answer],
					lastResult: result,
					gameState: newGameState,
				}));
				return;
			}

			const nextQuestion = engine.getCurrentQuestion();

			if (!nextQuestion) {
				setState((prev) => ({
					...prev,
					isComplete: true,
					lastResult: result,
				}));
				return;
			}

			setState((prev) => ({
				...prev,
				currentQuestion: nextQuestion,
				lastResult: result,
				wrongAnswers: [],
				gameState: newGameState,
			}));
		},
		[engine, getGameState],
	);

	const callbacks: GameCallbacks = adapter.createCallbacks(
		handleSubmitAnswer,
		getGameState,
	);

	if (state.isComplete) {
		return (
			<Box flexDirection="column">
				<Banner />
				<Text color="green">Game Complete!</Text>
			</Box>
		);
	}

	const progress = engine.getProgress();

	return (
		<Box flexDirection="column" gap={1}>
			<Banner />

			<ScoreDisplay
				totalCommits={progress.sessionStats.totalCommits}
				currentStreak={progress.sessionStats.currentCleanStreak}
				currentQuestion={progress.currentQuestionIndex}
				totalQuestions={progress.totalQuestions}
				gameId={progress.currentGameId ?? "game"}
			/>

			{state.gameState &&
				adapter.render({
					state: state.gameState,
					currentQuestion: state.currentQuestion,
					lastResult: state.lastResult,
					wrongAnswers: state.wrongAnswers,
					disabled: false,
					callbacks,
				})}
		</Box>
	);
}
