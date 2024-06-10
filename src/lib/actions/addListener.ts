import type { Action } from "svelte/action";
import { on } from "svelte/events";

/**
 * Creates an action for handling one or many events with a callback.
 *
 * Preserves the correct order of event handlers with respect to event delegation by relying on Svelte for orchestrating the handlers creation.
 */
export const addListener = <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
	events: K | K[],
	callback: EventListener,
	options?: AddEventListenerOptions,
) => {
	return ((node) => {
		const eventsArray = Array.isArray(events) ? events : [events];
		const cleanups: (() => void)[] = [];

		for (const event of eventsArray) {
			cleanups.push(on(node, event, callback, options));
		}

		return {
			destroy() {
				for (const cleanup of cleanups) {
					cleanup();
				}
			},
		};
	}) satisfies Action<T>;
};
