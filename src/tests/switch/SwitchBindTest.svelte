<script lang="ts">
	import { choco } from "$lib/actions/choco.js";
	import { Switch } from "$lib/components/switch.svelte";
	import { bind } from "$lib/plugin/bind.js";

	let checked = $state(false);

	const toggle = new Switch(bind({ active: checked }, ["active"]));
</script>

<main>
	<label>
		<input data-testid="bind" type="checkbox" bind:checked />
		toggle programmatically
	</label>

	<button data-testid="switch" use:choco={toggle}>press</button>
</main>
