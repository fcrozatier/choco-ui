import { Toggleable } from "$lib/blocks/toggleable.svelte.js";

/**
 * ## Cancellable
 *
 * Adds a `data-active` attribute to normalize the `:active` state for better styling: the `data-active` attribute is removed when the cursor leaves the target (which is not the case with the CSS `:active` pseudo selector), even when it is still pressed, to convey the cancellability of the action (which will not trigger).
 */
export class Cancellable extends Toggleable<"button" | "input"> {
  constructor(options?: { active?: boolean }) {
    const active = options?.active ?? false;
    super({
      initial: { "data-active": active },
      active,
      on: "pointerdown",
      off: ["pointerup", "pointerleave"],
    });
  }
}
