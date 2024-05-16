import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus.svelte";
import { commonParent } from "$lib/utils/helpers";
import { type Toggler } from "../toggler/toggler.svelte";
import type { role } from "$lib/utils/roles";
import { untrack } from "svelte";
import { Map as ReactiveMap } from "svelte/reactivity";

export type TogglerGroupOptions = {
	focus?: ManageFocusOptions;
	parentRole?: keyof typeof role;
	/**
	 * Whether only one item can be active at a time
	 */
	exclusive?: boolean;
};

const defaults = {
	parentRole: "group",
} satisfies TogglerGroupOptions;

/**
 * Toggler Group
 *
 */
export const createTogglerGroup = <T extends { toggler?: Toggler }>(
	options?: TogglerGroupOptions,
) => {
	const items: T[] = $state([]);
	const map = new ReactiveMap<string, T>([]);

	let active = $derived(items.filter((i) => i.toggler?.active === true));

	let root: HTMLElement | null | undefined = $state();

	const focusGroup = manageFocus({
		...options?.focus,
	});

	const handleExclusive = (e: Event) => {
		const target = e.currentTarget;

		const control = items.find((i) => i.toggler?.controlElement === target);

		if (control && control.toggler?.active) {
			items.forEach((item) => {
				if (item !== control && item.toggler?.active) {
					// Doesn't work for some reason
					// item.toggler?.off();
					item.toggler?.controlElement?.click();
				}
			});
		}
	};

	const addItem = (item: T, key?: string) => {
		// Process item when the toggler is set
		$effect(() => {
			untrack(() => {
				if (item.toggler?.controlElement) {
					const node = item.toggler.controlElement;
					focusGroup(node);

					if (options?.exclusive) {
						node.addEventListener("click", handleExclusive);
					}

					items.push(item);
					if (key) {
						map.set(key, item);
					}
				}
			});
		});
	};

	// Configure parent
	$effect(() => {
		const controls = items.map((i) => i?.toggler?.controlElement).filter((i) => i !== undefined);
		const parent = commonParent(controls);

		if (parent && !(parent instanceof HTMLFieldSetElement)) {
			parent.role = options?.parentRole ?? defaults.parentRole;
		}

		root = parent;
	});

	// Disable items
	$effect(() => {
		if (root && root instanceof HTMLFieldSetElement && root.disabled !== undefined) {
			for (const item of items) {
				if (item?.toggler?.controlElement) {
					item.toggler.controlElement.disabled = root.disabled;
				}
			}
		}
	});

	return {
		get items() {
			return items;
		},

		getItem(key: string) {
			return map.get(key);
		},

		get active() {
			return active;
		},

		get root() {
			return root;
		},

		addItem,
	};
};
