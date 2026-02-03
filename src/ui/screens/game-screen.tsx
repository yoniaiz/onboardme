import { Box, Text, useApp } from "ink";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GameEngine } from "@/core/engine.ts";
import type { AnswerResult, GameQuestion } from "@/core/types.ts";
import type { EngineProgress } from "@/types/engine.ts";
import { Banner, Muted, Title } from "../components/index.ts";
import { FeedbackDisplay, QuestionDisplay } from "../components/question.tsx";
import { ScoreDisplay } from "../components/score-display.tsx";
import { useTheme } from "../theme.tsx";

interface GameScreenProps {
	engine: GameEngine;
	onComplete: () => void;
}

type ScreenState = "loading" | "playing" | "feedback" | "complete";

interface GameState {
	screenState: ScreenState;
	currentQuestion: GameQuestion | null;
	lastResult: AnswerResult | null;
	currentStreak: number;
	progress: EngineProgress;
}

function createInitialState(progress: EngineProgress): GameState {
	return {
		screenState: "loading",
		currentQuestion: null,
		lastResult: null,
		currentStreak: 0,
		progress,
	};
}

export function GameScreen({
	engine,
	onComplete,
}: GameScreenProps): React.ReactElement {
	const { exit } = useApp();
	const [state, setState] = useState<GameState>(() =>
		createInitialState(engine.getProgress()),
	);
	const initialized = useRef(false);

	const handleGameComplete = useCallback(() => {
		onComplete();
		exit();
	}, [onComplete, exit]);

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;

		const startEngine = async () => {
			try {
				await engine.startSession();
				const question = engine.getCurrentQuestion();
				if (question) {
					setState((prev) => ({
						...prev,
						screenState: "playing",
						currentQuestion: question,
						progress: engine.getProgress(),
					}));
				} else {
					handleGameComplete();
				}
			} catch (error) {
				console.error("Failed to start game session:", error);
				exit();
			}
		};
		startEngine();
	}, [engine, handleGameComplete, exit]);

	const handleSubmitAnswer = useCallback(
		async (answer: string) => {
			setState((prev) => ({ ...prev, screenState: "feedback" }));

			const result = await engine.submitAnswer(answer);
			const progress = engine.getProgress();
			const nextQuestion = engine.getCurrentQuestion();

			setState((prev) => ({
				...prev,
				lastResult: result,
				currentStreak: progress.sessionStats.currentCleanStreak,
				progress,
			}));

			setTimeout(() => {
				if (nextQuestion) {
					setState((prev) => ({
						...prev,
						screenState: "playing",
						currentQuestion: nextQuestion,
						progress: engine.getProgress(),
					}));
				} else {
					handleGameComplete();
				}
			}, 1500);
		},
		[engine, handleGameComplete],
	);

	if (state.screenState === "loading") {
		return <LoadingScreen />;
	}

	return (
		<Box flexDirection="column" gap={1}>
			<Banner />

			<ScoreDisplay
				totalCommits={state.progress.sessionStats.totalCommits}
				currentStreak={state.currentStreak}
				currentQuestion={state.progress.currentQuestionIndex + 1}
				totalQuestions={state.progress.totalQuestions}
				gameId={state.progress.currentGameId ?? "game"}
			/>

			{state.currentQuestion && (
				<QuestionDisplay
					question={state.currentQuestion}
					onSubmit={handleSubmitAnswer}
					disabled={state.screenState === "feedback"}
				/>
			)}

			{state.screenState === "feedback" && state.lastResult && (
				<FeedbackDisplay result={state.lastResult} />
			)}
		</Box>
	);
}

function LoadingScreen(): React.ReactElement {
	return (
		<Box flexDirection="column" gap={1}>
			<Banner />
			<Title>Loading game...</Title>
			<Muted>Preparing questions...</Muted>
		</Box>
	);
}

interface SessionCompleteScreenProps {
	totalCommits: number;
	correctAnswers: number;
	totalQuestions: number;
	longestStreak: number;
}

export function SessionCompleteScreen({
	totalCommits,
	correctAnswers,
	totalQuestions,
	longestStreak,
}: SessionCompleteScreenProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	return (
		<Box flexDirection="column" gap={1}>
			<Banner />

			<Box
				flexDirection="column"
				borderStyle="double"
				borderColor={colors.gold}
				paddingX={2}
				paddingY={1}
			>
				<Text bold color={colors.gold}>
					{symbols.star} SESSION COMPLETE {symbols.star}
				</Text>
			</Box>

			<Box flexDirection="column" paddingLeft={2}>
				<Text>
					<Text color={colors.gold}>{symbols.star}</Text> Total Commits:{" "}
					<Text bold color={colors.gold}>
						{totalCommits}
					</Text>
				</Text>
				<Text>
					<Text color={colors.primary}>{symbols.success}</Text> Correct Answers:{" "}
					<Text color={colors.text}>
						{correctAnswers}/{totalQuestions}
					</Text>
				</Text>
				<Text>
					<Text color={colors.primary}>🔥</Text> Longest Streak:{" "}
					<Text color={colors.text}>{longestStreak}</Text>
				</Text>
			</Box>

			<Muted>Your progress has been saved.</Muted>
		</Box>
	);
}
