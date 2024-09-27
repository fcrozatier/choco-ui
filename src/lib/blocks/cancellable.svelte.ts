import { addListener } from "chocobytes/actions/addListener.js";
import { key } from "chocobytes/utils/keyboard.js";
import { ChocoBase } from "./base.svelte.js";

/**
 * ## Cancellable
 *
 * Adds `data-hover`, `data-active` and `data-focus-visible` attributes to improve and normalize the behavior of button and anchors across browsers and platforms
 *
 * https://choco-ui.com/blocks/cancellable
 */
export class Cancellable extends ChocoBase<"a" | "button"> {
  #boundaries: DOMRect | undefined;
  #dragging = $state(false);
  hover = $state(false);
  active = $state(false);
  #tabPressed = false;
  #triggerClick = $state(false);
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

    this.extendActions(
      addListener("pointerdown", (e) => {
        if (!e.isPrimary) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        // Prevent mouse events
        e.preventDefault();
        this.active = true;
        this.#dragging = true;
        this.#triggerClick = true;
        this.#boundaries = this.element.getBoundingClientRect();
        this.element.focus();
        this.element.setPointerCapture(e.pointerId);
        this.element.addEventListener("pointermove", this.#handlePointerMove);
      }),
    );
    this.extendActions(
      addListener("pointerup", (e) => {
        this.element.releasePointerCapture(e.pointerId);
        this.element.removeEventListener("pointermove", this.#handlePointerMove);
        this.#dragging = false;
        if (this.#triggerClick) {
          this.element.click();
        }
        this.active = false;
      }),
    );
    this.extendActions(
      addListener("pointerenter", () => {
        this.hover = true;
      }),
    );
    this.extendActions(
      addListener("pointerleave", (e) => {
        if (e.pointerType !== "touch") {
          this.hover = false;
        }
      }),
    );
    this.extendActions(addListener("contextmenu", (e) => e.preventDefault()));
    this.extendActions(
      // touch-action: none
      addListener(["touchstart", "touchmove", "touchend"], (e) => {
        // Avoid browser interventions when scrolling (not cancelable)
        if (e.cancelable) {
          e.preventDefault();
        }
      }),
    );
    this.extendActions(
      addListener("pointercancel", () => {
        this.#dragging = false;
        this.active = false;
        this.hover = false;
        this.#triggerClick = false;
      }),
    );

    this.extendActions(
      addListener("click", (e) => {
        // Don't prevent sr-only clicks
        const srClick = e.detail === 0 || ("mozInputSource" in e && e.mozInputSource === 0);
        if (!this.#triggerClick && !srClick) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }

        this.active = false;
        this.#triggerClick = false;
      }),
    );

    this.extendActions(
      addListener("keydown", (e) => {
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
          this.active = false;
          this.#tabPressed = false;
          this.#triggerClick = false;
          if (this.#dragging) {
            this.element.removeEventListener("pointermove", this.#handlePointerMove);
            this.#dragging = false;
          }
        } else {
          this.#tabPressed = false;
        }
      };

      const pointerdown = (e: PointerEvent) => {
        if (this.element && e.target instanceof Node && !this.element.contains(e.target)) {
          this.hover = false;
          this.active = false;
          this.#tabPressed = false;
          this.#triggerClick = false;
          if (this.#dragging) {
            this.element.removeEventListener("pointermove", this.#handlePointerMove);
            this.#dragging = false;
          }
        }
      };

      return () => {
        document.removeEventListener("keydown", keydown);
        document.removeEventListener("pointerdown", pointerdown);
      };
    });
  }

  #handlePointerMove = (e: Event) => {
    if (!(e instanceof PointerEvent)) return;

    if (this.#isInside(e)) {
      this.hover = true;
      this.active = true;
      this.#triggerClick = true;
    } else {
      this.hover = false;
      this.active = false;
      this.#triggerClick = false;
    }
  };

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
