<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Cancellable } from "./cancellable.svelte.js";

  const btn = new Cancellable();
</script>

<div class="my-10 flex justify-center gap-2">
  <button class="py-2 px-4 data-[active=true]:scale-95" use:choco={btn}>Improved button</button>
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
  }
</style>
