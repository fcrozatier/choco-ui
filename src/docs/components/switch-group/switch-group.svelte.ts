import { Group } from "$lib/blocks/group.svelte.js";
import { Switch, type SwitchOptions } from "$lib/headless/switch.svelte.js";

export class SwitchGroup extends Group(Switch) {
  createItem = (options?: SwitchOptions) => {
    return new this.Item(options);
  };
}
