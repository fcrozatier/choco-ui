import { makeFocusable } from "$lib/actions/focus.svelte.js";
import {
  convexHullFromElements,
  pointInConvexPolygon,
  type Point,
} from "$lib/utils/geometry/index.js";
import { Debounce, merge } from "$lib/utils/index.js";
import { key } from "$lib/utils/keyboard.js";
import type { HTMLTag } from "$lib/utils/types.js";
import { addListener } from "chocobytes/actions/addListener.js";
import { Triggerable, type TriggerableOptions } from "./triggerable.svelte.js";

const defaults = { active: false } satisfies TriggerableOptions;

/**
 * Triggers on hover and focus
 */
export class Hocusable<
  C extends HTMLTag = "button",
  T extends HTMLTag = "generic",
> extends Triggerable<C, T> {
  #hull!: Point[];
  // Debounce the pointermove handler
  #debounce: Debounce<[PointerEvent], void>;

  constructor(options?: TriggerableOptions) {
    const opts = merge(defaults, options);
    super(opts);

    this.toggle = this.toggle.bind(this);
    this.off = this.off.bind(this);
    this.on = this.on.bind(this);

    // Allow hoverable text nodes, also needed to fire blur events
    this.extendActions(makeFocusable);
    this.extendActions(addListener("blur", this.off));
    this.extendActions(addListener(["focus", "pointerenter"], this.on));

    this.#debounce = new Debounce({ fn: this.#handlePointerMove, delay: 100, throttle: true });
  }

  override on(e?: Event) {
    this.#hull = convexHullFromElements([this.element, this.target.element]);

    if (!this.active) {
      if (e instanceof PointerEvent) {
        // prevent pointermove from firing immediately
        setTimeout(() => {
          this.#debounce.flush();
          document.addEventListener("pointermove", this.#debounce.debounced);
        }, 100);
      }
      document.addEventListener("keydown", this.#handleKeydown);

      super.on(e);
    }
  }

  override off(e?: Event) {
    if (this.active) {
      super.off(e);
      document.removeEventListener("pointermove", this.#debounce.debounced);
      document.removeEventListener("keydown", this.#handleKeydown);
      this.#debounce.flush();
    }
  }

  #handleKeydown = (e: KeyboardEvent) => {
    if (this.active && e.key === key.ESCAPE) {
      this.off();
    }
  };

  #handlePointerMove = (e: PointerEvent) => {
    if (!pointInConvexPolygon({ x: e.clientX, y: e.clientY }, this.#hull!)) {
      this.off();
    }
  };
}
