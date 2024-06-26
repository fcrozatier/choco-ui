import { ChocoBase } from "$lib/components/base.svelte";
import { Togglable } from "$lib/mixins/togglable.svelte";
import type { Constructor } from "./types";

/**
 * ## Cancellable
 *
 * Adds a `data-active` attribute to normalize the `:active` state for better styling: the `data-active` attribute is removed when the cursor leaves the target (which is not the case with the CSS `:active` pseudo selector), even when it is still pressed, to convey the cancellability of the action (which will not trigger).
 */
export const Cancellable = <
	U extends HTMLElement = HTMLElement,
	T extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
	superclass: T,
) => {
	return class extends Togglable(superclass) {
		constructor(...options: any[]) {
			super(...options);

			this.initTogglable({
				initial: { "data-active": false },
				active: false,
				on: "pointerdown",
				off: ["pointerup", "pointerleave"],
			});
		}
	};
};
