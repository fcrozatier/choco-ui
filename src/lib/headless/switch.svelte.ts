import { Toggleable } from "$lib/blocks/toggleable.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import { merge } from "$lib/utils/index.js";
import { role } from "$lib/utils/roles.js";

export type SwitchOptions = {
  /**
   * Whether the switch is initially pressed or not. Defaults to `false`
   */
  active?: boolean | (() => boolean);
  setActive?: (v: boolean) => void;
  value?: string;
};

const defaults = { active: false, value: "" } satisfies SwitchOptions;

/**
 * ## Switch
 *
 * Semantics: on or off (switch toggle)
 *
 * The label should not change when the state changes.
 *
 * All descendants of a `switch` have role `presentation`
 *
 * Refs:
 *
 * [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role#all_descendants_are_presentational
 */
export class Switch extends Toggleable<"button" | "input"> {
  value;

  constructor(options?: SwitchOptions) {
    const opts = merge(defaults, options);

    super({
      initial: { "aria-checked": `${getValue(opts.active)}` },
      active: opts.active,
      setActive: opts.setActive,
      toggle: "click",
    });

    this.value = opts.value;

    this.extendAttributes({
      value: opts.value,
      role: role.switch,
    });
  }
}
