import { ChocoBase } from "$lib/base.svelte.js";
import { merge } from "$lib/utils/index.js";
import type { Constructor, HTMLTag } from "$lib/utils/types.js";
import type { Booleanish } from "svelte/elements";
import { Togglable, type TogglableOptions } from "./togglable.svelte.js";

export type TriggerableOptions = {
  /**
   * Initial state of the control
   */
  control?: Record<string, Booleanish>;
  /**
   * Initial state of the target
   */
  target?: Record<string, Booleanish>;
} & Omit<TogglableOptions, "initial">;

const defaults = { active: false } satisfies TriggerableOptions;

export const Triggerable = <
  CE extends HTMLTag = "button",
  TE extends HTMLTag = "generic",
  C extends Constructor<ChocoBase<CE>> = Constructor<ChocoBase<CE>>,
>(
  controlClass: C,
  targetClass = class extends Togglable<TE>(ChocoBase) {},
) => {
  return class extends Togglable<CE>(controlClass) {
    #options: TriggerableOptions = $state(defaults);
    target: InstanceType<typeof targetClass>;

    constructor(...options: any[]) {
      super(...options);
      this.target = new targetClass();
    }

    initTriggerable(options?: TriggerableOptions) {
      this.#options = merge(defaults, options);
      const opts = this.#options;

      this.initTogglable({
        ...opts,
        initial: opts.control,
        active: opts.active,
        setActive: opts.setActive,
      });

      this.target.initTogglable({
        initial: opts.target,
        active: opts.active,
      });
    }

    override toggle(e?: Event) {
      super.toggle(e);
      this.target.toggle(e);
    }

    override on(e?: Event) {
      super.on(e);
      this.target.on(e);
    }

    override off(e?: Event) {
      super.off(e);
      this.target.off(e);
    }
  };
};
