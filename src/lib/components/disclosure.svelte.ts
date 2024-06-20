import { Triggerable } from "$lib/mixins/triggerable.svelte";
import type { Required } from "$lib/mixins/types";
import { merge, nanoId } from "@fcrozatier/ts-helpers";
import { bind, type Bind } from "choco-ui/plugin";
import { ChocoBase } from "./base.svelte";

export type DisclosureOptions = {
	/**
	 * Whether the tab is the default active tab. If not provided the first tab is active
	 */
	active?: boolean;
};

type BindableOptions = "active";

const defaults = { active: false } satisfies DisclosureOptions;

/**
 * ## Disclosure
 *
 * Adheres to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
 */
export class Disclosure extends Triggerable<HTMLButtonElement>(ChocoBase) {
	#options: Required<DisclosureOptions, "active"> = $state(defaults);

	constructor(options?: Bind<DisclosureOptions, BindableOptions>) {
		super();
		const controlId = nanoId();
		const targetId = nanoId();
		this.#options = merge(defaults, options);

		this.initTriggerable(
			bind(
				{
					control: { "aria-expanded": `${this.#options.active}` },
					target: { hidden: !this.#options.active },
					active: this.#options.active,
					toggle: "click",
				},
				["active"],
			),
		);
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
