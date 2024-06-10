import { Togglable } from "$lib/mixins/togglable.svelte";
import { bind, type Bind } from "$lib/utils/bind";
import { merge } from "@fcrozatier/ts-helpers";
import { ChocoBase } from "./base.svelte";

export type ToggleOptions = {
	/**
	 * Whether the toggle is initially pressed or not. Defaults to `false`
	 */
	active?: boolean;
	value?: string;
};

type BindableOptions = "active";

const defaults: Required<ToggleOptions> = { active: false, value: "" };

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
	#options: Required<ToggleOptions> = $state(defaults);
	value = $derived(this.attributes?.value); // alias

	constructor(options: Bind<ToggleOptions, BindableOptions>) {
		super();

		this.#options = merge(defaults, options);

		this.extendAttributes({
			type: "button",
			value: this.#options.value,
		});

		const opts = this.#options;

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
