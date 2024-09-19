<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import * as ToggleGroupUI from "$lib/components/toggle-group/index.js";
  import ToggleGroupItem from "$lib/components/toggle-group/toggle-group-item.svelte";
  import ToggleGroupRoot from "$lib/components/toggle-group/toggle-group.svelte";
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";
  import type { Orientation } from "$lib/utils/types.js";

  let disabled: boolean | undefined = $state();
  let variant: "outline" | "default" = $state("default");
  let orientation: Orientation = $state("vertical");

  const toggleGroup = new ToggleGroup({ roving: true, exclusive: true, activateOnNext: true });

  toggleGroup.createItem({ value: "orange" });
  toggleGroup.createItem({ value: "banana" });
  toggleGroup.createItem({ value: "apple" });

  let checked: string[] = $state(["B"]);
  const toggleGroup2 = new ToggleGroup({
    loop: true,
    group: () => checked,
    setGroup(v) {
      checked = v;
    },
  });

  toggleGroup2.createItem({ value: "B", active: false });
  toggleGroup2.createItem({ value: "I", active: false });
  toggleGroup2.createItem({ value: "U", active: true });

  let group1: string[] = $state([]);
  let group2: string[] = $state([]);
</script>

<section class="my-10">
  <p>
    <button>before</button>
  </p>
  <legend>toggle group</legend>

  <div class="flex gap-2">
    {#each toggleGroup.items as item}
      <button use:choco={item}>{item.attributes.value}</button>
    {/each}
  </div>

  <p><button>after</button></p>
  <p>checked</p>
  <pre>{toggleGroup.group}</pre>
</section>

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
  {#key orientation}
    <ToggleGroupUI.Root
      bind:group={group1}
      {variant}
      {disabled}
      focus={{ loop: true, roving: true, orientation }}
    >
      <ToggleGroupUI.Item value="B" active>B</ToggleGroupUI.Item>
      <ToggleGroupUI.Item value="I" variant="outline">I</ToggleGroupUI.Item>
      <ToggleGroupUI.Item value="U">U</ToggleGroupUI.Item>
    </ToggleGroupUI.Root>
  {/key}
{/key}

<ToggleGroupRoot
  bind:group={group2}
  {variant}
  {disabled}
  focus={{ loop: true, roving: true, orientation }}
>
  <ToggleGroupItem value="B">B</ToggleGroupItem>
  <ToggleGroupItem value="I" variant="outline">I</ToggleGroupItem>
  <ToggleGroupItem value="U" active>U</ToggleGroupItem>
</ToggleGroupRoot>

active
<pre>1: {group1}</pre>
<pre>2: {group2}</pre>

<section class="my-10">
  <fieldset>
    <legend>toggle group</legend>

    <div class="flex gap-2">
      {#each toggleGroup2.items as item}
        <button class="rounded py-2 px-4 outline aria-pressed:underline" use:choco={item}
          >{item.value}</button
        >
      {/each}
    </div>
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
  {toggleGroup2.group}
  <br />
  check
  {checked}
</section>
