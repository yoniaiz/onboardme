import chalk from "chalk";

export const colors = {
	primary: chalk.cyan,
	success: chalk.green,
	warning: chalk.yellow,
	error: chalk.red,
	muted: chalk.gray,
	highlight: chalk.bold.white,
	info: chalk.blue,
};

export const symbols = {
	success: chalk.green("✓"),
	error: chalk.red("✗"),
	warning: chalk.yellow("⚠"),
	info: chalk.blue("ℹ"),
	arrow: chalk.cyan("→"),
	bullet: chalk.gray("•"),
	star: chalk.yellow("★"),
};

export function formatTitle(text: string): string {
	return colors.highlight(text);
}

export function formatSuccess(text: string): string {
	return `${symbols.success} ${colors.success(text)}`;
}

export function formatError(text: string): string {
	return `${symbols.error} ${colors.error(text)}`;
}

export function formatWarning(text: string): string {
	return `${symbols.warning} ${colors.warning(text)}`;
}

export function formatMuted(text: string): string {
	return colors.muted(text);
}

export function formatStep(step: string, description: string): string {
	return `  ${symbols.arrow} ${colors.primary(step)}: ${description}`;
}
