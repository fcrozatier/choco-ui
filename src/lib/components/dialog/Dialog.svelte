<script lang="ts" module>
  export type DialogProps = {
    title?: string;
    description?: string;
    /**
     * @default false
     */
    alertDialog?: boolean;
    /**
     * @default true
     */
    closeOnClickOutside?: boolean;
    /**
     * @default false
     */
    showOnMount?: boolean;
    onclose?: (
      ev: Event & {
        currentTarget: EventTarget & HTMLDialogElement;
      },
    ) => void;
    /**
     * The return value (bindable)
     */
    returnValue?: string;
    children?: Snippet;
  };
</script>

<script lang="ts">
  import { nanoId } from "@fcrozatier/ts-helpers";
  import { clickOutside } from "chocobytes/actions/clickOutside.js";
  import { onMount, type Snippet } from "svelte";

  let {
    title,
    description,
    alertDialog = false,
    closeOnClickOutside = true,
    returnValue = $bindable(),
    showOnMount = false,
    onclose = (e) => {
      returnValue = e.currentTarget.returnValue;
    },
    children,
  }: DialogProps = $props();

  let dialog: HTMLDialogElement | undefined = $state();

  export const showModal = () => {
    dialog?.showModal();
  };

  const id = nanoId();

  onMount(() => {
    if (showOnMount) {
      dialog?.showModal();
    }
  });
</script>

<dialog
  class={"my-auto mx-auto max-w-xl rounded-xl p-0 shadow-2xl backdrop:backdrop-blur-sm"}
  bind:this={dialog}
  {onclose}
  aria-modal="true"
  aria-labelledby={`modal-title-${id}`}
  aria-describedby={`modal-description-${id}`}
  role={alertDialog ? "alertdialog" : "dialog"}
>
  <form
    class="pt-6 px-4 pb-8 shadow-xl sm:px-6"
    method="dialog"
    use:clickOutside={() => {
      if (closeOnClickOutside) {
        dialog?.close();
      }
    }}
  >
    <div class="text-center sm:text-left">
      <h3 class="text-base font-semibold leading-6 text-gray-900" id={`modal-title-${id}`}>
        {title}
      </h3>
      <div class="mt-2">
        <p class="text-sm text-gray-500" id={`modal-description-${id}`}>
          {description}
        </p>
      </div>
    </div>
    <div class="mt-6 flex flex-col justify-end gap-2 sm:mt-4 sm:flex-row">
      {@render children?.()}
    </div>
  </form>
</dialog>
