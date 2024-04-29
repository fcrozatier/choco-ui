import type { Action } from "svelte/action";
import { ChocoBase } from "../base.svelte";
import type { Booleanish } from "svelte/elements";
import { toggleValues } from "$lib/internal/helpers";

type TogglerOptions = { initial: Record<string, Booleanish>; active?: boolean };

type Constructor<T = {}> = new (...args: any[]) => T;

// export class Toggler implements ChocoBase<HTMLButtonElement | HTMLInputElement> {}

const TogglerMixin = (superclass: Constructor<ChocoBase>) => {
	return class extends superclass {
		#attributes: Record<string, Booleanish> = $state({});
		#active = $state(false);

		get active() {
			return this.#active;
		}

		set active(v: boolean) {
			if (this.#active !== v) {
				this.toggle();
			}
		}

		override get attributes(): ChocoBase["attributes"] {
			return { ...this.#attributes, ...super.attributes };
		}

		constructor(options: TogglerOptions) {
			super(options);
			this.#attributes = options.initial;

			if (options.active) {
				this.#active = options.active;
			} else {
				// If the active status is not provided try to guess
				if (Object.values(options.initial).every((v) => v === true || v === "true")) {
					this.#active = true;
				} else if (Object.values(options.initial).every((v) => v === false || v === "false")) {
					this.#active = false;
				} else {
					throw new Error(
						"Could not determine the active status of the toggler. Please provide an explicit value ",
					);
				}
			}
		}

		toggle = () => {
			this.#active = !this.#active;
			toggleValues(this.#attributes);
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
			const toggle = this.toggle;
			node.addEventListener("click", toggle);

			return {
				destroy() {
					node.removeEventListener("click", toggle);
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
