import { FocusGroup } from "./group.svelte";
import { ToggleButton, type ToggleOptions } from "./toggle.svelte";

export class ToggleGroup extends FocusGroup<ToggleButton> {
	createItem = (options: ToggleOptions): ToggleButton => {
		const item = new ToggleButton(options);
		this.push(item);
		return item;
	};
}
