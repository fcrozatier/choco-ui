<script lang="ts">
  import Tooltip from "$lib/components/tooltip/tooltip.svelte";

  let active = $state(false);
</script>

<label class="flex items-center gap-2">
  open tooltip
  <input id="checkbox" type="checkbox" bind:checked={active} />
</label>

<div class="flex justify-center">
  <Tooltip bind:active position="bottom">
    Chocolate Truffe*
    {#snippet target()}
      <span class="max-w-sm text-sm leading-tight">
        A decadent treat made with a ganache center coated in cocoa powder, nuts, or more chocolate.
      </span>
    {/snippet}
  </Tooltip>
</div>
show
{active}
