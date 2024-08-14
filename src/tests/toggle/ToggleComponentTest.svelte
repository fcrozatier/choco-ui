<script lang="ts">
  import Toggle from "$lib/components/toggle/toggle.svelte";

  let checked = $state(false);
</script>

<main>
  <label>
    <input data-testid="bind" type="checkbox" bind:checked />
    toggle
  </label>

  <Toggle bind:active={checked}>press</Toggle>
</main>
