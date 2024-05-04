import { ChocoBase } from "../components/base.svelte";
import type { Booleanish } from "svelte/elements";
import type { Constructor } from "./types";
import { addListener } from "$lib/actions/addListener";
import { Extendable } from "./extendable.svelte";
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
	onToggle?: (node: HTMLElement) => void;
};

class Control extends Togglable(Extendable(ChocoBase)) {}

export const Controllable = <T extends Constructor<ChocoBase>>(superclass: T) => {
	return class extends superclass {
		control: Control;
		target: Control;

		get active() {
			return this.control.active;
		}

		set active(v: boolean) {
			if (v !== this.control.active) {
				this.toggle();
			}
		}

		constructor(...options: any[]) {
			super(...options);
			this.control = new Control();
			this.target = new Control();
		}

		toggle = () => {
			this.control.toggle();
			this.target.toggle();
		};

		on = () => {
			this.control.on();
			this.target.on();
		};

		off = () => {
			this.control.off();
			this.target.off();
		};

		initControllable(options: ControllableOptions) {
			const controlId = nanoId();
			const targetId = nanoId();

			this.control.initExtendable({
				attributes: { "aria-controls": targetId, ...(options.labelledBy ? { id: controlId } : {}) },
				action: addListener("click", () => this.target.toggle()),
			});
			this.control.initTogglable({
				initial: options.control,
				active: options.active,
			});

			this.target.initExtendable({
				attributes: {
					id: targetId,
					...(options.labelledBy ? { "aria-labelledby": controlId } : {}),
				},
			});
			this.target.initTogglable({
				initial: options.target,
				active: options.active,
			});
		}
	};
};
