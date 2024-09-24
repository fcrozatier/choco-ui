<script lang="ts">
  import Tooltip from "$lib/components/tooltip/tooltip.svelte";

  let active = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked={active} data-testid="checkbox" /> show
</label>

<Tooltip bind:active>
  <button data-testid="abbr"> HTML </button>
  {#snippet target()}
    <span> Hyper Text Markup Language </span>
  {/snippet}
</Tooltip>

<span data-testid="active">
  {active}
</span>
