import { Box, Text } from "ink";
import type React from "react";
import {
	LabeledValue,
	Muted,
	Primary,
	ProgressBar,
	RoundedBox,
	StatusIcon,
	Title,
} from "../components/index.ts";

export function NotStartedScreen(): React.ReactElement {
	return (
		<RoundedBox title="OnboardMe Status">
			<LabeledValue label="Status">Not started</LabeledValue>
			<Text> </Text>
			<Text>
				Run <Primary>onboardme start</Primary> to begin your onboarding journey!
			</Text>
		</RoundedBox>
	);
}

interface GameStatusProps {
	gameId: string;
	status: "completed" | "in_progress" | "pending";
	score: number;
	maxScore: number;
}

interface StatusScreenProps {
	projectName: string;
	completion: number;
	totalScore: number;
	maxTotalScore: number;
	gamesCompleted: number;
	totalGames: number;
	timePlayed: string;
	currentGameId: string | null;
	games: GameStatusProps[];
}

export function StatusScreen({
	projectName,
	completion,
	totalScore,
	maxTotalScore,
	gamesCompleted,
	totalGames,
	timePlayed,
	currentGameId,
	games,
}: StatusScreenProps): React.ReactElement {
	return (
		<Box flexDirection="column" gap={1}>
			<RoundedBox title="OnboardMe Status">
				<LabeledValue label="Project">{projectName}</LabeledValue>
				<Box>
					<Text>
						<Muted>Progress:</Muted>{" "}
					</Text>
					<ProgressBar percentage={completion} />
					<Text> {completion}%</Text>
				</Box>
				<LabeledValue label="Score">
					{totalScore}/{maxTotalScore}
				</LabeledValue>
				<LabeledValue label="Games">
					{gamesCompleted}/{totalGames} completed
				</LabeledValue>
				<LabeledValue label="Time played">{timePlayed}</LabeledValue>
				<LabeledValue label="Current game">
					{currentGameId ?? "None"}
				</LabeledValue>
			</RoundedBox>

			{games.length > 0 && (
				<Box flexDirection="column">
					<Title>Games:</Title>
					<Text> </Text>
					{games.map((game) => {
						const gameCompletion =
							game.maxScore > 0
								? Math.round((game.score / game.maxScore) * 100)
								: 0;
						return (
							<Box key={game.gameId} flexDirection="column">
								<Box>
									<Text>{"  "}</Text>
									<StatusIcon status={game.status} />
									<Text> {game.gameId}</Text>
								</Box>
								<Muted>
									{"    "}Score: {game.score}/{game.maxScore} ({gameCompletion}
									%)
								</Muted>
							</Box>
						);
					})}
				</Box>
			)}
		</Box>
	);
}

export function NoProgressScreen(): React.ReactElement {
	return <Muted>No progress data found. Run 'onboardme start' to begin.</Muted>;
}
