<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import Switch from "$lib/components/switch/switch.svelte";
  import { Switch as SwitchToggle } from "$lib/headless/switch.svelte";

  let active = $state(true);

  const switchToggle = new SwitchToggle({
    active: () => active,
    setActive(v) {
      active = v;
    },
  });
</script>

<p>
  <input type="checkbox" name="bind" id="bind" bind:checked={active} />
  <label for="bind" class="select-none">Bind active</label>
</p>

<form>
  <div class="flex items-center">
    <button
      use:choco={switchToggle}
      class=" relative h-6 cursor-default rounded-full transition-colors aria-checked:outline"
      >Airplane mode</button
    >
  </div>
</form>

<div class="flex items-center space-x-2">
  <Switch bind:active />
</div>
