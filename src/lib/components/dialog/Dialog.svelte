<script lang="ts">
  import type { DialogProps } from "$lib/headless/dialog.svelte";
  import { clickOutside } from "chocobytes/actions/clickOutside.js";
  import { onMount } from "svelte";

  let {
    class: className = "",
    snippet,
    onclose,
    role,
    closeOnOutsideClick,
  }: DialogProps = $props();

  let dialog: HTMLDialogElement | undefined = $state();

  onMount(() => {
    dialog?.showModal();
  });
</script>

<dialog {role} {onclose} class={className} bind:this={dialog} aria-modal="true">
  <form
    method="dialog"
    use:clickOutside={() => {
      if (closeOnOutsideClick) {
        dialog?.close();
      }
    }}
  >
    {@render snippet?.()}
  </form>
</dialog>
