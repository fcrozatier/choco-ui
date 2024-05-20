<script lang="ts">
	import { trimUndefined } from "@fcrozatier/ts-helpers/objects";
	import { toggleVariants, type ToggleProps } from "./index.js";
	import { ToggleButton, type ToggleOptions } from "$lib/components/toggle.svelte.js";
	import { choco } from "$lib/actions/choco.js";

	let {
		class: className,
		size,
		variant,
		active = $bindable(false),
		value,
		builder = (options) => new ToggleButton(options),
		children,
		...restProps
	}: ToggleProps = $props();

	const toggle = builder(trimUndefined<ToggleOptions>({ active, value }));
</script>

<button use:choco={toggle} class={toggleVariants({ variant, size, className })} {...restProps}>
	{@render children?.()}
</button>
