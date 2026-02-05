import type { CodeHunterConfig } from "./types";

export const defaultConfig: CodeHunterConfig = {
  code: [
    {
      id: "code-1",
      code: "console.log('Hello, world1!');",
    },
    {
      id: "code-2",
      code: "console.log('Hello, world2!');",
    },
    {
      id: "code-3",
      code: "console.log('Hello, world3!');",
    },
  ],
};
