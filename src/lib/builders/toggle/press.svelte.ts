import { updateAttribute } from "$lib/internal/helpers";
import type { Action } from "svelte/action";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

type TriState = boolean | "mixed" | undefined;

export type ToggleElement = HTMLButtonElement | HTMLInputElement;

export type CreateToggle = { pressed?: TriState };

const defaults = { pressed: false } satisfies CreateToggle;

/**
 * ## Toggle
 *
 * Use on button or input elements.
 *
 * Semantics: pressed, not pressed or partially pressed ("mixed" state)
 *
 * The label should not change when the state changes. Use `simpleToggle` if needed.
 */
export const createPressToggle = (options?: CreateToggle) => {
	let state = $state({ ...defaults, ...options });
	let element: ToggleElement | undefined = $state();

	const handler = () => {
		state.pressed = !state.pressed;
	};

	$effect(() => {
		if (!element) return;
		if (element instanceof HTMLInputElement) {
			element.checked = state.pressed === true;
			element.indeterminate = state.pressed === "mixed";
		} else {
			updateAttribute(element, "aria-pressed", state.pressed);
		}
		updateAttribute(element, "data-pressed", state.pressed);
	});

	return {
		get state() {
			return state;
		},

		set state(newState: CreateToggle) {
			state = { ...state, ...newState };
		},

		action: ((node) => {
			element = node;

			if (node instanceof HTMLInputElement) {
				node.type = "checkbox";
			}

			node.addEventListener("click", handler);

			return {
				destroy() {
					node.removeEventListener("click", handler);
				},
			};
		}) satisfies Action<ToggleElement>,

		options,

		get element() {
			return element;
		},
	};
};
