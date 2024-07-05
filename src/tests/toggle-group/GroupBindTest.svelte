<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";
  import type { GroupOptions } from "$lib/mixins/group.svelte";
  import { bind } from "$lib/plugin/bind.js";

  let { options }: { options: GroupOptions } = $props();

  let checked = $state([]);
  const toggleGroup = new ToggleGroup(bind({ ...options, active: checked }, ["active"]));

  toggleGroup.createItem({ value: "A" });
  toggleGroup.createItem({ value: "B" });
  toggleGroup.createItem({ value: "C" });
</script>

<fieldset>
  <legend>toggle group</legend>

  {#each toggleGroup.items as item}
    <button data-testid={item.value} use:choco={item}>{item.value}</button>
  {/each}
</fieldset>

<fieldset>
  <legend>checkbox list</legend>

  <label>
    A
    <input data-testid="checkbox-1" type="checkbox" bind:group={checked} value="A" />
  </label>
  <label>
    B
    <input data-testid="checkbox-2" type="checkbox" bind:group={checked} value="B" />
  </label>
  <label>
    C
    <input data-testid="checkbox-3" type="checkbox" bind:group={checked} value="C" />
  </label>
</fieldset>

<span data-testid="active">{toggleGroup.active}</span>
<span data-testid="checked">{checked}</span>
