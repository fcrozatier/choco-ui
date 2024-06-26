import { mergeActions } from "$lib/actions/combineActions";
import type { Action } from "svelte/action";
import type { Attributes } from "../mixins/types";

export class ChocoBase<T extends HTMLElement = HTMLElement> {
	#attributes: Attributes<T> = $state({});
	#actions: Action<T>[] = [];

	element!: T;

	get attributes(): Attributes<T> {
		return this.#attributes;
	}

	set attributes(v: Attributes<T>) {
		this.#attributes = v;
	}

	get action(): Action<T> {
		return mergeActions(...this.#actions);
	}

	constructor(attributes?: NoInfer<Attributes<T>>) {
		if (attributes) {
			this.#attributes = attributes;
		}
		this.extendActions((node) => {
			this.element = node;
		});
	}

	extendActions(...actions: Action<T>[]) {
		for (const action of actions) {
			this.#actions.push(action);
		}
	}

	extendAttributes(newAttributes: Attributes<T>) {
		this.#attributes = { ...this.#attributes, ...newAttributes };
	}
}
