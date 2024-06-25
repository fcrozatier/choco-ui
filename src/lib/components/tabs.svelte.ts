import { makeFocusable } from "$lib/actions/focus.svelte";
import { Triggerable } from "$lib/mixins/triggerable.svelte";
import type { OmitSupertype, Orientation } from "$lib/mixins/types";
import { role } from "$lib/utils/roles";
import { merge, nanoId } from "@fcrozatier/ts-helpers";
import { Group, type GroupOptions } from "../mixins/group.svelte";
import { ChocoBase } from "./base.svelte";

type BaseTabsOptions = {
	orientation?: Orientation;
	/**
	 * The default active tab. If not provided defaults to the first tab
	 */
	value?: string;
};

export type TabsOptions = BaseTabsOptions & {
	focus?: OmitSupertype<
		GroupOptions,
		{ roving?: boolean; exclusive?: boolean; preventInactivation?: boolean }
	>;
};

const defaults = {
	focus: {
		roving: true,
		exclusive: true,
		preventInactivation: true,
		activateOnNext: true,
	},
	orientation: "horizontal",
} satisfies BaseTabsOptions & { focus: GroupOptions };

export type TabOptions = {
	value: string;
	/**
	 * Whether the tab is the default active tab. If not provided the first tab is active
	 */
	active?: boolean;
};

class Tab extends Triggerable<HTMLButtonElement>(ChocoBase) {
	value: string;

	constructor(options: TabOptions) {
		super();
		const controlId = nanoId();
		const targetId = nanoId();
		const active = !!options.active;

		this.initTriggerable({
			control: { "aria-selected": `${active}` },
			target: { hidden: !active },
			active,
			on: "click",
		});
		this.extendAttributes({
			id: controlId,
			role: role.tab,
			value: options.value,
			"aria-controls": targetId,
		});
		this.target.extendAttributes({
			id: targetId,
			role: role.tabpanel,
			"aria-labelledby": controlId,
		});
		// Make sure the panel is in the tab sequence
		this.target.extendActions(makeFocusable);
		this.value = options.value;
	}
}

/**
 * Tabs
 *
 * If the tab list has a visible label, the element with role tablist has `aria-labelledby` set to a value that refers to the labelling element. Otherwise, the `tablist` element has a label provided by `aria-label`.
 *
 * [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
 */
export class Tabs extends Group(Tab) {
	#options: BaseTabsOptions & GroupOptions;
	tablist;

	constructor(options?: TabsOptions) {
		super(merge(defaults.focus, options?.focus));

		this.#options = merge(defaults, options);
		this.tablist = new ChocoBase({
			role: role.tablist,
			"aria-orientation": this.#options.orientation,
			"aria-multiselectable": "false",
		});
	}

	createItem = (options: TabOptions): Tab => {
		// The first tab is active by default
		const active =
			this.#options.value === undefined
				? this.items.length === 0
				: this.#options.value === options.value;

		return new this.Item({ ...options, active });
	};
}
