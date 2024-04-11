import { updateBooleanAttribute } from "$lib/internal/helpers";
import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";
import { createPressToggle, type CreateToggle } from "../toggle/press.svelte";
import { nanoId } from "$lib/utils/nano";
import { once, modulo } from "@fcrozatier/ts-helpers";

export type CreateToggleGroup = {
	name?: string;
	loop?: boolean;
	disabled?: boolean | undefined;
};

export type CreateToggleGroupItem = ReturnType<typeof createToggleGroup>["createItem"];
type ToggleGroupItem = ReturnType<typeof createPressToggle> & { value: string };

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
	const state = $state({ ...defaults, name, ...options });
	const items: ToggleGroupItem[] = $state([]);

	let root: HTMLElement | undefined = $state();
	let pressed = $derived(items.filter((i) => i.state.pressed).map((i) => i.value));

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

	const createItem = () => {
		let value: string;
		let item: ReturnType<typeof createPressToggle> | undefined = $state();

		const toggleBuilder = (options?: CreateToggle) => {
			item = createPressToggle({ disabled: state.disabled, ...options });

			Object.defineProperty(item, "value", { value });

			const configureItem = once(() => {
				item?.element?.setAttribute("data-value", value);
				item?.element?.setAttribute("name", state.name);

				item?.element?.addEventListener("keydown", handleKeydown);
			});

			$effect(() => configureItem());

			items.push(item as ToggleGroupItem);

			return item;
		};

		return {
			builder: toggleBuilder,
			set value(v) {
				value = v;
			},
			get value() {
				return value;
			},
		};
	};

	const cleanup = $effect.root(() => {
		$effect(() => {
			if (state.disabled !== undefined) {
				updateBooleanAttribute(root, "disabled", state.disabled);

				for (const item of items) {
					if (item) {
						item.state.disabled = state.disabled;
					}
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
					for (const item of items) {
						item.element?.removeEventListener("keydown", handleKeydown);
					}
					cleanup();
				},
			};
		}) satisfies Action,

		options,
		element: root,
	};
};
