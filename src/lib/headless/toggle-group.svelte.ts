import { Group } from "$lib/mixins/group.svelte.js";
import type { Required } from "chocobytes/utils/types.js";
import { ToggleButton, type ToggleOptions } from "./toggle.svelte.js";

export class ToggleGroup extends Group(ToggleButton) {
  createItem = (options: Required<ToggleOptions, "value">) => {
    return new this.Item(options);
  };
}
