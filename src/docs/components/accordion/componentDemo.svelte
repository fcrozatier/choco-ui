<script lang="ts">
  import * as Accordion from "$lib/components/accordion/index.js";

  let group = $state([]);
</script>

<Accordion.Root class="mx-auto max-w-md" focus={{ exclusive: true, loop: true }} bind:group>
  <Accordion.Item value="item-1">
    {#snippet header()}
      Is it accessible?
    {/snippet}

    Yes. It adheres to the WAI-ARIA design pattern.
  </Accordion.Item>
  <Accordion.Item value="item-2">
    {#snippet header()}
      Is it styled?
    {/snippet}

    Yes. It comes with default styles that matches the other components' aesthetic.
  </Accordion.Item>
  <Accordion.Item value="item-3">
    {#snippet header()}
      Is it animated?
    {/snippet}

    Yes. It's animated by default, but you can disable it if you prefer.
  </Accordion.Item>
</Accordion.Root>

<div class="mt-20 flex gap-4">
  <span>open:</span>
  <label class="inline-flex gap-2"><input type="checkbox" bind:group value="item-1" />item-1</label>
  <label class="inline-flex gap-2"><input type="checkbox" bind:group value="item-2" />item-2</label>
  <label class="inline-flex gap-2"><input type="checkbox" bind:group value="item-3" />item-3</label>
</div>
