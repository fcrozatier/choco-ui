<script lang="ts">
  import Tooltip from "$lib/components/tooltip/tooltip.svelte";

  let active = $state(false);
</script>

<label class="flex items-center gap-2">
  open tooltip
  <input id="checkbox" type="checkbox" bind:checked={active} />
</label>

<div class="ml-40">
  <Tooltip bind:active position="right">
    HTML
    {#snippet target()}
      Hyper Text Markup Language
    {/snippet}
  </Tooltip>
</div>
show
{active}
