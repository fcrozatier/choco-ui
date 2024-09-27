import { addListener } from "chocobytes/actions/addListener.js";
import { key } from "chocobytes/utils/keyboard.js";
import { ChocoBase } from "./base.svelte.js";

/**
 * ## Cancellable
 *
 * Adds `data-hover`, `data-active` and `data-focus-visible` attributes to improve the behavior: the `data-active` attribute is removed when the cursor leaves the target (which is not the case with the CSS `:active` pseudo selector), even when it is still pressed, to convey the cancellability of the action (which will not trigger).
 */
export class Cancellable extends ChocoBase<"a" | "button"> {
  #boundaries: DOMRect | undefined;
  dragging = $state(false);
  hover = $state(false);
  active = $state(false);
  #tabPressed = false;
  triggerClick = $state(false);
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
      addListener("pointerdown", (e: Event) => {
        console.log("on", e.target, this.dragging, this.triggerClick);
        if (!(e instanceof PointerEvent && e.isPrimary)) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        // Prevent mouse events
        e.preventDefault();
        this.active = true;
        this.dragging = true;
        this.triggerClick = true;
        this.#boundaries = this.element.getBoundingClientRect();
        this.element.setPointerCapture(e.pointerId);
        this.element.addEventListener("pointermove", this.#handlePointerMove);
      }),
    );
    this.extendActions(
      addListener("pointerup", (e) => {
        if (!(e instanceof PointerEvent)) return;
        console.log("pointerup", e.target, this.dragging, this.triggerClick);
        this.element.releasePointerCapture(e.pointerId);
        this.element.removeEventListener("pointermove", this.#handlePointerMove);
        this.dragging = false;
        if (this.triggerClick) {
          this.element.click();
        }
        // else if (e.pointerType === "touch") {
        //   this.hover = false;
        // }
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
        console.log("leave", e.target, this.dragging, this.triggerClick);
        this.hover = false;
      }),
    );
    this.extendActions(addListener("contextmenu", (e) => e.preventDefault()));
    this.extendActions(
      // Needed on mobile
      addListener(["touchstart", "touchmove", "touchend"], (e) => {
        // Avoid browser interventions when scrolling as they are not cancelable
        if (e.cancelable) {
          e.preventDefault();
        }
      }),
    );
    this.extendActions(
      addListener("lostpointercapture", (e) => {
        console.log("lost capture", e.target, this.dragging, this.triggerClick);
      }),
    );
    this.extendActions(
      addListener("pointercancel", () => {
        console.log("cancel");
      }),
    );

    this.extendActions(
      addListener("click", (e) => {
        console.log("click", e.target, this.dragging, this.triggerClick);

        if (!this.triggerClick) {
          console.log("prevented");
          e.preventDefault();
          e.stopImmediatePropagation();
        }

        this.active = false;
        this.triggerClick = false;
      }),
    );

    this.extendActions(
      addListener("keydown", (e) => {
        if (!(e instanceof KeyboardEvent)) return;
        if (e.key !== key.SPACE && e.key !== key.ENTER) return;

        if (this.focusVisible) {
          this.active = true;
          this.triggerClick = true;
          e.preventDefault();
        }
      }),
    );

    this.extendActions(
      addListener("keyup", (e) => {
        if (!(e instanceof KeyboardEvent)) return;
        if (e.key !== key.SPACE && e.key !== key.ENTER) return;

        if (this.focusVisible) {
          if (this.triggerClick) {
            this.element.click();
          }

          if (!this.dragging) {
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
          this.triggerClick = false;
          this.active = false;
          this.#tabPressed = false;
          if (this.dragging) {
            this.element.removeEventListener("pointermove", this.#handlePointerMove);
            this.dragging = false;
          }
        } else {
          this.#tabPressed = false;
        }
      };

      const pointerdown = (e: PointerEvent) => {
        console.log("document pointer down");
        if (this.element && e.target instanceof Node && !this.element.contains(e.target)) {
          this.active = false;
          this.hover = false;
          this.#tabPressed = false;
          this.triggerClick = false;
          this.dragging = false;
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

  #handlePointerMove = (e: Event) => {
    console.log("move", e.target, this.dragging, this.triggerClick);
    if (!(e instanceof PointerEvent)) return;
    // e.preventDefault();

    if (this.#isInside(e)) {
      this.hover = true;
      this.active = true;
      this.triggerClick = true;
    } else {
      this.hover = false;
      this.active = false;
      this.triggerClick = false;
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
