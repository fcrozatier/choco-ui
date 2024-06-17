import { Triggerable } from "$lib/mixins/triggerable.svelte";
import { nanoId } from "@fcrozatier/ts-helpers";
import { ChocoBase } from "./base.svelte";

export type DisclosureOptions = {
	/**
	 * Whether the tab is the default active tab. If not provided the first tab is active
	 */
	active?: boolean;
};

const defaults = { active: false } satisfies DisclosureOptions;

/**
 * ## Disclosure
 *
 * Adheres to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
 */
export class Disclosure extends Triggerable<HTMLButtonElement>(ChocoBase) {
	constructor(options?: DisclosureOptions) {
		super();
		const controlId = nanoId();
		const targetId = nanoId();
		const active = options?.active ?? defaults.active;

		this.initInvokable({
			control: { "aria-expanded": `${active}` },
			target: { hidden: !active },
			active,
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
