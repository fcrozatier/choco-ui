<script lang="ts">
	import { choco } from "$lib/actions/choco.js";
	import { ToggleButton } from "$lib/components/toggle.svelte.js";
	import { bind } from "choco-ui/plugin";
	import { toggleVariants, type ToggleProps } from "./index.js";

	let {
		class: className,
		size,
		variant,
		active = $bindable(false),
		value,
		children,
		...restProps
	}: ToggleProps = $props();

	const toggle = new ToggleButton(bind({ active, value }, ["active"]));
</script>

<button use:choco={toggle} class={toggleVariants({ variant, size, className })} {...restProps}>
	{@render children?.()}
</button>
