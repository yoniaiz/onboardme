export const ExitCode = {
	Success: 0,
	GeneralError: 1,
	InvalidArguments: 2,
	NotInitialized: 3,
	ValidationFailed: 4,
	GameError: 5,
} as const;

export type ExitCodeValue = (typeof ExitCode)[keyof typeof ExitCode];

export class OnboardMeError extends Error {
	constructor(
		message: string,
		public readonly code: ExitCodeValue = ExitCode.GeneralError,
		public readonly suggestion?: string,
	) {
		super(message);
		this.name = "OnboardMeError";
	}
}

export class NotInitializedError extends OnboardMeError {
	constructor(
		message = "OnboardMe is not initialized in this directory",
		suggestion = "Run 'onboardme init' to initialize",
	) {
		super(message, ExitCode.NotInitialized, suggestion);
		this.name = "NotInitializedError";
	}
}
