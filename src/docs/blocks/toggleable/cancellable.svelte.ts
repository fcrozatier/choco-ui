import { Toggleable } from "$lib/blocks/toggleable.svelte.js";

export class Cancellable extends Toggleable<"button"> {
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
