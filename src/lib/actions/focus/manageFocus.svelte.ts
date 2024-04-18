import { key } from "$lib/utils/keyboard";
import { modulo } from "@fcrozatier/ts-helpers";
import type { Action } from "svelte/action";

export type ManageFocusOptions = {
	loop?: boolean;
	/**
	 * With roving focus, only one item in the list is focusable at a given time and the tab sequence will come back to this item. Arrows are used to focus another item of the collection
	 */
	roving?: boolean;
	onFocus?: (from: HTMLElement, to: HTMLElement) => void;
};

const defaults = {
	loop: true,
	roving: true,
} satisfies ManageFocusOptions;

/**
 * Manage focus in a composite widget with the keyboard arrows.
 *
 */
export const manageFocus = (options?: ManageFocusOptions) => {
	const loop = options?.loop ?? defaults.loop;
	const roving = options?.roving ?? defaults.roving;
	const items: HTMLElement[] = [];

	const handleKeydown = (e: KeyboardEvent) => {
		const index = items.findIndex((tab) => tab === e.currentTarget);
		let newIndex = index;

		switch (e.key) {
			case key.ARROW_LEFT:
			case key.ARROW_UP:
				newIndex = loop ? modulo(index - 1, items.length) : Math.max(0, index - 1);
				break;
			case key.ARROW_RIGHT:
			case key.ARROW_DOWN:
				newIndex = loop ? (index + 1) % items.length : Math.min(items.length - 1, index + 1);
				break;
			case key.HOME:
				newIndex = 0;
				break;
			case key.END:
				newIndex = items.length - 1;
				break;
			default:
				return;
		}

		e.preventDefault(); // Avoid firing a scroll event.

		const oldItem = items[index];
		const newItem = items[newIndex];

		if (oldItem && newItem && oldItem !== newItem) {
			makeFocusable(newItem);
			newItem.focus();

			options?.onFocus?.(oldItem, newItem);
		}
	};

	const makeFocusable = (element: HTMLElement) => {
		for (const item of items) {
			if (item === element) {
				item.tabIndex = 0;
			} else {
				item.tabIndex = -1;
			}
		}
	};

	$effect(() => {
		let focusable: HTMLElement | undefined;

		for (let index = 0; index < items.length; index++) {
			const item = items[index];

			if (item && roving) {
				if (
					item.ariaSelected === "true" ||
					item.ariaPressed === "true" ||
					item.ariaChecked === "true"
				) {
					makeFocusable(item);
					focusable = item;
				} else {
					item.tabIndex = -1;
				}
			}
		}

		// By default focus the first item of the collection
		if (!focusable && items[0]) {
			makeFocusable(items[0]);
		}
	});

	return ((node) => {
		items.push(node);

		node.addEventListener("keydown", handleKeydown);

		return {
			destroy() {
				node.removeEventListener("keydown", handleKeydown);
			},
		};
	}) satisfies Action;
};
