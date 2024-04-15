<script lang="ts">
	import { toggleVariants, type ToggleProps } from "./index.js";
	import { createPressToggle } from "$lib/builders/toggle/press.svelte.js";

	let {
		class: className,
		size,
		variant,
		pressed,
		builder = createPressToggle(),
		children,
		...restProps
	}: ToggleProps = $props();

	builder.state = {
		pressed: pressed ?? builder.options?.pressed,
	};
</script>

<button use:builder.action class={toggleVariants({ variant, size, className })} {...restProps}>
	{@render children?.()}
</button>
