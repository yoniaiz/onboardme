import { Box, Text } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";

type BoxVariant = "primary" | "warning" | "error";

interface StyledBoxProps {
	children: React.ReactNode;
	variant?: BoxVariant;
	title?: string;
}

export function RoundedBox({
	children,
	variant = "primary",
	title,
}: StyledBoxProps): React.ReactElement {
	const { colors } = useTheme();

	const borderColors: Record<BoxVariant, string> = {
		primary: colors.primary,
		warning: colors.gold,
		error: colors.error,
	};

	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderColor={borderColors[variant]}
			paddingX={2}
			paddingY={1}
		>
			{title && (
				<Text bold color={colors.text}>
					{title}
				</Text>
			)}
			{title && <Text> </Text>}
			{children}
		</Box>
	);
}

interface LabeledValueProps {
	label: string;
	children: React.ReactNode;
}

export function LabeledValue({
	label,
	children,
}: LabeledValueProps): React.ReactElement {
	const { colors } = useTheme();
	return (
		<Text>
			<Text color={colors.muted}>{label}:</Text> {children}
		</Text>
	);
}
