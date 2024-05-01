import { ChocoBase, type Attributes, type ChocoProtocol } from "../components/base.svelte";
import type { Constructor } from "./types";
import { combineActions } from "$lib/actions/combineActions";

export type ExtendOptions = Partial<ChocoProtocol>;

export const Extendable = <SuperOptions extends unknown>(
	superclass: Constructor<ChocoBase, SuperOptions>,
) => {
	return class extends superclass {
		#attributes: Attributes = $state({});

		override get attributes() {
			return { ...this.#attributes, ...super.attributes };
		}

		constructor(options: ExtendOptions & SuperOptions) {
			super(options);
			if (options.attributes) {
				this.#attributes = options.attributes;
			}
			if (options.action) {
				this.action = combineActions(options.action, super.action);
			}
		}
	};
};
