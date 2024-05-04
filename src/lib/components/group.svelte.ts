import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import type { Action } from "svelte/action";
import type { ChocoBase } from "./base.svelte";
import { combineActions } from "$lib/actions/combineActions";

export class Group<T extends ChocoBase> {
	#items: T[] = $state([]);

	push = (item: T) => {
		this.#items.push(item);
	};
}

/**
 * The focus action enhances the keyboard navigability of your components
 *
 * Since it relies on setting `tabindex='-1'` on some elements, the behavior is only added if js is enabled to ensure improving the experience and not degrading it.
 *
 * If js is not available then the elements have their default focus behavior.
 */
export class FocusGroup<T extends ChocoBase> {
	items: T[] = $state([]);

	focusAction: Action | undefined;

	constructor(options?: ManageFocusOptions | false) {
		if (options !== false) {
			this.focusAction = manageFocus(options);
		}
	}

	push = (item: T) => {
		if (this.focusAction) {
			item.action = combineActions(item.action, this.focusAction);
		}
		this.items.push(item);
	};
}
