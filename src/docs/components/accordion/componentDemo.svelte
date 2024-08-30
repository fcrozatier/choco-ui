<script lang="ts">
  import * as Accordion from "$lib/components/accordion/index.js";

  let group = $state([]);
</script>

<div class="mb-12 flex gap-4">
  <span>Binding.</span>
  <label class="inline-flex gap-2"><input type="checkbox" bind:group value="item-1" />item-1</label>
  <label class="inline-flex gap-2"><input type="checkbox" bind:group value="item-2" />item-2</label>
  <label class="inline-flex gap-2"><input type="checkbox" bind:group value="item-3" />item-3</label>
</div>

<Accordion.Root class="mx-auto max-w-md" focus={{ exclusive: true, loop: true }} bind:group>
  <Accordion.Item value="item-1">
    {#snippet header()}
      The Origins of Chocolate
    {/snippet}

    Chocolate’s journey began in ancient Mesoamerica, where the Olmecs, and later the Mayans and
    Aztecs, used cacao beans to make a rich, bitter drink called 'xocolatl.' It was often mixed with
    spices and used in rituals and as currency.
  </Accordion.Item>
  <Accordion.Item value="item-2">
    {#snippet header()}
      The Sweet Science of Chocolate
    {/snippet}

    Chocolate isn’t just delicious—it’s also a complex food with over 600 flavor compounds. In
    comparison, red wine has about 200. The magic happens during the fermentation and roasting of
    cacao beans, which unlocks rich nuanced flavors.
  </Accordion.Item>
  <Accordion.Item value="item-3">
    {#snippet header()}
      The World’s Chocolate Capitals
    {/snippet}

    Some of the best chocolate in the world comes from places like Belgium, Switzerland, and France.
    Belgium is known for its pralines, while Switzerland boasts a history of milk chocolate
    innovations.
  </Accordion.Item>
</Accordion.Root>
