<script lang="ts">
  import * as ToggleGroupUI from "$lib/components/toggle-group/index.js";

  let group: string[] = $state([]);
</script>

<fieldset>
  <legend>checkbox list</legend>

  <label>
    A
    <input data-testid="checkbox-1" type="checkbox" bind:group value="A" />
  </label>
  <label>
    B
    <input data-testid="checkbox-2" type="checkbox" bind:group value="B" />
  </label>
  <label>
    C
    <input data-testid="checkbox-3" type="checkbox" bind:group value="C" />
  </label>
</fieldset>

<ToggleGroupUI.Root bind:group variant="default">
  <ToggleGroupUI.Item value="A" element={{ "data-testid": "A" }}>A</ToggleGroupUI.Item>
  <ToggleGroupUI.Item value="B" element={{ "data-testid": "B" }}>B</ToggleGroupUI.Item>
  <ToggleGroupUI.Item value="C" element={{ "data-testid": "C" }}>C</ToggleGroupUI.Item>
</ToggleGroupUI.Root>

<span data-testid="checked">{group}</span>
