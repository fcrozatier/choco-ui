import type { Booleanish } from "svelte/elements";

/**
 * Mutates all values in place
 */
export const toggleValues = (state: Record<string, Booleanish>) => {
	for (const key in state) {
		const val = state[key];

		if (typeof val === "boolean") {
			state[key] = !state[key];
		} else if (typeof val === "string") {
			state[key] = `${val === "false"}`;
		}
	}
	return state;
};
