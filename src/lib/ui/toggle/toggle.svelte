<script lang="ts">
	import { toggleVariants, type ToggleProps } from "./index.js";
	import { createPressToggle } from "$lib/builders/toggle/press.svelte.js";

	let {
		class: className,
		size,
		variant,
		pressed,
		disabled,
		builder = createPressToggle,
		children,
		...restProps
	}: ToggleProps = $props();

	const toggle = builder({ pressed, disabled });
</script>

<button use:toggle.action class={toggleVariants({ variant, size, className })} {...restProps}>
	{@render children?.()}
</button>
