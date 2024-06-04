import { addListener } from "$lib/actions/addListener";
import type { Togglable } from "$lib/mixins/togglable.svelte";
import { key } from "$lib/utils/keyboard";
import { modulo, trimUndefined } from "@fcrozatier/ts-helpers";
import { Map as RMap } from "svelte/reactivity";

export type GroupOptions = {
	loop?: boolean;
	/**
	 * With roving focus, only one item in the list is in the tab sequence. Arrows are used to focus another item of the collection
	 */
	roving?: boolean;
	/**
	 * Prevents having no active elements
	 */
	preventInactivation?: boolean;
	onFocus?: <T extends HTMLElement>(from: T, to: T) => void;
} & (
	| {
			/**
			 * Whether only a single item can be active at a time. Defaults to `false`
			 */
			exclusive?: true;
			/**
			 * Whether focusing an item immediately activates it. This only makes sense when the group is `exclusive`. Defaults to `false`
			 */
			activateOnFocus?: boolean;
	  }
	| {
			exclusive?: false;
	  }
);

const defaults = {
	loop: false,
	roving: false,
	preventInactivation: false,
	exclusive: false,
} satisfies GroupOptions;

/**
 * Manages focus in a composite widget with the keyboard arrows.
 *
 * The behavior is only added if js is enabled through an action to ensure improving the experience and not degrading it, since roving focus relies on setting `tabindex='-1'` on some elements.
 *
 * If js is not available then the elements have their default focus behavior.
 */
export const Group = <T extends ReturnType<typeof Togglable>>(superclass: T) => {
	return class {
		#itemsMap: Map<HTMLElement, InstanceType<T>> = new RMap();

		options: GroupOptions;
		items: InstanceType<T>[] = $state([]);
		Item: T;

		activeItems = $derived(this.items.filter((item) => item.active));

		constructor(options?: GroupOptions) {
			this.options = { ...defaults, ...trimUndefined(options) };
			this.Item = this.#Focusable(superclass);
		}

		#handleKeydown = (e: KeyboardEvent) => {
			const target = e.currentTarget;
			if (!(target instanceof HTMLElement)) return;

			const index = this.items.findIndex((item) => item === this.#itemsMap.get(target));
			let newIndex = index;

			switch (e.key) {
				case key.ARROW_LEFT:
				case key.ARROW_UP:
					newIndex = this.options.loop
						? modulo(index - 1, this.items.length)
						: Math.max(0, index - 1);
					break;
				case key.ARROW_RIGHT:
				case key.ARROW_DOWN:
					newIndex = this.options.loop
						? (index + 1) % this.items.length
						: Math.min(this.items.length - 1, index + 1);
					break;
				case key.HOME:
					newIndex = 0;
					break;
				case key.END:
					newIndex = this.items.length - 1;
					break;
				default:
					return;
			}

			e.preventDefault(); // Avoid firing scroll events

			const oldItem = this.items[index];
			const newItem = this.items[newIndex];
			const from = target;
			const to = this.items.find((item) => item === newItem)?.element;

			if (oldItem && newItem && from && to) {
				// Update tab sequence
				if (this.options.roving) {
					from.tabIndex = -1;
					to.tabIndex = 0;
				}
				to.focus();

				if (this.options.exclusive === true && this.options.activateOnFocus) {
					newItem.active = true;
				}

				this.options?.onFocus?.(from, to);
			}
		};

		#Focusable = (superclass: T) => {
			const options = this.options;
			const items = this.items;
			const map = this.#itemsMap;
			const focus = this.#handleKeydown;

			return class extends superclass {
				constructor(...args: any[]) {
					super(...args);

					this.extendActions((node) => {
						if (options.roving) {
							// By default the first item of the list is focusable. If provided, the active item is focusable
							if (map.size === 0 || this.active) {
								node.tabIndex = 0;
								map.forEach((_, element) => {
									element.tabIndex = -1;
								});
							} else {
								node.tabIndex = -1;
							}
						}

						map.set(node, this as InstanceType<T>);
					});
					this.extendActions(addListener("keydown", focus));

					items.push(this as InstanceType<T>);
				}

				override toggle() {
					// Prevent toggling off the current active element
					if (
						options?.preventInactivation &&
						this.active &&
						items.every((item) => item === this || !item.active)
					) {
						return;
					}

					super.toggle();

					if (this.active && options?.exclusive) {
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
