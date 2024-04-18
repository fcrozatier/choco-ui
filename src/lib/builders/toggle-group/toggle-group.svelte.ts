import type { Action } from "svelte/action";
import { createToggle, type CreateToggle, type ToggleElement } from "../toggle/toggle.svelte";
import { combineActions } from "$lib/utils/runes.svelte";
import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";

export type CreateToggleGroup = {
	focus?: ManageFocusOptions;
};

export type CreateToggleGroupItem = typeof createToggle;
export type ToggleGroupItem = ReturnType<typeof createToggle>;

const defaults = {} satisfies CreateToggleGroup;

/**
 * Toggle Group
 *
 */
export const createToggleGroup = (options?: CreateToggleGroup) => {
	const state = $state({ ...defaults, ...options });
	const items: ToggleGroupItem[] = $state([]);

	let root: HTMLFieldSetElement | undefined = $state();

	const focusGroup = manageFocus({
		...state.focus,
	});

	const pressed = $derived(
		items.filter((i) => i.state.pressed === true).map((i) => i.element?.value),
	);
	const mixed = $derived(
		items.filter((i) => i.state.pressed === "mixed").map((i) => i.element?.value),
	);

	const createItem = (options?: CreateToggle) => {
		const item = createToggle({ ...options });

		const action = ((node) => {
			focusGroup(node);
			items.push(item);
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
			get pressed() {
				return pressed;
			},

			get mixed() {
				return mixed;
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
