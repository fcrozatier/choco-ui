import type { Required } from "$lib/mixins/types";
import { Group } from "../mixins/group.svelte";
import { ToggleButton, type ConcreteToggleOptions } from "./toggle.svelte";

export type ToggleGroupItemOptions = Required<ConcreteToggleOptions, "value">;

export class ToggleGroup extends Group(ToggleButton) {
	createItem = (options: ToggleGroupItemOptions) => {
		return new this.Item(options);
	};
}
