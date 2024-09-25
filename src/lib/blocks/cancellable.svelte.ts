import { debounce } from "@fcrozatier/ts-helpers";
import { addListener } from "chocobytes/actions/addListener.js";
import { key } from "chocobytes/utils/keyboard.js";
import { ChocoBase } from "./base.svelte.js";

/**
 * ## Cancellable
 *
 * Adds a `data-active` attribute to normalize the `:active` state for better styling: the `data-active` attribute is removed when the cursor leaves the target (which is not the case with the CSS `:active` pseudo selector), even when it is still pressed, to convey the cancellability of the action (which will not trigger).
 */
export class Cancellable extends ChocoBase<"a" | "button" | "input"> {
  boundaries: DOMRect | undefined;
  dragging = false;
  hovered = $state(false);
  active = $state(false);
  hadKeyboardInteraction = false;
  focusVisible = $state(false);

  override get attributes() {
    return {
      "data-active": this.active,
      "data-hover": this.hovered,
      "data-focus-visible": this.focusVisible,
    };
  }

  constructor() {
    super();

    this.extendActions(addListener("pointerdown", this.on));
    this.extendActions(addListener("pointerup", this.off));

    this.extendActions(addListener("pointerenter", () => (this.hovered = true)));
    this.extendActions(addListener("pointerleave", () => (this.hovered = false)));

    this.extendActions(addListener("click", this.#cancelClick));

    this.extendActions(
      addListener("keydown", (e) => {
        if (!(e instanceof KeyboardEvent)) return;
        if (e.key !== key.SPACE && e.key !== key.ENTER) return;
        if (this.focusVisible) {
          this.active = true;
        }
      }),
    );

    this.extendActions(
      addListener("keyup", (e) => {
        if (!(e instanceof KeyboardEvent)) return;
        if (e.key !== key.SPACE && e.key !== key.ENTER) return;
        if (this.focusVisible) {
          this.active = false;
        }
      }),
    );

    this.extendActions(
      addListener("focus", () => {
        this.focusVisible = this.hadKeyboardInteraction;
      }),
    );

    this.extendActions(
      addListener("blur", () => {
        this.focusVisible = false;
      }),
    );

    $effect(() => {
      const keydown = (e: KeyboardEvent) => {
        if (e.key === key.TAB) {
          this.hadKeyboardInteraction = true;
        }
      };

      const pointerdown = (e: PointerEvent) => {
        if (this.element && e.target instanceof Node && !this.element.contains(e.target)) {
          this.active = false;
          this.hadKeyboardInteraction = false;
        }
      };

      document.addEventListener("keydown", keydown);
      document.addEventListener("pointerdown", pointerdown);

      return () => {
        document.removeEventListener("keydown", keydown);
        document.removeEventListener("pointerdown", pointerdown);
      };
    });
  }

  on = (e: Event) => {
    if (!(e instanceof PointerEvent)) return;

    e.preventDefault();
    this.hadKeyboardInteraction = false;
    this.element.setPointerCapture(e.pointerId);
    this.boundaries = this.element.getBoundingClientRect();
    this.dragging = true;
    this.active = true;
    this.element.addEventListener("pointermove", this.#handlePointerMove);
  };

  off = (e: Event) => {
    if (!(e instanceof PointerEvent)) return;

    this.active = false;

    if (e.type === "pointerup") {
      this.dragging = false;
      this.element.releasePointerCapture(e.pointerId);
      this.element.removeEventListener("pointermove", this.#handlePointerMove);

      if (this.#isInside(e)) {
        this.element.click();
      }
    } else if (e.type === "pointermove") {
      if (this.dragging) {
      }
    }
  };

  #cancelClick = (e: Event) => {
    if (!(e instanceof MouseEvent)) return;

    if (!this.#isInside(e) && document.activeElement !== this.element) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };

  #handlePointerMove = debounce(
    (e: Event) => {
      if (!(e instanceof PointerEvent)) return;

      if (this.#isInside(e)) {
        this.hovered = true;
        this.active = true;
      } else {
        this.hovered = false;
        this.off(e);
      }
    },
    50,
    true,
  );

  #isInside = (pointer: { x: number; y: number }) => {
    return (
      !!this.boundaries &&
      pointer.x >= this.boundaries.left &&
      pointer.x <= this.boundaries.right &&
      pointer.y >= this.boundaries.top &&
      pointer.y <= this.boundaries.bottom
    );
  };
}
