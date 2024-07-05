<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import * as SwitchGroup from "$lib/components/switch-group/index.js";
  import { SwitchGroup as SG } from "$lib/headless/switch-group.svelte";
  import type { Orientation } from "$lib/mixins/types.js";

  let disabled: boolean | undefined = $state();
  let variant: "outline" | "default" = $state("default");
  let orientation: Orientation = $state("horizontal");

  const group = new SG({ exclusive: true });

  const items = [
    group.createItem({ value: "left" }),
    group.createItem({ value: "center" }),
    group.createItem({ value: "right" }),
  ];

  let switchGroup: SwitchGroup.Root | undefined = $state();
</script>

<fieldset>
  <legend>toggle group</legend>
  {#each items as item}
    <button use:choco={item}>{item.value}</button>
  {/each}
</fieldset>

selected
<pre>{group.active}</pre>

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
  <SwitchGroup.Root {orientation} {variant} {disabled} bind:this={switchGroup}>
    <SwitchGroup.Item value="B" active>B</SwitchGroup.Item>
    <SwitchGroup.Item value="I" variant="outline">I</SwitchGroup.Item>
    <SwitchGroup.Item value="U">U</SwitchGroup.Item>
  </SwitchGroup.Root>
{/key}

selected
<pre>{switchGroup?.selected()}</pre>
