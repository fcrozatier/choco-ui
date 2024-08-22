<script lang="ts">
  import { Switch } from "$lib/components/switch/index.js";

  let checked = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked />
  bind
</label>

<p class="flex">
  <label class="mx-auto inline-flex items-center gap-2">
    <Switch variant="outline" bind:active={checked}></Switch>
    <span>notifications</span>
  </label>
</p>
