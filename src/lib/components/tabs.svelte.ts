import { makeFocusable } from "$lib/actions/focus.svelte";
import type { Orientation } from "$lib/internal/types";
import { Invokable } from "$lib/mixins/invokable.svelte";
import { Togglable } from "$lib/mixins/togglable.svelte";
import type { OmitSubtype } from "$lib/mixins/types";
import { role } from "$lib/utils/roles";
import { ChocoBase } from "./base.svelte";
import { Group, type GroupOptions } from "./group.svelte";

type BaseTabsOptions = {
	orientation?: Orientation;
	/**
	 * The default active tab. If not provided defaults to the first tab
	 */
	value?: string;
};

export type TabsOptions = BaseTabsOptions &
	OmitSubtype<
		GroupOptions,
		{ focus?: { roving?: boolean }; single?: boolean; preventInactivation?: boolean }
	>;

const defaults = {
	preventInactivation: true,
	activateOnFocus: true,
	orientation: "horizontal",
	exclusive: true,
} satisfies BaseTabsOptions & GroupOptions;

export type TabOptions = {
	value: string;
	/**
	 * Whether the tab is the default active tab. If not provided the first tab is active
	 */
	active?: boolean;
};

class Tab extends Invokable(Togglable(ChocoBase)) {
	value: string;

	constructor(options: TabOptions) {
		super();
		this.initControllable({
			control: { "aria-selected": `${!!options.active}` },
			target: { "aria-expanded": `${!!options.active}`, hidden: !options.active },
			active: !!options.active,
			labelledBy: true,
		});
		this.extendAttributes({ role: role.tab, value: options.value });
		this.target.extendAttributes({ role: role.tabpanel });
		// Make sure the panel is in the tab sequence
		this.target.extendActions(makeFocusable);

		this.value = options.value;
	}
}

/**
 * Tabs
 *
 * If the tab list has a visible label, the TabList element has `aria-labelledby` set to a value that refers to the labelling element. Otherwise, the TabList element has a label provided by `aria-label`.
 *
 * [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
 */
export class Tabs extends Group(Tab) {
	#options: TabsOptions;
	active = $derived(this.activeItems.map((item) => item.value));
	tablist;

	constructor(options?: TabsOptions) {
		super({ ...defaults, ...options, focus: { ...options?.focus, roving: true } });

		this.#options = { ...defaults, ...options };
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
