<script lang="ts">
  import Disclosure from "$lib/components/disclosure/disclosure.svelte";

  let active = $state(false);
</script>

<label class="flex items-center gap-2">
  <input type="checkbox" bind:checked={active} /> open
</label>

<Disclosure bind:active>
  {#snippet header()}
    Is it bindable?
  {/snippet}
  <div>Yup!</div>
</Disclosure>
