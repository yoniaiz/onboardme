import { Box, Text, useApp } from "ink";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DEDUCTION_OPTION_TEXT, GAME_IDS } from "@/core/constants.ts";
import type { GameEngine } from "@/core/engine.ts";
import type { AnswerResult, GameQuestion } from "@/core/types.ts";
import { FileDetective } from "@/games/file-detective/index.ts";
import type {
	FileDetectiveConfig,
	InvestigationState,
} from "@/games/file-detective/types.ts";
import type { EngineProgress } from "@/types/engine.ts";
import { Banner, Muted, Title } from "../components/index.ts";
import { FeedbackDisplay, QuestionDisplay } from "../components/question.tsx";
import { ScoreDisplay } from "../components/score-display.tsx";
import { useTheme } from "../theme.tsx";
import {
	buildDeductionResult,
	type DeductionResult,
	FileDetectiveDeductionResult,
	FileDetectiveMonster,
	FileDetectiveUI,
} from "./file-detective-game.tsx";

interface GameScreenProps {
	engine: GameEngine;
	onComplete: () => void;
}

type ScreenState =
	| "loading"
	| "playing"
	| "feedback"
	| "deduction-result"
	| "monster-reaction"
	| "complete";

interface GameState {
	screenState: ScreenState;
	currentQuestion: GameQuestion | null;
	lastResult: AnswerResult | null;
	currentStreak: number;
	progress: EngineProgress;
	investigationState: InvestigationState | null;
	fileDetectiveConfig: FileDetectiveConfig | null;
	deductionResult: DeductionResult | null;
	wrongAnswers: string[];
}

