import type { Action } from "svelte/action";

export type Attributes = Record<string, boolean | string | null | undefined>;

export type ChocoProtocol<T extends HTMLElement = HTMLElement> = {
	attributes: Attributes;
	action: Action<T>;
};

export class ChocoBase<T extends HTMLElement = HTMLElement> implements ChocoProtocol<T> {
	#attributes = $state({});

	get attributes(): Attributes {
		return this.#attributes;
	}

	set attributes(newV) {
		this.#attributes = newV;
	}

	action(_: T) {
		return { destroy() {} };
	}
}
