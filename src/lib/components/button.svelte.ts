import { addListener } from "$lib/actions/addListener";
import { ChocoBase } from "./base.svelte";

export class Button extends ChocoBase<HTMLButtonElement> {
	constructor() {
		super();

		this.extendAttributes({
			"data-hover": false,
			"data-focus": false,
			"data-active": false,
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
				this.attributes["data-active"] = true;
			}),
		);
		this.extendActions(
			addListener(["pointerup"], () => {
				this.attributes["data-active"] = false;
			}),
		);
		this.extendActions(
			addListener("focusin", () => {
				this.attributes["data-focus"] = true;
			}),
		);
		this.extendActions(
			addListener("focusout", () => {
				this.attributes["data-focus"] = false;
			}),
		);
	}
}
