import { addListener } from "$lib/actions/addListener";
import { ChocoBase } from "./base.svelte";

/**
 * A set of `data-*` attributes for reliably styling the `active` state, cancelling it when the cursor leaves the target.
 */
export class Button extends ChocoBase<HTMLButtonElement> {
	#isPointerEvent = $state(false);

	constructor() {
		super();

		this.extendAttributes({
			"data-hover": false,
			"data-active": false,
			"data-focus": false,
			"data-focus-visible": false,
		});
		this.extendActions(
			addListener(["pointerenter"], () => {
				this.attributes["data-hover"] = true;
			}),
		);
		this.extendActions(
			addListener(["pointerleave"], () => {
				this.attributes["data-hover"] = false;
				this.attributes["data-active"] = false;
			}),
		);
		this.extendActions(
			addListener(["pointerdown"], () => {
				this.#isPointerEvent = true;
				this.attributes["data-active"] = true;
			}),
		);
		this.extendActions(
			addListener(["pointerup"], () => {
				this.#isPointerEvent = false;
				this.attributes["data-active"] = false;
			}),
		);
		this.extendActions(
			addListener("focusin", () => {
				if (!this.#isPointerEvent) {
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
