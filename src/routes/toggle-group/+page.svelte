<script lang="ts">
	import { createToggleGroup } from "$lib/builders/toggle-group/toggle-group.svelte";
	import type { Orientation } from "$lib/internal/types";
	import * as ToggleGroup from "$lib/ui/toggle-group";
	import { nanoId } from "$lib/utils/nano";

	let disabled: boolean | undefined = $state();
	let variant: "outline" | "default" = $state("default");
	let orientation: Orientation = $state("horizontal");

	let pressed: (() => []) | undefined = $state();

	let group = $state([]);

	const { action: toggleGroup, createItem } = createToggleGroup();
</script>

{#snippet toggleItem({ id = nanoId(), value })}
	{@const item = createItem({ value })}
	<input use:item.action bind:group type="checkbox" {id} {value} name="toggle-group" />
	<label for={id}>{value}</label>
{/snippet}

<fieldset use:toggleGroup>
	<legend>toggle group</legend>
	{@render toggleItem({ value: "bold" })}
	{@render toggleItem({ value: "underline" })}
	{@render toggleItem({ value: "italic" })}
</fieldset>

checked
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
	<ToggleGroup.Root {orientation} {variant} {disabled} loop={true} bind:pressed>
		<ToggleGroup.Item value="B" pressed>B</ToggleGroup.Item>
		<ToggleGroup.Item value="I" variant="outline">I</ToggleGroup.Item>
		<ToggleGroup.Item value="U">U</ToggleGroup.Item>
	</ToggleGroup.Root>
{/key}

pressed
<pre>{pressed?.()}</pre>
