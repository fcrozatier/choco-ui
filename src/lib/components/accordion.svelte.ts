import { Triggerable } from "$lib/mixins/triggerable.svelte.js";
import { role } from "$lib/utils/roles.js";
import { merge, nanoId } from "@fcrozatier/ts-helpers";
import { Group, type GroupOptions } from "../mixins/group.svelte.js";
import { ChocoBase } from "./base.svelte.js";

type AccordionBaseOptions = {
	headingLevel?: number;
};

export type AccordionOptions = AccordionBaseOptions & {
	focus?: Omit<GroupOptions, "roving">;
};

const defaults = {
	headingLevel: 3,
	focus: {
		roving: false,
		exclusive: false,
		preventInactivation: false,
	},
} satisfies AccordionBaseOptions & { focus: GroupOptions };

export type HeaderOptions = {
	headingLevel?: number;
	value: string;
	/**
	 * Whether the tab is the default active tab. If not provided the first tab is active
	 */
	active?: boolean;
};

class Header extends Triggerable<HTMLButtonElement>(ChocoBase) {
	value: string;
	headingLevel: number;

	constructor(options: HeaderOptions) {
		super();
		const controlId = nanoId();
		const targetId = nanoId();
		const active = !!options.active;

		this.headingLevel = options?.headingLevel ?? defaults.headingLevel;
		this.initTriggerable({
			control: { "aria-expanded": `${active}` },
			target: { hidden: !active },
			active,
			toggle: "click",
		});
		this.extendAttributes({
			id: controlId,
			role: role.tab,
			value: options.value,
			"aria-controls": targetId,
		});
		this.target.extendAttributes({ id: targetId, role: role.region, "aria-labelledby": controlId });

		this.value = options.value;
	}
}

/**
 * Accordion
 *
 *
 * [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
 */
export class Accordion extends Group(Header) {
	headingLevel: number;

	constructor(options?: AccordionOptions) {
		super(merge(defaults.focus, options?.focus as GroupOptions));
		this.headingLevel = options?.headingLevel ?? defaults.headingLevel;
	}

	createItem = (options: HeaderOptions): Header => {
		return new this.Item({ ...options, headingLevel: this.headingLevel });
	};
}
