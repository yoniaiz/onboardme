import { colors } from "./theme.ts";

const BANNER = `
   ___       _                      _ __  __
  / _ \\ _ _ | |__  ___  __ _ _ _ __| |  \\/  |___
 | (_) | ' \\| '_ \\/ _ \\/ _\` | '_/ _\` | |\\/| / -_)
  \\___/|_||_|_.__/\\___/\\__,_|_| \\__,_|_|  |_\\___|
`;

export function printBanner(): void {
	console.log(colors.primary(BANNER));
}
