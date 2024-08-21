import { addListener } from "$lib/actions/addListener.js";
import { ChocoBase } from "$lib/base.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import { merge } from "$lib/utils/index.js";
import type { Constructor, HTMLTag, Required } from "$lib/utils/types.js";
import type { Booleanish } from "svelte/elements";

type EventName = keyof HTMLElementEventMap;

export type TogglableOptions = {
  /**
   * The initial state of the Togglable, describing the Booleanish attributes that are to be toggled
   */
  initial?: Record<string, Booleanish>;
  /**
   * Whether the initial state is the active state
   */
  active: boolean | (() => boolean);
  setActive?: (v: boolean) => void;
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

export interface Toggler {
  active: boolean;
  toggle(): void;
  on(): void;
  off(): void;
}

const defaults = {
  initial: {},
  active: false,
} satisfies TogglableOptions;

export const Togglable = <
  U extends HTMLTag = "generic",
  T extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
  superclass: T,
) => {
  return class extends superclass implements Toggler {
    #initial_state = false;
    #options: Required<TogglableOptions, "active" | "initial"> = $state(defaults);
    #active = $derived(getValue(this.#options.active));
    #attributes: Record<string, Booleanish> = $derived(
      this.#active === this.#initial_state
        ? this.#options.initial
        : toggleValues(this.#options.initial)!,
    );

    get active() {
      return this.#active;
    }

    set active(v) {
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

    initTogglable = (opts?: TogglableOptions) => {
      this.#options = merge(defaults, opts);
      this.#initial_state = getValue(this.#options.active);

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
      const newValue = !this.#active;
      if (typeof this.#options.active === "function") {
        this.#options.setActive?.(newValue);
      } else {
        this.#options.active = newValue;
      }
    }

    on(e?: Event) {
      if (!this.active) this.toggle(e);
    }

    off(e?: Event) {
      if (this.active) this.toggle(e);
    }
  };
};

/**
 * Pure function for toggling Booleanish values
 */
const toggleValues = (state?: Record<string, Booleanish>) => {
  if (!state) return;

  const newState: Record<string, Booleanish> = {};

  for (const key of Object.keys(state)) {
    const val = state[key];

    if (typeof val === "boolean") {
      newState[key] = !val;
    } else if (typeof val === "string") {
      newState[key] = `${val === "false"}`;
    }
  }

  return newState;
};

export const ToggleBase = class extends Togglable(ChocoBase) {};
