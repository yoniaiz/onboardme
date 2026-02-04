import { Box, useApp } from "ink";
import type React from "react";
import { useCallback, useState } from "react";
import type {
	AnswerResult,
	GameResult,
	OnboardMeConfig,
} from "@/types/game.ts";
import { Banner } from "../components/banner.tsx";
import { ScoreDisplay } from "../components/score-display.tsx";
import { SessionComplete, type SessionStats } from "./session-complete.tsx";

interface OrchestratorProps {
	config: OnboardMeConfig;
	onSessionComplete: (stats: SessionStats) => void;
}

export function GameOrchestrator({
	config,
	onSessionComplete,
}: OrchestratorProps): React.ReactElement {
	const { exit } = useApp();
	const [gameIndex, setGameIndex] = useState(0);
	const [stats, setStats] = useState<SessionStats>({
		totalCommits: 0,
		correctAnswers: 0,
		totalAnswers: 0,
		currentStreak: 0,
		longestStreak: 0,
	});
	const [isComplete, setIsComplete] = useState(false);

	const currentGame = config.games[gameIndex];

	const handleAnswerResult = useCallback((result: AnswerResult) => {
		if (result.isNavigation) return;

		setStats((prev) => {
			const newStreak = result.correct ? prev.currentStreak + 1 : 0;
			return {
				totalCommits: prev.totalCommits + result.commitsEarned,
				correctAnswers: prev.correctAnswers + (result.correct ? 1 : 0),
				totalAnswers: prev.totalAnswers + 1,
				currentStreak: newStreak,
				longestStreak: Math.max(prev.longestStreak, newStreak),
			};
		});
	}, []);

	const handleGameComplete = useCallback(
		(_result: GameResult) => {
			const nextIndex = gameIndex + 1;

			if (nextIndex >= config.games.length) {
				setIsComplete(true);
				setStats((currentStats) => {
					onSessionComplete(currentStats);
					return currentStats;
				});
				setTimeout(() => exit(), 2000);
			} else {
				setGameIndex(nextIndex);
			}
		},
		[gameIndex, config.games.length, onSessionComplete, exit],
	);

	if (isComplete || !currentGame) {
		return (
			<Box flexDirection="column" gap={1}>
				<Banner />
				<SessionComplete stats={stats} />
			</Box>
		);
	}

	const GameComponent = currentGame.component;

	return (
		<Box flexDirection="column" gap={1}>
			<Banner />
			<ScoreDisplay
				totalCommits={stats.totalCommits}
				currentStreak={stats.currentStreak}
				currentQuestion={gameIndex + 1}
				totalQuestions={config.games.length}
				gameId={currentGame.id}
			/>
			<GameComponent
				config={currentGame.config}
				onAnswerResult={handleAnswerResult}
				onGameComplete={handleGameComplete}
			/>
		</Box>
	);
}
