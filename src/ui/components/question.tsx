import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
import type React from "react";
import { useState } from "react";
import type { AnswerResult, GameQuestion } from "@/core/types.ts";
import { useTheme } from "../theme.tsx";

interface QuestionDisplayProps {
	question: GameQuestion;
	onSubmit: (answer: string) => void;
	disabled?: boolean;
}

export function QuestionDisplay({
	question,
	onSubmit,
	disabled = false,
}: QuestionDisplayProps): React.ReactElement {
	const { colors } = useTheme();

	const isMultipleChoice =
		question.type === "multiple-choice" && Boolean(question.options);

	useInput(
		(input) => {
			if (disabled || !isMultipleChoice) return;

			const num = Number.parseInt(input, 10);
			if (num >= 1 && num <= (question.options?.length ?? 0)) {
				onSubmit(question.options?.[num - 1] ?? "");
			}
		},
		{ isActive: !disabled && isMultipleChoice },
	);

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
				<MultipleChoiceOptions
					options={question.options ?? []}
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
					? `Press 1-${question.options?.length ?? 4} to select`
					: "Press Enter to submit"}
			</Text>
		</Box>
	);
}

interface MultipleChoiceOptionsProps {
	options: string[];
	disabled: boolean;
}

function MultipleChoiceOptions({
	options,
	disabled,
}: MultipleChoiceOptionsProps): React.ReactElement {
	const { colors } = useTheme();

	return (
		<Box flexDirection="column" paddingLeft={2}>
			{options.map((option, index) => (
				<Text key={option} color={disabled ? colors.muted : colors.text}>
					<Text color={colors.secondary}>[{index + 1}]</Text> {option}
				</Text>
			))}
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
