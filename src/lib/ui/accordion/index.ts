import Root from "./accordion.svelte";
import Item from "./item.svelte";
import { getContext, setContext } from "svelte";
import type { Accordion } from "$lib/components/accordion.svelte";

const key = Symbol();

export function set(accordion: Accordion) {
	setContext(key, accordion);
}

export function get() {
	return getContext<Accordion>(key);
}

export { Root, Item };
