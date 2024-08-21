<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";
  import type { GroupOptions } from "$lib/mixins/group.svelte";

  let { focus }: { focus?: GroupOptions } = $props();

  const toggleGroup = new ToggleGroup(focus);

  toggleGroup.createItem({ value: "A" });
  toggleGroup.createItem({ value: "B" });
  toggleGroup.createItem({ value: "C" });
</script>

<button data-testid="before">before</button>

<fieldset>
  <legend>toggle group</legend>

  {#each toggleGroup.items as item}
    <button data-testid={item.value} use:choco={item}>{item.value}</button>
  {/each}
</fieldset>

<button data-testid="after">after</button>

<span data-testid="active">{toggleGroup.group}</span>
