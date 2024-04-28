import type { Action } from "svelte/action";

interface ChocoProtocol {
	attributes: Record<string, boolean | string | null | undefined>;
	action: Action;
}

export class ChocoBase implements ChocoProtocol {
	private _attributes: ChocoProtocol["attributes"] = $state({});

	get attributes() {
		return this._attributes;
	}

	set attributes(newV) {
		this._attributes = newV;
	}

	action: Action = () => {};
}
