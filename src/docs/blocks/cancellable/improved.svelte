<script lang="ts">
  import { Cancellable } from "$lib/blocks/cancellable.svelte.js";
  import { choco } from "chocobytes/index.js";

  let button = $state(0);
  let anchor = $state(0);

  let cancellableButton = new Cancellable();
  let cancellableAnchor = new Cancellable();
</script>

<p class="mt-0! mb-10! text-balance text-center">
  Styling with the <code class="whitespace-nowrap">data-hover</code>,
  <code class="whitespace-nowrap">data-active</code>
  and
  <code class="whitespace-nowrap">data-focus-within</code> attributes from the
  <code>Cancellable</code> class
</p>

<div class="not-prose grid grid-cols-2 gap-8">
  <button
    class="cursor-pointer rounded py-2 px-4 outline-2 outline-slate-100 transition-all"
    onclick={() => {
      console.log("button clicked");
      button++;
    }}
    use:choco={cancellableButton}
  >
    Button {button}
  </button>
  <a
    class="rounded py-2 px-4 text-center text-slate-100! outline-2 outline-slate-100 transition-all"
    href="/"
    onclick={(e) => {
      e.preventDefault();
      console.log("anchor clicked");
      anchor++;
    }}
    use:choco={cancellableAnchor}
  >
    Anchor {anchor}
  </a>
</div>

<style>
  [data-hover="true"] {
    background-color: var(--color-coral);
  }

  [data-active="true"] {
    background-color: var(--color-orange-700);
    scale: 95%;
  }

  [data-focus-visible="true"] {
    outline: 2px solid var(--color-coral);
    outline-offset: 2px;
  }
</style>
