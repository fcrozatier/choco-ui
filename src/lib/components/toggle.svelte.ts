import { Togglable } from "$lib/mixins/togglable.svelte";
import type { Required } from "$lib/mixins/types";
import { merge } from "@fcrozatier/ts-helpers";
import { ChocoBase } from "./base.svelte";

export type ToggleOptions = {
	/**
	 * Whether the toggle is initially pressed or not. Defaults to `false`
	 */
	active?: boolean;
	value?: string;
};

const defaults = { active: false } satisfies ToggleOptions;

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
	#options: Required<ToggleOptions, "active"> = $state(defaults);
	value = $derived(this.attributes?.value); // alias

	constructor(options?: ToggleOptions) {
		super();

		this.#options = merge(defaults, options);

		this.extendAttributes({
			type: "button",
			value: this.#options.value,
		});

		const opts = this.#options;

		this.initTogglable({
			initial: { "aria-pressed": `${opts.active}` },
			get active() {
				return opts.active;
			},
			set active(v: boolean) {
				opts.active = v;
			},
			toggle: "click",
		});
	}
}
