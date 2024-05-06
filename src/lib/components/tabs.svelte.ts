import { makeFocusable } from "$lib/actions/focus/focusHelper";
import type { ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import type { Orientation } from "$lib/internal/types";
import { Controllable } from "$lib/mixins/controllable.svelte";
import { role } from "$lib/utils/roles";
import { ChocoBase } from "./base.svelte";
import { Group } from "./group.svelte";

export interface TabsOptions extends Omit<ManageFocusOptions, "roving"> {
	activateOnFocus?: boolean;
	orientation?: Orientation;
	/**
	 * The default open tab value. If not provided the first tab is open
	 */
	value?: string;
}

type TabOptions = {
	value: string;
	active?: boolean;
};

class Tab extends Controllable(ChocoBase) {
	value: string;

	constructor(options: TabOptions) {
		super();
		this.initControllable({
			control: { "aria-selected": `${options.active ?? false}` },
			target: { "aria-expanded": `${options.active ?? false}`, hidden: !options.active },
			labelledBy: true,
		});
		this.control.extendAttributes({ role: role.tab });
		this.target.extendAttributes({ role: role.tabpanel });
		// Make sure the panel is in the tab sequence
		this.target.extendActions(makeFocusable);

		this.value = options.value;
	}
}

export class Tabs extends Group<Tab> {
	#options: TabsOptions;
	active = $derived(this.items.filter((item) => item.active).map((item) => item.value));

	constructor(options: TabsOptions) {
		super(options);
		this.#options = options;
		this.focusOptions = {
			...options,
			onFocus: (from, to) => {
				if (options?.activateOnFocus) {
					this.items.find((i) => i.value === to.getAttribute("value"))?.on();
					this.items.find((i) => i.value === from.getAttribute("value"))?.off();
				}
			},
		};
	}

	createTablist = () => {
		return new ChocoBase({
			role: role.tablist,
			ariaOrientation: this.#options.orientation,
			ariaMultiSelectable: "false",
		});
	};

	createItem = (options: Omit<TabOptions, "active">): Tab => {
		// Make sure at least the first tab is active
		const isActive =
			this.#options.value === undefined && this.items.length === 0
				? true
				: options.value === this.#options.value;

		const item = new Tab({ value: options.value, active: isActive });
		if (this.focusAction) {
			item.extendActions(this.focusAction);
		}
		this.items.push(item);
		return item;
	};
}
