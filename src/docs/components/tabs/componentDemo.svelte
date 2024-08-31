<script lang="ts">
  import * as Tabs from "$lib/components/tabs/index.js";
</script>

<p>Explore different types of chocolate</p>

<Tabs.Root value="dark" focus={{ loop: true }} class="mx-auto max-w-lg">
  <Tabs.TabList aria-label="Update your account">
    <Tabs.Tab value="dark">Dark Chocolate</Tabs.Tab>
    <Tabs.Tab value="milk">Milk Chocolate</Tabs.Tab>
    <Tabs.Tab value="white">White Chocolate</Tabs.Tab>
    <!-- <Tabs.Tab value="password">Password</Tabs.Tab> -->
  </Tabs.TabList>

  <Tabs.Panel value="dark" class="p-4 text-sm">
    Dark chocolate is known for its rich, intense flavor and high cocoa content, usually ranging
    from 70% to 99%. It’s less sweet than milk chocolate, offering a more bitter taste that
    chocolate connoisseurs often prefer.
  </Tabs.Panel>
  <Tabs.Panel value="milk" class="p-4 text-sm">
    Milk chocolate is the most popular type of chocolate worldwide. It’s made with milk powder or
    condensed milk, giving it a creamy texture and a sweeter taste compared to dark chocolate. Milk
    chocolate typically contains around 10% to 50% cocoa, making it less intense but more accessible
    to a wider audience.
  </Tabs.Panel>
  <Tabs.Panel value="white" class="p-4 text-sm">
    White chocolate is a sweet, creamy treat made from cocoa butter, sugar, and milk solids. Unlike
    dark and milk chocolate, white chocolate doesn’t contain cocoa solids, which means it lacks the
    traditional "chocolatey" flavor.
  </Tabs.Panel>
</Tabs.Root>
