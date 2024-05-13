<script lang="ts">
	import { trimUndefined } from "@fcrozatier/ts-helpers/objects";
	import { toggleVariants, type ToggleProps } from "./index.js";
	import { ToggleButton } from "$lib/components/toggle.svelte.js";

	let {
		class: className,
		size,
		variant,
		pressed = $bindable(false),
		value,
		builder = (options) => new ToggleButton(options),
		children,
		...restProps
	}: ToggleProps = $props();

	const toggle = builder(trimUndefined({ pressed, value }));
</script>

<button
	{...toggle.attributes}
	use:toggle.action
	class={toggleVariants({ variant, size, className })}
	{...restProps}
>
	{@render children?.()}
</button>
