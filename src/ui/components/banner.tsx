import figlet from "figlet";
import ansiShadow from "figlet/fonts/ANSI Shadow";
import { Text } from "ink";
import type React from "react";
import { useTheme } from "../theme.tsx";

figlet.parseFont("ANSI Shadow", ansiShadow);

interface BannerProps {
	text?: string;
}

export function Banner({
	text = "OnboardMe",
}: BannerProps): React.ReactElement {
	const { colors } = useTheme();
	const banner = figlet.textSync(text, { font: "ANSI Shadow" });

	return <Text color={colors.primary}>{banner}</Text>;
}
