import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";
import { modulo } from "@fcrozatier/ts-helpers";
import type { Orientation } from "$lib/internal/types";
import { role } from "$lib/utils/roles";
import { updateAttribute } from "$lib/internal/helpers";
import { nanoId } from "$lib/utils/nano";

export type CreateTabs = {
	loop?: boolean;
	activateOnFocus?: boolean;
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
	loop: true,
	activateOnFocus: true,
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

	const handleKeydown = (e: KeyboardEvent) => {
		const keys: string[] = [key.ARROW_LEFT, key.ARROW_RIGHT, key.HOME, key.END];
		if (!keys.includes(e.key)) return;

		const index = tabs.findIndex((tab) => tab === e.currentTarget);
		let newIndex = index;

		if (e.key === key.ARROW_LEFT) {
			newIndex = state.loop ? modulo(index - 1, tabs.length) : Math.max(0, index - 1);
		}
		if (e.key === key.ARROW_RIGHT) {
			newIndex = state.loop ? (index + 1) % tabs.length : Math.min(tabs.length - 1, index + 1);
		}
		if (e.key === key.HOME) {
			newIndex = 0;
		}
		if (e.key === key.END) {
			newIndex = tabs.length - 1;
		}

		const newTab = tabs[newIndex];
		if (newTab) {
			newTab.focus();

			if (state.activateOnFocus) {
				openTab(newTab);
			}
		}
	};

	const handleClick = (e: Event) => {
		const tab = e.currentTarget as HTMLElement;
		openTab(tab);
	};

	const openTab = (tab: HTMLElement) => {
		tab.ariaSelected = "true";
		tab.tabIndex = 0;

		tabs.forEach((item) => {
			if (item !== tab) {
				item.ariaSelected = "false";
				item.tabIndex = -1;
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

	const createTab = ((node, options: { value: string }) => {
		node.value = options.value;
		node.role = role.tab;

		// Initially open tab
		if (state.value) {
			node.ariaSelected = options.value === state.value ? "true" : "false";
		} else {
			node.ariaSelected = tabs.length === 0 ? "true" : "false";
		}

		if (node.ariaSelected === "true") {
			node.tabIndex = 0;
		} else {
			node.tabIndex = -1;
		}

		const id = nanoId();
		const controls = nanoId();
		updateAttribute(node, "aria-controls", controls);

		(node as HTMLElement).addEventListener("keydown", handleKeydown);
		node.addEventListener("click", handleClick);

		tabs.push(node);
		sync.push({ control: id, value: options.value, controls });

		return {
			destroy() {
				(node as HTMLElement).removeEventListener("keydown", handleKeydown);
				node.removeEventListener("click", handleClick);
			},
		};
	}) satisfies Action<HTMLButtonElement, { value: string }>;

	const createPanel = ((node, options: { value: string }) => {
		const s = sync.find((s) => s.value === options.value);
		if (!s) throw Error("Cannot find tab with corresponding value");

		node.id = s.controls;
		node.role = role.tabpanel;
		node.tabIndex = 0;

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
