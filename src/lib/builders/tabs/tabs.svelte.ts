import type { Action } from "svelte/action";
import type { Orientation } from "$lib/internal/types";
import { role } from "$lib/utils/roles";
import { updateAttribute } from "$lib/internal/helpers";
import { nanoId } from "$lib/utils/nano";
import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import { hasFocusableChild } from "$lib/actions/focus/focusHelper";

export type CreateTabs = {
	focus?: Omit<ManageFocusOptions, "roving" | "onFocus"> & { activateOnFocus?: boolean };
	orientation?: Orientation;
	/**
	 * The default open tab value. If not provided the first tab is open
	 */
	value?: string;
};

export type CreateTabList = ReturnType<typeof createTabs>["action"];
export type CreateTab = ReturnType<typeof createTabs>["createTab"];
export type CreatePanel = ReturnType<typeof createTabs>["createPanel"];

const defaults = {
	focus: { activateOnFocus: true },
	orientation: "horizontal",
} satisfies CreateTabs;

/**
 * Tabs
 *
 * If the tab list has a visible label, the TabList element has `aria-labelledby` set to a value that refers to the labelling element. Otherwise, the TabList element has a label provided by `aria-label`.
 *
 * [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
 */
export const createTabs = (options?: CreateTabs) => {
	const state = $state({ ...defaults, ...options });
	const tabs: HTMLButtonElement[] = $state([]);
	const panels: HTMLDivElement[] = $state([]);
	const sync: { control: string; value: string; controls: string }[] = [];

	const handleClick = (e: Event) => {
		const tab = e.currentTarget as HTMLElement;
		openTab(tab);
	};

	const openTab = (tab: HTMLElement) => {
		tab.ariaSelected = "true";

		tabs.forEach((item) => {
			if (item !== tab) {
				item.ariaSelected = "false";
			}
		});

		panels.forEach((panel) => {
			if (panel.id === tab.getAttribute("aria-controls")) {
				panel.ariaExpanded = "true";
				panel.hidden = false;
			} else {
				panel.ariaExpanded = "false";
				panel.hidden = true;
			}
		});
	};

	const focusGroup = manageFocus({
		roving: true,
		onFocus: state.focus.activateOnFocus ? openTab : undefined,
		...state.focus,
	});

	const createTab = ((node, options: { value: string }) => {
		node.value = options.value;
		node.role = role.tab;

		// Initially open tab
		if (state.value) {
			node.ariaSelected = options.value === state.value ? "true" : "false";
		} else {
			node.ariaSelected = tabs.length === 0 ? "true" : "false";
		}

		const id = nanoId();
		const controls = nanoId();
		updateAttribute(node, "aria-controls", controls);

		focusGroup(node);
		node.addEventListener("click", handleClick);

		tabs.push(node);
		sync.push({ control: id, value: options.value, controls });

		return {
			destroy() {
				node.removeEventListener("click", handleClick);
			},
		};
	}) satisfies Action<HTMLButtonElement, { value: string }>;

	const createPanel = ((node, options: { value: string }) => {
		const s = sync.find((s) => s.value === options.value);
		if (!s) throw Error("Cannot find tab with corresponding value");

		node.id = s.controls;
		node.role = role.tabpanel;

		// Make sure the panel can be reached
		if (!hasFocusableChild(node)) {
			node.tabIndex = 0;
		}
		updateAttribute(node, "aria-labelledby", s.control);

		if (state.value) {
			node.ariaExpanded = s.value === state.value ? "true" : "false";
		} else {
			node.ariaExpanded = panels.length === 0 ? "true" : "false";
		}

		if (node.ariaExpanded !== "true") {
			node.hidden = true;
		}

		panels.push(node);
	}) satisfies Action<HTMLDivElement, { value: string }>;

	return {
		state: {
			get openTab() {
				return tabs.find((tab) => tab.ariaSelected === "true");
			},
		},

		action: ((node) => {
			node.role = role.tablist;
			node.ariaOrientation = state.orientation;
			node.ariaMultiSelectable = "false";
		}) satisfies Action,

		createTab,
		createPanel,

		options,
	};
};
