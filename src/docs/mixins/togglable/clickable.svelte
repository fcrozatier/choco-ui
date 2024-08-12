<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ChocoBase } from "$lib/headless/base.svelte";
  import { Clickable } from "./clickable.svelte.js";

  // The headless class is empty, it only has the Clickable flavor
  class Button extends Clickable(ChocoBase) {}
  const btn = new Button();
</script>

<p class="p-10">
  <button class="py-2 px-4" use:choco={btn}>Improved button</button>
  <button class="active:bg-coral py-2 px-4 active:scale-95">Standard button</button>
</p>

<style>
  button {
    border-radius: var(--radius-sm);
    transition: all 200ms ease-out;
    cursor: pointer;

    &:hover {
      background: var(--color-coral);
    }

    &[data-active="true"] {
      scale: 0.95;
      background: var(--color-coral);
    }
  }
</style>
