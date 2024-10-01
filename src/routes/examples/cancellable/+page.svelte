<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Cancellable } from "$lib/blocks/cancellable.svelte";

  const b2 = new Cancellable({ allowContextMenus: true });
  const b3 = new Cancellable({ allowContextMenus: true });

  let base = $state(0);
  let cancellable = $state(0);
  let anchor = $state(0);
</script>

<article class="prose">
  <p class="not-prose flex gap-4 p-10">
    <button
      class="active:bg-coral bg-red-500 py-2 px-4 outline-2 outline-offset-2 hover:bg-red-400 hover:outline-red-400 focus-visible:outline-2 focus-visible:outline-blue-300 active:scale-95"
      onclick={() => {
        console.log("click");
        base++;
      }}>button <span class="tabular-nums">{base}</span></button
    >

    <button
      class="py-2 px-4 outline-none select-none"
      onclick={() => {
        console.log("hi", cancellable);
        cancellable++;
      }}
      use:choco={b3}>Cancellable <span class="tabular-nums">{cancellable}</span></button
    >
    <a
      class="inline-block py-2 px-4 outline-none focus:outline-none"
      href="/"
      onclick={(e) => {
        e.preventDefault();
        anchor++;
      }}
      use:choco={b2}>Improved a Canceller <span class="tabular-nums">{anchor}</span></a
    >

    <button
      class="active:bg-coral bg-red-500 py-2 px-4 outline-2 outline-offset-2 hover:bg-red-400 hover:outline-red-400 focus-visible:outline-2 focus-visible:outline-blue-300 active:scale-95"
      onclick={() => {
        console.log("click");
        base++;
      }}>button <span class="tabular-nums">{base}</span></button
    >
  </p>

  <pre>{JSON.stringify(b3.attributes, null, 2)}</pre>

  <div class="grid min-h-full"><span class="mt-auto">bottom</span></div>
</article>

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
