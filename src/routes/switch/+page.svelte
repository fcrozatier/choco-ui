<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { Switch as SwitchToggle } from "$lib/components/switch.svelte";
	import { bind } from "$lib/plugin";
	import Switch from "$lib/ui/switch/switch.svelte";

	let active = $state(true);

	const toggle = new SwitchToggle(bind({ active }, ["active"]));
</script>

<p>
	<input type="checkbox" name="bind" id="bind" bind:checked={active} />
	<label for="bind" class="select-none">Bind active</label>
</p>

<form>
	<div class="flex items-center">
		<button
			use:choco={toggle}
			class="bg-magnum-800 aria-checked:bg-magnum-600 relative h-6 cursor-default rounded-full transition-colors"
			id="airplane-mode"
			aria-labelledby="airplane-mode-label">Airplane mode</button
		>
	</div>
</form>

<div class="flex items-center space-x-2">
	<Switch id="airplane-mode" bind:active />
</div>
