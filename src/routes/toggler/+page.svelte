<script lang="ts">
	import { Toggler } from "$lib/mixins/toggler/toggler.svelte";

	const toggle = new Toggler({ initial: { "aria-pressed": "false" } });
	let disabled = $state(false);
</script>

<p>Use a toggler to toggle an attribute on click.</p>

<button onclick={() => toggle.toggle()}>toggle</button>
<button onclick={() => (disabled = !disabled)}>disable</button>
<button onclick={() => toggle.on()}>turn on</button>
<button onclick={() => toggle.off()}>turn off</button>

<button {...toggle.attributes} use:toggle.action {disabled} onclick={() => console.log("hello")}
	>I use a toggler. My state is {toggle.active ? "on" : "off"}</button
>
