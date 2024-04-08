<script>
	import { createPressToggle } from "$lib/builders/toggle/press.svelte";
	import Toggle from "$lib/ui/toggle/toggle.svelte";

	let checked = $state(false);

	const toggle = createPressToggle({
		pressed: false,
	});

	$effect(() => {
		toggle.state.disabled = checked;
	});
</script>

<label>
	<span>disable</span>
	<input type="checkbox" bind:checked />
</label>

<button use:toggle.action> I'm {toggle.state.pressed ? "" : "not"} pressed</button>

<button
	use:toggle.action
	aria-label="Toggle italic"
	class="text-magnum-800 hover:bg-magnum-100 aria-pressed:bg-magnum-200 aria-pressed:text-magnum-900 grid h-9 w-9
	place-items-center items-center justify-center rounded-md bg-white text-base
    leading-4 shadow-lg
    disabled:cursor-not-allowed"
>
	I
</button>

<Toggle variant="outline">toggle</Toggle>
