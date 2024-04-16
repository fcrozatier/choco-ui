import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";
import { modulo } from "@fcrozatier/ts-helpers";
import { combineActions } from "$lib/utils/runes.svelte";
import type { CreateToggleGroup } from "../toggle-group/toggle-group.svelte";
import { createSwitchToggle, type CreateSwitch } from "../switch/switch.svelte";
import type { ToggleElement } from "../toggle/press.svelte";

export type CreateSwitchGroupItem = typeof createSwitchToggle;
export type SwitchGroupItem = ReturnType<typeof createSwitchToggle>;

const defaults = {
	loop: true,
} satisfies CreateToggleGroup;

/**
 * Switch Group
 *
 */
export const createSwitchGroup = (options?: CreateToggleGroup) => {
	const state = $state({ ...defaults, ...options });
	const items: SwitchGroupItem[] = $state([]);

	let root: HTMLFieldSetElement | undefined = $state();
	let selected: string | undefined = $state();

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

	const handleClick = (e: Event) => {
		const target = e.currentTarget as ToggleElement;

		items.forEach((item) => {
			if (item.element !== target) {
				item.state.checked = false;
			}
		});

		selected = items.find((item) => item.state.checked)?.element?.value;
	};

	const createItem = (options?: CreateSwitch) => {
		const item = createSwitchToggle({ ...options });

		const action = ((node) => {
			items.push(item);

			(node as HTMLElement).addEventListener("keydown", handleKeydown);
			node.addEventListener("click", handleClick);

			return {
				destroy() {
					(node as HTMLElement).removeEventListener("keydown", handleKeydown);
					node.removeEventListener("click", handleClick);
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
			get selected() {
				return selected;
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
