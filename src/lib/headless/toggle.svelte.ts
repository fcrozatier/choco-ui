import { Togglable } from "$lib/mixins/togglable.svelte.js";
import type { Required } from "$lib/mixins/types.js";
import { merge } from "@fcrozatier/ts-helpers";
import { bind, type Bind } from "chocobytes/plugin";
import { ChocoBase } from "./base.svelte.js";

export type ToggleOptions = {
  /**
   * Whether the toggle is initially pressed or not. Defaults to `false`
   */
  active?: boolean;
  value?: string;
};

type BindableOptions = "active";

export type ConcreteToggleOptions = Bind<ToggleOptions, BindableOptions>;

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
export class ToggleButton extends Togglable<HTMLButtonElement>(ChocoBase) {
  #options: Required<ToggleOptions, "active" | "value"> = $state(defaults);
  value = $derived(this.#options.value);

  constructor(options?: ConcreteToggleOptions) {
    super();

    this.#options = merge(defaults, options);
    const opts = this.#options;

    this.extendAttributes({
      type: "button",
      value: opts.value,
    });

    this.initTogglable(
      bind(
        {
          initial: { "aria-pressed": `${opts.active}` },
          active: opts.active,
          toggle: "click",
        },
        ["active"],
      ),
    );
  }
}
