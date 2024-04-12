import { updateAttribute, updateBooleanAttribute } from "$lib/internal/helpers";
import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

type TriState = boolean | "mixed" | undefined;

export type CreateToggle = { pressed?: TriState; disabled?: boolean | undefined | null };

const defaults = { pressed: false, disabled: false } satisfies CreateToggle;

/**
 * Toggle button
 *
 * Semantics: pressed, not pressed, partially pressed ("mixed" state) or unset
 *
 * The label should not change when the state changes. Use `simpleToggle` if needed.
 */
export const createPressToggle = (options?: CreateToggle) => {
	let state = $state({ ...defaults, ...options });
	let element: HTMLElement | undefined = $state();

	const handleClick = () => {
		if (state.disabled) return;
		state.pressed = !state.pressed;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === key.ENTER || e.key === key.SPACE) {
			// Avoid firing a synthetic click event when pressing Space on button (over-firing)
			e.preventDefault();
			handleClick();
		}
	};

	const cleanup = $effect.root(() => {
		$effect(() => {
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

			updateAttribute(element, "aria-pressed", state.pressed);
			updateBooleanAttribute(element, "disabled", state.disabled);

			node.addEventListener("click", handleClick);
			node.addEventListener("keydown", handleKeydown);

			return {
				destroy() {
					node.removeEventListener("click", handleClick);
					node.removeEventListener("keydown", handleKeydown);
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
