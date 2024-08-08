<script lang="ts">
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";

  const group1 = new ToggleGroup();
  const group2 = new ToggleGroup();

  group1.createItem({ value: "B", active: false });
  group1.createItem({ value: "I", active: false });
  group1.createItem({ value: "U", active: true });

  group2.createItem({ value: "B", active: true });
  group2.createItem({ value: "I", active: false });
  group2.createItem({ value: "U", active: false });
</script>

<span data-testid="group1">{group1.active}</span>
<span data-testid="group2">{group2.active}</span>
