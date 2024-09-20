import { Group } from "$lib/blocks/group.svelte.js";
import type { Required } from "$lib/utils/types.js";
import { ToggleButton, type ToggleOptions } from "chocobytes/headless/toggle.svelte.js";

export class ToggleGroup extends Group(ToggleButton) {
  createItem = (options: Required<ToggleOptions, "value">) => {
    return new this.Item(options);
  };
}
