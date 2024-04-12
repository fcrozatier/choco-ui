import { updateAttribute, updateBooleanAttribute } from "$lib/internal/helpers";
import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

type TriState = boolean | "mixed" | undefined;

export type CreateToggle = { pressed?: TriState; disabled?: boolean | undefined | null };

const defaults = { pressed: false, disabled: false } satisfies CreateToggle;

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
	let element: HTMLElement | undefined = $state();

	const handler = (e: MouseEvent | KeyboardEvent) => {
		if (state.disabled) return;
		if (e instanceof KeyboardEvent) {
			if (e.key !== key.ENTER && e.key !== key.SPACE) return;
			// Prevent triggering the synthetic click event on input elements
			else e.preventDefault();
		}
		state.pressed = !state.pressed;
	};

	const cleanup = $effect.root(() => {
		$effect(() => {
			if (element instanceof HTMLInputElement) {
				updateBooleanAttribute(element, "checked", state.pressed === true);
				updateBooleanAttribute(element, "indeterminate", state.pressed === "mixed");
			}
			updateAttribute(element, "aria-pressed", state.pressed);
			updateBooleanAttribute(element, "disabled", state.disabled);
		});
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
				node.setAttribute("type", "checkbox");
				updateBooleanAttribute(element, "checked", state.pressed === true);
				updateBooleanAttribute(element, "indeterminate", state.pressed === "mixed");
			}

			updateAttribute(element, "aria-pressed", state.pressed);
			updateBooleanAttribute(element, "disabled", state.disabled);

			node.addEventListener("click", handler);
			node.addEventListener("keydown", handler);

			return {
				destroy() {
					node.removeEventListener("click", handler);
					node.removeEventListener("keydown", handler);
					cleanup();
				},
			};
		}) satisfies Action,

		options,

		get element() {
			return element;
		},
	};
};
