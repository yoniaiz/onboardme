import figlet from "figlet";
import small from "figlet/fonts/Small";
import { colors } from "./theme.ts";

figlet.parseFont("Small", small);

export function printBanner(): void {
	const banner = figlet.textSync("OnboardMe", { font: "Small" });
	console.log(colors.primary(banner));
}
