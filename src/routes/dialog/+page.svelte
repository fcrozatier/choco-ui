<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { Dialog } from "$lib/components/dialog.svelte";

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
