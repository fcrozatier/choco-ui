import type { Action } from "svelte/action";
import { createToggler, type Toggler } from "../toggler/toggler.svelte";
import { role } from "$lib/utils/roles";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

export type ToggleElement = HTMLButtonElement | HTMLInputElement;

export type CreateToggle = {
	/**
	 * Whether the toggle is currently pressed or not. Defaults to `false`
	 */
	pressed?: boolean;
	/**
	 * Whether the toggle is a press toggle or a switch toggle. Defaults to `press`
	 */
	type?: "press" | "switch";
};
export type Toggle = ReturnType<typeof createToggle>;

const defaults = { pressed: false, type: "press" } satisfies CreateToggle;

/**
 * ## Toggle
 *
 * Use on button or input elements.
 *
 * Semantics:
 * - pressed or not pressed (press toggle)
 * - on or off (switch toggle)
 *
 * The label should not change when the state changes. Use `simpleToggle` if needed.
 *
 * Refs:
 *
 * [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role#all_descendants_are_presentational
 */
export const createToggle = (options?: CreateToggle) => {
	const type = options?.type ?? defaults.type;

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

			if (type === "switch") {
				node.role = role.switch;
			}

			if (node instanceof HTMLInputElement) {
				node.type = "checkbox";
				toggler = createToggler({ checked: pressed }, handler);
			} else if (node instanceof HTMLButtonElement) {
				node.type = "button";

				toggler =
					type === "switch"
						? createToggler({ "aria-checked": `${pressed}` }, handler)
						: createToggler({ "aria-pressed": `${pressed}` }, handler);
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
