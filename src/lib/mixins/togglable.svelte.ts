import { ChocoBase } from "../components/base.svelte";
import type { Booleanish } from "svelte/elements";
import { toggleValues } from "$lib/internal/helpers";
import type { Constructor } from "./types";
import { addListener } from "$lib/actions/addListener";

type EventName = keyof HTMLElementEventMap;

export type TogglableOptions = {
	/**
	 * The initial state of the Togglable, describing the Booleanish attributes that are to be toggled
	 */
	initial?: Record<string, Booleanish>;
	/**
	 * Whether the initial state is the active state
	 */
	active: boolean;
	/**
	 * Event(s) on which to toggle
	 */
	toggle?: EventName | EventName[];
	/**
	 * Event(s) on which to activate
	 */
	on?: EventName | EventName[];
	/**
	 * Event(s) on which to deactivate
	 */
	off?: EventName | EventName[];
};

const defaults = { initial: {}, active: false } satisfies Partial<TogglableOptions>;

interface Toggler {
	get active(): boolean;
	set active(val: boolean);
	toggle(): void;
	on(): void;
	off(): void;
}

export const Togglable = <
	U extends HTMLElement = HTMLElement,
	T extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
	superclass: T,
) => {
	return class extends superclass implements Toggler {
		#attributes: Record<string, Booleanish> = $state({});
		#active = $state(false);

		get active() {
			return this.#active;
		}

		set active(v: boolean) {
			if (this.#active !== v) this.toggle();
		}

		override get attributes() {
			return { ...this.#attributes, ...super.attributes };
		}

		constructor(...options: any[]) {
			super(...options);
			this.toggle = this.toggle.bind(this);
			this.off = this.off.bind(this);
			this.on = this.on.bind(this);
		}

		initTogglable = (opts: TogglableOptions) => {
			const options = { ...defaults, ...opts };
			this.#attributes = options.initial;
			this.#active = options.active;

			if (options.toggle) {
				this.extendActions(addListener(options.toggle, this.toggle));
			}

			if (options.on) {
				this.extendActions(addListener(options.on, this.on));
			}

			if (options.off) {
				this.extendActions(addListener(options.off, this.off));
			}
			return this;
		};

		toggle() {
			this.#active = !this.#active;
			this.#attributes = toggleValues(this.#attributes);
		}

		on() {
			if (!this.active) this.toggle();
		}

		off() {
			if (this.active) this.toggle();
		}
	};
};
