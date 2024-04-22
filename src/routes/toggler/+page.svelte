<script lang="ts">
	import { Toggler } from "$lib/builders/toggler/toggler.svelte";

	const toggle = new Toggler({ "aria-pressed": "false" });
	let disabled = $state(false);
</script>

<button onclick={toggle.toggle}>toggle</button>
<button onclick={() => (disabled = true)}>disable</button>

<button use:toggle.action {disabled} onclick={() => console.log("hello")}>I use a toggler</button>
