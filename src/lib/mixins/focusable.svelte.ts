import { ChocoBase } from "../components/base.svelte";
import type { Constructor } from "./types";
import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";

/**
 * The focus mixin enhances the keyboard navigability of your components
 *
 * Since it relies on setting `tabindex='-1'` on some elements, the behavior is only added if js is enabled to ensure improving the experience and not degrading it.
 *
 * If js is not available then the elements have their default focus behavior.
 */
export const FocusMixin = (superclass: Constructor<ChocoBase>) => {
	return class extends superclass {
		#focusManager: ReturnType<typeof manageFocus>;

		constructor(options: ManageFocusOptions) {
			super(options);
			this.#focusManager = manageFocus(options);
		}

		override action(node: HTMLElement) {
			const cleanup = this.#focusManager(node);
			const cleanup2 = super.action(node);

			return {
				destroy() {
					cleanup.destroy();
					cleanup2.destroy();
				},
			};
		}
	};
};