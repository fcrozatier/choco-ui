<script lang="ts">
	import { createPressToggle } from "$lib/builders/toggle/press.svelte";
	import Toggle from "$lib/ui/toggle/toggle.svelte";

	let disabled = $state(false);

	const toggle = createPressToggle({
		pressed: true,
		disabled: true,
	});

	const toggle1 = createPressToggle({
		pressed: false,
	});

	const toggle2 = createPressToggle({
		pressed: false,
	});

	const toggle3 = createPressToggle({
		pressed: false,
		disabled: true,
	});

	$effect(() => {
		toggle.state.disabled = disabled;
		toggle1.state.disabled = disabled;
		toggle2.state.disabled = disabled;
	});
</script>

<h1>Toggle</h1>

<label>
	<span>disable</span>
	<input type="checkbox" bind:checked={disabled} />
</label>

<h2>Button</h2>

<p>
	<button use:toggle.action> I'm {toggle.state.pressed ? "" : "not"} pressed</button>
</p>

<h2>Input</h2>

<p>
	<input
		id="press"
		class="outline-2 outline-red-500 checked:outline-green-500"
		type="checkbox"
		use:toggle1.action
	/>

	<label for="press">input toggle</label>
</p>

<h2>Styled</h2>

<button
	use:toggle2.action
	aria-label="Toggle italic"
	class="text-magnum-800 hover:bg-magnum-100 aria-pressed:bg-magnum-200 aria-pressed:text-magnum-900 grid h-9 w-9
	place-items-center items-center justify-center rounded-md bg-white text-base
    leading-4 shadow-lg
    disabled:cursor-not-allowed"
>
	I
</button>

<Toggle builder={toggle3} variant="outline">toggle</Toggle>
