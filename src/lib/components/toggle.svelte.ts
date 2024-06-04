import { Togglable } from "$lib/mixins/togglable.svelte";
import { trimUndefined } from "@fcrozatier/ts-helpers";
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
	value = $derived(this.attributes?.value); // alias

	constructor(options?: ToggleOptions) {
		super();
		const toggleOptions = { ...defaults, ...trimUndefined(options) };

		this.extendAttributes({
			type: "button",
			value: options?.value,
		});

		this.initTogglable({
			initial: { "aria-pressed": `${toggleOptions.active}` },
			active: toggleOptions.active,
			toggle: "click",
		});
	}
}
