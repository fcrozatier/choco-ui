import { addListener } from "$lib/actions/addListener";
import DialogUI from "$lib/ui/dialog/Dialog.svelte";
import type { role } from "$lib/utils/roles";
import { trimUndefined } from "@fcrozatier/ts-helpers";
import { mount, unmount, type Snippet } from "svelte";
import { ChocoBase } from "./base.svelte";

export type DialogProps = {
	class?: string;
	role?: (typeof role)["dialog" | "alertdialog"];
	closeOnOutsideClick?: boolean;
	onclose?: (ev: HTMLElementEventMap["close"] & { currentTarget: HTMLDialogElement }) => void;
	snippet?: Snippet;
};

const defaults = {
	role: "dialog",
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
		this.#options = { ...defaults, ...trimUndefined(options) };
		this.extendActions(addListener("click", this.showModal));
	}

	showModal = () => {
		const dialog = mount(DialogUI, {
			target: document.body,
			props: {
				...this.#options,
				onclose: (e) => {
					const returnValue = e.currentTarget.returnValue;
					this.returnValue = returnValue;
					this.#options.onclose?.(e);
					unmount(dialog);
				},
			},
		});
	};
}
