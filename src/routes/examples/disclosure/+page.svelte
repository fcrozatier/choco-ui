<script lang="ts">
  import { choco } from "$lib/choco.js";
  import { Disclosure as DisclosureUI } from "$lib/components/disclosure/index.js";
  import { Disclosure } from "$lib/headless/disclosure.svelte";

  let active = $state(false);

  const disclosure = new Disclosure({
    active: () => active,
    setActive(v) {
      active = v;
    },
  });
</script>

<p>
  <label
    >Active
    <input type="checkbox" bind:checked={active} />
  </label>
</p>
<section class="my-10">
  <h2 class="mb-8 font-semibold">Headless</h2>

  <button class="cursor-pointer" use:choco={disclosure}>
    <span
      class={`inline-flex size-2 ${disclosure.active ? "rotate-90" : ""} origin-center items-center justify-center transition-transform duration-200`}
    >
      &rsaquo;
    </span>
    Do you have dark chocolate?
  </button>

  {#if disclosure.active}
    <div>Absolutely!</div>
  {/if}
</section>

<section class="my-10">
  <h2 class="mb-8 font-semibold">Component</h2>
  <DisclosureUI bind:active>
    {#snippet header()}
      What's the secret ingredient?
    {/snippet}
    <div>Magic!</div>
  </DisclosureUI>
</section>
