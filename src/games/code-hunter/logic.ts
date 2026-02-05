import type { CodeHunterConfig } from "./types";

export function getCodeHunterLogic(config: CodeHunterConfig) {
  return {
    getCode: (id: string) => {
      return config.code.find((code) => code.id === id)?.code;
    },
  };
}
