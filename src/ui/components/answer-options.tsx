import { Box, Text, useInput } from "ink";
import SelectInput from "ink-select-input";
import type React from "react";
import { useTheme } from "../theme.tsx";

interface SelectItem {
	label: string;
	value: string;
}

interface AnswerOptionsProps {
	options: string[];
	wrongAnswers: string[];
	onSelect: (value: string) => void;
	disabled: boolean;
	getValue?: (option: string) => string;
}

export function AnswerOptions({
	options,
	wrongAnswers,
	onSelect,
	disabled,
	getValue = (opt) => opt,
}: AnswerOptionsProps): React.ReactElement {
	const availableOptions = options.filter((opt) => !wrongAnswers.includes(opt));

	const selectItems: SelectItem[] = availableOptions.map((option) => {
		const originalIndex = options.indexOf(option) + 1;
		return {
			label: `[${originalIndex}] ${option}`,
			value: getValue(option),
		};
	});

	const handleSelect = (item: SelectItem) => {
		if (!disabled) {
			onSelect(item.value);
		}
	};

	useInput(
		(input) => {
			if (disabled) return;

			const num = Number.parseInt(input, 10);
			if (num >= 1 && num <= options.length) {
				const option = options[num - 1];
				if (!wrongAnswers.includes(option)) {
					onSelect(getValue(option));
				}
			}
		},
		{ isActive: !disabled },
	);

	return (
		<Box flexDirection="column">
			<WrongAnswerList options={options} wrongAnswers={wrongAnswers} />
			{disabled ? (
				<DisabledOptionsList items={selectItems} />
			) : (
				<SelectInput items={selectItems} onSelect={handleSelect} />
			)}
		</Box>
	);
}

interface WrongAnswerListProps {
	options: string[];
	wrongAnswers: string[];
}

export function WrongAnswerList({
	options,
	wrongAnswers,
}: WrongAnswerListProps): React.ReactElement {
	const { colors } = useTheme();

	return (
		<>
			{options.map((option, index) => {
				if (!wrongAnswers.includes(option)) return null;
				return (
					<Box key={option} paddingLeft={2}>
						<Text color={colors.error} strikethrough>
							[{index + 1}] {option}
						</Text>
						<Text color={colors.error}> ✗</Text>
					</Box>
				);
			})}
		</>
	);
}

interface DisabledOptionsListProps {
	items: SelectItem[];
}

function DisabledOptionsList({
	items,
}: DisabledOptionsListProps): React.ReactElement {
	const { colors } = useTheme();

	return (
		<Box flexDirection="column" paddingLeft={2}>
			{items.map((item) => (
				<Text key={item.value} color={colors.muted}>
					{item.label}
				</Text>
			))}
		</Box>
	);
}
