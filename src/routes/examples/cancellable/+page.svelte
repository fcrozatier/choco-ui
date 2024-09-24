<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Cancellable } from "$lib/blocks/cancellable.svelte";

  const b1 = new Cancellable();
  const b2 = new Cancellable();
  const b3 = new Cancellable();
</script>

<p class="p-10">
  <button class="active:bg-coral py-2 px-4 hover:bg-red-400" use:choco={b1}>button</button>
  <button
    class="active py-2 px-4 data-[hover=true]:bg-red-400"
    data-hover={b2.hovered}
    onclick={() => console.log("hi")}
    use:choco={b2}>Improved button Canceller</button
  >
  <a
    class="active inline-block py-2 px-4 data-[hover=true]:bg-red-400"
    href="/"
    data-hover={b3.hovered}
    use:choco={b3}>Improved a Canceller</a
  >
</p>

<pre>{JSON.stringify(b1.attributes, null, 2)}</pre>
<pre>{JSON.stringify(b2.attributes, null, 2)}</pre>
<pre>{JSON.stringify(b3.attributes, null, 2)}</pre>

<style>
  button,
  a {
    border-radius: var(--radius-sm);
    transition: all 200ms ease-out;
  }

  .active[data-active="true"] {
    background-color: var(--color-coral);
    scale: 0.95;
  }
</style>
