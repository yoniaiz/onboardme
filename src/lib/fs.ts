import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function readJson<T>(filePath: string): Promise<T | null> {
	if (!existsSync(filePath)) {
		return null;
	}
	const content = await readFile(filePath, "utf-8");
	return JSON.parse(content) as T;
}

export async function writeJson<T>(filePath: string, data: T): Promise<void> {
	await ensureDir(dirname(filePath));
	await writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function ensureDir(dirPath: string): Promise<void> {
	await mkdir(dirPath, { recursive: true });
}

export async function writeTextFile(
	filePath: string,
	content: string,
): Promise<void> {
	await ensureDir(dirname(filePath));
	await writeFile(filePath, content);
}

export function fileExists(filePath: string): boolean {
	return existsSync(filePath);
}

export function dirExists(dirPath: string): boolean {
	return existsSync(dirPath);
}
