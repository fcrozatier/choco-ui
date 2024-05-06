<script lang="ts">
	import { toggleVariants, type ToggleProps } from "./index.js";
	import { ToggleButton } from "$lib/components/toggle.svelte.js";

	let {
		class: className,
		size,
		variant,
		pressed = $bindable(false),
		kind,
		value,
		builder = (options) => new ToggleButton(options),
		children,
		...restProps
	}: ToggleProps = $props();

	const toggle = builder({ pressed, kind, value });
</script>

<button
	{...toggle.attributes}
	use:toggle.action
	class={toggleVariants({ variant, size, className })}
	{...restProps}
>
	{@render children?.()}
</button>
