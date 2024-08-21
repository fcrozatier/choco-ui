<script lang="ts">
  import { choco } from "$lib/choco.js";
  import { Dialog } from "$lib/headless/dialog.svelte";

  const dialog = new Dialog({ snippet: dialogSnippet, closeOnOutsideClick: true });
</script>

<button use:choco={dialog}>Flag</button>

{#snippet dialogSnippet()}
  <div class="p-8">
    <h2>Continue?</h2>
    <button value="no">No</button>
    <button value="yes">Yes</button>
  </div>
{/snippet}

<br />

{dialog.returnValue}
