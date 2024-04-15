import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

type TriState = boolean | "mixed" | undefined;

export type ToggleElement = HTMLButtonElement | HTMLInputElement | undefined;

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
	let element: ToggleElement = $state();

	const handler = (e: Event) => {
		if (e instanceof KeyboardEvent) {
			if (e.key !== key.ENTER && e.key !== key.SPACE) return;
			// Prevent triggering the synthetic click event on input elements
			e.preventDefault();
		}
		state.pressed = !state.pressed;
	};

	$effect(() => {
		if (!element) return;
		if (element instanceof HTMLInputElement) {
			element.checked = state.pressed === true;
			element.indeterminate = state.pressed === "mixed";
		} else {
			element.ariaPressed = String(state.pressed);
		}
		element.dataset.pressed = String(state.pressed);
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

			node.addEventListener("click", handler);
			node.addEventListener("keydown", handler);

			return {
				destroy() {
					node.removeEventListener("click", handler);
					node.removeEventListener("keydown", handler);
				},
			};
		}) satisfies Action<NonNullable<ToggleElement>>,

		options,

		get element() {
			return element;
		},
	};
};
