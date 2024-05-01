import { ChocoBase } from "./base.svelte";
import { TogglerMixin, type TogglerOptions } from "../mixins/togglable.svelte";

export class Toggler<T extends HTMLButtonElement | HTMLInputElement> extends TogglerMixin(
	ChocoBase<HTMLButtonElement | HTMLInputElement>,
) {
	constructor(options: TogglerOptions) {
		super(options);
	}

	override action(node: T) {
		const cleanup = super.action(node);
		return {
			destroy() {
				cleanup.destroy();
			},
		};
	}
}
