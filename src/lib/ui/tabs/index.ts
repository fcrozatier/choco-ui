import Panel from "./tabpanel.svelte";
import Root from "./tabs.svelte";
import Tab from "./tab.svelte";
import TabList from "./tablist.svelte";
import { getContext, setContext } from "svelte";
import type { Tabs } from "$lib/components/tabs.svelte";

const key = Symbol();

export function setTabsContext(tabs: Tabs) {
	setContext(key, tabs);
}

export function getTabsContext() {
	return getContext<Tabs>(key);
}

export { Root, Panel, Tab, TabList };
