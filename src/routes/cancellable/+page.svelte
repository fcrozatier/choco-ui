<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ChocoBase } from "$lib/headless/base.svelte";
  import { Cancellable } from "$lib/mixins/cancellable.svelte";

  class Button extends Cancellable(ChocoBase) {}
  const btn = new Button();
</script>

<p class="p-10">
  <button class="py-2 px-4" use:choco={btn}>Improved button</button>
</p>

<style>
  button {
    border-radius: var(--radius-sm);
    transition: all 200ms ease-out;

    &:hover {
      background: var(--color-green-100);
    }

    &[data-active="true"] {
      background-color: var(--color-green-300);
      scale: 0.95;
    }
  }
</style>
