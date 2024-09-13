import { addListener } from "$lib/actions/addListener.js";
import { ChocoBase } from "$lib/base.svelte.js";
import DialogUI from "$lib/components/dialog/Dialog.svelte";
import { merge } from "$lib/utils/index.js";
import { mount, unmount, type Snippet } from "svelte";

export type DialogProps = {
  class?: string;
  alertDialog?: boolean;
  closeOnClickOutside?: boolean;
  onclose?: (ev: HTMLElementEventMap["close"] & { currentTarget: HTMLDialogElement }) => void;
  returnValue?: string;
  children?: Snippet;
};

const defaults = {
  alertDialog: false,
  closeOnClickOutside: true,
} satisfies DialogProps;

/**
 * ## Dialog
 *
 * Adheres to the [Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
 */
export class Dialog extends ChocoBase<"button"> {
  #options: DialogProps = $state({});
  returnValue: string | undefined = $state();

  constructor(options?: DialogProps) {
    super();
    this.#options = merge(defaults, options);
    this.extendActions(addListener("click", this.showModal));
  }

  showModal = () => {
    const dialog = mount(DialogUI, {
      target: document.body,
      props: {
        ...this.#options,
        onclose: (e) => {
          this.returnValue = e.currentTarget.returnValue;
          this.#options.onclose?.(e);
          unmount(dialog);
        },
      },
    });
  };
}
