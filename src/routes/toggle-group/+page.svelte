<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { ToggleGroup } from "$lib/components/toggle-group.svelte";
	import type { Orientation } from "$lib/mixins/types";
	import { t } from "$lib/ui/theme";
	import * as ToggleGroupUI from "$lib/ui/toggle-group";
	import { bind } from "choco-ui/plugin";

	let disabled: boolean | undefined = $state();
	let variant: "outline" | "default" = $state("default");
	let orientation: Orientation = $state("horizontal");

	let group = $state([]);

	const toggleGroup = new ToggleGroup({ exclusive: true, activateOnFocus: true });

	toggleGroup.createItem({ value: "orange" });
	toggleGroup.createItem({ value: "banana" });
	toggleGroup.createItem({ value: "apple" });

	let checked: string[] = $state(["B"]);
	const toggleGroup2 = new ToggleGroup(bind({ loop: true, active: checked }, ["active"]));

	toggleGroup2.createItem({ value: "B", active: false });
	toggleGroup2.createItem({ value: "I", active: false });
	toggleGroup2.createItem({ value: "U", active: true });

	let toggleUI: ToggleGroupUI.Root | undefined = $state();
	const active = $derived(toggleUI?.active());
</script>

<div class={t.toggleGroup.root({ orientation: "horizontal" })}>
	<legend>toggle group</legend>

	{#each toggleGroup.items as item}
		<button use:choco={item}>{item.attributes.value}</button>
	{/each}
</div>

checked
<pre>{toggleGroup.active}</pre>
<pre>{group}</pre>

<label>
	disable
	<input type="checkbox" bind:checked={disabled} />
</label>

<label>
	variant
	<select name="" id="" bind:value={variant}>
		<option value="default">default</option>
		<option value="outline">outline</option>
	</select>
</label>

<label>
	orientation
	<select name="" id="" bind:value={orientation}>
		<option value="horizontal">horizontal</option>
		<option value="vertical">vertical</option>
	</select>
</label>

{#key variant}
	<ToggleGroupUI.Root
		bind:this={toggleUI}
		{orientation}
		{variant}
		{disabled}
		focus={{ loop: true, roving: true }}
	>
		<ToggleGroupUI.Item value="B" active>B</ToggleGroupUI.Item>
		<ToggleGroupUI.Item value="I" variant="outline">I</ToggleGroupUI.Item>
		<ToggleGroupUI.Item value="U">U</ToggleGroupUI.Item>
	</ToggleGroupUI.Root>
{/key}

active
<pre>{active}</pre>

<fieldset class={t.toggleGroup.root()}>
	<legend>toggle group</legend>

	{#each toggleGroup2.items as item}
		<button use:choco={item} class={t.toggleGroup.item()}>{item.value}</button>
	{/each}
</fieldset>

<fieldset>
	<legend>checkbox list</legend>

	<label for="1">
		B
		<input type="checkbox" bind:group={checked} value="B" id="1" />
	</label>
	<label for="2">
		I
		<input type="checkbox" bind:group={checked} value="I" id="2" />
	</label>
	<label for="3">
		U
		<input type="checkbox" bind:group={checked} value="U" id="3" />
	</label>
</fieldset>

toggle
{toggleGroup2.active}
<br />
check
{checked}
