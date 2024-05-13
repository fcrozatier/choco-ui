<script lang="ts">
	import { ToggleButton } from "$lib/components/toggle.svelte";

	let disabled = $state(false);

	const toggle = new ToggleButton();
</script>

<main>
	<label>
		<input
			data-testid="programmatic"
			type="checkbox"
			onchange={() => (toggle.active = !toggle.active)}
		/>
		toggle programmatically
	</label>

	<button {...toggle.attributes} use:toggle.action {disabled}>press</button>
</main>
