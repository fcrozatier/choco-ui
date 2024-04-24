<script lang="ts">
	import { t } from "$lib/ui/theme";
	import { createToggleGroup } from "$lib/builders/toggle-group/toggle-group.svelte";
	import type { Orientation } from "$lib/internal/types";
	import * as ToggleGroupp from "$lib/ui/toggle-group";
	import { nanoId } from "$lib/utils/nano";

	let disabled: boolean | undefined = $state();
	let variant: "outline" | "default" = $state("default");
	let orientation: Orientation = $state("horizontal");

	let pressed: (() => []) | undefined = $state();

	let group = $state([]);

	// Unselectable radio group
	const toggleGroup = createToggleGroup({
		exclusive: true,
		focus: { onFocus: (_, to) => to.click() },
	});
	const { createItem: createItem2 } = createToggleGroup();
</script>

{#snippet toggleItem({ value, id = nanoId(), item = toggleGroup.createItem() })}
	<input use:item.action {id} {value} name="toggle-group" />
	<label for={id}>{value}</label>
{/snippet}

<div class={t.toggleGroup.root({ orientation: "horizontal" })}>
	<legend>toggle group</legend>
	{@render toggleItem({ value: "bold" })}
	{@render toggleItem({ value: "underline" })}
	{@render toggleItem({ value: "italic" })}
</div>

checked
<pre>{toggleGroup.pressed}</pre>
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
	<ToggleGroupp.Root {orientation} {variant} {disabled} focus={{ loop: true }} bind:pressed>
		<ToggleGroupp.Item value="B" pressed>B</ToggleGroupp.Item>
		<ToggleGroupp.Item value="I" variant="outline">I</ToggleGroupp.Item>
		<ToggleGroupp.Item value="U">U</ToggleGroupp.Item>
	</ToggleGroupp.Root>
{/key}

pressed
<pre>{pressed?.()}</pre>

{#snippet toggleItem2({ value, item = createItem2() })}
	<button use:item.action class={t.toggleGroup.item()} {value}>{value}</button>
{/snippet}

<fieldset class={t.toggleGroup.root()}>
	<legend>toggle group</legend>

	{#each ["B", "I", "U"] as value}
		{@render toggleItem2({ value })}
	{/each}
</fieldset>
