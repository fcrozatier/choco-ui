<script lang="ts">
  import { Switch } from "$lib/components/switch/index.js";

  let checked = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked />
  bind
</label>

<h2 class="text-sm">Hot Chocolate</h2>
<p class="flex">
  <label class="mx-auto inline-flex items-center gap-3">
    <Switch variant="outline" bind:active={checked}></Switch>
    <span>Whipped Cream Option?</span>
  </label>
</p>

<div class="mt-8 space-y-2">
  <p class="mb-2 font-semibold">Choice: {checked ? "Whipped Cream" : "No Whipped Cream"}</p>
  <p class="text-sm italic leading-tight">
    {#if checked}
      Whipped cream added! Extra indulgence unlocked.
    {:else}
      No whipped cream this time—just hot chocolate in its simplest form!
    {/if}
  </p>
</div>
