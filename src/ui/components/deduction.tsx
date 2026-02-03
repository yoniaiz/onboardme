import { Box, Text, useInput } from "ink";
import Divider from "ink-divider";
import SelectInput from "ink-select-input";
import type React from "react";
import type {
	CaseNote,
	DeductionOption,
	ProjectTypeInfo,
} from "@/games/file-detective/types.ts";
import { useTheme } from "../theme.tsx";
import { CaseNotes } from "./case-notes.tsx";

interface DeductionScreenProps {
	prompt: string;
	options: DeductionOption[];
	caseNotes: CaseNote[];
	onSelect: (optionId: string) => void;
	disabled?: boolean;
}

interface SelectItem {
	label: string;
	value: string;
}

export function DeductionScreen({
	prompt,
	options,
	caseNotes,
	onSelect,
	disabled = false,
}: DeductionScreenProps): React.ReactElement {
	const { colors } = useTheme();

	const selectableItems: SelectItem[] = options.map((option, index) => ({
		label: `[${index + 1}] ${option.label}`,
		value: option.id,
	}));

	const handleSelect = (item: SelectItem) => {
		if (disabled) return;
		onSelect(item.value);
	};

	useInput(
		(input) => {
			if (disabled) return;

			const num = Number.parseInt(input, 10);
			if (num >= 1 && num <= options.length) {
				onSelect(options[num - 1].id);
			}
		},
		{ isActive: !disabled },
	);

	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderColor={colors.secondary}
			paddingX={2}
			paddingY={1}
		>
			<Box justifyContent="space-between">
				<Text bold color={colors.text}>
					FINAL DEDUCTION
				</Text>
				<Text color={colors.gold}>Make your conclusion</Text>
			</Box>

			<Text> </Text>

			<Text color={colors.text}>{prompt}</Text>

			<Text> </Text>

			<Text bold color={colors.secondary}>
				PROJECT TYPE:
			</Text>

			<Text> </Text>

			{disabled ? (
				<Box flexDirection="column" paddingLeft={2}>
					{options.map((option, index) => (
						<Text key={option.id} color={colors.muted}>
							[{index + 1}] {option.label}
						</Text>
					))}
				</Box>
			) : (
				<SelectInput items={selectableItems} onSelect={handleSelect} />
			)}

			<Text> </Text>
			<Divider />
			<Text> </Text>

			<CaseNotes notes={caseNotes} />

			<Text> </Text>
			<Text color={colors.muted}>
				Press 1-{options.length} to select your deduction
			</Text>
		</Box>
	);
}

interface DeductionResultScreenProps {
	playerChoice: string;
	correctAnswer: string;
	projectInfo: ProjectTypeInfo;
	correct: boolean;
	commitsEarned: number;
	missedClues?: string[];
}

export function DeductionResultScreen({
	playerChoice,
	correctAnswer,
	projectInfo,
	correct,
	commitsEarned,
	missedClues,
}: DeductionResultScreenProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	return (
		<Box flexDirection="column" gap={1}>
			<Box
				flexDirection="column"
				borderStyle="double"
				borderColor={correct ? colors.gold : colors.error}
				paddingX={2}
				paddingY={1}
				alignItems="center"
			>
				<Text bold color={correct ? colors.gold : colors.error}>
					{symbols.star} CASE CLOSED {symbols.star}
				</Text>
			</Box>

			<Box
				flexDirection="column"
				borderStyle="round"
				borderColor={colors.secondary}
				paddingX={2}
				paddingY={1}
			>
				<Box flexDirection="column" gap={1}>
					<Box>
						<Text color={colors.muted}>Your deduction: </Text>
						<Text color={colors.text}>{playerChoice}</Text>
					</Box>
					<Box>
						<Text color={colors.muted}>Actual project: </Text>
						<Text color={colors.text}>{correctAnswer}</Text>
					</Box>
				</Box>

				<Text> </Text>

				<Box justifyContent="center">
					{correct ? (
						<Text color={colors.primary} bold>
							{symbols.success} CORRECT!
						</Text>
					) : (
						<Text color={colors.error} bold>
							{symbols.error} Not quite...
						</Text>
					)}
				</Box>

				<Text> </Text>
				<Divider />
				<Text> </Text>

				{!correct && missedClues && missedClues.length > 0 && (
					<>
						<Text color={colors.muted}>The clues you missed:</Text>
						{missedClues.map((clue) => (
							<Text key={clue} color={colors.text}>
								{symbols.bullet} {clue}
							</Text>
						))}
						<Text> </Text>
					</>
				)}

				<ProjectProfile
					projectInfo={projectInfo}
					label={
						correct ? "PROJECT PROFILE UNLOCKED" : "PROJECT PROFILE REVEALED"
					}
				/>
			</Box>

			<Box paddingLeft={2}>
				<Text color={colors.gold}>
					+{commitsEarned} commits{!correct && " (partial credit)"}
				</Text>
			</Box>
		</Box>
	);
}

interface ProjectProfileProps {
	projectInfo: ProjectTypeInfo;
	label: string;
}

function ProjectProfile({
	projectInfo,
	label,
}: ProjectProfileProps): React.ReactElement {
	const { colors } = useTheme();

	return (
		<Box flexDirection="column">
			<Text bold color={colors.secondary}>
				{label}:
			</Text>
			<Box
				flexDirection="column"
				borderStyle="single"
				borderColor={colors.muted}
				paddingX={2}
				paddingY={1}
				marginTop={1}
			>
				<ProfileRow label="Type" value={projectInfo.projectType} />
				<ProfileRow label="Language" value={projectInfo.language} />
				<ProfileRow label="Framework" value={projectInfo.framework} />
				{projectInfo.architecture && (
					<ProfileRow label="Architecture" value={projectInfo.architecture} />
				)}
			</Box>
		</Box>
	);
}

interface ProfileRowProps {
	label: string;
	value: string;
}

function ProfileRow({ label, value }: ProfileRowProps): React.ReactElement {
	const { colors } = useTheme();
	const paddedLabel = `${label}:`.padEnd(14);

	return (
		<Text>
			<Text color={colors.muted}>{paddedLabel}</Text>
			<Text color={colors.text}>{value}</Text>
		</Text>
	);
}
