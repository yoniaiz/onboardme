import { Box, Text } from "ink";
import type React from "react";
import {
	Banner,
	Muted,
	RoundedBox,
	Step,
	Success,
	Warning,
} from "../components/index.ts";

interface InitSuccessScreenProps {
	directories: string[];
}

export function InitSuccessScreen({
	directories,
}: InitSuccessScreenProps): React.ReactElement {
	return (
		<Box flexDirection="column" gap={1}>
			<Banner />

			<Success>OnboardMe initialized successfully!</Success>

			<Box flexDirection="column">
				<Muted>Created:</Muted>
				{directories.map((dir) => (
					<Muted key={dir}>
						{"  "}
						{dir}
					</Muted>
				))}
			</Box>

			<RoundedBox title="Next Steps">
				<Step number="1">Run the 'prepare game' skill in your AI platform</Step>
				<Step number="2">Then run: onboardme start</Step>
			</RoundedBox>
		</Box>
	);
}

interface InitAlreadyExistsScreenProps {
	directory: string;
}

export function InitAlreadyExistsScreen({
	directory,
}: InitAlreadyExistsScreenProps): React.ReactElement {
	return (
		<Box flexDirection="column" gap={1}>
			<Banner />

			<Warning>OnboardMe is already initialized in this directory</Warning>
			<Text>
				{"  "}Found: {directory}
			</Text>

			<Muted>To reset, delete the .onboardme folder and run init again.</Muted>
		</Box>
	);
}
