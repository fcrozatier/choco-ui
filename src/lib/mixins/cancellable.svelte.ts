import { mergeActions } from "$lib/actions/combineActions.js";
import { type ChocoBase } from "$lib/components/base.svelte.js";
import { ToggleBase } from "$lib/mixins/togglable.svelte.js";
import type { Action } from "svelte/action";
import type { Constructor } from "./types.js";

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
	return class extends superclass {
		#canceller;

		override get attributes() {
			return { ...this.#canceller.attributes, ...super.attributes };
		}

		override get action(): Action<U> {
			return mergeActions(this.#canceller.action, super.action);
		}

		constructor(...options: any[]) {
			super(...options);

			this.#canceller = new ToggleBase();
			this.#canceller.initTogglable({
				initial: { "data-active": false },
				active: false,
				on: "pointerdown",
				off: ["pointerup", "pointerleave"],
			});
		}
	};
};
