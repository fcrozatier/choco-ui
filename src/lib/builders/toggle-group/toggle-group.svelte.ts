import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";
import { createToggle, type CreateToggle, type ToggleElement } from "../toggle/toggle.svelte";
import { modulo } from "@fcrozatier/ts-helpers";
import { combineActions } from "$lib/utils/runes.svelte";

export type CreateToggleGroup = {
	loop?: boolean;
};

export type CreateToggleGroupItem = typeof createToggle;
export type ToggleGroupItem = ReturnType<typeof createToggle>;

const defaults = {
	loop: true,
} satisfies CreateToggleGroup;

/**
 * Toggle Group
 *
 */
export const createToggleGroup = (options?: CreateToggleGroup) => {
	const state = $state({ ...defaults, ...options });
	const items: ToggleGroupItem[] = $state([]);
	let root: HTMLFieldSetElement | undefined = $state();

	const pressed = $derived(
		items.filter((i) => i.state.pressed === true).map((i) => i.element?.value),
	);
	const mixed = $derived(
		items.filter((i) => i.state.pressed === "mixed").map((i) => i.element?.value),
	);

	const handleKeydown = (e: KeyboardEvent) => {
		const keys = [key.ARROW_LEFT, key.ARROW_RIGHT, key.HOME, key.END];
		if (!keys.includes(e.key)) return;

		const index = items.findIndex((i) => i?.element === e.currentTarget);
		let newIndex = index;

		if (e.key === key.ARROW_LEFT) {
			newIndex = state.loop ? modulo(index - 1, items.length) : Math.max(0, index - 1);
		}
		if (e.key === key.ARROW_RIGHT) {
			newIndex = state.loop ? (index + 1) % items.length : Math.min(items.length - 1, index + 1);
		}
		if (e.key === key.HOME) {
			newIndex = 0;
		}
		if (e.key === key.END) {
			newIndex = items.length - 1;
		}
		items[newIndex]?.element?.focus();
	};

	const createItem = (options?: CreateToggle) => {
		const item = createToggle({ ...options });

		const action = ((node) => {
			items.push(item);

			(node as HTMLElement).addEventListener("keydown", handleKeydown);

			return {
				destroy() {
					(node as HTMLElement).removeEventListener("keydown", handleKeydown);
				},
			};
		}) satisfies Action<ToggleElement>;

		item.action = combineActions(item.action, action);

		return item;
	};

	$effect(() => {
		if (root?.disabled !== undefined) {
			for (const item of items) {
				if (item.element) {
					item.element.disabled = root.disabled;
				}
			}
		}
	});

	return {
		state: {
			get pressed() {
				return pressed;
			},

			get mixed() {
				return mixed;
			},
		},

		get items() {
			return items;
		},

		createItem,

		action: ((node) => {
			root = node;
		}) satisfies Action<HTMLFieldSetElement>,

		options,
		element: root,
	};
};
