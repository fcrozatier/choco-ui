<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Cancellable } from "$lib/blocks/cancellable.svelte";

  const b1 = new Cancellable();
  const b2 = new Cancellable();
  const b3 = new Cancellable();

  let button = $state(0);
  let anchor = $state(0);
</script>

<p class="flex gap-4 p-10">
  <button
    class="active:bg-coral py-2 px-4 hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-blue-300 active:scale-95"
    onclick={() => console.log("click")}>button</button
  >

  <button
    class="py-2 px-4"
    onclick={() => {
      console.log("hi");
      button++;
    }}
    use:choco={b2}>Improved button Canceller <span class="tabular-nums">{button}</span></button
  >
  <a
    class="inline-block py-2 px-4"
    href="/"
    onclick={(e) => {
      e.preventDefault();
      anchor++;
    }}
    use:choco={b3}>Improved a Canceller <span class="tabular-nums">{anchor}</span></a
  >
</p>

<form
  onsubmit={(e) => {
    console.log("submit");
    e.preventDefault();
  }}
>
  <button class="py-2 px-4" use:choco={b1}>Submit</button>
</form>

<pre>{JSON.stringify(b2.attributes, null, 2)}</pre>
<pre>{JSON.stringify(b3.attributes, null, 2)}</pre>

<div class="grid min-h-full"><span class="mt-auto">bottom</span></div>

<style>
  button,
  a {
    border-radius: var(--radius-sm);
    transition:
      background 200ms ease-out,
      scale 200ms ease-out;
  }

  /* Better control on the cascade */
  [data-hover="true"] {
    background-color: var(--color-red-400);
  }

  [data-active="true"] {
    background-color: var(--color-coral);
    scale: 95%;
  }

  [data-focus-visible="true"] {
    outline: 2px solid var(--color-blue-300);
  }
</style>
