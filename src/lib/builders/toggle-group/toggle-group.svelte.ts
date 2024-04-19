import type { Action } from "svelte/action";
import { createToggle, type CreateToggle, type ToggleElement } from "../toggle/toggle.svelte";
import { combineActions } from "$lib/utils/runes.svelte";
import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import { commonParent } from "$lib/utils/helpers";

export type CreateToggleGroup = {
	focus?: ManageFocusOptions;
};

export type CreateToggleGroupItem = ReturnType<typeof createToggleGroup>["createItem"];
export type ToggleGroupItem = ReturnType<typeof createToggle>;

const defaults = {} satisfies CreateToggleGroup;

/**
 * Toggle Group
 *
 */
export const createToggleGroup = (options?: CreateToggleGroup) => {
	const state = $state({ ...defaults, ...options });
	const items: ToggleGroupItem[] = $state([]);

	let root: HTMLElement | undefined = $state();

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
		const elements = items.map((i) => i.element).filter((i) => i !== undefined);
		const parent = commonParent(elements);

		if (!parent) throw new Error("A toggle group should have a parent");

		if (!(parent instanceof HTMLFieldSetElement)) {
			parent.role = "group";
		}

		root = parent;
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

		options,
		element: root,
	};
};
