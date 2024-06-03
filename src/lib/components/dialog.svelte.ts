import { addListener } from "$lib/actions/addListener";
import DialogUI from "$lib/ui/dialog/Dialog.svelte";
import type { role } from "$lib/utils/roles";
import { mount, unmount, type Snippet } from "svelte";
import { ChocoBase } from "./base.svelte";

export type DialogProps = {
	class?: string;
	role?: (typeof role)["dialog" | "alertdialog"];
	preventScroll?: boolean;
	closeOnOutsideClick?: boolean;
	onclose?: (ev: HTMLElementEventMap["close"]) => void;
	snippet?: Snippet;
};

const defaults = {
	role: "dialog",
	preventScroll: true,
	closeOnOutsideClick: true,
} satisfies DialogProps;

/**
 * ## Dialog
 *
 * Adheres to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
 */
export class Dialog extends ChocoBase<HTMLButtonElement> {
	#options: DialogProps = $state({});
	returnValue: string | undefined = $state();

	constructor(options?: DialogProps) {
		super();
		this.#options = { ...defaults, ...options };
		this.extendActions(addListener("click", async () => await this.showModal()));
	}

	showModal = () => {
		console.log("show modal");
		return new Promise((resolve) => {
			console.log("mounting");
			const dialog = mount(DialogUI, {
				target: document.body,
				props: {
					...this.#options,
					onclose: (e) => {
						console.log("closing");
						console.log("returnValue", this.returnValue);
						this.#options.onclose?.(e);
						const returnValue = (e.currentTarget as HTMLDialogElement)?.returnValue;
						this.returnValue = returnValue;
						resolve(returnValue);
						unmount(dialog);
						console.log("returnValue", this.returnValue);
					},
				},
			});
		});
	};

	close = () => {};
}
