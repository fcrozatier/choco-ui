<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
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
  <label for="bind" class="select-none" id="label">Bind active</label>
</p>

<div class="grid place-items-center">
  <div class="relative">
    <button
      use:choco={switchToggle}
      class="before:bg-coral h-6 cursor-default cursor-pointer rounded-full transition-colors before:absolute before:top-2 before:-left-4 before:h-2 before:w-2 before:rounded-full aria-checked:before:bg-green-500"
      >Airplane mode:</button
    >
    <span class="absolute -right-8">{switchToggle.active ? "on " : "off"}</span>
  </div>
</div>

<pre>{JSON.stringify(switchToggle.attributes, null, 2)}</pre>
