import type { Action } from "svelte/action";
import { combineActions } from "$lib/utils/runes.svelte";
import { createSwitchToggle, type CreateSwitch } from "../switch/switch.svelte";
import type { ToggleElement } from "../toggle/toggle.svelte";
import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";

export type CreateSwitchGroup = {
	focus?: ManageFocusOptions;
	/**
	 * Whether only one input of the group can be on at a time
	 */
	single?: boolean;
};

export type CreateSwitchGroupItem = typeof createSwitchToggle;
type SwitchGroupItem = ReturnType<typeof createSwitchToggle>;

const defaults = {
	single: false,
} satisfies CreateSwitchGroup;

/**
 * Switch Group
 *
 * If you use radio buttons then this feature is for free.
 *
 * [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 */
export const createSwitchGroup = (options?: CreateSwitchGroup) => {
	const state = $state({ ...defaults, ...options });
	const items: SwitchGroupItem[] = $state([]);

	const focusGroup = manageFocus(state.focus);

	let root: HTMLFieldSetElement | undefined = $state();
	let selected = $derived(
		items
			.filter((item) => item.state.checked === true)
			.map((item) => (item.element as ToggleElement).value),
	);

	const handleClick = (e: Event) => {
		const target = e.currentTarget as ToggleElement;

		if (state.single === true) {
			items.forEach((item) => {
				if (item.element !== target) {
					item.state.checked = false;
				}
			});
		}
	};

	const createItem = (options?: CreateSwitch) => {
		const item = createSwitchToggle({ ...options });

		const action = ((node) => {
			items.push(item);

			if (node instanceof HTMLInputElement) {
				node.type = state.single ? "radio" : "checkbox";
			}

			focusGroup(node);

			node.addEventListener("click", handleClick);

			return {
				destroy() {
					node.removeEventListener("click", handleClick);
				},
			};
		}) satisfies Action<ToggleElement>;

		item.action = combineActions(item.action, action);

		return item;
	};

	$effect(() => {
		if (root?.disabled !== undefined) {
			for (const item of items) {
				if (item.element) {
					item.element.disabled = root.disabled;
				}
			}
		}
	});

	return {
		state: {
			get selected() {
				if (state.single) {
					return selected[0];
				}
				return selected;
			},
		},

		get items() {
			return items;
		},

		createItem,

		action: ((node) => {
			root = node;
		}) satisfies Action<HTMLFieldSetElement>,

		options,
		element: root,
	};
};
