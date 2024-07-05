import { bind, type Bind } from "$lib/plugin/bind.js";
import { merge } from "@fcrozatier/ts-helpers";
import { ChocoBase } from "../headless/base.svelte.js";
import { Togglable, type TogglableOptions } from "./togglable.svelte.js";
import type { Constructor } from "./types.js";

export type TriggerableOptions = {
  /**
   * Initial state of the control
   */
  control?: TogglableOptions["initial"];
  /**
   * Initial state of the target
   */
  target?: TogglableOptions["initial"];
} & Omit<TogglableOptions, "initial">;

export type ConcreteTriggerableOptions = Bind<TriggerableOptions, "active">;

const defaults = { active: false } satisfies TriggerableOptions;

export const Triggerable = <
  CE extends HTMLElement = HTMLElement,
  TE extends HTMLElement = HTMLElement,
  C extends Constructor<ChocoBase<CE>> = Constructor<ChocoBase<CE>>,
>(
  controlClass: C,
  targetClass = class extends Togglable<TE>(ChocoBase) {},
) => {
  return class extends Togglable(controlClass) {
    #options: TriggerableOptions = $state(defaults);
    target: InstanceType<typeof targetClass>;

    constructor(...options: any[]) {
      super(...options);
      this.target = new targetClass();
    }

    initTriggerable(options?: ConcreteTriggerableOptions) {
      this.#options = merge(defaults, options);
      const opts = this.#options;

      this.initTogglable(
        bind(
          {
            ...opts,
            initial: opts.control,
            active: opts.active,
          },
          ["active"],
        ),
      );

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
