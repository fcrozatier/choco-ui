import type { Tabs } from "$lib/components/tabs.svelte.js";
import { getContext, setContext } from "svelte";
import Tab from "./tab.svelte";
import TabList from "./tablist.svelte";
import Panel from "./tabpanel.svelte";
import Root from "./tabs.svelte";

const key = Symbol();

export function setTabsContext(tabs: Tabs) {
	setContext(key, tabs);
}

export function getTabsContext() {
	return getContext<Tabs>(key);
}

export { Panel, Root, Tab, TabList };
