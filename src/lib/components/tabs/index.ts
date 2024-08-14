import type { Tabs, TabsOptions } from "$lib/headless/tabs.svelte.js";
import type { OmitSupertype } from "$lib/mixins/types.js";
import { getContext, setContext, type Snippet } from "svelte";
import Tab from "./tab.svelte";
import TabList from "./tablist.svelte";
import Panel from "./tabpanel.svelte";
import Root from "./tabs.svelte";

export type TabsProps = OmitSupertype<
  TabsOptions,
  { focus?: { active?: string[] | (() => string[]); setActive?: (v: string[]) => void } }
> & {
  active?: string[];
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
