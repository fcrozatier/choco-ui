import Root from "./switch-group.svelte";
import Item from "./switch-group-item.svelte";
import { getContext, setContext } from "svelte";
import type { SwitchGroup } from "$lib/components/switch-group.svelte";

const key = Symbol();

export function set(group: SwitchGroup) {
	setContext(key, group);
}

export function get() {
	return getContext<SwitchGroup>(key);
}

export { Root, Item, Root as SwitchGroup, Item as SwitchItem };
