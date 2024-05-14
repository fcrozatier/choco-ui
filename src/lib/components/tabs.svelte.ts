import { makeFocusable } from "$lib/actions/focus.svelte";
import type { ManageFocusOptions } from "$lib/actions/focus.svelte";
import type { Orientation } from "$lib/internal/types";
import { Controllable } from "$lib/mixins/controllable.svelte";
import { role } from "$lib/utils/roles";
import { ChocoBase } from "./base.svelte";
import { Group } from "./group.svelte";

export type TabsOptions = {
	activateOnFocus?: boolean;
	orientation?: Orientation;
	/**
	 * The default active tab. If not provided it defaults to the first tab
	 */
	value?: string;
};

const defaults: TabsOptions = {
	activateOnFocus: true,
	orientation: "horizontal",
	value: undefined,
};

type TabOptions = {
	value: string;
	/**
	 * Whether the tab is the default active tab. If not provided the first tab is active
	 */
	active?: boolean;
};

class Tab extends Controllable {
	value: string;

	constructor(options: TabOptions) {
		super();
		this.initControllable({
			control: { "aria-selected": `${options.active ?? false}` },
			target: { "aria-expanded": `${options.active ?? false}`, hidden: !options.active },
			active: options.active ?? false,
			labelledBy: true,
		});
		this.control.extendAttributes({ role: role.tab, value: options.value });
		this.target.extendAttributes({ role: role.tabpanel });
		// Make sure the panel is in the tab sequence
		this.target.extendActions(makeFocusable);

		this.value = options.value;
	}
}

export class Tabs extends Group<Tab> {
	#options: TabsOptions;
	active = $derived(this.items.filter((item) => item.active).map((item) => item.value));

	constructor(options?: TabsOptions & Omit<ManageFocusOptions, "roving">) {
		super({
			...options,
			roving: true,
			onFocus: (from, to) => {
				if (options?.activateOnFocus) {
					this.items.find((tab) => tab.value === to.getAttribute("value"))?.on();
					this.items.find((tab) => tab.value === from.getAttribute("value"))?.off();
				}
			},
		});
		this.#options = { ...defaults, ...options };
		this.initGroup();
	}

	createTablist = () => {
		return new ChocoBase({
			role: role.tablist,
			"aria-orientation": this.#options.orientation,
			"aria-multiselectable": "false",
		});
	};

	createItem = (options: TabOptions): Tab => {
		// The first tab is active by default
		const active =
			this.#options.value === undefined
				? this.items.length === 0
				: this.#options.value === options.value;

		const item = new Tab({ value: options.value, active });

		item.control.extendActions(this.focusAction);
		this.items.push(item);
		return item;
	};
}
