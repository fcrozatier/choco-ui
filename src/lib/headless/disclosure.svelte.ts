import { Triggerable } from "$lib/blocks/triggerable.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import { merge, nanoId } from "$lib/utils/index.js";

export type DisclosureOptions = {
  active?: boolean | (() => boolean);
  setActive?: (v: boolean) => void;
};

const defaults = { active: false } satisfies DisclosureOptions;

/**
 * ## Disclosure
 *
 * Adheres to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
 */
export class Disclosure extends Triggerable<"button"> {
  constructor(options?: DisclosureOptions) {
    const opts = merge(defaults, options);

    super({
      control: { "aria-expanded": `${getValue(opts.active)}` },
      target: { hidden: !getValue(opts.active) },
      active: opts.active,
      setActive: opts.setActive,
      toggle: "click",
    });

    const controlId = nanoId();
    const targetId = nanoId();

    this.extendAttributes({
      id: controlId,
      "aria-controls": targetId,
    });

    this.target.extendAttributes({
      id: targetId,
      "aria-labelledby": controlId,
    });
  }
}
