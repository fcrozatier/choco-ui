import type { Required } from "$lib/mixins/types.js";
import { Group } from "../mixins/group.svelte.js";
import { ToggleButton, type ToggleOptions } from "./toggle.svelte.js";

export class ToggleGroup extends Group(ToggleButton) {
  createItem = (options: Required<ToggleOptions, "value">) => {
    return new this.Item(options);
  };
}
