import { Text } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";

interface StyledTextProps {
	children: React.ReactNode;
}

export function Title({ children }: StyledTextProps): React.ReactElement {
	const { colors } = useTheme();
	return (
		<Text bold color={colors.text}>
			{children}
		</Text>
	);
}

export function Muted({ children }: StyledTextProps): React.ReactElement {
	const { colors } = useTheme();
	return <Text color={colors.muted}>{children}</Text>;
}

export function Primary({ children }: StyledTextProps): React.ReactElement {
	const { colors } = useTheme();
	return <Text color={colors.primary}>{children}</Text>;
}
