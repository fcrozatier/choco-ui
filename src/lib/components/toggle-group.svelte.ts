import { Group } from "./group.svelte";
import { ToggleButton, type ToggleOptions } from "./toggle.svelte";

export class ToggleGroup extends Group<ToggleButton> {
	active = $derived(this.items.filter((item) => item.active).map((item) => item.value));

	createItem = (options: ToggleOptions): ToggleButton => {
		const item = new ToggleButton(options);
		if (this.focusAction) {
			item.extendActions(this.focusAction);
		}
		this.items.push(item);
		return item;
	};
}
