import type { Action } from "svelte/action";
import { createToggler, type Toggler } from "../toggler/toggler.svelte";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

export type ToggleElement = HTMLButtonElement | HTMLInputElement;

export type CreateToggle = { pressed?: boolean };
export type Toggle = ReturnType<typeof createToggle>;

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
export const createToggle = (options?: CreateToggle) => {
	let pressed = $state(options?.pressed ?? defaults.pressed);
	let element: ToggleElement | undefined = $state();
	let toggler: Toggler | undefined;

	const handler = () => {
		pressed = !pressed;
	};

	return {
		get element() {
			return element;
		},

		get pressed() {
			return pressed;
		},

		set pressed(v) {
			if (pressed !== v) {
				toggler?.toggle();
			}
		},

		toggle: () => {
			toggler?.toggle();
		},

		action: ((node) => {
			element = node;

			if (node instanceof HTMLInputElement) {
				node.type = "checkbox";
				toggler = createToggler({ checked: pressed }, handler);
			} else if (node instanceof HTMLButtonElement) {
				node.type = "button";
				toggler = createToggler({ "aria-pressed": `${pressed}` }, handler);
			}
			const cleanup = toggler?.action(node);

			return {
				destroy() {
					cleanup?.destroy();
				},
			};
		}) satisfies Action<ToggleElement>,
	};
};
