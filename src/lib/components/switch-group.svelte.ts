import { Group } from "../mixins/group.svelte.js";
import { Switch, type ConcreteSwitchOptions } from "./switch.svelte.js";

export class SwitchGroup extends Group(Switch) {
	createItem = (options?: ConcreteSwitchOptions) => {
		return new this.Item(options);
	};
}
