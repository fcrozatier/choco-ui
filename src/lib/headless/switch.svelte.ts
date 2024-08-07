import { Togglable } from "$lib/mixins/togglable.svelte.js";
import type { Required } from "$lib/mixins/types.js";
import { role } from "$lib/utils/roles.js";
import { merge } from "@fcrozatier/ts-helpers";
import { bind, type Bind } from "chocobytes/plugin";
import { ChocoBase } from "./base.svelte.js";

export type SwitchOptions = {
  /**
   * Whether the toggle is initially pressed or not. Defaults to `false`
   */
  active?: boolean;
  value?: string;
};

export type ConcreteSwitchOptions = Bind<SwitchOptions, "active">;

const defaults = { active: false, value: "" } satisfies SwitchOptions;

/**
 * ## Switch
 *
 * Semantics: on or off (switch toggle)
 *
 * The label should not change when the state changes. Use `simpleToggle` if needed.
 *
 * All descendants of a `switch` have role `presentation`
 *
 * Refs:
 *
 * [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role#all_descendants_are_presentational
 */
export class Switch extends Togglable<HTMLButtonElement>(ChocoBase) {
  #options: Required<SwitchOptions, "active" | "value"> = $state(defaults);
  value = $derived(this.#options.value);

  constructor(options?: ConcreteSwitchOptions) {
    super();
    this.#options = merge(defaults, options);
    const opts = this.#options;

    this.extendAttributes({
      value: opts.value,
      role: role.switch,
    });

    this.initTogglable(
      bind(
        {
          initial: { "aria-checked": `${opts.active}` },
          active: opts.active,
          toggle: "click",
        },
        ["active"],
      ),
    );
  }
}
