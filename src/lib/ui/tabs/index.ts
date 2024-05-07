import Panel from "./tabpanel.svelte";
import Root from "./tabs.svelte";
import Tab from "./tab.svelte";
import TabList from "./tablist.svelte";
import { getContext, setContext } from "svelte";
import type { Tabs } from "$lib/components/tabs.svelte";

const tabsSymbol = Symbol();

export function setTabsContext(tabs: Tabs) {
	setContext(tabsSymbol, tabs);
}

export function getTabsContext() {
	return getContext<Tabs>(tabsSymbol);
}

export {
	Root,
	Panel,
	Tab,
	TabList,
	//
	Root as Tabs,
	Panel as TabsPanel,
	Tab as TabsTrigger,
};
