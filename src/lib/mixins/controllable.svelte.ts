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

export const Controllable = <SuperOptions>(superclass: Constructor<ChocoBase, SuperOptions>) => {
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

		/**
		 * Synchronize state when controller is clicked
		 */
		#sync = () => {
			this.target.toggle();
		};

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

		constructor(options: ControllableOptions & SuperOptions) {
			super(options);
			let active;

			if (typeof options.active === "boolean") {
				active = options.active;
			} else {
				// If the active state is not provided try to guess
				if (Object.values(options.control).every((v) => v === true || v === "true")) {
					active = true;
				} else if (Object.values(options.control).every((v) => v === false || v === "false")) {
					active = false;
				} else {
					throw new Error(
						"Could not determine the active state of the toggler. Please provide an explicit value",
					);
				}
			}

			const controlId = nanoId();
			const targetId = nanoId();

			this.control = new Control({
				initial: options.control,
				active,
				attributes: { "aria-controls": targetId, ...(options.labelledBy ? { id: controlId } : {}) },
				action: addListener("click", this.#sync),
			});

			this.target = new Control({
				initial: options.target,
				active,
				attributes: {
					id: targetId,
					...(options.labelledBy ? { "aria-labelledby": controlId } : {}),
				},
			});
		}
	};
};
