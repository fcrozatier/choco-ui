import type { SwitchGroup } from "$lib/headless/switch-group.svelte.js";
import { getContext, setContext } from "svelte";
import Item from "./switch-group-item.svelte";
import Root from "./switch-group.svelte";

const key = Symbol();

export function set(group: SwitchGroup) {
	setContext(key, group);
}

export function get() {
	return getContext<SwitchGroup>(key);
}

export { Item, Root };
