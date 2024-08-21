<script lang="ts">
  import { choco } from "$lib/choco.js";
  import * as SwitchGroup from "$lib/components/switch-group/index.js";
  import { SwitchGroup as SG } from "$lib/headless/switch-group.svelte";
  import type { Orientation } from "$lib/utils/types.js";

  let disabled: boolean | undefined = $state();
  let variant: "outline" | "default" = $state("default");
  let orientation: Orientation = $state("horizontal");

  const sGroup = new SG({ exclusive: true });

  const items = [
    sGroup.createItem({ value: "left" }),
    sGroup.createItem({ value: "center" }),
    sGroup.createItem({ value: "right" }),
  ];

  let group: string[] = $state([]);
</script>

<fieldset>
  <legend>toggle group</legend>
  {#each items as item}
    <button use:choco={item}>{item.value}</button>
  {/each}
</fieldset>

selected
<pre>{sGroup.group}</pre>

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
  <SwitchGroup.Root {orientation} {variant} element={{ disabled: true }} bind:group>
    <SwitchGroup.Item value="B" active>B</SwitchGroup.Item>
    <SwitchGroup.Item value="I" variant="outline">I</SwitchGroup.Item>
    <SwitchGroup.Item value="U">U</SwitchGroup.Item>
  </SwitchGroup.Root>
{/key}

selected
<pre>{group}</pre>
