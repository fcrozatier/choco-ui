import { Toggleable } from "$lib/blocks/toggleable.svelte.js";

export class ToggleButton extends Toggleable {
  constructor(options?: { active: boolean }) {
    const active = options?.active ?? false;
    super({
      initial: { "aria-pressed": `${active}` },
      active,
      toggle: "click",
    });
  }
}
