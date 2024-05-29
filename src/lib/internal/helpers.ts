import type { Booleanish } from "svelte/elements";

/**
 * Pure function for toggling Booleanish values
 */
export const toggleValues = (state: Record<string, Booleanish>) => {
	const newState: Record<string, Booleanish> = {};

	for (const key of Object.keys(state)) {
		const val = state[key];

		if (typeof val === "boolean") {
			newState[key] = !val;
		} else if (typeof val === "string") {
			newState[key] = `${val === "false"}`;
		}
	}
	return newState;
};
