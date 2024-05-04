export type Attributes = Record<string, boolean | string | null | undefined>;

export class ChocoBase<T extends HTMLElement = HTMLElement> {
	#attributes = $state({});

	get attributes(): Attributes {
		return this.#attributes;
	}

	set attributes(newV) {
		this.#attributes = newV;
	}

	action(_: T) {}
}
