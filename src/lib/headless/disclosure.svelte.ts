import { Triggerable } from "$lib/mixins/triggerable.svelte.js";
import type { Required } from "$lib/mixins/types.js";
import { getValue } from "$lib/utils/binding.js";
import { merge, nanoId } from "@fcrozatier/ts-helpers";
import { ChocoBase } from "./base.svelte.js";

export type DisclosureOptions = {
  /**
   * Whether the tab is the default active tab. If not provided the first tab is active
   */
  active?: boolean | (() => boolean);
  setActive?: (v: boolean) => void;
};

const defaults = { active: false } satisfies DisclosureOptions;

/**
 * ## Disclosure
 *
 * Adheres to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
 */
export class Disclosure extends Triggerable<"button">(ChocoBase) {
  #options: Required<DisclosureOptions, "active"> = $state(defaults);

  constructor(options?: DisclosureOptions) {
    super();
    this.#options = merge(defaults, options);

    const controlId = nanoId();
    const targetId = nanoId();
    const opts = this.#options;

    this.initTriggerable({
      control: { "aria-expanded": `${getValue(opts.active)}` },
      target: { hidden: !getValue(opts.active) },
      active: opts.active,
      setActive: opts.setActive,
      toggle: "click",
    });

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
