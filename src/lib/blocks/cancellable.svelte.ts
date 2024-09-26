import { debounce } from "@fcrozatier/ts-helpers";
import { addListener } from "chocobytes/actions/addListener.js";
import { key } from "chocobytes/utils/keyboard.js";
import { ChocoBase } from "./base.svelte.js";

/**
 * ## Cancellable
 *
 * Adds `data-hover`, `data-active` and `data-focus-visible` attributes to improve the behavior: the `data-active` attribute is removed when the cursor leaves the target (which is not the case with the CSS `:active` pseudo selector), even when it is still pressed, to convey the cancellability of the action (which will not trigger).
 */
export class Cancellable extends ChocoBase<"a" | "button" | "input"> {
  #boundaries: DOMRect | undefined;
  #dragging = false;
  hover = $state(false);
  active = $state(false);
  #tabPressed = false;
  #triggerClick = false;
  focusVisible = $state(false);

  override get attributes() {
    return {
      ...super.attributes,
      "data-active": this.active,
      "data-hover": this.hover,
      "data-focus-visible": this.focusVisible,
    };
  }

  constructor() {
    super();

    this.extendActions(addListener("pointerdown", this.#on));
    this.extendActions(addListener("pointerup", this.#off));

    this.extendActions(addListener("pointerenter", () => (this.hover = true)));
    this.extendActions(addListener("pointerleave", () => (this.hover = false)));

    this.extendActions(
      addListener("click", (e: Event) => {
        if (!(e instanceof MouseEvent)) return;

        if ((!this.#isInside(e) && !this.#triggerClick) || (this.#isInside(e) && !this.active)) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }

        this.active = false;
        this.#triggerClick = false;
      }),
    );

    this.extendActions(
      addListener("keydown", (e) => {
        if (!(e instanceof KeyboardEvent)) return;
        if (e.key !== key.SPACE && e.key !== key.ENTER) return;

        if (this.focusVisible) {
          this.active = true;
          this.#triggerClick = true;
          e.preventDefault();
        }
      }),
    );

    this.extendActions(
      addListener("keyup", (e) => {
        if (!(e instanceof KeyboardEvent)) return;
        if (e.key !== key.SPACE && e.key !== key.ENTER) return;

        if (this.focusVisible) {
          if (this.#triggerClick) {
            this.element.click();
          }

          if (!this.#dragging) {
            this.active = false;
          }
        }
      }),
    );

    this.extendActions(
      addListener("focus", () => {
        this.focusVisible = this.#tabPressed;
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
          this.#tabPressed = true;
        } else if (e.key === key.ESCAPE) {
          this.#triggerClick = false;
          this.active = false;
          this.#tabPressed = false;
          this.element.removeEventListener("pointermove", this.#handlePointerMove);
        } else {
          this.#tabPressed = false;
        }
      };

      const pointerdown = (e: PointerEvent) => {
        if (this.element && e.target instanceof Node && !this.element.contains(e.target)) {
          this.active = false;
          this.#tabPressed = false;
          this.#triggerClick = false;
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

  #on = (e: Event) => {
    if (!(e instanceof PointerEvent && e.button === 0)) return;

    e.preventDefault();
    this.element.setPointerCapture(e.pointerId);
    this.#boundaries = this.element.getBoundingClientRect();
    this.#dragging = true;
    this.active = true;
    this.element.addEventListener("pointermove", this.#handlePointerMove);
  };

  #off = (e: Event) => {
    if (!(e instanceof PointerEvent)) return;

    if (e.type === "pointerup") {
      this.#dragging = false;
      this.element.releasePointerCapture(e.pointerId);
      this.element.removeEventListener("pointermove", this.#handlePointerMove);
    }
  };

  #handlePointerMove = debounce(
    (e: Event) => {
      if (!(e instanceof PointerEvent)) return;

      if (this.#isInside(e)) {
        this.hover = true;
        this.active = true;
      } else {
        this.hover = false;
        this.active = false;
        this.#off(e);
      }
    },
    50,
    true,
  );

  #isInside = (pointer: { x: number; y: number }) => {
    return (
      !!this.#boundaries &&
      pointer.x >= this.#boundaries.left &&
      pointer.x <= this.#boundaries.right &&
      pointer.y >= this.#boundaries.top &&
      pointer.y <= this.#boundaries.bottom
    );
  };
}
