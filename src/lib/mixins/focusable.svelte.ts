import { ChocoBase } from "../components/base.svelte";
import type { Constructor } from "./types";
import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import { combineActions } from "$lib/actions/combineActions";

/**
 * The focus mixin enhances the keyboard navigability of your components
 *
 * Since it relies on setting `tabindex='-1'` on some elements, the behavior is only added if js is enabled to ensure improving the experience and not degrading it.
 *
 * If js is not available then the elements have their default focus behavior.
 */
export const Focusable = <SuperOptions>(superclass: Constructor<ChocoBase, SuperOptions>) => {
	return class extends superclass {
		constructor(options: ManageFocusOptions & SuperOptions) {
			super(options);

			this.action = combineActions(manageFocus(options), super.action);
		}
	};
};
