<script lang="ts">
  import Tooltip from "$lib/components/tooltip/tooltip.svelte";

  let active = $state(false);
</script>

<p>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi autem ipsum totam similique
  tenetur corrupti officia, temporibus eaque quisquam consectetur unde assumenda placeat nulla alias
  vel qui pariatur eos doloremque?
</p>

<label for="checkbox">show tooltip</label>
<input id="checkbox" type="checkbox" bind:checked={active} />

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
