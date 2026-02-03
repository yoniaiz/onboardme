import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import type React from "react";
import { useState } from "react";
import type { AnswerResult, GameQuestion } from "@/core/types.ts";
import { useTheme } from "../theme.tsx";
import { AnswerOptions } from "./answer-options.tsx";

interface QuestionDisplayProps {
	question: GameQuestion;
	onSubmit: (answer: string) => void;
	disabled?: boolean;
	wrongAnswers?: string[];
}

export function QuestionDisplay({
	question,
	onSubmit,
	disabled = false,
	wrongAnswers = [],
}: QuestionDisplayProps): React.ReactElement {
	const { colors } = useTheme();

	const isMultipleChoice =
		question.type === "multiple-choice" && Boolean(question.options);

	return (
		<Box flexDirection="column" gap={1}>
			<Box
				flexDirection="column"
				borderStyle="round"
				borderColor={colors.secondary}
				paddingX={2}
				paddingY={1}
			>
				<Text color={colors.text}>{question.prompt}</Text>
				{question.context && (
					<>
						<Text> </Text>
						<Text color={colors.muted}>Context: {question.context}</Text>
					</>
				)}
			</Box>

			{isMultipleChoice ? (
				<AnswerOptions
					options={question.options ?? []}
					wrongAnswers={wrongAnswers}
					onSelect={onSubmit}
					disabled={disabled}
				/>
			) : (
				<TextInputField
					key={question.id}
					onSubmit={onSubmit}
					disabled={disabled}
				/>
			)}

			<Text color={colors.muted}>
				{isMultipleChoice
					? "Use arrows to navigate, Enter to select"
					: "Press Enter to submit"}
			</Text>
		</Box>
	);
}

interface TextInputFieldProps {
	onSubmit: (value: string) => void;
	disabled: boolean;
}

function TextInputField({
	onSubmit,
	disabled,
}: TextInputFieldProps): React.ReactElement {
	const { colors } = useTheme();
	const [value, setValue] = useState("");

	const handleSubmit = (text: string) => {
		if (!disabled && text.trim()) {
			onSubmit(text.trim());
		}
	};

	return (
		<Box paddingLeft={2}>
			<Text color={colors.secondary}>&gt; </Text>
			{disabled ? (
				<Text color={colors.muted}>{value}</Text>
			) : (
				<TextInput
					value={value}
					onChange={setValue}
					onSubmit={handleSubmit}
					placeholder="Type your answer..."
				/>
			)}
		</Box>
	);
}

interface FeedbackDisplayProps {
	result: AnswerResult;
}

export function FeedbackDisplay({
	result,
}: FeedbackDisplayProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	return (
		<Box flexDirection="column" paddingY={1}>
			<Box justifyContent="space-between">
				<Text>
					{result.correct ? (
						<Text color={colors.primary} bold>
							{symbols.success} CORRECT
						</Text>
					) : (
						<Text color={colors.error} bold>
							{symbols.error} BUILD FAILED
						</Text>
					)}
				</Text>
				<Text color={result.correct ? colors.gold : colors.muted}>
					+{result.commitsEarned} commits
				</Text>
			</Box>
			<Text color={colors.muted}> {result.feedback}</Text>
		</Box>
	);
}
