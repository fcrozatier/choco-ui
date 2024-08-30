<script lang="ts">
  import Disclosure from "$lib/components/disclosure/disclosure.svelte";

  let active = $state(false);
</script>

<label class="flex items-center gap-2">
  <input type="checkbox" bind:checked={active} /> open
</label>

<Disclosure bind:active>
  {#snippet header()}
    White Chocolate: Is It Real Chocolate?
  {/snippet}
  <div>
    Technically, white chocolate isn’t "real" chocolate because it doesn’t contain cocoa solids.
    It’s made from cocoa butter, sugar, and milk, giving it a creamy texture and a sweeter flavor.
  </div>
</Disclosure>
