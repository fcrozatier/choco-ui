<script lang="ts">
	import type { Orientation } from "$lib/internal/types";
	import * as ToggleGroup from "$lib/ui/toggle-group";

	let disabled: boolean | undefined = $state();
	let variant: "outline" | "default" = $state("default");
	let orientation: Orientation = $state("horizontal");

	let pressed: (() => []) | undefined = $state();

	let group = $state([]);
</script>

<fieldset>
	<legend>toggle group</legend>
	<input bind:group type="checkbox" id="bold" value="bold" name="toggle-group" />
	<label for="bold">bold</label>
	<input bind:group type="checkbox" id="italic" value="italic" name="toggle-group" />
	<label for="italic">italic</label>
	<input bind:group type="checkbox" id="underline" value="underline" name="toggle-group" />
	<label for="underline">underline</label>
</fieldset>

<pre>{JSON.stringify(group, null, 2)}</pre>

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
	<ToggleGroup.Root {orientation} {variant} {disabled} loop={false} bind:pressed>
		<ToggleGroup.Item value="B" pressed disabled>B</ToggleGroup.Item>
		<ToggleGroup.Item value="I" variant="outline">I</ToggleGroup.Item>
		<ToggleGroup.Item value="U">U</ToggleGroup.Item>
	</ToggleGroup.Root>
{/key}

pressed
<pre>{pressed?.()}</pre>
