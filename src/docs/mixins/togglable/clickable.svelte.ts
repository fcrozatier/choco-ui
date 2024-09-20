import { Togglable } from "chocobytes/mixins/togglable.svelte.js";

export class Clickable extends Togglable<"button"> {
  constructor(options?: { active: boolean }) {
    const active = options?.active ?? false;
    super({
      initial: { "data-active": active },
      active,
      on: "pointerdown",
      off: ["pointerup", "pointerleave"],
    });
  }
}
