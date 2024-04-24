<script lang="ts">
	import { createToggler } from "$lib/builders/toggler/toggler.svelte";

	const toggle = createToggler({ control: { "aria-pressed": "false" } });
	let disabled = $state(false);

	const { control, target } = createToggler({
		target: { checked: false },
		control: { "aria-pressed": "false" },
	});
</script>

<p>Use a toggler to toggle an attribute on click.</p>

<button onclick={toggle.toggle}>toggle</button>
<button onclick={() => (disabled = !disabled)}>disable</button>
<button onclick={toggle.on}>turn on</button>
<button onclick={toggle.off}>turn off</button>

<button use:toggle.control {disabled} onclick={() => console.log("hello")}
	>I use a toggler. My state is {toggle.active}</button
>

<p>A toggler can also control a target</p>

<label for="">
	check me
	<input type="checkbox" use:target />
</label>

<button use:control onclick={() => console.log("hello")}>toggle checked state</button>
