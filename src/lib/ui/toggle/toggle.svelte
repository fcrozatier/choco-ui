<script lang="ts">
	import { toggleVariants, type ToggleProps } from "./index.js";
	import { createToggle } from "$lib/builders/toggle/toggle.svelte.js";
	import { ToggleButton } from "$lib/components/toggle.svelte.js";

	let {
		class: className,
		size,
		variant,
		pressed = $bindable(false),
		builder = createToggle(),
		children,
		...restProps
	}: ToggleProps = $props();

	const toggle = new ToggleButton({ pressed });
</script>

<button
	{...toggle.attributes}
	use:toggle.action
	class={toggleVariants({ variant, size, className })}
	{...restProps}
>
	{@render children?.()}
</button>
