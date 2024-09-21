import { addListener } from "$lib/actions/addListener.js";
import { getValue } from "$lib/utils/binding.js";
import { merge } from "$lib/utils/index.js";
import type { HTMLTag, Required } from "$lib/utils/types.js";
import { ChocoBase } from "chocobytes/blocks/base.svelte.js";
import type { Booleanish } from "svelte/elements";

type EventName = keyof HTMLElementEventMap;

export type ToggleableOptions = {
  /**
   * A record of Booleanish attributes to be toggled
   */
  initial?: Record<string, Booleanish>;
  /**
   * Whether the initial state is the active state
   */
  active: boolean | (() => boolean);
  setActive?: (v: boolean) => void;
  /**
   * Event(s) toggling the state
   */
  toggle?: EventName | EventName[];
  /**
   * Event(s) triggering the activate state
   */
  on?: EventName | EventName[];
  /**
   * Event(s) triggering the inactivate state
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
} satisfies ToggleableOptions;

export class Toggleable<T extends HTMLTag = "generic"> extends ChocoBase<T> {
  #initial_state = false;
  #options: Required<ToggleableOptions, "active" | "initial"> = $state(defaults);
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

  constructor(opts?: ToggleableOptions) {
    super();

    this.toggle = this.toggle.bind(this);
    this.off = this.off.bind(this);
    this.on = this.on.bind(this);

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
  }

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
}

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
