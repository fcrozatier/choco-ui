import type { Required } from "$lib/mixins/types.js";
import { Group } from "../mixins/group.svelte.js";
import { ToggleButton, type ConcreteToggleOptions } from "./toggle.svelte.js";

export type ToggleGroupItemOptions = Required<ConcreteToggleOptions, "value">;

export class ToggleGroup extends Group(ToggleButton) {
	createItem = (options: ToggleGroupItemOptions) => {
		return new this.Item(options);
	};
}
