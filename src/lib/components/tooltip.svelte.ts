import { Hoverable } from "$lib/mixins/hoverable.svelte";
import { Invokable } from "$lib/mixins/invokable.svelte";
import { Togglable } from "$lib/mixins/togglable.svelte";
import { nanoId } from "$lib/utils/nano";
import { role } from "$lib/utils/roles";
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
export class Tooltip extends Hoverable(Invokable(Togglable(ChocoBase))) {
	constructor(options?: TooltipOptions) {
		super();
		const id = nanoId();
		const isOpen = !!options?.isOpen;

		this.extendAttributes({
			"aria-describedby": id,
		});
		this.target.extendAttributes({
			id,
			inert: true,
			role: role.tooltip,
			"data-position": options?.position ?? defaults.position,
		});

		this.initInvokable({ active: isOpen, target: { "data-open": isOpen } });

		this.initHoverable({
			isHovered: isOpen,
			onHoverStart: () => (this.active = true),
			onHoverEnd: () => (this.active = false),
		});
	}
}
