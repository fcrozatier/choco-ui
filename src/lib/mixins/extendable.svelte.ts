import { type ChocoBase } from "../components/base.svelte";
import type { Constructor } from "./types";

export type ExtendableOptions = Partial<InstanceType<typeof ChocoBase>>;

export function Extendable<T extends Constructor<ChocoBase>>(superclass: T) {
	return class extends superclass {
		initExtendable(options: ExtendableOptions) {
			if (options.attributes) {
				this.extendAttributes(options.attributes);
			}
			if (options.action) {
				this.extendActions(options.action);
			}

			return this;
		}
	};
}
