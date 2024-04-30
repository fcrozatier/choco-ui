import type { Action } from "svelte/action";

type Listener<K extends keyof HTMLElementEventMap> = (
	this: HTMLElement,
	ev: HTMLElementEventMap[K],
) => void;

/**
 * Add listener action builder
 */
export const addListener = <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
	event: K,
	callback: Listener<K>,
) => {
	return ((node) => {
		node.addEventListener(event, callback);

		return {
			destroy() {
				node.removeEventListener(event, callback);
			},
		};
	}) satisfies Action<T>;
};
