import type { Booleanish } from "svelte/elements";

/**
 * Impure function for toggling Booleanish values
 */
export const toggleValues = (state?: Record<string, Booleanish>) => {
	if (!state) return;

	for (const key of Object.keys(state)) {
		const val = state[key];

		if (typeof val === "boolean") {
			state[key] = !val;
		} else if (typeof val === "string") {
			state[key] = `${val === "false"}`;
		}
	}
};
