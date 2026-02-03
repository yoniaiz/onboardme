import { Box, Text } from "ink";
import type React from "react";
import type { CaseNote } from "@/games/file-detective/types.ts";
import { useTheme } from "../theme.tsx";

interface CaseNotesProps {
	notes: CaseNote[];
}

export function CaseNotes({ notes }: CaseNotesProps): React.ReactElement {
	const { colors, symbols } = useTheme();

	return (
		<Box flexDirection="column">
			<Text bold color={colors.text}>
				CASE NOTES:
			</Text>
			{notes.length === 0 ? (
				<Text color={colors.muted}>{symbols.bullet} (none yet)</Text>
			) : (
				notes.map((note) => (
					<Text key={note.id} color={colors.text}>
						{symbols.bullet} {note.text}
					</Text>
				))
			)}
		</Box>
	);
}
