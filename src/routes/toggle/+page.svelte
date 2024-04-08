<script>
	import { createPressToggle } from '$lib/builders/toggle/press.svelte';

	let checked = $state(false);
	let change = $state(false);

	const toggle = createPressToggle({
		pressed: true
	});

	$effect(() => {
		toggle.state.disabled = checked;
	});
</script>

<h1>statee to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<label>
	<span>change</span>
	<input type="checkbox" bind:checked={change} />
</label>
<label>
	<span>disable</span>
	<input type="checkbox" bind:checked />
</label>

<button use:toggle.action> I'm {toggle.state.pressed ? '' : 'not'} pressed</button>
state
