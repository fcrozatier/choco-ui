<script lang="ts">
	import { t } from "$lib/ui/theme";
	import Toggle from "$lib/ui/toggle/toggle.svelte";
	import { createToggler } from "$lib/builders/toggler/toggler.svelte";
	import { ToggleButton } from "$lib/components/toggle.svelte";

	let disabled = $state(false);

	const raw = createToggler({ control: { "aria-checked": "true" } });

	const toggle = new ToggleButton({
		pressed: true,
	});

	const toggle2 = new ToggleButton({
		pressed: false,
	});

	const toggle4 = new ToggleButton({ pressed: true });
</script>

<h1>Toggle</h1>

<h2>Raw</h2>

<p>
	<button use:raw.control>Click {raw.active}</button>
</p>

<label>
	<span>disable</span>
	<input type="checkbox" bind:checked={disabled} />
</label>

<label>
	<span>programmatic change</span>
	<input type="checkbox" onchange={() => (toggle.active = !toggle.active)} />
</label>

<h2>Button</h2>

<p>
	<button {...toggle.attributes} use:toggle.action {disabled}>
		I'm {toggle.active ? "" : "not"} pressed</button
	>
</p>

<h2>Styled</h2>

<button
	{...toggle2.attributes}
	use:toggle2.action
	aria-label="Toggle italic"
	class="text-magnum-800 hover:bg-magnum-100 aria-pressed:bg-magnum-200 aria-pressed:text-magnum-900 grid h-9 w-9
	place-items-center items-center justify-center rounded-md bg-white text-base
    leading-4 shadow-lg
    disabled:cursor-not-allowed"
>
	I
</button>

<Toggle variant="outline">toggle</Toggle>

<button class={t.toggle()} {...toggle4.attributes} use:toggle4.action>toggle</button>
