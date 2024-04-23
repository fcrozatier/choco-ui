<script lang="ts">
	import { toggleVariants, type ToggleProps } from "./index.js";
	import { createToggle } from "$lib/builders/toggle/toggle.svelte.js";

	let {
		class: className,
		size,
		variant,
		pressed = $bindable(),
		builder = createToggle(),
		children,
		...restProps
	}: ToggleProps = $props();

	builder.pressed = pressed ?? builder.pressed;
</script>

<button use:builder.action class={toggleVariants({ variant, size, className })} {...restProps}>
	{@render children?.()}
</button>
