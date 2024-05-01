import { ChocoBase } from "../components/base.svelte";
import type { Booleanish } from "svelte/elements";
import { toggleValues } from "$lib/internal/helpers";
import type { Constructor } from "./types";
import { combineActions } from "$lib/actions/combineActions";
import { addListener } from "$lib/actions/addListener";

export type TogglableOptions = { initial: Record<string, Booleanish>; active?: boolean };

export const Togglable = <SuperOptions extends unknown>(
	superclass: Constructor<ChocoBase, SuperOptions>,
) => {
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

		override get attributes() {
			return { ...this.#attributes, ...super.attributes };
		}

		constructor(options: TogglableOptions & SuperOptions) {
			super(options);
			this.#attributes = options.initial;

			if (options.active) {
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

			this.action = combineActions(super.action, addListener("click", this.toggle));
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
	};
};
