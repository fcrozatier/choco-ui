import { ChocoBase } from "../components/base.svelte";
import type { Constructor } from "./types";
import { manageFocus, type ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";

export const FocusMixin = (superclass: Constructor<ChocoBase>) => {
	return class extends superclass {
		#focus: ReturnType<typeof manageFocus>;

		constructor(options: ManageFocusOptions) {
			super(options);
			this.#focus = manageFocus(options);
		}

		override action(node: HTMLElement) {
			const cleanup = this.#focus(node);
			const cleanup2 = super.action(node);

			return {
				destroy() {
					cleanup.destroy();
					cleanup2.destroy();
				},
			};
		}
	};
};
