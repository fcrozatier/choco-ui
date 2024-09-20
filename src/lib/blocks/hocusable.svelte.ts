import { makeFocusable } from "$lib/actions/focus.svelte.js";
import { getValue } from "$lib/utils/binding.js";
import {
  convexHullFromElements,
  pointInConvexPolygon,
  type Point,
} from "$lib/utils/geometry/index.js";
import { debounce, merge } from "$lib/utils/index.js";
import { key } from "$lib/utils/keyboard.js";
import type { HTMLTag } from "$lib/utils/types.js";
import { Triggerable, type TriggerableOptions } from "./triggerable.svelte.js";

const defaults = { active: false } satisfies TriggerableOptions;

/**
 * Triggers on hover and focus
 */
export class Hocusable<
  C extends HTMLTag = "button",
  T extends HTMLTag = "generic",
> extends Triggerable<C, T> {
  #hull: Point[] | undefined;
  #options: TriggerableOptions = $state(defaults);

  constructor(options?: TriggerableOptions) {
    const opts = merge(defaults, options);

    super({
      ...opts,
      on: ["pointerenter", "focusin"],
      off: ["focusout"],
    });

    this.#options = opts;
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
}
