import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

/**
 * Convenience simple toggle functionality with no aria semantics
 *
 * Use this if you need to change the label with state changes.
 *
 */
export const createSimpleToggle = (options?: { pressed?: boolean }) => {
	let pressed: boolean = $state(options?.pressed ?? false);

	const handleClick = () => {
		pressed = !pressed;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === key.ENTER || e.key === key.SPACE) handleClick();
	};

	return {
		get checked() {
			return pressed;
		},

		set checked(newVal) {
			pressed = newVal;
		},

		action: ((node) => {
			if (!(node instanceof HTMLButtonElement)) {
				node.setAttribute("role", "button");
			}

			node.addEventListener("click", handleClick);
			node.addEventListener("keydown", handleKeydown);

			return {
				destroy() {
					node.removeEventListener("click", handleClick);
					node.removeEventListener("keydown", handleKeydown);
				},
			};
		}) satisfies Action,
	};
};
