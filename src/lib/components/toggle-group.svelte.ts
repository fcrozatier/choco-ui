import { Group } from "./group.svelte";
import { ToggleButton, type ConcreteToggleOptions } from "./toggle.svelte";

export class ToggleGroup extends Group(ToggleButton) {
	createItem = (options?: ConcreteToggleOptions) => {
		return new this.Item(options);
	};
}
