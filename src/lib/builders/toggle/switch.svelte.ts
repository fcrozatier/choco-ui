import { key } from "$lib/utils/keyboard";

import type { Action } from "svelte/action";

/**
 * Switch Toggle
 *
 * The label should not change when the state changes. Use `simpleToggle` if needed
 *
 * Semantics: on or off
 *
 * All descendants of an element with role `switch` have role `presentation`
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role#all_descendants_are_presentational
 *
 */
export const createSwitchToggle = (options?: { checked?: boolean }) => {
	let checked: boolean = $state(options?.checked ?? false);
	let element: HTMLElement | undefined;

	const handleClick = () => {
		checked = !checked;
		updateAttributes();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === key.ENTER || e.key === key.SPACE) handleClick();
	};

	const updateAttributes = () => {
		if (element instanceof HTMLInputElement) {
			element?.setAttribute("checked", String(checked));
		} else {
			element?.setAttribute("aria-checked", String(checked));
		}
	};

	return {
		get checked() {
			return checked;
		},

		set checked(newVal) {
			checked = newVal;
			updateAttributes();
		},

		action: ((node) => {
			element = node;
			node.setAttribute("role", "switch");

			if (node instanceof HTMLInputElement) {
				node.setAttribute("type", "checkbox");
				node.setAttribute("checked", String(checked));
			} else {
				node.setAttribute("aria-checked", String(checked));
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
