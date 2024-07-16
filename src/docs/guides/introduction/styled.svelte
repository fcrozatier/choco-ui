<script lang="ts">
  import * as Accordion from "$lib/components/accordion/index.js";
</script>

<Accordion.Root class="mx-auto max-w-md">
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
</Accordion.Root>
