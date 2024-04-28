import type { Action } from "svelte/action";
import { ChocoBase } from "../base.svelte";
import type { Booleanish } from "svelte/elements";
import { toggleValues } from "$lib/internal/helpers";

type TogglerOptions = { initial: Record<string, Booleanish>; active?: boolean };

type Constructor<T = {}> = new (...args: any[]) => T;
type GConstructor<T = {}> = new (...args: any[]) => T;

// export class Toggler implements ChocoBase<HTMLButtonElement | HTMLInputElement> {}

const TogglerMixin = (superclass: new () => ChocoBase) => {
	return class extends superclass {
		__attributes: Record<string, Booleanish> = $state({});
		private _active = $state(false);

		get active() {
			return this._active;
		}

		set active(v: boolean) {
			if (this._active !== v) {
				this.toggle();
			}
		}

		override get attributes(): ChocoBase["attributes"] {
			return { ...this.__attributes, ...super.attributes };
		}

		constructor(options: TogglerOptions) {
			super();
			this.__attributes = options.initial;

			if (options.active) {
				this._active = options.active;
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
			toggleValues(this.__attributes);
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

		override action = ((node) => {
			// const toggle = this.toggle;
			node.addEventListener("click", this.toggle);

			return {
				destroy() {
					// node.removeEventListener("click", toggle);
				},
			};
		}) satisfies Action;
	};
};

export class Toggler extends TogglerMixin(ChocoBase) {
	constructor(options: TogglerOptions) {
		super(options);
	}
}
