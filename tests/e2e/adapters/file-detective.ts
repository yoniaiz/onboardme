import React from "react";
import { DEDUCTION_OPTION_TEXT } from "@/core/constants.ts";
import type { GameEngine } from "@/core/engine.ts";
import { FileDetective } from "@/games/file-detective/index.ts";
import type {
	FileDetectiveConfig,
	InvestigationState,
} from "@/games/file-detective/types.ts";
import { FileDetectiveUI } from "@/ui/screens/file-detective-game.tsx";
import type {
	GameAdapter,
	GameCallbacks,
	GameRenderProps,
} from "../framework/types.ts";

interface FileDetectiveState {
	investigationState: InvestigationState;
	config: FileDetectiveConfig;
}

function getFileDetectivePlugin(engine: GameEngine): FileDetective | null {
	const plugin = engine.getCurrentPlugin();
	return plugin instanceof FileDetective ? plugin : null;
}

export const fileDetectiveAdapter: GameAdapter<FileDetectiveState> = {
	extractState(engine: GameEngine): FileDetectiveState | null {
		const plugin = getFileDetectivePlugin(engine);
		if (!plugin) return null;

		const investigationState = plugin.getInvestigationState();
		const config = plugin.getConfig();

		return { investigationState, config };
	},

	createCallbacks(
		submitAnswer: (answer: string) => Promise<void>,
		getState: () => FileDetectiveState | null,
	): GameCallbacks & {
		onSelectCategory: (categoryId: string) => void;
		onStartDeduction: () => void;
		onDeductionSelect: (optionId: string) => void;
	} {
		return {
			onSubmitAnswer: submitAnswer,

			onSelectCategory: (categoryId: string) => {
				const state = getState();
				if (!state) return;

				const category = state.config.evidence.find((c) => c.id === categoryId);
				if (category) {
					submitAnswer(category.title);
				}
			},

			onStartDeduction: () => {
				submitAnswer(DEDUCTION_OPTION_TEXT);
			},

			onDeductionSelect: (optionId: string) => {
				const state = getState();
				if (!state) return;

				const option = state.config.deduction.options.find(
					(o) => o.id === optionId,
				);
				if (option) {
					submitAnswer(option.label);
				}
			},
		};
	},

	render(
		props: GameRenderProps<FileDetectiveState>,
	): React.ReactElement | null {
		const { state, currentQuestion, lastResult, wrongAnswers, disabled } =
			props;

		const extendedCallbacks = props.callbacks as GameCallbacks & {
			onSelectCategory: (categoryId: string) => void;
			onStartDeduction: () => void;
			onDeductionSelect: (optionId: string) => void;
		};

		return React.createElement(FileDetectiveUI, {
			investigationState: state.investigationState,
			config: state.config,
			currentQuestion,
			lastResult,
			wrongAnswers,
			disabled,
			onSelectCategory: extendedCallbacks.onSelectCategory,
			onStartDeduction: extendedCallbacks.onStartDeduction,
			onDeductionSelect: extendedCallbacks.onDeductionSelect,
			onSubmitAnswer: extendedCallbacks.onSubmitAnswer,
		});
	},
};
