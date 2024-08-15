<script lang="ts">
  import Switch from "$lib/components/switch/switch.svelte";

  let checked = $state(false);
</script>

<main>
  <label>
    <input data-testid="bind" type="checkbox" bind:checked />
    toggle
  </label>

  <span id="label">label</span>
  <Switch bind:active={checked} element={{ "data-testid": "switch", "aria-labelledby": "label" }}
  ></Switch>
</main>
