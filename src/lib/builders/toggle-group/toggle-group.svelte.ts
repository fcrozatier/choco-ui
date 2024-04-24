import { createToggle, type Toggle, type ToggleOptions } from "../toggle/toggle.svelte";
import {
	createTogglerGroup,
	type TogglerGroupOptions,
} from "../toggler-group/toggler-group.svelte";

export type CreateToggleGroupItem = ReturnType<typeof createToggleGroup>["createItem"];
export type ToggleGroupOptions = TogglerGroupOptions;

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
