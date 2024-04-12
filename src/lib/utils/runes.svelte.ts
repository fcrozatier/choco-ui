import type { Action, ActionReturn } from "svelte/action";

/**
 * Helps keep two reactive values in sync.
 *
 * Takes in the two getters and setters
 */
export function sync<T>(
	getA: () => T,
	getB: () => T,
	setA: (newA: T) => void,
	setB: (newB: T) => void,
) {
	let a = getA();
	let b = getB();

	$effect.pre(() => {
		const [newA, newB] = [getA(), getB()];

		if (a !== newA) {
			a = newA;
			b = newA;
			setB(newA);
		} else if (b !== newB) {
			a = newB;
			b = newB;
			setA(newB);
		}
	});
}

/**
 * Turn many parameter-less actions into one action
 */
export function combineActions<T extends Action>(...actions: T[]) {
	return ((node) => {
		const cleanups: (void | ActionReturn)[] = [];
		for (const action of actions) {
			const cleanup = action(node);
			cleanups.push(cleanup);
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
