import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus.svelte";
import type { Action } from "svelte/action";
import type { Togglable } from "$lib/mixins/togglable.svelte";

export type GroupOptions = {
	focus?: ManageFocusOptions;
	/**
	 * Whether focusing an item immediately activates it. Defaults to `false`
	 */
	activateOnFocus?: boolean;
	/**
	 * Whether only a single item can be active at a time. Defaults to `false`
	 */
	single?: boolean;
};

/**
 * The focus action enhances the keyboard navigability of your components
 *
 * Since it relies on setting `tabindex='-1'` on some elements, the behavior is only added if js is enabled to ensure improving the experience and not degrading it.
 *
 * If js is not available then the elements have their default focus behavior.
 */
export const Group = <T extends ReturnType<typeof Togglable>>(superclass: T) => {
	return class {
		#itemsMap: Map<HTMLElement, InstanceType<T>> = new Map();
		#focusAction: Action;

		options?: GroupOptions;
		items: InstanceType<T>[] = $state([]);
		Item: T;

		activeItems = $derived(this.items.filter((item) => item.active));

		constructor(options?: GroupOptions) {
			this.options = options;

			const map = this.#itemsMap;
			this.#focusAction = manageFocus({
				...options?.focus,
				onFocus(from, to) {
					options?.focus?.onFocus?.(from, to);

					if (options?.activateOnFocus) {
						map.get(from)?.off();
						map.get(to)?.on();
					}
				},
			});

			this.Item = this.#Focusable(superclass);
		}

		#Focusable = (superclass: T) => {
			const options = this.options;
			const items = this.items;
			const map = this.#itemsMap;
			const focus = this.#focusAction;

			return class extends superclass {
				constructor(...options: any[]) {
					super(...options);

					this.extendActions((node) => {
						map.set(node, this as InstanceType<T>);
					});
					this.extendActions(focus);

					items.push(this as InstanceType<T>);
				}

				override toggle() {
					super.toggle();

					if (this.active && options?.single) {
						for (const other of items) {
							if (other.active && other !== this) {
								other.off();
							}
						}
					}
				}
			};
		};
	};
};
