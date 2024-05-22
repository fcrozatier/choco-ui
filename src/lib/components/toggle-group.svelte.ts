import { Group } from "./group.svelte";
import { ToggleButton, type ToggleOptions } from "./toggle.svelte";

export class ToggleGroup extends Group(ToggleButton) {
	active = $derived(this.activeItems.map((item) => item.value));

	createItem = (options: ToggleOptions) => {
		return new this.Item(options);
	};
}
