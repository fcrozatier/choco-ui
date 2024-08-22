<script lang="ts">
  import * as SwitchGroup from "$lib/components/switch-group/index.js";

  let group = $state([]);
</script>

<SwitchGroup.Root bind:group>
  <SwitchGroup.Item value="left" active>Left</SwitchGroup.Item>
  <SwitchGroup.Item value="center" variant="outline">Center</SwitchGroup.Item>
  <SwitchGroup.Item value="right">Right</SwitchGroup.Item>
</SwitchGroup.Root>

<span>Active: {group}</span>
