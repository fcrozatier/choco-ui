<script lang="ts">
	import Tooltip from "$lib/components/tooltip/tooltip.svelte";

	let show = $state(false);
</script>

<label>
	<input type="checkbox" bind:checked={show} data-testid="checkbox" /> show
</label>

<Tooltip bind:active={show}>
	<button data-testid="abbr"> HTML </button>
	{#snippet target()}
		<span> Hyper Text Markup Language </span>
	{/snippet}
</Tooltip>

<span data-testid="show">
	{show}
</span>
