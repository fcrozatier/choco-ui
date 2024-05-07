<script lang="ts">
	import { createToggleGroup } from "$lib/builders/toggle-group/toggle-group.svelte";
	import type { Orientation } from "$lib/internal/types";
	import * as SwitchGroup from "$lib/ui/switch-group";
	import { nanoId } from "$lib/utils/nano";

	let disabled: boolean | undefined = $state();
	let variant: "outline" | "default" = $state("default");
	let orientation: Orientation = $state("horizontal");

	let selected: (() => string[]) | undefined = $state();

	const { createItem, pressed } = createToggleGroup({ exclusive: true });
</script>

{#snippet toggleItem({ id = nanoId(), value })}
	{@const item = createItem({ kind: "switch" })}
	<!-- <button use:item.action {id} {value} name="toggle-group">{value}</button> -->
	<input use:item.action {id} {value} name="toggle-group" />
	<label for={id}>{value}</label>
{/snippet}

<fieldset>
	<legend>toggle group</legend>
	{@render toggleItem({ value: "left align" })}
	{@render toggleItem({ value: "center" })}
	{@render toggleItem({ value: "right align" })}
</fieldset>

selected
<pre>{pressed}</pre>

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
	<SwitchGroup.Root {orientation} {variant} {disabled} focus={{ loop: true }}>
		<SwitchGroup.Item value="B" pressed>B</SwitchGroup.Item>
		<SwitchGroup.Item value="I" variant="outline">I</SwitchGroup.Item>
		<SwitchGroup.Item value="U">U</SwitchGroup.Item>
	</SwitchGroup.Root>
{/key}

selected
<pre>{selected?.()}</pre>
