import type { ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import type { Constructor } from "$lib/mixins/types";

export class Group<Options, T extends Constructor<{ active: boolean }, Options>> {
	#cls: T;
	items: { active: boolean }[] = $state([]);
	active = $derived(this.items.filter((i) => i.active));

	constructor(cls: T) {
		this.#cls = cls;
	}

	addItem = (options: Options) => {
		const item = new this.#cls(options);
		this.items.push(item);
		return item;
	};
}
