import type { Action } from "svelte/action";
import { createToggler, type Toggler } from "../toggler/toggler.svelte";
import { role } from "$lib/utils/roles";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

export type ToggleElement = HTMLButtonElement | HTMLInputElement;

export type ToggleOptions = {
	/**
	 * Whether the toggle is currently pressed or not. Defaults to `false`
	 */
	pressed?: boolean;
	/**
	 * Whether the toggle is a press toggle or a switch toggle. Defaults to `press`
	 */
	kind?: "press" | "switch";
};
export type Toggle = ReturnType<typeof createToggle>;

const defaults = { pressed: false, kind: "press" } satisfies ToggleOptions;

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
 * All descendants of a `switch` have role `presentation`
 *
 * Refs:
 *
 * [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 *
 * [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role#all_descendants_are_presentational
 */
export const createToggle = (options?: ToggleOptions) => {
	const type = options?.kind ?? defaults.kind;
	const initialPressedState = options?.pressed ?? defaults.pressed;

	let element: ToggleElement | undefined = $state();
	let toggler: Toggler | undefined = $state();

	return {
		get element() {
			return element;
		},

		get pressed() {
			return toggler?.active;
		},

		set pressed(v) {
			if (toggler?.active !== v) {
				toggler?.toggle();
			}
		},

		get toggler() {
			return toggler;
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
				toggler = createToggler({
					control: { checked: initialPressedState },
				});
			} else if (node instanceof HTMLButtonElement) {
				node.type = "button";

				toggler =
					type === "switch"
						? createToggler({
								control: { "aria-checked": `${initialPressedState}` },
							})
						: createToggler({
								control: { "aria-pressed": `${initialPressedState}` },
							});
			}
			const cleanup = toggler?.control(node);

			return {
				destroy() {
					cleanup?.destroy();
				},
			};
		}) satisfies Action<ToggleElement>,
	};
};
