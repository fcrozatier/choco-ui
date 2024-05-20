import { mergeActions } from "$lib/actions/combineActions";
import type { Action } from "svelte/action";
import type { AriaAttributes, HTMLAttributes } from "svelte/elements";

export type Attributes = HTMLAttributes<HTMLElement> &
	AriaAttributes &
	Record<string, boolean | string | null | undefined>;

export class ChocoBase<T extends HTMLElement = HTMLElement> {
	#attributes = $state({});
	#actions: Action<T>[] = [];
	element!: T;

	get attributes(): Attributes {
		return this.#attributes;
	}

	set attributes(newV) {
		this.#attributes = newV;
	}

	get action(): Action<T> {
		return mergeActions(...this.#actions);
	}

	constructor(attributes?: Attributes) {
		if (attributes) {
			this.#attributes = attributes;
		}
		this.extendActions((node) => {
			this.element = node;
		});
	}

	extendActions(action?: Action<T>) {
		if (action) {
			this.#actions.push(action);
		}
	}

	extendAttributes(newAttributes: Attributes) {
		this.#attributes = { ...this.#attributes, ...newAttributes };
	}
}
