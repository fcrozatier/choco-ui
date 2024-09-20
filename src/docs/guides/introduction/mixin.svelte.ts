import { Togglable } from "$lib/blocks/togglable.svelte.js";

export class ToggleButton extends Togglable {
  constructor(options?: { active: boolean }) {
    const active = options?.active ?? false;
    super({
      initial: { "aria-pressed": `${active}` },
      active,
      toggle: "click",
    });
  }
}
