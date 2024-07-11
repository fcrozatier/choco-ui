import type { ChocoBase } from "$lib/headless/base.svelte.js";
import { Togglable } from "$lib/mixins/togglable.svelte.js";
import type { Constructor } from "$lib/mixins/types.js";

export const Clickable = (superclass: Constructor<ChocoBase>) => {
  return class extends Togglable(superclass) {
    constructor(options: { active: boolean }) {
      super();

      this.initTogglable({
        initial: { "data-active": options.active },
        active: options.active,
        on: "pointerdown",
        off: ["pointerup", "pointerleave"],
      });
    }
  };
};
