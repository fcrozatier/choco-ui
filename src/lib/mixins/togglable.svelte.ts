import { ChocoBase } from "../components/base.svelte";
import type { Booleanish } from "svelte/elements";
import { toggleValues } from "$lib/internal/helpers";
import type { Constructor } from "./types";
import { addListener } from "$lib/actions/addListener";

export type TogglableOptions = {
	initial: Record<string, Booleanish>;
	active?: boolean;
};

export interface Toggler {
	get active(): boolean;
	set active(val: boolean);
	toggle(): void;
	on(): void;
	off(): void;
}

export const Togglable = <
	U extends HTMLElement = HTMLElement,
	T extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
	superclass: T,
) => {
	return class extends superclass implements Toggler {
		#attributes: Record<string, Booleanish> = $state({});
		#active = $state(false);

		get active() {
			return this.#active;
		}

		set active(v: boolean) {
			if (this.#active !== v) this.toggle();
		}

		override get attributes() {
			return { ...this.#attributes, ...super.attributes };
		}

		constructor(...options: any[]) {
			super(...options);
			this.toggle = this.toggle.bind(this);
		}

		initTogglable = (options: TogglableOptions) => {
			this.#attributes = options.initial;

			if (options.active !== undefined) {
				this.#active = options.active;
			} else {
				// If the active state is not provided try to guess
				if (Object.values(options.initial).every((v) => v === true || v === "true")) {
					this.#active = true;
				} else if (Object.values(options.initial).every((v) => v === false || v === "false")) {
					this.#active = false;
				} else {
					throw new Error(
						"Could not determine the active state of the toggler. Please provide an explicit value",
					);
				}
			}

			this.extendActions(addListener("click", this.toggle));
			return this;
		};

		toggle() {
			this.#active = !this.#active;
			toggleValues(this.#attributes);
		}

		on = () => {
			if (!this.active) this.toggle();
		};

		off = () => {
			if (this.active) this.toggle();
		};
	};
};
