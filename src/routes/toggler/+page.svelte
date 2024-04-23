<script lang="ts">
	import { createToggler } from "$lib/builders/toggler/toggler.svelte";

	const toggle = createToggler({ "aria-pressed": "false" });
	let disabled = $state(false);
</script>

<p>Use a toggler to toggle an attribute on click.</p>

<button onclick={toggle.toggle}>toggle</button>
<button onclick={() => (disabled = !disabled)}>disable</button>

<button use:toggle.action {disabled} onclick={() => console.log("hello")}>I use a toggler</button>
