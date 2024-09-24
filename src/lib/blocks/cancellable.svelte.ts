import { Toggleable } from "$lib/blocks/toggleable.svelte.js";
import { debounce } from "@fcrozatier/ts-helpers";
import { addListener } from "chocobytes/actions/addListener.js";

/**
 * ## Cancellable
 *
 * Adds a `data-active` attribute to normalize the `:active` state for better styling: the `data-active` attribute is removed when the cursor leaves the target (which is not the case with the CSS `:active` pseudo selector), even when it is still pressed, to convey the cancellability of the action (which will not trigger).
 */
export class Cancellable extends Toggleable<"a" | "button" | "input"> {
  dragging = false;
  boundaries: DOMRect | undefined = $state();

  isInside = (pointer: { x: number; y: number }) => {
    return (
      !!this.boundaries &&
      pointer.x >= this.boundaries.left &&
      pointer.x <= this.boundaries.right &&
      pointer.y >= this.boundaries.top &&
      pointer.y <= this.boundaries.bottom
    );
  };

  hovered = $state(false);

  constructor() {
    const active = false;
    super({
      initial: { "data-active": active },
      active,
    });

    this.extendActions(addListener("pointerdown", this.on));
    this.extendActions(addListener("pointerup", this.off));

    this.extendActions(addListener("pointerenter", () => (this.hovered = true)));
    this.extendActions(addListener("pointerleave", () => (this.hovered = false)));

    this.extendActions(addListener("click", this.#cancelClick));
  }

  override on = (e: Event) => {
    if (e instanceof PointerEvent) {
      e.preventDefault();
      this.element.setPointerCapture(e.pointerId);
      this.boundaries = this.element.getBoundingClientRect();
      this.dragging = true;
      super.on();
      this.element.addEventListener("pointermove", this.handlePointerMove);
      this.element.addEventListener("click", this.#cancelClick);
    }
  };

  override off = (e: Event) => {
    if (!(e instanceof PointerEvent)) return;

    super.off();

    if (e.type === "pointerup") {
      this.dragging = false;
      this.element.releasePointerCapture(e.pointerId);
      this.element.removeEventListener("pointerenter", this.#on);
      this.element.removeEventListener("pointermove", this.handlePointerMove);

      if (this.isInside(e)) {
        this.element.removeEventListener("click", this.#cancelClick);
        this.element.click();
      }
    } else if (e.type === "pointermove") {
      if (this.dragging) {
        this.element.addEventListener("pointerenter", this.#on);
      }
    }
  };

  #on = () => {
    super.on();
  };

  #cancelClick = (e: Event) => {
    if (!(e instanceof MouseEvent)) return;

    if (!this.isInside(e)) {
      e.stopImmediatePropagation();
    }
  };

  handlePointerMove = debounce(
    (e: Event) => {
      if (!(e instanceof PointerEvent)) return;

      if (this.isInside(e)) {
        this.hovered = true;
        this.#on();
      } else {
        this.hovered = false;
        this.off(e);
      }
    },
    50,
    true,
  );
}
