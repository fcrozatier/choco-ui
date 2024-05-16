import { ChocoBase } from "../components/base.svelte";
import type { Booleanish } from "svelte/elements";
import { Togglable } from "./togglable.svelte";
import { nanoId } from "$lib/utils/nano";

export type ControllableOptions = {
	/**
	 * Initial state of the control
	 */
	control: Record<string, Booleanish>;
	/**
	 * Initial state of the target
	 */
	target: Record<string, Booleanish>;
	/**
	 * Whether the initial state is the active state. (Optional)
	 */
	active?: boolean;
	/**
	 * Whether the target is labelled by the control
	 */
	labelledBy?: boolean;
};

export class Control extends Togglable(ChocoBase) {}

export const Controllable = <
	U extends HTMLElement = HTMLElement,
	T extends ReturnType<typeof Togglable<U>> = ReturnType<typeof Togglable<U>>,
>(
	controlClass: T,
) => {
	return class extends controlClass {
		target!: Control;

		initControllable(options: ControllableOptions) {
			const controlId = nanoId();
			const targetId = nanoId();

			this.target = new Control();

			this.extendAttributes({
				"aria-controls": targetId,
				id: options.labelledBy ? controlId : undefined,
			});

			this.initTogglable({
				initial: options.control,
				active: options.active,
			});

			this.target.extendAttributes({
				id: targetId,
				"aria-labelledby": options.labelledBy ? controlId : undefined,
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
	};
};
