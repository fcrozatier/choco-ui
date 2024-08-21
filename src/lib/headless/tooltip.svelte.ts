import { ChocoBase } from "$lib/base.svelte.js";
import { Hocusable } from "$lib/mixins/hocusable.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import { merge, nanoId } from "$lib/utils/index.js";
import { role } from "$lib/utils/roles.js";
import type { Required } from "$lib/utils/types.js";

export type TooltipOptions = {
  active?: boolean | (() => boolean);
  setActive?: (v: boolean) => void;
  position?: "top" | "bottom" | "left" | "right";
};

const defaults = { active: false, position: "top" } satisfies TooltipOptions;

/**
 * ## Tooltip
 *
 * Ref:
 *
 * [ARIA tooltip role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)
 *
 * [WAI ARIA Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
 *
 * [WCAG Content on Hover or Focus](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)
 */
export class Tooltip extends Hocusable(ChocoBase) {
  #options: Required<TooltipOptions, "active"> = $state(defaults);

  constructor(options?: TooltipOptions) {
    super();
    this.#options = merge(defaults, options);

    const id = nanoId();
    const opts = this.#options;

    this.extendAttributes({
      "aria-describedby": id,
    });

    this.target.extendAttributes({
      id,
      inert: true,
      role: role.tooltip,
      "data-position": opts.position,
    });

    this.initHocusable({
      active: opts.active,
      setActive: opts.setActive,
      target: { "data-open": getValue(opts.active) },
    });
  }
}
