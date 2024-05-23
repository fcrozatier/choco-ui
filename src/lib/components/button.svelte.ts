import { addListener } from "$lib/actions/addListener";
import { ChocoBase } from "./base.svelte";

/**
 * A set of `data-*` attributes for reliable styling the `active` and focus states.  `data-active` is removed when the cursor leaves the target, even if it is still pressed, to convey the "cancellability" of the action (will not trigger).
 */
export class Button extends ChocoBase<HTMLButtonElement> {
	#isPointerEvent = $state(false);
	#isKeyboardEvent = $state(false);

	constructor() {
		super();

		this.extendAttributes({
			"data-hover": false,
			"data-active": false,
			"data-focus": false,
			"data-focus-visible": false,
		});

		this.extendActions(() => {
			const turnOn = () => (this.#isKeyboardEvent = true);
			const turnOff = () => (this.#isKeyboardEvent = false);

			document.addEventListener("keydown", turnOn);
			document.addEventListener("keyup", turnOff);

			return {
				destroy() {
					document.removeEventListener("keydown", turnOn);
					document.removeEventListener("keydup", turnOff);
				},
			};
		});
		this.extendActions(
			addListener("pointerenter", (e) => {
				e.pointerType;
				this.attributes["data-hover"] = true;
			}),
		);
		this.extendActions(
			addListener("pointerleave", () => {
				this.attributes["data-hover"] = false;
				this.attributes["data-active"] = false;
			}),
		);
		this.extendActions(
			addListener("pointerdown", () => {
				this.#isPointerEvent = true;
				this.attributes["data-active"] = true;
			}),
		);
		this.extendActions(
			addListener("pointerup", () => {
				this.#isPointerEvent = false;
				this.attributes["data-active"] = false;
			}),
		);
		this.extendActions(
			addListener("focusin", () => {
				if (this.#isKeyboardEvent && !this.#isPointerEvent) {
					this.attributes["data-focus-visible"] = true;
				}
				this.attributes["data-focus"] = true;
			}),
		);
		this.extendActions(
			addListener("focusout", () => {
				this.attributes["data-focus-visible"] = false;
				this.attributes["data-focus"] = false;
			}),
		);
	}
}
