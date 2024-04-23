import type { Action } from "svelte/action";
import {
	createToggle,
	type CreateToggle,
	type Toggle,
	type ToggleElement,
} from "../toggle/toggle.svelte";
import { combineActions } from "$lib/utils/runes.svelte";
import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import { commonParent } from "$lib/utils/helpers";

export type CreateToggleGroup = {
	focus?: ManageFocusOptions;
};

export type CreateToggleGroupItem = ReturnType<typeof createToggleGroup>["createItem"];

const defaults = {} satisfies CreateToggleGroup;

/**
 * Toggle Group
 *
 */
export const createToggleGroup = (options?: CreateToggleGroup) => {
	const state = $state({ ...defaults, ...options });
	const items: Toggle[] = $state([]);

	let root: HTMLElement | null | undefined = $state();

	const focusGroup = manageFocus({
		...state.focus,
	});

	const pressed = $derived(items.filter((i) => i.pressed === true).map((i) => i.element?.value));

	const createItem = (options?: CreateToggle) => {
		const item: Toggle = createToggle({ ...options });

		const action = ((node) => {
			const { destroy } = focusGroup(node);
			items.push(item);
			return { destroy };
		}) satisfies Action<ToggleElement>;

		item.action = combineActions(item.action, action);

		return item;
	};

	$effect(() => {
		const elements = items.map((i) => i.element).filter((i) => i !== undefined);
		const parent = commonParent(elements);

		if (parent && !(parent instanceof HTMLFieldSetElement)) {
			parent.role = "group";
		}

		root = parent;
	});

	$effect(() => {
		if (root && root instanceof HTMLFieldSetElement && root.disabled !== undefined) {
			for (const item of items) {
				if (item.element) {
					item.element.disabled = root.disabled;
				}
			}
		}
	});

	return {
		get pressed() {
			return pressed;
		},

		get items() {
			return items;
		},

		createItem,

		options,
		element: root,
	};
};
