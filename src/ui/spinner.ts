import chalk from "chalk";
import ora, { type Ora } from "ora";
import { theme } from "./theme.tsx";

function createSpinner(text: string): Ora {
	return ora({
		text: chalk.hex(theme.colors.muted)(text),
		spinner: "dots",
	});
}

export async function withSpinner<T>(
	text: string,
	fn: () => Promise<T>,
): Promise<T> {
	const spinner = createSpinner(text);
	spinner.start();
	try {
		const result = await fn();
		spinner.succeed();
		return result;
	} catch (error) {
		spinner.fail();
		throw error;
	}
}
