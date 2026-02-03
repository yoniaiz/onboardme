import type { GamePluginSchema } from "@/core/types.ts";

export const schema: GamePluginSchema = {
	id: "file-detective",
	name: "file --detective",
	description: "Investigate a codebase to identify its project type and stack",
	estimatedTime: 10,
	requiredContext: [
		{
			key: "projectType",
			source: "meta.json",
			schema: {
				type: "object",
				properties: {
					projectType: { type: "string" },
					language: { type: "string" },
					framework: { type: "string" },
					architecture: { type: "string" },
				},
				required: ["projectType", "language", "framework"],
			},
		},
		{
			key: "evidence",
			source: "structure.json",
			schema: {
				type: "array",
				items: {
					type: "object",
					properties: {
						id: { type: "string" },
						title: { type: "string" },
						description: { type: "string" },
						questions: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									prompt: { type: "string" },
									options: { type: "array", items: { type: "string" } },
								},
								required: ["id", "prompt"],
							},
						},
					},
					required: ["id", "title", "description", "questions"],
				},
			},
		},
		{
			key: "deduction",
			source: "meta.json",
			schema: {
				type: "object",
				properties: {
					prompt: { type: "string" },
					options: {
						type: "array",
						items: {
							type: "object",
							properties: {
								id: { type: "string" },
								label: { type: "string" },
								matches: {
									type: "object",
									properties: {
										projectType: { type: "string" },
										language: { type: "string" },
										framework: { type: "string" },
										architecture: { type: "string" },
									},
									required: ["projectType", "language", "framework"],
								},
							},
							required: ["id", "label", "matches"],
						},
					},
					correctId: { type: "string" },
				},
				required: ["prompt", "options", "correctId"],
			},
		},
	],
};
