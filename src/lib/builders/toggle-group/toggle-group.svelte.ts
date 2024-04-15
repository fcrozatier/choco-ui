import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";
import { createPressToggle, type CreateToggle, type ToggleElement } from "../toggle/press.svelte";
import { nanoId } from "$lib/utils/nano";
import { modulo } from "@fcrozatier/ts-helpers";
import { combineActions } from "$lib/utils/runes.svelte";

export type CreateToggleGroup = {
	name?: string;
	loop?: boolean;
};

export type CreateToggleGroupItem = ReturnType<typeof createToggleGroup>["createItem"];
export type ToggleGroupItem = ReturnType<typeof createPressToggle> & { value: string };

const defaults = {
	loop: true,
} satisfies CreateToggleGroup;

/**
 * Toggle Group
 *
 */
export const createToggleGroup = (options?: CreateToggleGroup) => {
	const name = "toggle-group-" + nanoId();
	const state = $state({ ...defaults, ...options, name: options?.name ?? name });
	const items: ToggleGroupItem[] = $state([]);
	let root: HTMLFieldSetElement | undefined = $state();

	const pressed = $derived(items.filter((i) => i.state.pressed === true).map((i) => i.value));
	const mixed = $derived(items.filter((i) => i.state.pressed === "mixed").map((i) => i.value));

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

	const createItem = (options: CreateToggle & { value: string }) => {
		const value = options.value;
		const toggle = createPressToggle({ ...options });

		const item: ToggleGroupItem = Object.assign(toggle, { value });

		const action = ((node) => {
			items.push(item);

			node.value = value;
			node.name = state.name;

			(node as HTMLElement).addEventListener("keydown", handleKeydown);

			return {
				destroy() {
					(node as HTMLElement).removeEventListener("keydown", handleKeydown);
				},
			};
		}) satisfies Action<NonNullable<ToggleElement>>;

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
