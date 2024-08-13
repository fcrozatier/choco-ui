import { mergeActions } from "$lib/actions/combineActions.js";
import { ChocoBase } from "$lib/headless/base.svelte.js";
import { Togglable, ToggleBase } from "$lib/mixins/togglable.svelte.js";
import type { Action } from "svelte/action";
import { mix } from "./index.js";
import type { Constructor } from "./types.js";

/**
 * ## Cancellable
 *
 * Adds a `data-active` attribute to normalize the `:active` state for better styling: the `data-active` attribute is removed when the cursor leaves the target (which is not the case with the CSS `:active` pseudo selector), even when it is still pressed, to convey the cancellability of the action (which will not trigger).
 */
export const Cancellable = <
  U extends HTMLElement = HTMLElement,
  T extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
  superclass: T,
) => {
  return class extends superclass {
    #canceller;

    override get attributes() {
      return { ...this.#canceller.attributes, ...super.attributes };
    }

    override get action(): Action<U> {
      return mergeActions(this.#canceller.action, super.action);
    }

    constructor(...options: any[]) {
      super(...options);

      this.#canceller = new ToggleBase();
      this.#canceller.initTogglable({
        initial: { "data-active": false },
        active: false,
        on: "pointerdown",
        off: ["pointerup", "pointerleave"],
      });
    }
  };
};

export const Cancellable2 = <
  U extends HTMLElement = HTMLElement,
  T extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
  superclass: T,
) => {
  return class extends Togglable(superclass) {
    constructor(...options: any[]) {
      super(...options);

      this.initTogglable({
        initial: { "data-active": false },
        active: false,
        on: "pointerdown",
        off: ["pointerup", "pointerleave"],
      });
    }
  };
};

export const Canceller = mix(ChocoBase, Cancellable2, "cancellable");
