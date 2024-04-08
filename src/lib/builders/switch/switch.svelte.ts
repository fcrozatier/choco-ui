import { updateAttribute, updateBooleanAttribute } from "$lib/internal/helpers";
import { key } from "$lib/utils/keyboard";

import type { Action } from "svelte/action";

export type CreateSwitch = {
	checked?: boolean;
	disabled?: boolean | undefined | null;
};

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
export const createSwitchToggle = (options?: CreateSwitch) => {
	let checked: boolean = $state(options?.checked ?? false);
	let disabled: boolean = $state(options?.disabled ?? false);
	let element: HTMLElement | undefined;

	const handleClick = () => {
		if (disabled) return;
		checked = !checked;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === key.ENTER || e.key === key.SPACE) handleClick();
	};

	const cleanup = $effect.root(() => {
		$effect(() => {
			if (element instanceof HTMLInputElement) {
				updateAttribute(element, "checked", checked);
			} else {
				updateAttribute(element, "aria-checked", checked);
			}
			updateBooleanAttribute(element, "disabled", disabled);
		});
	});

	return {
		state: {
			get checked() {
				return checked;
			},

			set checked(newVal) {
				checked = newVal;
			},

			get disabled() {
				return disabled;
			},

			set disabled(v) {
				disabled = v;
			},
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
					cleanup();
				},
			};
		}) satisfies Action,

		options,
	};
};
