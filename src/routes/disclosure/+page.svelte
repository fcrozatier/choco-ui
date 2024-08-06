<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { DisclosureUI } from "$lib/components/disclosure/index.js";
  import { Disclosure } from "$lib/headless/disclosure.svelte";
  import { bind } from "$plugin/bind.js";

  let active = $state(false);

  const disclosure = new Disclosure(bind({ active }, ["active"]));
</script>

<p>
  <label
    >Active
    <input type="checkbox" bind:checked={active} />
  </label>
</p>

<button class="cursor-pointer" use:choco={disclosure}>
  <span
    class={`inline-flex size-2 ${disclosure.active ? "rotate-90" : ""} origin-center items-center justify-center transition-transform duration-200`}
  >
    &rsaquo;
  </span>
  When is the deadline?
</button>

{#if disclosure.active}
  <div>There is no deadline, ship when you are ready!</div>
{/if}

<DisclosureUI bind:active>
  {#snippet header()}
    When is the deadline?
  {/snippet}
  <div>There is no deadline, ship when you are ready!</div>
</DisclosureUI>
