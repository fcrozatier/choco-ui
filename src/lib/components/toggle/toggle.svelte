<script lang="ts">
	import { choco } from "$lib/actions/choco.js";
	import { ToggleButton, type ConcreteToggleOptions } from "$lib/headless/toggle.svelte.js";
	import { bind } from "$lib/plugin/bind.js";
	import { toggleVariants, type ToggleProps } from "./index.js";

	let {
		class: className,
		size,
		variant,
		active = $bindable(false),
		value,
		children,
		builder = (options?: ConcreteToggleOptions) => new ToggleButton(options),
		...restProps
	}: ToggleProps = $props();

	const toggle = builder(bind({ active, value }, ["active"]));
</script>

<button use:choco={toggle} class={toggleVariants({ variant, size, className })} {...restProps}>
	{@render children?.()}
</button>
