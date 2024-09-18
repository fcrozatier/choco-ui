<script lang="ts" module>
  export type DialogProps = {
    title?: string;
    description?: string;
    alertDialog?: boolean;
    closeOnClickOutside?: boolean;
    showOnMount?: boolean;
    onclose?: (
      ev: Event & {
        currentTarget: EventTarget & HTMLDialogElement;
      },
    ) => void;
    returnValue?: string;
    /**
     * The list of buttons in the common case of a bottom action bar
     */
    actions?: Snippet;
    /**
     * When you need more than an action bar
     */
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
    actions,
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
  class={"my-auto mx-auto max-w-xl min-w-xs rounded-xl p-0 shadow-2xl backdrop:backdrop-blur-sm sm:min-w-sm md:min-w-md"}
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
    {#if children}
      <div class="mt-6">
        {@render children()}
      </div>
    {/if}
    {#if actions}
      <div class="mt-6 flex flex-col justify-end gap-2 sm:mt-4 sm:flex-row">
        {@render actions()}
      </div>
    {/if}
  </form>
</dialog>
