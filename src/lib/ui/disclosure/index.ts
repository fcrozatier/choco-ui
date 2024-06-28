import type { Disclosure } from "$lib/components/disclosure.svelte.js";
import { getContext, setContext } from "svelte";
import DisclosureUI from "./disclosure.svelte";

const key = Symbol();

export function set(disclosure: Disclosure) {
	setContext(key, disclosure);
}

export function get() {
	return getContext<Disclosure>(key);
}

export { DisclosureUI };
