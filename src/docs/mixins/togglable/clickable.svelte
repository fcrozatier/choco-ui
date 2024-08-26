<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Clickable } from "./clickable.svelte.js";

  const btn = new Clickable();
</script>

<div class="my-10 flex justify-center gap-2">
  <button class="py-2 px-4" use:choco={btn}>Improved button</button>
  <button class="active:bg-coral py-2 px-4 active:scale-95">Standard button</button>
</div>

<pre>{JSON.stringify(btn.attributes, null, 2)}</pre>

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
