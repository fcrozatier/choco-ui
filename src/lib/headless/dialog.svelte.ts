import DialogUI, { type DialogProps } from "$lib/components/dialog/Dialog.svelte";
import { ChocoBase } from "$lib/index.js";
import { addListener } from "chocobytes/actions/addListener.js";
import { merge } from "chocobytes/utils/index.js";
import { mount, unmount } from "svelte";

const defaults = {
  alertDialog: false,
  closeOnClickOutside: true,
  showOnMount: true,
} satisfies DialogProps;

/**
 * ## Dialog
 *
 * Adheres to the [Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
 */
export class Dialog extends ChocoBase<"button"> {
  #options: DialogProps = $state({});
  returnValue: string | undefined = $state();

  constructor(options: DialogProps) {
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
