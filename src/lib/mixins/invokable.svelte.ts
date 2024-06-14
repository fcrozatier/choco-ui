import { ChocoBase } from "../components/base.svelte";
import { Togglable, type TogglableOptions } from "./togglable.svelte";
import type { Constructor } from "./types";

export type InvokableOptions = {
	/**
	 * Initial state of the control
	 */
	control?: TogglableOptions["initial"];
	/**
	 * Initial state of the target
	 */
	target?: TogglableOptions["initial"];
} & Omit<TogglableOptions, "initial">;

export const Invokable = <
	CE extends HTMLElement = HTMLElement,
	TE extends HTMLElement = HTMLElement,
	C extends Constructor<ChocoBase<CE>> = Constructor<ChocoBase<CE>>,
>(
	controlClass: C,
	targetClass = class extends Togglable<TE>(ChocoBase) {},
) => {
	return class extends Togglable(controlClass) {
		target: InstanceType<typeof targetClass>;

		constructor(...options: any[]) {
			super(...options);
			this.target = new targetClass();
		}

		initInvokable(options: InvokableOptions) {
			this.initTogglable({
				initial: options.control,
				...options,
			});

			this.target.initTogglable({
				initial: options.target,
				active: options.active,
			});
		}

		override toggle(e?: Event) {
			super.toggle(e);
			this.target.toggle(e);
		}

		override on(e?: Event) {
			super.on(e);
			this.target.on(e);
		}

		override off(e?: Event) {
			super.off(e);
			this.target.off(e);
		}
	};
};
