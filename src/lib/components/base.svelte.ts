import { mergeActions } from "$lib/actions/combineActions";
import type { Action } from "svelte/action";

export type Attributes = Record<string, boolean | string | null | undefined>;

export class ChocoBase<T extends HTMLElement = HTMLElement> {
	#attributes = $state({});
	#actions: Action<T>[] = [];

	get attributes(): Attributes {
		return this.#attributes;
	}

	set attributes(newV) {
		this.#attributes = newV;
	}

	get action() {
		return mergeActions(...this.#actions);
	}

	extendActions(action: Action<T>) {
		this.#actions.push(action);
	}

	extendAttributes(newAttributes: Attributes) {
		this.#attributes = { ...this.#attributes, ...newAttributes };
	}
}
