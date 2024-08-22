<script lang="ts">
  import * as ToggleGroup from "$lib/components/toggle-group/index.js";

  let group = $state([]);
</script>

<ToggleGroup.Root bind:group variant="default" focus={{ loop: true, roving: true }}>
  <ToggleGroup.Item value="B">B</ToggleGroup.Item>
  <ToggleGroup.Item value="I" variant="outline">I</ToggleGroup.Item>
  <ToggleGroup.Item value="U" active>U</ToggleGroup.Item>
</ToggleGroup.Root>

<span>Active: {group}</span>
