import { Hoverable } from "$lib/mixins/hoverable.svelte";
import type { Required } from "$lib/mixins/types";
import { role } from "$lib/utils/roles";
import { merge, nanoId } from "@fcrozatier/ts-helpers";
import { bind, type Bind } from "choco-ui/plugin";
import { ChocoBase } from "./base.svelte";

export type TooltipOptions = { active?: boolean; position?: "top" | "bottom" | "left" | "right" };

export type ConcreteTooltipOptions = Bind<TooltipOptions, "active">;

const defaults = { active: false, position: "top" } satisfies TooltipOptions;

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
	#options: Required<TooltipOptions, "active"> = $state(defaults);

	constructor(options?: ConcreteTooltipOptions) {
		super();
		this.#options = merge(defaults, options);

		const id = nanoId();
		const opts = this.#options;

		this.extendAttributes({
			"aria-describedby": id,
		});

		this.target.extendAttributes({
			id,
			inert: true,
			role: role.tooltip,
			"data-position": opts.position,
		});

		this.initHoverable(
			bind(
				{
					active: opts.active,
					target: { "data-open": opts.active },
				},
				["active"],
			),
		);
	}
}
