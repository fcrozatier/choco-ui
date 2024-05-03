<script lang="ts">
	import { FocusGroup, Group } from "$lib/components/group.svelte";
	import { ToggleButton } from "$lib/components/toggle.svelte";
	import { nanoId } from "$lib/utils/nano";

	const group = new Group(ToggleButton);
	const focusGroup = new FocusGroup({ cls: ToggleButton });

	console.log(group.items.length);
</script>

<h2>Raw groupp</h2>

{#snippet toggleItem({ value, id = nanoId() })}
	{@const item = group.createItem({ kind: "press" })}
	<button {...item.attributes} use:item.action {id} {value} name="toggle-group">
		{value}
	</button>
{/snippet}

<div>
	<legend>toggle group</legend>
	{@render toggleItem({ value: "bold" })}
	{@render toggleItem({ value: "underline" })}
	{@render toggleItem({ value: "italic" })}
</div>

<h2>Focus group</h2>

{#snippet focusItem({ value, id = nanoId() })}
	{@const item = focusGroup.createItem({ kind: "press" })}
	<button {...item.attributes} use:item.action {id} {value} name="toggle-group">
		{value}
	</button>
{/snippet}

<div>
	<legend>focus group</legend>
	{@render focusItem({ value: "bold" })}
	{@render focusItem({ value: "underline" })}
	{@render focusItem({ value: "italic" })}
</div>
