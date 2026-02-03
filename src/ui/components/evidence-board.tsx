import { Box, Text, useInput } from "ink";
import Divider from "ink-divider";
import SelectInput from "ink-select-input";
import type React from "react";
import type {
	CaseNote,
	EvidenceCategory,
	EvidenceCategoryId,
} from "@/games/file-detective/types.ts";
import { useTheme } from "../theme.tsx";
import { CaseNotes } from "./case-notes.tsx";

const CATEGORY_ICONS: Record<EvidenceCategoryId, string> = {
	"root-files": "📁",
	"folder-structure": "📂",
	dependencies: "📦",
	scripts: "📜",
	"config-files": "⚙️",
};

interface EvidenceBoardProps {
	categories: EvidenceCategory[];
	examinedCategories: EvidenceCategoryId[];
	caseNotes: CaseNote[];
	onSelectCategory: (categoryId: EvidenceCategoryId) => void;
	onStartDeduction: () => void;
	disabled?: boolean;
}

interface SelectItem {
	label: string;
	value: string;
}

export function EvidenceBoard({
	categories,
	examinedCategories,
	caseNotes,
	onSelectCategory,
	onStartDeduction,
	disabled = false,
}: EvidenceBoardProps): React.ReactElement {
	const { colors } = useTheme();

	const examinedCount = examinedCategories.length;
	const totalCount = categories.length;

	const selectableItems: SelectItem[] = categories
		.filter((c) => !examinedCategories.includes(c.id))
		.map((c) => {
			const categoryIndex = categories.findIndex((cat) => cat.id === c.id) + 1;
			const icon = CATEGORY_ICONS[c.id];
			return {
				label: `[${categoryIndex}] ${icon} ${c.title}`,
				value: c.id,
			};
		});

	selectableItems.push({
		label: "[D] Ready to make final deduction",
		value: "deduction",
	});

	const handleSelect = (item: SelectItem) => {
		if (disabled) return;
		if (item.value === "deduction") {
			onStartDeduction();
		} else {
			onSelectCategory(item.value as EvidenceCategoryId);
		}
	};

	useInput(
		(input) => {
			if (disabled) return;

			const upperInput = input.toUpperCase();
			if (upperInput === "D") {
				onStartDeduction();
				return;
			}

			const num = Number.parseInt(input, 10);
			if (num >= 1 && num <= categories.length) {
				const categoryId = categories[num - 1].id;
				if (!examinedCategories.includes(categoryId)) {
					onSelectCategory(categoryId);
				}
			}
		},
		{ isActive: !disabled },
	);

	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderColor={colors.primary}
			paddingX={2}
			paddingY={1}
		>
			<Box justifyContent="space-between">
				<Text bold color={colors.text}>
					EVIDENCE BOARD
				</Text>
				<Text color={colors.secondary}>
					Case Progress: {examinedCount}/{totalCount}
				</Text>
			</Box>

			<Text> </Text>

			<Box flexDirection="column">
				{categories.map((category, index) => {
					const isExamined = examinedCategories.includes(category.id);
					const icon = CATEGORY_ICONS[category.id];
					return (
						<CategoryRow
							key={category.id}
							number={index + 1}
							icon={icon}
							title={category.title}
							isExamined={isExamined}
						/>
					);
				})}
			</Box>

			<Text> </Text>
			<Divider />
			<Text> </Text>

			<CaseNotes notes={caseNotes} />

			<Text> </Text>
			<Divider />
			<Text> </Text>

			{disabled ? (
				<Text color={colors.muted}>[D] Ready to make final deduction</Text>
			) : (
				<SelectInput items={selectableItems} onSelect={handleSelect} />
			)}

			<Text> </Text>
			<Text color={colors.muted}>
				Press 1-{categories.length} to examine evidence, D for deduction
			</Text>
		</Box>
	);
}

interface CategoryRowProps {
	number: number;
	icon: string;
	title: string;
	isExamined: boolean;
}

function CategoryRow({
	number,
	icon,
	title,
	isExamined,
}: CategoryRowProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	return (
		<Box>
			<Text color={isExamined ? colors.muted : colors.text}>
				[{number}] {icon} {title}
			</Text>
			<Text>{"  "}</Text>
			{isExamined ? (
				<Text color={colors.primary} bold>
					{symbols.success} EXAMINED
				</Text>
			) : (
				<Text color={colors.muted}>{symbols.emptyCircle} Not examined</Text>
			)}
		</Box>
	);
}
