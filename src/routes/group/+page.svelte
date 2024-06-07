<script lang="ts">
	import { ToggleGroup } from "$lib/components/toggle-group.svelte";
	import { nanoId } from "@fcrozatier/ts-helpers";

	const group = new ToggleGroup();

	group.createItem({});
	group.createItem({});
	group.createItem({});
</script>

<div>
	<legend>toggle group</legend>
	{#each group.items as item}
		<p>
			<button {...item.attributes} use:item.action>
				{nanoId()}
			</button>
		</p>
	{/each}
</div>