function createInitialState(progress: EngineProgress): GameState {
	return {
		screenState: "loading",
		currentQuestion: null,
		lastResult: null,
		currentStreak: 0,
		progress,
		investigationState: null,
		fileDetectiveConfig: null,
		deductionResult: null,
		wrongAnswers: [],
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

	const isFileDetective =
		state.progress.currentGameId === GAME_IDS.FILE_DETECTIVE;

	const getFileDetectivePlugin = useCallback((): FileDetective | null => {
		if (!isFileDetective) return null;
		const plugin = engine.getCurrentPlugin();
		return plugin instanceof FileDetective ? plugin : null;
	}, [engine, isFileDetective]);

	const handleGameComplete = useCallback(() => {
		onComplete();
		exit();
	}, [onComplete, exit]);

	const updateStateWithPlugin = useCallback(
		(
			updates: Partial<GameState>,
			fdPlugin: FileDetective | null,
		): Partial<GameState> => ({
			...updates,
			investigationState: fdPlugin?.getInvestigationState() ?? null,
			fileDetectiveConfig: fdPlugin?.getConfig() ?? null,
		}),
		[],
	);

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;

		const startEngine = async () => {
			try {
				await engine.startSession();
				const question = engine.getCurrentQuestion();
				const progress = engine.getProgress();

				if (question) {
					const fdPlugin =
						progress.currentGameId === GAME_IDS.FILE_DETECTIVE
							? getFileDetectivePlugin()
							: null;

					setState((prev) => ({
						...prev,
						screenState: "playing",
						currentQuestion: question,
						progress,
						...updateStateWithPlugin({}, fdPlugin),
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
	}, [
		engine,
		handleGameComplete,
		exit,
		getFileDetectivePlugin,
		updateStateWithPlugin,
	]);

	const handleSubmitAnswer = useCallback(
		async (answer: string) => {
			const plugin = getFileDetectivePlugin();
			const previousStep = plugin?.getInvestigationState().step;

			const result = await engine.submitAnswer(answer);
			const progress = engine.getProgress();
			const nextQuestion = engine.getCurrentQuestion();
			const updatedPlugin = getFileDetectivePlugin();

			if (isFileDetective && !result.correct && previousStep !== "select") {
				setState((prev) => ({
					...prev,
					wrongAnswers: [...prev.wrongAnswers, answer],
					lastResult: result,
				}));
				return;
			}

			if (isFileDetective && result.isNavigation) {
				setState((prev) => ({
					...prev,
					screenState: "playing",
					currentQuestion: nextQuestion,
					progress: engine.getProgress(),
					wrongAnswers: [],
					...updateStateWithPlugin({}, updatedPlugin),
				}));
				return;
			}

			setState((prev) => ({
				...prev,
				screenState: "feedback",
				lastResult: result,
				currentStreak: progress.sessionStats.currentCleanStreak,
				progress,
				...updateStateWithPlugin({}, updatedPlugin),
			}));

			if (previousStep === "deduction" && isFileDetective && plugin) {
				const deductionResult = buildDeductionResult(
					answer,
					plugin.getConfig(),
					result,
				);

				setState((prev) => ({
					...prev,
					screenState: "deduction-result",
					deductionResult,
					wrongAnswers: [],
				}));

				setTimeout(() => {
					setState((prev) => ({ ...prev, screenState: "monster-reaction" }));
				}, 3000);
				return;
			}

			setTimeout(() => {
				if (nextQuestion) {
					setState((prev) => ({
						...prev,
						screenState: "playing",
						currentQuestion: nextQuestion,
						progress: engine.getProgress(),
						wrongAnswers: [],
						...updateStateWithPlugin({}, getFileDetectivePlugin()),
					}));
				} else {
					handleGameComplete();
				}
			}, 1500);
		},
		[
			engine,
			handleGameComplete,
			isFileDetective,
			getFileDetectivePlugin,
			updateStateWithPlugin,
		],
	);

	const handleSelectCategory = useCallback(
		(categoryId: string) => {
			const category = state.fileDetectiveConfig?.evidence.find(
				(c) => c.id === categoryId,
			);
			if (category) {
				handleSubmitAnswer(category.title);
			}
		},
		[state.fileDetectiveConfig, handleSubmitAnswer],
	);

	const handleStartDeduction = useCallback(() => {
		handleSubmitAnswer(DEDUCTION_OPTION_TEXT);
	}, [handleSubmitAnswer]);

	const handleDeductionSelect = useCallback(
		(optionId: string) => {
			const option = state.fileDetectiveConfig?.deduction.options.find(
				(o) => o.id === optionId,
			);
			if (option) {
				handleSubmitAnswer(option.label);
			}
		},
		[state.fileDetectiveConfig, handleSubmitAnswer],
	);

	if (state.screenState === "loading") {
		return <LoadingScreen />;
	}

	if (state.screenState === "deduction-result" && state.deductionResult) {
		return (
			<Box flexDirection="column" gap={1}>
				<Banner />
				<FileDetectiveDeductionResult deductionResult={state.deductionResult} />
			</Box>
		);
	}

	if (state.screenState === "monster-reaction") {
		return (
			<Box flexDirection="column" gap={1}>
				<Banner />
				<FileDetectiveMonster onContinue={handleGameComplete} />
			</Box>
		);
	}

	return (
		<Box flexDirection="column" gap={1}>
			<Banner />

			<ScoreDisplay
				totalCommits={state.progress.sessionStats.totalCommits}
				currentStreak={state.currentStreak}
				currentQuestion={
					isFileDetective
						? state.progress.currentQuestionIndex
						: state.progress.currentQuestionIndex + 1
				}
				totalQuestions={state.progress.totalQuestions}
				gameId={state.progress.currentGameId ?? "game"}
			/>

			{isFileDetective &&
			state.investigationState &&
			state.fileDetectiveConfig ? (
				<FileDetectiveUI
					investigationState={state.investigationState}
					config={state.fileDetectiveConfig}
					currentQuestion={state.currentQuestion}
					lastResult={state.lastResult}
					wrongAnswers={state.wrongAnswers}
					disabled={state.screenState === "feedback"}
					onSelectCategory={handleSelectCategory}
					onStartDeduction={handleStartDeduction}
					onDeductionSelect={handleDeductionSelect}
					onSubmitAnswer={handleSubmitAnswer}
				/>
			) : (
				state.currentQuestion && (
					<QuestionDisplay
						question={state.currentQuestion}
						onSubmit={handleSubmitAnswer}
						disabled={state.screenState === "feedback"}
					/>
				)
			)}

			{state.screenState === "feedback" &&
				state.lastResult &&
				!isFileDetective && <FeedbackDisplay result={state.lastResult} />}
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
