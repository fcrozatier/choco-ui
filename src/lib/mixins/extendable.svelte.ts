import { type Attributes, type ChocoBase } from "../components/base.svelte";
import type { Constructor } from "./types";

export type ExtendableOptions = Partial<InstanceType<typeof ChocoBase>>;

export function Extendable<T extends Constructor<ChocoBase>>(superclass: T) {
	return class extends superclass {
		#attributes: Attributes = $state({});

		override get attributes() {
			return { ...this.#attributes, ...super.attributes };
		}

		initExtendable(options: ExtendableOptions) {
			if (options.attributes) {
				this.#attributes = options.attributes;
			}
			if (options.action) {
				this.extendAction(options.action);
			}

			return this;
		}
	};
}
