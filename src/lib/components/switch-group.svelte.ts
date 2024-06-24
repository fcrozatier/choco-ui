import { Group } from "../mixins/group.svelte";
import { Switch, type ConcreteSwitchOptions } from "./switch.svelte";

export class SwitchGroup extends Group(Switch) {
	createItem = (options?: ConcreteSwitchOptions) => {
		return new this.Item(options);
	};
}
