import { Group } from "$lib/mixins/group.svelte.js";
import { Switch, type SwitchOptions } from "./switch.svelte.js";

export class SwitchGroup extends Group(Switch) {
  createItem = (options?: SwitchOptions) => {
    return new this.Item(options);
  };
}
