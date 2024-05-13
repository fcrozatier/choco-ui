<script lang="ts">
	import { Switch as SwitchToggle } from "$lib/components/switch.svelte";
	import Switch from "$lib/ui/switch/switch.svelte";

	const toggle = new SwitchToggle();
</script>

<form>
	<div class="flex items-center">
		<label class="text-magnum-900 pr-4 leading-none" for="airplane-mode" id="airplane-mode-label">
			Airplane mode
		</label>
		<input
			{...toggle.attributes}
			use:toggle.action
			class="bg-magnum-800 aria-checked:bg-magnum-950 relative h-6 cursor-default rounded-full transition-colors"
			id="airplane-mode"
			aria-labelledby="airplane-mode-label"
		/>
	</div>
</form>

<div class="flex items-center space-x-2">
	<Switch id="airplane-mode" />
</div>
