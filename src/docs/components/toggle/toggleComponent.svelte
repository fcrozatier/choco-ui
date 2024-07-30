<script lang="ts">
  import { Toggle } from "$lib/components/toggle/index.js";

  let checked = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked />
  bind
</label>

<p class="flex justify-center">
  <Toggle variant="outline" bind:active={checked}>toggle</Toggle>
</p>
