<script lang="ts">
	import { ToggleGroup } from "$lib/headless/toggle-group.svelte";
	import { nanoId } from "@fcrozatier/ts-helpers";

	const group = new ToggleGroup();

	group.createItem({ value: nanoId() });
	group.createItem({ value: nanoId() });
	group.createItem({ value: nanoId() });
</script>

<div>
	<legend>toggle group</legend>
	{#each group.items as item}
		<p>
			<button {...item.attributes} use:item.action>
				{item.value}
			</button>
		</p>
	{/each}
</div>
