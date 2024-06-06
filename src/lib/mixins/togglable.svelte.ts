import { addListener } from "$lib/actions/addListener";
import { toggleValues } from "$lib/internal/helpers";
import { merge } from "@fcrozatier/ts-helpers";
import type { Booleanish } from "svelte/elements";
import { ChocoBase } from "../components/base.svelte";
import type { Constructor, Required } from "./types";

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

const defaults = { initial: {}, active: false } satisfies TogglableOptions;

const togglable = Symbol();

export const Togglable = <
	U extends HTMLElement = HTMLElement,
	T extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
	superclass: T,
) => {
	return class extends superclass {
		#options: Required<TogglableOptions, "initial"> = $state(defaults);
		#attributes: Record<string, Booleanish> = $state({});
		#active = $derived(this.#options.active);

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
			this.#options = merge(defaults, opts);
			this.#attributes = this.#options.initial;

			if (this.#options.toggle) {
				this.extendActions(addListener(this.#options.toggle, this.toggle));
			}

			if (this.#options.on) {
				this.extendActions(addListener(this.#options.on, this.on));
			}

			if (this.#options.off) {
				this.extendActions(addListener(this.#options.off, this.off));
			}

			return this;
		};

		toggle(_?: Event) {
			this.#options.active = !this.#active;
			toggleValues(this.#attributes);
		}

		on(e?: Event) {
			if (!this.active) this.toggle(e);
		}

		off(e?: Event) {
			if (this.active) this.toggle(e);
		}

		[togglable] = true;

		static [Symbol.hasInstance](instance: any) {
			return instance[togglable];
		}
	};
};
