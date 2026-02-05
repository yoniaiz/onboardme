import { Box, Text, useInput } from "ink";
import SelectInput from "ink-select-input";
import type React from "react";
import type {
	CaseNote,
	EvidenceCategory,
	EvidenceCategoryId,
} from "@/games/file-detective/types.ts";
import { useTheme } from "../theme.tsx";
import { CaseNotes } from "./case-notes.tsx";
import { Divider } from "./divider.tsx";

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
	const { colors, symbols } = useTheme();

	const examinedCount = examinedCategories.length;
	const totalCount = categories.length;

	const allEvidenceCollected = examinedCount === totalCount;

	const selectableItems: SelectItem[] = categories
		.filter((c) => !examinedCategories.includes(c.id))
		.map((c) => {
			const categoryIndex = categories.findIndex((cat) => cat.id === c.id) + 1;
			const icon = CATEGORY_ICONS[c.id];
			return {
				label: `[${categoryIndex}] ${icon} ${c.title} — ${c.description}`,
				value: c.id,
			};
		});

	if (allEvidenceCollected) {
		selectableItems.push({
			label: "[D] Ready to make final deduction",
			value: "deduction",
		});
	}

	const handleSelect = (item: SelectItem) => {
		if (disabled) return;
		if (item.value === "deduction") {
			if (allEvidenceCollected) {
				onStartDeduction();
			}
		} else {
			onSelectCategory(item.value as EvidenceCategoryId);
		}
	};

	useInput(
		(input) => {
			if (disabled) return;

			const upperInput = input.toUpperCase();
			if (upperInput === "D" && allEvidenceCollected) {
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

	const examinedItems = categories.filter((c) =>
		examinedCategories.includes(c.id),
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

			<CaseNotes notes={caseNotes} />

			<Text> </Text>
			<Divider />
			<Text> </Text>

			{examinedItems.length > 0 && (
				<Box flexDirection="column" marginBottom={1}>
					{examinedItems.map((c) => {
						const categoryIndex =
							categories.findIndex((cat) => cat.id === c.id) + 1;
						const icon = CATEGORY_ICONS[c.id];
						return (
							<Text key={c.id} color={colors.muted}>
								[{categoryIndex}] {icon} {c.title} — {c.description}{" "}
								<Text color={colors.primary}>{symbols.success}</Text>
							</Text>
						);
					})}
				</Box>
			)}

			{disabled ? (
				<Box flexDirection="column">
					{selectableItems.map((item) => (
						<Text key={item.value} color={colors.muted}>
							{item.label}
						</Text>
					))}
				</Box>
			) : (
				<SelectInput items={selectableItems} onSelect={handleSelect} />
			)}

			<Text> </Text>
			<Text bold color={colors.secondary}>
				What would you like to examine?
			</Text>
			<Text> </Text>
			<Text color={colors.muted}>
				Use arrows + Enter to select, or press 1-{categories.length}
				{allEvidenceCollected ? " / D for deduction" : ""}
			</Text>
		</Box>
	);
}
