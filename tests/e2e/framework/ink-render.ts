import { EventEmitter } from "node:events";
import { render as inkRender } from "ink";
import type { ReactElement } from "react";

class MockStdout extends EventEmitter {
	readonly frames: string[] = [];
	private _lastFrame?: string;

	get columns(): number {
		return 100;
	}

	write = (frame: string): void => {
		this.frames.push(frame);
		this._lastFrame = frame;
	};

	lastFrame = (): string | undefined => this._lastFrame;
}

class MockStderr extends EventEmitter {
	readonly frames: string[] = [];
	private _lastFrame?: string;

	write = (frame: string): void => {
		this.frames.push(frame);
		this._lastFrame = frame;
	};

	lastFrame = (): string | undefined => this._lastFrame;
}

class MockStdin extends EventEmitter {
	isTTY = true;
	// biome-ignore lint/correctness/noUnusedPrivateClassMembers: used by read() method
	private data: string | null = null;

	write = (input: string): void => {
		this.data = input;
		this.emit("readable");
		this.emit("data", input);
	};

	setEncoding(): void {}
	setRawMode(): void {}
	resume(): void {}
	pause(): void {}
	ref(): void {}
	unref(): void {}

	read = (): string | null => {
		const { data } = this;
		this.data = null;
		return data;
	};
}

export interface RenderInstance {
	rerender: (tree: ReactElement) => void;
	unmount: () => void;
	cleanup: () => void;
	stdout: MockStdout;
	stderr: MockStderr;
	stdin: { write: (input: string) => void };
	frames: string[];
	lastFrame: () => string | undefined;
}

export function render(tree: ReactElement): RenderInstance {
	const stdout = new MockStdout();
	const stderr = new MockStderr();
	const stdin = new MockStdin();

	const instance = inkRender(tree, {
		stdout: stdout as unknown as NodeJS.WriteStream,
		stderr: stderr as unknown as NodeJS.WriteStream,
		stdin: stdin as unknown as NodeJS.ReadStream,
		debug: true,
		exitOnCtrlC: false,
		patchConsole: false,
	});

	return {
		rerender: instance.rerender,
		unmount: instance.unmount,
		cleanup: instance.cleanup,
		stdout,
		stderr,
		stdin,
		frames: stdout.frames,
		lastFrame: stdout.lastFrame,
	};
}
