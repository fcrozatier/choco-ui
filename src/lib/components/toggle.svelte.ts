import { Togglable } from "$lib/mixins/togglable.svelte";
import type { Required } from "$lib/mixins/types";
import { bind, type Bind } from "$lib/plugin";
import { merge } from "@fcrozatier/ts-helpers";
import { ChocoBase } from "./base.svelte";

export type ToggleOptions = {
	/**
	 * Whether the toggle is initially pressed or not. Defaults to `false`
	 */
	active?: boolean;
	value?: string;
};

export type ConcreteToggleOptions = Bind<ToggleOptions, "active">;

const defaults = { active: false, value: "" } satisfies ToggleOptions;

/**
 * ## Toggle
 *
 * Use on button elements.
 *
 * Semantics: pressed or not pressed
 *
 * The label should not change when the state changes
 *
 *
 * Refs:
 *
 * [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
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
