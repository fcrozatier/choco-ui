import type { Action } from "svelte/action";
import type { ChocoBase } from "../base";
import type { Booleanish } from "svelte/elements";
import { toggleValues } from "$lib/internal/helpers";

type TogglerOptions = { initial: Record<string, Booleanish>; active?: boolean };

export class Toggler implements ChocoBase {
	attributes = $state({});
	private _active = $state(false);

	get active() {
		return this._active;
	}

	set active(v: boolean) {
		if (this._active !== v) {
			this.toggle();
		}
	}

	constructor(options: TogglerOptions) {
		this.attributes = options.initial;

		if (options.active) {
			this.active = options.active;
		} else {
			// If the active status is not provided try to guess
			if (Object.values(options.initial).every((v) => v === true || v === "true")) {
				this._active = true;
			} else if (Object.values(options.initial).every((v) => v === false || v === "false")) {
				this._active = false;
			} else {
				throw new Error(
					"Could not determine the active status of the toggler. Please provide an explicit value ",
				);
			}
		}
	}

	toggle = () => {
		this._active = !this._active;
		toggleValues(this.attributes);
	};

	on = () => {
		if (!this.active) {
			this.toggle();
		}
	};

	off = () => {
		if (this.active) {
			this.toggle();
		}
	};

	action = ((node) => {
		const toggle = this.toggle;
		node.addEventListener("click", toggle);

		return {
			destroy() {
				node.removeEventListener("click", toggle);
			},
		};
	}) satisfies Action;
}
