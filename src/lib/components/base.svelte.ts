import { mergeActions } from "$lib/actions/combineActions";
import type { Action } from "svelte/action";
import type { AriaAttributes, HTMLAttributes, SvelteHTMLElements } from "svelte/elements";

export type Attributes = HTMLAttributes<HTMLElement> &
	AriaAttributes &
	Record<string, boolean | string | null | undefined>;

export class ChocoBase<
	T extends HTMLElement = HTMLElement,
	U extends keyof SvelteHTMLElements = "",
	A = U extends "" ? Attributes : SvelteHTMLElements[U],
> {
	//@ts-ignore A is just a generic alias for the ChocoBase `attributes` type
	#attributes: A = $state({});
	#actions: Action<T>[] = [];

	element!: T;

	get attributes(): A {
		return this.#attributes;
	}

	set attributes(newV: A) {
		this.#attributes = newV;
	}

	get action(): Action<T> {
		return mergeActions(...this.#actions);
	}

	constructor(attributes?: NoInfer<A>) {
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

	extendAttributes(newAttributes: A) {
		this.#attributes = { ...this.#attributes, ...newAttributes };
	}
}
