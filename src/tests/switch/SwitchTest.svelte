<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Switch } from "$lib/headless/switch.svelte";

  let disabled = $state(false);

  const toggle = new Switch();
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

  <button data-testid="switch" use:choco={toggle} {disabled}>press</button>
</main>
