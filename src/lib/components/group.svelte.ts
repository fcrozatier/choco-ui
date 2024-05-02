import type { ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import { Focusable } from "$lib/mixins/focusable.svelte";
import type { ChocoBase } from "./base.svelte";

export class Group<ItemOptions, Class extends ChocoBase & { active?: boolean }> {
	#cls: new (...args: ItemOptions[]) => Class;

	items: Class[] = $state([]);
	active = $derived(this.items.filter((i) => i.active));

	constructor(cls: new (...args: ItemOptions[]) => Class) {
		this.#cls = cls;
	}

	addItem = (options: ItemOptions) => {
		const item = new this.#cls(options);
		this.items.push(item);
		return item;
	};
}

export class FocusGroup<ItemOptions, Class extends ChocoBase & { active?: boolean }> {
	#cls: ReturnType<typeof Focusable<ItemOptions>>;
	#options: ManageFocusOptions;

	items: Class[] = $state([]);
	active = $derived(this.items.filter((i) => i.active));

	constructor(options: { cls: new (...args: ItemOptions[]) => Class; focus: ManageFocusOptions }) {
		this.#cls = Focusable(options.cls);
		this.#options = options.focus;
	}

	newItem = (options: ItemOptions) => {
		const item = new this.#cls({ ...this.#options, ...options }) as Class;
		this.items.push(item);
		return item;
	};
}
