<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte";
  import { bind } from "chocobytes/plugin";

  let active = $state(true);

  const toggle = new ToggleButton(bind({ active }, ["active"]));
</script>

<label>
  <span>bind</span>
  <input type="checkbox" bind:checked={active} />
</label>

<p class="flex justify-center">
  <button class="outline" use:choco={toggle}> toggle</button>
</p>

<output>{toggle.active ? "active" : "inactive"}</output>

<pre>{JSON.stringify(toggle.attributes, null, 2)}</pre>
