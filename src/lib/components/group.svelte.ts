import type { ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import { Focusable } from "$lib/mixins/focusable.svelte";
import type { ChocoBase } from "./base.svelte";

export class Group<ItemOptions, Class extends ChocoBase & { active?: boolean }> {
	#cls: new (...args: ItemOptions[]) => Class;
	#items: Class[] = [];

	set items(v) {
		this.#items = v;
	}

	get items() {
		return this.#items;
	}

	active = $derived(this.items.filter((i) => i.active));

	constructor(cls: new (...args: ItemOptions[]) => Class) {
		this.#cls = cls;
	}

	createItem = (options: ItemOptions) => {
		const item = new this.#cls(options);
		this.items.push(item);
		return item;
	};
}

export class FocusGroup<ItemOptions, Class extends ChocoBase & { active?: boolean }> {
	#cls: ReturnType<typeof Focusable<ItemOptions>>;
	#options?: ManageFocusOptions;

	items: Class[] = [];
	active = $derived(this.items.filter((i) => i.active));

	constructor(options: { cls: new (...args: ItemOptions[]) => Class; focus?: ManageFocusOptions }) {
		this.#cls = Focusable(options.cls);
		this.#options = options.focus;
	}

	createItem = (options: ItemOptions) => {
		const item = new this.#cls({ ...this.#options, ...options }) as Class;
		this.items.push(item);
		return item;
	};
}
