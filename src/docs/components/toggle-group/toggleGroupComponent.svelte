<script lang="ts">
  import * as ToggleGroup from "$lib/components/toggle-group/index.js";

  let group: string[] = $state([]);
</script>

<p>Select your chocolate toppings</p>

<ToggleGroup.Root bind:group variant="default" focus={{ loop: true, roving: true }}>
  <ToggleGroup.Item value="nuts">Nuts</ToggleGroup.Item>
  <ToggleGroup.Item value="caramel" variant="outline">Caramel</ToggleGroup.Item>
  <ToggleGroup.Item value="salt" active>Sea Salt</ToggleGroup.Item>
  <ToggleGroup.Item value="crunch" active>Crunch</ToggleGroup.Item>
</ToggleGroup.Root>

<p>Choice: {group}</p>
