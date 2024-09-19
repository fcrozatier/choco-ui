import { Switch, type SwitchOptions } from "chocobytes/headless/switch.svelte.js";
import { Group } from "chocobytes/mixins/group.svelte.js";

export class SwitchGroup extends Group(Switch) {
  createItem = (options?: SwitchOptions) => {
    return new this.Item(options);
  };
}
