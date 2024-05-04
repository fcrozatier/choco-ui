import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import type { Action } from "svelte/action";
import type { ChocoBase } from "./base.svelte";

/**
 * The focus action enhances the keyboard navigability of your components
 *
 * Since it relies on setting `tabindex='-1'` on some elements, the behavior is only added if js is enabled to ensure improving the experience and not degrading it.
 *
 * If js is not available then the elements have their default focus behavior.
 */
export class Group<T extends ChocoBase> {
	items: T[] = $state([]);

	focusAction: Action | undefined;

	constructor(focus?: ManageFocusOptions | false) {
		if (focus !== false) {
			this.focusAction = manageFocus(focus);
		}
	}
}
