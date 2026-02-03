import { Box, Text, useInput } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";

interface MonsterReactionProps {
	dialogue: string[];
	onContinue: () => void;
}

export function MonsterReaction({
	dialogue,
	onContinue,
}: MonsterReactionProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	useInput(() => {
		onContinue();
	});

	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderColor={colors.muted}
			paddingX={2}
			paddingY={1}
		>
			<Box marginBottom={1}>
				<Text color={colors.muted}>{symbols.filledBlock}</Text>
				<Text color={colors.secondary}> INCOMING TRANSMISSION </Text>
				<Text color={colors.muted}>{symbols.filledBlock}</Text>
			</Box>

			<Box flexDirection="column" gap={0}>
				{dialogue.map((line) => (
					<DialogueLine key={line || "empty-line"} line={line} />
				))}
			</Box>

			<Box marginTop={1}>
				<Text color={colors.muted}>[Press any key to continue]</Text>
			</Box>
		</Box>
	);
}

interface DialogueLineProps {
	line: string;
}

function DialogueLine({ line }: DialogueLineProps): React.ReactElement {
	const { colors } = useTheme();

	const isSound = line.startsWith("*") && line.endsWith("*");
	const isSignal =
		line.startsWith("[") && line.endsWith("]") && line.includes("SIGNAL");

	if (isSound) {
		return (
			<Text color={colors.muted} italic>
				{line}
			</Text>
		);
	}

	if (isSignal) {
		return (
			<Text color={colors.error} bold>
				{line}
			</Text>
		);
	}

	return <Text color={colors.text}>{line}</Text>;
}
