import { ChocoBase } from "../components/base.svelte";
import { Togglable, type TogglableOptions } from "./togglable.svelte";

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

const invokable = Symbol();

class Control extends Togglable(ChocoBase) {}

export const Invokable = <
	U extends HTMLElement = HTMLElement,
	C extends ReturnType<typeof Togglable<U>> = ReturnType<typeof Togglable<U>>,
>(
	controlClass: C,
	targetClass = Control,
) => {
	return class extends controlClass {
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

		override toggle() {
			super.toggle();
			this.target.toggle();
		}

		override on() {
			super.on();
			this.target.on();
		}

		override off() {
			super.off();
			this.target.off();
		}

		[invokable] = true;

		static [Symbol.hasInstance](instance: any) {
			return instance[invokable];
		}
	};
};
