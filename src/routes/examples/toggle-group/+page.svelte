<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import * as ToggleGroupUI from "$lib/components/toggle-group/index.js";
  import ToggleGroupItem from "$lib/components/toggle-group/toggle-group-item.svelte";
  import ToggleGroupRoot from "$lib/components/toggle-group/toggle-group.svelte";
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";
  import type { Orientation } from "$lib/mixins/types.js";
  import { bind } from "chocobytes/plugin";

  let disabled: boolean | undefined = $state();
  let variant: "outline" | "default" = $state("default");
  let orientation: Orientation = $state("horizontal");

  const toggleGroup = new ToggleGroup({ roving: true, exclusive: true, activateOnNext: true });

  toggleGroup.createItem({ value: "orange" });
  toggleGroup.createItem({ value: "banana" });
  toggleGroup.createItem({ value: "apple" });

  let checked: string[] = $state(["B"]);
  const toggleGroup2 = new ToggleGroup(bind({ loop: true, active: checked }, ["active"]));

  toggleGroup2.createItem({ value: "B", active: false });
  toggleGroup2.createItem({ value: "I", active: false });
  toggleGroup2.createItem({ value: "U", active: true });

  let toggleUI: ToggleGroupUI.Root | undefined = $state();
  let toggleUI2: ToggleGroupUI.Root | undefined = $state();
  const active = $derived(toggleUI?.active());
</script>

<button>before</button>
<div>
  <legend>toggle group</legend>

  {#each toggleGroup.items as item}
    <button use:choco={item}>{item.attributes.value}</button>
  {/each}
</div>

<button>after</button>

<fieldset>
  <input type="radio" name="group" value="A" id="" />
  <input type="radio" name="group" value="B" id="" />
  <input type="radio" name="group" value="C" id="" />
</fieldset>

checked
<pre>{toggleGroup.active}</pre>

<label>
  disable
  <input type="checkbox" bind:checked={disabled} />
</label>

<label>
  variant
  <select name="" id="" bind:value={variant}>
    <option value="default">default</option>
    <option value="outline">outline</option>
  </select>
</label>

<label>
  orientation
  <select name="" id="" bind:value={orientation}>
    <option value="horizontal">horizontal</option>
    <option value="vertical">vertical</option>
  </select>
</label>

{#key variant}
  <ToggleGroupUI.Root
    bind:this={toggleUI}
    {orientation}
    {variant}
    {disabled}
    focus={{ loop: true, roving: true }}
  >
    <ToggleGroupUI.Item value="B" active>B</ToggleGroupUI.Item>
    <ToggleGroupUI.Item value="I" variant="outline">I</ToggleGroupUI.Item>
    <ToggleGroupUI.Item value="U">U</ToggleGroupUI.Item>
  </ToggleGroupUI.Root>
{/key}

<ToggleGroupRoot
  bind:this={toggleUI2}
  {orientation}
  {variant}
  {disabled}
  focus={{ loop: true, roving: true }}
>
  <ToggleGroupItem value="B">B</ToggleGroupItem>
  <ToggleGroupItem value="I" variant="outline">I</ToggleGroupItem>
  <ToggleGroupItem value="U" active>U</ToggleGroupItem>
</ToggleGroupRoot>

active
<pre>1: {active}</pre>
<pre>2: {toggleUI2?.active()}</pre>

<fieldset>
  <legend>toggle group</legend>

  {#each toggleGroup2.items as item}
    <button use:choco={item}>{item.value}</button>
  {/each}
</fieldset>

<fieldset>
  <legend>checkbox list</legend>

  <label for="1">
    B
    <input type="checkbox" bind:group={checked} value="B" id="1" />
  </label>
  <label for="2">
    I
    <input type="checkbox" bind:group={checked} value="I" id="2" />
  </label>
  <label for="3">
    U
    <input type="checkbox" bind:group={checked} value="U" id="3" />
  </label>
</fieldset>

toggle
{toggleGroup2.active}
<br />
check
{checked}
