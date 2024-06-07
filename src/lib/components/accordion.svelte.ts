import { Invokable } from "$lib/mixins/invokable.svelte";
import type { OmitSupertype } from "$lib/mixins/types";
import { role } from "$lib/utils/roles";
import { merge, nanoId } from "@fcrozatier/ts-helpers";
import { ChocoBase } from "./base.svelte";
import { Group, type GroupOptions } from "./group.svelte";

type AccordionBaseOptions = {
	headingLevel?: number;
};

export type AccordionOptions = AccordionBaseOptions & {
	focus?: OmitSupertype<GroupOptions, { roving?: boolean }>;
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

class Header extends Invokable<HTMLButtonElement>(ChocoBase) {
	value: string;
	headingLevel: number;

	constructor(options: HeaderOptions) {
		super();
		const controlId = nanoId();
		const targetId = nanoId();
		const active = !!options.active;

		this.headingLevel = options?.headingLevel ?? defaults.headingLevel;
		this.initInvokable({
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
	active = $derived(this.activeItems.map((item) => item.value));

	constructor(options?: AccordionOptions) {
		super(merge(defaults.focus, options?.focus));
		this.headingLevel = options?.headingLevel ?? defaults.headingLevel;
	}

	createItem = (options: HeaderOptions): Header => {
		return new this.Item({ ...options, headingLevel: this.headingLevel });
	};
}
