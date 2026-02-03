import { Box, Text } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";

interface FeedbackProps {
	children: React.ReactNode;
}

export function Success({ children }: FeedbackProps): React.ReactElement {
	const { colors, symbols } = useTheme();
	return (
		<Text>
			<Text color={colors.primary}>{symbols.success}</Text>{" "}
			<Text color={colors.primary}>{children}</Text>
		</Text>
	);
}

export function ErrorMessage({ children }: FeedbackProps): React.ReactElement {
	const { colors, symbols } = useTheme();
	return (
		<Text>
			<Text color={colors.error}>{symbols.error}</Text>{" "}
			<Text color={colors.error}>{children}</Text>
		</Text>
	);
}

export function Warning({ children }: FeedbackProps): React.ReactElement {
	const { colors, symbols } = useTheme();
	return (
		<Text>
			<Text color={colors.gold}>{symbols.warning}</Text>{" "}
			<Text color={colors.gold}>{children}</Text>
		</Text>
	);
}

interface StepProps {
	number: string;
	children: React.ReactNode;
}

export function Step({ number, children }: StepProps): React.ReactElement {
	const { symbols } = useTheme();
	return (
		<Box>
			<Text>
				{"  "}
				{symbols.arrow} {number}: {children}
			</Text>
		</Box>
	);
}

interface BulletProps {
	children: React.ReactNode;
}

export function Bullet({ children }: BulletProps): React.ReactElement {
	const { colors } = useTheme();
	return (
		<Box>
			<Text>
				{"  "}
				<Text color={colors.primary}>•</Text> {children}
			</Text>
		</Box>
	);
}
