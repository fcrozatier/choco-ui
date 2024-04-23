import { updateElement } from "$lib/internal/helpers";
import type { Action } from "svelte/action";
import type { Booleanish } from "svelte/elements";

type TogglerOptions = Record<string, Booleanish | undefined>;
export type Toggler = ReturnType<typeof createToggler>;

export const createToggler = (initial?: TogglerOptions, onToggle?: (node: HTMLElement) => void) => {
	let state: TogglerOptions | undefined = $state(initial);
	let element: HTMLElement | undefined = $state();

	const toggle = () => {
		if (!state) return;

		for (const key in state) {
			const val = state[key];

			if (typeof val === "boolean") {
				state[key] = !state[key];
			} else if (typeof val === "string") {
				state[key] = `${val === "false"}`;
			}
		}

		if (onToggle && element) {
			onToggle(element);
		}
	};

	const update = () => {
		updateElement(element, state);
	};

	$effect(() => {
		console.log("toggler effect");
		// Initialize + keep node in sync after state change (click or programmatic)
		update();
	});

	const action = ((node) => {
		element = node;

		node.addEventListener("click", toggle);

		return {
			destroy() {
				node.removeEventListener("click", toggle);
			},
		};
	}) satisfies Action;

	return { action, toggle, update, state, node: element };
};
