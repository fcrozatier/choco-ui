<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { ToggleButton } from "$lib/components/toggle.svelte";
	import { bind } from "$lib/plugin";

	let checked = $state(false);

	const toggle = new ToggleButton(bind({ active: checked }, ["active"]));
</script>

<main>
	<label>
		<input data-testid="bind" type="checkbox" bind:checked />
		toggle programmatically
	</label>

	<button use:choco={toggle}>press</button>
</main>
