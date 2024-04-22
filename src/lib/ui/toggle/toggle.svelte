<script lang="ts">
	import { toggleVariants, type ToggleProps } from "./index.js";
	import { PressToggle } from "$lib/builders/toggle/toggle.svelte.js";

	let {
		class: className,
		size,
		variant,
		pressed = $bindable(),
		builder = new PressToggle(),
		children,
		...restProps
	}: ToggleProps = $props();

	// builder.state = {
	// 	pressed: pressed ?? builder.options?.pressed,
	// };
</script>

<button use:builder.action class={toggleVariants({ variant, size, className })} {...restProps}>
	{@render children?.()}
</button>
