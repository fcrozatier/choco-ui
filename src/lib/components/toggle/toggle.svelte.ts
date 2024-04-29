import { Toggler } from "../../mixins/toggler/toggler.svelte";
import { role } from "$lib/utils/roles";
import type { Attributes } from "../../mixins/base.svelte";

export type ToggleOptions = {
	/**
	 * Whether the toggle is initially pressed or not. Defaults to `false`
	 */
	pressed?: boolean;
	/**
	 * Whether the toggle is a press toggle or a switch toggle. Defaults to `press`
	 */
	kind?: "press" | "switch";
};

const defaults = { pressed: false, kind: "press" } satisfies Required<ToggleOptions>;

export class ToggleButton extends Toggler<HTMLButtonElement> {
	#attributes: Attributes = {};

	override get attributes() {
		return { ...this.#attributes, ...super.attributes };
	}

	presssed = this.active; // alias

	constructor(options?: ToggleOptions) {
		const toggleOptions = { ...defaults, ...options };
		let initial;
		if (toggleOptions.kind === "press") {
			initial = { "aria-pressed": `${toggleOptions.pressed}` } as const;
		} else {
			initial = { "aria-checked": `${toggleOptions.pressed}` } as const;
		}
		super({ initial });

		if (toggleOptions.kind === "switch") {
			this.#attributes["role"] = role.switch;
		}

		this.#attributes["type"] = "button";
	}
}

export class SwitchInput extends Toggler<HTMLInputElement> {
	#attributes: Attributes = {};

	override get attributes() {
		return { ...this.#attributes, ...super.attributes };
	}

	constructor(options?: ToggleOptions) {
		const toggleOptions = { ...defaults, ...options };

		super({ initial: { "aria-checked": `${toggleOptions.pressed}` } });

		this.#attributes["role"] = role.switch;
		this.#attributes["type"] = "checkbox";
	}
}
