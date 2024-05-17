import { makeFocusable } from "$lib/actions/focus.svelte";
import type { Orientation } from "$lib/internal/types";
import { Controllable } from "$lib/mixins/controllable.svelte";
import { Togglable } from "$lib/mixins/togglable.svelte";
import type { OmitSubtype } from "$lib/mixins/types";
import { role } from "$lib/utils/roles";
import { ChocoBase } from "./base.svelte";
import { Group, type GroupOptions } from "./group.svelte";

export type TabsOptions = OmitSubtype<GroupOptions, { focus?: { roving?: boolean } }> & {
	orientation?: Orientation;
	/**
	 * The default active tab. If not provided defaults to the first tab
	 */
	value?: string;
};

const defaults = {
	activateOnFocus: true,
	orientation: "horizontal",
} satisfies TabsOptions;

type TabOptions = {
	value: string;
	/**
	 * Whether the tab is the default active tab. If not provided the first tab is active
	 */
	active?: boolean;
};

class Tab extends Controllable(Togglable(ChocoBase)) {
	value: string;

	constructor(options: TabOptions) {
		super();
		this.initControllable({
			control: { "aria-selected": `${options.active ?? false}` },
			target: { "aria-expanded": `${options.active ?? false}`, hidden: !options.active },
			active: options.active ?? false,
			labelledBy: true,
		});
		this.extendAttributes({ role: role.tab, value: options.value });
		this.target.extendAttributes({ role: role.tabpanel });
		// Make sure the panel is in the tab sequence
		this.target.extendActions(makeFocusable);

		this.value = options.value;
	}
}

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
