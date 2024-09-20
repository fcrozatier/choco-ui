import { merge } from "$lib/utils/index.js";
import type { HTMLTag } from "chocobytes/utils/types.js";
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

export class Triggerable<
  C extends HTMLTag = "button",
  T extends HTMLTag = "generic",
> extends Togglable<C> {
  target: Togglable<T>;

  constructor(options?: TriggerableOptions) {
    const opts = merge(defaults, options);
    super({
      ...opts,
      initial: opts.control,
      active: opts.active,
      setActive: opts.setActive,
    });

    this.target = new Togglable({
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
}
