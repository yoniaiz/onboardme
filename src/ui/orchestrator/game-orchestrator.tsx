import { Box, useApp } from "ink";
import type React from "react";
import { useCallback, useState } from "react";
import type {
	AnswerResult,
	GameResult,
	OnboardMeConfig,
} from "@/types/game.ts";
import { Banner } from "../components/banner.tsx";
import { MonsterReaction } from "../components/monster-reaction.tsx";
import { ScoreDisplay } from "../components/score-display.tsx";
import { SessionComplete, type SessionStats } from "./session-complete.tsx";

const MONSTER_DIALOGUE = [
	"*crackle*",
	"",
	"*something shifts in the codebase*",
	"",
	'"Hmm."',
	"",
	"*tangle tangle*",
	"",
	'"You actually looked before you leaped."',
	"",
	"*slrrrrp*",
	"",
	'"Examined the evidence. Drew conclusions."',
	"",
	"*pause*",
	"",
	"\"Identified the tech stack without grep'ing for 'framework'.\"",
	"",
	"*static spike*",
	"",
	"\"That's... that's not how this usually goes.\"",
	"",
	"*whirrrr*",
	"",
	"\"Usually they just open package.json, say 'ah, JavaScript,' and start typing things.\"",
	"",
	"*creak*",
	"",
	'"You\'re methodical."',
	"",
	"*pause*",
	"",
	'"I don\'t like methodical."',
	"",
	"*hrrrrnn*",
	"",
	'"Methodical people find things."',
	"",
	"*kzzzt*",
	"",
	'"I\'m watching you."',
	"",
	"[SIGNAL LOST]",
];

type OrchestratorPhase = "playing" | "monster-reaction" | "session-complete";

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
	const [phase, setPhase] = useState<OrchestratorPhase>("playing");

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

	const handleGameComplete = useCallback((_result: GameResult) => {
		setPhase("monster-reaction");
	}, []);

	const handleMonsterContinue = useCallback(() => {
		const nextIndex = gameIndex + 1;

		if (nextIndex >= config.games.length) {
			setPhase("session-complete");
			setStats((currentStats) => {
				onSessionComplete(currentStats);
				return currentStats;
			});
			setTimeout(() => exit(), 2000);
		} else {
			setGameIndex(nextIndex);
			setPhase("playing");
		}
	}, [gameIndex, config.games.length, onSessionComplete, exit]);

	if (phase === "session-complete" || !currentGame) {
		return (
			<Box flexDirection="column" gap={1}>
				<Banner />
				<SessionComplete stats={stats} />
			</Box>
		);
	}

	if (phase === "monster-reaction") {
		return (
			<Box flexDirection="column" gap={1}>
				<Banner />
				<MonsterReaction
					dialogue={MONSTER_DIALOGUE}
					onContinue={handleMonsterContinue}
				/>
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
