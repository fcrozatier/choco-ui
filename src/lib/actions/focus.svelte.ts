import { key } from "$lib/utils/keyboard";
import { modulo } from "@fcrozatier/ts-helpers";
import type { Action } from "svelte/action";

export type ManageFocusOptions = {
	loop?: boolean;
	/**
	 * With roving focus, only one item in the list is focusable at a given time and the tab sequence will come back to this item (persistence). Arrows are used to focus another item of the collection
	 */
	roving?: boolean;
	onFocus?: <T extends HTMLElement>(from: T, to: T) => void;
};

const defaults: ManageFocusOptions = {
	loop: true,
	roving: true,
};

/**
 * Manage focus in a composite widget with the keyboard arrows.
 *
 */
export const manageFocus = (options?: ManageFocusOptions) => {
	options = { ...defaults, ...options };
	const items: HTMLElement[] = $state([]);

	const handleKeydown = (e: KeyboardEvent) => {
		const index = items.findIndex((tab) => tab === e.currentTarget);
		let newIndex = index;

		switch (e.key) {
			case key.ARROW_LEFT:
			case key.ARROW_UP:
				newIndex = options.loop ? modulo(index - 1, items.length) : Math.max(0, index - 1);
				break;
			case key.ARROW_RIGHT:
			case key.ARROW_DOWN:
				newIndex = options.loop
					? (index + 1) % items.length
					: Math.min(items.length - 1, index + 1);
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

		e.preventDefault(); // Avoid firing scroll events.

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

		for (let item of items) {
			if (options.roving) {
				// Focuses the first active element if any
				if (
					!focusable &&
					(item.ariaSelected === "true" ||
						item.ariaPressed === "true" ||
						item.ariaChecked === "true" ||
						(item instanceof HTMLInputElement && item.checked))
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
		node.addEventListener("keydown", handleKeydown);
		items.push(node);

		return {
			destroy() {
				node.removeEventListener("keydown", handleKeydown);
			},
		};
	}) satisfies Action;
};

/**
 * A node is focusable if it is:
 * - an anchor or area element with an `href` attribute
 * - an input, select, textarea or button that is not disabled
 * - an iframe
 * - an element with a non negative `tabindex`
 * - an element with a truthy `contenteditable`
 *
 * [Ref](https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194)
 */
export const isFocusable = (node: HTMLElement) => {
	return (
		node.querySelector(
			":is(:is(a, area)[href], :is(input, select, textarea, button):not(:disabled), iframe, [tabindex], [contenteditable]):not([tabindex='-1']):not([contenteditable='false'])",
		) !== null
	);
};

/**
 * Make a container node focusable if none of its children can be focused
 */
export const makeFocusable = (node: HTMLElement) => {
	if (!isFocusable(node)) {
		node.tabIndex = 0;
	}
};
