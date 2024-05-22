import type { Action } from "svelte/action";

type Listener<K extends keyof HTMLElementEventMap> = (
	this: HTMLElement,
	ev: HTMLElementEventMap[K],
) => void;

/**
 * Listen to one or many events and fire a callback
 */
export const addListener = <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
	events: K | K[],
	callback: Listener<K>,
) => {
	return ((node) => {
		const eventsArray = Array.isArray(events) ? events : [events];

		for (const event of eventsArray) {
			node.addEventListener(event, callback);
		}

		return {
			destroy() {
				for (const event of eventsArray) {
					node.removeEventListener(event, callback);
				}
			},
		};
	}) satisfies Action<T>;
};
