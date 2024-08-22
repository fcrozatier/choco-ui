import { ToggleButton, type ToggleOptions } from "$lib/headless/toggle.svelte.js";
import { Group } from "$lib/mixins/group.svelte.js";
import type { Required } from "$lib/utils/types.js";

export class ToggleGroup extends Group(ToggleButton) {
  createItem = (options: Required<ToggleOptions, "value">) => {
    return new this.Item(options);
  };
}
