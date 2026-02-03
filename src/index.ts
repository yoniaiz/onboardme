#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { initCommand } from "@/commands/init.tsx";
import { startCommand } from "@/commands/start.tsx";
import { statusCommand } from "@/commands/status.tsx";
import { validateCommand } from "@/commands/validate.ts";
import { ExitCode, type OnboardMeError } from "@/lib/errors.ts";
import { theme } from "@/ui/theme.tsx";
import packageJson from "../package.json";

const { colors, symbols } = theme;

const program = new Command();

program
	.name("onboardme")
	.description(
		chalk.hex(colors.primary)("Gamified CLI for codebase onboarding"),
	)
	.version(packageJson.version, "-v, --version", "Show version number")
	.helpOption("-h, --help", "Show help");

program
	.command("init")
	.description("Initialize OnboardMe in current repository")
	.action(async () => {
		await runCommand(initCommand);
	});

program
	.command("start")
	.description("Start the onboarding game")
	.action(async () => {
		await runCommand(startCommand);
	});

program
	.command("status")
	.description("Show current progress")
	.action(async () => {
		await runCommand(statusCommand);
	});

program
	.command("validate")
	.description("Validate prepared game data (JSON output for AI)")
	.action(async () => {
		await runCommand(validateCommand);
	});

async function runCommand(command: () => Promise<number>): Promise<void> {
	try {
		const exitCode = await command();
		process.exit(exitCode);
	} catch (error) {
		if (isOnboardMeError(error)) {
			console.error(
				`${chalk.hex(colors.error)(symbols.error)} ${chalk.hex(colors.error)(error.message)}`,
			);
			if (error.suggestion) {
				console.error(
					`\n  ${chalk.hex(colors.muted)("To fix:")} ${error.suggestion}`,
				);
			}
			process.exit(error.code);
		}
		console.error(
			`${chalk.hex(colors.error)(symbols.error)} ${chalk.hex(colors.error)("An unexpected error occurred")}`,
		);
		console.error(chalk.hex(colors.muted)(String(error)));
		process.exit(ExitCode.GeneralError);
	}
}

function isOnboardMeError(error: unknown): error is OnboardMeError {
	return error instanceof Error && "code" in error && "suggestion" in error;
}

program.parse();
