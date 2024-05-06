import { combineActions } from "$lib/actions/combineActions";
import type { Action } from "svelte/action";

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

	extendAction(newAction: Action) {
		this.action = combineActions(this.action, newAction);
	}
}
