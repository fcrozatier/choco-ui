<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte";

  let active = $state(true);

  const toggle = new ToggleButton({ active: () => active, setActive: (v) => (active = v) });
</script>

<label>
  <span>bind</span>
  <input type="checkbox" bind:checked={active} />
</label>

<p class="flex justify-center">
  <button class="py-2 px-4 outline" use:choco={toggle}> toggle</button>
</p>

<output>{toggle.active ? "active" : "inactive"}</output>

<pre>{JSON.stringify(toggle.attributes, null, 2)}</pre>
