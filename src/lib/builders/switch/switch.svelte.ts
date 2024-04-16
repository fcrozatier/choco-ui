import type { Action } from "svelte/action";
import type { ToggleElement } from "../toggle/press.svelte";
import { updateAttribute } from "$lib/internal/helpers";

export type CreateSwitch = {
	checked?: boolean;
};

const defaults = { checked: false } satisfies CreateSwitch;

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
	let state = $state({ ...defaults, ...options });
	let element: ToggleElement | undefined = $state();

	const handler = () => {
		state.checked = !state.checked;
	};

	$effect(() => {
		if (!element) return;
		if (element instanceof HTMLInputElement) {
			element.checked = state.checked;
		} else {
			updateAttribute(element, "aria-checked", state.checked);
		}
		updateAttribute(element, "data-checked", state.checked);
	});

	return {
		get state() {
			return state;
		},

		set state(newState: CreateSwitch) {
			state = { ...state, ...newState };
		},

		action: ((node) => {
			element = node;

			node.role = "switch";

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
