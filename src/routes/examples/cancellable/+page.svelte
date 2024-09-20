<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Cancellable } from "$lib/mixins/cancellable.svelte";

  const b = new Cancellable();
</script>

<p class="p-10">
  <button class="py-2 px-4" use:choco={b}>Improved button Canceller</button>
</p>

<pre>{JSON.stringify(b.attributes, null, 2)}</pre>

<style>
  button {
    border-radius: var(--radius-sm);
    transition: all 200ms ease-out;

    &:hover {
      background: var(--color-coral);
    }

    &[data-active="true"] {
      background-color: var(--color-coral);
      scale: 0.95;
    }
  }
</style>
