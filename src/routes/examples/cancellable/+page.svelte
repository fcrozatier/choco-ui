<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ChocoBase } from "$lib/headless/base.svelte";
  import { Cancellable, Cancellable2, Canceller } from "$lib/mixins/cancellable.svelte";

  class Button extends Cancellable(ChocoBase) {}
  class Button2 extends Cancellable2(ChocoBase) {}
  const btn = new Button();
  const btn2 = new Button2();
  const b = new Canceller();
</script>

<p class="p-10">
  <button class="py-2 px-4" use:choco={btn}>Improved button</button>
</p>

<p class="p-10">
  <button class="py-2 px-4" use:choco={btn2}>Improved button 2</button>
</p>

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
