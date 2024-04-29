import type { Action } from "svelte/action";

interface ChocoProtocol {
	attributes: Record<string, boolean | string | null | undefined>;
	action: Action;
}

export class ChocoBase implements ChocoProtocol {
	#attributes: ChocoProtocol["attributes"] = $state({});

	get attributes() {
		return this.#attributes;
	}

	set attributes(newV) {
		this.#attributes = newV;
	}

	action: Action = () => {};
}
