<script lang="ts">
  import { Disclosure } from "$lib/components/disclosure/index.js";

  let active = $state(false);
</script>

<label
  >bind
  <input type="checkbox" bind:checked={active} />
</label>

<Disclosure bind:active>
  {#snippet header()}
    Do you have dark choco?
  {/snippet}
  Sure!
</Disclosure>
