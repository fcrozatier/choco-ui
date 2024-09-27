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
    class="bg-coral rounded py-2 px-4 outline-none transition-all"
    onclick={() => {
      console.log("button clicked");
      button++;
    }}
    use:choco={cancellableButton}
  >
    Button {button}
  </button>
  <a
    class="bg-coral cursor-default rounded py-2 px-4 text-center text-slate-100! no-underline! transition-all"
    style="outline: 2px solid transparent; outline-offset: 2px;"
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

<!-- Just to see what's going on -->
<div class="mt-10 grid">
  <p>Button attributes</p>
  <pre>{JSON.stringify(cancellableButton.attributes, null, 2)}</pre>
  <p>Anchor attributes</p>
  <pre>{JSON.stringify(cancellableAnchor.attributes, null, 2)}</pre>
</div>

<style>
  [data-hover="true"] {
    background-color: var(--color-orange-700);
    cursor: pointer;
  }

  [data-active="true"] {
    scale: 95%;
  }

  [data-focus-visible="true"] {
    outline-color: var(--color-coral) !important;
  }
</style>
