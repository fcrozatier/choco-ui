import { ChocoBase } from "$lib/headless/base.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import {
  convexHullFromElements,
  pointInConvexPolygon,
  type Point,
} from "$lib/utils/geometry/index.js";
import { key } from "$lib/utils/keyboard.js";
import { debounce, merge } from "@fcrozatier/ts-helpers";
import { makeFocusable } from "chocobytes/actions/focus.svelte.js";
import { Triggerable, type TriggerableOptions } from "./triggerable.svelte.js";
import type { Constructor, HTMLTag } from "./types.js";

const defaults = { active: false } satisfies TriggerableOptions;

/**
 * Triggers on hover and focus
 */
export const Hocusable = <
  S extends HTMLTag = "generic",
  T extends Constructor<ChocoBase<S>> = Constructor<ChocoBase<S>>,
>(
  superclass: T,
) => {
  return class extends Triggerable<S>(superclass) {
    #hull: Point[] | undefined;
    #options: TriggerableOptions = $state(defaults);

    initHocusable(options?: TriggerableOptions) {
      this.#options = merge(defaults, options);
      const opts = this.#options;

      this.initTriggerable({
        ...opts,
        on: ["pointerenter", "focusin"],
        off: ["focusout"],
      });
      // Allow hoverable text nodes
      this.extendActions(makeFocusable);

      $effect(() => {
        if (getValue(this.#options.active)) {
          this.on();
        } else {
          this.off();
        }
      });
    }

    override on(e?: Event) {
      if (!this.#hull && this.element && this.target.element) {
        this.#hull = convexHullFromElements([this.element, this.target.element]);
      }

      if (e instanceof PointerEvent && !this.active) {
        document.addEventListener("pointermove", this.#handlePointer);
      } else if (e instanceof FocusEvent) {
        this.element.addEventListener("focusout", this.off);
      }

      super.on(e);

      document.addEventListener("keydown", this.#handleKeydown);
    }

    override off = (e?: Event) => {
      super.off(e);
      document.removeEventListener("pointermove", this.#handlePointer);
      this.element.removeEventListener("focusout", this.off);
      document.removeEventListener("keydown", this.#handleKeydown);
    };

    #handleKeydown = (e: KeyboardEvent) => {
      if (this.active && e.key === key.ESCAPE) {
        this.active = false;
      }

      document.removeEventListener("keydown", this.#handleKeydown);
    };

    #handlePointer = debounce((e: PointerEvent) => {
      if (!pointInConvexPolygon({ x: e.clientX, y: e.clientY }, this.#hull!)) {
        this.off();
      }
    }, 100);
  };
};
