import { Invokable } from "$lib/mixins/invokable.svelte";
import { Togglable } from "$lib/mixins/togglable.svelte";
import type { OmitSupertype } from "$lib/mixins/types";
import { role } from "$lib/utils/roles";
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

class Header extends Invokable(Togglable<HTMLButtonElement>(ChocoBase)) {
	value: string;
	headingLevel: number;

	constructor(options: HeaderOptions) {
		super();

		this.headingLevel = options?.headingLevel ?? defaults.headingLevel;
		this.initInvokable({
			control: { "aria-expanded": `${!!options.active}`, "aria-selected": `${!!options.active}` },
			target: { hidden: !options.active },
			active: !!options.active,
			labelledBy: true,
		});
		this.extendAttributes({ role: role.tab, value: options.value });
		this.target.extendAttributes({ role: role.region });

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
		super({ ...defaults.focus, ...options?.focus });
		this.headingLevel = options?.headingLevel ?? defaults.headingLevel;
	}

	createItem = (options: HeaderOptions): Header => {
		return new this.Item({ ...options, headingLevel: this.headingLevel });
	};
}
