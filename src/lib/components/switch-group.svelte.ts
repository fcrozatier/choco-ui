import { Group } from "../mixins/group.svelte";
import { Switch, type SwitchOptions } from "./switch.svelte";

export class SwitchGroup extends Group(Switch) {
	active = $derived(this.activeItems.map((item) => item.value));

	createItem = (options?: SwitchOptions) => {
		return new this.Item(options);
	};
}
