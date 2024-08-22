import { Switch, type SwitchOptions } from "$lib/headless/switch.svelte.js";
import { Group } from "$lib/mixins/group.svelte.js";

export class SwitchGroup extends Group(Switch) {
  createItem = (options?: SwitchOptions) => {
    return new this.Item(options);
  };
}
