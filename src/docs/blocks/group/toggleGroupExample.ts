import { Group } from "$lib/blocks/group.svelte.js";
import { ToggleButton, type ToggleOptions } from "$lib/headless/toggle.svelte.js";

// It's that simple. You get roving focus and tracking for free
export class ToggleGroup extends Group(ToggleButton) {
  createItem = (options: ToggleOptions) => {
    return new this.Item(options);
  };
}
