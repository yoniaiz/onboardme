import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
	getDefaultTemplate,
	loadTemplate,
	resolveGameOrder,
} from "../../src/core/template.ts";
import type { Manifest } from "../../src/types/manifest.ts";
import type { Template } from "../../src/types/template.ts";

describe("getDefaultTemplate", () => {
	it("returns default template with 4 games", () => {
		const template = getDefaultTemplate();

		expect(template.games).toHaveLength(4);
		expect(template.games[0].id).toBe("file-detective");
		expect(template.games[1].id).toBe("flow-trace");
		expect(template.games[2].id).toBe("grep-hunt");
		expect(template.games[3].id).toBe("spaghetti-monster");
	});

	it("has boss game last", () => {
		const template = getDefaultTemplate();
		const lastGame = template.games[template.games.length - 1];

		expect(lastGame.id).toBe("spaghetti-monster");
	});
});

describe("loadTemplate", () => {
	let testDir: string;

	beforeEach(async () => {
		testDir = join(tmpdir(), `onboardme-template-test-${Date.now()}`);
		await mkdir(join(testDir, ".onboardme", "template"), { recursive: true });
	});

	afterEach(async () => {
		await rm(testDir, { recursive: true, force: true });
	});

	it("returns default template when file does not exist", async () => {
		const result = await loadTemplate(testDir);

		expect(result.source).toBe("default");
		expect(result.template.games).toHaveLength(4);
		expect(result.template.games[0].id).toBe("file-detective");
	});

	it("loads user template from file", async () => {
		const userTemplate: Template = {
			games: [{ id: "file-detective" }, { id: "spaghetti-monster" }],
		};

		await writeFile(
			join(testDir, ".onboardme", "template", "template.json"),
			JSON.stringify(userTemplate),
		);

		const result = await loadTemplate(testDir);

		expect(result.source).toBe("user");
		expect(result.template.games).toHaveLength(2);
		expect(result.template.games[0].id).toBe("file-detective");
		expect(result.template.games[1].id).toBe("spaghetti-monster");
	});

	it("returns default template when file read fails", async () => {
		await writeFile(
			join(testDir, ".onboardme", "template", "template.json"),
			"not valid json",
		);

		const result = await loadTemplate(testDir);

		expect(result.source).toBe("default");
		expect(result.template.games).toHaveLength(4);
	});

	it("returns default template when validation fails", async () => {
		await writeFile(
			join(testDir, ".onboardme", "template", "template.json"),
			JSON.stringify({ invalid: "data" }),
		);

		const result = await loadTemplate(testDir);

		expect(result.source).toBe("default");
		expect(result.template.games).toHaveLength(4);
	});

	it("loads template with game options", async () => {
		const userTemplate: Template = {
			games: [
				{ id: "file-detective", options: { difficulty: "hard" } },
				{ id: "spaghetti-monster" },
			],
		};

		await writeFile(
			join(testDir, ".onboardme", "template", "template.json"),
			JSON.stringify(userTemplate),
		);

		const result = await loadTemplate(testDir);

		expect(result.source).toBe("user");
		expect(result.template.games[0].options).toEqual({ difficulty: "hard" });
	});
});

