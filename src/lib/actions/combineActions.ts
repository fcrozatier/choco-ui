import type { Action, ActionReturn } from "svelte/action";

/**
 * Turn many parameter-less actions into one action
 */
export function mergeActions<T extends Action<unknown>[]>(...actions: T) {
	return ((node) => {
		const cleanups: (void | ActionReturn)[] = [];
		for (const action of actions) {
			cleanups.push(action(node));
		}

		return {
			destroy() {
				for (const cleanup of cleanups) {
					cleanup?.destroy?.();
				}
			},
		};
	}) satisfies Action;
}
