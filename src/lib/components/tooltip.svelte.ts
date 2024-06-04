import { Hoverable } from "$lib/mixins/hoverable.svelte";
import { nanoId } from "$lib/utils/nano";
import { role } from "$lib/utils/roles";
import { trimUndefined } from "@fcrozatier/ts-helpers";
import { ChocoBase } from "./base.svelte";

export type TooltipOptions = { isOpen?: boolean; position?: "top" | "bottom" | "left" | "right" };

const defaults = { isOpen: false, position: "top" } satisfies TooltipOptions;

/**
 * ## Tooltip
 *
 * Ref:
 *
 * [ARIA tooltip role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)
 *
 * [WAI ARIA Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
 *
 * [WCAG Content on Hover or Focus](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)
 */
export class Tooltip extends Hoverable(ChocoBase) {
	#options: Required<TooltipOptions> = $state(defaults);

	constructor(options?: TooltipOptions) {
		super();
		const id = nanoId();
		this.#options = {
			...defaults,
			...trimUndefined(options),
		};

		this.extendAttributes({
			"aria-describedby": id,
		});

		this.target.extendAttributes({
			id,
			inert: true,
			role: role.tooltip,
			"data-position": this.#options.position,
		});

		this.initHoverable({
			active: this.#options.isOpen,
			target: { "data-open": this.#options.isOpen },
		});
	}
}
