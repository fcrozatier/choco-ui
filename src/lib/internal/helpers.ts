import type { AriaAttributes, Booleanish, HTMLAttributes } from "svelte/elements";

export function updateBooleanAttribute(
	element: HTMLElement | undefined,
	attribute: string & NonNullable<unknown>,
	value: Booleanish | undefined | null,
) {
	if (value === true || value === "true") {
		element?.setAttribute(attribute, "");
	} else {
		element?.removeAttribute(attribute);
	}
}

export function updateAttribute<T extends HTMLElement>(
	element: T | undefined,
	attribute: keyof AriaAttributes | keyof HTMLAttributes<T> | (string & NonNullable<unknown>),
	value: string | number | boolean | undefined,
) {
	if (value !== undefined) {
		element?.setAttribute(attribute, String(value));
	} else {
		element?.removeAttribute(attribute);
	}
}

export const updateElement = (
	node: HTMLElement | undefined,
	state: Record<string, Booleanish | undefined> | undefined,
) => {
	if (!node || !state) return;
	for (const key in state) {
		const val = state[key];
		if (typeof val === "string") {
			updateAttribute(node, key, val);
		} else if (typeof val === "boolean") {
			updateBooleanAttribute(node, key, val);
		} else {
			node.removeAttribute(key);
		}
	}
};

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
