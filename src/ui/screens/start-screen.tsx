import { Box, Text } from "ink";
import type React from "react";
import {
	Bullet,
	ErrorMessage,
	Muted,
	RoundedBox,
	Step,
	Success,
	Title,
} from "../components/index.ts";

interface ValidationError {
	field: string;
	error: string;
	game?: string;
}

interface ValidationFailedScreenProps {
	errors: ValidationError[];
}

export function ValidationFailedScreen({
	errors,
}: ValidationFailedScreenProps): React.ReactElement {
	return (
		<Box flexDirection="column" gap={1}>
			<Title>Starting OnboardMe...</Title>

			<ErrorMessage>Prepared data validation failed</ErrorMessage>

			<Box flexDirection="column">
				<Muted>Errors:</Muted>
				{errors.map((err) => {
					const field = err.game ? `${err.game}.${err.field}` : err.field;
					return (
						<Text key={field}>
							{"  "}
							<Text color="#ff6b6b">•</Text> {field}: {err.error}
						</Text>
					);
				})}
			</Box>

			<RoundedBox variant="warning" title="How to Fix">
				<Step number="1">Run the 'prepare game' skill in your AI platform</Step>
				<Step number="2">Run: onboardme validate</Step>
				<Step number="3">Once valid, run: onboardme start</Step>
			</RoundedBox>
		</Box>
	);
}

interface GameInfo {
	name: string;
	description: string;
	difficulty: string;
}

interface ValidationSuccessScreenProps {
	projectName: string;
	games: GameInfo[];
}

export function ValidationSuccessScreen({
	projectName,
	games,
}: ValidationSuccessScreenProps): React.ReactElement {
	return (
		<Box flexDirection="column" gap={1}>
			<Title>Starting OnboardMe...</Title>

			<Success>Prepared data validated successfully!</Success>

			<Box flexDirection="column">
				<Muted>Project: {projectName}</Muted>
				<Muted>Games available: {games.length}</Muted>
			</Box>

			<Box flexDirection="column">
				{games.map((game) => (
					<Box key={game.name} flexDirection="column">
						<Bullet>
							{game.name} ({game.difficulty})
						</Bullet>
						<Muted>
							{"    "}
							{game.description}
						</Muted>
					</Box>
				))}
			</Box>

			<Muted>Game engine not yet implemented. Coming in Milestone 2!</Muted>
		</Box>
	);
}

export function LoadManifestErrorScreen(): React.ReactElement {
	return (
		<Box flexDirection="column" gap={1}>
			<Title>Starting OnboardMe...</Title>
			<ErrorMessage>Failed to load manifest</ErrorMessage>
		</Box>
	);
}

interface EngineInitErrorScreenProps {
	errors: string[];
}

export function EngineInitErrorScreen({
	errors,
}: EngineInitErrorScreenProps): React.ReactElement {
	return (
		<Box flexDirection="column" gap={1}>
			<Title>Starting OnboardMe...</Title>

			<ErrorMessage>Failed to initialize game engine</ErrorMessage>

			<Box flexDirection="column">
				<Muted>Errors:</Muted>
				{errors.map((err) => (
					<Text key={err}>
						{"  "}
						<Text color="#ff6b6b">•</Text> {err}
					</Text>
				))}
			</Box>

			<RoundedBox variant="warning" title="How to Fix">
				<Step number="1">Run the 'prepare game' skill in your AI platform</Step>
				<Step number="2">Run: onboardme validate</Step>
				<Step number="3">Once valid, run: onboardme start</Step>
			</RoundedBox>
		</Box>
	);
}
