import type { Tabs, TabsOptions } from "$lib/headless/tabs.svelte.js";
import type { OmitSupertype } from "$lib/utils/types.js";
import { getContext, setContext, type Snippet } from "svelte";
import Tab from "./tab.svelte";
import TabList from "./tablist.svelte";
import Panel from "./tabpanel.svelte";
import Root from "./tabs.svelte";

export type TabsProps = OmitSupertype<
  TabsOptions,
  { focus?: { group?: string[] | (() => string[]); setGroup?: (v: string[]) => void } }
> & {
  group?: string[];
  class?: string;
  children: Snippet;
};

const key = Symbol();

export function setTabsContext(tabs: Tabs) {
  setContext(key, tabs);
}

export function getTabsContext() {
  return getContext<Tabs>(key);
}

export { Panel, Root, Tab, TabList };
