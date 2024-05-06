import type { Action } from "svelte/action";
import type { Orientation } from "$lib/internal/types";
import { role } from "$lib/utils/roles";
import { type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import { isFocusable } from "$lib/actions/focus/focusHelper";
import { createTogglerGroup } from "../toggler-group/toggler-group.svelte";
import { createToggler } from "../toggler/toggler.svelte";

export interface TabsOptions extends Omit<ManageFocusOptions, "roving"> {
	activateOnFocus?: boolean;
	orientation?: Orientation;
	/**
	 * Whether the tablist properties (role, orientation) are added automatically (defaults to `true`). If `false` you'll have to add them manually.
	 */
	managed?: boolean;
	/**
	 * The default open tab value. If not provided the first tab is open
	 */
	value?: string;
}

export type CreateTab = ReturnType<typeof createTabs>["createTab"];
export type CreatePanel = ReturnType<typeof createTabs>["createPanel"];

const defaults = {
	activateOnFocus: true,
	orientation: "horizontal",
	managed: true,
} satisfies TabsOptions;

/**
 * Tabs
 *
 * If the tab list has a visible label, the TabList element has `aria-labelledby` set to a value that refers to the labelling element. Otherwise, the TabList element has a label provided by `aria-label`.
 *
 * [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
 */
export const createTabs = (options?: TabsOptions) => {
	const state = $state({ ...defaults, ...options });
	const tabs = createTogglerGroup({
		...options,
		parentRole: "tablist",
		exclusive: true,
		focus: {
			onFocus: (_, to) => {
				if (options?.activateOnFocus) {
					to.click();
				}
			},
		},
	});

	const createTab = ((node, options: { value: string }) => {
		node.value = options.value;
		node.role = role.tab;

		const toggler = createToggler({
			control: { "aria-selected": "false" },
			target: { "aria-expanded": "false", hidden: true },
			labelledBy: true,
		});

		toggler.control(node);

		// Initially open tab
		if (state.value === options.value) {
			toggler.on();
		}

		tabs.addItem({ toggler }, options.value);
	}) satisfies Action<HTMLButtonElement, { value: string }>;

	const createPanel = ((node, options: { value: string }) => {
		node.role = role.tabpanel;

		$effect(() => {
			const item = tabs.getItem(options.value);
			if (item) {
				item.toggler?.target(node);
			}
		});

		// Make sure the panel is in the tab sequence
		if (!isFocusable(node)) {
			node.tabIndex = 0;
		}
	}) satisfies Action<HTMLDivElement, { value: string }>;

	$effect(() => {
		if (state.managed && tabs.root) {
			tabs.root.role = role.tablist;
			tabs.root.ariaOrientation = state.orientation;
			tabs.root.ariaMultiSelectable = "false";
		}
	});

	// Make sure at least one tab is active
	$effect(() => {
		if (tabs.active.length === 0) {
			tabs.items[0]?.toggler?.on();
		}
	});

	return {
		createTab,
		createPanel,
	};
};
