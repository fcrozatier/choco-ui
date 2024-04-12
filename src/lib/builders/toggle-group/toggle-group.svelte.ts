import { updateBooleanAttribute } from "$lib/internal/helpers";
import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";
import { createPressToggle, type CreateToggle } from "../toggle/press.svelte";
import { nanoId } from "$lib/utils/nano";
import { modulo } from "@fcrozatier/ts-helpers";
import { combineActions } from "$lib/utils/runes.svelte";

export type CreateToggleGroup = {
	name?: string;
	loop?: boolean;
	disabled?: boolean | undefined;
};

export type CreateToggleGroupItem = ReturnType<typeof createToggleGroup>["createItem"];
export type ToggleGroupItem = ReturnType<typeof createPressToggle> & { value: string };

const defaults = {
	loop: true,
	disabled: undefined,
} satisfies CreateToggleGroup;

/**
 * Toggle Group
 *
 */
export const createToggleGroup = (options?: CreateToggleGroup) => {
	const name = "toggle-group-" + nanoId();
	const state = $state({ ...defaults, ...options, name: options?.name ?? name });
	const items: ToggleGroupItem[] = $state([]);

	let root: HTMLElement | undefined = $state();
	let pressed = $derived(items.filter((i) => i.state.pressed).map((i) => i.value));
	let mixed = $derived(items.filter((i) => i.state.pressed === "mixed").map((i) => i.value));

	const handleKeydown = (e: KeyboardEvent) => {
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
		let element: HTMLElement | undefined = $state();
		let value = $state(options.value);
		const toggle = createPressToggle({ disabled: state.disabled, ...options });

		const item: ToggleGroupItem = $state(Object.assign(toggle, { value }));

		$effect(() => {
			element?.setAttribute("data-value", value);
			element?.setAttribute("name", state.name);
		});

		const action = ((node) => {
			items.push(item);
			element = node;
			node.addEventListener("keydown", handleKeydown);

			return {
				destroy() {
					node.removeEventListener("keydown", handleKeydown);
				},
			};
		}) satisfies Action;

		item.action = combineActions(item.action, action);

		return item;
	};

	const cleanup = $effect.root(() => {
		$effect(() => {
			updateBooleanAttribute(root, "disabled", state.disabled);
			if (state.disabled !== undefined) {
				for (const item of items) {
					item.state.disabled = state.disabled;
				}
			}
		});
	});

	return {
		state: {
			get disabled() {
				return state.disabled;
			},

			set disabled(newVal) {
				state.disabled = newVal;
			},

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

			if (!(root instanceof HTMLFieldSetElement)) {
				root.setAttribute("role", "group");
			}

			updateBooleanAttribute(root, "disabled", state.disabled);

			return {
				destroy() {
					cleanup();
				},
			};
		}) satisfies Action,

		options,
		element: root,
	};
};