describe("resolveGameOrder", () => {
	const createManifest = (gameIds: string[]): Manifest => ({
		version: "1.0.0",
		generatedAt: "2025-02-03T00:00:00Z",
		projectName: "test-project",
		games: gameIds.map((id) => ({
			id,
			name: `${id} game`,
			description: `Description for ${id}`,
			difficulty: "medium" as const,
			estimatedMinutes: 15,
			journeys: [
				{
					id: "journey-1",
					name: "Journey 1",
					entryPoint: "src/index.ts",
					checkpoints: ["checkpoint-1"],
				},
			],
			maxScore: 100,
		})),
	});

	it("resolves game order successfully", () => {
		const template: Template = {
			games: [{ id: "file-detective" }, { id: "flow-trace" }],
		};
		const manifest = createManifest(["file-detective", "flow-trace"]);

		const result = resolveGameOrder(template, manifest);

		expect(result.success).toBe(true);
		expect(result.errors).toHaveLength(0);
		expect(result.games).toHaveLength(2);
		expect(result.games[0].id).toBe("file-detective");
		expect(result.games[0].position).toBe(0);
		expect(result.games[1].id).toBe("flow-trace");
		expect(result.games[1].position).toBe(1);
	});

	it("includes full metadata from manifest", () => {
		const template: Template = {
			games: [{ id: "file-detective" }],
		};
		const manifest = createManifest(["file-detective"]);

		const result = resolveGameOrder(template, manifest);

		expect(result.games[0].name).toBe("file-detective game");
		expect(result.games[0].description).toBe("Description for file-detective");
		expect(result.games[0].estimatedMinutes).toBe(15);
		expect(result.games[0].ready).toBe(true);
		expect(result.games[0].isBoss).toBe(false);
	});

	it("marks boss game correctly", () => {
		const template: Template = {
			games: [{ id: "file-detective" }, { id: "spaghetti-monster" }],
		};
		const manifest = createManifest(["file-detective", "spaghetti-monster"]);

		const result = resolveGameOrder(template, manifest);

		expect(result.games[0].isBoss).toBe(false);
		expect(result.games[1].isBoss).toBe(true);
		expect(result.games[1].id).toBe("spaghetti-monster");
	});

	it("ensures boss game is positioned last", () => {
		const template: Template = {
			games: [
				{ id: "file-detective" },
				{ id: "flow-trace" },
				{ id: "spaghetti-monster" },
			],
		};
		const manifest = createManifest([
			"file-detective",
			"flow-trace",
			"spaghetti-monster",
		]);

		const result = resolveGameOrder(template, manifest);

		expect(result.success).toBe(true);
		const bossGame = result.games.find((g) => g.isBoss);
		expect(bossGame?.position).toBe(2);
		expect(result.games[result.games.length - 1].isBoss).toBe(true);
	});

	it("errors when boss game not in last position", () => {
		const template: Template = {
			games: [
				{ id: "spaghetti-monster" },
				{ id: "file-detective" },
				{ id: "flow-trace" },
			],
		};
		const manifest = createManifest([
			"spaghetti-monster",
			"file-detective",
			"flow-trace",
		]);

		const result = resolveGameOrder(template, manifest);

		expect(result.success).toBe(false);
		expect(result.errors).toContain(
			'Boss game "spaghetti-monster" must be last in template order',
		);
	});

	it("errors when template game not in manifest", () => {
		const template: Template = {
			games: [{ id: "file-detective" }, { id: "missing-game" }],
		};
		const manifest = createManifest(["file-detective"]);

		const result = resolveGameOrder(template, manifest);

		expect(result.success).toBe(false);
		expect(result.errors).toHaveLength(1);
		expect(result.errors[0]).toContain("missing-game");
		expect(result.errors[0]).toContain("not found in manifest");
	});

	it("returns partial results with errors", () => {
		const template: Template = {
			games: [
				{ id: "file-detective" },
				{ id: "missing-game" },
				{ id: "flow-trace" },
			],
		};
		const manifest = createManifest(["file-detective", "flow-trace"]);

		const result = resolveGameOrder(template, manifest);

		expect(result.success).toBe(false);
		expect(result.errors).toHaveLength(1);
		expect(result.games).toHaveLength(2);
		expect(result.games[0].id).toBe("file-detective");
		expect(result.games[1].id).toBe("flow-trace");
	});

	it("handles empty template", () => {
		const template: Template = {
			games: [],
		};
		const manifest = createManifest(["file-detective"]);

		const result = resolveGameOrder(template, manifest);

		expect(result.success).toBe(true);
		expect(result.games).toHaveLength(0);
		expect(result.errors).toHaveLength(0);
	});

	it("repositions boss game when mixed with other games", () => {
		const template: Template = {
			games: [
				{ id: "file-detective" },
				{ id: "flow-trace" },
				{ id: "grep-hunt" },
				{ id: "spaghetti-monster" },
			],
		};
		const manifest = createManifest([
			"file-detective",
			"flow-trace",
			"grep-hunt",
			"spaghetti-monster",
		]);

		const result = resolveGameOrder(template, manifest);

		expect(result.success).toBe(true);
		expect(result.games).toHaveLength(4);
		expect(result.games[0].position).toBe(0);
		expect(result.games[1].position).toBe(1);
		expect(result.games[2].position).toBe(2);
		expect(result.games[3].position).toBe(3);
		expect(result.games[3].isBoss).toBe(true);
	});
});
