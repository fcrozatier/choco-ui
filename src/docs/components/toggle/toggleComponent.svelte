<script lang="ts">
  import { Toggle } from "$lib/components/toggle/index.js";

  let checked = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked />
  bind
</label>

<p class="text-center">Are you craving chocolate?</p>
<p class="flex justify-center">
  <Toggle variant="outline" bind:active={checked}>Craving</Toggle>
</p>

<p>
  {#if checked}
    Craving Mode Activated! Time to indulge in your favorite chocolate treat
  {:else}
    Not Craving. Maybe later!
  {/if}
</p>
