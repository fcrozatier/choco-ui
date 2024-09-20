import { Hocusable } from "$lib/blocks/hocusable.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import { merge, nanoId } from "$lib/utils/index.js";
import { role } from "$lib/utils/roles.js";

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
export class Tooltip extends Hocusable<"generic"> {
  constructor(options?: TooltipOptions) {
    const opts = merge(defaults, options);

    super({
      active: opts.active,
      setActive: opts.setActive,
      target: { "data-open": getValue(opts.active) },
    });

    const id = "tooltip-" + nanoId();

    this.extendAttributes({
      "aria-describedby": id,
    });

    this.target.extendAttributes({
      id,
      inert: true,
      role: role.tooltip,
      "data-position": opts.position,
    });
  }
}
