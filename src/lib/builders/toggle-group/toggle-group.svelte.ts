import { createToggle, type Toggle, type ToggleOptions } from "../toggle/toggle.svelte";
import { type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import {
	createTogglerGroup,
	type TogglerGroupOptions,
} from "../toggler-group/toggler-group.svelte";

export type CreateToggleGroup = {
	focus?: ManageFocusOptions;
};

export type CreateToggleGroupItem = ReturnType<typeof createToggleGroup>["createItem"];

const defaults = {} satisfies CreateToggleGroup;

/**
 * Toggle Group
 *
 */
export const createToggleGroup = (options?: TogglerGroupOptions) => {
	const group = createTogglerGroup<Toggle>({ ...options, parentRole: "group" });

	const createItem = (options?: ToggleOptions) => {
		const item = createToggle({ ...options });

		group.addItem(item);

		return item;
	};

	return {
		get pressed() {
			return group.active.map((i) => i?.element?.value);
		},

		get items() {
			return group.items;
		},

		createItem,
	};
};
