<script lang="ts">
  import Switch from "$lib/components/switch/switch.svelte";

  let checked = $state(false);
</script>

<main>
  <label>
    <input data-testid="bind" type="checkbox" bind:checked />
    toggle
  </label>

  <label>
    switch
    <Switch data-testid="switch" bind:active={checked}></Switch>
  </label>
</main>
