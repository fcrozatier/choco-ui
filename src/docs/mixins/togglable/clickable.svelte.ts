import { ChocoBase } from "$lib/base.svelte.js";
import { Togglable } from "chocobytes/mixins/togglable.svelte.js";

// We apply the mixin to the ChocoBase class
// and specify on which elements it can be used for type safety
export class Clickable extends Togglable<"button">(ChocoBase) {
  constructor(options?: { active: boolean }) {
    super();
    const active = options?.active ?? false;
    // The mixin does the heavy lifting and we can easily configure it
    this.initTogglable({
      initial: { "data-active": active },
      active,
      on: "pointerdown",
      off: ["pointerup", "pointerleave"],
    });
  }
}
