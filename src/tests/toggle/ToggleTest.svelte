<script lang="ts">
  import { choco } from "$lib/choco.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte";

  const toggle = new ToggleButton();
</script>

<main>
  <label>
    <input
      data-testid="programmatic"
      type="checkbox"
      onchange={() => (toggle.active = !toggle.active)}
    />
    toggle programmatically
  </label>

  <button use:choco={toggle}>press</button>
</main>
