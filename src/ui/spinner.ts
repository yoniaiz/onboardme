import ora, { type Ora } from "ora";
import { colors } from "./theme.ts";

function createSpinner(text: string): Ora {
	return ora({
		text: colors.muted(text),
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
