import { Togglable } from "$lib/mixins/togglable.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import { merge } from "$lib/utils/index.js";

export type ToggleOptions = {
  /**
   * Whether the toggle is initially pressed or not. Defaults to `false`
   */
  active?: boolean | (() => boolean);
  setActive?: (v: boolean) => void;
  value?: string;
};

const defaults = { active: false, value: "" } satisfies ToggleOptions;

/**
 * ## Toggle
 *
 * Use on button elements.
 *
 * Semantics: pressed or not pressed
 *
 * Note: The label should not change when the state changes
 *
 */
export class ToggleButton extends Togglable<"button"> {
  value;

  constructor(options?: ToggleOptions) {
    const opts = merge(defaults, options);

    super({
      initial: { "aria-pressed": `${getValue(opts.active)}` },
      active: opts.active,
      setActive: opts.setActive,
      toggle: "click",
    });

    this.value = opts.value;

    this.extendAttributes({
      type: "button",
      value: opts.value,
    });
  }
}
