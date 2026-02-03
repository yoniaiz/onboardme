export interface TemplateGame {
	id: string;
	options?: Record<string, unknown>;
}

export interface Template {
	games: TemplateGame[];
}

export interface ResolvedGame {
	id: string;
	position: number;
	name: string;
	description: string;
	estimatedMinutes: number;
	isBoss: boolean;
	ready: boolean;
}

export interface TemplateLoadResult {
	template: Template;
	source: "user" | "default";
}

export interface GameResolutionResult {
	success: boolean;
	games: ResolvedGame[];
	errors: string[];
}
