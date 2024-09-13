<script lang="ts">
  import { clickOutside } from "$lib/actions/clickOutside.js";
  import type { DialogProps } from "$lib/headless/dialog.svelte";
  import { nanoId } from "@fcrozatier/ts-helpers";

  let {
    class: className = "",
    alertDialog = false,
    closeOnClickOutside = true,
    returnValue = $bindable(),
    children,
    onclose = (e) => {
      returnValue = e.currentTarget.returnValue;
    },
  }: DialogProps = $props();

  let dialog: HTMLDialogElement | undefined = $state();

  export const showModal = () => {
    dialog?.showModal();
  };

  const id = nanoId();
</script>

<dialog
  class={className}
  bind:this={dialog}
  {onclose}
  aria-modal="true"
  aria-labelledby={`modal-title-${id}`}
  aria-describedby={`modal-description-${id}`}
  role={alertDialog ? "alertdialog" : "dialog"}
>
  <form
    method="dialog"
    use:clickOutside={() => {
      if (closeOnClickOutside) {
        dialog?.close();
      }
    }}
  >
    <h2 id={`modal-title-${id}`}>title</h2>
    <p id={`modal-description-${id}`}>description</p>
    {@render children?.()}
  </form>
</dialog>
