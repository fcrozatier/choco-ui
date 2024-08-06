<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte.js";
  import { bind } from "$plugin/bind.js";

  let checked = $state(false);

  const toggle = new ToggleButton(
    bind(
      {
        active: checked, // This will be expanded into getters and setters
        value: "toggle",
      },
      ["active"], // List reactive props to bind, discoverable, type-safe
    ),
  );
</script>

<p>
  <label>
    <input type="checkbox" bind:checked />
    active
  </label>
</p>

<button use:choco={toggle}>Click</button>

<pre>{JSON.stringify(toggle.attributes, null, 2)}</pre>
