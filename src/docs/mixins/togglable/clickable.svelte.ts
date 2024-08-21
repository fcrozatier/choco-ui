import type { ChocoBase } from "$lib/headless/base.svelte.js";
import { Togglable } from "$lib/mixins/togglable.svelte.js";
import type { Constructor } from "$lib/utils/types.js";

export const Clickable = (superclass: Constructor<ChocoBase>) => {
  return class extends Togglable(superclass) {
    constructor(options?: { active: boolean }) {
      super();
      const active = options?.active ?? false;
      this.initTogglable({
        initial: { "data-active": active },
        active,
        on: "pointerdown",
        off: ["pointerup", "pointerleave"],
      });
    }
  };
};
