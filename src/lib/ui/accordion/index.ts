import type { Accordion } from "$lib/components/accordion.svelte.js";
import { getContext, setContext } from "svelte";
import Root from "./accordion.svelte";
import Item from "./item.svelte";

const key = Symbol();

export function set(accordion: Accordion) {
	setContext(key, accordion);
}

export function get() {
	return getContext<Accordion>(key);
}

export { Item, Root };
