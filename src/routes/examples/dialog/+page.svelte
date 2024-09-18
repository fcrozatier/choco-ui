<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import DialogUI from "$lib/components/dialog/Dialog.svelte";
  import { Dialog } from "$lib/headless/dialog.svelte";

  const dialog = new Dialog({ title: "title", children: dialogSnippet, closeOnClickOutside: true });

  let dialogElement: DialogUI | undefined = $state();
  let returnValue: string | undefined = $state();
</script>

{#snippet dialogSnippet()}
  <div class="p-8">
    <h2>Continue?</h2>
    <button value="no">No</button>
    <button value="yes">Yes</button>
  </div>
{/snippet}

<article class="prose">
  <h1>Dialog</h1>

  <h2>Snippet machinery</h2>

  <button use:choco={dialog}>Flag</button>

  <br />

  {dialog.returnValue}

  <h2>Element</h2>

  <button onclick={() => dialogElement?.showModal()}>Open</button>

  <DialogUI bind:this={dialogElement} bind:returnValue closeOnClickOutside>
    <div class="p-8">
      <h2>Continue?</h2>
      <button value="no">No</button>
      <button value="yes">Yes</button>
    </div>
  </DialogUI>

  {returnValue}
</article>
