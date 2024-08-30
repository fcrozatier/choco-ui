<script lang="ts">
  import * as Accordion from "$lib/components/accordion/index.js";
</script>

<Accordion.Root class="mx-auto max-w-md">
  <Accordion.Item value="item-1">
    {#snippet header()}
      The Origins of Chocolate
    {/snippet}

    Chocolate has been around for over 3,000 years. The ancient Olmecs of southern Mexico were among
    the first to turn cacao beans into a drink, which later became a prized beverage in Mayan and
    Aztec cultures. It wasn’t sweet back then—it was often spiced with chili peppers!
  </Accordion.Item>
  <Accordion.Item value="item-2">
    {#snippet header()}
      Chocolate and Your Mood
    {/snippet}

    Ever wonder why chocolate makes you feel good? It’s packed with flavonoids, which are believed
    to improve heart health, lower blood pressure, and even boost brain function.
  </Accordion.Item>
  <Accordion.Item value="item-2">
    {#snippet header()}
      The World’s Largest Chocolate Bar
    {/snippet}

    The world’s largest chocolate bar weighed over 12,770 pounds (about 5,800 kilograms) and was
    created in the UK in 2011. It was about the size of an adult African elephant!
  </Accordion.Item>
</Accordion.Root>
